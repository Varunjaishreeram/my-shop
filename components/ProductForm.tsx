"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { upsertProduct } from "@/app/actions/admin";

export default function ProductForm({ product }: { product?: any }) {
    return (
        <form action={upsertProduct} className="space-y-6 max-w-3xl bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
            <input type="hidden" name="id" value={product?.id || ""} />

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Product Name</label>
                    <Input name="name" defaultValue={product?.name} placeholder="e.g. Ashwagandha Gold" required className="border-stone-200 focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Category</label>
                    <Input name="category" defaultValue={product?.category} placeholder="e.g. Immunity" required className="border-stone-200 focus-visible:ring-emerald-500" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Price (₹)</label>
                    <Input name="price" type="number" defaultValue={product?.price} required className="border-stone-200 focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Quantity</label>
                    <Input name="quantity" defaultValue={product?.quantity} placeholder="e.g. 60 tabs" required className="border-stone-200 focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Stock Level</label>
                    <Input name="stock" type="number" defaultValue={product?.stock || 100} required className="border-stone-200 focus-visible:ring-emerald-500" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Image URL</label>
                <Input name="img" defaultValue={product?.img} placeholder="https://..." required className="border-stone-200 focus-visible:ring-emerald-500" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Ingredients (Text)</label>
                <Input name="ingredients" defaultValue={product?.ingredients} placeholder="Ashwagandha, Tulsi, Giloy..." className="border-stone-200 focus-visible:ring-emerald-500" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Benefits (Comma separated)</label>
                <Input name="benefits" defaultValue={product?.benefits?.join(", ")} placeholder="Boosts immunity, Reduces stress, Improves sleep" className="border-stone-200 focus-visible:ring-emerald-500" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">How To Use</label>
                <Input name="howToUse" defaultValue={product?.howToUse} placeholder="Take 1 tablet twice daily with warm milk" className="border-stone-200 focus-visible:ring-emerald-500" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Description</label>
                <Textarea name="description" defaultValue={product?.description} required rows={5} className="border-stone-200 focus-visible:ring-emerald-500" />
            </div>

            <div className="pt-4">
                <Button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white h-12 text-lg rounded-xl">
                    {product ? "Update Product" : "Create Product"}
                </Button>
            </div>
        </form>
    );
}