import { useState } from "react";
import { RefreshCw, Feather, Crown, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { QUIZ_QUESTIONS } from "../data";

const QUESTION_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200",
];

export default function FragranceQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleSelectOption = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setTimeout(() => {
      if (currentStep < QUIZ_QUESTIONS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setQuizFinished(true);
      }
    }, 500);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setQuizFinished(false);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const progress = ((currentStep) / QUIZ_QUESTIONS.length) * 100;

  const recommendation = (() => {
    const styleAns = answers[1];
    const backdropAns = answers[3];
    if (styleAns === "formal" || backdropAns === "gala") {
      return {
        title: "The Sovereign Evening Ensemble",
        suit: "Aureum Savile Bespoke Tuxedo",
        scent: "Aureum Classic Amber Noir Parfum",
        accessories: "Empress Silk Scarf & Cufflinks Set",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800",
        quote: "Your aesthetic dictates the grandest stages. Our Savile Row tuxedo paired with Amber Noir parfum will leave an unerasable impression.",
        badge: "Highest Formal Distinction",
        color: "from-amber-900/80 to-obsidian-950",
      };
    } else if (styleAns === "watches" || backdropAns === "boardroom") {
      return {
        title: "The Prestige Chrono Command",
        suit: "Obsidian Velvet Bespoke Blazer",
        scent: "Midnight Oud Rose Parfum",
        accessories: "The Gilded Legacy Chronograph",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800",
        quote: "For the executive boardrooms of Tokyo and London — the Gilded Legacy Tourbillon paired with velvet commands uncompromising authority.",
        badge: "Elite Precision Collection",
        color: "from-slate-900/80 to-obsidian-950",
      };
    } else {
      return {
        title: "The Imperial Grand Tourer",
        suit: "Camel Overcoat Supreme",
        scent: "Amber Noir Parfum",
        accessories: "Grand Tourer Black Calfskin Weekender",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
        quote: "Designed for private aviation and superyacht crossings — the Grand Tourer capsule is seamless international luxury in motion.",
        badge: "Private Aviation Uniform",
        color: "from-stone-900/80 to-obsidian-950",
      };
    }
  })();

  return (
    <section id="quiz" className="relative py-0 overflow-hidden">

      {/* Full-bleed background image per question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quizFinished ? "result" : currentStep}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={quizFinished ? recommendation.image : QUESTION_BACKGROUNDS[currentStep]}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/98 via-obsidian-950/80 to-obsidian-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 min-h-[100vh] flex flex-col justify-center py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-gold-500 to-transparent" />
            <span className="text-[9px] tracking-[0.5em] uppercase text-gold-400 font-bold">
              Section III · Sartorial Signature Finder
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-gold-500 to-transparent" />
          </motion.div>

          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              >
                {/* Left — Question */}
                <div>
                  {/* Step counter */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-display text-[80px] leading-none font-bold text-gold-500/10 select-none">
                      0{currentStep + 1}
                    </span>
                    <div>
                      <p className="text-[9px] tracking-[0.4em] uppercase text-gold-400 mb-1">
                        Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
                      </p>
                      {/* Progress dots */}
                      <div className="flex gap-2">
                        {QUIZ_QUESTIONS.map((_, i) => (
                          <div
                            key={i}
                            className={`h-0.5 transition-all duration-500 ${
                              i === currentStep ? "w-8 bg-gold-400" :
                              i < currentStep ? "w-4 bg-gold-600" :
                              "w-4 bg-obsidian-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight mb-4 tracking-wide">
                    {currentQuestion.text}
                  </h2>

                  <div className="h-px w-16 bg-gradient-to-r from-gold-500 to-transparent mb-8" />

                  <p className="text-obsidian-400 text-xs tracking-wide leading-relaxed font-light">
                    Your answer allows our digital atelier to curate a synchronized suit, scent, and accessory pairing tailored to your presence.
                  </p>

                  {/* Back button */}
                  {currentStep > 0 && (
                    <button
                      onClick={handleBack}
                      className="mt-8 flex items-center gap-2 text-obsidian-400 hover:text-gold-300 text-[10px] tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Previous Question
                    </button>
                  )}
                </div>

                {/* Right — Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = answers[currentQuestion.id] === option.value;
                    const isHovered = hoveredOption === option.value;
                    return (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        onClick={() => handleSelectOption(currentQuestion.id, option.value)}
                        onMouseEnter={() => setHoveredOption(option.value)}
                        onMouseLeave={() => setHoveredOption(null)}
                        className={`w-full text-left group relative overflow-hidden transition-all duration-400 cursor-pointer ${
                          isSelected
                            ? "border border-gold-400 bg-gradient-to-r from-gold-600/15 to-gold-400/5"
                            : "border border-obsidian-700/60 hover:border-gold-500/40 bg-obsidian-950/60 hover:bg-obsidian-900/80"
                        }`}
                      >
                        {/* Hover shimmer */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/5 to-gold-500/0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />

                        <div className="relative p-5 flex items-center gap-5">
                          {/* Index number */}
                          <span className={`font-display text-2xl font-bold transition-colors duration-300 shrink-0 ${
                            isSelected ? "text-gold-400" : "text-obsidian-700 group-hover:text-obsidian-500"
                          }`}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>

                          <div className="flex-1">
                            <p className={`text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300 mb-1 ${
                              isSelected ? "text-gold-300" : "text-white"
                            }`}>
                              {option.label}
                            </p>
                            <p className="text-[11px] text-obsidian-400 font-light leading-relaxed">
                              {option.description}
                            </p>
                          </div>

                          <ChevronRight className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isSelected ? "text-gold-400 translate-x-1" :
                            "text-obsidian-600 group-hover:text-gold-500 group-hover:translate-x-1"
                          }`} />
                        </div>

                        {/* Selected bottom accent */}
                        {isSelected && (
                          <motion.div
                            layoutId="selected-accent"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* ── RESULT SCREEN ── */
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              >
                {/* Left — Result info */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span className="text-[9px] tracking-[0.4em] uppercase text-gold-400 font-bold">
                      Your Aureum Curation
                    </span>
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500 mb-2 tracking-wide">
                    {recommendation.title}
                  </h2>

                  <div className="h-px w-20 bg-gradient-to-r from-gold-500 to-transparent mb-6" />

                  <p className="text-obsidian-300 text-sm font-light leading-relaxed italic mb-8 border-l-2 border-gold-500/40 pl-4">
                    "{recommendation.quote}"
                  </p>

                  {/* Curated items */}
                  <div className="space-y-0 mb-8">
                    <p className="text-[9px] tracking-[0.4em] uppercase text-gold-500 mb-4 font-bold">Synchronized Curation</p>
                    {[
                      { label: "Heirloom Piece", value: recommendation.suit },
                      { label: "Signature Scent", value: recommendation.scent },
                      { label: "Curated Accents", value: recommendation.accessories },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start justify-between py-3 border-b border-obsidian-800/60"
                      >
                        <span className="text-[10px] uppercase tracking-widest text-obsidian-500 font-bold">{item.label}</span>
                        <span className="text-xs text-white font-medium text-right max-w-[55%]">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold-500/30 bg-gold-500/5 mb-8">
                    <Crown className="w-3.5 h-3.5 text-gold-400" />
                    <span className="text-[9px] tracking-[0.25em] uppercase text-gold-300 font-bold">{recommendation.badge}</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#gallery"
                      onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                      className="flex-1 py-4 text-center bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-obsidian-950 font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Feather className="w-3.5 h-3.5" />
                      Explore the Atelier
                    </a>
                    <button
                      onClick={handleRestart}
                      className="px-6 py-4 border border-obsidian-700 hover:border-gold-500/40 text-obsidian-300 hover:text-gold-300 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Retake
                    </button>
                  </div>
                </div>

                {/* Right — Result image with overlay */}
                <div className="relative h-[500px] overflow-hidden hidden lg:block">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={recommendation.image}
                    alt={recommendation.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/60 to-transparent" />

                  {/* Floating badge on image */}
                  <div className="absolute top-6 right-6 bg-obsidian-950/80 border border-gold-500/30 backdrop-blur-sm px-4 py-3">
                    <p className="text-[8px] tracking-[0.3em] uppercase text-gold-400 font-bold">Aureum Atelier</p>
                    <p className="text-white text-xs font-medium mt-0.5">Curated For You</p>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-500/60" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-500/60" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar — bottom */}
          {!quizFinished && (
            <div className="mt-16">
              <div className="h-px bg-obsidian-800 w-full relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold-600 to-gold-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress + (100 / QUIZ_QUESTIONS.length)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[9px] text-obsidian-500 tracking-widest uppercase font-mono">
                  Prestige Sartorial Matrix
                </span>
                <span className="text-[9px] text-gold-500 tracking-widest font-mono">
                  {Math.round(progress + (100 / QUIZ_QUESTIONS.length))}% Complete
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
