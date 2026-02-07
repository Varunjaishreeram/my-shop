import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { deleteUser, toggleUserRole } from "@/app/actions/admin";
import {
    Trash2, Shield, User as UserIcon, Users, Crown, Mail, Calendar,
    MoreVertical, UserCheck, UserX
} from "lucide-react";

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

    // Calculate stats
    const totalUsers = users.length;
    const adminUsers = users.filter(u => u.role === "ADMIN").length;
    const regularUsers = users.filter(u => u.role === "USER").length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                        User Management
                    </h1>
                    <p className="text-slate-500 mt-1">Manage user accounts and permissions</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-5 border-0 shadow-md bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Users</p>
                                <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="p-5 border-0 shadow-md bg-gradient-to-br from-amber-50 to-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Crown className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Admins</p>
                                <p className="text-2xl font-bold text-slate-900">{adminUsers}</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="p-5 border-0 shadow-md bg-gradient-to-br from-emerald-50 to-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <UserCheck className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Regular Users</p>
                                <p className="text-2xl font-bold text-slate-900">{regularUsers}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Users List */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <p className="font-semibold text-slate-700">{users.length} Users</p>
                </div>

                {users.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="h-10 w-10 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">No users yet</h3>
                        <p className="text-slate-500">Users will appear here once they sign up</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 hover:bg-slate-50/80 transition-all duration-200"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${user.role === "ADMIN"
                                            ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                                            : 'bg-gradient-to-br from-slate-200 to-slate-300'
                                        }`}>
                                        {user.role === "ADMIN" ? (
                                            <Crown className="h-6 w-6 text-white" />
                                        ) : (
                                            <span className="text-slate-600 font-bold text-lg">
                                                {user.name?.charAt(0) || 'U'}
                                            </span>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="font-semibold text-slate-900">
                                                {user.name || "Unnamed User"}
                                            </p>
                                            <Badge
                                                className={`text-xs font-medium ${user.role === "ADMIN"
                                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0'
                                                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                                                    }`}
                                            >
                                                {user.role === "ADMIN" && <Crown className="h-3 w-3 mr-1" />}
                                                {user.role}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500 flex-wrap">
                                            <span className="flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                {user.email}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Joined {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 sm:gap-3 justify-end">
                                    <form action={async () => {
                                        "use server";
                                        await toggleUserRole(user.id, user.role);
                                    }}>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className={`h-9 px-3 text-xs font-medium transition-all ${user.role === "ADMIN"
                                                    ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                                                    : 'border-amber-200 text-amber-700 hover:bg-amber-50'
                                                }`}
                                        >
                                            {user.role === "ADMIN" ? (
                                                <span className="flex items-center gap-1.5">
                                                    <UserX size={14} />
                                                    Remove Admin
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5">
                                                    <Crown size={14} />
                                                    Make Admin
                                                </span>
                                            )}
                                        </Button>
                                    </form>

                                    <form action={async () => {
                                        "use server";
                                        await deleteUser(user.id);
                                    }}>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-9 w-9 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}