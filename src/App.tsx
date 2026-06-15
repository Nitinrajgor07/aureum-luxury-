/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import Gallery from "./components/Gallery";
import FragranceQuiz from "./components/FragranceQuiz";
import ConciergeBooking from "./components/ConciergeBooking";
import CartDrawer from "./components/CartDrawer";
import VIPClub from "./components/VIPClub";
import Testimonials from "./components/Testimonials";
import PremiumFooter from "./components/PremiumFooter";
import AuthModal from "./components/AuthModal";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Product, CartItem } from "./types";

// Inner component — AuthProvider ke andar hona zaroori hai
function AppContent() {
  const { user, logout, isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [vipClubOpen, setVipClubOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const openLogin = () => { setAuthModalTab("login"); setAuthModalOpen(true); };
  const openSignup = () => { setAuthModalTab("signup"); setAuthModalOpen(true); };

  const handleAddToCart = (product: Product, option: string) => {
    setCartItems((prevItems) => {
      const existingSkuIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id && item.selectedOption === option
      );

      if (existingSkuIndex > -1) {
        const updated = [...prevItems];
        updated[existingSkuIndex] = {
          ...updated[existingSkuIndex],
          quantity: updated[existingSkuIndex].quantity + 1,
        };
        return updated;
      } else {
        return [...prevItems, { product, quantity: 1, selectedOption: option }];
      }
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (id: string, selectOption: string, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === id && item.selectedOption === selectOption) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (id: string, selectOption: string) => {
    setCartItems((prevItems) => {
      return prevItems.filter(
        (item) => !(item.product.id === id && item.selectedOption === selectOption)
      );
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectCategoryFromCollections = (category: "Suits" | "Watches" | "Leather" | "Accessories") => {
    setActiveCategory(category);
    const element = document.getElementById("gallery");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div id="app-root-container" className="bg-obsidian-950 min-h-screen text-white select-none selection:bg-gold-500 selection:text-obsidian-950 font-sans antialiased overflow-x-hidden">
      
      {/* Luxury gold border decorators */}
      <div className="hidden xl:block fixed left-4 top-4 bottom-4 w-[1px] bg-gradient-to-b from-gold-500/10 via-gold-500/25 to-gold-500/10 z-40" />
      <div className="hidden xl:block fixed right-4 top-4 bottom-4 w-[1px] bg-gradient-to-b from-gold-500/10 via-gold-500/25 to-gold-500/10 z-40" />

      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setCartDrawerOpen(true)}
        onVipClick={() => setVipClubOpen(true)}
        onBookingClick={() => scrollToSection("booking")}
        onQuizClick={() => scrollToSection("quiz")}
        // Auth props
        user={isAuthenticated ? user : null}
        onLoginClick={openLogin}
        onSignupClick={openSignup}
        onLogout={logout}
      />

      <main className="relative z-10 xl:px-4">
        <Hero
          onExploreClick={() => {
            setActiveCategory("All");
            scrollToSection("gallery");
          }}
          onBookingClick={() => scrollToSection("booking")}
        />

        <Collections onSelectCategory={handleSelectCategoryFromCollections} />

        <Gallery
          onAddToCart={handleAddToCart}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <FragranceQuiz />

        <ConciergeBooking />

        <Testimonials />
      </main>

      <PremiumFooter />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <VIPClub isOpen={vipClubOpen} onClose={() => setVipClubOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </div>
  );
}

// Root component — AuthProvider wrap karta hai
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
