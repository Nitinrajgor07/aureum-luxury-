import { useState, FormEvent } from "react";
import { Calendar, Clock, MapPin, Check, Sparkles, Send, Bell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ATELIERS } from "../data";

export default function ConciergeBooking() {
  const [selectedAtelier, setSelectedAtelier] = useState(ATELIERS[0].id);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [appointmentCode, setAppointmentCode] = useState("");

  const timeSlots = ["10:30 AM", "01:00 PM", "03:30 PM", "06:00 PM (Private Club Session)"];

  const currentAtelier = ATELIERS.find((a) => a.id === selectedAtelier) || ATELIERS[0];

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!date || !timeSlot || !name || !email || !phone) {
      alert("Please fill in all requested fields to finalize appointment security.");
      return;
    }

    // Generate a beautiful mock booking code
    const generatedCode = `AUR-${Math.floor(1000 + Math.random() * 9000)}-${currentAtelier.city.split(" ")[0].toUpperCase()}`;
    setAppointmentCode(generatedCode);
    setBookingConfirmed(true);
  };

  const handleResetBooking = () => {
    setDate("");
    setTimeSlot("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setBookingConfirmed(false);
  };

  return (
    <section id="booking" className="py-24 bg-obsidian-950 border-t border-gold-500/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold-400 font-bold block mb-3">
            Section IV • Bespoke Consultations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-none mb-4">
            Reserve An <span className="font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">Atelier Suite</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-gold-500 to-transparent mb-5 mx-auto" />
          <p className="text-obsidian-300 text-xs sm:text-sm tracking-wide font-light leading-relaxed">
            Reserve a private multi-hour consultation suite at our global ateliers for custom measurements, 
            personalized visual style consulting, or private viewing of our Swiss complications.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Atelier details cards */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[10px] font-extrabold tracking-widest uppercase text-gold-400">
              Select Luxury Location:
            </p>

            <div className="space-y-4">
              {ATELIERS.map((loc) => {
                const isActive = selectedAtelier === loc.id;
                return (
                  <button
                    id={`booking-atelier-btn-${loc.id}`}
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      if (!bookingConfirmed) setSelectedAtelier(loc.id);
                    }}
                    className={`w-full text-left p-5 rounded-sm border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-obsidian-900 border-gold-400 shadow-lg shadow-gold-500/5"
                        : "bg-obsidian-900/40 border-gold-500/5 hover:border-gold-500/20"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? "text-gold-400" : "text-obsidian-400"}`} />
                      <div>
                        <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                          {loc.city}
                        </h4>
                        <p className="text-[10px] text-obsidian-300 mt-1.5 leading-relaxed font-light">
                          {loc.description}
                        </p>
                        <p className="text-[9px] text-gold-300/80 mt-2 font-mono">
                          {loc.address}
                        </p>
                        <p className="text-[9px] text-obsidian-400 mt-1 font-mono">
                          T: {loc.phone}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form / Confirmation space */}
          <div className="lg:col-span-7 bg-obsidian-900/50 border border-gold-500/10 p-6 md:p-8 rounded-sm shadow-xl shadow-black/30">
            <AnimatePresence mode="wait">
              {!bookingConfirmed ? (
                // Booking Form
                <motion.form
                  id="booking-form"
                  key="booking-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmitBooking}
                  className="space-y-6"
                >
                  <div className="border-b border-gold-500/10 pb-4 mb-4">
                    <h3 className="font-display text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">
                      Private Appointment Registry
                    </h3>
                    <p className="text-[10px] text-obsidian-400 uppercase mt-1 tracking-wider font-mono">
                      Location: {currentAtelier.city}
                    </p>
                  </div>

                  {/* Date and Time selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gold-300 mb-2">
                        Preferred Date:
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400 pointers-none" />
                        <input
                          id="booking-date"
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-10 py-3 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gold-300 mb-2">
                        Preferred Hours:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => {
                          const isSlSelected = timeSlot === slot;
                          return (
                            <button
                              id={`booking-slot-btn-${slot}`}
                              key={slot}
                              type="button"
                              onClick={() => setTimeSlot(slot)}
                              className={`py-2 px-1 text-[9px] font-bold uppercase tracking-widest text-center border rounded transition-all cursor-pointer ${
                                isSlSelected
                                  ? "bg-gradient-to-r from-gold-600 to-gold-500 text-obsidian-950 font-extrabold border-gold-300"
                                  : "bg-black text-obsidian-300 hover:text-white border-gold-500/10 hover:border-gold-500/35"
                              }`}
                            >
                              {slot.split(" ")[0]} {slot.split(" ")[1] || ""}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Personal details */}
                  <div className="space-y-4 pt-4 border-t border-gold-500/5">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gold-400">
                      Client Sovereign Credentials
                    </p>

                    <div>
                      <input
                        id="booking-client-name"
                        type="text"
                        required
                        placeholder="Full Sovereign Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-4 py-3 text-xs text-white placeholder-obsidian-400 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        id="booking-client-email"
                        type="email"
                        required
                        placeholder="Private Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-4 py-3 text-xs text-white placeholder-obsidian-400 outline-none"
                      />
                      <input
                        id="booking-client-phone"
                        type="tel"
                        required
                        placeholder="Encrypted Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-4 py-3 text-xs text-white placeholder-obsidian-400 outline-none"
                      />
                    </div>

                    <div>
                      <textarea
                        id="booking-client-notes"
                        placeholder="Sartorial instructions or special specifications (optional)..."
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-black border border-gold-500/15 focus:border-gold-400 rounded px-4 py-3 text-xs text-white placeholder-obsidian-400 outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Button Submission */}
                  <div>
                    <button
                      id="booking-submit-btn"
                      type="submit"
                      disabled={!date || !timeSlot || !name || !email || !phone}
                      className="w-full py-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 disabled:from-obsidian-750 disabled:to-obsidian-800 text-obsidian-950 px-8 disabled:text-obsidian-400 font-extrabold text-[11px] uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold-500/5 disabled:pointer-events-none"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Bespoke Fitting Request</span>
                    </button>
                    <p className="text-[8px] text-center text-obsidian-400 mt-3 uppercase tracking-wider font-mono">
                      Our concierge desk will respond to confirm within 2 hours.
                    </p>
                  </div>
                </motion.form>
              ) : (
                // Booking Confirmation Card
                <motion.div
                  id="booking-success-container"
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 md:p-6 text-center space-y-6"
                >
                  <div className="w-14 h-14 bg-gold-500/10 border border-gold-405 rounded-full flex items-center justify-center text-gold-400 mx-auto">
                    <Check className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold uppercase text-white tracking-widest">
                      Bespoke Allocation Reserved
                    </h3>
                    <p className="text-[10px] text-gold-300 uppercase tracking-widest font-mono">
                      Security Code: {appointmentCode}
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent my-4" />

                  <div className="px-5 py-4 bg-black/50 border border-gold-500/10 rounded-sm text-left max-w-md mx-auto space-y-3">
                    <div className="flex justify-between border-b border-gold-500/5 pb-1 text-[10px]">
                      <span className="text-obsidian-400 font-semibold uppercase">Boutique:</span>
                      <span className="text-white font-bold">{currentAtelier.city}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-500/5 pb-1 text-[10px]">
                      <span className="text-obsidian-400 font-semibold uppercase">Schedule:</span>
                      <span className="text-white font-bold">{date} at {timeSlot}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold-500/5 pb-1 text-[10px]">
                      <span className="text-obsidian-400 font-semibold uppercase">Client:</span>
                      <span className="text-white font-bold">{name}</span>
                    </div>
                    {notes && (
                      <div className="text-[9px] pt-1 leading-relaxed">
                        <span className="text-obsidian-400 font-semibold uppercase block mb-1">Tailor Instructions:</span>
                        <p className="text-obsidian-300 italic font-mono bg-black p-2 border border-white/5 rounded-sm">&ldquo;{notes}&rdquo;</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      id="booking-success-another"
                      onClick={handleResetBooking}
                      className="px-6 py-2.5 bg-obsidian-900 hover:bg-obsidian-800 border border-gold-500/20 text-gold-300 hover:text-white rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Reschedule / Book Another
                    </button>
                    <button
                      id="booking-print-stub"
                      onClick={() => alert(`Sartorial Appointment Stub ${appointmentCode} Saved`)}
                      className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian-950 font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all hover:bg-gold-500 cursor-pointer"
                    >
                      Download Stub (PDF)
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
