import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import {
    IndianRupee, ShoppingBag, Users, Package, TrendingUp, ArrowUpRight,
    ArrowDownRight, Clock, CheckCircle2, Truck, AlertCircle, Sparkles
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();

    // Get orders with different statuses
    const paidOrders = await prisma.order.findMany({ where: { status: "PAID" } });
    const pendingOrders = await prisma.order.count({ where: { status: "PENDING" } });
    const deliveredOrders = await prisma.order.count({ where: { status: "DELIVERED" } });

    // Calculate Revenue
    const totalRevenue = paidOrders.reduce((acc, order) => acc + order.totalAmount, 0);

    // Recent orders
    const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: true },
    });

    // New users this week (mock percentage for demo)
    const newUsersThisWeek = Math.floor(totalUsers * 0.12);

    const statsCards = [
        {
            title: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            change: "+12.5%",
            isPositive: true,
            icon: IndianRupee,
            gradient: "from-emerald-500 to-teal-600",
            bgGradient: "from-emerald-50 to-teal-50",
            link: "/admin/orders"
        },
        {
            title: "Total Orders",
            value: totalOrders.toString(),
            change: "+8.2%",
            isPositive: true,
            icon: ShoppingBag,
            gradient: "from-violet-500 to-purple-600",
            bgGradient: "from-violet-50 to-purple-50",
            link: "/admin/orders"
        },
        {
            title: "Products",
            value: totalProducts.toString(),
            change: "+3",
            isPositive: true,
            icon: Package,
            gradient: "from-amber-500 to-orange-600",
            bgGradient: "from-amber-50 to-orange-50",
            link: "/admin/products"
        },
        {
            title: "Total Users",
            value: totalUsers.toString(),
            change: `+${newUsersThisWeek} this week`,
            isPositive: true,
            icon: Users,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50",
            link: "/admin/users"
        },
    ];

    const orderStatusCards = [
        { label: "Pending", count: pendingOrders, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
        { label: "Paid", count: paidOrders.length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
        { label: "Delivered", count: deliveredOrders, icon: Truck, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your store.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    <span>Last updated: Just now</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                {statsCards.map((stat, index) => (
                    <Link key={index} href={stat.link}>
                        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-to-br ${stat.bgGradient}`}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-3">
                                        <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                                        <div className={`flex items-center gap-1 text-sm ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {stat.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                            <span className="font-medium">{stat.change}</span>
                                        </div>
                                    </div>
                                    <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                {/* Decorative Element */}
                                <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-full opacity-10 blur-xl`}></div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Order Status Summary */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
                                    <p className="text-sm text-slate-500">Latest customer orders</p>
                                </div>
                                <Link href="/admin/orders" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                                    View All <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {recentOrders.length > 0 ? recentOrders.map((order) => (
                                <Link key={order.id} href={`/admin/orders/${order.id}`} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                                        <span className="text-emerald-700 font-bold text-sm">
                                            {order.firstName?.charAt(0) || 'G'}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900 truncate">{order.firstName} {order.lastName}</p>
                                        <p className="text-sm text-slate-500 truncate">{order.user?.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900">₹{order.totalAmount}</p>
                                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${order.status === "PAID" ? 'bg-emerald-100 text-emerald-700' :
                                                order.status === "DELIVERED" ? 'bg-blue-100 text-blue-700' :
                                                    order.status === "PENDING" ? 'bg-amber-100 text-amber-700' :
                                                        'bg-slate-100 text-slate-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </Link>
                            )) : (
                                <div className="p-8 text-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ShoppingBag className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <p className="text-slate-500">No orders yet</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Order Status Cards */}
                <div className="space-y-4">
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Order Status</h2>
                            <div className="space-y-3">
                                {orderStatusCards.map((status) => (
                                    <div key={status.label} className={`flex items-center gap-4 p-4 rounded-xl ${status.bg} border ${status.border}`}>
                                        <div className={`p-2 ${status.bg} rounded-lg`}>
                                            <status.icon className={`h-5 w-5 ${status.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`font-medium ${status.color}`}>{status.label}</p>
                                        </div>
                                        <span className={`text-2xl font-bold ${status.color}`}>{status.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                        <div className="p-6">
                            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                <Link href="/admin/products/new" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                    <Package className="h-5 w-5 text-amber-400" />
                                    <span className="text-sm font-medium">Add New Product</span>
                                </Link>
                                <Link href="/admin/orders" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                    <ShoppingBag className="h-5 w-5 text-emerald-400" />
                                    <span className="text-sm font-medium">Manage Orders</span>
                                </Link>
                                <Link href="/admin/users" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                    <Users className="h-5 w-5 text-blue-400" />
                                    <span className="text-sm font-medium">View Users</span>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}