"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useCart } from "@/components/CartContext";
import { CheckCircle, ShoppingBag, Truck, MapPin, CreditCard, Package, Bike, Clock } from "lucide-react";

const MapTracker = dynamic(() => import("@/components/MapTracker"), { ssr: false });

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [mounted, setMounted] = useState(false);
  const [trackingStep, setTrackingStep] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (orderPlaced) {
      const timer1 = setTimeout(() => setTrackingStep(1), 4000);
      const timer2 = setTimeout(() => setTrackingStep(2), 8000);
      const timer3 = setTimeout(() => setTrackingStep(3), 12000);
      return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
    }
  }, [orderPlaced]);

  const subtotal = getTotal();
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const taxes = subtotal * 0.05;
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0) + taxes;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderId(`RS-${Math.floor(100000 + Math.random() * 900000)}`);
    setOrderPlaced(true);
    clearCart();
  };

  if (!mounted) return null;

  if (orderPlaced) {
    const steps = [
      { title: "Order Received", icon: <CheckCircle size={24} /> },
      { title: "Food is being packed", icon: <Package size={24} /> },
      { title: "Delivery Partner Assigned", icon: <Bike size={24} /> },
      { title: "Arriving at your location", icon: <MapPin size={24} /> },
    ];

    return (
      <div className="min-h-screen bg-cream dark:bg-charcoal pt-24 pb-12 transition-colors text-charcoal dark:text-cream placeholder-gray-500 dark:placeholder-gray-400 duration-500 flex flex-col items-center justify-center">
        <div className="bg-white/70 dark:bg-black/20 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl max-w-4xl w-full mx-4 border border-gold/20 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <CheckCircle className="text-6xl text-green-500 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
            <h1 className="text-3xl font-playfair font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 dark:text-gray-400">Order ID: <span className="font-bold text-gold">{orderId}</span></p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Tracking Stepper */}
            <div className="bg-white/50 dark:bg-black/40 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Clock className="text-gold"/> Live Tracking</h3>
              <div className="space-y-6 relative">
                {/* Vertical line connecting steps */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>
                
                {steps.map((step, index) => {
                  const isActive = trackingStep >= index;
                  const isCurrent = trackingStep === index;
                  return (
                    <div key={index} className={`flex items-center gap-4 relative z-10 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors duration-500 ${isActive ? 'bg-gold text-charcoal' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                        {step.icon}
                      </div>
                      <div>
                        <h4 className={`font-bold ${isCurrent ? 'text-lg text-gold' : 'text-base'}`}>{step.title}</h4>
                        {isCurrent && <p className="text-sm opacity-80 animate-pulse">In progress...</p>}
                        {isActive && !isCurrent && <p className="text-sm opacity-80">Completed</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Tracker */}
            <div className="bg-white/50 dark:bg-black/40 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col h-full">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><MapPin className="text-gold"/> Partner Location</h3>
              <div className="flex-1 relative rounded-xl overflow-hidden min-h-[250px]">
                <MapTracker trackingStep={trackingStep} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="w-full sm:w-auto px-12 py-4 rounded-xl bg-gold text-charcoal font-bold hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20 text-center">
              Order More
            </Link>
            <Link href="/" className="w-full sm:w-auto px-12 py-4 rounded-xl bg-black/5 dark:bg-white/5 font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-center">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream dark:bg-charcoal pt-32 pb-12 transition-colors text-charcoal dark:text-cream placeholder-gray-500 dark:placeholder-gray-400 duration-500 flex flex-col items-center justify-center">
        <div className="text-center p-8 max-w-md w-full">
          <ShoppingBag className="text-6xl text-gold mx-auto mb-6 opacity-50" />
          <h1 className="text-3xl font-playfair font-bold mb-4">Your cart is empty</h1>
          <p className="mb-8 opacity-70">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/order">
            <button className="px-8 py-4 bg-gold text-charcoal rounded-full font-bold shadow-lg shadow-gold/30 hover:scale-105 transition-transform">
              Browse Menu
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal pt-24 pb-12 transition-colors text-charcoal dark:text-cream placeholder-gray-500 dark:placeholder-gray-400 duration-500">
      
      {/* Hero */}
      <section className="bg-black text-white py-12 px-4 text-center mb-8 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-blend-overlay bg-black/70">
        <p className="text-gold tracking-widest uppercase text-sm mb-2 font-semibold">Checkout</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold">Complete Your Order</h1>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col-reverse lg:flex-row gap-8">
        
        {/* Delivery Form (Left) */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Delivery Details Section */}
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gold/10">
              <h2 className="text-2xl font-playfair font-bold mb-6 flex items-center gap-3">
                <MapPin className="text-gold"/> Delivery Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold opacity-80">Full Name *</label>
                  <input required type="text" className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors text-charcoal dark:text-cream placeholder-gray-500 dark:placeholder-gray-400" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold opacity-80">Phone Number *</label>
                  <input required type="tel" pattern="[0-9]{10}" title="10 digit mobile number" className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors text-charcoal dark:text-cream placeholder-gray-500 dark:placeholder-gray-400" placeholder="9876543210" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold opacity-80">Complete Address *</label>
                  <textarea required rows="3" className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors text-charcoal dark:text-cream placeholder-gray-500 dark:placeholder-gray-400 resize-none" placeholder="Flat / House No., Floor, Building, Street"></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold opacity-80">Landmark</label>
                  <input type="text" className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors text-charcoal dark:text-cream placeholder-gray-500 dark:placeholder-gray-400" placeholder="Near Apollo Hospital" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold opacity-80">City *</label>
                  <input required type="text" defaultValue="Chennai" readOnly className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 opacity-70 cursor-not-allowed text-charcoal dark:text-cream" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold opacity-80">Pincode *</label>
                  <input required type="text" pattern="[0-9]{6}" title="6 digit pincode" className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors text-charcoal dark:text-cream placeholder-gray-500 dark:placeholder-gray-400" placeholder="600001" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold opacity-80">Delivery Instructions (Optional)</label>
                  <input type="text" className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors text-charcoal dark:text-cream placeholder-gray-500 dark:placeholder-gray-400" placeholder="e.g. Please ring the doorbell, leave at the door..." />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gold/10">
              <h2 className="text-2xl font-playfair font-bold mb-6 flex items-center gap-3">
                <CreditCard className="text-gold"/> Payment Method
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gold/30 bg-gold/5 rounded-xl cursor-pointer transition-all">
                  <input type="radio" name="payment" value="cod" defaultChecked className="w-5 h-5 accent-gold" />
                  <span className="ml-4 font-semibold text-lg">💵 Cash on Delivery</span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:border-gold/30 transition-all opacity-60">
                  <input type="radio" name="payment" value="upi" disabled className="w-5 h-5 accent-gold" />
                  <span className="ml-4 font-semibold text-lg flex items-center gap-2">📱 UPI <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded">Temporarily Unavailable</span></span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:border-gold/30 transition-all opacity-60">
                  <input type="radio" name="payment" value="card" disabled className="w-5 h-5 accent-gold" />
                  <span className="ml-4 font-semibold text-lg flex items-center gap-2">💳 Credit / Debit Card <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded">Temporarily Unavailable</span></span>
                </label>
              </div>
            </div>

            <button type="submit" className="w-full py-5 rounded-2xl bg-gold text-charcoal font-bold text-xl hover:bg-gold/90 hover:shadow-2xl hover:shadow-gold/40 transition-all active:scale-[0.98]">
              Place Order • ₹{total.toFixed(2)}
            </button>

          </form>
        </div>

        {/* Order Summary Sidebar (Right) */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="sticky top-28 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gold/20">
            <h2 className="text-2xl font-playfair font-bold mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div>
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-sm opacity-70 ml-2">x {item.qty}</span>
                  </div>
                  <span className="font-medium whitespace-nowrap">₹{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 mt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Delivery Fee</span>
                <span className="font-semibold">{subtotal > 500 ? 'Free' : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Taxes (5%)</span>
                <span className="font-semibold">₹{taxes.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center text-xl font-bold pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <span>Total to Pay</span>
                <span className="text-gold text-2xl">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
