"use client";

import { motion } from "framer-motion";

const REGISTER_URL =
  "https://eventmate.app/events/share/ricnica-hristianskogo-klubu-pidpriemciv";

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: "100dvh" }}>
      {/* Full-screen background photo placeholder */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: "#1a2a3a" }}
      >
        {/* Replace this div with <Image fill … /> when the real photo is ready */}
        <div className="absolute inset-0 flex items-center justify-center text-white/10">
          <svg
            className="w-24 h-24"
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
      </div>

      {/* Gradient overlay — transparent top → dark blue bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, transparent 30%, rgba(9,39,80,0.7) 60%, #092750 100%)",
        }}
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
          Християнському Клубу Підприємців<br />
          <span className="text-accent-blue">3 роки</span>
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

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-2 text-sm text-white/60 mb-7"
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
        </motion.p>

        <motion.a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="block w-full text-center bg-accent-blue text-primary rounded-full px-8 py-3.5 text-base transition-colors hover:bg-white sm:inline-block sm:w-auto"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          Зареєструватись
        </motion.a>
      </div>
    </section>
  );
}
