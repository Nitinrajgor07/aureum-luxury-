import { motion } from "motion/react";
import { ArrowDown, Ship, Award, ShieldCheck } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onBookingClick: () => void;
}

export default function Hero({ onExploreClick, onBookingClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-obsidian-950 overflow-hidden pt-20"
    >
      {/* Background Graphic Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-radial-vignette opacity-70 mix-blend-overlay z-10 pointers-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-transparent to-obsidian-950 z-10" />
        <img
          id="hero-backdrop-img"
          src="https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&q=80&w=1600"
          alt="Aureum Luxury Menswear"
          className="w-full h-full object-cover object-top scale-105 transition-transform duration-[12s] ease-out select-none opacity-45"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Decorative Golden Geometric Fine Lines */}
      <div className="absolute inset-0 pointers-none z-10 flex items-center justify-between px-10 md:px-20 max-w-7xl mx-auto opacity-10">
        <div className="w-[1px] h-3/4 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        <div className="w-[1px] h-3/4 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        {/* Fine Tagline */}
        <motion.div
          id="hero-tagline-container"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        className="flex items-center gap-2 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-gold-300">
            Heritage Custom Sartorial & Horology
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
        </motion.div>

        {/* Major Editorial Headline */}
        <motion.h1
          id="hero-headline"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-white tracking-normal leading-[1.1] mb-6"
        >
          Sovereign Grace. <br />
          <span className="font-display font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-gold-100 via-gold-300 to-gold-500">
            Refined Power.
          </span>
        </motion.h1>

        {/* Brand Slogan */}
        <motion.p
          id="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.7 }}
          className="max-w-xl text-obsidian-200 text-xs sm:text-sm md:text-base tracking-wide font-light leading-relaxed mb-10"
        >
          Crafting heirloom-grade tailoring, Swiss tourbillon movements, and Tuscan leather essentials 
          for gentlemen who dictate rules rather than follow them. Hand-forged in London, Milan, and Tokyo.
        </motion.p>

        {/* Buttons Call to Action */}
        <motion.div
          id="hero-buttons"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-16"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 hover:from-gold-500 hover:to-gold-300 hover:scale-[1.03] shadow-lg shadow-gold-500/10 cursor-pointer"
          >
            <span className="relative z-10">Explore The Showroom</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
          </button>

          <button
            id="hero-booking-btn"
            onClick={onBookingClick}
            className="group px-8 py-4 bg-transparent hover:bg-gold-500/5 text-gold-300 hover:text-gold-200 text-xs font-bold uppercase tracking-widest border border-gold-500/30 hover:border-gold-300 rounded-sm transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <span>Book Private Fitting</span>
          </button>
        </motion.div>

        {/* Feature Icons Strip */}
        <motion.div
          id="hero-features-strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="grid grid-cols-3 gap-6 md:gap-12 max-w-4xl w-full border-t border-gold-500/10 pt-8"
        >
          <div className="flex flex-col items-center">
            <Award className="w-5 h-5 text-gold-400 mb-2" />
            <h3 className="font-display text-[9px] md:text-[11px] font-bold uppercase text-gold-200 tracking-wider">Heritage Crafts</h3>
            <p className="text-[8px] md:text-[9px] text-obsidian-400 mt-1 uppercase tracking-wide font-medium">Savile Row Tailored</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-gold-400 mb-2" />
            <h3 className="font-display text-[9px] md:text-[11px] font-bold uppercase text-gold-200 tracking-wider">Private Security</h3>
            <p className="text-[8px] md:text-[9px] text-obsidian-400 mt-1 uppercase tracking-wide font-medium">Lifetime Guarantee</p>
          </div>
          <div className="flex flex-col items-center">
            <Ship className="w-5 h-5 text-gold-400 mb-2" />
            <h3 className="font-display text-[9px] md:text-[11px] font-bold uppercase text-gold-200 tracking-wider">White-Glove Delivery</h3>
            <p className="text-[8px] md:text-[9px] text-obsidian-400 mt-1 uppercase tracking-wide font-medium">Global Aviation VIP</p>
          </div>
        </motion.div>
      </div>

      {/* Bounce Anchor Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={onExploreClick}
        aria-label="Scroll to collections"
      >
        <span className="text-[8px] tracking-[0.4em] uppercase text-gold-300 font-bold mb-2">The Descent</span>
        <ArrowDown className="w-4 h-4 text-gold-400 animate-subtle-bounce" />
      </div>
    </section>
  );
}
