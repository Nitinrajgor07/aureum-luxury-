import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Eye, EyeOff, Loader2, Crown, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Tab change hone pe form reset
  useEffect(() => {
    setError("");
    setSuccess("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  }, [tab]);

  // Modal open hone pe default tab set karo
  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen, defaultTab]);

  // ESC se close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Email aur password dono required hain"); return; }
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      setSuccess("Khush aamdeed! Login ho gaye.");
      setTimeout(() => onClose(), 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Saare fields fill karo"); return; }
    if (password.length < 6) { setError("Password kam se kam 6 characters ka hona chahiye"); return; }
    if (password !== confirmPassword) { setError("Dono passwords match nahi kar rahe"); return; }
    setError("");
    setIsSubmitting(true);
    try {
      await signup(name, email, password);
      setSuccess("Account ban gaya! Welcome to Aureum.");
      setTimeout(() => onClose(), 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-obsidian-900 border border-obsidian-700 text-white placeholder-obsidian-500 " +
    "rounded-sm px-4 py-3 pl-11 text-sm font-light tracking-wide " +
    "focus:outline-none focus:border-gold-500/60 focus:bg-obsidian-850 transition-all duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            className="relative z-10 w-full max-w-md mx-4"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative top gold line */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-px" />

            <div className="bg-obsidian-950 border border-obsidian-800 shadow-2xl shadow-black/60">
              {/* Header */}
              <div className="relative px-8 pt-8 pb-6 text-center border-b border-obsidian-800">
                <button
                  onClick={onClose}
                  className="absolute right-5 top-5 text-obsidian-500 hover:text-gold-400 transition-colors p-1 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Crown icon */}
                <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-5 h-5 text-gold-400" />
                </div>

                <h2 className="font-display text-xl tracking-[0.2em] uppercase text-white mb-1">
                  Aureum
                </h2>
                <p className="text-obsidian-400 text-xs tracking-widest uppercase">
                  {tab === "login" ? "Welcome Back" : "Create Account"}
                </p>
              </div>

              {/* Tab switcher */}
              <div className="flex border-b border-obsidian-800">
                {(["login", "signup"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer ${
                      tab === t
                        ? "text-gold-400 border-b-2 border-gold-500 -mb-px bg-obsidian-900/40"
                        : "text-obsidian-400 hover:text-obsidian-200"
                    }`}
                  >
                    {t === "login" ? "Sign In" : "Register"}
                  </button>
                ))}
              </div>

              {/* Form body */}
              <div className="px-8 py-7">
                {/* Error / success messages */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 px-4 py-2.5 bg-red-950/60 border border-red-800/50 text-red-400 text-xs tracking-wide rounded-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                  {success && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 px-4 py-2.5 bg-green-950/60 border border-green-800/50 text-green-400 text-xs tracking-wide rounded-sm"
                    >
                      {success}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {tab === "login" ? (
                    <motion.form
                      key="login"
                      onSubmit={handleLogin}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Email */}
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" />
                        <input
                          ref={firstInputRef}
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputClass}
                          autoComplete="email"
                          required
                        />
                      </div>

                      {/* Password */}
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`${inputClass} pr-11`}
                          autoComplete="current-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-obsidian-500 hover:text-gold-400 transition-colors cursor-pointer"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 bg-gold-500 hover:bg-gold-400 disabled:bg-obsidian-700 disabled:cursor-not-allowed
                          text-obsidian-950 disabled:text-obsidian-500 font-medium text-xs tracking-[0.2em] uppercase
                          py-3.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                        ) : (
                          "Enter the Atelier"
                        )}
                      </button>

                      <p className="text-center text-obsidian-500 text-xs pt-1">
                        Account nahi hai?{" "}
                        <button type="button" onClick={() => setTab("signup")} className="text-gold-400 hover:text-gold-300 cursor-pointer underline underline-offset-2">
                          Register karein
                        </button>
                      </p>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="signup"
                      onSubmit={handleSignup}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" />
                        <input
                          ref={firstInputRef}
                          type="text"
                          placeholder="Full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputClass}
                          autoComplete="name"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" />
                        <input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputClass}
                          autoComplete="email"
                          required
                        />
                      </div>

                      {/* Password */}
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password (min 6 characters)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`${inputClass} pr-11`}
                          autoComplete="new-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-obsidian-500 hover:text-gold-400 transition-colors cursor-pointer"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Confirm password */}
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" />
                        <input
                          type={showConfirm ? "text" : "password"}
                          placeholder="Confirm password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`${inputClass} pr-11`}
                          autoComplete="new-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((p) => !p)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-obsidian-500 hover:text-gold-400 transition-colors cursor-pointer"
                          tabIndex={-1}
                        >
                          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 bg-gold-500 hover:bg-gold-400 disabled:bg-obsidian-700 disabled:cursor-not-allowed
                          text-obsidian-950 disabled:text-obsidian-500 font-medium text-xs tracking-[0.2em] uppercase
                          py-3.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</>
                        ) : (
                          "Join the Aureum Circle"
                        )}
                      </button>

                      <p className="text-center text-obsidian-500 text-xs pt-1">
                        Pehle se account hai?{" "}
                        <button type="button" onClick={() => setTab("login")} className="text-gold-400 hover:text-gold-300 cursor-pointer underline underline-offset-2">
                          Sign in karein
                        </button>
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-8 pb-6 text-center">
                <p className="text-obsidian-600 text-[10px] tracking-wider uppercase">
                  Your data is secure · Privacy Protected
                </p>
              </div>
            </div>

            {/* Decorative bottom gold line */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mt-px" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
