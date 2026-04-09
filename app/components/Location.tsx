"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Location() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="location"
      ref={ref}
      className="px-5 py-16 md:py-24"
      style={{ background: "#092750" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span
            className="text-accent-olive text-sm uppercase tracking-widest"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Де нас знайти
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl md:text-4xl text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Локація
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Address card */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-white font-medium"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                >
                  Адреса
                </p>
                <p
                  className="text-white/60 text-sm mt-0.5"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                >
                  Київ, проспект Берестейський 114/2
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-white font-medium"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                >
                  Час
                </p>
                <p
                  className="text-white/60 text-sm mt-0.5"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                >
                  18 квітня 2026, початок о 12:00
                </p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden border border-white/10"
            style={{ height: "240px" }}
          >
            <iframe
              title="Локація події"
              src="https://maps.google.com/maps?q=%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82+%D0%91%D0%B5%D1%80%D0%B5%D1%81%D1%82%D0%B5%D0%B9%D1%81%D1%8C%D0%BA%D0%B8%D0%B9+114%2F2%2C+%D0%9A%D0%B8%D1%97%D0%B2&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(10%) hue-rotate(200deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Custom marker overlay */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{ transform: "translate(-50%, -100%)" }}
              aria-hidden="true"
            >
              <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 0C7.163 0 0 7.163 0 16c0 10.444 14.222 24.978 15.164 25.95a1.143 1.143 0 0 0 1.672 0C17.778 40.978 32 26.444 32 16 32 7.163 24.837 0 16 0Z"
                  fill="#092750"
                />
                <circle cx="16" cy="16" r="6" fill="#A0C8DE" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
