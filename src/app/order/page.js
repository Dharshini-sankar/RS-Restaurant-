"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";

const foodItems = [
  // Starters
  { id: 's1', name: 'Garlic Bread', category: 'Starters', price: 149, description: 'Classic garlic bread with herbs', image: '/images/garlic-bread-v2.png' },
  { id: 's2', name: 'Crispy Chicken Wings', category: 'Starters', price: 249, description: 'Tossed in a spicy tangy sauce', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=600&auto=format&fit=crop' },
  { id: 's3', name: 'Veg Spring Rolls', category: 'Starters', price: 199, description: 'Crispy rolls stuffed with fresh vegetables', image: '/images/spring-rolls-v2.png' },
  { id: 's4', name: 'Stuffed Mushrooms', category: 'Starters', price: 189, description: 'Baked mushrooms filled with cheese and herbs', image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Portobello_with_goats%27_cheese%2C_bacon_and_thym.jpg' },
  { id: 's5', name: 'Tomato Bruschetta', category: 'Starters', price: 179, description: 'Toasted bread topped with tomatoes and basil', image: '/images/bruschetta.png' },
  { id: 's6', name: 'Calamari Fritti', category: 'Starters', price: 299, description: 'Crispy fried calamari rings', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop' },
  { id: 's7', name: 'French Onion Soup', category: 'Starters', price: 249, description: 'Classic soup topped with cheese crouton', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Soupe_%C3%A0_l%27oignon.jpg/960px-Soupe_%C3%A0_l%27oignon.jpg' },

  // Main Course
  { id: 'm1', name: 'Grilled Chicken Steak', category: 'Main Course', price: 499, description: 'Served with mashed potatoes and veggies', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=600&auto=format&fit=crop' },
  { id: 'm2', name: 'Paneer Butter Masala', category: 'Main Course', price: 349, description: 'Cottage cheese in rich tomato gravy', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop' },
  { id: 'm3', name: 'Truffle Mushroom Risotto', category: 'Main Course', price: 429, description: 'Creamy arborio rice with truffles', image: '/images/mushroom-risotto.png' },
  { id: 'm4', name: 'Lobster Ravioli', category: 'Main Course', price: 599, description: 'Handmade ravioli stuffed with lobster', image: '/images/lobster-ravioli.png' },
  { id: 'm5', name: 'Margarita Pizza', category: 'Main Course', price: 399, description: 'Classic pizza with fresh basil and mozzarella', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/960px-Pizza_Margherita_stu_spivack.jpg' },
  { id: 'm6', name: 'Pan-Seared Salmon', category: 'Main Course', price: 649, description: 'Fresh salmon with lemon butter sauce', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/DFC_5074_Pan-seared_salmon_with_crinkle-cut_fries_and_a_crisp_green_salad_-_a_simple_satisfying_plate.jpg/960px-DFC_5074_Pan-seared_salmon_with_crinkle-cut_fries_and_a_crisp_green_salad_-_a_simple_satisfying_plate.jpg' },
  { id: 'm7', name: 'Beef Wellington', category: 'Main Course', price: 899, description: 'Tender beef wrapped in pastry', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Beef_Wellington_2019.jpg/960px-Beef_Wellington_2019.jpg' },

  // Desserts
  { id: 'd1', name: 'Chocolate Lava Cake', category: 'Desserts', price: 199, description: 'Warm gooey chocolate center', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop' },
  { id: 'd2', name: 'Ice Cream Sundae', category: 'Desserts', price: 149, description: 'Vanilla ice cream with chocolate syrup', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop' },
  { id: 'd3', name: 'Cheesecake', category: 'Desserts', price: 249, description: 'New York style classic cheesecake', image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=600&auto=format&fit=crop' },
  { id: 'd4', name: 'Classic Tiramisu', category: 'Desserts', price: 229, description: 'Coffee flavored Italian dessert', image: '/images/tiramisu.png' },
  { id: 'd5', name: 'Lemon Panna Cotta', category: 'Desserts', price: 219, description: 'Silky cream dessert with lemon zest', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Panna_Cotta_with_cream_and_garnish.jpg/960px-Panna_Cotta_with_cream_and_garnish.jpg' },
  { id: 'd6', name: 'Crème Brûlée', category: 'Desserts', price: 279, description: 'Rich custard with caramelized top', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/2014_0531_Cr%C3%A8me_br%C3%BBl%C3%A9e_Doi_Mae_Salong_%28cropped%29.jpg/960px-2014_0531_Cr%C3%A8me_br%C3%BBl%C3%A9e_Doi_Mae_Salong_%28cropped%29.jpg' },

  // Beverages
  { id: 'b1', name: 'Fresh Lime Soda', category: 'Beverages', price: 99, description: 'Refreshing sweet and salty soda', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop' },
  { id: 'b2', name: 'Mango Lassi', category: 'Beverages', price: 129, description: 'Traditional yogurt-based mango drink', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop' },
  { id: 'b3', name: 'Cold Coffee', category: 'Beverages', price: 149, description: 'Creamy iced coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop' },
  { id: 'b4', name: 'Masala Chai', category: 'Beverages', price: 79, description: 'Indian spiced tea', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=600&auto=format&fit=crop' }
];

const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

export default function OrderPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { cartItems, addToCart, removeFromCart, updateQty, cartCount, getTotal } = useCart();
  
  const filteredItems = activeCategory === "All" 
    ? foodItems 
    : foodItems.filter(item => item.category === activeCategory);

  const subtotal = getTotal();
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const taxes = subtotal * 0.05;
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0) + taxes;

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal pt-24 pb-12 transition-colors duration-500">
      
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 mx-4 md:mx-12 rounded-2xl overflow-hidden mb-12 shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop"
          alt="Order Online"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-6 text-center">
          <p className="text-gold tracking-widest uppercase text-sm mb-2 font-semibold">Order Online</p>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Delivered to Your Doorstep</h1>
          <p className="text-white/80 max-w-lg">
            Enjoy premium dining in the comfort of your home. Freshly prepared, securely packaged, and delivered fast.
          </p>
        </div>
      </section>

      {/* Delivery Info Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-8">
        <div className="bg-white/50 dark:bg-black/30 backdrop-blur-md rounded-xl p-4 flex flex-wrap justify-center gap-6 text-sm md:text-base font-medium shadow-sm border border-gold/20">
          <span className="flex items-center gap-2">🕒 30-45 min delivery</span>
          <span className="flex items-center gap-2">✨ Free delivery above ₹500</span>
          <span className="flex items-center gap-2">🛍️ Min order ₹299</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content: Filters & Food Grid */}
        <div className="flex-1">
          {/* Categories */}
          <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar snap-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all snap-center ${
                  activeCategory === cat
                    ? "bg-gold text-charcoal shadow-lg shadow-gold/30"
                    : "bg-white/50 dark:bg-white/10 hover:bg-gold/20 dark:hover:bg-gold/20 backdrop-blur-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const cartItem = cartItems.find((i) => i.id === item.id);
              return (
                <div key={item.id} className="bg-white/60 dark:bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gold/10 group flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair text-xl font-bold">{item.name}</h3>
                      <span className="font-bold text-gold">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">{item.description}</p>
                    
                    <div className="mt-auto">
                      {cartItem ? (
                        <div className="flex items-center justify-between bg-gold/10 rounded-full p-1 border border-gold/30">
                          <button 
                            onClick={() => updateQty(item.id, cartItem.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-charcoal shadow-sm hover:bg-gold hover:text-white transition-colors"
                          >
                            <Minus />
                          </button>
                          <span className="font-bold px-4">{cartItem.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, cartItem.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-charcoal shadow-sm hover:bg-gold hover:text-white transition-colors"
                          >
                            <Plus />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full py-2.5 rounded-full bg-gold text-charcoal font-semibold hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/30 transition-all active:scale-95"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Cart (Desktop) */}
        <div className="hidden lg:block w-96 shrink-0">
          <div className="sticky top-28 flex flex-col max-h-[calc(100vh-120px)] bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/20 dark:border-white/10 relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/50 dark:border-gray-800/50 relative shrink-0">
              <div className="bg-gold/20 p-2 rounded-full">
                <ShoppingBag className="text-gold text-xl" />
              </div>
              <h2 className="text-2xl font-playfair font-bold">Your Order</h2>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12 opacity-50">
                <ShoppingBag className="text-6xl mx-auto mb-4 opacity-20" />
                <p>Your cart is empty</p>
                <p className="text-sm mt-2">Add some delicious items!</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center bg-white/60 dark:bg-black/30 p-3 rounded-2xl border border-transparent hover:border-gold/30 hover:shadow-md transition-all group">
                      {item.image && (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm border border-black/5 dark:border-white/5">
                          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm line-clamp-1 truncate">{item.name}</h4>
                        <div className="text-gold font-bold text-sm">₹{item.price}</div>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/10 rounded-xl p-1 shadow-inner">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-white dark:bg-charcoal hover:text-gold shadow-sm transition-colors"><Minus size={14}/></button>
                        <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-white dark:bg-charcoal hover:text-gold shadow-sm transition-colors"><Plus size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 mt-4 border-t border-gray-200 dark:border-gray-800 space-y-3 shrink-0 relative">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Delivery Fee {subtotal > 500 && <span className="text-green-500 ml-1">(Free!)</span>}</span>
                    <span className="font-semibold">{subtotal > 500 ? '₹0.00' : `₹${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Taxes (5%)</span>
                    <span className="font-semibold">₹{taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span>Total</span>
                    <span className="text-gold text-2xl drop-shadow-sm">₹{total.toFixed(2)}</span>
                  </div>

                  <Link href="/order/checkout" className="block mt-6">
                    <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-dark text-charcoal font-black text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] transition-all active:scale-95 group">
                      Proceed to Checkout <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Cart Bar */}
      {cartCount > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-charcoal/80 backdrop-blur-xl border-t border-gold/20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">{cartCount} Item{cartCount > 1 ? 's' : ''}</div>
              <div className="font-bold text-xl">₹{total.toFixed(2)}</div>
            </div>
            <Link href="/order/checkout">
              <button className="px-6 py-3 rounded-full bg-gold text-white font-bold flex items-center gap-2 shadow-lg shadow-gold/30 active:scale-95 transition-transform">
                Checkout <ShoppingBag />
              </button>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
