import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Users, LogOut, Store, ShoppingBag, ChevronRight, Sparkles } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    // 🔒 PROTECT ROUTE: Only "ADMIN" role allowed
    if (session?.user?.role !== "ADMIN") {
        redirect("/");
    }

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard, color: "from-violet-500 to-purple-600" },
        { href: "/admin/products", label: "Products", icon: Package, color: "from-amber-500 to-orange-600" },
        { href: "/admin/orders", label: "Orders", icon: ShoppingBag, color: "from-emerald-500 to-teal-600" },
        { href: "/admin/users", label: "Users", icon: Users, color: "from-blue-500 to-indigo-600" },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white hidden lg:flex flex-col fixed h-full shadow-2xl shadow-slate-900/50">
                {/* Logo Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl blur-md opacity-60"></div>
                            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg">
                                <Store className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">Admin Panel</span>
                            <p className="text-xs text-slate-400 mt-0.5">Saatwika Ayurveda</p>
                        </div>
                    </div>
                </div>

                {/* Admin Info */}
                <div className="px-6 py-4 border-b border-white/5">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/30">
                            {session.user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{session.user?.name || 'Admin'}</p>
                            <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                        </div>
                        <div className="px-2 py-1 bg-emerald-500/20 rounded-md">
                            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Admin</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</p>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className={`p-2 bg-gradient-to-br ${item.color} rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon size={18} className="text-white" />
                            </div>
                            <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                            <ChevronRight size={16} className="ml-auto text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </nav>

                {/* Quick Stats Mini */}
                <div className="px-4 py-4 border-t border-white/5">
                    <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-emerald-400" />
                            <span className="text-xs font-semibold text-emerald-400">Pro Tip</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">Use keyboard shortcuts for faster navigation. Press <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">?</kbd> for help.</p>
                    </div>
                </div>

                {/* Back to Shop */}
                <div className="p-4 border-t border-white/10">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 group"
                    >
                        <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-slate-700 transition-colors">
                            <LogOut size={18} />
                        </div>
                        <span className="font-medium">Back to Shop</span>
                    </Link>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white p-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
                        <Store className="h-5 w-5" />
                    </div>
                    <span className="font-bold">Admin Panel</span>
                </div>
                <div className="flex items-center gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            title={item.label}
                        >
                            <item.icon size={20} className="text-slate-300" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen">
                {/* Mobile spacer */}
                <div className="lg:hidden h-16"></div>

                {/* Content Area */}
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}