import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Crown, Menu, X, User, PhoneCall, Gift, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AuthUser } from "../context/AuthContext";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onVipClick: () => void;
  onBookingClick: () => void;
  onQuizClick: () => void;
  user: AuthUser | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
}

export default function Header({
  cartItemCount,
  onCartClick,
  onVipClick,
  onBookingClick,
  onQuizClick,
  user,
  onLoginClick,
  onSignupClick,
  onLogout,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <>
      <header
        id="aureum-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-obsidian-950/95 backdrop-blur-md py-4 border-b border-gold-500/20 shadow-lg shadow-black/40"
            : "bg-gradient-to-b from-black/80 to-transparent py-6 border-b border-white/0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-gold-300 hover:text-gold-100 p-1 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo Brand */}
          <a
            id="brand-logo-link"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-center select-none"
          >
            <span className="font-display text-xl md:text-2xl font-bold tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500">
              AUREUM
            </span>
            <span className="text-[7px] md:text-[8px] tracking-[0.5em] text-gold-300/80 -mt-0.5 uppercase font-medium">
              LUXURY SARTORIAL
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => scrollToSection("collections")}
              className="text-obsidian-300 hover:text-gold-300 transition-colors duration-300 cursor-pointer"
            >
              The Atelier
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-obsidian-300 hover:text-gold-300 transition-colors duration-300 cursor-pointer"
            >
              The Showroom
            </button>
            <button
              onClick={() => { scrollToSection("quiz"); onQuizClick(); }}
              className="text-obsidian-300 hover:text-gold-300 transition-colors duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-gold-400" />
              Signature Finder
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="text-obsidian-300 hover:text-gold-300 transition-colors duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
              Bespoke Booking
            </button>
            <button
              onClick={() => scrollToSection("footer")}
              className="text-obsidian-300 hover:text-gold-300 transition-colors duration-300 cursor-pointer"
            >
              Ateliers
            </button>
          </nav>

          {/* Actions Bar */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* VIP Club */}
            <button
              onClick={onVipClick}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-gold-600/10 to-gold-500/15 hover:from-gold-600/20 hover:to-gold-500/35 border border-gold-500/40 hover:border-gold-300 rounded-full text-[10px] font-bold uppercase tracking-widest text-gold-200 transition-all duration-300 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-gold-400 animate-subtle-bounce" />
              <span>Aureum Club</span>
            </button>

            <button
              onClick={onVipClick}
              className="lg:hidden p-2 text-gold-300 hover:text-gold-100 cursor-pointer"
              aria-label="Aureum Circle Benefits"
            >
              <Crown className="w-5 h-5 text-gold-400" />
            </button>

            {/* User Auth section */}
            {user ? (
              /* Logged-in user dropdown */
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen((p) => !p)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-gold-500/30 hover:border-gold-400/60 bg-obsidian-900/60 hover:bg-obsidian-800 transition-all duration-200 rounded-sm cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                    <span className="text-gold-300 text-[10px] font-bold uppercase">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden md:block text-gold-200 text-xs tracking-wide max-w-[80px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gold-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-obsidian-950 border border-obsidian-800 shadow-xl shadow-black/50 z-50"
                    >
                      <div className="px-4 py-3 border-b border-obsidian-800">
                        <p className="text-white text-xs font-medium truncate">{user.name}</p>
                        <p className="text-obsidian-400 text-[10px] truncate mt-0.5">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => { setUserMenuOpen(false); onLogout(); }}
                          className="w-full text-left px-4 py-2.5 text-xs text-obsidian-300 hover:text-red-400 hover:bg-obsidian-900 flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Login / Signup buttons */
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={onLoginClick}
                  className="text-obsidian-300 hover:text-gold-300 text-xs tracking-widest uppercase transition-colors cursor-pointer px-2 py-1"
                >
                  Sign In
                </button>
                <button
                  onClick={onSignupClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gold-500/40 hover:border-gold-300 text-gold-300 hover:text-gold-100 text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer"
                >
                  <User className="w-3 h-3" />
                  Join
                </button>
              </div>
            )}

            {/* Shopping Bag */}
            <button
              id="header-cart-btn"
              onClick={onCartClick}
              className="relative p-2.5 bg-obsidian-900 hover:bg-obsidian-800 border border-gold-500/20 rounded-full text-gold-300 hover:text-gold-200 transition-all duration-300 cursor-pointer"
              aria-label={`${cartItemCount} items in shopping bag`}
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 font-bold text-[10px] flex items-center justify-center rounded-full border border-obsidian-950 shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Side Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-[100]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80vw] max-w-[340px] bg-obsidian-950 border-r border-gold-500/20 z-[110] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gold-500/10">
                  <span className="font-display text-lg font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">
                    AUREUM
                  </span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gold-300 hover:text-gold-100 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile user info */}
                {user && (
                  <div className="mt-4 mb-2 px-3 py-2.5 bg-obsidian-900 border border-obsidian-800">
                    <p className="text-gold-300 text-xs font-medium">{user.name}</p>
                    <p className="text-obsidian-400 text-[10px] mt-0.5">{user.email}</p>
                  </div>
                )}

                <div className="flex flex-col space-y-6 pt-8">
                  <button onClick={() => scrollToSection("collections")} className="text-left font-display text-lg uppercase tracking-wider text-obsidian-100 hover:text-gold-300 transition-colors cursor-pointer">
                    The Atelier
                  </button>
                  <button onClick={() => scrollToSection("gallery")} className="text-left font-display text-lg uppercase tracking-wider text-obsidian-100 hover:text-gold-300 transition-colors cursor-pointer">
                    The Showroom
                  </button>
                  <button onClick={() => { scrollToSection("quiz"); onQuizClick(); setMobileMenuOpen(false); }} className="text-left font-display text-lg uppercase tracking-wider text-obsidian-100 hover:text-gold-300 transition-colors flex items-center gap-2 cursor-pointer">
                    <Gift className="w-5 h-5 text-gold-400" /> Signature Finder
                  </button>
                  <button onClick={() => { scrollToSection("booking"); onBookingClick(); setMobileMenuOpen(false); }} className="text-left font-display text-lg uppercase tracking-wider text-obsidian-100 hover:text-gold-300 transition-colors flex items-center gap-2 cursor-pointer">
                    <PhoneCall className="w-5 h-5 text-gold-400" /> Bespoke Booking
                  </button>
                  <button onClick={() => scrollToSection("footer")} className="text-left font-display text-lg uppercase tracking-wider text-obsidian-100 hover:text-gold-300 transition-colors cursor-pointer">
                    Atelier Locations
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-gold-500/10 space-y-3">
                {user ? (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-obsidian-700 hover:border-red-800 text-obsidian-300 hover:text-red-400 text-xs font-medium uppercase tracking-widest transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => { setMobileMenuOpen(false); onLoginClick(); }} className="flex-1 py-3 border border-obsidian-700 text-obsidian-300 text-xs uppercase tracking-widest cursor-pointer hover:border-gold-500/40 hover:text-gold-300 transition-all">
                      Sign In
                    </button>
                    <button onClick={() => { setMobileMenuOpen(false); onSignupClick(); }} className="flex-1 py-3 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-gold-400 transition-all">
                      Join
                    </button>
                  </div>
                )}
                <button
                  onClick={() => { setMobileMenuOpen(false); onVipClick(); }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-xs font-bold uppercase tracking-widest text-obsidian-950 transition-all cursor-pointer"
                >
                  <Crown className="w-4 h-4" /> Enter Aureum Circle
                </button>
                <p className="text-[9px] text-center text-obsidian-400 font-medium tracking-wide">
                  PRIVATE HEIRLOOM APPAREL • LONDON • MILAN • TOKYO
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
