import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();

    // ✅ Strict check for User ID
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    const body = await req.json();
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        cartItems,
        totalAmount,
        shippingDetails // ✅ Receive Address Data
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generated_signature !== razorpay_signature) {
        return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
    }

    // Payment Verified -> Save Order with Address
    const newOrder = await prisma.order.create({
        data: {
            userId: session.user.id,
            totalAmount: totalAmount,
            status: "PAID",
            razorpayOrderId: razorpay_order_id,
            paymentId: razorpay_payment_id,

            // ✅ Saving Address Fields
            firstName: shippingDetails.firstName,
            lastName: shippingDetails.lastName,
            address: shippingDetails.address,
            city: shippingDetails.city,
            state: shippingDetails.state,
            zip: shippingDetails.zip,
            phone: shippingDetails.phone,

            items: {
                create: cartItems.map((item: any) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
    });

    return NextResponse.json({ success: true, orderId: newOrder.id });
}