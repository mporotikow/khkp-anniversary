"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const REGISTER_URL =
  "https://eventmate.app/events/share/ricnica-hristianskogo-klubu-pidpriemciv";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-320px" });

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
          className="text-left"
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
            Зустрінемося<br />
            <span className="text-accent-blue">18 квітня</span>
          </h2>
          <p
            className="mt-6 text-white/60 text-base max-w-sm"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            Київ, проспект Берестейський 114/2<br />початок о 12:00
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-white/30 text-xs pt-8"
          style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
        >
          © 2026 Християнський Клуб Підприємців
        </motion.p>
      </div>
    </footer>
  );
}
