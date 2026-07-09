import { motion } from 'framer-motion';
import { goHome } from '../router';

const GREEN = '#4ade80';
const customEase = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Error pages — 404 / 500 / 403 in the site's circuit language:      */
/*  the spine drops in, then visibly BREAKS (dashed gap + fallen       */
/*  segment), the code glitches in, and a repair CTA routes home.      */
/* ------------------------------------------------------------------ */

type ErrorKind = '404' | '500' | '403';

const COPY: Record<ErrorKind, { title: string; sub: string; hint: string }> = {
  '404': {
    title: 'SIGNAL LOST',
    sub: 'This route doesn’t exist on the circuit.',
    hint: 'The page may have moved, or the link was mistyped.',
  },
  '500': {
    title: 'SYSTEM FAULT',
    sub: 'Something broke on our end — not yours.',
    hint: 'We’ve been notified. Try again in a moment.',
  },
  '403': {
    title: 'ACCESS DENIED',
    sub: 'This section of the circuit is locked.',
    hint: 'You don’t have clearance for this route.',
  },
};

export const ErrorPage = ({ kind }: { kind: ErrorKind }) => {
  const c = COPY[kind];
  return (
    <section className="bg-black relative min-h-screen font-sans select-none overflow-hidden flex flex-col items-center justify-center px-6 text-center">
      {/* spine in from the top — draws, then dies at the break */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[18vh] w-[3.5px] overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-top"
          style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}50` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: customEase }}
        />
      </div>
      {/* the BREAK — dashed, flickering remnant */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[18vh] flex flex-col items-center gap-[7px]">
        {[10, 7, 4].map((h, i) => (
          <motion.span
            key={i}
            className="err-flicker block w-[3.5px] rounded-full"
            style={{ height: h, background: GREEN, animationDelay: `${i * 0.35}s` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.12 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[560px]">
        {/* glitching code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: customEase }}
          className="err-glitch font-mono font-black tracking-tight leading-none mb-5"
          style={{ color: GREEN, fontSize: 'clamp(88px, 22vw, 160px)', textShadow: '0 0 60px rgba(74,222,128,0.25)' }}
          data-code={kind}
        >
          {kind}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: customEase }}
          className="text-[24px] sm:text-[30px] font-bold text-white tracking-[0.12em] uppercase mb-3"
        >
          {c.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-zinc-400 text-[15.5px] leading-relaxed mb-1"
        >
          {c.sub}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-zinc-600 text-[13.5px] leading-relaxed mb-9"
        >
          {c.hint}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.95, ease: customEase }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={goHome}
            className="err-btn relative overflow-hidden h-[46px] px-8 rounded-full text-[13px] font-bold tracking-widest uppercase inline-flex items-center gap-2 text-black border-0 cursor-pointer"
            style={{ background: GREEN, boxShadow: '0 6px 26px rgba(74,222,128,0.3)' }}
          >
            <span className="relative z-10">Reconnect to Home</span>
            <svg className="relative z-10 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <a
            href="mailto:contact@luxandtaurus.com"
            className="text-[13px] font-semibold no-underline transition-colors hover:text-white"
            style={{ color: GREEN }}
          >
            Report an issue →
          </a>
        </motion.div>
      </div>

      <style>{`
        .err-flicker { animation: err-flick 1.8s ease-in-out infinite; }
        @keyframes err-flick {
          0%, 100% { opacity: 0.9; }
          45% { opacity: 0.15; }
          55% { opacity: 0.7; }
          70% { opacity: 0.1; }
        }
        .err-glitch { position: relative; display: inline-block; }
        .err-glitch::before, .err-glitch::after {
          content: attr(data-code);
          position: absolute;
          inset: 0;
          opacity: 0;
        }
        .err-glitch::before {
          color: #d1ffe3;
          animation: err-g1 3.2s steps(1) infinite;
        }
        .err-glitch::after {
          color: rgba(74,222,128,0.5);
          animation: err-g2 3.2s steps(1) infinite;
        }
        @keyframes err-g1 {
          0%, 93%, 100% { opacity: 0; transform: none; }
          94% { opacity: 0.7; transform: translate(-3px, 2px); }
          96% { opacity: 0; }
          97% { opacity: 0.5; transform: translate(2px, -2px); }
          98% { opacity: 0; }
        }
        @keyframes err-g2 {
          0%, 91%, 100% { opacity: 0; transform: none; }
          92% { opacity: 0.6; transform: translate(3px, 1px); }
          95% { opacity: 0; }
        }
        .err-btn { transition: filter 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease; }
        .err-btn:hover { filter: brightness(1.08); box-shadow: 0 8px 32px rgba(74,222,128,0.45); }
        .err-btn:active { transform: scale(0.97); }
        @media (prefers-reduced-motion: reduce) {
          .err-flicker, .err-glitch::before, .err-glitch::after { animation: none; }
        }
      `}</style>
    </section>
  );
};

export const NotFoundPage = () => <ErrorPage kind="404" />;
export const ServerErrorPage = () => <ErrorPage kind="500" />;
export const ForbiddenPage = () => <ErrorPage kind="403" />;
