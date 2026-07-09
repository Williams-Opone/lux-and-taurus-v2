import { motion } from 'framer-motion';
import { goToBook } from '../router';

const GREEN = '#4ade80'; // ← site palette; change here to switch the whole section

// Ultra-premium cinematic easing curve
const customEase = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Pricing — Y-split conduit into three cards, merging back below.    */
/*  Motion package (matching Hero/Portfolio/Method):                   */
/*   · conduits self-draw (pathLength) as the section enters           */
/*   · ⚡ current pulses ride the exact branch curves (SMIL             */
/*     animateMotion — off-main-thread, zero JS per frame)             */
/*   · cards rise in staggered; GROWTH lands last with a glow bloom    */
/*   · hover: card lifts, border tints green, soft halo appears        */
/*  Perf: transform/opacity keyframes only, once-only entrances.       */
/* ------------------------------------------------------------------ */

const plans = [
  {
    name: 'LAUNCH SPRINT',
    tagline: 'Validate your idea',
    price: '$1,500',
    duration: '7 DAYS',
    features: ['Landing page', 'Waitlist', 'Auth', '1 core feature', 'Deployed live'],
    isPopular: false,
  },
  {
    name: 'CORE MVP',
    tagline: 'Get first paying users',
    price: '$2,500',
    duration: '14 DAYS',
    features: [
      'Landing + Auth (Google/Email)',
      'Dashboard + Database',
      'Stripe payments',
      '1-2 core features',
      'Deployed to Vercel',
    ],
    isPopular: true,
  },
  {
    name: 'PRO MVP',
    tagline: 'Launch loaded',
    price: '$3,900',
    duration: '14 DAYS',
    features: [
      'Everything in Core MVP',
      'AI integration (OpenAI)',
      'Admin panel',
      'Email onboarding',
      'Priority support',
    ],
    isPopular: false,
  },
];

/* self-drawing conduit path + traveling current pulse */
const Conduit = ({
  d,
  delay = 0,
  pulseDur,
  pulseBegin,
}: {
  d: string;
  delay?: number;
  pulseDur?: number;
  pulseBegin?: string;
}) => (
  <>
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth="3.5"
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: 'easeInOut', delay }}
    />
    {pulseDur && (
      <circle r="4" fill="#d1ffe3" opacity="0.9">
        <animateMotion dur={`${pulseDur}s`} repeatCount="indefinite" begin={pulseBegin} path={d} />
      </circle>
    )}
  </>
);

