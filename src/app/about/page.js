"use client";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { useEffect, useRef, useState } from "react";

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

const features = [
  { icon: "🥬", title: "Fresh Ingredients", desc: "Farm to table approach ensures every dish is vibrant with flavor." },
  { icon: "👨‍🍳", title: "Experienced Team", desc: "Decades of combined culinary expertise in every meal we serve." },
  { icon: "✨", title: "Hygienic Kitchen", desc: "We maintain the highest standards of cleanliness and safety." },
  { icon: "🛎️", title: "Exceptional Service", desc: "Warm hospitality that makes you feel like royalty." },
];

export default function AboutPage() {
  const [storyRef, storyInView] = useInView();
  const [chefRef, chefInView] = useInView();
  const [featuresRef, featuresInView] = useInView();

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-banner.png" alt="About Us" fill className="object-cover opacity-30" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Discover</p>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white">Our Story</h1>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="py-20 lg:py-28 bg-cream dark:bg-charcoal transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${storyInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <div className="w-full h-full img-placeholder-restaurant group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                 <Image src="/images/hero-banner.png" alt="Restaurant Interior" fill className="object-cover opacity-80 mix-blend-overlay" />
              </div>
              <div className="absolute inset-0 border-4 border-gold/30 rounded-2xl m-6 z-10 pointer-events-none" />
            </div>
            <div>
              <p className="text-gold text-sm uppercase tracking-[0.2em] mb-4">The Journey</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-charcoal dark:text-white mb-6">
                A Passion for Food & Hospitality
              </h2>
              <div className="space-y-4 text-charcoal/70 dark:text-cream/70 leading-relaxed">
                <p>
                  Since our inception, RS Restaurant has been driven by a singular vision: 
                  to provide an unparalleled dining experience where traditional recipes meet 
                  modern culinary techniques.
                </p>
                <p>
                  We believe that food is not just sustenance; it is a celebration of culture, 
                  a medium to bring people together, and an art form that speaks to the senses. 
                  Every ingredient in our kitchen is carefully selected, and every dish is crafted 
                  with love and precision.
                </p>
                <p>
                  Our elegant ambiance is designed to make you feel relaxed while you indulge 
                  in flavors that linger on your palate and memories that last a lifetime.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-16 h-1 bg-gold rounded-full" />
                <p className="font-heading italic text-xl text-charcoal dark:text-gold font-medium">Rahul Sharma, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef & Team */}
      <section ref={chefRef} className="py-20 lg:py-28 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="The Masters"
            title="Meet Our Head Chef"
            description="The creative genius behind our mouthwatering menu."
            light
          />
          <div className={`mt-16 flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto bg-warm-gray rounded-3xl p-8 lg:p-12 ${chefInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="w-64 h-64 shrink-0 rounded-full overflow-hidden border-4 border-gold shadow-2xl relative">
              <div className="w-full h-full img-placeholder-chef flex items-center justify-center text-7xl">
                👨‍🍳
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-white mb-2">Chef Arun Kumar</h3>
              <p className="text-gold font-medium uppercase tracking-widest text-sm mb-6">Executive Head Chef</p>
              <p className="text-white/70 leading-relaxed mb-6 font-light">
                With over 15 years of experience in Michelin-starred restaurants across the globe, 
                Chef Arun brings a wealth of expertise to RS Restaurant. He takes pride in blending 
                local flavors with international techniques to create dishes that are both comforting 
                and surprising.
              </p>
              <div className="flex gap-4">
                {["Italian", "French", "Indian"].map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-xs uppercase tracking-wider bg-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={featuresRef} className="py-20 lg:py-28 bg-cream dark:bg-charcoal transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Excellence"
            title="Why Choose Us"
            description="We are committed to delivering the best possible dining experience."
          />
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ${featuresInView ? "stagger-children" : ""}`}>
            {features.map((f, i) => (
              <div key={i} className="group relative text-center p-8 bg-white dark:bg-white/5 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 overflow-hidden border border-transparent hover:border-gold/30 dark:hover:border-gold/30 -translate-y-0 hover:-translate-y-2 cursor-pointer z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <div className="w-20 h-20 mx-auto bg-charcoal/5 dark:bg-black/20 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                  <span className="transform group-hover:rotate-12 transition-transform duration-500 inline-block">{f.icon}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-3 group-hover:text-gold transition-colors duration-300">{f.title}</h3>
                <p className="text-charcoal/60 dark:text-cream/60 text-sm leading-relaxed">{f.desc}</p>
                
                {/* Decorative corner accent */}
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gold/10 rounded-full blur-xl group-hover:bg-gold/30 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
