import { motion } from 'framer-motion';
import { ScaleFrame } from './ScaleFrame';

const GREEN = '#4ade80'; // ← site palette; change here to switch the whole section

// Ultra-premium cinematic easing curve
const customEase = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Diamond node — a rotated square div instead of the ◆ text glyph.   */
/*  Why: glyph centering depends on font metrics/line-height, so it    */
/*  never sits exactly on the branch line. A div is exact geometry:    */
/*  branch line center-y = 19 + 2.5/2 = 20.25px → diamond (9px) top    */
/*  = 20.25 - 4.5 = 15.75px. Horizontally the line ends at x = 41px    */
/*  (left 7 + width 34); the rotated corner reaches 6.4px past the     */
/*  div's center, so left = 41 - 4.5 + 4 ≈ 40.5px tucks the corner     */
/*  onto the line end with a 2px visual overlap. Mirrored for right.   */
/*  rotate goes through framer (-135° → 45°) so the entrance spin      */
/*  lands exactly on the 45° diamond pose without CSS conflicts.       */
/* ------------------------------------------------------------------ */
const Diamond = ({ side }: { side: 'left' | 'right' }) => (
  <motion.span
    initial={{ scale: 0, rotate: side === 'left' ? -135 : 225 }}
    whileInView={{ scale: 1, rotate: 45 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 1, ease: customEase }}
    className="absolute w-[9px] h-[9px] z-20"
    style={{
      top: 15.75,
      ...(side === 'left' ? { left: 40.5 } : { right: 40.5 }),
      background: GREEN,
      boxShadow: `0 0 8px ${GREEN}80`,
      borderRadius: 1.5,
    }}
  />
);

