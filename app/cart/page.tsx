"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package, Sparkles, Leaf, Shield, Truck, Gift, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total } = useCartStore();
    const [removingId, setRemovingId] = useState<string | null>(null);

    const handleRemove = (id: string) => {
        setRemovingId(id);
        setTimeout(() => {
            removeItem(id);
            setRemovingId(null);
        }, 300);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 py-12 sm:py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-lg mx-auto">
                        {/* Empty Cart Illustration */}
                        <div className="relative mb-10">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-72 h-72 bg-gradient-to-br from-emerald-200/40 to-amber-200/40 rounded-full blur-3xl animate-pulse" />
                            </div>
                            <div className="relative">
                                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-emerald-100 via-white to-emerald-50 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-900/10 border border-emerald-100">
                                    <div className="relative">
                                        <ShoppingBag className="h-24 w-24 text-emerald-600/80" strokeWidth={1} />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                                            <Sparkles className="h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-900 mb-4">Your Cart is Empty</h2>
                        <p className="text-stone-600 text-lg mb-10 leading-relaxed">
                            Discover our collection of natural Ayurvedic remedies and begin your wellness journey today
                        </p>

                        <Link href="/products">
                            <Button className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-600 text-white px-10 py-7 rounded-2xl shadow-xl shadow-emerald-900/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl group text-lg">
                                <span className="relative z-10 flex items-center gap-3">
                                    <Leaf className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                                    Explore Products
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Button>
                        </Link>

                        {/* Trust badges */}
                        <div className="mt-16 grid grid-cols-3 gap-4">
                            {[
                                { icon: Shield, label: "100% Authentic" },
                                { icon: Truck, label: "Free Delivery" },
                                { icon: Gift, label: "Natural Products" },
                            ].map((badge, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-2xl border border-emerald-100/50">
                                    <badge.icon className="h-6 w-6 text-emerald-600" />
                                    <span className="text-xs text-stone-600 font-medium">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 py-6 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                {/* Header */}
                <div className="mb-8 sm:mb-10">
                    <Link href="/products" className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-emerald-800 transition-colors mb-4 group">
                        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Continue Shopping
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl shadow-lg shadow-emerald-900/20">
                            <ShoppingBag className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-emerald-900">Shopping Cart</h1>
                            <p className="text-stone-500 text-sm sm:text-base flex items-center gap-2 mt-1">
                                <Package className="h-4 w-4" />
                                {items.length} {items.length === 1 ? 'item' : 'items'} ready for checkout
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className={`group bg-white/90 backdrop-blur-sm border border-emerald-100/60 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-500 hover:-translate-y-1 ${removingId === item.id ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100'
                                    }`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    transition: 'all 0.3s ease-out'
                                }}
                            >
                                <div className="flex gap-4 sm:gap-6">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0">
                                        <div className="relative h-24 w-24 sm:h-32 sm:w-32 bg-gradient-to-br from-emerald-100 via-white to-amber-50 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-inner border border-emerald-100/50">
                                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <Package className="h-12 w-12 sm:h-14 sm:w-14 text-emerald-600/70" strokeWidth={1} />
                                            <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Leaf className="h-3 w-3 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-grow min-w-0">
                                        <div className="flex justify-between gap-3 mb-3">
                                            <div>
                                                <h3 className="font-semibold text-emerald-900 text-base sm:text-xl line-clamp-1">{item.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                                                        <Leaf className="h-3 w-3" />
                                                        Ayurvedic
                                                    </span>
                                                    <span className="text-stone-400 text-xs">Natural Formula</span>
                                                </div>
                                            </div>

                                            {/* Delete Button - Desktop */}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemove(item.id)}
                                                className="hidden sm:flex h-10 w-10 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-110"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs sm:text-sm text-stone-500 font-medium uppercase tracking-wide">Qty</span>
                                                <div className="flex items-center bg-gradient-to-r from-emerald-50 to-white rounded-xl border border-emerald-200 shadow-sm overflow-hidden">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="h-10 w-10 sm:h-11 sm:w-11 rounded-none hover:bg-emerald-100 hover:text-emerald-900 transition-all border-r border-emerald-100"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-12 sm:w-14 text-center font-bold text-emerald-900 text-lg">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="h-10 w-10 sm:h-11 sm:w-11 rounded-none hover:bg-emerald-100 hover:text-emerald-900 transition-all border-l border-emerald-100"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between sm:justify-end gap-4">
                                                <div className="text-right">
                                                    <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                                                        ₹{(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-xs text-stone-400">₹{item.price.toFixed(2)} each</p>
                                                    )}
                                                </div>

                                                {/* Delete Button - Mobile */}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemove(item.id)}
                                                    className="sm:hidden h-10 w-10 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary - Sticky on Desktop */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl shadow-emerald-900/40 overflow-hidden relative">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-600/20 to-transparent rounded-full blur-2xl" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-full blur-xl" />

                                <div className="relative">
                                    <h3 className="text-xl sm:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                                        </div>
                                        Order Summary
                                    </h3>

                                    {/* Order Details */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between items-center text-emerald-100">
                                            <span className="text-sm">Subtotal ({items.length} items)</span>
                                            <span className="font-semibold text-lg">₹{total().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-emerald-100">
                                            <span className="text-sm">Shipping</span>
                                            <span className="font-semibold text-emerald-300 flex items-center gap-1">
                                                <Truck className="h-4 w-4" />
                                                FREE
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-emerald-100">
                                            <span className="text-sm">Tax (estimated)</span>
                                            <span className="font-medium">₹0.00</span>
                                        </div>

                                        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent my-4" />

                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold text-lg">Total</span>
                                            <div className="text-right">
                                                <span className="text-3xl sm:text-4xl font-bold">₹{total().toFixed(2)}</span>
                                                <p className="text-xs text-emerald-300 mt-1">Including all taxes</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <Link href="/checkout" className="block w-full">
                                        <Button
                                            className="w-full bg-white text-emerald-900 hover:bg-emerald-50 py-6 sm:py-7 rounded-2xl text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02]"
                                            size="lg"
                                        >
                                            <span className="flex items-center gap-2">
                                                Proceed to Checkout
                                                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                            </span>
                                        </Button>
                                    </Link>

                                    {/* Continue Shopping Link */}
                                    <Link href="/products">
                                        <Button
                                            variant="ghost"
                                            className="w-full mt-3 text-white/90 hover:text-white hover:bg-white/10 border border-white/20 py-4 rounded-xl transition-all"
                                        >
                                            <ChevronLeft className="h-4 w-4 mr-2" />
                                            Continue Shopping
                                        </Button>
                                    </Link>

                                    {/* Trust Badges */}
                                    <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-3">
                                        {[
                                            { icon: Shield, label: "Secure Checkout" },
                                            { icon: Truck, label: "Free Delivery" },
                                            { icon: Leaf, label: "100% Natural" },
                                            { icon: Gift, label: "Gift Packaging" },
                                        ].map((badge, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-emerald-200">
                                                <badge.icon className="h-4 w-4 text-emerald-400" />
                                                <span>{badge.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Promotional Banner */}
                            <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-2xl border border-amber-200/50 flex items-center gap-3">
                                <div className="p-2 bg-amber-400/20 rounded-xl">
                                    <Gift className="h-5 w-5 text-amber-600" />
                                </div>
                                <p className="text-sm text-amber-800">
                                    <span className="font-semibold">Special Offer!</span> Free gift with orders above ₹999
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}