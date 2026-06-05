"use client";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { useEffect, useRef, useState } from "react";

/* ── Intersection observer hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Data ── */
const highlights = [
  { icon: "🌿", title: "Fresh Ingredients", desc: "Locally sourced, organic produce handpicked daily for peak freshness." },
  { icon: "👨‍🍳", title: "Expert Chefs", desc: "Award-winning chefs crafting culinary masterpieces with passion." },
  { icon: "🕯️", title: "Cozy Ambiance", desc: "Warm lighting, elegant décor, and soothing music for the perfect evening." },
  { icon: "✨", title: "Premium Dining", desc: "An unforgettable experience from the first sip to the last bite." },
];

const featuredDishes = [
  { name: "Grilled Chicken Steak", price: "₹499", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=600&auto=format&fit=crop", tag: "Chef's Special" },
  { name: "Paneer Butter Masala", price: "₹349", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop", tag: "Bestseller" },
  { name: "Crispy Chicken Wings", price: "₹249", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=600&auto=format&fit=crop", tag: "Popular" },
  { name: "Garlic Bread", price: "₹149", img: "/images/garlic-bread-v2.png", tag: "Starter" },
  { name: "Spring Rolls", price: "₹199", img: "/images/spring-rolls-v2.png", tag: "Veg" },
  { name: "Chocolate Lava Cake", price: "₹199", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop", tag: "Dessert" },
];

const testimonials = [
  { name: "Priya Sharma", rating: 5, text: "Absolutely divine! The Paneer Butter Masala is the best I've ever tasted. The ambiance is perfect for date nights.", avatar: "PS" },
  { name: "Rajesh Kumar", rating: 5, text: "From starters to desserts, every dish was a masterpiece. The service was impeccable and the staff incredibly courteous.", avatar: "RK" },
  { name: "Ananya Menon", rating: 4, text: "A hidden gem in Chennai! The Grilled Chicken Steak was cooked to perfection. Will definitely be coming back soon.", avatar: "AM" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <FeaturedDishesSection />
      <DeliverySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-10">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1920&auto=format&fit=crop"
          alt="RS Restaurant fine dining ambiance"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-10 md:p-16 rounded-3xl shadow-2xl">
          <p className="text-gold font-medium text-sm sm:text-base uppercase tracking-[0.35em] mb-6 animate-fade-in">
            Welcome to RS Restaurant
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-8 animate-fade-in-up">
            Modern Dining Experience,{" "}
            <span className="text-gradient-gold block mt-2">Now Online</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-12 animate-fade-in-up font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Indulge in an exquisite culinary journey where traditional flavors
            meet modern creativity. Every dish tells a story of passion and
            perfection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link
              href="/booking"
              className="px-10 py-4 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] hover:-translate-y-1 text-sm uppercase tracking-widest"
            >
              Book a Table
            </Link>
            <Link
              href="/menu"
              className="px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-gold hover:text-gold transition-all duration-300 hover:-translate-y-1 text-sm uppercase tracking-widest"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ── Highlights ── */
function HighlightsSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="py-28 lg:py-36 bg-cream dark:bg-charcoal transition-colors duration-500 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50 dark:opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle="Why Choose Us"
          title="A Dining Experience Like No Other"
          description="We blend tradition with innovation to serve you nothing but the best."
        />
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ${inView ? "stagger-children" : ""}`}>
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-10 text-center shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-2 transition-all duration-500 group border border-white/40 dark:border-white/10"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {h.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-charcoal dark:text-cream mb-4">
                {h.title}
              </h3>
              <p className="text-charcoal/70 dark:text-cream/70 text-sm leading-relaxed font-light">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Featured Dishes ── */
function FeaturedDishesSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="py-28 lg:py-36 bg-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle="Our Specialties"
          title="Featured Dishes"
          description="Hand-crafted delicacies made with the finest ingredients by our expert chefs."
          light
        />
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ${inView ? "stagger-children" : ""}`}>
          {featuredDishes.map((dish, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(212,168,83,0.15)]"
            >
              <div className="relative h-64 overflow-hidden">
                {dish.img ? (
                  <Image
                    src={dish.img}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full img-placeholder-lava flex items-center justify-center text-6xl">
                    🍫
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {dish.tag}
                </div>
              </div>
              <div className="p-8 -mt-6 relative z-10">
                <h3 className="text-white font-heading text-2xl font-semibold mb-3">
                  {dish.name}
                </h3>
                <p className="text-gold text-2xl font-light tracking-wide">{dish.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/menu"
            className="inline-block px-10 py-4 border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-charcoal transition-all duration-300 text-sm uppercase tracking-widest"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Delivery ── */
function DeliverySection() {
  const [ref, inView] = useInView();
  
  const deliveryFeatures = [
    { icon: "🚀", title: "Fast Delivery", desc: "Hot & fresh in 30-45 minutes" },
    { icon: "🍳", title: "Freshly Prepared", desc: "Cooked to order just for you" },
    { icon: "📍", title: "Real-Time Updates", desc: "Track your order live" },
    { icon: "📦", title: "Safe Packaging", desc: "Hygienic & perfectly sealed" },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-cream-dark dark:bg-charcoal-light relative transition-colors duration-500 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text */}
          <div className={`flex-1 text-center lg:text-left ${inView ? "animate-slide-in-right" : "opacity-0"}`}>
            <p className="text-gold font-medium text-sm uppercase tracking-[0.3em] mb-4 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-8 h-px bg-gold/50" />
              Bring RS Home
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-charcoal dark:text-cream leading-tight">
              Premium Dining, <br/>
              <span className="text-gold">Delivered to You</span>
            </h2>
            <p className="text-charcoal/70 dark:text-cream/70 text-lg mb-8 font-light max-w-xl mx-auto lg:mx-0">
              Can&apos;t make it to the restaurant? We&apos;ll bring the fine dining experience straight to your doorstep. Enjoy your favorite RS signature dishes in the comfort of your home.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/order"
                className="px-8 py-4 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] hover:-translate-y-1 text-sm uppercase tracking-widest flex items-center gap-2 group"
              >
                Order Online
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-charcoal/60 dark:text-cream/60 font-medium border-t border-gray-200 dark:border-white/10 pt-6">
              <span className="flex items-center gap-2"><span className="text-gold">★</span> Minimum Order ₹299</span>
              <span className="flex items-center gap-2"><span className="text-gold">★</span> Free Delivery above ₹500</span>
            </div>
          </div>
          
          {/* Right Grid */}
          <div className={`flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 ${inView ? "stagger-children" : ""}`}>
            {deliveryFeatures.map((f, i) => (
              <div key={i} className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 dark:border-white/10 group hover:-translate-y-1">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">
                  {f.icon}
                </div>
                <h4 className="font-heading font-bold text-lg mb-2 text-charcoal dark:text-cream">{f.title}</h4>
                <p className="text-charcoal/60 dark:text-cream/60 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function TestimonialsSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="py-28 lg:py-36 bg-cream dark:bg-charcoal transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Guests Say"
          description="Don't just take our word for it — hear from our delighted guests."
        />
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 ${inView ? "stagger-children" : ""}`}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-lg shadow-black/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 dark:border-white/10"
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, j) => (
                  <svg
                    key={j}
                    className={`w-5 h-5 ${j < t.rating ? "text-gold" : "text-gray-300 dark:text-white/20"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-charcoal/80 dark:text-cream/80 text-base leading-relaxed mb-8 italic font-light">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm font-heading border border-gold/20">
                  {t.avatar}
                </div>
                <span className="text-charcoal dark:text-cream font-semibold tracking-wide">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTASection() {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920&auto=format&fit=crop"
          alt="Restaurant ambiance"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-[2px]" />
      </div>
      <div className={`relative z-10 text-center px-4 max-w-3xl mx-auto ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
        <p className="text-gold text-sm uppercase tracking-[0.4em] mb-4 font-semibold">
          Don&apos;t Miss Out
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-8">
          Reserve Your Table Today
        </h2>
        <p className="text-white/80 mb-12 max-w-xl mx-auto font-light text-lg leading-relaxed">
          Whether it&apos;s a romantic dinner, family celebration, or corporate
          gathering — we make every occasion special.
        </p>
        <Link
          href="/booking"
          className="inline-block px-12 py-5 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,168,83,0.5)] hover:-translate-y-1 text-sm uppercase tracking-widest"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