export const MethodBlock = () => {
  const steps = [
    { id: '01', t: 'LISTEN', d: '30-min call. We scope.\nStart in 48 hours.' },
    { id: '02', t: 'CREATE', d: 'Daily updates. Loom. Live\npreviews. Real progress.' },
    { id: '03', t: 'RELEASE', d: 'Product live. You own it.\n30 days support.' },
  ];

  return (
    <section id="process" className="pt-24 pb-0 bg-black relative text-center overflow-hidden font-sans select-none flex flex-col items-center">

      {/* 🟢 TOP CONDUIT SPINE SEGMENT */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: customEase }}
        className="absolute left-1/2 -translate-x-1/2 top-0 h-[88px] w-[3.5px] z-0 origin-top"
        style={{ background: GREEN, boxShadow: `0 0 12px ${GREEN}50` }}
      />

      <div className="max-w-[976px] mx-auto relative z-20 px-6 flex flex-col items-center w-full">

        {/* --- TITLE PLATFORM CORE --- */}
        <div className="relative inline-block mt-4 mb-8 overflow-hidden">
          <motion.h2
            initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: customEase }}
            className="text-[26px] sm:text-[30px] font-bold tracking-[0.18em] text-white uppercase leading-none"
          >
            THE METHOD
          </motion.h2>
        </div>

        {/* --- ALTERNATING PIPELINE MATRIX GRID (same structure on all devices) --- */}
        <ScaleFrame designWidth={768} className="w-full">
        <div className="flex flex-col relative w-full space-y-16 pt-8 pb-32">

          {/* ========================================== */}
          {/* STEP 01: LISTEN (Right Side)               */}
          {/* ========================================== */}
          <div className="grid grid-cols-2 w-full min-h-[120px] items-start relative group cursor-default">

            {/* SEGMENTED SPINE RIG */}
            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: customEase }} className="absolute left-1/2 -translate-x-1/2 top-[-38px] h-[52px] w-[3.5px] z-10 origin-top" style={{ background: GREEN }} />

            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease: customEase }} className="absolute left-1/2 -translate-x-1/2 top-[14px] w-[14px] h-[14px] rounded-full z-30" style={{ background: GREEN, boxShadow: `0 0 12px ${GREEN}80` }} />

            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.6, ease: customEase }} className="absolute left-1/2 -translate-x-1/2 top-[28px] bottom-[-80px] w-[3.5px] z-10 origin-top" style={{ background: GREEN }} />

            <div className="text-right pr-12 opacity-0 pointer-events-none select-none">Spacer</div>

            <div className="flex items-start relative pl-[50px] text-left h-full">
              {/* Horizontal Branch */}
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7, ease: customEase }} className="absolute left-[7px] top-[19px] w-[34px] h-[2.5px] origin-left" style={{ background: GREEN }} />

              <Diamond side="left" />

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.9, ease: customEase }} className="space-y-2 pl-4 transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-2 will-change-transform">
                <h3 className="text-[24px] font-extrabold text-white tracking-wide flex items-center gap-3">
                  <span className="font-mono text-[16px] mt-0.5" style={{ color: GREEN }}>{steps[0].id}</span>
                  <span>{steps[0].t}</span>
                </h3>
                <p className="text-zinc-400 text-[15px] font-medium leading-relaxed whitespace-pre-line max-w-[280px]">
                  {steps[0].d}
                </p>
              </motion.div>
            </div>
          </div>

          {/* ========================================== */}
          {/* STEP 02: CREATE (Left Side)                */}
          {/* ========================================== */}
          <div className="grid grid-cols-2 w-full min-h-[120px] items-start relative group cursor-default">

            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease: customEase }} className="absolute left-1/2 -translate-x-1/2 top-[14px] w-[14px] h-[14px] rounded-full z-30" style={{ background: GREEN, boxShadow: `0 0 12px ${GREEN}80` }} />

            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.6, ease: customEase }} className="absolute left-1/2 -translate-x-1/2 top-[28px] bottom-[-80px] w-[3.5px] z-10 origin-top" style={{ background: GREEN }} />

            <div className="flex items-start justify-end relative pr-[50px] text-right h-full">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.9, ease: customEase }} className="space-y-2 pr-4 flex flex-col items-end transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-x-2 will-change-transform">
                <h3 className="text-[24px] font-extrabold text-white tracking-wide flex items-center gap-3 flex-row-reverse">
                  <span className="font-mono text-[16px] mt-0.5" style={{ color: GREEN }}>{steps[1].id}</span>
                  <span>{steps[1].t}</span>
                </h3>
                <p className="text-zinc-400 text-[15px] font-medium leading-relaxed whitespace-pre-line max-w-[280px]">
                  {steps[1].d}
                </p>
              </motion.div>

              {/* Horizontal Branch */}
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7, ease: customEase }} className="absolute right-[7px] top-[19px] w-[34px] h-[2.5px] origin-right" style={{ background: GREEN }} />

              <Diamond side="right" />
            </div>

            <div className="text-left pl-12 opacity-0 pointer-events-none select-none">Spacer</div>
          </div>

          {/* ========================================== */}
          {/* STEP 03: RELEASE (Right Side)              */}
          {/* ========================================== */}
          <div className="grid grid-cols-2 w-full min-h-[120px] items-start relative group cursor-default">

            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease: customEase }} className="absolute left-1/2 -translate-x-1/2 top-[14px] w-[14px] h-[14px] rounded-full z-30" style={{ background: GREEN, boxShadow: `0 0 12px ${GREEN}80` }} />

            {/* Final spine extending all the way down to feed into Pricing */}
            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.6, ease: customEase }} className="absolute left-1/2 -translate-x-1/2 top-[28px] bottom-[-160px] w-[3.5px] z-10 origin-top" style={{ background: GREEN }} />

            <div className="text-right pr-12 opacity-0 pointer-events-none select-none">Spacer</div>

            <div className="flex items-start relative pl-[50px] text-left h-full">
              {/* Horizontal Branch */}
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7, ease: customEase }} className="absolute left-[7px] top-[19px] w-[34px] h-[2.5px] origin-left" style={{ background: GREEN }} />

              <Diamond side="left" />

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.9, ease: customEase }} className="space-y-2 pl-4 transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-2 will-change-transform">
                <h3 className="text-[24px] font-extrabold text-white tracking-wide flex items-center gap-3">
                  <span className="font-mono text-[16px] mt-0.5" style={{ color: GREEN }}>{steps[2].id}</span>
                  <span>{steps[2].t}</span>
                </h3>
                <p className="text-zinc-400 text-[15px] font-medium leading-relaxed whitespace-pre-line max-w-[280px]">
                  {steps[2].d}
                </p>
              </motion.div>
            </div>
          </div>

        </div>

        </ScaleFrame>

      </div>
    </section>
  );
};
