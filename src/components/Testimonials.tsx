import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-obsidian-950 border-t border-gold-500/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold-400 font-bold block mb-3">
            Section V • Client Commendations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight leading-none mb-4">
            Voices of the <span className="font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">Patrons</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-gold-500 to-transparent mb-5 mx-auto" />
          <p className="text-obsidian-300 text-xs tracking-wide font-light leading-relaxed">
            Read critical endorsements regarding our bespoke services, chronological power movements, 
            and white-glove logistics. Authentic words from collectors and high-society patrons globally.
          </p>
        </div>

        {/* Testimonials Slider Area */}
        <div className="relative max-w-4xl mx-auto bg-obsidian-900/35 border border-gold-500/10 p-6 md:p-12 rounded-sm shadow-xl shadow-black/40">
          
          {/* Quote Mark background */}
          <div className="absolute top-6 right-8 text-gold-500/10 pointers-none">
            <Quote className="w-32 h-32 rotate-180" />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                id={`testimonial-pane-${current.id}`}
                key={current.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Client portrait image */}
                <div className="relative shrink-0 w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border border-gold-500/40 shadow-xl bg-black">
                  <img
                    id={`testimonial-avatar-${current.id}`}
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Quote details */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  {/* Rating Stars */}
                  <div className="flex justify-center md:justify-start gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>

                  <p className="font-serif text-sm sm:text-base md:text-lg text-white font-light italic leading-relaxed">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-gold-500/5 mt-4">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gold-300">
                      {current.name}
                    </h4>
                    <p className="text-[10px] text-obsidian-400 mt-1 font-mono tracking-wider uppercase font-semibold">
                      {current.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigational controls */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-gold-500/5">
            {/* Step count dots */}
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  id={`testimonial-dot-${i}`}
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex ? "bg-gold-400 w-3" : "bg-obsidian-700 hover:bg-obsidian-550"
                  }`}
                  aria-label={`View sliding item ${i + 1}`}
                />
              ))}
            </div>

            {/* Left Right Buttons */}
            <div className="flex gap-2">
              <button
                id="testimonial-prev-btn"
                onClick={handlePrev}
                className="p-2 bg-black hover:bg-obsidian-800 border border-gold-500/15 hover:border-gold-400 rounded-full text-gold-400 hover:text-white transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="testimonial-next-btn"
                onClick={handleNext}
                className="p-2 bg-black hover:bg-obsidian-800 border border-gold-500/15 hover:border-gold-400 rounded-full text-gold-400 hover:text-white transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
