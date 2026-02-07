import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import AddToCart from "@/components/AddToCart";
import ReviewForm from "@/components/ReviewForm";
import Link from "next/link";
import {
    Star,
    Leaf,
    ShieldCheck,
    Clock,
    Droplet,
    CheckCircle2,
    ArrowLeft,
    Package,
    Truck,
    Award,
    Heart,
    Info,
    BookOpen,
    Sparkles
} from "lucide-react";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function ProductPage(props: Props) {
    const params = await props.params;
    const productId = params.id;

    // Fetch Product
    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { reviews: { include: { user: true } } },
    });

    // Product Not Found
    if (!product) {
        return (
            <div className="min-h-screen bg-[#FEFDFB] flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-red-400" />
                    </div>
                    <h1 className="text-2xl font-serif text-stone-800 mb-3">Product Not Found</h1>
                    <p className="text-stone-500 mb-6">
                        The product you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-[#2D5A27] text-white px-6 py-3 rounded-full font-medium hover:bg-[#234A1E] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    // Auth Check
    let session = null;
    let hasPurchased = false;

    try {
        session = await auth();
        if (session?.user?.id) {
            const order = await prisma.order.findFirst({
                where: {
                    userId: session.user.id,
                    status: "PAID",
                    items: { some: { productId: product.id } },
                },
            });
            if (order) hasPurchased = true;
        }
    } catch (error) {
        console.error("Auth Error:", error);
    }

    // Calculate average rating
    const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
        : 0;

    return (
        <div className="min-h-screen bg-[#FEFDFB]">

            {/* ═══════════════════════════════════════════════════════════════════════ */}
            {/* BREADCRUMB */}
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            <div className="bg-white border-b border-stone-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-stone-400 hover:text-[#2D5A27] transition-colors">Home</Link>
                        <span className="text-stone-300">/</span>
                        <Link href="/products" className="text-stone-400 hover:text-[#2D5A27] transition-colors">Products</Link>
                        <span className="text-stone-300">/</span>
                        <span className="text-[#2D5A27] font-medium">{product.name}</span>
                    </nav>
                </div>
            </div>


            {/* ═══════════════════════════════════════════════════════════════════════ */}
            {/* MAIN PRODUCT SECTION */}
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            <section className="py-8 sm:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">

                        {/* LEFT: Product Image */}
                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-[#F8F9F7] to-[#F5F0E8] rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-[500px] relative overflow-hidden border border-stone-100">
                                {/* Category Badge */}
                                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold uppercase tracking-wide text-[#2D5A27] shadow-sm">
                                    {product.category}
                                </div>

                                {/* Product Image */}
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="max-h-[280px] sm:max-h-[350px] lg:max-h-[400px] object-contain drop-shadow-lg"
                                />
                            </div>

                            {/* Trust Badges - Below Image */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-white border border-stone-100 rounded-xl p-3 text-center">
                                    <ShieldCheck className="w-5 h-5 text-[#2D5A27] mx-auto mb-1" />
                                    <span className="text-xs text-stone-600 font-medium">Lab Tested</span>
                                </div>
                                <div className="bg-white border border-stone-100 rounded-xl p-3 text-center">
                                    <Leaf className="w-5 h-5 text-[#2D5A27] mx-auto mb-1" />
                                    <span className="text-xs text-stone-600 font-medium">100% Natural</span>
                                </div>
                                <div className="bg-white border border-stone-100 rounded-xl p-3 text-center">
                                    <Award className="w-5 h-5 text-[#8B6914] mx-auto mb-1" />
                                    <span className="text-xs text-stone-600 font-medium">GMP Certified</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Product Info */}
                        <div className="space-y-6">
                            {/* Product Name & Rating */}
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A3A17] mb-3">{product.name}</h1>

                                {product.reviews.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={i < Math.round(avgRating) ? "text-amber-400 fill-amber-400" : "text-stone-200"}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-stone-500">
                                            ({avgRating.toFixed(1)}) • {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Price & Quantity */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl sm:text-4xl font-bold text-[#2D5A27]">₹{product.price}</span>
                                <span className="text-sm text-stone-400 bg-stone-100 px-3 py-1 rounded-full">{product.quantity}</span>
                            </div>

                            {/* Description */}
                            <p className="text-stone-600 leading-relaxed text-base sm:text-lg">
                                {product.description}
                            </p>

                            {/* Add to Cart */}
                            <div className="pt-2">
                                <AddToCart product={product} />
                            </div>

                            {/* Delivery Info */}
                            <div className="flex flex-wrap gap-4 pt-2 text-sm text-stone-500">
                                <div className="flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-[#2D5A27]" />
                                    <span>Free shipping on orders above ₹500</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#2D5A27]" />
                                    <span>Delivery in 3-5 business days</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════════════════════ */}
            {/* PRODUCT DETAILS TABS */}
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            <section className="py-8 sm:py-12 bg-white border-t border-b border-stone-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

                        {/* Benefits */}
                        <div className="bg-gradient-to-br from-[#F8F9F7] to-[#EEF3ED] p-6 rounded-2xl border border-[#2D5A27]/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-[#2D5A27] rounded-xl flex items-center justify-center text-white">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <h3 className="font-serif text-lg text-[#1A3A17]">Key Benefits</h3>
                            </div>
                            <ul className="space-y-3">
                                {product.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#2D5A27] mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-600 text-sm">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Ingredients */}
                        <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5EFE5] p-6 rounded-2xl border border-[#8B6914]/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-[#8B6914] rounded-xl flex items-center justify-center text-white">
                                    <Leaf className="w-5 h-5" />
                                </div>
                                <h3 className="font-serif text-lg text-[#1A3A17]">Natural Ingredients</h3>
                            </div>
                            <p className="text-stone-600 text-sm leading-relaxed">
                                {product.ingredients}
                            </p>
                            <div className="mt-4 pt-4 border-t border-[#8B6914]/10">
                                <div className="flex items-center gap-2 text-xs text-[#8B6914]">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="font-medium">Sourced from the Himalayas</span>
                                </div>
                            </div>
                        </div>

                        {/* How to Use */}
                        <div className="bg-gradient-to-br from-[#F8F9F7] to-[#EEF3ED] p-6 rounded-2xl border border-[#2D5A27]/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-[#2D5A27] rounded-xl flex items-center justify-center text-white">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <h3 className="font-serif text-lg text-[#1A3A17]">How to Use</h3>
                            </div>
                            <p className="text-stone-600 text-sm leading-relaxed">
                                {product.howToUse}
                            </p>
                            <div className="mt-4 pt-4 border-t border-[#2D5A27]/10">
                                <div className="flex items-center gap-2 text-xs text-[#2D5A27]">
                                    <Info className="w-4 h-4" />
                                    <span className="font-medium">Consult a physician for personalized dosage</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════════════════════ */}
            {/* THE SAATWIK DIFFERENCE */}
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            <section className="py-12 sm:py-16 bg-[#1A3A17] text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-serif mb-2">The Saatwik Difference</h2>
                        <p className="text-white/60 text-sm">Why our formulations stand apart</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Droplet className="w-6 h-6 text-[#E8D5B7]" />
                            </div>
                            <h4 className="font-medium text-sm sm:text-base mb-1">Shodhana Process</h4>
                            <p className="text-white/50 text-xs">Traditional purification</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Clock className="w-6 h-6 text-[#E8D5B7]" />
                            </div>
                            <h4 className="font-medium text-sm sm:text-base mb-1">21-Day Minimum</h4>
                            <p className="text-white/50 text-xs">Processing time</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <ShieldCheck className="w-6 h-6 text-[#E8D5B7]" />
                            </div>
                            <h4 className="font-medium text-sm sm:text-base mb-1">7 Quality Tests</h4>
                            <p className="text-white/50 text-xs">Before packaging</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 text-center">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Sparkles className="w-6 h-6 text-[#E8D5B7]" />
                            </div>
                            <h4 className="font-medium text-sm sm:text-base mb-1">Vedic Mantras</h4>
                            <p className="text-white/50 text-xs">108 chants blessing</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════════════════════ */}
            {/* CUSTOMER REVIEWS */}
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#1A3A17] mb-8 text-center">
                        Customer Reviews
                    </h2>

                    {/* Review Form */}
                    {hasPurchased ? (
                        <div className="mb-10 p-6 bg-[#F8F9F7] rounded-2xl border border-stone-100">
                            <h3 className="font-serif text-lg text-[#1A3A17] mb-4">Share Your Experience</h3>
                            <ReviewForm productId={product.id} />
                        </div>
                    ) : session?.user ? (
                        <div className="mb-8 p-4 bg-amber-50 text-amber-800 rounded-xl text-sm text-center border border-amber-100">
                            <Info className="w-4 h-4 inline mr-2" />
                            Purchase this product to leave a review.
                        </div>
                    ) : null}

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {product.reviews.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-stone-100">
                                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-stone-300" />
                                </div>
                                <p className="text-stone-500">No reviews yet. Be the first to review this product!</p>
                            </div>
                        ) : (
                            product.reviews.map((review) => (
                                <div key={review.id} className="bg-white p-6 rounded-2xl border border-stone-100">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#2D5A27] to-[#1A3A17] rounded-full flex items-center justify-center text-white font-serif font-bold">
                                                {review.user.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <div className="font-medium text-stone-800">{review.user.name}</div>
                                                <div className="flex mt-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={12}
                                                            className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-stone-200"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-[#2D5A27] bg-[#F0F5EF] px-2 py-1 rounded-full">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Verified
                                        </div>
                                    </div>
                                    <p className="text-stone-600 leading-relaxed">{review.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════════════════════ */}
            {/* BACK TO PRODUCTS CTA */}
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            <section className="py-12 bg-[#F5F0E8] border-t border-stone-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-xl sm:text-2xl font-serif text-[#1A3A17] mb-4">
                        Explore More Remedies
                    </h3>
                    <p className="text-stone-500 mb-6 max-w-md mx-auto text-sm sm:text-base">
                        Discover our complete range of authentic Ayurvedic formulations.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-[#2D5A27] text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-[#234A1E] transition-all shadow-lg shadow-[#2D5A27]/20"
                    >
                        <Leaf className="w-4 h-4" />
                        View All Products
                    </Link>
                </div>
            </section>

        </div>
    );
}