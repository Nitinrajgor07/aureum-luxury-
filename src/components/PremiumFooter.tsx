import { MouseEvent } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Award, Crown, CheckSquare, ShieldCheck } from "lucide-react";
import { ATELIERS } from "../data";

export default function PremiumFooter() {
  const handleScrollToTop = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#050505] border-t border-gold-500/20 text-obsidian-200 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Core Locations and grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gold-500/10">
          
          {/* Col 1 Brand Statement */}
          <div className="space-y-4">
            <a
              id="footer-brand-logo"
              href="#hero"
              onClick={handleScrollToTop}
              className="flex flex-col items-start select-none"
            >
              <span className="font-display text-lg font-bold tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-400">
                AUREUM
              </span>
              <span className="text-[7px] tracking-[0.45em] text-gold-300/80 -mt-0.5 uppercase font-medium">
                LUXURY SARTORIAL
              </span>
            </a>
            <p className="text-[10px] text-obsidian-400 leading-relaxed font-light max-w-xs">
              Aureum represents the absolute zenith of masculine apparel, Swiss high-complication horology, 
              and aniline Tuscan leather goods. Hand-sculpted configurations for modern rulers.
            </p>
            <div className="flex gap-2 text-gold-400">
              <a href="#instagram" className="p-1.5 hover:text-white hover:bg-white/5 border border-white/5 rounded transition-colors duration-300">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#facebook" className="p-1.5 hover:text-white hover:bg-white/5 border border-white/5 rounded transition-colors duration-300">
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2 London Boutique */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest font-mono block pb-1 border-b border-gold-500/5">
              London flagshop
            </span>
            <div className="text-[10px] space-y-2">
              <p className="text-white font-medium">{ATELIERS[0].address}</p>
              <p className="text-obsidian-400">{ATELIERS[0].hours}</p>
              <p className="text-gold-300/90 font-mono">T: {ATELIERS[0].phone}</p>
            </div>
          </div>

          {/* Col 3 Milan Penthouse */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest font-mono block pb-1 border-b border-gold-500/5">
              Milan Privé
            </span>
            <div className="text-[10px] space-y-2">
              <p className="text-white font-medium">{ATELIERS[1].address}</p>
              <p className="text-obsidian-400">{ATELIERS[1].hours}</p>
              <p className="text-gold-300/90 font-mono">T: {ATELIERS[1].phone}</p>
            </div>
          </div>

          {/* Col 4 Tokyo Club */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest font-mono block pb-1 border-b border-gold-500/5">
              Tokyo temple
            </span>
            <div className="text-[10px] space-y-2">
              <p className="text-white font-medium">{ATELIERS[2].address}</p>
              <p className="text-obsidian-400">{ATELIERS[2].hours}</p>
              <p className="text-gold-300/90 font-mono">T: {ATELIERS[2].phone}</p>
            </div>
          </div>

        </div>

        {/* Fine print, certificates, and copyrights */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-[9px] uppercase tracking-wider text-obsidian-450 font-medium">
          <div className="space-y-1">
            <p className="text-obsidian-400">
              © {new Date().getFullYear()} AUREUM APPAREL SA. All Sovereign Rights Reserved.
            </p>
            <p className="text-[8px] text-obsidian-500 lowercase font-mono">
              london s1w • milano mn14 • tokyo ma11 • certified genuine hand-craftsmanship
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#privacy" className="hover:text-gold-300 transition-colors duration-300">
              Private Security Policies
            </a>
            <a href="#terms" className="hover:text-gold-300 transition-colors duration-300">
              Carrier Terms & Decorum
            </a>
            <button
              id="footer-back-to-top"
              onClick={handleScrollToTop}
              className="text-gold-400 hover:text-white transition-all cursor-pointer font-bold"
            >
              Rise to Top ▲
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
