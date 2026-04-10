"use client";

import Image from "next/image";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const PLACEHOLDER_BG = [
  "rgba(9,39,80,0.08)",
  "rgba(160,200,222,0.25)",
  "rgba(9,39,80,0.05)",
  "rgba(160,200,222,0.15)",
  "rgba(9,39,80,0.10)",
  "rgba(160,200,222,0.20)",
];

export default function GalleryCarousel({ images }: { images: string[] }) {
  const hasImages = images.length > 0;
  const items = hasImages
    ? images
    : PLACEHOLDER_BG.map((_, i) => `__placeholder_${i}`);

  const N = items.length;
  const OFFSET = N;
  const ITEMS = [...items, ...items, ...items];

  const sectionRef = useRef(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-120px" });

  const x         = useMotionValue(0);
  const slideWRef = useRef(0);
  const indexRef  = useRef(OFFSET);
  const [dot, setDot] = useState(0);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    slideWRef.current = trackRef.current.offsetWidth + 12;
    x.jump(-indexRef.current * slideWRef.current);
  }, [x]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const snapTo = useCallback((i: number, instant = false) => {
    const sw = slideWRef.current;
    if (!sw) return;
    indexRef.current = i;
    setDot(((i - OFFSET) % N + N) % N);

    if (instant) {
      x.jump(-i * sw);
    } else {
      animate(x, -i * sw, {
        type: "spring",
        stiffness: 320,
        damping: 36,
        mass: 0.8,
        onComplete: () => {
          const norm = OFFSET + ((i - OFFSET) % N + N) % N;
          if (norm !== i) {
            indexRef.current = norm;
            setDot(((norm - OFFSET) % N + N) % N);
            x.jump(-norm * sw);
          }
        },
      });
    }
  }, [x, N, OFFSET]);

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const { offset, velocity } = info;
    if (offset.x < -40 || velocity.x < -150) {
      snapTo(indexRef.current + 1);
    } else if (offset.x > 40 || velocity.x > 150) {
      snapTo(indexRef.current - 1);
    } else {
      snapTo(indexRef.current);
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-16 md:py-24 overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="px-5 max-w-4xl mx-auto">
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

      <div ref={trackRef} className="px-5 max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-xl">
          <motion.div
            className="flex gap-3 cursor-grab active:cursor-grabbing select-none will-change-transform"
            style={{ x, touchAction: "none" }}
            drag="x"
            dragConstraints={{ left: -99999, right: 99999 }}
            dragElastic={0}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
          >
            {ITEMS.map((src, i) => {
              const isPlaceholder = src.startsWith("__placeholder_");
              const bgIndex = i % PLACEHOLDER_BG.length;

              return (
                <div
                  key={i}
                  className="flex-shrink-0 aspect-square rounded-xl overflow-hidden border border-primary/10 relative"
                  style={{
                    background: isPlaceholder ? PLACEHOLDER_BG[bgIndex] : "#f0f0f0",
                    width: `calc(100% + 0px)`,
                    minWidth: slideWRef.current ? `${slideWRef.current - 12}px` : "calc(100vw - 40px)",
                    maxWidth: slideWRef.current ? `${slideWRef.current - 12}px` : "calc(100vw - 40px)",
                  }}
                >
                  {isPlaceholder ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-primary/25 pointer-events-none">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                      <span className="text-xs" style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}>
                        Фото {(bgIndex % N) + 1}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={src}
                      alt={`Галерея ${(i % N) + 1}`}
                      fill
                      unoptimized
                      priority={i === OFFSET}
                      style={{ objectFit: "cover", objectPosition: "bottom" }}
                      draggable={false}
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => snapTo(OFFSET + i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: dot === i ? "24px" : "6px",
                background: dot === i ? "#092750" : "rgba(9,39,80,0.2)",
              }}
              aria-label={`Фото ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
