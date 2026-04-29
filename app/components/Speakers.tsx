"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const speakers = [
  {
    name: "Руслан Бруквенко",
    topic: "Лідер ХКП, підприємець. Засновник логістичної компанії та благодійного фонду.",
    initials: "РБ",
    color: "#A0C8DE",
    image: "/speakers/руслан-бруквенко.jpg",
    imagePosition: "0px 20%",
  },
  {
    name: "Павло Бойко",
    topic: "Член правління ХКП. Державний службовець, служитель церкви, має досвід у публічному управлінні.",
    initials: "ПБ",
    color: "#828B1C",
    image: "/speakers/павло-бойко.jpg",
    imagePosition: "center",
  },
  {
    name: "Сергій Долюк",
    topic: "Член правління ХКП. Підприємець, адвокат, співвласник бізнесів у сфері технологій та енергетики.",
    initials: "СД",
    color: "#A0C8DE",
    image: "/speakers/сергій-долюк.jpg",
    imagePosition: "center",
  },
];

function SpeakerCard({
  speaker,
  index,
  inView,
}: {
  speaker: (typeof speakers)[0];
  index: number;
  inView: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 * index }}
      className="flex flex-col items-start gap-5 rounded-2xl border border-primary/10 bg-primary/5 p-8"
    >
      <div
        className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-2xl text-white flex-shrink-0"
        style={{
          fontFamily: "var(--font-heading)",
          backgroundColor: speaker.color,
        }}
        aria-label={`Фото ${speaker.name}`}
      >
        {!imgError ? (
          <Image
            src={speaker.image}
            alt={speaker.name}
            width={96}
            height={96}
            sizes="96px"
            unoptimized
            style={{ objectFit: "cover", objectPosition: speaker.imagePosition ?? "center", width: "100%", height: "100%" }}
            onError={() => setImgError(true)}
          />
        ) : (
          speaker.initials
        )}
      </div>

      <div className="space-y-2">
        <h3
          className="text-primary text-xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {speaker.name}
        </h3>
        <p
          className="text-primary/60 text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
        >
          {speaker.topic}
        </p>
      </div>
    </motion.div>
  );
}

export default function Speakers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="speakers"
      ref={ref}
      className="px-5 py-16 md:py-24"
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
            Гості
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl md:text-4xl text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Спікери
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.name} speaker={speaker} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
