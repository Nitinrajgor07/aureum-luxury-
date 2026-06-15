import { useState, FormEvent } from "react";
import { Crown, Shovel, Key, X, Sparkles, Check, Send, Award, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VIP_BENEFITS } from "../data";

interface VIPClubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VIPClub({ isOpen, onClose }: VIPClubProps) {
  const [accessCode, setAccessCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVipMember, setIsVipMember] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [vipError, setVipError] = useState("");

  const handleVerifyAccessCode = (e: FormEvent) => {
    e.preventDefault();
    if (!accessCode) return;

    setIsVerifying(true);
    setVipError("");

    setTimeout(() => {
      setIsVerifying(false);
      // Secret VIP code is 'AUREUM2026' or 'GOLDEN' or 'SARTORIAL'
      if (
        accessCode.toUpperCase() === "AUREUM2026" ||
        accessCode.toUpperCase() === "GOLDEN" ||
        accessCode.toUpperCase() === "SARTORIAL"
      ) {
        setIsVipMember(true);
      } else {
        setVipError("Verification signature rejected. Code does not exist in Mayfair rolls.");
      }
    }, 1800);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="vip-portal-root" className="fixed inset-0 z-150 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            id="vip-portal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />

          {/* Modal Container */}
          <motion.div
            id="vip-portal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-4xl bg-obsidian-900 border border-gold-450/40 rounded-sm overflow-hidden shadow-2xl z-20 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              id="vip-portal-close"
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2 bg-black/65 hover:bg-black/90 text-gold-300 hover:text-white border border-gold-500/10 hover:border-gold-300 rounded-full transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Left Column: Benefits & Curations */}
              <div className="md:col-span-7 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gold-500/10 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-gold-400 animate-subtle-bounce" />
                    <span className="text-[9px] font-extrabold tracking-[0.25em] uppercase text-gold-400">
                      Private Society Guild
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-white leading-tight tracking-wider">
                    The Aureum <span className="font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">Circle</span>
                  </h3>
                  <div className="w-12 h-0.5 bg-gold-400 mt-2" />
                </div>

                <p className="text-xs text-obsidian-300 leading-relaxed font-light">
                  Aureum Circle membership is extended exclusively to patrons who acquire bespoke commissions 
                  or haute complications. It introduces an elevated ecosystem of personal styling, security, and prestige benefits.
                </p>

