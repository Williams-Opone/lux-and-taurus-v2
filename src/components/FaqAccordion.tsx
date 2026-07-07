import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScaleFrame } from './ScaleFrame';

const GREEN = '#4ade80';

// Ultra-premium cinematic easing curve
const customEase = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  FAQ — center spine with a node dot per question, accordion on the  */
/*  right, testimonial quotes branching off the spine on the left      */
/*  (rows 2 and 5), and a big terminal dot ending the pipeline.        */
/*                                                                     */
/*  Motion package (the circuit's finale):                             */
/*   · spine self-draws top→bottom as the section enters               */
/*   · ⚡ current pulse rides the full spine forever                    */
/*   · rows cascade in; each node dot pops as its row lands            */
/*   · quote branches sweep OUT of the spine: line grows, dot pops,    */
/*     quote rises — the same grammar as the stats HUD                 */
/*   · accordion: + rotates, answer unfolds, question tints green      */
/*     while open                                                      */
/*   · terminal dot lands with a spring pop, then breathes a radar     */
/*     ring forever — the "system online" end-cap of the page          */
/*  Perf: transform/opacity only, once-only entrances.                 */
/* ------------------------------------------------------------------ */

const HEADER_H = 76; // px — question header height; dots & branches center on it

const FAQS: { q: string; a: string; quote?: { text: string[]; author: string } }[] = [
  {
    q: 'Can you build in 7 days?',
    a: 'Yes — for a focused scope. Landing pages and 5-page sites ship in 7 days. Web apps take 14, full MVPs 21. You get a fixed date before we start, and we hit it 98% of the time.',
  },
  {
    q: 'Not technical. Problem?',
    a: 'Not at all — most of our clients aren’t. We translate everything into plain English, send daily written updates, and handle all the technical decisions. You only approve what you can see and click.',
    quote: {
      text: ['“Best money I ever', 'spent on my startup.”'],
      author: 'Sarah Chen',
    },
  },
  {
    q: 'Changes after launch?',
    a: 'Every build includes 30 days of post-launch support — bug fixes and small tweaks are free. Bigger changes get a fixed quote within 24 hours, never an open-ended hourly bill.',
  },
  {
    q: 'How do payments work?',
    a: '50% to book your build slot, 50% on delivery. Fixed price, agreed up front, no surprise line items. If we miss the deadline, the on-time guarantee kicks in.',
  },
  {
    q: 'Do I own the code?',
    a: '100%, from day one. The repo is created under your account, the domain and hosting are in your name, and there are no licenses or lock-ins. Fire us anytime and keep everything.',
    quote: {
      text: ['“Zero surprises.', 'Just daily progress.”'],
      author: 'Priya Sharma',
    },
  },
  {
    q: 'What if I’m not happy?',
    a: 'You review progress every single day, so nothing drifts. If we deliver late, you get a refund on the final payment. If we’re mid-build and it’s not working out, you pay only for what’s been shipped.',
  },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-black relative overflow-hidden font-sans select-none">
      <div className="px-3 sm:px-6">
        <div className="relative mx-auto w-full max-w-[880px] pb-20 lg:pb-28">
          {/* ========== same structure on every device (scaled) ========== */}
          <ScaleFrame designWidth={880}>
          <div className="relative pt-2">
            {/* continuous center spine — self-draws, then carries current */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-[13px] w-[3.5px] z-0 overflow-hidden">
              <motion.div
                className="absolute inset-0 origin-top"
                style={{ background: GREEN, boxShadow: '0 0 10px rgba(74,222,128,0.35)' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
              {/* ⚡ current pulse riding the full spine */}
              <span aria-hidden className="faq-pulse" />
            </div>

            {/* lead-in gap from previous section */}
            <div className="h-10" />

            {FAQS.map((item, i) => {
              const rowDelay = 0.25 + i * 0.11;
              return (
                <div
                  key={item.q}
                  className="relative grid grid-cols-[calc(50%-22px)_44px_1fr] items-start"
                >
                  {/* LEFT — testimonial branch (only on flagged rows) */}
                  <div className="relative">
                    {item.quote && (
                      <div
                        className="flex items-center justify-end"
                        style={{ height: HEADER_H }}
                      >
                        {/* quote rises in after its branch connects */}
                        <motion.div
                          className="text-center pr-4"
                          initial={{ opacity: 0, x: 16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.6, delay: rowDelay + 0.35, ease: customEase }}
                        >
                          {item.quote.text.map((line) => (
                            <p
                              key={line}
                              className="text-[24px] font-bold text-white tracking-tight leading-[1.25] whitespace-nowrap"
                            >
                              {line}
                            </p>
                          ))}
                          <p className="text-[16px] text-zinc-400 mt-1.5">
                            — {item.quote.author}
                          </p>
                        </motion.div>
                        {/* branch: line grows OUT of the spine, then dot pops */}
                        <div className="flex items-center shrink-0">
                          <motion.span
                            className="w-[7px] h-[7px] rounded-full shrink-0"
                            style={{ background: GREEN, boxShadow: `0 0 6px ${GREEN}` }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35, delay: rowDelay + 0.3, ease: customEase }}
                          />
                          <motion.span
                            className="h-[2.5px] w-[46px] -mr-[24px] origin-right"
                            style={{ background: GREEN }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.45, delay: rowDelay + 0.12, ease: customEase }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CENTER — node dot pops as its row lands */}
                  <div className="relative flex justify-center z-10">
                    <motion.span
                      className="absolute w-[13px] h-[13px] rounded-full"
                      style={{
                        background: GREEN,
                        boxShadow: `0 0 8px ${GREEN}`,
                        top: HEADER_H / 2 - 6.5,
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 18,
                        delay: rowDelay,
                      }}
                    />
                  </div>

                  {/* RIGHT — accordion item, cascades in */}
                  <motion.div
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: rowDelay + 0.08, ease: customEase }}
                    className={`pl-1 ${i < FAQS.length - 1 ? 'border-b border-zinc-800/80' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(open === i ? null : i)}
                      className="faq-q w-full bg-transparent border-0 p-0 cursor-pointer flex items-center justify-between gap-6 text-left group"
                      style={{ height: HEADER_H }}
                      aria-expanded={open === i}
                    >
                      <span
                        className="text-[19px] font-bold tracking-tight transition-colors duration-300"
                        style={{ color: open === i ? GREEN : '#ffffff' }}
                      >
                        {item.q}
                      </span>
                      <svg
                        className="w-[18px] h-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          stroke: GREEN,
                          transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" d="M12 4v16M4 12h16" />
                      </svg>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[15.5px] text-zinc-400 leading-relaxed pb-6 pr-8 max-w-[400px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}

            {/* spine run-out + big terminal dot */}
            <div className="h-16" />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[26px] h-[26px] rounded-full z-10"
              style={{ background: GREEN, boxShadow: '0 0 18px rgba(74,222,128,0.6)' }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 1.2 }}
            >
              {/* breathing radar ring — "system online" */}
              <span aria-hidden className="faq-ring" />
              <span aria-hidden className="faq-ring faq-ring-2" />
            </motion.div>
          </div>

          </ScaleFrame>
        </div>
      </div>

      {/* component-scoped animation engine (transform-only) */}
      <style>{`
        /* ⚡ current pulse riding the full FAQ spine */
        .faq-pulse {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 32px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #d1ffe3, transparent);
          transform: translateY(-36px);
          animation: faq-pulse-run 5s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: 2.6s;
        }
        @keyframes faq-pulse-run {
          0% { transform: translateY(-36px); opacity: 0; }
          6% { opacity: 1; }
          75%, 100% { transform: translateY(660px); opacity: 1; }
        }

        /* breathing radar rings on the terminal dot */
        .faq-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid rgba(74,222,128,0.7);
          animation: faq-ring-run 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          animation-delay: 1.8s;
          opacity: 0;
        }
        .faq-ring-2 { animation-delay: 3.2s; }
        @keyframes faq-ring-run {
          0% { transform: scale(1); opacity: 0.8; }
          70%, 100% { transform: scale(2.6); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-pulse, .faq-ring { animation: none !important; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
