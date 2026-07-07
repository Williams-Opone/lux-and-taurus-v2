import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { subscribeProjects, ensureProjectsFetch, readProjectsCache, type ApiProject } from '../projectsStore';
import { ScaleFrame } from './ScaleFrame';

const GREEN = '#4ade80';
const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Portfolio                                                          */
/* ------------------------------------------------------------------ */

const fallbackProjects = [
  {
    id: '001',
    title: 'FITTRACK',
    sub: 'SaaS MVP · 14 days · $2,500',
    res: 'Result: Raised $400K',
    q: 'Best money I ever spent on my startup.',
    a: 'Sarah Chen',
    url: 'fittrack.com',
    img: '/screens/fittrack.png',
  },
  {
    id: '002',
    title: 'NOMADPAY',
    sub: 'Payments · 9 days · $1,500',
    res: 'Result: $50K/mo',
    q: 'Quoted $10K elsewhere.',
    a: 'Marcus Lee',
    url: 'nomadpay.com',
    img: '/screens/nomadpay.png',
  },
  {
    id: '003',
    title: 'CLEARBOOKS',
    sub: 'Bookkeeping · 21 days · $3,900',
    res: 'Result: 3,000+ users',
    q: 'Zero surprises.',
    a: 'Priya Sharma',
    url: 'clearbooks.com',
    img: '/screens/clearbooks.png',
  },
];

/* --------------------------- count-up stat --------------------------- */

const CountUp = ({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, prefix, suffix]);

  return <span ref={ref}>{`${prefix}${(0).toFixed(decimals)}${suffix}`}</span>;
};

/* ------------------------- pipeline pieces ------------------------- */

const Pipeline = ({
  d,
  delay = 0,
  pulseDur = 3.5,
  pulseBegin = '1.8s',
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
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: 'easeInOut', delay }}
    />
    <circle r="4" fill="#d1ffe3" opacity="0.9">
      <animateMotion dur={`${pulseDur}s`} repeatCount="indefinite" begin={pulseBegin} path={d} />
    </circle>
  </>
);

const ArrowHead = ({ points, delay }: { points: string; delay: number }) => (
  <motion.polygon
    points={points}
    fill="currentColor"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.3, delay }}
  />
);

/* ----------------------------- pieces ----------------------------- */

