"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react"; // ✅ Client-side Auth
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // 1. Client-Side Sign In (Does not crash page)
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false, // 👈 Critical: Stops auto-redirect so we can handle logic
        });

        if (result?.error) {
            toast.error("Invalid email or password");
            setLoading(false);
        } else {
            // 2. Login Successful - Check Role for Redirect
            const session = await getSession();
            toast.success("Welcome back!");

            if (session?.user?.role === "ADMIN") {
                router.push("/admin");
            } else {
                router.push("/");
            }

            router.refresh(); // Refresh to update navbar
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-[#FDFCF8]">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-emerald-900/5 border border-stone-100">

                    <div className="text-center mb-8">
                        <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-emerald-800">
                            <Leaf />
                        </div>
                        <h1 className="text-3xl font-serif text-emerald-950">Welcome Back</h1>
                        <p className="text-stone-500 mt-2">Sign in to access your wellness journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-stone-700">Email</label>
                            <Input name="email" type="email" placeholder="you@example.com" required className="h-11 rounded-lg border-stone-200 focus-visible:ring-emerald-500" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-stone-700">Password</label>
                            <Input name="password" type="password" required className="h-11 rounded-lg border-stone-200 focus-visible:ring-emerald-500" />
                        </div>

                        <Button disabled={loading} className="w-full h-12 bg-emerald-900 hover:bg-emerald-800 text-lg rounded-xl">
                            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-stone-500">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-emerald-700 font-semibold hover:underline">
                            Join the community
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}