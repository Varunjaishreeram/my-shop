import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateOrderStatus } from "@/app/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, CreditCard, User, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function AdminOrderDetailPage(props: Props) {
    const params = await props.params;
    const order = await prisma.order.findUnique({
        where: { id: params.id },
        include: {
            user: true,
            items: { include: { product: true } }, // Get product details
        },
    });

    if (!order) return <div>Order not found</div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <Link href="/admin/orders" className="text-stone-500 hover:text-emerald-900 flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Orders
            </Link>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-serif text-emerald-950 mb-1">Order #{order.id.slice(-6).toUpperCase()}</h1>
                    <p className="text-stone-500 text-sm">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                {/* Status Updater */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-stone-200">
                    <span className="text-sm font-bold text-stone-500 pl-2">Status:</span>
                    <form action={async () => { "use server"; await updateOrderStatus(order.id, "SHIPPED"); }}>
                        <Button size="sm" variant={order.status === "SHIPPED" ? "default" : "outline"} disabled={order.status === "SHIPPED"}>
                            <Truck size={14} className="mr-2" /> Shipped
                        </Button>
                    </form>
                    <form action={async () => { "use server"; await updateOrderStatus(order.id, "DELIVERED"); }}>
                        <Button size="sm" variant={order.status === "DELIVERED" ? "default" : "outline"} className="bg-emerald-600 hover:bg-emerald-700" disabled={order.status === "DELIVERED"}>
                            <Package size={14} className="mr-2" /> Delivered
                        </Button>
                    </form>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

                {/* 1. Customer & Shipping */}
                <Card className="md:col-span-2 shadow-sm">
                    <CardHeader className="bg-stone-50 border-b border-stone-100 pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin size={18} className="text-emerald-600" /> Shipping Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-stone-400 uppercase font-bold">Name</p>
                                <p className="text-stone-800 font-medium">{order.firstName} {order.lastName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-stone-400 uppercase font-bold">Email</p>
                                <p className="text-stone-800">{order.user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-stone-400 uppercase font-bold">Phone</p>
                                <p className="text-stone-800">{order.phone || "N/A"}</p>
                            </div>
                        </div>
                        <div className="border-t border-stone-100 pt-4">
                            <p className="text-xs text-stone-400 uppercase font-bold mb-1">Address</p>
                            <p className="text-stone-800">{order.address}</p>
                            <p className="text-stone-800">{order.city}, {order.state} - {order.zip}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Payment Info */}
                <Card className="shadow-sm">
                    <CardHeader className="bg-stone-50 border-b border-stone-100 pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <CreditCard size={18} className="text-emerald-600" /> Payment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div>
                            <p className="text-xs text-stone-400 uppercase font-bold">Total Amount</p>
                            <p className="text-3xl font-serif text-emerald-900">₹{order.totalAmount}</p>
                        </div>
                        <div>
                            <p className="text-xs text-stone-400 uppercase font-bold">Payment ID</p>
                            <p className="text-xs font-mono text-stone-600 bg-stone-100 p-2 rounded break-all">
                                {order.paymentId || "Pending"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-stone-400 uppercase font-bold">Status</p>
                            <Badge variant="outline" className="mt-1 text-emerald-700 bg-emerald-50 border-emerald-200">
                                {order.status}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Order Items */}
                <Card className="md:col-span-3 shadow-sm">
                    <CardHeader className="bg-stone-50 border-b border-stone-100 pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Package size={18} className="text-emerald-600" /> Order Items
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="divide-y divide-stone-100">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-4">
                                    <div className="flex items-center gap-4">
                                        <img src={item.product.img} alt={item.product.name} className="w-16 h-16 object-contain bg-stone-50 rounded-lg" />
                                        <div>
                                            <p className="font-bold text-emerald-950">{item.product.name}</p>
                                            <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">₹{item.price * item.quantity}</p>
                                        <p className="text-xs text-stone-400">₹{item.price} each</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between items-center">
                            <span className="font-bold text-lg">Grand Total</span>
                            <span className="font-serif text-2xl text-emerald-900 font-bold">₹{order.totalAmount}</span>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}