"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

export default function HeroClient({ imageSrc }: { imageSrc: string | null }) {
  const [gradientStart, setGradientStart] = useState(60);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const container = img.closest(".absolute") as HTMLElement;
    if (!container) return;

    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight;
    const ratio = img.naturalWidth / img.naturalHeight;
    const renderedH = containerW / ratio;
    const pct = Math.min((renderedH / containerH) * 100, 100);
    setGradientStart(Math.round(pct));
  }, []);

  const gradient = `linear-gradient(to bottom, transparent ${gradientStart - 20}%, #092750 ${gradientStart}%)`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Strip everything except digits and leading +
    const digits = val.replace(/\D/g, "");

    // Normalize to +380XXXXXXXXX
    let normalized = "";
    if (digits.startsWith("380")) {
      normalized = "+" + digits.slice(0, 12);
    } else if (digits.startsWith("80")) {
      normalized = "+3" + digits.slice(0, 11);
    } else if (digits.startsWith("0")) {
      normalized = "+38" + digits.slice(0, 10);
    } else if (digits.length > 0) {
      normalized = "+" + digits.slice(0, 12);
    } else {
      normalized = val.startsWith("+") ? "+" : "";
    }

    setForm((prev) => ({ ...prev, phone: normalized }));
    setPhoneError("");
  };

  const validatePhone = (phone: string) => /^\+380\d{9}$/.test(phone);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(form.phone)) {
      setPhoneError("Введіть коректний номер у форматі +380XXXXXXXXX");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStatus("idle");
    setPhoneError("");
    setForm({ firstName: "", lastName: "", phone: "" });
  };

  return (
    <>
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: "100dvh" }}>
        {/* Full-screen background */}
        <div className="absolute inset-0" aria-hidden="true" style={{ background: "#1a2a3a" }}>
          {imageSrc && (
            <Image
              src={imageSrc}
              alt="Hero background"
              fill
              priority
              onLoad={handleImageLoad}
              style={{ objectFit: "contain", objectPosition: "top" }}
            />
          )}
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: gradient }}
        />

        {/* Content pinned to bottom */}
        <div className="relative z-10 px-5 pb-14 pt-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block border border-accent-blue/40 rounded-full px-4 py-1.5 text-accent-blue text-sm mb-5"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            18 квітня · 12:00
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl leading-tight sm:text-4xl md:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Святкуємо 3 роки<br />
            <span className="text-accent-blue">Християнського Клубу Підприємців</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/75 mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            Час єдності, вдячності та нового бачення
          </motion.p>

          <motion.a
            href="https://maps.google.com/maps?q=проспект+Берестейський+114/2,+Київ"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-7 hover:text-accent-blue transition-colors"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            <svg
              className="w-4 h-4 flex-shrink-0 text-accent-blue"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            Київ, проспект Берестейський 114/2
          </motion.a>

          <motion.button
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="block w-full text-center bg-accent-blue text-primary rounded-full px-8 py-3.5 text-base transition-colors hover:bg-white sm:inline-block sm:w-auto"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Зареєструватись
          </motion.button>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Card */}
            <motion.div
              className="relative w-full max-w-md bg-white rounded-2xl p-7 shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-primary/40 hover:text-primary transition-colors"
                aria-label="Закрити"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {status === "success" ? (
                <div className="text-center py-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(9,39,80,0.08)" }}
                  >
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3
                    className="text-xl text-primary mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Дякуємо!
                  </h3>
                  <p
                    className="text-sm text-primary/60"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    Ваша реєстрація прийнята. До зустрічі 18 квітня!
                  </p>
                </div>
              ) : (
                <>
                  <h3
                    className="text-xl text-primary mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Реєстрація
                  </h3>
                  <p
                    className="text-sm text-primary/50 mb-6"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    18 квітня · 12:00 · Київ
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-xs text-primary/50 mb-1.5 uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                      >
                        Ім&apos;я
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Іван"
                        className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm text-primary placeholder:text-primary/30 outline-none focus:border-accent-blue transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-xs text-primary/50 mb-1.5 uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                      >
                        Прізвище
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Петренко"
                        className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm text-primary placeholder:text-primary/30 outline-none focus:border-accent-blue transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs text-primary/50 mb-1.5 uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                      >
                        Номер телефону
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handlePhoneChange}
                        onBlur={() => {
                          if (form.phone && !validatePhone(form.phone)) {
                            setPhoneError("Введіть коректний номер у форматі +380XXXXXXXXX");
                          }
                        }}
                        placeholder="+380"
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-primary placeholder:text-primary/30 outline-none transition-colors ${phoneError ? "border-red-400 focus:border-red-400" : "border-primary/15 focus:border-accent-blue"}`}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                      {phoneError && (
                        <p className="mt-1.5 text-xs text-red-500" style={{ fontFamily: "var(--font-body)" }}>
                          {phoneError}
                        </p>
                      )}
                    </div>

                    {status === "error" && (
                      <p
                        className="text-xs text-red-500"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Помилка. Спробуйте ще раз.
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-1 w-full bg-primary text-white rounded-full py-3.5 text-sm transition-opacity disabled:opacity-60"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                    >
                      {status === "loading" ? "Надсилаємо…" : "Зареєструватись"}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
