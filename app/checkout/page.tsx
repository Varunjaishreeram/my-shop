"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { toast } from "sonner";
import {
    Loader2, MapPin, Phone, Mail, User, Home, Building2, ChevronDown, Check,
    Package, Shield, Truck, CreditCard, ArrowRight, Sparkles, Lock, ChevronLeft,
    Search, X, Leaf
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function CheckoutPage() {
    const { items, total, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session, update } = useSession();
    const [isClient, setIsClient] = useState(false);
    const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
    const [stateSearch, setStateSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(1);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
    });

    useEffect(() => {
        setIsClient(true);
        update();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setStateDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStateSelect = (state: string) => {
        setFormData({ ...formData, state });
        setStateDropdownOpen(false);
        setStateSearch("");
    };

    const filteredStates = INDIAN_STATES.filter(state =>
        state.toLowerCase().includes(stateSearch.toLowerCase())
    );

    // Calculate form completion
    const filledFields = Object.values(formData).filter(v => v.trim() !== "").length;
    const totalFields = Object.keys(formData).length - 1; // Exclude lastName as optional
    const completionPercent = Math.round((filledFields / totalFields) * 100);

    if (!isClient) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 flex items-center justify-center py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-lg mx-auto">
                        <div className="relative mb-10">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 h-64 bg-gradient-to-br from-emerald-200/40 to-amber-200/40 rounded-full blur-3xl animate-pulse" />
                            </div>
                            <div className="relative w-40 h-40 mx-auto bg-gradient-to-br from-emerald-100 via-white to-emerald-50 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-900/10 border border-emerald-100">
                                <Package className="h-20 w-20 text-emerald-600/70" strokeWidth={1} />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-900 mb-4">Your cart is empty</h1>
                        <p className="text-stone-600 text-lg mb-8">Add some products to proceed with checkout</p>
                        <Button
                            className="bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white px-10 py-7 rounded-2xl shadow-xl shadow-emerald-900/20 text-lg group"
                            onClick={() => router.push("/products")}
                        >
                            <Leaf className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                            Go Shopping
                            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const handlePayment = async () => {
        if (!session?.user) {
            toast.error("Please login to complete your order");
            router.push("/login");
            return;
        }

        const { firstName, address, city, state, zip, phone } = formData;
        if (!firstName || !address || !city || !state || !zip || !phone) {
            toast.error("Please fill in all shipping details.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/razorpay/order", {
                method: "POST",
                body: JSON.stringify({ amount: total() }),
            });

            if (!res.ok) throw new Error("Order creation failed");
            const data = await res.json();

            const options = {
                key: "rzp_test_SCVZbmTwwOKfQM",
                amount: data.amount,
                currency: "INR",
                name: "Saatwika Ayurveda",
                description: "Order Payment",
                order_id: data.orderId,
                handler: async function (response: any) {
                    const verifyRes = await fetch("/api/razorpay/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            cartItems: items,
                            totalAmount: total(),
                            shippingDetails: formData
                        }),
                    });

                    if (verifyRes.ok) {
                        clearCart();
                        toast.success("Order Placed Successfully!");
                        router.push("/orders");
                    } else {
                        toast.error("Payment verification failed.");
                    }
                },
                prefill: {
                    name: session.user.name,
                    email: session.user.email,
                    contact: formData.phone,
                },
                theme: { color: "#047857" },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error: any) {
            console.error(error);
            toast.error("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 py-6 sm:py-10">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                {/* Header */}
                <div className="mb-8 sm:mb-10">
                    <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-emerald-800 transition-colors mb-4 group">
                        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Cart
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl shadow-lg shadow-emerald-900/20">
                            <CreditCard className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-emerald-900">Checkout</h1>
                            <p className="text-stone-500 text-sm sm:text-base mt-1">Complete your order with secure payment</p>
                        </div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        {[
                            { step: 1, label: "Shipping", icon: MapPin },
                            { step: 2, label: "Payment", icon: CreditCard },
                            { step: 3, label: "Complete", icon: Check },
                        ].map((item, index) => (
                            <div key={item.step} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${activeStep >= item.step
                                            ? 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-lg shadow-emerald-900/30'
                                            : 'bg-stone-100 text-stone-400'
                                        }`}>
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className={`mt-2 text-xs sm:text-sm font-medium ${activeStep >= item.step ? 'text-emerald-800' : 'text-stone-400'}`}>
                                        {item.label}
                                    </span>
                                </div>
                                {index < 2 && (
                                    <div className={`w-12 sm:w-24 h-1 mx-2 rounded-full transition-all duration-500 ${activeStep > item.step ? 'bg-emerald-600' : 'bg-stone-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">
                    {/* Shipping Form */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="border-0 shadow-xl shadow-emerald-900/5 overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 text-white p-6 sm:p-8">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                                        </div>
                                        Shipping Details
                                    </CardTitle>
                                    {/* Completion indicator */}
                                    <div className="hidden sm:flex items-center gap-3">
                                        <div className="text-xs text-emerald-200">{completionPercent}% complete</div>
                                        <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white rounded-full transition-all duration-500"
                                                style={{ width: `${completionPercent}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8 space-y-6">
                                {/* Name Fields */}
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                                            <User className="h-4 w-4 text-emerald-600" />
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className={`relative transition-all duration-300 ${focusedField === 'firstName' ? 'scale-[1.02]' : ''}`}>
                                            <Input
                                                name="firstName"
                                                placeholder="Enter first name"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('firstName')}
                                                onBlur={() => setFocusedField(null)}
                                                className="border-2 border-stone-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl h-14 text-base pl-4 transition-all duration-300"
                                            />
                                            {formData.firstName && (
                                                <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                                            <User className="h-4 w-4 text-emerald-600" />
                                            Last Name
                                        </label>
                                        <div className={`relative transition-all duration-300 ${focusedField === 'lastName' ? 'scale-[1.02]' : ''}`}>
                                            <Input
                                                name="lastName"
                                                placeholder="Enter last name"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('lastName')}
                                                onBlur={() => setFocusedField(null)}
                                                className="border-2 border-stone-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl h-14 text-base pl-4 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                                        <Home className="h-4 w-4 text-emerald-600" />
                                        Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className={`relative transition-all duration-300 ${focusedField === 'address' ? 'scale-[1.01]' : ''}`}>
                                        <Input
                                            name="address"
                                            placeholder="Street address, apartment, suite, etc."
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('address')}
                                            onBlur={() => setFocusedField(null)}
                                            className="border-2 border-stone-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl h-14 text-base pl-4 transition-all duration-300"
                                        />
                                        {formData.address && (
                                            <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                                        )}
                                    </div>
                                </div>

                                {/* City */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-emerald-600" />
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <div className={`relative transition-all duration-300 ${focusedField === 'city' ? 'scale-[1.01]' : ''}`}>
                                        <Input
                                            name="city"
                                            placeholder="Enter city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('city')}
                                            onBlur={() => setFocusedField(null)}
                                            className="border-2 border-stone-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl h-14 text-base pl-4 transition-all duration-300"
                                        />
                                        {formData.city && (
                                            <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                                        )}
                                    </div>
                                </div>

                                {/* State and ZIP */}
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Enhanced State Dropdown */}
                                    <div className="space-y-2" ref={dropdownRef}>
                                        <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-emerald-600" />
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                                                className={`w-full h-14 px-4 text-left border-2 rounded-xl transition-all duration-300 flex items-center justify-between bg-white ${stateDropdownOpen
                                                        ? 'border-emerald-500 ring-4 ring-emerald-500/10 scale-[1.02]'
                                                        : 'border-stone-200 hover:border-emerald-300'
                                                    }`}
                                            >
                                                <span className={`text-base ${formData.state ? "text-stone-900 font-medium" : "text-stone-400"}`}>
                                                    {formData.state || "Select your state"}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {formData.state && (
                                                        <Check className="h-5 w-5 text-emerald-500" />
                                                    )}
                                                    <ChevronDown className={`h-5 w-5 text-stone-400 transition-transform duration-300 ${stateDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                                                </div>
                                            </button>

                                            {/* Dropdown Menu */}
                                            {stateDropdownOpen && (
                                                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-emerald-200 rounded-2xl shadow-2xl shadow-emerald-900/20 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                                    {/* Search Input */}
                                                    <div className="p-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white">
                                                        <div className="relative">
                                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                                                            <Input
                                                                type="text"
                                                                placeholder="Search states..."
                                                                value={stateSearch}
                                                                onChange={(e) => setStateSearch(e.target.value)}
                                                                className="h-11 pl-10 pr-10 border-stone-200 rounded-xl text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                                autoFocus
                                                            />
                                                            {stateSearch && (
                                                                <button
                                                                    onClick={() => setStateSearch("")}
                                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Options List */}
                                                    <div className="overflow-y-auto max-h-60 py-2">
                                                        {filteredStates.length > 0 ? (
                                                            filteredStates.map((state, index) => (
                                                                <button
                                                                    key={state}
                                                                    type="button"
                                                                    onClick={() => handleStateSelect(state)}
                                                                    className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center justify-between group ${formData.state === state
                                                                            ? 'bg-emerald-100 text-emerald-900'
                                                                            : 'hover:bg-emerald-50 text-stone-700'
                                                                        }`}
                                                                    style={{ animationDelay: `${index * 20}ms` }}
                                                                >
                                                                    <span className="font-medium">{state}</span>
                                                                    {formData.state === state && (
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-xs text-emerald-600 bg-emerald-200 px-2 py-0.5 rounded-full">Selected</span>
                                                                            <Check className="h-5 w-5 text-emerald-600" />
                                                                        </div>
                                                                    )}
                                                                </button>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-8 text-center">
                                                                <div className="w-12 h-12 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-3">
                                                                    <Search className="h-6 w-6 text-stone-400" />
                                                                </div>
                                                                <p className="text-stone-500 font-medium">No states found</p>
                                                                <p className="text-sm text-stone-400 mt-1">Try a different search term</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* ZIP Code */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-stone-700">
                                            PIN Code <span className="text-red-500">*</span>
                                        </label>
                                        <div className={`relative transition-all duration-300 ${focusedField === 'zip' ? 'scale-[1.02]' : ''}`}>
                                            <Input
                                                name="zip"
                                                placeholder="6-digit PIN code"
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('zip')}
                                                onBlur={() => setFocusedField(null)}
                                                className="border-2 border-stone-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl h-14 text-base pl-4 transition-all duration-300"
                                                maxLength={6}
                                            />
                                            {formData.zip.length === 6 && (
                                                <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-emerald-600" />
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className={`relative transition-all duration-300 ${focusedField === 'phone' ? 'scale-[1.01]' : ''}`}>
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-medium">+91</div>
                                        <Input
                                            name="phone"
                                            placeholder="10-digit mobile number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField(null)}
                                            className="border-2 border-stone-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl h-14 text-base pl-14 transition-all duration-300"
                                            maxLength={10}
                                        />
                                        {formData.phone.length === 10 && (
                                            <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary - Sticky */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-28 space-y-4">
                            <Card className="border-0 shadow-2xl shadow-emerald-900/15 overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 relative overflow-hidden">
                                    {/* Decorative */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl" />
                                    <CardTitle className="text-xl sm:text-2xl flex items-center gap-3 relative">
                                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <Package className="h-5 w-5 sm:h-6 sm:w-6" />
                                        </div>
                                        Order Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 sm:p-8 space-y-5">
                                    {/* Items List */}
                                    <div className="space-y-3 max-h-52 overflow-y-auto pr-2 -mr-2">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between items-start p-4 bg-gradient-to-r from-emerald-50 to-white rounded-xl border border-emerald-100 hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                                        <Package className="h-6 w-6 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-emerald-900 text-sm line-clamp-1">{item.name}</p>
                                                        <p className="text-stone-500 text-xs">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-emerald-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-3 pt-4 border-t border-emerald-100">
                                        <div className="flex justify-between text-stone-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium">₹{total().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-stone-600">
                                            <span>Shipping</span>
                                            <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                                <Truck className="h-4 w-4" />
                                                FREE
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-stone-600">
                                            <span>Tax</span>
                                            <span className="font-medium">₹0.00</span>
                                        </div>
                                        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent my-2" />
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-lg font-bold text-emerald-900">Total</span>
                                            <div className="text-right">
                                                <span className="text-3xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">₹{total().toFixed(2)}</span>
                                                <p className="text-xs text-stone-500">Including all taxes</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Button */}
                                    <Button
                                        className="w-full bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-600 text-white h-16 text-lg font-bold rounded-2xl shadow-xl shadow-emerald-900/30 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02]"
                                        onClick={handlePayment}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-3">
                                                <Loader2 className="animate-spin h-6 w-6" />
                                                Processing Payment...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-3">
                                                <Lock className="h-5 w-5" />
                                                Pay ₹{total().toFixed(2)} Securely
                                                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                            </span>
                                        )}
                                    </Button>

                                    {/* Trust Indicators */}
                                    <div className="pt-4 grid grid-cols-2 gap-3">
                                        {[
                                            { icon: Shield, label: "Secure Payment" },
                                            { icon: Lock, label: "256-bit SSL" },
                                            { icon: CreditCard, label: "Razorpay Verified" },
                                            { icon: Truck, label: "Fast Delivery" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 rounded-lg p-2">
                                                <item.icon className="h-4 w-4 text-emerald-600" />
                                                <span>{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Security Banner */}
                            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 rounded-xl">
                                    <Shield className="h-6 w-6 text-emerald-700" />
                                </div>
                                <div>
                                    <p className="font-semibold text-emerald-900 text-sm">100% Secure Payment</p>
                                    <p className="text-xs text-stone-600">Your payment information is encrypted and secure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}