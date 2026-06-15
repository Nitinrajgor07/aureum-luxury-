import { useState, FormEvent } from "react";
import { X, Trash2, ShieldAlert, CreditCard, ShoppingBag, Plus, Minus, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, selectOption: string, delta: number) => void;
  onRemoveItem: (id: string, selectOption: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "address" | "complete">("cart");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [privateCourierConsent, setPrivateCourierConsent] = useState(true);

  // Subtotal calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shippingTax = subtotal > 10000 ? 0 : 150; // free private delivery on orders over $10k
  const total = subtotal + shippingTax;

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!address || !city || !country || !postalCode) {
      alert("Please enter full delivery credentials to secure the private courier.");
      return;
    }
    setCheckoutStep("complete");
    // Clear shopping cart on completion handled in host or during reset
  };

  const handleCloseAndReset = () => {
    onClose();
    // delay reset slightly to allow drawer animation to complete
    setTimeout(() => {
      setCheckoutStep("cart");
      setAddress("");
      setCity("");
      setCountry("");
      setPostalCode("");
      if (checkoutStep === "complete") {
        onClearCart();
      }
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Shadow */}
          <motion.div
            id="cart-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-120"
          />

          {/* Drawer Body */}
          <motion.div
            id="cart-drawer-container"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 180 }}
            className="fixed top-0 right-0 h-full w-[100vw] sm:w-[480px] bg-obsidian-950 border-l border-gold-500/20 z-130 flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            {/* Header section */}
            <div className="p-6 border-b border-gold-500/10 flex items-center justify-between bg-black">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold-400" />
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
                  {checkoutStep === "complete" ? "Secure Allocation Established" : "Your Sartorial Selection"}
                </h3>
              </div>
              <button
                id="cart-drawer-close-btn"
                onClick={handleCloseAndReset}
                className="p-1 px-2 border border-gold-500/20 hover:border-gold-400 text-gold-400 hover:text-white rounded text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Stepper Wizard Indicator */}
            {checkoutStep !== "complete" && cartItems.length > 0 && (
              <div className="bg-obsidian-900 border-b border-gold-500/5 px-6 py-3 flex justify-between items-center text-[9px] font-bold text-gold-400 uppercase tracking-widest font-mono">
                <span className={checkoutStep === "cart" ? "text-gold-300 font-extrabold" : "text-obsidian-400"}>
                  01. Review Items
                </span>
                <ArrowRight className="w-3 h-3 text-obsidian-500" />
                <span className={checkoutStep === "address" ? "text-gold-300 font-extrabold" : "text-obsidian-400"}>
                  02. Dispatch Credentials
                </span>
              </div>
            )}

            {/* Central content scroll container */}
            <div id="cart-drawer-body" className="flex-1 overflow-y-auto p-6 scrollbar-none">
              <AnimatePresence mode="wait">
                {checkoutStep === "cart" && (
                  <motion.div
                    key="cart-step"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {cartItems.length === 0 ? (
                      <div id="cart-empty-view" className="text-center py-20">
                        <ShoppingBag className="w-12 h-12 text-obsidian-400 mx-auto mb-4 opacity-40 animate-pulse" />
                        <p className="text-xs text-obsidian-300 uppercase tracking-widest font-light mb-6">
                          Your private shopping bag is currently vacant.
                        </p>
                        <button
                          id="cart-drawer-return-btn"
                          onClick={onClose}
                          className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-obsidian-950 font-bold text-[9px] uppercase tracking-widest rounded-sm transition-all hover:scale-[1.02] cursor-pointer"
                        >
                          Observe Collections
                        </button>
                      </div>
                    ) : (
                      // Cart Item List
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            id={`cart-row-${item.product.id}-${item.selectedOption}`}
                            key={`${item.product.id}-${item.selectedOption}`}
                            className="bg-obsidian-900/60 border border-gold-500/10 rounded-sm p-4 flex gap-4 items-center justify-between"
                          >
                            <img
                              id={`cart-row-img-${item.product.id}`}
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-20 object-cover rounded-sm border border-gold-500/10"
                              referrerPolicy="no-referrer"
                            />

                            <div className="flex-1 min-w-0">
                              <h4 className="font-display text-[11px] font-bold text-white uppercase tracking-wider line-clamp-1">
                                {item.product.name}
                              </h4>
                              <p className="text-[9px] text-gold-400/90 font-mono mt-1">
                                {item.product.optionsLabel}: {item.selectedOption}
                              </p>
                              <p className="text-[10px] text-white font-serif mt-1 font-semibold">
                                ${item.product.price.toLocaleString()} Each
                              </p>
                            </div>

                            {/* Quantity buttons and delete */}
                            <div className="flex flex-col items-end gap-3 shrink-0">
                              <button
                                id={`cart-row-remove-${item.product.id}`}
                                onClick={() => onRemoveItem(item.product.id, item.selectedOption)}
                                className="text-obsidian-400 hover:text-red-400 transition-colors p-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                              <div className="flex items-center gap-2 bg-black border border-gold-500/15 rounded px-2 py-1 select-none">
                                <button
                                  id={`cart-row-qty-dec-${item.product.id}`}
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedOption, -1)}
                                  className="text-gold-300 hover:text-white p-0.5 cursor-pointer"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="text-[10px] font-mono text-white font-bold w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  id={`cart-row-qty-inc-${item.product.id}`}
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedOption, 1)}
                                  className="text-gold-300 hover:text-white p-0.5 cursor-pointer"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {checkoutStep === "address" && (
                  // Address form
                  <motion.form
                    key="address-step"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleCheckoutSubmit}
                    className="space-y-5 py-2"
                  >
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-gold-400 uppercase tracking-widest font-mono">
                        Secure Vault Delivery Address
                      </p>

                      <div className="space-y-3.5">
                        <input
                          id="checkout-delivery-address"
                          type="text"
                          required
                          placeholder="Residence Street Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-4 py-3 text-xs text-white placeholder-obsidian-400 outline-none"
                        />
                        
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            id="checkout-delivery-city"
                            type="text"
                            required
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-4 py-3 text-xs text-white placeholder-obsidian-400 outline-none"
                          />
                          <input
                            id="checkout-delivery-postal"
                            type="text"
                            required
                            placeholder="Postal / ZIP Code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-4 py-3 text-xs text-white placeholder-obsidian-400 outline-none"
                          />
                        </div>

                        <input
                          id="checkout-delivery-country"
                          type="text"
                          required
                          placeholder="Sovereign State / Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-4 py-3 text-xs text-white placeholder-obsidian-400 outline-none"
                        />
                      </div>
                    </div>

                    {/* Private Aviation Dispatcher Consent Option */}
                    <div className="p-3 bg-black border border-gold-500/10 rounded-sm space-y-2">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          id="checkout-courier-consent-checkbox"
                          type="checkbox"
                          checked={privateCourierConsent}
                          onChange={(e) => setPrivateCourierConsent(e.target.checked)}
                          className="mt-0.5 accent-gold-500"
                        />
                        <div className="text-[9px] leading-relaxed">
                          <span className="font-bold uppercase tracking-wider text-gold-300 block mb-0.5">
                            Private Bonded Courier Delivery
                          </span>
                          <span className="text-obsidian-300 font-light block">
                            I consent to have my items shipped from London with custom security sealing, 
                            using a single courier team for direct private handover.
                          </span>
                        </div>
                      </label>
                    </div>

                    <div className="bg-obsidian-900 p-4 border border-gold-500/5 rounded-sm flex gap-3 text-[10px] text-obsidian-300 leading-relaxed font-light">
                      <ShieldAlert className="w-5 h-5 text-gold-400 shrink-0" />
                      <span>Note: To comply with international luxury anti-fraud guidelines, high-end timepieces over $10,000 will require a copy of your photographic registry ID prior to flight takeoff.</span>
                    </div>

                    {/* Action navigation */}
                    <div className="flex gap-3 pt-4">
                      <button
                        id="checkout-back-to-cart"
                        type="button"
                        onClick={() => setCheckoutStep("cart")}
                        className="py-3 px-4 border border-gold-500/20 text-gold-400 hover:text-white rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Return to Selection
                      </button>
                      <button
                        id="checkout-submit-dispatch"
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-obsidian-950 rounded-sm font-extrabold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Authorize Sovereign Courier</span>
                      </button>
                    </div>
                  </motion.form>
                )}

                {checkoutStep === "complete" && (
                  // Purchase Complete Celebration Screen
                  <motion.div
                    key="complete-step"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-6"
                  >
                    <div className="w-16 h-16 bg-gold-500/10 border border-gold-400 rounded-full flex items-center justify-center text-gold-400 mx-auto">
                      <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display text-base font-bold text-white uppercase tracking-widest">
                        Purchase Allocation Secured
                      </h4>
                      <p className="text-[10px] text-gold-300 uppercase tracking-widest font-mono">
                        Reference Hash: AU-VLT-{Math.floor(100000 + Math.random() * 900000)}
                      </p>
                    </div>

                    <p className="text-xs text-obsidian-300 leading-relaxed font-light max-w-sm mx-auto">
                      Your luxurious items are locked in our secure Mayfair vault for immediate dispatch. 
                      An agent from our private air cargo office will email you to coordinate the delivery hours 
                      and obtain signature codes.
                    </p>

                    <div className="p-4 bg-black border border-gold-500/10 rounded-sm max-w-sm mx-auto text-left text-[9px] text-obsidian-300 space-y-2 font-mono">
                      <span className="font-bold text-gold-400 uppercase tracking-wider block">Vault Dispatch Stub:</span>
                      <p>Sovereign Handover Address: {address}, {city}, {postalCode}, {country}</p>
                      <p>Bonded Air Transport: SECURE-CARGO-AUREUM</p>
                    </div>

                    <button
                      id="checkout-complete-finish"
                      onClick={handleCloseAndReset}
                      className="px-8 py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 cursor-pointer"
                    >
                      Conclude Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky summary subtotal footer block */}
            {checkoutStep !== "complete" && cartItems.length > 0 && (
              <div id="cart-drawer-summary-footer" className="p-6 border-t border-gold-500/15 bg-black space-y-4 shadow-2xl">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-obsidian-400 uppercase font-bold tracking-wider font-mono">
                    <span>Selections Subtotal:</span>
                    <span className="text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-[10px] text-obsidian-400 uppercase font-bold tracking-wider font-mono">
                    <span>Bonded Flight Courier:</span>
                    <span className="text-gold-300">
                      {shippingTax === 0 ? "Complimentary Allocation" : `$${shippingTax.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-gold-500/10 my-2" />

                  <div className="flex justify-between items-center text-sm">
                    <span className="font-display font-bold uppercase tracking-widest text-gold-300">Total Valuation:</span>
                    <span className="font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Subtitle secure checkmarks */}
                <div className="flex items-center gap-1.5 text-[8px] text-green-500/90 font-mono tracking-widest uppercase">
                  <span>Secured Vault Transmission System</span>
                </div>

                {checkoutStep === "cart" && (
                  <button
                    id="cart-drawer-checkout-btn"
                    onClick={() => setCheckoutStep("address")}
                    className="w-full py-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-obsidian-950 font-extrabold text-[11px] uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Proceed to Dispatch Registry</span>
                    <ArrowRight className="w-3.5 h-3.5 mt-0.5" />
                  </button>
                )}
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