const BrowserCard = ({
  img,
  title,
  url,
  from,
}: {
  img: string;
  title: string;
  url: string;
  from: 'left' | 'right';
}) => {
  const displayUrl = url ? url.replace(/^https?:\/\//, '').split('/')[0] : '';
  return (
  <motion.div
    initial={{ opacity: 0, y: 40, x: from === 'left' ? -30 : 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 1.2, ease: EASE }}
    className="relative group will-change-transform"
  >
    {/* Persistent deep green aura matching the image */}
    <div className="absolute inset-0 -m-6 bg-[#4ade80] opacity-[0.15] blur-[40px] pointer-events-none rounded-[3rem] transition-opacity duration-700 group-hover:opacity-[0.25]" />

    <div className="w-full rounded-xl overflow-hidden bg-[#0a0a0c] border border-zinc-800/80 shadow-[0_30px_80px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-2 group-hover:border-[#4ade80]/50 group-hover:shadow-[0_40px_100px_rgba(74,222,128,0.2)]">

      {/* macOS dark chrome */}
      <div className="h-10 bg-[#121214] border-b border-zinc-800/80 flex items-center px-4 gap-2.5 select-none relative z-20">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-zinc-700 transition-colors group-hover:bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-zinc-700 transition-colors delay-75 group-hover:bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-zinc-700 transition-colors delay-150 group-hover:bg-[#28c840]" />
        </div>
        <div className="mx-auto min-w-0 w-48 sm:w-64 bg-[#0a0a0c] rounded-md py-[5px] px-3 flex items-center justify-center gap-2 shadow-inner border border-zinc-800/60">
          <span className="text-[10px] text-zinc-600">🔒</span>
          <span className="text-[11px] text-zinc-400 font-medium tracking-wide truncate">{displayUrl}</span>
        </div>
      </div>

      {/* Image Container - changed to 16/9 for wider look */}
      <div className="aspect-[16/9] w-full bg-black overflow-hidden relative">
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />
        <img
          src={img}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-[1.05]"
        />
      </div>
    </div>
  </motion.div>
  );
};

const CaseCopy = ({ c, from }: { c: any; from: 'left' | 'right' }) => (
  <div className="space-y-4 text-left will-change-transform">
    <div className="space-y-1 overflow-hidden">
      <motion.span
        initial={{ y: '100%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: EASE }}
        className="font-mono text-[11px] text-[#4ade80] tracking-[0.25em] block font-bold"
      >
        {c.id}
      </motion.span>
      <motion.h3
        initial={{ y: '100%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="text-[28px] sm:text-[32px] font-extrabold text-white tracking-tight uppercase leading-none"
      >
        {c.title}
      </motion.h3>
    </div>
    <motion.div
      initial={{ opacity: 0, x: from === 'left' ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1, delay: 0.2, ease: EASE }}
      className="space-y-1"
    >
      <p className="text-zinc-300 text-[16px] font-medium tracking-wide">{c.sub}</p>
      {c.res && (
        <div className="text-[13px] font-bold text-white bg-[#4ade80]/10 border border-[#4ade80]/20 px-3 py-1.5 inline-flex items-center gap-2 mt-2">
          <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse" />
          {c.res}
        </div>
      )}
    </motion.div>

    {c.q && c.a && (
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1, delay: 0.3, ease: EASE }}
        className="pt-2 border-l border-zinc-800 pl-4"
      >
        <p className="text-zinc-400 text-[15px] italic leading-snug">"{c.q}"</p>
        <span className="text-[11px] tracking-widest uppercase font-bold text-zinc-500 block mt-1.5">— {c.a}</span>
      </motion.div>
    )}

    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1, delay: 0.4, ease: EASE }}
      className="pt-3"
    >
      <a href={c.url.startsWith('http') ? c.url : `https://${c.url}`} target="_blank" rel="noreferrer" className="group relative bg-transparent border-0 p-0 cursor-pointer text-[13px] font-bold tracking-[0.15em] text-[#4ade80] flex items-center gap-2 transition-colors hover:text-white inline-flex no-underline">
        VIEW LIVE
        <svg className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </a>
    </motion.div>
  </div>
);

/* HUD branch */
const Branch = ({
  side,
  top,
  lineW,
  delay,
  children,
}: {
  side: 'left' | 'right';
  top: number;
  lineW: number;
  delay: number;
  children: React.ReactNode;
}) => (
  <div
    className={`absolute flex items-center ${
      side === 'right' ? 'left-1/2' : 'right-1/2 justify-end'
    }`}
    style={{ top }}
  >
    {side === 'left' && (
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: delay + 0.25, duration: 0.5, ease: EASE }}
      >
        {children}
      </motion.div>
    )}
    {side === 'left' && (
      <motion.div
        className="w-[9px] h-[9px] rounded-full shrink-0"
        style={{ background: GREEN, boxShadow: `0 0 7px ${GREEN}` }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: delay + 0.18, duration: 0.35, ease: EASE }}
      />
    )}
    <motion.div
      className={`h-[2.5px] ${side === 'right' ? 'origin-left' : 'origin-right'}`}
      style={{ background: GREEN, width: lineW }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.45, ease: EASE }}
    />
    {side === 'right' && (
      <motion.div
        className="w-[9px] h-[9px] rounded-full shrink-0"
        style={{ background: GREEN, boxShadow: `0 0 7px ${GREEN}` }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: delay + 0.18, duration: 0.35, ease: EASE }}
      />
    )}
    {side === 'right' && (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: delay + 0.25, duration: 0.5, ease: EASE }}
      >
        {children}
      </motion.div>
    )}
  </div>
);

/* ------------------------------ main ------------------------------ */

