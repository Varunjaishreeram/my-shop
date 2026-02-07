"use client";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon() {
    const cartItems = useCartStore((state) => state.items);
    // Fix hydration mismatch by waiting for mount
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const count = mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

    return (
        <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {count > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600">
                        {count}
                    </Badge>
                )}
            </Button>
        </Link>
    );
}