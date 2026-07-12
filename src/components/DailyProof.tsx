import { motion, useReducedMotion } from 'framer-motion';

const GREEN = '#4ade80';
const customEase = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Daily Proof — "receipts, not promises". Sits between Method and    */
/*  Pricing, PROVING the method's "daily updates · Loom · previews"    */
/*  claim with a living Loom mockup.                                   */
/*                                                                     */
/*  System integration:                                                */
/*   · black bg + #4ade80 (site palette, not the green-felt mock)      */
/*   · inlet spine from Method + ⚡ current pulse, outlet to Pricing    */
/*   · ✦ eyebrow + blur-unmask headline (title-on-spine pattern)       */
/*   · pixel-exact diamond markers (rotated squares, not glyphs)       */
/*  Kept from the original design: the three-beat list, the closing    */
/*  manifesto, the Loom mockup with wandering cursor, presenter        */
/*  bubble, progress bar, and the "Day 14 · 4:12" specificity.         */
/* ------------------------------------------------------------------ */

const points = [
  { label: 'The Loom', text: 'A Loom video walking through exactly what we built today.' },
  { label: 'The Preview', text: 'A live preview link, so you can click around and test it yourself.' },
  { label: 'The Check-in', text: 'A short check-in where your feedback shapes tomorrow.' },
];

export const DailyProof = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="proof"
      className="relative isolate overflow-hidden bg-black text-left font-sans text-white select-none"
    >
      {/* inlet spine from Method — self-draws, carries current */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[92px] w-[3.5px] z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-top"
          style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}50` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: customEase }}
        />
        <span aria-hidden className="dp-pulse" />
      </div>

      {/* ambient glow — site-palette, subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 z-0 h-[36rem] w-[36rem] rounded-full blur-[140px]"
        style={{ background: 'rgba(74,222,128,0.07)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 z-0 h-[28rem] w-[28rem] rounded-full blur-[120px]"
        style={{ background: 'rgba(74,222,128,0.04)' }}
      />

      <div className="relative z-10 mx-auto max-w-[976px] px-6 pt-[120px] pb-16 lg:pb-24">
        {/* eyebrow + headline — centered on the spine */}
        <div className="text-center mb-12 relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: customEase }}
            className="mb-4 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] bg-black"
            style={{ borderColor: 'rgba(74,222,128,0.35)', color: GREEN }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: GREEN }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: GREEN }} />
            </span>
            Shipped Daily
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: customEase }}
              className="text-[30px] sm:text-[42px] font-bold tracking-tight uppercase leading-[1.05]"
            >
              Every day you get
              <span className="block" style={{ color: GREEN }}>
                receipts, not promises.
              </span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — the three beats + manifesto */}
          <div className="lg:col-span-6">
            <ul className="space-y-6">
              {points.map((point, idx) => (
                <motion.li
                  key={point.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.12, ease: customEase }}
                  className="group flex items-start gap-4"
                >
                  {/* pixel-exact diamond (rotated square, not a glyph) */}
                  <motion.span
                    initial={{ scale: 0, rotate: -135 }}
                    whileInView={{ scale: 1, rotate: 45 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: 0.25 + idx * 0.12, ease: customEase }}
                    className="mt-[7px] block h-[9px] w-[9px] shrink-0"
                    style={{ background: GREEN, boxShadow: `0 0 8px ${GREEN}80`, borderRadius: 1.5 }}
                  />
                  <div>
                    <span
                      className="block font-mono text-[11px] uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(74,222,128,0.7)' }}
                    >
                      {`0${idx + 1} — ${point.label}`}
                    </span>
                    <span className="mt-1 block text-[17px] sm:text-[19px] font-medium leading-snug text-zinc-100">
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
              transition={{ duration: 0.6, delay: 0.35, ease: customEase }}
              className="mt-12 border-l-2 pl-5"
              style={{ borderColor: 'rgba(74,222,128,0.4)' }}
            >
              <p className="text-[22px] sm:text-[26px] font-extrabold uppercase leading-tight tracking-tight text-white">
                No weekly check-ins.
                <br />
                No silence.
                <br />
                <span style={{ color: GREEN }}>Daily proof of work.</span>
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
              className="group relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0a0a0c] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)] transition-colors duration-500 hover:border-[#4ade80]/40"
            >
              {/* Browser chrome — matches the portfolio's dark chrome */}
              <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-[#121214] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 flex-1 truncate rounded-md bg-black/60 border border-zinc-800/60 px-3 py-1 font-mono text-[11px] text-zinc-500">
                  loom.com/share/day-14-build
                </span>
              </div>

              {/* Video area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#0c1d13] via-[#08130c] to-[#050807]">
                {/* Faux app UI being demoed */}
                <div className="absolute inset-6 rounded-lg border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                  <div className="mb-3 h-2.5 w-24 rounded" style={{ background: 'rgba(74,222,128,0.6)' }} />
                  <div className="mb-2 h-2 w-full rounded bg-white/10" />
                  <div className="mb-2 h-2 w-4/5 rounded bg-white/10" />
                  <div className="mb-4 h-2 w-3/5 rounded bg-white/10" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 rounded bg-white/[0.06]" />
                    <div className="h-10 rounded bg-white/[0.06]" />
                    <div className="h-10 rounded" style={{ background: 'rgba(74,222,128,0.2)' }} />
                  </div>
                </div>

                {/* Loom-style presenter bubble — brand mark, not initials */}
                <div
                  className="absolute bottom-4 left-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 bg-black shadow-lg"
                  style={{ borderColor: 'rgba(74,222,128,0.7)' }}
                >
                  <img
                    src="/landtnoblogo.png"
                    alt=""
                    className="h-10 w-9 object-contain mix-blend-screen"
                  />
                </div>

                {/* Moving cursor — sells "real recording" */}
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
                    className="dp-play flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 p-0 text-white shadow-2xl outline-none backdrop-blur-md cursor-pointer sm:h-20 sm:w-20"
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
                    transition={{ duration: 1.4, delay: 0.4, ease: customEase }}
                    className="h-full"
                    style={{ background: GREEN, boxShadow: `0 0 8px ${GREEN}` }}
                  />
                </div>
              </div>

              <figcaption className="flex items-center justify-between border-t border-zinc-800/80 bg-[#121214] px-4 py-3 font-mono text-[11px] text-zinc-500">
                <span>Day 14 · Dashboard build</span>
                <span style={{ color: GREEN }}>4:12 min</span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>

      {/* outlet spine → Pricing's Y-split */}
      <div className="relative mx-auto w-[3.5px] h-[88px] overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-top"
          style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}50` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
        />
        <span aria-hidden className="dp-pulse" style={{ animationDelay: '3.5s' }} />
      </div>

      {/* component-scoped animation engine (transform-only) */}
      <style>{`
        .dp-pulse {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 24px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #d1ffe3, transparent);
          transform: translateY(-28px);
          animation: dp-pulse-run 3.8s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: 2s;
        }
        @keyframes dp-pulse-run {
          0% { transform: translateY(-28px); opacity: 0; }
          10% { opacity: 1; }
          60%, 100% { transform: translateY(110px); opacity: 1; }
        }
        .dp-play { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s, color 0.3s; }
        .dp-play:hover { transform: scale(1.06); background: ${GREEN}; color: #000; border-color: ${GREEN}; }
        @media (prefers-reduced-motion: reduce) {
          .dp-pulse { animation: none; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
