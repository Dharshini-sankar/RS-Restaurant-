import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/components/ThemeProvider";


const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "RS Restaurant | Modern Dining Experience",
    template: "%s | RS Restaurant",
  },
  description:
    "Experience the finest dining at RS Restaurant. Explore our exquisite menu, book a table online, and enjoy premium hospitality in the heart of Chennai.",
  keywords: [
    "restaurant",
    "fine dining",
    "Chennai restaurant",
    "book a table",
    "Indian cuisine",
    "RS Restaurant",
    "home delivery",
    "order food online",
    "food delivery Chennai",
  ],
  openGraph: {
    title: "RS Restaurant | Modern Dining Experience",
    description:
      "Experience the finest dining at RS Restaurant. Explore our exquisite menu, book a table online, and enjoy premium hospitality.",
    type: "website",
    locale: "en_IN",
    siteName: "RS Restaurant",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-cream dark:bg-charcoal text-charcoal dark:text-cream transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
