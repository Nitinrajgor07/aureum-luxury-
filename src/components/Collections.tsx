import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface CollectionsProps {
  onSelectCategory: (category: "Suits" | "Watches" | "Leather" | "Accessories") => void;
}

export default function Collections({ onSelectCategory }: CollectionsProps) {
  const collectionList = [
    {
      id: "col-suits",
      title: "Imperial Tailoring",
      subtitle: "The Obsidian Suit & Blazers",
      description: "Super-150s heavy Italian velvet, pure cashmere wefts, and standard gold thread contours sculpted to absolute physical perfection.",
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800",
      category: "Suits" as const,
      badge: "Savile Row Atelier"
    },
    {
      id: "col-watches",
      title: "Gilded Complexity",
      subtitle: "Swiss Haute Horology",
      description: "In-house mechanical skeleton tourbillons forged in solid 18-karat yellow gold casings, featuring handcheck sapphire backplates.",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
      category: "Watches" as const,
      badge: "Swiss Jura Atelier"
    },
    {
      id: "col-leather",
      title: "Tuscan Prestige",
      subtitle: "Florentine Leather & Footwear",
      description: "First-selection calfskin weekenders and hand-welted leather Goodyear loafers with gilded hardware detailing.",
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800",
      category: "Leather" as const,
      badge: "Florence Atelier"
    }
  ];

  return (
    <section id="collections" className="py-24 bg-obsidian-950 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Editorial Header */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold-400 font-bold block mb-3">
              Section I • The Pillar Disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-none mb-4">
              Featured <span className="font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">Collections</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-gradient-to-r from-gold-500 to-transparent mb-5 mx-auto md:mx-0" />
            <p className="text-obsidian-300 text-xs sm:text-sm tracking-wide font-light leading-relaxed">
              Every garment and masterpiece we issue is manufactured by hand across three centuries-old private ateliers in England, 
              Switzerland, and Italy. We specialize in custom measurements, mechanical complexity, and lifetime-grade leather.
            </p>
          </div>
          
          <div className="hidden md:block">
            <span className="text-[10px] text-gold-300/60 font-semibold uppercase tracking-[0.3em] font-mono">
              CURATED HERITAGE • SINCE 1894
            </span>
          </div>
        </div>

        {/* Collections Grid */}
        <div id="collections-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collectionList.map((col, index) => (
            <motion.div
              id={`col-card-${col.id}`}
              key={col.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onClick={() => onSelectCategory(col.category)}
              className="group relative h-[480px] bg-obsidian-900 border border-gold-500/10 hover:border-gold-300/40 rounded-sm overflow-hidden flex flex-col justify-end p-6 md:p-8 cursor-pointer transition-all duration-500 shadow-xl hover:shadow-black/60 shadow-black/30"
            >
              {/* Background Zoom Image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-900/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors duration-500" />
                <img
                  id={`col-card-img-${col.id}`}
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover select-none transition-transform duration-1000 ease-out scale-100 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Contents */}
              <div className="relative z-20 space-y-4">
                {/* Vintage Badge label */}
                <span className="inline-block px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-gold-300 border border-gold-500/20 bg-black/40 rounded-sm">
                  {col.badge}
                </span>

                <div>
                  <span className="text-[10px] text-gold-400 font-semibold uppercase tracking-wider block">
                    {col.subtitle}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-wide mt-1 group-hover:text-gold-200 transition-colors">
                    {col.title}
                  </h3>
                </div>

                <p className="text-obsidian-300 text-xs tracking-wide font-light leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
                  {col.description}
                </p>

                {/* Styled Call To Action button */}
                <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-400 group-hover:text-gold-300 transition-all duration-300">
                  <span>Enter Atelier Showroom</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Subtle top shimmer glow */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
