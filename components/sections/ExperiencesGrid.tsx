// components/sections/ExperiencesGrid.tsx
"use client";

import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { experiences } from "@/lib/content/experiences";

export function ExperiencesGrid() {
  return (
    <section
      aria-label="All experiences"
      className="relative bg-navy py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <ul
          role="list"
          className="grid gap-6 sm:gap-7 lg:gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="h-full"
            >
              <ExperienceCard experience={exp} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
