"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "3", label: "роки спільноти" },
  { value: "100+", label: "людей пройшли курси" },
  { value: "1x", label: "зустріч на місяць" },
];

export default function Club() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="club"
      ref={ref}
      className="px-5 py-16 md:py-24"
      style={{ background: "#071e3d" }}
    >
      <div className="max-w-4xl mx-auto">
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
            Хто ми
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl md:text-4xl text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Про ХКП
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <p
              className="text-white/80 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              Християнський Клуб Підприємців — це спільнота людей, які будують
              бізнес на фундаменті{" "}
              <span className="text-accent-blue font-medium">
                християнських цінностей
              </span>
              : чесності, відповідальності та служіння.
            </p>
            <p
              className="text-white/80 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              Раз на місяць ми зустрічаємося, щоб навчатися, надихатися та
              підтримувати одне одного на підприємницькому шляху. За три роки
              через наші курси та зустрічі пройшли{" "}
              <span className="text-accent-blue font-medium">
                понад 100 учасників
              </span>
              .
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="rounded-2xl border border-accent-blue/20 bg-accent-blue/5 p-4 text-center"
              >
                <p
                  className="text-3xl text-accent-blue"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-1 text-xs text-white/50 leading-tight text-center"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
