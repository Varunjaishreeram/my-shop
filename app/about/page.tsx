"use client";

import React from "react";
import { motion, Variants } from "framer-motion"; // ✅ 1. Import Variants type
import {
    Mail,
    Phone,
    Instagram,
    Facebook,
    Youtube,
    Twitter,
    Quote,
    Feather,
    BookOpen,
    Users,
    Leaf,
    MapPin,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    const imagePath = "/logo.jpg";

    const formatWhatsAppNumber = (number: string) => {
        let cleanedNumber = number.replace(/\s+/g, "");
        if (!cleanedNumber.startsWith("91")) {
            cleanedNumber = "91" + cleanedNumber;
        }
        return cleanedNumber;
    };

    const socials = [
        { name: "Instagram", icon: <Instagram size={20} />, href: "https://www.instagram.com/saatwik_aayurveda/?next=%2F", color: "hover:text-pink-600 hover:bg-pink-50" },
        { name: "Facebook", icon: <Facebook size={20} />, href: "https://www.facebook.com/saatwik.aayurveda/", color: "hover:text-blue-600 hover:bg-blue-50" },
        { name: "YouTube", icon: <Youtube size={20} />, href: "https://www.youtube.com/@SaatwikAayurveda", color: "hover:text-red-600 hover:bg-red-50" },
        { name: "Twitter", icon: <Twitter size={20} />, href: "#", color: "hover:text-sky-500 hover:bg-sky-50" },
    ];

    // ✅ 2. Explicitly type this object as 'Variants'
    // This fixes the "Type 'string' is not assignable to type 'Easing'" error
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans selection:bg-amber-100 selection:text-emerald-950 overflow-hidden">

            {/* 🌿 SECTION 1: ELEGANT HERO (Centered) */}
            <section className="relative py-24 md:py-32 px-6 border-b border-stone-200/60">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>

                <div className="container mx-auto max-w-4xl text-center z-10 relative">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex justify-center mb-6"
                    >
                        <div className="bg-emerald-50 text-emerald-800 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-emerald-100">
                            Our Story & Contact
                        </div>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="text-5xl md:text-7xl font-serif text-emerald-950 mb-8 leading-tight"
                    >
                        Healing with <br /> <span className="italic text-emerald-600">Divine Grace</span>
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="text-xl text-stone-600 leading-relaxed font-light"
                    >
                        Guided by the wisdom of our elders and the Vedas, <strong className="font-serif text-emerald-800">Saatwik Aayurveda</strong> is more than a brand—it is a mission to reconnect our community with ancient holistic healing.
                    </motion.p>
                </div>
            </section>

            {/* 🌿 SECTION 2: THE FOUNDER (Magazine Style Layout) */}
            <section className="py-24 px-6 container mx-auto">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="bg-stone-100 p-8 rounded-t-[10rem] rounded-b-3xl pb-12 text-center border border-stone-200 relative z-10">
                            <img
                                src={imagePath}
                                alt="Logo"
                                className="w-48 h-48 mx-auto object-contain mix-blend-multiply mb-6 hover:scale-105 transition-transform duration-500"
                            />
                            <h3 className="text-3xl font-serif text-emerald-900 mb-1">Mr. Panchal</h3>
                            <p className="text-amber-600 font-medium uppercase tracking-wider text-sm">Founder & Visionary</p>
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute top-10 -left-10 w-full h-full bg-emerald-50 rounded-full -z-0 opacity-60 blur-3xl"></div>
                    </motion.div>

                    {/* Right: The Narrative */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-4xl font-serif text-emerald-950 mb-6">A Journey of <span className="italic text-amber-600">Devotion.</span></h2>
                            <div className="prose prose-lg text-stone-600">
                                <p className="mb-4">
                                    <Feather className="inline w-5 h-5 text-emerald-600 mr-2" />
                                    "It begins with <strong>Om</strong>. This spiritual foundation is the seed from which we blossomed."
                                </p>
                                <p className="leading-relaxed">
                                    Mr. Panchal dedicated <strong>three decades</strong> to education as a principal, marked by truthfulness and discipline. Parallel to this, a burning desire to serve society led to a <strong>20-year study of the Atharva Veda</strong>, exploring interpretations by seven scholars.
                                </p>
                            </div>
                        </motion.div>

                        {/* The 3 Pillars (Horizontal Scroll on mobile, Grid on Desktop) */}
                        <div className="grid md:grid-cols-2 gap-6 pt-6">
                            <motion.div whileHover={{ y: -5 }} className="p-6 bg-white border border-stone-100 shadow-sm rounded-xl">
                                <BookOpen className="text-emerald-600 mb-3" />
                                <h4 className="font-serif text-lg text-emerald-900 font-bold mb-2">Ancestral Legacy</h4>
                                <p className="text-sm text-stone-500">
                                    Inspired by a 75-year-old handwritten manuscript by his grandfather, containing 450+ herbal remedies.
                                </p>
                            </motion.div>

                            <motion.div whileHover={{ y: -5 }} className="p-6 bg-white border border-stone-100 shadow-sm rounded-xl">
                                <Leaf className="text-emerald-600 mb-3" />
                                <h4 className="font-serif text-lg text-emerald-900 font-bold mb-2">30 Years of Purity</h4>
                                <p className="text-sm text-stone-500">
                                    Our formulations have been rigorously tested, refined, and documented for over three decades before reaching you.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🌿 SECTION 3: PHILOSOPHY (Dark Immersive) */}
            <section className="bg-emerald-950 text-stone-200 py-24 px-6 relative overflow-hidden">
                {/* Abstract Gold Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-amber-500/50"></div>

                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <Quote className="w-12 h-12 text-amber-500/80 mx-auto mb-8" />

                    <motion.h3
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-serif leading-tight mb-8"
                    >
                        "Our mission transcends commerce. We aspire to reacquaint our nation with the timeless wisdom of the Vedas."
                    </motion.h3>

                    <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-8"></div>

                    <p className="text-emerald-100/70 text-lg font-light">
                        We believe material rewards are preordained. Our true aim is to inspire future generations to connect with the profound knowledge of our sages.
                    </p>
                </div>
            </section>

            {/* 🌿 SECTION 4: CONTACT & SOCIALS (Clean & Actionable) */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-emerald-900 mb-4">Get in Touch</h2>
                        <p className="text-stone-500">We are here to guide you on your wellness journey.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Direct Contact */}
                        <div className="space-y-6">
                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:border-emerald-200 transition-colors">
                                <h4 className="font-serif text-xl text-emerald-900 mb-6 flex items-center gap-2">
                                    <Users size={20} className="text-amber-600" /> Direct Support
                                </h4>

                                <div className="space-y-4">
                                    <a href="mailto:Saatwikaayurveda2790@gmail.com" className="flex items-center gap-4 group cursor-pointer">
                                        <div className="bg-white p-3 rounded-full shadow-sm text-stone-400 group-hover:text-emerald-600 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <span className="text-stone-600 font-medium group-hover:text-emerald-900 transition-colors break-all">
                                            Saatwikaayurveda2790@gmail.com
                                        </span>
                                    </a>

                                    <div className="flex flex-col gap-4">
                                        <a href={`https://wa.me/${formatWhatsAppNumber("90455 88110")}`} className="flex items-center gap-4 group cursor-pointer">
                                            <div className="bg-white p-3 rounded-full shadow-sm text-stone-400 group-hover:text-emerald-600 transition-colors">
                                                <Phone size={18} />
                                            </div>
                                            <span className="text-stone-600 font-medium group-hover:text-emerald-900">
                                                +91 90455 88110
                                            </span>
                                        </a>

                                        <a href={`https://wa.me/${formatWhatsAppNumber("94122 19854")}`} className="flex items-center gap-4 group cursor-pointer">
                                            <div className="bg-white p-3 rounded-full shadow-sm text-stone-400 group-hover:text-emerald-600 transition-colors">
                                                <Phone size={18} />
                                            </div>
                                            <span className="text-stone-600 font-medium group-hover:text-emerald-900">
                                                +91 94122 19854
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Grid */}
                        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
                            <h4 className="font-serif text-xl text-emerald-900 mb-6">Follow Our Journey</h4>
                            <p className="text-emerald-800/70 mb-8 text-sm">
                                Stay updated with daily health tips, new remedies, and wisdom from the Vedas.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {socials.map((social) => (
                                    <Button
                                        key={social.name}
                                        variant="outline"
                                        className={`h-14 justify-start gap-3 bg-white border-emerald-100 text-stone-600 ${social.color} transition-all duration-300`}
                                        asChild
                                    >
                                        <a href={social.href} target="_blank" rel="noreferrer">
                                            {social.icon}
                                            <span>{social.name}</span>
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 🗺️ SECTION 5: LOCATION / GOOGLE MAP */}
            <section className="py-24 px-6 bg-gradient-to-b from-white to-emerald-50/30">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                                <MapPin size={14} />
                                Our Location
                            </div>
                            <h2 className="text-4xl font-serif text-emerald-900 mb-4">Visit Us</h2>
                            <p className="text-stone-500 max-w-xl mx-auto">
                                Experience the essence of Ayurveda at our doorstep. We welcome you to visit our humble abode.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid lg:grid-cols-3 gap-8"
                    >
                        {/* Address Card */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                                    <MapPin className="h-7 w-7 text-white" />
                                </div>

                                <h3 className="text-xl font-serif text-emerald-900 mb-4">Founder's Address</h3>

                                <div className="space-y-4">
                                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <p className="text-stone-700 leading-relaxed font-medium">
                                            Saatwik Aayurveda C 4/10 Dalip Park, Modinagar 201024
                                        </p>
                                        <p className="text-stone-600">
                                            Bisokhar, Uttar Pradesh
                                        </p>

                                    </div>

                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Dalip+Park+Modinagar+Bisokhar+Uttar+Pradesh+201204"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg group"
                                    >
                                        <span>Get Directions</span>
                                        <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </div>

                                <div className="mt-6 pt-6 border-t border-stone-100">
                                    <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">Business Hours</p>
                                    <p className="text-stone-600 text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                                    <p className="text-stone-500 text-sm">Sunday: By Appointment</p>
                                </div>
                            </div>
                        </div>

                        {/* Embedded Google Map */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-3 rounded-3xl border border-stone-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                                <div className="rounded-2xl overflow-hidden h-full min-h-[400px] lg:min-h-full">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.5!2d77.577!3d28.835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c63c00000001%3A0x0!2sDalip%20Park%2C%20Modinagar%2C%20Bisokhar%2C%20Uttar%20Pradesh%20201204!5e0!3m2!1sen!2sin!4v1707300000000!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: '400px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Saatwik Aayurveda Location - Dalip Park, Modinagar"
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-stone-500 text-sm">
                            📍 We recommend calling ahead to schedule a visit for personalized consultation.
                        </p>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}