/* map raw API rows → the shape the cards render */
const mapProjects = (data: ApiProject[]) =>
  data.map((p, i) => ({
    id: String(i + 1).padStart(3, '0'),
    title: p.title,
    sub: p.description,
    res: p.tech_stack,
    q: null as string | null,
    a: null as string | null,
    url: p.live_link || '#',
    img: p.image_url || '/screens/fittrack.png',
  }));

export const Portfolio = () => {
  /* INSTANT initial state: cached DB projects if we have them
     (repeat visits = real projects on first paint, zero flash);
     hardcoded fallback only on a true first-ever visit */
  const [projects, setProjects] = useState<any[]>(() => {
    const cached = readProjectsCache();
    return cached ? mapProjects(cached) : fallbackProjects;
  });

  useEffect(() => {
    /* re-kick the fetch campaign (no-op if the eager one is running
       or already succeeded — but restarts it if it burned out on a
       cold backend), then subscribe for whenever data lands. */
    ensureProjectsFetch();
    const unsubscribe = subscribeProjects((data) => {
      setProjects(mapProjects(data));
    });
    return unsubscribe;
  }, []);

  return (
    <section
      id="vault"
      className="bg-black relative overflow-hidden text-left font-sans select-none pb-24 lg:pb-40"
    >
      <div className="px-3 sm:px-6">
        <ScaleFrame designWidth={976} className="relative">

          {/* ============================================================ */}
          {/* STATS HUD                                                     */}
          {/* ============================================================ */}
          <div className="relative h-[225px] mb-20 z-20">
            {/* spine — starts from top and draws down deep into the first project */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-[-220px] w-[3.5px] overflow-hidden">
              <motion.div
                className="absolute inset-0 origin-top"
                style={{ background: GREEN, boxShadow: '0 0 10px rgba(74,222,128,0.35)' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.2, ease: EASE }}
              />
              <span aria-hidden className="pf-pulse" />
            </div>

            <Branch side="right" top={42} lineW={74} delay={0.3}>
              <span className="pl-3.5 text-[24px] font-bold text-white tracking-tight whitespace-nowrap leading-none block">
                <CountUp to={12} /> day average
              </span>
            </Branch>

            <Branch side="left" top={68} lineW={104} delay={0.42}>
              <span className="pr-3.5 text-[24px] font-bold text-white tracking-tight whitespace-nowrap leading-none block">
                <CountUp to={47} suffix="+" /> builds
              </span>
            </Branch>

            <Branch side="right" top={104} lineW={74} delay={0.54}>
              <div className="pl-3.5 flex flex-col leading-[1.2] -mt-[26px]">
                <span className="text-[24px] font-bold text-white tracking-tight whitespace-nowrap">
                  <CountUp to={2.1} decimals={1} prefix="$" suffix="M+" /> raised
                </span>
                <span className="text-[24px] font-bold text-white tracking-tight whitespace-nowrap">
                  by clients
                </span>
              </div>
            </Branch>

            <Branch side="left" top={132} lineW={104} delay={0.66}>
              <span className="pr-3.5 text-[24px] font-bold text-white tracking-tight whitespace-nowrap leading-none block">
                <CountUp to={98} suffix="%" /> on-time
              </span>
            </Branch>
          </div>

          {/* ============================================================ */}
          {/* SECTION TITLE                                                 */}
          {/* ============================================================ */}
          <div className="relative flex justify-center mt-40 mb-16 z-20">
            <motion.div
              initial={{ y: 20, opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="bg-black px-8 py-2 text-center"
            >
              <span className="text-[#4ade80] text-[12px] font-bold tracking-[0.2em] uppercase block mb-3">Our Portfolio</span>
              <h2 className="text-[32px] md:text-[42px] font-bold text-white tracking-tight uppercase leading-none">
                Selected Projects
              </h2>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* CASE ROWS + SNAKE PIPELINES                                   */}
          {/* ============================================================ */}
          <div className="relative space-y-28">

            {/* PIPELINE 1 - long descent from the stats HUD into card 1 */}
            <div className="absolute left-[340px] -top-[140px] w-[170px] h-[320px] pointer-events-none z-10">
              <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]" viewBox="0 0 170 320" fill="none" style={{ color: GREEN }}>
                <Pipeline d="M 148 0 V 240 Q 148 295 95 295 H 54" delay={0.15} pulseDur={3.6} pulseBegin="1.4s" />
                <ArrowHead points="50,295 66,288 66,302" delay={1.2} />
              </svg>
            </div>

            {projects.map((c, idx) => {
              const isEven = idx % 2 === 0;
              const isLast = idx === projects.length - 1;

              return (
                <div key={c.id} className="relative grid grid-cols-12 gap-x-12 items-center">

                  {/* Dynamic Pipeline Logic */}
                  {!isLast && isEven && (
                    <div className="absolute left-[190px] top-full w-[420px] h-[270px] pointer-events-none z-10">
                      <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]" viewBox="0 0 420 270" fill="none" style={{ color: GREEN }}>
                        <Pipeline
                          d="M 10 0 V 55 Q 10 112 67 112 H 290 Q 345 112 345 162 V 212 Q 345 262 393 262"
                          pulseDur={4.2}
                          pulseBegin={`${2.2 + (idx * 0.5)}s`}
                        />
                        <ArrowHead points="399,262 383,255 383,269" delay={1.15} />
                      </svg>
                    </div>
                  )}

                  {!isLast && !isEven && (
                    <div className="absolute left-[349px] top-full w-[340px] h-[270px] pointer-events-none z-10">
                      <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]" viewBox="0 0 340 270" fill="none" style={{ color: GREEN }}>
                        <Pipeline
                          d="M 331 0 V 55 Q 331 112 274 112 H 150 Q 95 112 95 162 V 212 Q 95 262 47 262"
                          pulseDur={4.2}
                          pulseBegin={`${1.1 + (idx * 0.5)}s`}
                        />
                        <ArrowHead points="41,262 57,255 57,269" delay={1.15} />
                      </svg>
                    </div>
                  )}

                  {isLast && isEven && (
                    <div className="absolute left-[190px] top-full w-[320px] h-[170px] pointer-events-none z-10">
                      <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]" viewBox="0 0 320 170" fill="none" style={{ color: GREEN }}>
                        <Pipeline
                          d="M 10 0 V 45 Q 10 100 65 100 H 245 Q 298 100 298 150 V 170"
                          pulseDur={3.4}
                          pulseBegin="1.8s"
                        />
                      </svg>
                    </div>
                  )}

                  {isLast && !isEven && (
                    <div className="absolute right-[190px] top-full w-[320px] h-[170px] pointer-events-none z-10">
                      <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]" viewBox="0 0 320 170" fill="none" style={{ color: GREEN }}>
                        <Pipeline
                          d="M 310 0 V 45 Q 310 100 255 100 H 75 Q 22 100 22 150 V 170"
                          pulseDur={3.4}
                          pulseBegin="1.8s"
                        />
                      </svg>
                    </div>
                  )}

                  {/* CARDS — same 12-col structure on every device */}
                  <div className={isEven ? 'col-span-5' : 'col-span-6'}>
                    {isEven ? (
                      <BrowserCard img={c.img} title={c.title} url={c.url} from="left" />
                    ) : (
                      <CaseCopy c={c} from="left" />
                    )}
                  </div>

                  <div className={isEven ? 'col-span-6 col-start-7' : 'col-span-5 col-start-8'}>
                    {isEven ? (
                      <CaseCopy c={c} from="right" />
                    ) : (
                      <BrowserCard img={c.img} title={c.title} url={c.url} from="right" />
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </ScaleFrame>
      </div>

      <style>{`
        .pf-pulse {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 28px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #d1ffe3, transparent);
          transform: translateY(-32px);
          animation: pf-pulse-run 3.4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: 1.6s;
        }
        @keyframes pf-pulse-run {
          0% { transform: translateY(-32px); opacity: 0; }
          10% { opacity: 1; }
          60%, 100% { transform: translateY(320px); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pf-pulse { animation: none; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
