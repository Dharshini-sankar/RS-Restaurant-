"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "2",
    requests: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useInView();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[+]?\d{10,13}$/.test(formData.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid phone number";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Enter a valid email address";
    if (!selectedDate) errs.date = "Please select a date";
    if (!selectedTime) errs.time = "Please select a time";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  if (submitted) {
    return (
      <>
        <section className="relative h-96 flex items-center justify-center bg-charcoal overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1920&auto=format&fit=crop" alt="Booking" fill className="object-cover opacity-40" priority />
          </div>
          <div className="relative z-10 text-center">
            <p className="text-gold text-sm uppercase tracking-[0.4em] mb-4 font-semibold">Reservation</p>
            <h1 className="text-5xl sm:text-6xl font-heading font-bold text-white drop-shadow-lg">Book a Table</h1>
          </div>
        </section>
        <section className="py-28 bg-cream dark:bg-charcoal transition-colors duration-500 flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-fade-in-up max-w-lg mx-auto px-6 py-16 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl shadow-xl shadow-black/5">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-heading font-bold text-charcoal dark:text-cream mb-4">
              Reservation Confirmed!
            </h2>
            <p className="text-charcoal/60 dark:text-cream/60 mb-2">
              Thank you, <strong className="text-charcoal dark:text-cream">{formData.name}</strong>!
            </p>
            <p className="text-charcoal/60 dark:text-cream/60 mb-6">
              Your table for <strong className="text-charcoal dark:text-cream">{formData.guests} guest{formData.guests > 1 ? "s" : ""}</strong> has been reserved on{" "}
              <strong className="text-charcoal dark:text-cream">{selectedDate?.toLocaleDateString()}</strong> at{" "}
              <strong className="text-charcoal dark:text-cream">{selectedTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>.
            </p>
            <p className="text-charcoal/50 dark:text-cream/50 text-sm mb-8">
              A confirmation will be sent to {formData.email}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", phone: "", email: "", guests: "2", requests: "" });
                setSelectedDate(null);
                setSelectedTime(null);
              }}
              className="px-8 py-3 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all duration-300 text-sm uppercase tracking-widest"
            >
              Make Another Reservation
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1920&auto=format&fit=crop" alt="Booking" fill className="object-cover opacity-40" priority />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-gold text-sm uppercase tracking-[0.4em] mb-4 font-semibold">Reservation</p>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold text-white drop-shadow-lg">Book a Table</h1>
        </div>
      </section>

      {/* Form */}
      <section ref={ref} className="py-28 bg-cream dark:bg-charcoal transition-colors duration-500 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50 dark:opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
            {/* Left: Info */}
            <div className="flex flex-col justify-center">
              <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4 font-semibold">Reserve Your Spot</p>
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-charcoal dark:text-cream mb-6 leading-tight">
                Make a Reservation
              </h2>
              <p className="text-charcoal/70 dark:text-cream/70 text-lg font-light leading-relaxed mb-12">
                Secure your table at RS Restaurant and enjoy an unforgettable dining
                experience. Whether it&apos;s a romantic dinner, a family celebration,
                or a corporate gathering — we&apos;ll make it special.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal dark:text-cream">Opening Hours</h3>
                    <p className="text-sm text-charcoal/60 dark:text-cream/60">Mon-Fri: 11 AM – 11 PM | Sat-Sun: 10 AM – 12 AM</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal dark:text-cream">Phone</h3>
                    <p className="text-sm text-charcoal/60 dark:text-cream/60">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal dark:text-cream">Location</h3>
                    <p className="text-sm text-charcoal/60 dark:text-cream/60">123 Food Street, Downtown, Chennai</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-10 sm:p-12 shadow-2xl shadow-black/5 border border-white/40 dark:border-white/10"
                noValidate
              >
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Full Name *</label>
                    <input
                      id="name" name="name" type="text" value={formData.name} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-400" : "border-gray-200 dark:border-white/10"} bg-white/50 dark:bg-black/20 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm text-charcoal dark:text-cream placeholder-gray-400 dark:placeholder-gray-500`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Phone Number *</label>
                      <input
                        id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400" : "border-gray-200 dark:border-white/10"} bg-white/50 dark:bg-black/20 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm text-charcoal dark:text-cream placeholder-gray-400 dark:placeholder-gray-500`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Email Address *</label>
                      <input
                        id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-gray-200 dark:border-white/10"} bg-white/50 dark:bg-black/20 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm text-charcoal dark:text-cream placeholder-gray-400 dark:placeholder-gray-500`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-20">
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Date *</label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => { setSelectedDate(date); if (errors.date) setErrors(prev => ({...prev, date: ""})) }}
                        minDate={new Date()}
                        placeholderText="Select a Date"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.date ? "border-red-400" : "border-gray-200 dark:border-white/10"} bg-white/50 dark:bg-black/20 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm text-charcoal dark:text-cream`}
                        wrapperClassName="w-full"
                      />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Time *</label>
                      <DatePicker
                        selected={selectedTime}
                        onChange={(time) => { setSelectedTime(time); if (errors.time) setErrors(prev => ({...prev, time: ""})) }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select a Time"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.time ? "border-red-400" : "border-gray-200 dark:border-white/10"} bg-white/50 dark:bg-black/20 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm text-charcoal dark:text-cream`}
                        wrapperClassName="w-full"
                      />
                      {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Number of Guests</label>
                    <select
                      id="guests" name="guests" value={formData.guests} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm text-charcoal dark:text-cream"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n} className="dark:bg-charcoal text-charcoal dark:text-cream">{n} {n === 1 ? "Guest" : "Guests"}</option>
                      ))}
                      <option value="10+" className="dark:bg-charcoal text-charcoal dark:text-cream">10+ Guests</option>
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label htmlFor="requests" className="block text-sm font-medium text-charcoal dark:text-cream/90 mb-1.5">Special Requests</label>
                    <textarea
                      id="requests" name="requests" value={formData.requests} onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm text-charcoal dark:text-cream placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                      placeholder="Any dietary requirements, celebrations, or preferences..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 text-sm uppercase tracking-widest"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
