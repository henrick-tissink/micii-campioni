"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { Conference } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

type Props = {
  conferences: Conference[];
  className?: string;
};

// =============================================================================
// Component
// =============================================================================

export function ConferenceList({ conferences, className }: Props) {
  const international = conferences.filter((c) => c.isInternational);
  const national = conferences.filter((c) => !c.isInternational);

  if (international.length === 0 && national.length === 0) return null;

  return (
    <motion.div
      className={cn("space-y-12", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {international.length > 0 && (
        <ConferenceGroup
          eyebrow="CONFERINȚE INTERNAȚIONALE"
          conferences={international}
        />
      )}
      {national.length > 0 && (
        <ConferenceGroup
          eyebrow="CONFERINȚE NAȚIONALE"
          conferences={national}
        />
      )}
    </motion.div>
  );
}

// =============================================================================
// Private subcomponent
// =============================================================================

function ConferenceGroup({
  eyebrow,
  conferences,
}: {
  eyebrow: string;
  conferences: Conference[];
}) {
  return (
    <div>
      <h2 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
        {eyebrow}
      </h2>
      <div className="border-t border-sand-200">
        {conferences.map((conf) => (
          <div
            key={`${conf.title}-${conf.year}-${conf.order}`}
            className="grid grid-cols-[80px_1fr] gap-6 items-baseline border-b border-sand-200 py-5 last:border-b-0"
          >
            <span className="font-mono text-sm font-semibold tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
              {conf.year}
            </span>
            <div>
              <h3 className="font-semibold text-sand-900">{conf.title}</h3>
              {conf.location && (
                <p className="mt-0.5 text-sm text-sand-500">{conf.location}</p>
              )}
              {conf.description && (
                <p className="mt-1.5 text-sand-700 leading-relaxed">{conf.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
