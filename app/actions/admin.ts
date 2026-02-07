"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client"; // ✅ Import Enum from your Schema

// 🔒 Security: Block non-admins
async function checkAdmin() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
}

// --- USER ACTIONS ---

export async function deleteUser(userId: string) {
    await checkAdmin();
    await prisma.user.delete({ where: { id: userId } });
    revalidatePath("/admin/users");
}

export async function toggleUserRole(userId: string, currentRole: Role) {
    await checkAdmin();
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

    await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
    });
    revalidatePath("/admin/users");
}

// --- PRODUCT ACTIONS ---

export async function deleteProduct(productId: string) {
    await checkAdmin();
    await prisma.product.delete({ where: { id: productId } });
    revalidatePath("/admin/products");
}

export async function upsertProduct(formData: FormData) {
    await checkAdmin();

    const id = formData.get("id") as string;

    // Extract Data
    const data = {
        name: formData.get("name") as string,
        price: Number(formData.get("price")),
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        quantity: formData.get("quantity") as string,
        img: formData.get("img") as string,
        ingredients: formData.get("ingredients") as string,
        howToUse: formData.get("howToUse") as string,
        stock: Number(formData.get("stock")) || 0,
        // ✅ Convert comma-separated string to Array for String[]
        benefits: (formData.get("benefits") as string).split(",").map(b => b.trim()).filter(b => b !== ""),
    };

    if (id) {
        // Update
        await prisma.product.update({ where: { id }, data });
    } else {
        // Create
        await prisma.product.create({ data });
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}


// --- ORDER ACTIONS ---

export async function updateOrderStatus(orderId: string, newStatus: string) {
    await checkAdmin();
    await prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus },
    });
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath("/admin/orders");
}