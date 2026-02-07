import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@/auth";

export async function POST(req: Request) {
    // 1. Debugging Logs (Check your terminal when you click Pay)
    console.log("------------------------------------------------");
    console.log("DEBUG: Razorpay Key ID:", process.env.RAZORPAY_KEY_ID ? "Loaded ✅" : "Missing ❌");
    console.log("DEBUG: Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET ? "Loaded ✅" : "Missing ❌");
    console.log("------------------------------------------------");

    // 2. Auth Check
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Initialize Razorpay
    // If keys are missing, this will throw the error you are seeing
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return NextResponse.json({ error: "Razorpay keys missing" }, { status: 500 });
    }

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = await req.json();

    try {
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Amount in paise
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error: any) {
        console.error("Razorpay Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}