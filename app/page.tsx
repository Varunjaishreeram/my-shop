import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sprout,
  Feather,
  Droplet,
  Sun,
  ArrowUpRight,
  Scroll,
  ShieldCheck,
  Microscope,
  Flower2,
  CheckCircle2,
  Heart,
  Leaf,
  Award,
  BookOpen,
  Beaker,
  Mountain,
  Timer,
  Sparkles,
  Quote,
  Star,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({ take: 3 });

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFDFB] text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 🌿 HERO SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-gradient-to-br from-[#F8F6F0] via-[#FEFDFB] to-[#F5F0E8]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2D5A27 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Soft Gradient Orbs */}
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#E8D5B7]/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-[#D4E5D1]/40 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Text Content */}
            <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#2D5A27]/10 shadow-sm mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse"></span>
                <span className="text-xs font-semibold tracking-wide uppercase text-[#2D5A27]">
                  Saatwik Aayurveda
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight">
                <span className="text-[#1A3A17]">Wisdom of</span>
                <br />
                <span className="italic text-[#8B6914]">The Vedas.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-stone-600 max-w-lg leading-relaxed mx-auto lg:mx-0">
                We craft authentic <strong className="text-[#2D5A27] font-semibold">Ayurvedic medicine</strong> using a 75-year-old ancestral manuscript and the sacred wisdom of the Atharva Veda. No shortcuts. No compromises.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
                <Button asChild className="h-12 sm:h-14 px-8 rounded-full bg-[#2D5A27] hover:bg-[#234A1E] text-white text-base font-medium shadow-lg shadow-[#2D5A27]/20 transition-all hover:shadow-xl">
                  <Link href="/products" className="flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Explore Remedies
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 sm:h-14 px-8 rounded-full border-2 border-[#8B6914]/30 text-[#8B6914] hover:bg-[#8B6914]/5 text-base bg-white">
                  <Link href="/about" className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Our Story
                  </Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#2D5A27]" />
                  <span className="text-sm font-medium text-stone-600">Lab Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-[#2D5A27]" />
                  <span className="text-sm font-medium text-stone-600">100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#8B6914]" />
                  <span className="text-sm font-medium text-stone-600">GMP Certified</span>
                </div>
              </div>
            </div>

            {/* Right: Image + Floating Card */}
            <div className="relative order-1 lg:order-2">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/10 border-4 border-white aspect-[4/5] max-h-[600px]">
                <img
                  src="https://images.unsplash.com/photo-1492552085122-36706c238263?q=80&w=897&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Ayurvedic herbs and natural ingredients"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A17]/30 via-transparent to-transparent"></div>

                {/* Stats on Image */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3 justify-center">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg text-center">
                    <div className="text-xl font-bold text-[#2D5A27]">450+</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider">Remedies</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg text-center">
                    <div className="text-xl font-bold text-[#8B6914]">75</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider">Years Legacy</div>
                  </div>
                </div>
              </div>

              {/* Floating Card - Properly Positioned */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white p-4 rounded-2xl shadow-xl shadow-stone-900/10 border border-stone-100 max-w-[260px] z-20">
                <div className="flex gap-3 items-start">
                  <div className="bg-[#F5F0E8] p-2.5 rounded-xl text-[#8B6914] flex-shrink-0">
                    <Scroll size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-[#1A3A17] text-sm font-medium leading-tight">Ancient Manuscript</h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      Formulations from my grandfather's handwritten manuscript.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 🎯 OUR MISSION */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2D5A27] via-[#8B6914] to-[#2D5A27]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F0E8] text-[#8B6914] text-xs font-semibold uppercase tracking-wide mb-6">
              <Heart className="w-4 h-4" />
              Our Mission
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A3A17] leading-tight mb-6">
              Reviving the <span className="text-[#8B6914] italic">Forgotten Science</span> of Vedic Healing
            </h2>

            <p className="text-lg text-stone-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              In a world of synthetic supplements, we stand as guardians of authentic Ayurveda—bringing you medicine that heals at the root, not just the surface.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-[#F8F9F7] p-6 sm:p-8 rounded-2xl border border-[#2D5A27]/10 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#2D5A27] mx-auto mb-4 shadow-sm">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl text-[#1A3A17] mb-2">Preserve</h3>
                <p className="text-stone-500 text-sm">Safeguarding ancient Vedic formulations from being lost to time.</p>
              </div>

              <div className="bg-[#FAF8F3] p-6 sm:p-8 rounded-2xl border border-[#8B6914]/10 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#8B6914] mx-auto mb-4 shadow-sm">
                  <Flower2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl text-[#1A3A17] mb-2">Purify</h3>
                <p className="text-stone-500 text-sm">Creating medicines free from chemicals, steroids, and adulterants.</p>
              </div>

              <div className="bg-[#F8F9F7] p-6 sm:p-8 rounded-2xl border border-[#2D5A27]/10 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#2D5A27] mx-auto mb-4 shadow-sm">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl text-[#1A3A17] mb-2">Heal</h3>
                <p className="text-stone-500 text-sm">Empowering people to discover natural wellness through time-tested remedies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 👨‍🏫 THE FOUNDER & VISIONARY */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#FEFDFB] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image Grid */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64">
                    <img
                      src="https://images.unsplash.com/photo-1476994230281-1448088947db?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Ancient manuscripts and books"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg h-36 md:h-44">
                    <img
                      src="https://images.unsplash.com/photo-1726146198306-afe0a44b0073?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Ayurvedic herbs preparation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-36 md:h-44">
                    <img
                      src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop"
                      alt="Mortar and pestle with herbs"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64">
                    <img
                      src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Natural herbs and spices"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Quote Card */}
              <div className="absolute -bottom-4 left-4 right-4 sm:left-auto sm:right-0 sm:max-w-[280px] bg-white p-5 rounded-2xl shadow-xl border border-stone-100 z-10">
                <Quote className="w-6 h-6 text-[#8B6914] mb-2" />
                <p className="text-stone-600 italic text-sm leading-relaxed">
                  "True medicine heals the soul first, then the body follows."
                </p>
                <p className="text-[#2D5A27] font-semibold mt-2 text-sm">— Mr. Panchal, Founder</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-[#8B6914] font-semibold tracking-wide uppercase text-xs">
                <Star className="w-4 h-4" />
                Meet The Visionary
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A3A17] leading-tight">
                A Scholar's Journey to <span className="text-[#8B6914] italic">Sacred Healing</span>
              </h2>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                <strong className="text-[#2D5A27]">Mr. Panchal</strong> is not a businessman—he is a devoted scholar. His path to Saatwik Aayurveda was paved by decades of discipline, study, and commitment to truth.
              </p>

              {/* Timeline */}
              <div className="space-y-5 pt-4 border-l-2 border-[#2D5A27]/20 ml-2">
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#2D5A27] border-4 border-white shadow"></div>
                  <h4 className="font-serif text-lg text-[#1A3A17] font-medium">30 Years as an Educator</h4>
                  <p className="text-stone-500 text-sm mt-1">Served as Principal, embodying truthfulness and service.</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#2D5A27] border-4 border-white shadow"></div>
                  <h4 className="font-serif text-lg text-[#1A3A17] font-medium">20 Years Studying Vedas</h4>
                  <p className="text-stone-500 text-sm mt-1">Deep immersion in the <strong className="text-[#2D5A27]">Atharva Veda</strong> with interpretations by 7 scholars.</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#8B6914] border-4 border-white shadow"></div>
                  <h4 className="font-serif text-lg text-[#8B6914] font-medium">The Sacred Discovery</h4>
                  <p className="text-stone-500 text-sm mt-1">Unearthed a 75-year-old manuscript with <strong className="text-[#8B6914]">450+ remedies</strong> by his grandfather.</p>
                </div>
              </div>

              <Button asChild className="mt-4 h-12 px-6 rounded-full bg-[#8B6914] hover:bg-[#7A5C12] text-white font-medium shadow-lg">
                <Link href="/about" className="flex items-center gap-2">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 🔬 THE SAATWIK METHOD - Manufacturing Process */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#1A3A17] text-white relative overflow-hidden">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#E8D5B7] text-xs font-semibold uppercase tracking-wide mb-6 border border-white/10">
              <Beaker className="w-4 h-4" />
              Our Sacred Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4">
              <span className="text-[#E8D5B7]">Purity</span> is a Process
            </h2>
            <p className="text-white/70 text-base sm:text-lg">
              We follow the strict protocols of <em className="text-[#E8D5B7]">Bhaishajya Kalpana</em> (Ayurvedic pharmaceutics). Here is how your medicine is made.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#E8D5B7]/30 transition-all group backdrop-blur-sm">
              <span className="absolute top-4 right-4 text-4xl font-serif text-white/10 font-bold">01</span>
              <div className="w-12 h-12 bg-[#2D5A27] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Mountain size={24} />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Divine Sourcing</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Herbs sourced from the Himalayas during specific seasons for maximum potency.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#E8D5B7]/30 transition-all group backdrop-blur-sm">
              <span className="absolute top-4 right-4 text-4xl font-serif text-white/10 font-bold">02</span>
              <div className="w-12 h-12 bg-[#8B6914] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Droplet size={24} />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Shodhana (शोधन)</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Purification with cow's milk, pure ghee, or medicinal juices to remove toxins.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#E8D5B7]/30 transition-all group backdrop-blur-sm">
              <span className="absolute top-4 right-4 text-4xl font-serif text-white/10 font-bold">03</span>
              <div className="w-12 h-12 bg-[#2D5A27] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Sun size={24} />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Paka (पाक)</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Slow-heat cooking preserves the molecular integrity of active compounds.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#E8D5B7]/30 transition-all group backdrop-blur-sm">
              <span className="absolute top-4 right-4 text-4xl font-serif text-white/10 font-bold">04</span>
              <div className="w-12 h-12 bg-[#8B6914] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Microscope size={24} />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Modern Testing</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Lab testing for heavy metals, microbial contamination, and therapeutic efficacy.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#E8D5B7] mb-1">21 Days</div>
              <p className="text-white/50 text-xs sm:text-sm">Minimum processing</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#E8D5B7] mb-1">7 Tests</div>
              <p className="text-white/50 text-xs sm:text-sm">Quality checks</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#E8D5B7] mb-1">108</div>
              <p className="text-white/50 text-xs sm:text-sm">Vedic mantras</p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 🛍️ FEATURED PRODUCTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#FEFDFB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-[#8B6914] font-semibold tracking-wide uppercase text-xs mb-3">
                <Leaf className="w-4 h-4" />
                Our Remedies
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A3A17]">
                Time-Tested <span className="text-[#8B6914] italic">Formulations</span>
              </h2>
            </div>
            <Link href="/products" className="group flex items-center gap-2 bg-[#F5F0E8] hover:bg-[#EDE5D5] text-[#8B6914] font-medium px-5 py-2.5 rounded-full transition-all">
              View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl p-4 border border-stone-100 hover:border-[#2D5A27]/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full">

                  {/* Image */}
                  <div className="bg-gradient-to-br from-[#F8F9F7] to-[#F5F0E8] rounded-xl h-64 sm:h-72 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-48 sm:h-56 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide text-[#2D5A27]">
                      {product.category}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-5 px-1 flex-grow flex flex-col">
                    <h3 className="font-serif text-xl text-[#1A3A17] mb-2 group-hover:text-[#2D5A27] transition-colors">{product.name}</h3>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

                    <div className="mt-auto flex justify-between items-center border-t border-stone-100 pt-4">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Price</span>
                        <div className="text-xl font-serif font-bold text-[#2D5A27]">₹{product.price}</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#8B6914] group-hover:bg-[#2D5A27] group-hover:text-white transition-all duration-300">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 🌟 WHY AYURVEDA */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#F5F0E8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Content */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-[#2D5A27] font-semibold tracking-wide uppercase text-xs">
                <Sprout className="w-4 h-4" />
                Why Ayurveda?
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A3A17] leading-tight">
                The Science That <span className="text-[#8B6914] italic">Heals at the Root</span>
              </h2>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                Unlike modern medicine that treats symptoms, Ayurveda addresses the root cause. It's a complete system for living in harmony with nature.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#2D5A27] flex-shrink-0 shadow-sm">
                    <Timer className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#1A3A17] mb-1">5,000+ Years Proven</h4>
                    <p className="text-stone-500 text-sm">Time-tested remedies that have healed generations.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#8B6914] flex-shrink-0 shadow-sm">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#1A3A17] mb-1">No Side Effects</h4>
                    <p className="text-stone-500 text-sm">Pure plant-based formulations that work with your body.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#2D5A27] flex-shrink-0 shadow-sm">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#1A3A17] mb-1">Holistic Wellness</h4>
                    <p className="text-stone-500 text-sm">Treats mind, body, and spirit as one interconnected system.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=499&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Natural Ayurvedic ingredients"
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 🏆 CERTIFICATIONS BAR */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-12 bg-[#2D5A27]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
            <div className="flex items-center gap-2 text-white/90">
              <ShieldCheck className="w-6 h-6 text-[#E8D5B7]" />
              <span className="text-sm sm:text-base font-medium">GMP Certified</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2 text-white/90">
              <Award className="w-6 h-6 text-[#E8D5B7]" />
              <span className="text-sm sm:text-base font-medium">AYUSH Approved</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2 text-white/90">
              <Microscope className="w-6 h-6 text-[#E8D5B7]" />
              <span className="text-sm sm:text-base font-medium">Lab Tested</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2 text-white/90">
              <Sprout className="w-6 h-6 text-[#E8D5B7]" />
              <span className="text-sm sm:text-base font-medium">100% Natural</span>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 📜 PLEDGE & NEWSLETTER */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#1A3A17] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[#E8D5B7] font-semibold tracking-wide uppercase text-xs mb-4">
                <Heart className="w-4 h-4" />
                Our Pledge
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif mb-6">A Promise to Your Wellbeing</h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                We believe in Karma. Selling impure medicine is a sin. Every bottle from our facility comes with our sacred guarantee:
              </p>
              <ul className="space-y-3">
                {[
                  "Free from Heavy Metals (Bhasma Tested)",
                  "No Synthetic Steroids or Fillers",
                  "Cruelty-Free & Ethically Sourced",
                  "Blessed with Vedic Mantras"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#E8D5B7] w-5 h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <Feather className="w-10 h-10 text-[#E8D5B7] mx-auto mb-4" />
              <h3 className="text-xl font-serif mb-3 text-center">Join the Saatwik Family</h3>
              <p className="text-white/60 mb-6 text-center text-sm">
                Subscribe for Mr. Panchal's health wisdom and exclusive offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-[#E8D5B7]/50 transition-all text-sm"
                />
                <Button className="bg-[#8B6914] hover:bg-[#7A5C12] text-white px-6 py-3 rounded-xl font-medium">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-white/40 mt-3 text-center">We respect your privacy. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}