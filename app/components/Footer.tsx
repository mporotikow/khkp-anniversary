"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const REGISTER_URL =
  "https://eventmate.app/events/share/ricnica-hristianskogo-klubu-pidpriemciv";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <footer
      id="register"
      ref={ref}
      className="px-5 py-16 md:py-24 border-t border-white/10"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="text-accent-olive text-sm uppercase tracking-widest"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Приєднуйтесь
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl md:text-5xl leading-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ставайте частиною спільноти підприємців, які розвиваються та впливають
          </h2>
          <p
            className="mt-6 text-white/60 text-base max-w-sm"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            <span className="text-accent-blue">23 травня · 12:00</span><br />Київ, проспект Берестейський 114/2
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="block w-full text-center bg-accent-blue text-primary rounded-full px-10 py-4 text-base transition-colors hover:bg-white sm:inline-block sm:w-auto"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Зареєструватись зараз
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex justify-center gap-7 pt-2"
        >
          <a
            href="https://www.instagram.com/hkp_spasinnya?igsh=ZGhnb2Y5bWRuNGY5&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/40 hover:text-white transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4.5"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a
            href="https://youtube.com/@hkp_spasinnya?si=8BBpTTDYI5BO-A5M"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-white/40 hover:text-white transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@hkp_spasinnya?_r=1&_t=ZS-95VPzKNTspQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-white/40 hover:text-white transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
            </svg>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-white/30 text-xs pt-4"
          style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
        >
          © 2026 Християнський Клуб Підприємців
        </motion.p>
      </div>
    </footer>
  );
}
