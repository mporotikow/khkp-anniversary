"use client";

import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const placeholders = [
  { bg: "rgba(9,39,80,0.08)", label: "Фото 1" },
  { bg: "rgba(160,200,222,0.25)", label: "Фото 2" },
  { bg: "rgba(9,39,80,0.05)", label: "Фото 3" },
  { bg: "rgba(160,200,222,0.15)", label: "Фото 4" },
  { bg: "rgba(9,39,80,0.10)", label: "Фото 5" },
  { bg: "rgba(160,200,222,0.20)", label: "Фото 6" },
];

// Triple the array for seamless infinite loop
const ITEMS = [...placeholders, ...placeholders, ...placeholders];
const TOTAL = ITEMS.length;
const ORIGIN = placeholders.length; // index where the "real" set starts

export default function Gallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [itemWidth, setItemWidth] = useState(0);
  const [current, setCurrent] = useState(ORIGIN);
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Compute item width from container
  useEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      const containerW = trackRef.current.offsetWidth;
      const gap = 12;
      const cols = window.innerWidth >= 640 ? 2 : 1;
      setItemWidth((containerW - gap * (cols - 1)) / cols + gap);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Snap to index (with or without animation)
  const snapTo = (index: number, animate = true) => {
    if (!itemWidth) return;
    controls.start({
      x: -index * itemWidth,
      transition: animate
        ? { type: "spring", stiffness: 300, damping: 35 }
        : { duration: 0 },
    });
  };

  // Initialise position
  useEffect(() => {
    if (itemWidth) snapTo(current, false);
  }, [itemWidth]);

  const handleDragEnd = (_: never, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = itemWidth * 0.25;
    const swipe = info.offset.x;
    const vel = info.velocity.x;

    let next = current;
    if (swipe < -threshold || vel < -300) next = current + 1;
    else if (swipe > threshold || vel > 300) next = current - 1;

    // Clamp within tripled array
    const clamped = Math.max(0, Math.min(TOTAL - 1, next));
    setCurrent(clamped);
    snapTo(clamped);

    // After animation, silently jump to middle copy if at edges
    setTimeout(() => {
      if (clamped < ORIGIN || clamped >= ORIGIN + placeholders.length * 2) {
        const looped = ORIGIN + ((clamped - ORIGIN) % placeholders.length + placeholders.length) % placeholders.length;
        setCurrent(looped);
        snapTo(looped, false);
      }
    }, 350);
  };

  const visibleDot = ((current - ORIGIN) % placeholders.length + placeholders.length) % placeholders.length;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="px-5 py-16 md:py-24 overflow-hidden"
      style={{ background: "#FFFFFF" }}
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
            Наші моменти
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl md:text-4xl text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Галерея
          </h2>
        </motion.div>
      </div>

      {/* Full-bleed carousel track */}
      <div ref={trackRef} className="max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-3 cursor-grab active:cursor-grabbing select-none"
            style={{ x }}
            animate={controls}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
          >
            {ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 aspect-square rounded-xl overflow-hidden border border-primary/10 flex items-center justify-center pointer-events-none"
                style={{
                  background: item.bg,
                  width: itemWidth ? `${itemWidth - 12}px` : "80vw",
                }}
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
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-5">
          {placeholders.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const next = ORIGIN + i;
                setCurrent(next);
                snapTo(next);
              }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: visibleDot === i ? "24px" : "6px",
                background: visibleDot === i ? "#092750" : "rgba(9,39,80,0.2)",
              }}
              aria-label={`Фото ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
