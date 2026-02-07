"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerUser } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignupPage() {



    const router = useRouter();
    const { data: session } = useSession();


    // 🔒 PROTECT: If logged in, go home
    useEffect(() => {
        if (session) router.push("/");
    }, [session, router]);

    async function handleSubmit(formData: FormData) {
        const res = await registerUser(formData);
        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("Account created! Please login.");
            router.push("/login");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center text-emerald-900 font-serif">Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <Input name="name" placeholder="John Doe" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input name="email" type="email" placeholder="user@example.com" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <Input name="password" type="password" required />
                        </div>
                        <Button className="w-full bg-emerald-800 hover:bg-emerald-700">Sign Up</Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-emerald-700 underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}