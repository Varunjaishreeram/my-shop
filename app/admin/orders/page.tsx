import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    Eye, ShoppingBag, Clock, CheckCircle2, Truck, Search, Filter,
    ArrowUpRight, Package, User, Calendar, IndianRupee
} from "lucide-react";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true },
    });

    // Calculate stats
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === "PENDING").length;
    const paidOrders = orders.filter(o => o.status === "PAID").length;
    const deliveredOrders = orders.filter(o => o.status === "DELIVERED").length;
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "PAID":
                return {
                    icon: CheckCircle2,
                    classes: "bg-emerald-100 text-emerald-700 border-emerald-200",
                    dotColor: "bg-emerald-500"
                };
            case "PENDING":
                return {
                    icon: Clock,
                    classes: "bg-amber-100 text-amber-700 border-amber-200",
                    dotColor: "bg-amber-500"
                };
            case "DELIVERED":
                return {
                    icon: Truck,
                    classes: "bg-blue-100 text-blue-700 border-blue-200",
                    dotColor: "bg-blue-500"
                };
            default:
                return {
                    icon: Package,
                    classes: "bg-slate-100 text-slate-700 border-slate-200",
                    dotColor: "bg-slate-500"
                };
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                        Orders
                    </h1>
                    <p className="text-slate-500 mt-1">Manage and track all customer orders</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="p-4 border-0 shadow-md bg-gradient-to-br from-slate-50 to-white">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Orders</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{totalOrders}</p>
                </Card>
                <Card className="p-4 border-0 shadow-md bg-gradient-to-br from-amber-50 to-white">
                    <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">Pending</p>
                    <p className="text-2xl font-bold text-amber-700 mt-1">{pendingOrders}</p>
                </Card>
                <Card className="p-4 border-0 shadow-md bg-gradient-to-br from-emerald-50 to-white">
                    <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Paid</p>
                    <p className="text-2xl font-bold text-emerald-700 mt-1">{paidOrders}</p>
                </Card>
                <Card className="p-4 border-0 shadow-md bg-gradient-to-br from-blue-50 to-white">
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Delivered</p>
                    <p className="text-2xl font-bold text-blue-700 mt-1">{deliveredOrders}</p>
                </Card>
                <Card className="p-4 border-0 shadow-md bg-gradient-to-br from-violet-50 to-white col-span-2 lg:col-span-1">
                    <p className="text-xs font-medium text-violet-600 uppercase tracking-wide">Revenue</p>
                    <p className="text-2xl font-bold text-violet-700 mt-1">₹{totalRevenue.toLocaleString()}</p>
                </Card>
            </div>

            {/* Orders List */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <p className="font-semibold text-slate-700">{orders.length} Orders</p>
                </div>

                {orders.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="h-10 w-10 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">No orders yet</h3>
                        <p className="text-slate-500">Orders will appear here once customers make purchases</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {orders.map((order, index) => {
                            const statusConfig = getStatusConfig(order.status);
                            return (
                                <Link
                                    key={order.id}
                                    href={`/admin/orders/${order.id}`}
                                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 hover:bg-slate-50/80 transition-all duration-200 group"
                                >
                                    {/* Order Info */}
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="hidden sm:flex w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl items-center justify-center shrink-0">
                                            <span className="text-emerald-700 font-bold">
                                                {order.firstName?.charAt(0) || '?'}
                                            </span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-semibold text-slate-900">
                                                    {order.firstName} {order.lastName}
                                                </p>
                                                <span className="text-xs text-slate-400 font-mono">
                                                    #{order.id.slice(-8).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {order.user?.email || 'N/A'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Amount */}
                                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                                        <Badge className={`${statusConfig.classes} border font-medium px-3 py-1 flex items-center gap-1.5`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`}></span>
                                            {order.status}
                                        </Badge>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900 text-lg">₹{order.totalAmount.toLocaleString()}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50">
                                            <Eye size={18} />
                                        </Button>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </Card>
        </div>
    );
}