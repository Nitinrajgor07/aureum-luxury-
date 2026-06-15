import { useState, useMemo, MouseEvent } from "react";
import { Star, Eye, ShoppingCart, Search, X, Check, Crown, Briefcase, Watch, Shirt, Gem, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface GalleryProps {
  onAddToCart: (product: Product, option: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CATEGORY_CONFIG = [
  { label: "All",         icon: Crown,     count: null },
  { label: "Suits",       icon: Shirt,     count: null },
  { label: "Watches",     icon: Watch,     count: null },
  { label: "Leather",     icon: Briefcase, count: null },
  { label: "Accessories", icon: Gem,       count: null },
];

const SORT_OPTIONS = [
  { label: "Featured",    value: "featured" },
  { label: "Price: High", value: "price-desc" },
  { label: "Price: Low",  value: "price-asc" },
  { label: "Rating",      value: "rating" },
];

export default function Gallery({ onAddToCart, activeCategory, setActiveCategory }: GalleryProps) {
  const [searchQuery, setSearchQuery]       = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [sortBy, setSortBy]                 = useState("featured");
  const [sortOpen, setSortOpen]             = useState(false);
  const [hoveredCard, setHoveredCard]       = useState<string | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PRODUCTS.length };
    PRODUCTS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat    = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.subCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchCat && matchSearch;
    });
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "rating")     list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "featured")   list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setSelectedOption(product.options[0]);
  };

  const handleAddToBagFromModal = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, selectedOption);
      setFeedbackMessage(`Added to your bag: ${selectedProduct.name}`);
      setTimeout(() => setFeedbackMessage(null), 3500);
      setSelectedProduct(null);
    }
  };

  const handleQuickAdd = (product: Product, e: MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.options[0]);
    setFeedbackMessage(`Added: ${product.name}`);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const currentSortLabel = SORT_OPTIONS.find(s => s.value === sortBy)?.label;

  return (
    <section id="gallery" className="py-24 bg-obsidian-950 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold-400 font-bold block mb-3">
            Section II • Haute Showroom
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-none mb-4">
            Curated{" "}
            <span className="font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">
              Atelier Pieces
            </span>
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-gold-500 to-transparent mb-5 mx-auto" />
          <p className="text-obsidian-300 text-xs sm:text-sm tracking-wide font-light leading-relaxed">
            Acquire your heirloom. Filter our current portfolio of bespoken wool suits, Swiss tourbillons,
            hand-stitched leather goods and rare accessories.
          </p>
        </div>

        {/* ── Toast ── */}
        <AnimatePresence>
          {feedbackMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-[140] max-w-sm p-4 bg-obsidian-900 border border-gold-500 shadow-2xl flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-xs text-white font-medium tracking-wide">{feedbackMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Luxury Category Tabs ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORY_CONFIG.map(({ label, icon: Icon }) => {
              const isActive = activeCategory === label;
              const count = categoryCounts[label] || 0;
              return (
                <button
                  key={label}
                  onClick={() => setActiveCategory(label)}
                  className={`group relative flex items-center gap-2.5 px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-gradient-to-b from-gold-500/20 to-gold-600/10 border border-gold-500/60 text-gold-300 shadow-lg shadow-gold-500/10"
                      : "bg-obsidian-900/60 border border-obsidian-700/60 text-obsidian-400 hover:text-white hover:border-gold-500/30 hover:bg-obsidian-800/60"
                  }`}
                >
                  {/* Active gold top border */}
                  {isActive && (
                    <motion.div
                      layoutId="cat-active-top"
                      className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
                    />
                  )}

                  <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-gold-400" : "text-obsidian-500 group-hover:text-gold-500"}`} />
                  <span>{label}</span>

                  {/* Count badge */}
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm transition-all ${
                    isActive ? "bg-gold-500/20 text-gold-300" : "bg-obsidian-800 text-obsidian-500 group-hover:text-obsidian-300"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Thin gold divider under tabs */}
          <div className="h-px bg-gradient-to-r from-gold-500/30 via-gold-500/10 to-transparent mt-0" />
        </div>

        {/* ── Search + Sort bar ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/70" />
            <input
              type="text"
              placeholder="Search the atelier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-obsidian-900/80 border border-obsidian-700 focus:border-gold-500/50 text-xs text-white placeholder-obsidian-500 pl-11 pr-10 py-3.5 outline-none tracking-wide transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-obsidian-500 hover:text-white cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setSortOpen(p => !p)}
              className="flex items-center gap-3 px-4 py-3.5 bg-obsidian-900/80 border border-obsidian-700 hover:border-gold-500/30 text-obsidian-300 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer min-w-[160px] justify-between"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-gold-500" />
                {currentSortLabel}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-1 w-full bg-obsidian-950 border border-obsidian-700 shadow-2xl z-50"
                >
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest transition-colors cursor-pointer ${
                        sortBy === opt.value
                          ? "text-gold-400 bg-gold-500/10"
                          : "text-obsidian-400 hover:text-white hover:bg-obsidian-900"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result count */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-3.5 border border-obsidian-800 bg-obsidian-900/40 shrink-0">
            <span className="text-gold-400 font-bold text-sm">{filteredProducts.length}</span>
            <span className="text-obsidian-500 text-[10px] uppercase tracking-widest">pieces</span>
          </div>
        </div>

        {/* ── Product Grid ── */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-obsidian-800 bg-obsidian-900/30">
            <Crown className="w-8 h-8 text-obsidian-700 mx-auto mb-4" />
            <p className="text-obsidian-400 text-sm tracking-widest uppercase font-light">
              No pieces found in our archives.
            </p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-6 text-xs text-gold-400 font-bold uppercase tracking-widest underline decoration-gold-500/40 hover:decoration-gold-400 cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.3) }}
                onClick={() => openProductDetails(product)}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-obsidian-900/50 border border-obsidian-800 hover:border-gold-500/40 overflow-hidden flex flex-col cursor-pointer transition-all duration-400 shadow-lg shadow-black/30 hover:shadow-black/60 hover:-translate-y-1"
              >
                {/* ── Image ── */}
                <div className="relative aspect-[3/4] overflow-hidden bg-obsidian-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/20 z-10" />

                  {/* Category chip top-left */}
                  <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                    {product.featured && (
                      <span className="flex items-center gap-1 px-2 py-1 text-[7px] font-black uppercase tracking-widest text-obsidian-950 bg-gradient-to-r from-gold-400 to-gold-300">
                        <Crown className="w-2.5 h-2.5" /> Prestige
                      </span>
                    )}
                    <span className="px-2 py-1 text-[7px] font-bold uppercase tracking-widest text-gold-300 bg-obsidian-950/80 border border-gold-500/20 backdrop-blur-sm">
                      {product.subCategory || product.category}
                    </span>
                  </div>

                  {/* Price chip top-right */}
                  <div className="absolute top-3 right-3 z-20 px-2.5 py-1.5 bg-obsidian-950/90 border border-gold-500/20 backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-gold-300 tracking-wide">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Hover action bar */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-350 bg-gradient-to-t from-obsidian-950 via-obsidian-950/95 to-transparent flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); openProductDetails(product); }}
                      className="flex-1 py-2.5 bg-obsidian-900 hover:bg-obsidian-800 border border-gold-500/20 hover:border-gold-400 text-[9px] font-bold uppercase tracking-widest text-gold-300 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      Inspect
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="w-10 bg-gradient-to-b from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-obsidian-950 flex items-center justify-center transition-all cursor-pointer shrink-0"
                      title="Quick Add"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-[13px] font-bold text-white group-hover:text-gold-200 tracking-wide transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-obsidian-400 font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 mt-3 border-t border-obsidian-800 flex items-center justify-between">
                    {/* Stars */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? "fill-gold-500 text-gold-500" : "text-obsidian-700"}`} />
                        ))}
                      </div>
                      <span className="text-[9px] text-obsidian-400 font-medium">{product.rating.toFixed(1)}</span>
                    </div>

                    {/* Options count */}
                    <span className="text-[9px] text-obsidian-500 uppercase tracking-widest">
                      {product.options.length} options
                    </span>
                  </div>
                </div>

                {/* Bottom gold accent — only on hover */}
                <div className={`h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 transition-opacity duration-300 ${hoveredCard === product.id ? "opacity-100" : "opacity-0"}`} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── Product Detail Modal ── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.88 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-4xl bg-obsidian-900 border border-gold-400/30 shadow-2xl z-20 max-h-[90vh] overflow-y-auto"
            >
              {/* Gold top line */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-30 p-2 bg-obsidian-950/80 hover:bg-black border border-obsidian-700 hover:border-gold-500/40 text-obsidian-400 hover:text-gold-300 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="relative h-[300px] md:h-full min-h-[400px] bg-obsidian-950">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent" />

                  {/* Rating overlay */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-2 bg-obsidian-950/80 border border-gold-500/20 backdrop-blur-sm">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(selectedProduct.rating) ? "fill-gold-500 text-gold-500" : "text-obsidian-600"}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-white">{selectedProduct.rating.toFixed(1)}</span>
                  </div>

                  <span className="absolute top-5 left-5 px-3 py-1.5 text-[8px] font-black uppercase tracking-widest text-obsidian-950 bg-gradient-to-r from-gold-400 to-gold-300">
                    {selectedProduct.category} · {selectedProduct.subCategory}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-gold-400 mb-2">Curated Private Allocation</p>
                    <h3 className="font-serif text-xl md:text-2xl font-light text-white leading-tight tracking-wide mb-3">
                      {selectedProduct.name}
                    </h3>

                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500">
                        ${selectedProduct.price.toLocaleString()}
                      </span>
                      <span className="text-[8px] font-bold text-green-400 border border-green-500/20 px-2 py-0.5 bg-green-500/5 uppercase tracking-widest">
                        In Stock
                      </span>
                    </div>

                    <p className="text-xs text-obsidian-300 leading-relaxed font-light mb-5">
                      {selectedProduct.fullDescription}
                    </p>

                    {/* Highlights */}
                    <div className="mb-5">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gold-400 mb-2">Signature Highlights</p>
                      <ul className="space-y-1.5">
                        {selectedProduct.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-[10px] text-obsidian-300 font-light">
                            <span className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specs */}
                    <div className="mb-5 p-3 bg-black/40 border border-gold-500/10">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gold-400 mb-3">Atelier Specifications</p>
                      <div className="space-y-1.5">
                        {Object.entries(selectedProduct.specifications).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-4 border-b border-white/5 pb-1.5 text-[9px]">
                            <span className="text-obsidian-500 uppercase font-bold tracking-wide shrink-0">{k}</span>
                            <span className="text-white text-right font-medium">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Options */}
                    <div className="mb-4">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gold-400 mb-2">{selectedProduct.optionsLabel}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setSelectedOption(opt)}
                            className={`px-3 py-2 text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                              selectedOption === opt
                                ? "bg-gradient-to-r from-gold-600 to-gold-500 text-obsidian-950 border border-gold-300"
                                : "bg-obsidian-950 text-obsidian-400 hover:text-white border border-obsidian-700 hover:border-gold-500/30"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gold-500/10">
                    <button
                      onClick={handleAddToBagFromModal}
                      className="w-full py-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-obsidian-950 font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Secure This Piece
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
