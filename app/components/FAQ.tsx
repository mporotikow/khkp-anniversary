"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "Хто може прийти?",
    a: "Будь-хто, хто цікавиться підприємництвом, лідерством або просто хоче познайомитися з натхненними людьми. Вхід відкритий для всіх — незалежно від досвіду чи сфери діяльності.",
  },
  {
    q: "Чи обов'язкова реєстрація?",
    a: "Так, для зручності організації та бронювання місця просимо зареєструватися заздалегідь. Реєстрація безкоштовна.",
  },
  {
    q: "Скільки триває подія?",
    a: "Захід розрахований приблизно на 3–4 години. Буде час для виступів, живого спілкування та нетворкінгу.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="text-white text-base"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-accent-blue"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-white/60 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-320px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      ref={ref}
      className="px-5 py-16 md:py-24 max-w-2xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-6"
      >
        <span
          className="text-accent-olive text-sm uppercase tracking-widest"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          Запитання
        </span>
        <h2
          className="mt-3 text-2xl sm:text-3xl md:text-4xl text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          FAQ
        </h2>
      </motion.div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-6">
        {faqs.map((faq, i) => (
          <FAQItem
            key={faq.q}
            faq={faq}
            index={i}
            isOpen={activeIndex === i}
            onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
