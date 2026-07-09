import { motion } from 'framer-motion';

const GREEN = '#4ade80'; // ← site palette; change here to switch the whole section

// Ultra-premium cinematic easing curve
const customEase = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Comparison — Lux & Taurus vs. the alternatives.                    */
/*  Motion package (matching the rest of the circuit):                 */
/*   · spine self-draws in + ⚡ current pulse                           */
/*   · header blur-unmask reveal                                       */
/*   · table frame rises; rows cascade in one-by-one                   */
/*   · ✓ marks draw themselves stroke-by-stroke on entrance            */
/*   · the glowing top accent on our column sweeps in like a           */
/*     power rail being energized                                      */
/*   · row hover: whole row lifts its tint; our cell glows brighter    */
/*  Perf: transform/opacity only, once-only entrances.                 */
/* ------------------------------------------------------------------ */

const Check = ({ delay = 0 }: { delay?: number }) => (
  <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="none" stroke={GREEN}>
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M5 13l4 4L19 7"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    />
  </svg>
);

const Cross = ({ delay = 0 }: { delay?: number }) => (
  <svg className="w-5 h-5 text-zinc-600 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    />
  </svg>
);

/* row content is built per-row so icon draw delays follow the cascade */
const comparisonData: {
  feature: string;
  alt: React.ReactNode | ((d: number) => React.ReactNode);
  us: React.ReactNode | ((d: number) => React.ReactNode);
}[] = [
  { feature: 'COST', alt: '$15,000+', us: 'Fixed at $2,500' },
  { feature: 'TIMELINE', alt: '3-6 Months', us: '14 Days' },
  { feature: 'UPDATES', alt: 'Weekly calls', us: 'Daily async' },
  { feature: 'OWN THE CODE', alt: (d: number) => <Cross delay={d} />, us: (d: number) => <Check delay={d} /> },
  { feature: 'GUARANTEE', alt: (d: number) => <Cross delay={d} />, us: (d: number) => <Check delay={d} /> },
  { feature: 'POST-LAUNCH', alt: 'Expensive retainers', us: '30-days included' },
];