                {/* Benefits List */}
                <div className="space-y-4">
                  {VIP_BENEFITS.map((b) => (
                    <div id={`vip-benefit-${b.id}`} key={b.id} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full border border-gold-500/30 bg-black flex items-center justify-center shrink-0 text-gold-400 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider">
                          {b.title}
                        </h4>
                        <p className="text-[10px] text-obsidian-400 leading-relaxed mt-0.5 font-light">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Portal Access Verification & Newsletter subscription */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-black/40">
                <AnimatePresence mode="wait">
                  {!isVipMember ? (
                    // Signature Validation Form
                    <motion.div
                      id="vip-verification-panel"
                      key="verify-form"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gold-400 uppercase tracking-widest font-mono">
                          Patron Verification
                        </p>

                        <p className="text-[10px] text-obsidian-300 font-light leading-relaxed">
                          Patrons who hold a metal Aureum key-card should insert their Verification Signature below.
                        </p>

                        <form id="vip-form" onSubmit={handleVerifyAccessCode} className="space-y-3.5">
                          <div>
                            <div className="relative">
                              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                              <input
                                id="vip-passcode-input"
                                type="text"
                                placeholder="Verification Signature (Try: SARTORIAL)"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                disabled={isVerifying}
                                className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-10 py-3 text-xs text-white placeholder-obsidian-550 outline-none font-mono"
                              />
                            </div>
                            {vipError && (
                              <p id="vip-error-log" className="text-[9px] text-red-500 font-mono mt-1.5 leading-relaxed">
                                {vipError}
                              </p>
                            )}
                          </div>

                          <button
                            id="vip-submit-code-btn"
                            type="submit"
                            disabled={isVerifying || !accessCode}
                            className="w-full py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 disabled:from-obsidian-800 disabled:to-obsidian-850 px-4 disabled:text-obsidian-500 font-extrabold text-[10px] uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:pointer-events-none"
                          >
                            {isVerifying ? (
                              <span className="flex items-center gap-2">
                                <span className="w-3 h-3 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                                <span>Verifying...</span>
                              </span>
                            ) : (
                              <>
                                <Crown className="w-3.5 h-3.5" />
                                <span>Verify Registry</span>
                              </>
                            )}
                          </button>
                        </form>
                      </div>

                      {/* Divider and Newsletter */}
                      <div className="border-t border-gold-500/10 pt-6 mt-6 space-y-4">
                        <p className="text-[10px] font-bold text-gold-400 uppercase tracking-widest font-mono">
                          Request Circle Registry
                        </p>
                        
                        <p className="text-[9px] text-obsidian-400 font-light leading-relaxed">
                          Not registered? Subscribe below to receive invitations to trunk shows, 
                          exclusive watch allocations, and select private couture drops.
                        </p>

                        {newsletterSubscribed ? (
                          <div id="newsletter-success" className="text-center p-3 bg-gold-500/10 border border-gold-500/20 text-gold-300 font-mono text-[9px] uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 animate-pulse">
                            <Check className="w-3 h-3" />
                            <span>Patron credentials recorded.</span>
                          </div>
                        ) : (
                          <form id="newsletter-form" onSubmit={handleNewsletterSubmit} className="flex gap-2">
                            <input
                              id="vip-newsletter-email"
                              type="email"
                              required
                              placeholder="Private Email address"
                              value={newsletterEmail}
                              onChange={(e) => setNewsletterEmail(e.target.value)}
                              className="flex-1 bg-black border border-gold-500/15 focus:border-gold-400 rounded px-3 py-2 text-xs text-white placeholder-obsidian-500 outline-none"
                            />
                            <button
                              id="vip-newsletter-submit"
                              type="submit"
                              className="px-4 bg-obsidian-850 hover:bg-obsidian-750 border border-gold-500/30 text-gold-400 hover:text-white rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                            >
                              <Send className="w-3 h-3" />
                            </button>
                          </form>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    // VIP Member Card Presentation
                    <motion.div
                      id="vip-member-card-container"
                      key="member-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 flex-1 flex flex-col justify-between py-4"
                    >
                      <div className="text-center space-y-2">
                        <div className="w-10 h-10 bg-gold-500/10 border border-gold-400 rounded-full flex items-center justify-center text-gold-400 mx-auto animate-bounce">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="font-display text-xs font-bold uppercase text-white tracking-widest">
                          Sovereign Roll Access Authorized
                        </h4>
                      </div>

                      {/* Physical digital membership card */}
                      <div className="relative aspect-[1.58/1] w-full rounded-sm border border-gold-400 bg-linear-to-tr from-obsidian-950 via-obsidian-900 to-obsidian-750 p-5 flex flex-col justify-between shadow-2xl overflow-hidden shadow-black/80">
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer pointers-none z-10" />

                        <div className="flex justify-between items-start z-20">
                          <div className="flex flex-col">
                            <span className="font-display text-[10px] font-black tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">
                              AUREUM
                            </span>
                            <span className="text-[5px] tracking-[0.3em] text-gold-400 font-mono -mt-0.5">
                              CIRCLE CLUB MEMBER
                            </span>
                          </div>
                          <Crown className="w-5 h-5 text-gold-400" />
                        </div>

                        <div className="z-20">
                          <span className="text-[5px] tracking-[0.4em] text-obsidian-400 font-mono block">
                            MEMBER SIGNATURE IDENTITY
                          </span>
                          <span className="font-serif text-sm tracking-wider text-white font-medium">
                            Lord Marcello Rossi
                          </span>
                        </div>

                        <div className="flex justify-between items-end z-20 font-mono">
                          <div>
                            <span className="text-[5px] tracking-[0.4em] text-obsidian-400 block">
                              MEMBER CODE
                            </span>
                            <span className="text-[8px] text-gold-300 font-semibold uppercase">
                              AUR-C-98124
                            </span>
                          </div>
                          <div>
                            <span className="text-[5px] tracking-[0.4em] text-obsidian-400 block">
                              ESTABLISHED
                            </span>
                            <span className="text-[8px] text-white font-semibold">
                              JUNE 2026
                            </span>
                          </div>
                        </div>

                        {/* Subtle background crest seal */}
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 border border-gold-500/10 rounded-full pointers-none flex items-center justify-center opacity-30">
                          <Crown className="w-10 h-10 text-gold-500/10" />
                        </div>
                      </div>

                      {/* Log out/Return button */}
                      <div className="space-y-2">
                        <button
                          id="vip-private-curations-btn"
                          onClick={() => {
                            alert("Welcome, Private Curations catalogs are currently synchronized with your air transport!");
                            onClose();
                          }}
                          className="w-full py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-350 text-obsidian-950 font-extrabold text-[10px] uppercase tracking-widest rounded-sm transition-all duration-300 cursor-pointer"
                        >
                          Observe Private Curation Catalog
                        </button>
                        <button
                          id="vip-log-out"
                          onClick={() => setIsVipMember(false)}
                          className="w-full py-2 bg-black hover:bg-obsidian-850 text-[9px] text-obsidian-400 hover:text-white uppercase tracking-widest font-bold transition-all cursor-pointer border border-white/5"
                        >
                          Conclude Member Session
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
