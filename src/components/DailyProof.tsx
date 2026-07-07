import { motion, useReducedMotion } from 'framer-motion';

const points = [
  {
    label: 'The Loom',
    text: 'A Loom video walking through exactly what we built today.',
  },
  {
    label: 'The Preview',
    text: 'A live preview link, so you can click around and test it yourself.',
  },
  {
    label: 'The Check-in',
    text: 'A short check-in where your feedback shapes tomorrow.',
  },
];

export const DailyProof = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="proof"
      className="relative isolate overflow-hidden bg-[#0b3824] text-left font-body text-white selection:bg-emerald-400 selection:text-[#0b3824]"
    >
      {/* Connecting trunk — the spine that threads through the whole page */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-0 z-0 h-full w-px bg-gradient-to-b from-emerald-400/0 via-emerald-400/50 to-emerald-400/0 sm:left-12 lg:left-1/2"
      />

      {/* Ambient grain + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 z-0 h-[36rem] w-[36rem] rounded-full bg-emerald-500/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 z-0 h-[28rem] w-[28rem] rounded-full bg-teal-400/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 sm:px-12 sm:py-32 lg:grid-cols-12 lg:gap-16">
        {/* LEFT — copy */}
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Shipped daily
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl"
          >
            Every day you get
            <span className="block text-emerald-300">receipts, not promises.</span>
          </motion.h2>

          <ul className="mt-10 space-y-6">
            {points.map((point, idx) => (
              <motion.li
                key={point.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.12 }}
                className="group flex items-start gap-4"
              >
                <span className="relative mt-1.5 shrink-0">
                  <motion.span
                    animate={reduce ? undefined : { rotate: [0, 90, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: idx * 0.8, ease: 'easeInOut' }}
                    className="block text-emerald-400 transition-colors group-hover:text-white"
                  >
                    ◆
                  </motion.span>
                </span>
                <div>
                  <span className="block font-mono text-xs uppercase tracking-[0.2em] text-emerald-300/70">
                    {`0${idx + 1} — ${point.label}`}
                  </span>
                  <span className="mt-1 block text-lg font-medium leading-snug text-white/90 sm:text-xl">
                    {point.text}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 border-l-2 border-emerald-400/40 pl-5"
          >
            <p className="font-display text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
              No weekly check-ins.
              <br />
              No silence.
              <br />
              <span className="text-emerald-300">Daily proof of work.</span>
            </p>
          </motion.div>
        </div>

        {/* RIGHT — Loom mockup */}
        <div className="lg:col-span-6 lg:flex lg:justify-end">
          <motion.figure
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 22 }}
            whileHover={reduce ? undefined : { y: -6, rotateX: 3, rotateY: -3 }}
            style={{ transformPerspective: 1000 }}
            className="group relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[#16161c] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.7)]"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-[#1e1e24] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 truncate rounded-md bg-black/40 px-3 py-1 font-mono text-[11px] text-white/40">
                loom.com/share/day-14-build
              </span>
            </div>

            {/* Video area */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#123c2a] via-[#0f2f22] to-[#0a1f18]">
              {/* Faux app UI being demoed */}
              <div className="absolute inset-6 rounded-lg border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="mb-3 h-2.5 w-24 rounded bg-emerald-400/60" />
                <div className="mb-2 h-2 w-full rounded bg-white/10" />
                <div className="mb-2 h-2 w-4/5 rounded bg-white/10" />
                <div className="mb-4 h-2 w-3/5 rounded bg-white/10" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-10 rounded bg-white/[0.06]" />
                  <div className="h-10 rounded bg-white/[0.06]" />
                  <div className="h-10 rounded bg-emerald-400/20" />
                </div>
              </div>

              {/* Loom-style presenter bubble */}
              <div className="absolute bottom-4 left-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-400/70 bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg">
                <span className="font-display text-lg font-black">JS</span>
              </div>

              {/* Moving cursor */}
              {!reduce && (
                <motion.div
                  aria-hidden
                  animate={{ x: [40, 220, 130, 40], y: [180, 90, 200, 180] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 top-0 z-20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="drop-shadow">
                    <path d="M4 2l16 8-7 2-2 7L4 2z" />
                  </svg>
                </motion.div>
              )}

              {/* Play button */}
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <button
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 p-0 text-white shadow-2xl outline-none backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#0b3824] sm:h-20 sm:w-20"
                  aria-label="Play today's Loom"
                >
                  <svg className="h-7 w-7 translate-x-0.5 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '38%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.4 }}
                  className="h-full bg-emerald-400"
                />
              </div>
            </div>

            <figcaption className="flex items-center justify-between border-t border-white/5 bg-[#1e1e24] px-4 py-3 font-mono text-[11px] text-white/40">
              <span>Day 14 · Dashboard build</span>
              <span className="text-emerald-300">4:12 min</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
};
