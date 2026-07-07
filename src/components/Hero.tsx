import { useRef } from 'react';
import { motion } from 'framer-motion';
import { goToBook } from '../router';

const GREEN = '#4ade80';

/* ------------------------------------------------------------------ */
/*  Hero — layout 1:1 with the mock: spine in from the nav, two-line   */
/*  headline, three subtext lines, green pill CTA, spine out below.    */
/*                                                                     */
/*  Motion package (professional tier):                                */
/*   · spine self-draws, then carries a periodic energy pulse          */
/*   · per-word masked rise reveal — clean vertical, no rotation       */
/*   · slow breathing aurora + faint blueprint dot-grid for depth      */
/*   · cursor-reactive spotlight that subtly follows the mouse         */
/*   · magnetic CTA with glow bloom + occasional shimmer sweep         */
/*   · sparse, dim particle drift (barely-there depth cue)             */
/* ------------------------------------------------------------------ */

const LINE1 = ['YOUR', 'MVP.', 'LIVE', 'IN'];
const LINE2 = ['21', 'DAYS', 'OR', 'LESS.'];
const SUB_LINES = [
  'While agencies quote months, we ship in 7–21 days.',
  'Fixed price: $1,500–$3,900. No surprises, ever.',
  'You own the code from day one.',
];

/* deterministic, sparse particle field */
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  left: (i * 137 + 19) % 100,
  top: 12 + ((i * 53 + 11) % 76),
  size: 2 + (i % 2),
  dur: 11 + (i % 4) * 3,
  delay: (i * 1.7) % 8,
}));

const EASE = [0.22, 1, 0.36, 1] as const;

const Word = ({ word, index, base }: { word: string; index: number; base: number }) => (
  <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
    <motion.span
      className="inline-block will-change-transform"
      initial={{ y: '112%' }}
      animate={{ y: '0%' }}
      transition={{ delay: base + index * 0.085, duration: 0.75, ease: EASE }}
    >
      {word}
    </motion.span>
  </span>
);

