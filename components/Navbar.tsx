"use client";

import Link from "next/link";
import CartIcon from "@/components/CartIcon";
import UserMenu from "@/components/UserMenu";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Leaf, ShoppingBag, User as UserIcon, LogIn, Shield } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = useSession();

    const isAdmin = session?.user?.role === "ADMIN";

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    // Dynamic nav links based on user role
    const navLinks = useMemo(() => {
        const links = [
            { href: "/", label: "Home", icon: Sparkles },
        ];

        // Add Admin Panel link for admin users
        if (isAdmin) {
            links.push({ href: "/admin", label: "Admin Panel", icon: Shield });
        }

        links.push(
            { href: "/products", label: "Remedies", icon: Leaf },
            { href: "/about", label: "Our Story", icon: ShoppingBag },
        );

        return links;
    }, [isAdmin]);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-emerald-900/5 py-2'
                : 'bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-md py-3 sm:py-4'
                }`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                            <div className="relative">
                                <div className={`absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}></div>
                                <div className={`relative bg-gradient-to-br from-emerald-800 to-emerald-950 p-1.5 sm:p-2 rounded-xl group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg ${scrolled ? 'scale-90' : 'scale-100'}`}>
                                    <img src="/logo.jpg" alt="Saatwika Ayurveda" className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg object-cover" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className={`font-serif font-bold tracking-tight text-emerald-950 transition-all duration-300 ${scrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
                                    Saatwika<span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">ayurveda</span>
                                </span>
                                <span className={`text-[10px] sm:text-xs text-stone-500 font-medium tracking-widest uppercase transition-all duration-300 ${scrolled ? 'opacity-0 h-0' : 'opacity-100'}`}>
                                    Ancient Wisdom
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-emerald-50/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-emerald-100/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 lg:px-5 py-2 text-sm font-medium text-stone-600 hover:text-emerald-800 transition-all duration-300 rounded-full hover:bg-white hover:shadow-md group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <link.icon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-2 group-hover:ml-0" />
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Cart Icon with enhanced styling */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                                <CartIcon />
                            </div>

                            {/* Desktop Auth Buttons */}
                            <div className="hidden md:flex items-center gap-2">
                                {session?.user ? (
                                    <UserMenu user={session.user} />
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button
                                                variant="ghost"
                                                className="text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-full px-4 transition-all duration-300"
                                            >
                                                <LogIn className="h-4 w-4 mr-2" />
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/signup">
                                            <Button className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-900/25 rounded-full px-6 py-2.5 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                                                <span className="relative z-10 flex items-center gap-2">
                                                    <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                                                    Get Started
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden relative p-2.5 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 group"
                                aria-label="Toggle menu"
                            >
                                <div className="relative w-5 h-5">
                                    <span className={`absolute left-0 w-5 h-0.5 bg-emerald-800 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'top-2.5 rotate-45' : 'top-1'}`}></span>
                                    <span className={`absolute left-0 top-2.5 w-5 h-0.5 bg-emerald-800 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}></span>
                                    <span className={`absolute left-0 w-5 h-0.5 bg-emerald-800 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'top-2.5 -rotate-45' : 'top-4'}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed navbar */}
            <div className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-20 sm:h-24'}`}></div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-gradient-to-br from-emerald-950/60 to-black/70 backdrop-blur-sm z-40 md:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Slide-in Panel */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-br from-white via-emerald-50/30 to-white z-50 md:hidden transform transition-all duration-500 ease-out ${mobileMenuOpen ? 'translate-x-0 shadow-2xl shadow-emerald-900/30' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-5 border-b border-emerald-100/50 bg-gradient-to-r from-emerald-900 to-emerald-800">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/10 backdrop-blur p-2 rounded-xl">
                                <img src="/logo.jpg" alt="" className="h-8 w-8 rounded-lg" />
                            </div>
                            <span className="text-lg font-serif font-bold text-white">
                                Saatwika<span className="text-emerald-300">ayurveda</span>
                            </span>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 overflow-y-auto p-5">
                        <div className="space-y-2">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-4 px-4 py-4 text-base font-medium text-stone-700 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-transparent hover:text-emerald-900 rounded-xl transition-all duration-300 group"
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="p-2.5 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl transition-colors">
                                        <link.icon className="h-5 w-5 text-emerald-700" />
                                    </div>
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Decorative Element */}
                        <div className="my-8 flex items-center gap-4">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
                            <Leaf className="h-5 w-5 text-emerald-400" />
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
                        </div>

                        {/* Mobile Auth Section */}
                        <div className="space-y-3">
                            {session?.user ? (
                                <div className="p-4 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {session.user.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-emerald-900">{session.user.name}</p>
                                            <p className="text-sm text-stone-500">{session.user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-center border-2 border-emerald-200 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl py-6 text-base font-medium transition-all duration-300"
                                        >
                                            <LogIn className="h-5 w-5 mr-2" />
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full justify-center bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-xl py-6 text-base font-medium shadow-lg shadow-emerald-900/20 transition-all duration-300">
                                            <Sparkles className="h-5 w-5 mr-2" />
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="p-5 border-t border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
                        <p className="text-xs text-center text-stone-500">
                            🌿 Ancient Wisdom, Modern Wellness
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}