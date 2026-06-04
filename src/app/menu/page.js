"use client";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { useState, useEffect, useRef } from "react";

const categories = ["All", "Starters", "Main Course", "Desserts"];

const menuItems = [
  // Starters
  {
    name: "Garlic Bread",
    price: "₹149",
    category: "Starters",
    img: "/images/garlic-bread-v2.png",
    desc: "Toasted ciabatta with roasted garlic butter and Italian herbs.",
  },
  {
    name: "Crispy Chicken Wings",
    price: "₹249",
    category: "Starters",
    img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=600&auto=format&fit=crop",
    desc: "Golden fried wings tossed in our signature spicy glaze.",
  },
  {
    name: "Veg Spring Rolls",
    price: "₹199",
    category: "Starters",
    img: "/images/spring-rolls-v2.png",
    desc: "Crispy rolls stuffed with fresh vegetables and glass noodles.",
  },
  {
    name: "Stuffed Mushrooms",
    price: "₹189",
    category: "Starters",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/21/Portobello_with_goats%27_cheese%2C_bacon_and_thym.jpg",
    desc: "Baked mushroom caps filled with garlic, herbs, and melted parmesan.",
  },
  {
    name: "Tomato Bruschetta",
    price: "₹179",
    category: "Starters",
    img: "/images/bruschetta.png",
    desc: "Toasted baguette topped with fresh tomatoes, basil, and balsamic glaze.",
  },
  {
    name: "Calamari Fritti",
    price: "₹299",
    category: "Starters",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop",
    desc: "Lightly breaded and fried squid rings served with tartare sauce.",
  },
  {
    name: "French Onion Soup",
    price: "₹249",
    category: "Starters",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Soupe_%C3%A0_l%27oignon.jpg/960px-Soupe_%C3%A0_l%27oignon.jpg",
    desc: "Rich beef broth with caramelized onions, topped with gruyere cheese crouton.",
  },
  // Main Course
  {
    name: "Grilled Chicken Steak",
    price: "₹499",
    category: "Main Course",
    img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=600&auto=format&fit=crop",
    desc: "Tender grilled chicken breast with roasted vegetables and gravy.",
  },
  {
    name: "Paneer Butter Masala",
    price: "₹349",
    category: "Main Course",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop",
    desc: "Cottage cheese cubes in a rich, creamy tomato-butter sauce.",
  },
  {
    name: "Truffle Mushroom Risotto",
    price: "₹429",
    category: "Main Course",
    img: "/images/mushroom-risotto.png",
    desc: "Creamy Arborio rice with wild mushrooms and truffle oil.",
  },
  {
    name: "Lobster Ravioli",
    price: "₹599",
    category: "Main Course",
    img: "/images/lobster-ravioli.png",
    desc: "Handmade ravioli stuffed with lobster in a pink vodka sauce.",
  },
  {
    name: "Margarita Pizza",
    price: "₹399",
    category: "Main Course",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/960px-Pizza_Margherita_stu_spivack.jpg",
    desc: "Classic wood-fired pizza with fresh mozzarella, basil, and San Marzano tomatoes.",
  },
  {
    name: "Pan-Seared Salmon",
    price: "₹649",
    category: "Main Course",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/DFC_5074_Pan-seared_salmon_with_crinkle-cut_fries_and_a_crisp_green_salad_-_a_simple_satisfying_plate.jpg/960px-DFC_5074_Pan-seared_salmon_with_crinkle-cut_fries_and_a_crisp_green_salad_-_a_simple_satisfying_plate.jpg",
    desc: "Fresh Atlantic salmon with lemon butter sauce and asparagus.",
  },
  {
    name: "Beef Wellington",
    price: "₹899",
    category: "Main Course",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Beef_Wellington_2019.jpg/960px-Beef_Wellington_2019.jpg",
    desc: "Prime beef tenderloin coated with pâté and duxelles, wrapped in puff pastry.",
  },
  // Desserts
  {
    name: "Chocolate Lava Cake",
    price: "₹199",
    category: "Desserts",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop",
    desc: "Warm chocolate cake with a molten center, served with ice cream.",
  },
  {
    name: "Ice Cream Sundae",
    price: "₹149",
    category: "Desserts",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop",
    desc: "Three scoops of artisan ice cream with toppings and wafer.",
  },
  {
    name: "Cheesecake",
    price: "₹249",
    category: "Desserts",
    img: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=600&auto=format&fit=crop",
    desc: "New York style cheesecake with mixed berry compote.",
  },
  {
    name: "Classic Tiramisu",
    price: "₹229",
    category: "Desserts",
    img: "/images/tiramisu.png",
    desc: "Espresso-soaked ladyfingers layered with mascarpone cream.",
  },
  {
    name: "Lemon Panna Cotta",
    price: "₹219",
    category: "Desserts",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Panna_Cotta_with_cream_and_garnish.jpg/960px-Panna_Cotta_with_cream_and_garnish.jpg",
    desc: "Silky Italian cream dessert infused with lemon and topped with berry coulis.",
  },
  {
    name: "Crème Brûlée",
    price: "₹279",
    category: "Desserts",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/2014_0531_Cr%C3%A8me_br%C3%BBl%C3%A9e_Doi_Mae_Salong_%28cropped%29.jpg/960px-2014_0531_Cr%C3%A8me_br%C3%BBl%C3%A9e_Doi_Mae_Salong_%28cropped%29.jpg",
    desc: "Classic French vanilla custard with a brittle caramelized sugar crust.",
  },
  {
    name: "Assorted Macarons",
    price: "₹349",
    category: "Desserts",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/VanillaMacaron.jpg/960px-VanillaMacaron.jpg",
    desc: "A selection of six handcrafted French macarons in seasonal flavors.",
  },
];

export default function MenuPage() {
  const [active, setActive] = useState("All");
  const [ref, inView] = useInViewHook();

  const filtered =
    active === "All"
      ? menuItems
      : menuItems.filter((i) => i.category === active);

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-72 flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-banner.png" alt="Menu" fill className="object-cover opacity-30" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Explore</p>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white">Our Menu</h1>
        </div>
      </section>

      {/* Menu */}
      <section ref={ref} className="py-20 bg-cream dark:bg-charcoal transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Culinary Delights"
            title="Dishes Crafted with Love"
            description="Every plate is a canvas of flavor, prepared by our passionate kitchen team."
          />

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? "bg-gold text-charcoal shadow-lg shadow-gold/25"
                    : "bg-white dark:bg-white/5 text-charcoal/70 dark:text-cream/70 hover:bg-gold/10 hover:text-gold border border-charcoal/10 dark:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${inView ? "stagger-children" : ""}`}>
            {filtered.map((item, i) => (
              <div
                key={item.name}
                className="group bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl dark:shadow-none hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-gold/30 dark:hover:border-gold/30"
              >
                <div className="relative h-56 overflow-hidden">
                  {item.img ? (
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`w-full h-full ${item.placeholder} flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-700`}>
                      {item.emoji}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-charcoal/80 backdrop-blur-sm text-gold text-xs font-bold rounded-full uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-lg font-bold text-charcoal dark:text-cream">{item.name}</h3>
                    <span className="text-gold text-xl font-bold">{item.price}</span>
                  </div>
                  <p className="text-charcoal/60 dark:text-cream/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function useInViewHook(threshold = 0.1) {
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
