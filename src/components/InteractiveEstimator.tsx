import { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { goToBook } from '../router';

const GREEN = '#4ade80'; // ← site palette; change here to switch the whole section

// Ultra-premium cinematic easing curve
const customEase = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Interactive Estimator — the site's live instrument.                */
/*  Motion package (matching the rest of the circuit):                 */
/*   · spine self-draws in + ⚡ current pulse                           */
/*   · header blur-unmask, frame rises, question groups stagger        */
/*   · radio dots / checkbox ticks spring + draw in                    */
/*   · plan swap: price rolls like an odometer, name/duration flip,    */
/*     feature list re-choreographs line by line                       */
/*   · estimate card wears the nav's orbiting energy beam — the        */
/*     "live" artifact of the page                                     */
/*  Perf: transform/opacity only, once-only entrances, SMIL-free       */
/*  loops kept to two tiny compositor layers.                          */
/* ------------------------------------------------------------------ */

const buildingTypes = ['Landing page', 'Multi-page website', 'Web application', 'Not sure yet'];

const featureList = [
  'User accounts / login',
  'Dashboard',
  'Payments / checkout (Stripe)',
  'AI features (OpenAI)',
  'Admin panel',
  'Waitlist / email onboarding',
  'API integrations',
  'Database',
];

const timelineList = ['ASAP', 'Within 2 weeks', 'Within a month', 'Just exploring'];

/* -------------------- price odometer -------------------- */

const PriceTicker = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    if (!ref.current) return;
    const controls = animate(prev.current, value, {
      duration: 0.7,
      ease: customEase,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `$${Math.round(v).toLocaleString()}`;
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);

  return <span ref={ref}>{`$${value.toLocaleString()}`}</span>;
};

/* -------------------- animated ✓ (draws itself) -------------------- */

const DrawnCheck = () => (
  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4">
    <motion.path
      d="M5 13l4 4L19 7"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    />
  </svg>
);

export const InteractiveEstimator = () => {
  const [building, setBuilding] = useState('Web application');
  const [features, setFeatures] = useState<string[]>([
    'User accounts / login',
    'Dashboard',
    'Payments / checkout (Stripe)',
  ]);
  const [timeline, setTimeline] = useState('Within 2 weeks');

  const toggleFeature = (feat: string) => {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  /* ---------------- fluid quote engine ----------------
     Base $1,500 (Launch Sprint floor: landing + waitlist + auth +
     1 core feature + deploy). Every selection beyond that scope
     adds a real increment, so the price lands anywhere between
     $1,500 and $3,900 — $1,750, $2,150, $2,800… not just 3 tiers. */
  const getEstimate = () => {
    /* add-on pricing — auth & waitlist are included in the base */
    const FEATURE_PRICES: Record<string, number> = {
      'User accounts / login': 0,
      'Waitlist / email onboarding': 0,
      'Dashboard': 350,
      'Database': 250,
      'Payments / checkout (Stripe)': 400,
      'API integrations': 300,
      'Admin panel': 450,
      'AI features (OpenAI)': 700,
    };
    const BUILD_PRICES: Record<string, number> = {
      'Landing page': 0,
      'Multi-page website': 150,
      'Web application': 300,
      'Not sure yet': 0,
    };

    const featureSum = features.reduce((sum, f) => sum + (FEATURE_PRICES[f] ?? 0), 0);
    const rush = timeline === 'ASAP' ? 200 : 0;

    /* clamp to the package band + round to a clean $50 */
    const raw = 1500 + (BUILD_PRICES[building] ?? 0) + featureSum + rush;
    const price = Math.min(3900, Math.max(1500, Math.round(raw / 50) * 50));

    /* tier anchor (which package this quote is based on) */
    const wantsPro = features.some((f) => ['AI features (OpenAI)', 'Admin panel'].includes(f));
    const isSprint = price <= 1700;

    const name = wantsPro || price >= 3400 ? 'PRO MVP' : isSprint ? 'LAUNCH SPRINT' : 'CORE MVP';
    const tagline =
      name === 'PRO MVP' ? 'Launch loaded' : name === 'LAUNCH SPRINT' ? 'Validate your idea' : 'Get first paying users';
    const duration = isSprint ? 'SHIP IN 7 DAYS' : 'SHIP IN 14 DAYS';

    /* the card lists what THEY scoped — base + their selections */
    const SHORT_NAMES: Record<string, string> = {
      'User accounts / login': 'Auth (Google/Email)',
      'Waitlist / email onboarding': 'Waitlist + email onboarding',
      'Dashboard': 'Dashboard',
      'Database': 'Database',
      'Payments / checkout (Stripe)': 'Stripe payments',
      'API integrations': 'API integrations',
      'Admin panel': 'Admin panel',
      'AI features (OpenAI)': 'AI integration (OpenAI)',
    };
    const scoped = featureList.filter((f) => features.includes(f)).map((f) => SHORT_NAMES[f]);
    const list = ['Landing page + deploy', ...scoped].slice(0, 6);
    if (rush) list.push('Priority build slot');

    return { name, tagline, price, duration, features: list };
  };

  const plan = getEstimate();

  return (
    <section id="estimator" className="bg-black relative text-left font-sans select-none overflow-hidden pb-24">
      {/* Top Spine — plugs into the Pricing conduit above (root link),
          self-draws, then carries current down to the header */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[92px] w-[3.5px] z-10 overflow-hidden hidden lg:block">
        <motion.div
          className="absolute inset-0 origin-top"
          style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}50` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: customEase }}
        />
        <span aria-hidden className="est-pulse" />
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
            ✦ Interactive Estimator
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: customEase }}
              className="text-[32px] md:text-[42px] font-bold text-white tracking-tight uppercase leading-none"
            >
              Get Your Instant Estimate
            </motion.h2>
          </div>
        </div>

        {/* Main Interface Box */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: customEase }}
          className="w-full bg-[#08080a] border border-zinc-800 rounded-2xl flex flex-col md:flex-row relative z-20 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        >

          {/* Left Column: Inputs */}
          <div className="w-full md:w-[55%] border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col">

            {/* 1. What are you building? */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.45, ease: customEase }}
              className="p-8 border-b border-zinc-800"
            >
              <h3 className="text-[14px] font-bold tracking-[0.15em] text-white uppercase mb-5">
                What are you building?
              </h3>
              <div className="space-y-3.5">
                {buildingTypes.map((b) => (
                  <label key={b} onClick={() => setBuilding(b)} className="est-row flex items-center gap-3.5 cursor-pointer group">
                    <div
                      className="w-4 h-4 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300"
                      style={
                        building === b
                          ? { borderColor: GREEN, background: 'rgba(74,222,128,0.1)', boxShadow: `0 0 10px ${GREEN}40` }
                          : { borderColor: '#52525b' }
                      }
                    >
                      {building === b && (
                        <motion.div
                          layoutId="est-radio-building"
                          className="w-2 h-2 rounded-full"
                          style={{ background: GREEN }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </div>
                    <span className="text-[15px] font-medium text-zinc-300 group-hover:text-white transition-colors">
                      {b}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* 2. What features do you need? */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.58, ease: customEase }}
              className="p-8 border-b border-zinc-800"
            >
              <h3 className="text-[14px] font-bold tracking-[0.15em] text-white uppercase mb-5">
                What features do you need?
              </h3>
              <div className="space-y-3.5">
                {featureList.map((f) => {
                  const isSelected = features.includes(f);
                  return (
                    <label key={f} onClick={() => toggleFeature(f)} className="est-row flex items-center gap-3.5 cursor-pointer group">
                      <div
                        className="w-4 h-4 shrink-0 rounded-[4px] flex items-center justify-center border transition-all duration-300"
                        style={
                          isSelected
                            ? { borderColor: GREEN, background: GREEN, boxShadow: `0 0 10px ${GREEN}40` }
                            : { borderColor: '#52525b' }
                        }
                      >
                        {isSelected && <DrawnCheck />}
                      </div>
                      <span className="text-[15px] font-medium text-zinc-300 group-hover:text-white transition-colors">
                        {f}
                      </span>
                    </label>
                  );
                })}
              </div>
            </motion.div>

            {/* 3. How soon do you need it? */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.71, ease: customEase }}
              className="p-8"
            >
              <h3 className="text-[14px] font-bold tracking-[0.15em] text-white uppercase mb-5">
                How soon do you need it?
              </h3>
              <div className="space-y-3.5">
                {timelineList.map((t) => (
                  <label key={t} onClick={() => setTimeline(t)} className="est-row flex items-center gap-3.5 cursor-pointer group">
                    <div
                      className="w-4 h-4 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300"
                      style={
                        timeline === t
                          ? { borderColor: GREEN, background: 'rgba(74,222,128,0.1)', boxShadow: `0 0 10px ${GREEN}40` }
                          : { borderColor: '#52525b' }
                      }
                    >
                      {timeline === t && (
                        <motion.div
                          layoutId="est-radio-timeline"
                          className="w-2 h-2 rounded-full"
                          style={{ background: GREEN }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </div>
                    <span className="text-[15px] font-medium text-zinc-300 group-hover:text-white transition-colors">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Output / Estimate */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.6, ease: customEase }}
            className="w-full md:w-[45%] p-8 bg-[#050506] flex flex-col rounded-r-2xl"
          >
            <div className="text-center mb-6 pt-2">
              <h3 className="text-[14px] font-bold tracking-[0.15em] text-white uppercase mb-2">
                Your Estimate
              </h3>
              <span className="text-[11px] font-bold tracking-[0.15em] text-zinc-500 uppercase block mb-1">
                Your custom quote · based on:
              </span>
            </div>

            {/* Glowing Estimate Card — wears the orbiting energy beam */}
            <div
              className="est-card flex-grow rounded-2xl p-8 relative flex flex-col items-center"
              style={{
                border: `1px solid ${GREEN}`,
                background: 'rgba(74,222,128,0.06)',
                boxShadow: '0 0 40px rgba(74,222,128,0.08)',
              }}
            >
              {/* 🛰️ orbiting beam — same signature as the nav */}
              <span aria-hidden className="est-beam" />

              {/* Star Node */}
              <span className="absolute top-4 right-5 text-lg select-none" style={{ color: GREEN }}>
                ✦
              </span>

              {/* plan name + duration — flip on change */}
              <motion.h4
                key={plan.name}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: customEase }}
                className="text-[28px] font-bold text-white uppercase tracking-tight leading-none mb-1.5"
              >
                {plan.name}
              </motion.h4>

              <motion.span
                key={plan.tagline}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="text-[13px] font-medium mb-3 block"
                style={{ color: GREEN }}
              >
                {plan.tagline}
              </motion.span>

              {/* price — odometer roll */}
              <div className="text-[46px] font-black text-white tracking-tight leading-none mb-2 tabular-nums">
                <PriceTicker value={plan.price} />
              </div>

              <motion.div
                key={plan.duration}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-[13px] font-bold text-zinc-200 tracking-widest uppercase mb-10"
              >
                {plan.duration}
              </motion.div>

              {/* feature list — re-choreographs line by line on plan change */}
              <ul key={plan.name + '-list'} className="space-y-3.5 mb-10 w-full px-2">
                {plan.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 + i * 0.06, ease: customEase }}
                    className="flex items-center gap-3 text-[15px] font-medium text-zinc-200"
                  >
                    <span className="font-bold" style={{ color: GREEN }}>✓</span> {f}
                  </motion.li>
                ))}
              </ul>

              <button
                className="est-btn relative overflow-hidden mt-auto h-[46px] w-full max-w-[220px] rounded-full text-[13px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 text-black border-0 cursor-pointer"
                style={{ background: GREEN }}
                onClick={() =>
                  goToBook({
                    package: plan.name
                      .toLowerCase()
                      .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    price: plan.price,
                    duration: plan.duration,
                    scope: plan.features,
                    building,
                    timeline,
                  })
                }
              >
                <span aria-hidden className="est-btn-shine" />
                <span className="relative z-10">Book A Call</span>
                <svg className="est-btn-arrow relative z-10 w-4 h-4 -mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            <p className="text-center text-zinc-500 text-[12px] font-medium mt-6 leading-relaxed max-w-[280px] mx-auto">
              Your price reflects exactly what you scoped — pay for what you need, nothing more.
              Locked in on a free strategy call.
              <span className="block mt-1.5 font-bold" style={{ color: GREEN }}>
                ⛨ 14 days to launch — or we work free until it's live.
              </span>
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* component-scoped animation engine (transform-only) */}
      <style>{`
        @property --est-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        /* ⚡ spine current pulse */
        .est-pulse {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 24px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #d1ffe3, transparent);
          transform: translateY(-28px);
          animation: est-pulse-run 3.6s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: 1.8s;
        }
        @keyframes est-pulse-run {
          0% { transform: translateY(-28px); opacity: 0; }
          10% { opacity: 1; }
          60%, 100% { transform: translateY(104px); opacity: 1; }
        }

        /* 🛰️ orbiting beam on the estimate card — same masked conic
           technique as the nav, slower + dimmer (supporting role) */
        .est-beam {
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          pointer-events: none;
          padding: 1.5px;
          background: conic-gradient(
            from var(--est-angle),
            transparent 0deg,
            transparent 300deg,
            rgba(74,222,128,0.2) 330deg,
            #4ade80 352deg,
            #d1ffe3 358deg,
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
          animation: est-orbit 7s linear infinite;
        }
        @keyframes est-orbit {
          to { --est-angle: 360deg; }
        }

        /* option rows — subtle slide on hover */
        .est-row { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .est-row:hover { transform: translateX(3px); }

        /* CTA — glow, arrow nudge, shimmer */
        .est-btn { transition: filter 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease; }
        .est-btn:hover {
          filter: brightness(1.08);
          box-shadow: 0 6px 26px rgba(74,222,128,0.45);
        }
        .est-btn:active { transform: scale(0.96); }
        .est-btn-arrow { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .est-btn:hover .est-btn-arrow { transform: translateX(3px); }
        .est-btn-shine {
          position: absolute;
          top: 0; bottom: 0;
          left: -70%;
          width: 45%;
          transform: skewX(-20deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: est-shine-run 4.8s ease-in-out infinite;
          animation-delay: 2.4s;
        }
        @keyframes est-shine-run {
          0%, 65% { left: -70%; }
          90%, 100% { left: 140%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .est-pulse, .est-beam, .est-btn-shine { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

/* keep the existing import name in App.tsx working */
export const Estimator = InteractiveEstimator;
