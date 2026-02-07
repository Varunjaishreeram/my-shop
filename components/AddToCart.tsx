"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

export default function AddToCart({ product }: { product: any }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.img, // ✅ Mapped 'img' to 'image' for the cart
        });
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <Button
            onClick={handleAdd}
            size="lg"
            className="w-full md:w-auto bg-emerald-800 hover:bg-emerald-700 text-white gap-2"
        >
            <ShoppingCart size={20} />
            Add to Cart
        </Button>
    );
}