export const Hero = () => {
  const ctaRef = useRef<HTMLButtonElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* cursor spotlight — one transform write per move, no re-renders */
  const onSpot = (e: React.MouseEvent<HTMLElement>) => {
    const spot = spotRef.current;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!spot || !rect) return;
    spot.style.transform = `translate(${e.clientX - rect.left - 300}px, ${
      e.clientY - rect.top - 300
    }px)`;
    spot.style.opacity = '1';
  };
  const offSpot = () => {
    if (spotRef.current) spotRef.current.style.opacity = '0';
  };

  /* magnetic CTA */
  const onMagnet = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.26}px)`;
  };
  const offMagnet = () => {
    if (ctaRef.current) ctaRef.current.style.transform = 'translate(0px, 0px)';
  };

  const jump = () => goToBook();

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={onSpot}
      onMouseLeave={offSpot}
      className="bg-black relative overflow-hidden font-sans select-none"
    >
      {/* blueprint dot-grid — fades toward the edges */}
      <div aria-hidden className="hero-grid absolute inset-0 pointer-events-none" />

      {/* breathing aurora behind the headline */}
      <div aria-hidden className="hero-aurora absolute left-1/2 top-[40%] pointer-events-none" />

      {/* cursor-reactive spotlight */}
      <div ref={spotRef} aria-hidden className="hero-spot absolute top-0 left-0 pointer-events-none" />

      {/* sparse particle drift */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hero-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* ── spine in from the nav (visible on every device) ── */}
        <div className="relative mx-auto w-[3.5px] h-[64px] overflow-hidden">
          <motion.div
            className="absolute inset-0 origin-top"
            style={{ background: GREEN, boxShadow: '0 0 10px rgba(74,222,128,0.35)' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <span aria-hidden className="hero-pulse" />
        </div>

        {/* ── headline ── */}
        <h1 className="mt-8 lg:mt-10 text-[40px] sm:text-[58px] lg:text-[68px] font-extrabold text-white tracking-tight leading-[1.04]">
          <span className="relative inline-block">
            <span className="block">
              {LINE1.map((w, i) => (
                <span key={w}>
                  <Word word={w} index={i} base={0.35} />
                  {i < LINE1.length - 1 && ' '}
                </span>
              ))}
            </span>
            <span className="block">
              {LINE2.map((w, i) => (
                <span key={w}>
                  <Word word={w} index={i + LINE1.length} base={0.35} />
                  {i < LINE2.length - 1 && ' '}
                </span>
              ))}
            </span>
            {/* slow light sweep — subtle, infrequent */}
            <span aria-hidden className="hero-shine" />
          </span>
        </h1>

        {/* ── subtext ── */}
        <div className="mt-7 space-y-0.5">
          {SUB_LINES.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 + i * 0.12, duration: 0.55, ease: EASE }}
              className="text-[19px] sm:text-[21px] text-zinc-200 leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* ── magnetic CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5, ease: EASE }}
          className="mt-9 inline-block p-6 -m-6"
          onMouseMove={onMagnet}
          onMouseLeave={offMagnet}
        >
          <button
            ref={ctaRef}
            onClick={jump}
            className="hero-cta relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full border-0 cursor-pointer px-9 h-[52px] text-black font-extrabold text-[17px] tracking-tight"
            style={{ background: GREEN, boxShadow: '0 8px 32px rgba(74,222,128,0.28)' }}
          >
            <span aria-hidden className="hero-cta-shine" />
            <span className="relative z-10">BOOK A FREE CALL</span>
            <svg
              className="hero-cta-arrow relative z-10 w-[17px] h-[17px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>

        {/* ── spine out toward the Portfolio HUD (visible on every device) ── */}
        <div className="relative mx-auto mt-10 w-[3.5px] h-[72px] overflow-hidden">
          <motion.div
            className="absolute inset-0 origin-top"
            style={{ background: GREEN, boxShadow: '0 0 10px rgba(74,222,128,0.35)' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.7, duration: 0.5, ease: 'easeOut' }}
          />
          <span aria-hidden className="hero-pulse" style={{ animationDelay: '3.3s' }} />
        </div>
      </div>

      {/* component-scoped animation engine */}
      <style>{`
        /* blueprint dot grid, vignetted so it never competes with copy */
        .hero-grid {
          background-image: radial-gradient(rgba(74,222,128,0.13) 1px, transparent 1px);
          background-size: 34px 34px;
          -webkit-mask-image: radial-gradient(ellipse 75% 70% at 50% 42%, #000 0%, transparent 78%);
          mask-image: radial-gradient(ellipse 75% 70% at 50% 42%, #000 0%, transparent 78%);
          animation: hero-grid-in 1.8s ease-out both;
        }
        @keyframes hero-grid-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* breathing aurora */
        .hero-aurora {
          width: 780px;
          height: 460px;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse, rgba(74,222,128,0.09) 0%, transparent 62%);
          animation: hero-aurora-breathe 7s ease-in-out infinite;
        }
        @keyframes hero-aurora-breathe {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.12); }
        }

        /* cursor spotlight — 600px soft radial, GPU transform only */
        .hero-spot {
          width: 600px;
          height: 600px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
          will-change: transform;
        }

        /* ⚡ energy pulse traveling down the spine (transform-only) */
        .hero-pulse {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 26px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #d1ffe3, transparent);
          transform: translateY(-30px);
          animation: hero-pulse-run 3.2s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: 2.1s;
        }
        @keyframes hero-pulse-run {
          0% { transform: translateY(-30px); opacity: 0; }
          8% { opacity: 1; }
          55%, 100% { transform: translateY(110px); opacity: 1; }
        }

        /* ✨ infrequent, restrained light sweep on the headline */
        .hero-shine {
          position: absolute;
          inset: -8px -24px;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 44%,
            rgba(255,255,255,0.13) 50%,
            transparent 56%
          );
          background-size: 280% 100%;
          background-position: 135% 0;
          animation: hero-shine-run 8s ease-in-out infinite;
          animation-delay: 2.4s;
          mix-blend-mode: overlay;
        }
        @keyframes hero-shine-run {
          0%, 68% { background-position: 135% 0; }
          92%, 100% { background-position: -135% 0; }
        }

        /* sparse dim particles */
        .hero-particle {
          position: absolute;
          border-radius: 9999px;
          background: rgba(74,222,128,0.35);
          box-shadow: 0 0 5px rgba(74,222,128,0.4);
          opacity: 0;
          animation-name: hero-drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes hero-drift {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          25%, 75% { opacity: 0.45; }
          50% { transform: translate(10px, -22px); opacity: 0.7; }
        }

        /* CTA — glow bloom, occasional shimmer, arrow nudge */
        .hero-cta {
          transition:
            transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease,
            filter 0.35s ease;
        }
        .hero-cta:hover {
          box-shadow:
            0 8px 44px rgba(74,222,128,0.5),
            0 0 90px rgba(74,222,128,0.18);
          filter: brightness(1.06);
        }
        .hero-cta:active { filter: brightness(0.94); }
        .hero-cta-arrow { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        .hero-cta:hover .hero-cta-arrow { transform: translateX(4px); }
        .hero-cta-shine {
          position: absolute;
          top: 0; bottom: 0;
          left: -70%;
          width: 45%;
          transform: skewX(-20deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: hero-cta-shine-run 4.6s ease-in-out infinite;
          animation-delay: 2.8s;
        }
        @keyframes hero-cta-shine-run {
          0%, 62% { left: -70%; }
          88%, 100% { left: 140%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-pulse, .hero-shine, .hero-particle, .hero-cta-shine,
          .hero-aurora, .hero-spot { animation: none !important; opacity: 0; }
          .hero-grid { animation: none; }
        }
      `}</style>
    </section>
  );
};
