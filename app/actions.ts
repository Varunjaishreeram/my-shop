"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs"; // Make sure to install this: npm i bcryptjs @types/bcryptjs

export async function submitReview(productId: string, rating: number, comment: string) {
    const session = await auth();

    // ✅ FIX: Strict check for user ID
    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    // Verify purchase again on server side
    const purchase = await prisma.order.findFirst({
        where: {
            userId: session.user.id,
            status: "PAID",
            items: { some: { productId } },
        },
    });

    if (!purchase) throw new Error("You must purchase this product to review it.");

    await prisma.review.create({
        data: {
            userId: session.user.id,
            productId,
            rating,
            comment,
        },
    });

    revalidatePath(`/product/${productId}`);
}

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) throw new Error("Missing fields");

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        return { success: true };
    } catch (e) {
        return { error: "User already exists" };
    }
}