export const PricingMatrix = () => {
  return (
    <section id="pricing" className="bg-black relative text-center font-sans select-none overflow-hidden pb-0">

      {/* Mobile spine (hidden on desktop) — full-strength root link with
          glow + current pulse; cards are opaque so it reads as the
          circuit passing BETWEEN them, not through them */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3.5px] lg:hidden z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: GREEN, boxShadow: '0 0 10px rgba(74,222,128,0.35)' }}
        />
        <span aria-hidden className="pm-pulse-mobile" />
      </div>

      <div className="max-w-[936px] mx-auto relative px-6 lg:px-0">

        {/* --- TOP SVG CONDUIT (Desktop) --- */}
        <div className="relative h-[130px] w-full hidden lg:block z-10" style={{ color: GREEN }}>
          <svg viewBox="0 0 936 130" fill="none" className="w-full h-full overflow-visible">
            {/* Center spine */}
            <Conduit d="M 468 0 V 130" delay={0} />
            {/* Left branch — carries current down into STARTER */}
            <Conduit
              d="M 468 30 Q 468 45 453 45 H 155 Q 140 45 140 60 V 130"
              delay={0.25}
              pulseDur={3.2}
              pulseBegin="1.6s"
            />
            {/* Right branch — carries current down into SCALE */}
            <Conduit
              d="M 468 30 Q 468 45 483 45 H 781 Q 796 45 796 60 V 130"
              delay={0.25}
              pulseDur={3.2}
              pulseBegin="2.4s"
            />
          </svg>

          {/* TITLE MASK OVERLAY */}
          <div className="absolute top-[62px] left-1/2 -translate-x-1/2 bg-black px-6 py-1 z-20 overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: customEase }}
              className="text-[26px] font-bold tracking-[0.18em] text-white uppercase whitespace-nowrap"
            >
              YOUR INVESTMENT
            </motion.h2>
          </div>
        </div>

        {/* Mobile Title (hidden on desktop) — eyebrow + title on the spine */}
        <div className="relative lg:hidden text-center py-12 z-20">
          <span
            className="inline-block bg-black px-4 text-[11px] font-bold tracking-[0.3em] uppercase mb-2"
            style={{ color: GREEN }}
          >
            ✦ Plans
          </span>
          <h2 className="mx-auto inline-block bg-black px-5 text-[22px] font-bold tracking-[0.15em] text-white uppercase whitespace-nowrap block w-fit">
            YOUR INVESTMENT
          </h2>
        </div>

        {/* --- CARDS ROW --- */}
        <div className="relative z-20 flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-8 lg:gap-[48px] w-full max-w-[936px] mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                /* sides land first, GROWTH lands last for emphasis */
                delay: 0.45 + (plan.isPopular ? 0.3 : idx * 0.12),
                ease: customEase,
              }}
              className={`pm-card group w-full max-w-[400px] lg:w-[280px] shrink-0 rounded-2xl py-8 lg:py-10 px-6 lg:px-8 flex flex-col items-center border text-center relative mx-auto lg:mx-0 ${
                plan.isPopular ? 'pm-card-popular z-30 max-lg:order-first' : 'z-20'
              }`}
              style={
                plan.isPopular
                  ? {
                      /* solid tint (not rgba over transparent) so the
                         mobile spine can't show through the card */
                      background: '#0c1d13',
                      borderColor: GREEN,
                      boxShadow: '0 0 40px rgba(74,222,128,0.12)',
                    }
                  : { background: '#08080a', borderColor: '#27272a' }
              }
            >
              {/* MOST POPULAR tag — explains why the flagship leads the
                  stack on mobile; sits on the top border on all devices */}
              {plan.isPopular && (
                <span
                  className="absolute -top-[11px] left-1/2 -translate-x-1/2 px-3 py-[3px] rounded-full text-[10px] font-bold tracking-[0.18em] uppercase text-black whitespace-nowrap"
                  style={{ background: GREEN, boxShadow: '0 0 14px rgba(74,222,128,0.4)' }}
                >
                  Most Popular
                </span>
              )}

              {/* Star Node for popular card — spins in after the card lands */}
              {plan.isPopular && (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 1.1, ease: customEase }}
                  className="absolute top-4 right-5 text-lg select-none"
                  style={{ color: GREEN }}
                >
                  ✦
                </motion.span>
              )}

              {/* Card Meta */}
              <span className="text-[14px] font-bold tracking-[0.15em] text-white mb-1 uppercase">
                {plan.name}
              </span>
              <span className="text-[12px] font-medium mb-3 block" style={{ color: GREEN }}>
                {plan.tagline}
              </span>
              <h3 className="text-[40px] font-bold text-white tracking-tight leading-none mb-2">
                {plan.price}
              </h3>
              <span className="text-[13px] text-zinc-100 uppercase block mb-8 font-medium">
                Ship in {plan.duration}
              </span>

              {/* Features List */}
              <ul className="space-y-3 text-zinc-300 text-[14.5px] mb-10 w-full flex-grow font-medium text-left">
                {plan.features.map((feature) => (
                  <li key={feature} className="leading-snug flex items-start gap-2.5">
                    <svg
                      className="w-[13px] h-[13px] shrink-0 mt-[3px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={GREEN}
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action Button — routes to the booking page with the
                  package pre-selected */}
              <button
                onClick={() =>
                  goToBook({
                    package: plan.name
                      .toLowerCase()
                      .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    price: Number(plan.price.replace(/[^0-9]/g, '')),
                    duration: `SHIP IN ${plan.duration}`,
                  })
                }
                className="pm-btn relative overflow-hidden h-[44px] w-[200px] rounded-full text-[13px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 border-0 cursor-pointer outline-none text-black"
                style={{ background: GREEN }}
              >
                <span aria-hidden className="pm-btn-shine" />
                <span className="relative z-10">Start My Build</span>
                <svg className="pm-btn-arrow relative z-10 w-4 h-4 -mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

        {/* --- ⛨ THE GUARANTEE — sits on the merge conduit below --- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.4, ease: customEase }}
          className="relative z-20 mt-12 lg:mt-14 flex justify-center px-2"
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 rounded-full border px-6 sm:px-8 py-3.5 bg-black"
            style={{ borderColor: 'rgba(74,222,128,0.45)', boxShadow: '0 0 30px rgba(74,222,128,0.10)' }}
          >
            <span className="text-[15px] leading-none" style={{ color: GREEN }}>⛨</span>
            <span className="text-[14px] sm:text-[15px] font-bold text-white tracking-wide text-center">
              14 days to launch — or we work for free until it's live.
            </span>
          </div>
        </motion.div>

        {/* --- BOTTOM SVG CONDUIT (Desktop) --- */}
        <div className="relative h-[130px] w-full hidden lg:block z-10" style={{ color: GREEN }}>
          <svg viewBox="0 0 936 130" fill="none" className="w-full h-full overflow-visible">
            {/* Center continues */}
            <Conduit d="M 468 0 V 130" delay={0.5} />
            {/* Left joins center — current flows back into the spine */}
            <Conduit
              d="M 140 0 V 40 Q 140 55 155 55 H 453 Q 468 55 468 70 V 130"
              delay={0.3}
              pulseDur={3.6}
              pulseBegin="2s"
            />
            {/* Right joins center */}
            <Conduit
              d="M 796 0 V 40 Q 796 55 781 55 H 483 Q 468 55 468 70 V 130"
              delay={0.3}
              pulseDur={3.6}
              pulseBegin="2.9s"
            />
          </svg>
        </div>

      </div>

      {/* component-scoped animation engine (transform-only) */}
      <style>{`
        /* card hover — lift + green tint + halo (transform/shadow only) */
        .pm-card {
          transition:
            transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.35s ease,
            box-shadow 0.45s ease;
        }
        .pm-card:hover {
          transform: translateY(-6px);
          border-color: rgba(74,222,128,0.6) !important;
          box-shadow:
            0 24px 60px rgba(0,0,0,0.55),
            0 0 36px rgba(74,222,128,0.10);
        }
        .pm-card-popular:hover {
          border-color: ${GREEN} !important;
          box-shadow:
            0 24px 60px rgba(0,0,0,0.55),
            0 0 52px rgba(74,222,128,0.22);
        }

        /* BEGIN button — brighten, glow, arrow nudge, shimmer */
        .pm-btn {
          transition: filter 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }
        .pm-btn:hover {
          filter: brightness(1.08);
          box-shadow: 0 6px 24px rgba(74,222,128,0.4);
        }
        .pm-btn:active { transform: scale(0.96); }
        .pm-btn-arrow { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .pm-btn:hover .pm-btn-arrow { transform: translateX(3px); }
        .pm-btn-shine {
          position: absolute;
          top: 0; bottom: 0;
          left: -70%;
          width: 45%;
          transform: skewX(-20deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: pm-shine-run 5s ease-in-out infinite;
          animation-delay: 3s;
        }
        @keyframes pm-shine-run {
          0%, 70% { left: -70%; }
          92%, 100% { left: 140%; }
        }

        /* ⚡ mobile spine current pulse */
        .pm-pulse-mobile {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 28px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #d1ffe3, transparent);
          transform: translateY(-32px);
          animation: pm-pulse-mobile-run 5s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: 2s;
        }
        @keyframes pm-pulse-mobile-run {
          0% { transform: translateY(-32px); opacity: 0; }
          6% { opacity: 1; }
          80%, 100% { transform: translateY(1600px); opacity: 1; }
        }
        @media (min-width: 1024px) {
          .pm-pulse-mobile { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pm-btn-shine, .pm-pulse-mobile { animation: none; }
        }
      `}</style>
    </section>
  );
};
