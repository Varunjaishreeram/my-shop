import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function OrdersPage() {
    const session = await auth();
    if (!session?.user) redirect("/api/auth/signin");

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: { items: { include: { product: true } } },
    });

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-emerald-900">Your Orders</h1>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader className="bg-gray-50 flex flex-row items-center justify-between pb-4">
                                <div>
                                    <CardTitle className="text-sm font-medium text-gray-500">Order ID: {order.id}</CardTitle>
                                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <Badge className={order.status === 'PAID' ? 'bg-green-600' : 'bg-yellow-600'}>
                                    {order.status}
                                </Badge>
                            </CardHeader>
                            <CardContent className="pt-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                                        <div className="flex items-center gap-4">
                                            <img src={item.product.img} alt={item.product.name} className="h-12 w-12 object-cover rounded" />
                                            <div>
                                                <p className="font-semibold">{item.product.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                                <div className="flex justify-end pt-4 font-bold text-lg">
                                    Total: ₹{order.totalAmount}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}