export const Comparison = () => {
  return (
    <section id="comparison" className="bg-black relative text-left font-sans select-none overflow-hidden pb-24 lg:pb-32">
      {/* Top Spine — self-draws, then carries current */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[60px] w-[3.5px] z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-top"
          style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}50` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: customEase }}
        />
        <span aria-hidden className="cmp-pulse" />
      </div>

      <div className="max-w-[936px] mx-auto relative px-6 lg:px-0 pt-[100px]">

        {/* Header Region */}
        <div className="text-center mb-12 relative z-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: customEase }}
            className="text-[12px] font-bold tracking-[0.2em] uppercase block mb-3"
            style={{ color: GREEN }}
          >
            ✦ Comparison
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: customEase }}
              className="text-[32px] md:text-[42px] font-bold text-white tracking-tight uppercase leading-none"
            >
              Lux <span style={{ color: GREEN }}>&</span> Taurus vs. The Alternatives
            </motion.h2>
          </div>
        </div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: customEase }}
          className="relative z-20 w-full rounded-2xl border border-zinc-800 bg-[#050506] shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <div>

            {/* Header Row */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-zinc-800">
              <div className="p-3 sm:p-6" /> {/* Empty top-left cell */}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-3 sm:p-6 flex items-center justify-center text-center border-l border-zinc-800/50"
              >
                <span className="text-[10px] sm:text-[12px] font-bold tracking-[0.1em] sm:tracking-[0.15em] text-zinc-400 uppercase leading-snug">
                  Freelancers / Big Agencies
                </span>
              </motion.div>

              <div
                className="p-3 sm:p-6 flex items-center justify-center text-center relative"
                style={{ background: 'rgba(74,222,128,0.06)', borderLeft: `1px solid ${GREEN}4D` }}
              >
                {/* Glowing top accent — energizes left→right like a power rail */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                  style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.55, ease: customEase }}
                />
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6, ease: customEase }}
                  className="text-[11px] sm:text-[13px] font-black tracking-[0.1em] sm:tracking-[0.15em] text-white uppercase flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 leading-snug"
                >
                  Lux <span style={{ color: GREEN }}>&</span> Taurus
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.0, ease: customEase }}
                    className="text-lg leading-none -mt-1 inline-block"
                    style={{ color: GREEN }}
                  >
                    ✦
                  </motion.span>
                </motion.span>
              </div>
            </div>

            {/* Data Rows — cascade in one-by-one */}
            <div className="flex flex-col">
              {comparisonData.map((row, idx) => {
                const rowDelay = 0.6 + idx * 0.09;
                return (
                  <motion.div
                    key={row.feature}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: rowDelay, ease: customEase }}
                    className={`cmp-row grid grid-cols-[1.2fr_1fr_1fr] ${
                      idx !== comparisonData.length - 1 ? 'border-b border-zinc-800/50' : ''
                    }`}
                  >
                    {/* Feature Name */}
                    <div className="min-w-0 p-3 sm:p-5 md:p-6 flex items-center">
                      <span className="text-[10px] sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.15em] text-white uppercase leading-snug break-words">
                        {row.feature}
                      </span>
                    </div>

                    {/* Alternatives Column */}
                    <div className="min-w-0 p-3 sm:p-5 md:p-6 flex items-center justify-center text-center border-l border-zinc-800/50">
                      <span className="text-[12px] sm:text-[15px] font-medium text-zinc-400 leading-snug break-words">
                        {typeof row.alt === 'function' ? row.alt(rowDelay + 0.25) : row.alt}
                      </span>
                    </div>

                    {/* Lux & Taurus Column */}
                    <div
                      className="cmp-us min-w-0 p-3 sm:p-5 md:p-6 flex items-center justify-center text-center relative"
                      style={{ background: 'rgba(74,222,128,0.03)', borderLeft: `1px solid ${GREEN}4D` }}
                    >
                      <span className={`text-[13px] sm:text-[16px] font-bold leading-snug break-words ${typeof row.us === 'string' ? 'text-white' : ''}`}>
                        {typeof row.us === 'function' ? row.us(rowDelay + 0.25) : row.us}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </motion.div>

      </div>

      {/* Bottom outlet spine — fills the section's padding gap so the
          center spine runs unbroken into the FAQ below */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[96px] lg:h-[128px] w-[3.5px] z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-top"
          style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}50` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: customEase }}
        />
        <span aria-hidden className="cmp-pulse-out" />
      </div>

      {/* component-scoped animation engine (transform-only) */}
      <style>{`
        /* ⚡ spine current pulse */
        .cmp-pulse {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 24px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #d1ffe3, transparent);
          transform: translateY(-28px);
          animation: cmp-pulse-run 3.8s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: 2.4s;
        }
        @keyframes cmp-pulse-run {
          0% { transform: translateY(-28px); opacity: 0; }
          10% { opacity: 1; }
          60%, 100% { transform: translateY(70px); opacity: 1; }
        }

        /* outlet current — hands off into the FAQ spine below */
        .cmp-pulse-out {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 24px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #d1ffe3, transparent);
          transform: translateY(-28px);
          animation: cmp-pulse-out-run 3.8s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: 3.4s;
        }
        @keyframes cmp-pulse-out-run {
          0% { transform: translateY(-28px); opacity: 0; }
          10% { opacity: 1; }
          60%, 100% { transform: translateY(140px); opacity: 1; }
        }

        /* row hover — tint row, intensify our cell (paint-cheap, tiny areas) */
        .cmp-row { transition: background-color 0.3s ease; }
        .cmp-row:hover { background: rgba(255,255,255,0.02); }
        .cmp-us { transition: background-color 0.3s ease, box-shadow 0.3s ease; }
        .cmp-row:hover .cmp-us {
          background: rgba(74,222,128,0.07) !important;
          box-shadow: inset 0 0 24px rgba(74,222,128,0.06);
        }

        @media (prefers-reduced-motion: reduce) {
          .cmp-pulse, .cmp-pulse-out { animation: none; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
