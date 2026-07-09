import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { goToBook } from '../router';

const GREEN = '#4ade80';

/* ------------------------------------------------------------------ */
/*  Nav — floating rounded bar with a continuously orbiting green      */
/*  energy beam tracing its border (conic-gradient + @property),       */
/*  staggered entrance, underline-sweep links, shimmer CALL pill,      */
/*  and a breathing glow behind the logo.                              */
/*                                                                     */
/*  Responsive: below sm the links collapse into a ☰ hamburger that    */
/*  unfolds a dropdown panel in the same shell language as the bar.    */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { id: 'vault', label: 'WORK' },
  { id: 'process', label: 'METHOD' },
  { id: 'pricing', label: 'PLANS' },
];

type NavProps = {
  /** Path or URL to any image (png/jpg/webp/...). Defaults to /landtnoblogo.png */
  logoSrc?: string;
  /** Set false if your logo has real transparency or dark colors to keep */
  logoBlend?: boolean;
};

export const Nav = ({ logoSrc = '/landtnoblogo.png', logoBlend = true }: NavProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-3 pt-3 sm:px-4"
    >
      <nav
        className={`nav-shell relative mx-auto max-w-[1040px] h-[56px] sm:h-[62px] rounded-2xl border flex items-center justify-between px-4 sm:px-8 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md'
            : 'bg-[#060607] border-zinc-800/70'
        }`}
      >
        {/* 🛰️ orbiting energy beam — traces the border continuously */}
        <span aria-hidden className="nav-beam" />
        {/* faint static green ring so the beam feels anchored */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(74,222,128,0.10)' }}
        />

        {/* LOGO */}
        <motion.button
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative bg-transparent border-0 p-0 cursor-pointer flex items-center gap-2 sm:gap-2.5 select-none group/logo"
        >
          {/* breathing glow behind the mark */}
          <span aria-hidden className="nav-logo-glow" />

          <img
            src={logoSrc}
            alt="Lux & Taurus Logo"
            className={`w-[26px] h-[30px] sm:w-[30px] sm:h-[35px] shrink-0 object-contain relative z-10 transition-transform duration-300 group-hover/logo:scale-110 ${logoBlend ? 'mix-blend-screen' : ''}`}
          />

          <span className="relative z-10 text-white font-extrabold text-[15px] sm:text-[18px] tracking-tight whitespace-nowrap">
            LUX <span style={{ color: GREEN }}>&amp;</span> TAURUS
          </span>
        </motion.button>

        {/* LINKS + CTA */}
        <div className="flex items-center gap-2.5 sm:gap-8">
          <div className="hidden sm:flex items-center gap-7">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.28 + i * 0.09,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => jumpToSection(link.id)}
                className="nav-link relative bg-transparent border-0 p-0 cursor-pointer text-[14.5px] font-semibold tracking-[0.03em] text-white transition-colors duration-200 hover:text-[#4ade80]"
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* CALL pill — glow + shimmer sweep, never a solid fill */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => goToBook()}
            className="nav-cta group/cta relative overflow-hidden cursor-pointer bg-transparent rounded-full border h-[34px] sm:h-[36px] px-3 sm:px-4 inline-flex items-center gap-1 text-[12.5px] sm:text-[13.5px] font-semibold tracking-[0.04em] transition-all duration-300 active:scale-95"
            style={{ borderColor: 'rgba(74,222,128,0.7)', color: GREEN }}
          >
            {/* shimmer sweep */}
            <span aria-hidden className="nav-cta-shine" />
            <span className="relative z-10">[ CALL</span>
            <svg
              className="relative z-10 w-[13px] h-[13px] transition-transform duration-300 group-hover/cta:translate-x-[3px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="relative z-10">]</span>
          </motion.button>

          {/* ☰ hamburger — mobile only, morphs into ✕ when open */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="sm:hidden relative bg-transparent border-0 p-1.5 -mr-1 cursor-pointer flex flex-col justify-center items-center gap-[5px] w-[34px] h-[34px]"
          >
            <span
              className="block w-[18px] h-[2px] rounded-full bg-white transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block w-[18px] h-[2px] rounded-full bg-white transition-opacity duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-[18px] h-[2px] rounded-full bg-white transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* 📱 mobile dropdown menu — same shell language as the bar */}
      <div
        className="sm:hidden mx-auto max-w-[1040px] overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid"
        style={{ gridTemplateRows: menuOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            className="mt-2 rounded-2xl border border-zinc-800 bg-black/90 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.6)] px-5 py-3"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(74,222,128,0.08)' }}
          >
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.id}
                onClick={() => jumpToSection(link.id)}
                className={`w-full bg-transparent border-0 px-0 py-3.5 cursor-pointer flex items-center justify-between text-left text-[15px] font-semibold tracking-[0.03em] text-white active:text-[#4ade80] ${
                  i < NAV_LINKS.length - 1 ? 'border-b border-zinc-800/70' : ''
                }`}
              >
                <span>{link.label}</span>
                <span style={{ color: GREEN }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* component-scoped animation engine */}
      <style>{`
        @property --nav-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        /* 🛰️ Orbiting beam: conic gradient rendered ONLY on the border
           ring via mask compositing, rotating forever. */
        .nav-beam {
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          pointer-events: none;
          padding: 1.5px;
          background: conic-gradient(
            from var(--nav-angle),
            transparent 0deg,
            transparent 288deg,
            rgba(74,222,128,0.25) 322deg,
            #4ade80 348deg,
            #d1ffe3 356deg,
            #4ade80 360deg
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          animation: nav-orbit 5s linear infinite;
        }
        @keyframes nav-orbit {
          to { --nav-angle: 360deg; }
        }

        /* breathing glow behind the logo mark */
        .nav-logo-glow {
          position: absolute;
          left: -6px;
          top: 50%;
          width: 44px;
          height: 44px;
          transform: translateY(-50%);
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(74,222,128,0.28) 0%, transparent 70%);
          animation: nav-breathe 3.2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes nav-breathe {
          0%, 100% { opacity: 0.5; transform: translateY(-50%) scale(1); }
          50% { opacity: 1; transform: translateY(-50%) scale(1.25); }
        }

        /* underline sweep on links */
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 100%;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #4ade80, rgba(74,222,128,0.2));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 0 8px rgba(74,222,128,0.6);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        /* CALL pill — refined hover: glow + tint, NOT a solid fill */
        .nav-cta:hover {
          border-color: #4ade80 !important;
          background: rgba(74,222,128,0.08) !important;
          box-shadow:
            0 0 18px rgba(74,222,128,0.35),
            inset 0 0 10px rgba(74,222,128,0.10);
        }

        /* shimmer sweep across the pill */
        .nav-cta-shine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -80%;
          width: 55%;
          transform: skewX(-20deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(74,222,128,0.22),
            rgba(209,255,227,0.30),
            rgba(74,222,128,0.22),
            transparent
          );
          animation: nav-shine 3.4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes nav-shine {
          0%, 55% { left: -80%; }
          85%, 100% { left: 130%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-beam, .nav-logo-glow, .nav-cta-shine { animation: none; }
        }
      `}</style>
    </motion.header>
  );
};
