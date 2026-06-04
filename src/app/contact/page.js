"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import SectionHeading from "@/components/SectionHeading";

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

export default function ContactPage() {
  const [ref, inView] = useInView();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("success");
    setTimeout(() => {
      setStatus(null);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="relative h-96 flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop" alt="Contact Us" fill className="object-cover opacity-40" priority />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-gold text-sm uppercase tracking-[0.4em] mb-4 font-semibold">Get In Touch</p>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold text-white drop-shadow-lg">Contact Us</h1>
        </div>
      </section>

      <section ref={ref} className="py-28 lg:py-36 bg-cream dark:bg-charcoal transition-colors duration-500 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50 dark:opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            {/* Info Cards */}
            <div className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl p-10 rounded-3xl shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-gold/10 text-center transform transition duration-500 hover:-translate-y-2 border border-white/40 dark:border-white/10 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6 text-2xl border border-gold/20">📍</div>
              <h3 className="font-heading font-bold text-charcoal dark:text-cream text-xl mb-3">Our Address</h3>
              <p className="text-charcoal/70 dark:text-cream/70 text-base leading-relaxed font-light">
                123 Food Street, Downtown Business District,<br />Chennai, Tamil Nadu
              </p>
            </div>
            
            <div className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl p-10 rounded-3xl shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-gold/10 text-center transform transition duration-500 hover:-translate-y-2 border border-white/40 dark:border-white/10 ${inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6 text-2xl border border-gold/20">📞</div>
              <h3 className="font-heading font-bold text-charcoal dark:text-cream text-xl mb-3">Phone Number</h3>
              <div className="text-charcoal/70 dark:text-cream/70 text-base leading-relaxed space-y-1 font-light">
                <p>Reservations: +91 98765 43210</p>
                <p>Support: +91 98765 12345</p>
              </div>
            </div>
            
            <div className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl p-10 rounded-3xl shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-gold/10 text-center transform transition duration-500 hover:-translate-y-2 border border-white/40 dark:border-white/10 ${inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6 text-2xl border border-gold/20">✉️</div>
              <h3 className="font-heading font-bold text-charcoal dark:text-cream text-xl mb-3">Email Address</h3>
              <div className="text-charcoal/70 dark:text-cream/70 text-base leading-relaxed space-y-1 font-light">
                <p>Info: info@rsrestaurant.com</p>
                <p>Career: careers@rsrestaurant.com</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5 border border-white/50 dark:border-white/10">
            {/* Form */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-charcoal dark:text-white mb-2">Send us a Message</h2>
              <p className="text-charcoal/60 dark:text-cream/60 text-sm mb-8">We would love to hear from you. Fill out the form below and we will get back to you shortly.</p>
              
              {status === "success" && (
                <div className="mb-6 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 p-4 rounded-xl text-sm font-medium border border-green-200 dark:border-green-500/20">
                  Thank you! Your message has been sent successfully. We will reply soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Your Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-sm bg-cream/50 dark:bg-black/20 text-charcoal dark:text-cream placeholder-gray-400 dark:placeholder-gray-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Your Email *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-sm bg-cream/50 dark:bg-black/20 text-charcoal dark:text-cream placeholder-gray-400 dark:placeholder-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-sm bg-cream/50 dark:bg-black/20 text-charcoal dark:text-cream placeholder-gray-400 dark:placeholder-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Message *</label>
                  <textarea required rows={5} name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-sm bg-cream/50 dark:bg-black/20 text-charcoal dark:text-cream placeholder-gray-400 dark:placeholder-gray-500 resize-none" />
                </div>
                <button type="submit" className="px-10 py-4 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all shadow-md hover:shadow-lg hover:shadow-gold/25 hover:-translate-y-0.5 w-full sm:w-auto text-sm uppercase tracking-widest">
                  Send Message
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="h-[500px] lg:h-auto bg-gray-200/50 dark:bg-charcoal/50 p-3 rounded-r-[2.5rem] flex flex-col justify-center">
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/20 dark:border-white/10">
                <iframe
                  src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=RS%20Restaurant,%20Chennai&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-125 opacity-90 dark:invert dark:hue-rotate-180 dark:opacity-80 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
