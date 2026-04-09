"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const placeholders = [
  { bg: "rgba(9,39,80,0.08)", label: "Фото 1" },
  { bg: "rgba(160,200,222,0.25)", label: "Фото 2" },
  { bg: "rgba(9,39,80,0.05)", label: "Фото 3" },
  { bg: "rgba(160,200,222,0.15)", label: "Фото 4" },
  { bg: "rgba(9,39,80,0.10)", label: "Фото 5" },
  { bg: "rgba(160,200,222,0.20)", label: "Фото 6" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="gallery"
      ref={ref}
      className="px-5 py-16 md:py-24"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span
            className="text-accent-olive text-sm uppercase tracking-widest"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Наші моменти
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl md:text-4xl text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Галерея
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {placeholders.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative aspect-square rounded-xl overflow-hidden border border-primary/10 flex items-center justify-center"
              style={{ background: item.bg }}
              aria-label={item.label}
            >
              <div className="flex flex-col items-center gap-2 text-primary/25">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
