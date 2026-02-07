import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/SearchBar";
import { ArrowUpRight, Leaf, Sparkles, FilterX } from "lucide-react";

// ✅ Type definition for Next.js 15+
type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage(props: Props) {
    const searchParams = await props.searchParams;

    const query = (searchParams.q as string) || "";
    const category = (searchParams.category as string) || "";
    const minPrice = Number(searchParams.min) || 0;
    const maxPrice = Number(searchParams.max) || 10000;

    // 1. Logic: Smart Search (Name, Desc, Qty, Price)
    const isNumberQuery = !isNaN(Number(query)) && query.trim() !== "";
    const searchConditions: any[] = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { quantity: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
    ];

    if (isNumberQuery) {
        searchConditions.push({ price: { equals: Number(query) } });
    }

    const where: any = {
        AND: [
            { OR: searchConditions },
            { price: { gte: minPrice, lte: maxPrice } },
        ],
    };

    if (category && category !== "All") {
        where.AND.push({ category: category });
    }

    // 2. Data Fetching
    const products = await prisma.product.findMany({ where });
    const allCategories = await prisma.product.findMany({
        select: { category: true },
        distinct: ["category"],
    });

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans selection:bg-amber-100 selection:text-emerald-950">

            {/* 🌿 HERO HEADER */}
            <div className="relative pt-20 pb-12 px-6 border-b border-stone-200/60 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto text-center max-w-2xl">
                    <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-800 bg-emerald-50/50 px-4 py-1 tracking-widest uppercase text-[10px]">
                        Pure • Potent • Proven
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-serif text-emerald-950 mb-4 tracking-tight">
                        The <span className="italic text-emerald-600">Remedy</span> Collection
                    </h1>
                    <p className="text-stone-500 text-lg font-light leading-relaxed">
                        Browse our curated selection of time-honored Ayurvedic formulations. Each product is a chapter in the book of ancient healing.
                    </p>
                </div>
            </div>

            <div className="container mx-auto py-12 px-6">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* 🌿 SIDEBAR (Apothecary Menu Style) */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-10">
                        <div className="sticky top-28 space-y-8">

                            {/* Search Block */}
                            <div className="space-y-3">
                                <h3 className="font-serif text-lg text-emerald-900 flex items-center gap-2">
                                    <Sparkles size={16} className="text-amber-500" />
                                    Find Your Cure
                                </h3>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-100 to-stone-100 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                                    <div className="relative">
                                        <SearchBar />
                                    </div>
                                </div>
                            </div>

                            {/* Categories Block */}
                            <div className="space-y-3">
                                <h3 className="font-serif text-lg text-emerald-900 flex items-center gap-2">
                                    <Leaf size={16} className="text-emerald-600" />
                                    Formulations
                                </h3>
                                <nav className="flex flex-col gap-2">
                                    <Link
                                        href="/products"
                                        className={`px-4 py-3 rounded-lg text-sm transition-all duration-300 flex justify-between items-center border ${!category ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg shadow-emerald-900/20' : 'bg-white text-stone-600 border-stone-100 hover:border-emerald-200 hover:text-emerald-900'}`}
                                    >
                                        <span>View All</span>
                                        {!category && <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>}
                                    </Link>

                                    {allCategories.map((c) => (
                                        <Link
                                            key={c.category}
                                            href={`/products?category=${c.category}&q=${query}`}
                                            className={`px-4 py-3 rounded-lg text-sm transition-all duration-300 flex justify-between items-center border ${category === c.category ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg shadow-emerald-900/20' : 'bg-white text-stone-600 border-stone-100 hover:border-emerald-200 hover:text-emerald-900'}`}
                                        >
                                            <span>{c.category}</span>
                                            {category === c.category && <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Trust Badge (Small Sidebar Element) */}
                            <div className="bg-stone-100/50 p-6 rounded-2xl text-center border border-stone-200/50">
                                <p className="font-serif text-emerald-900 mb-2">Need Guidance?</p>
                                <p className="text-xs text-stone-500 mb-4">Our experts can help you choose the right remedy.</p>
                                <Link href="/about" className="text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider">
                                    Contact Us →
                                </Link>
                            </div>

                        </div>
                    </aside>

                    {/* 🌿 PRODUCT GRID */}
                    <main className="flex-1">
                        {products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[2rem] border border-stone-100 shadow-sm">
                                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                                    <FilterX className="text-stone-400" />
                                </div>
                                <h3 className="text-2xl font-serif text-emerald-900 mb-2">No remedies found</h3>
                                <p className="text-stone-400 max-w-sm mb-6">
                                    We couldn't find matches for "{query}". Try a different ingredient or category.
                                </p>
                                <Button asChild variant="outline" className="border-emerald-600 text-emerald-800 hover:bg-emerald-50 rounded-full px-8">
                                    <Link href="/products">View Full Collection</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                                {products.map((product) => (
                                    <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col h-full">
                                        {/* Card Container */}
                                        <div className="bg-white rounded-[2rem] p-4 border border-stone-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.1)] group-hover:border-emerald-100 relative overflow-hidden">

                                            {/* Image Area */}
                                            <div className="bg-[#F5F7F5] rounded-[1.5rem] h-64 flex items-center justify-center relative overflow-hidden group-hover:bg-[#EFF3EF] transition-colors duration-500">
                                                <img
                                                    src={product.img}
                                                    alt={product.name}
                                                    className="h-48 w-auto object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                                />

                                                {/* Floating Price Tag */}
                                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-emerald-950 font-serif font-bold px-4 py-2 rounded-full text-sm shadow-sm border border-stone-100">
                                                    ₹{product.price}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="pt-6 px-2 pb-2">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                                        {product.category}
                                                    </span>
                                                    <span className="text-xs text-stone-400 font-medium">{product.quantity}</span>
                                                </div>

                                                <h3 className="font-serif text-xl text-emerald-950 font-medium mb-3 group-hover:text-emerald-700 transition-colors line-clamp-1">
                                                    {product.name}
                                                </h3>

                                                <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed mb-6 h-10">
                                                    {product.description}
                                                </p>

                                                {/* Action Area */}
                                                <div className="flex items-center gap-2 text-sm font-bold text-stone-400 group-hover:text-emerald-800 transition-colors">
                                                    <span className="border-b border-transparent group-hover:border-emerald-800 transition-all">View Details</span>
                                                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}