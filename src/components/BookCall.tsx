import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE } from '../config';
import { goHome, readBookingIntent, type BookingIntent } from '../router';

const GREEN = '#4ade80';
const customEase = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Book A Call — the conversion endpoint of the circuit.              */
/*  · posts {name, email, phone, projectType, message} to              */
/*    POST /api/contact (Flask saves the Lead + emails the brief)      */
/*  · left: mission intake form · right: what happens next             */
/*  · full submit lifecycle: idle → sending → success / error          */
/*  · success state: radar-ring confirmation (the terminal-dot motif)  */
/*  Signature package: spine + pulse, blur-unmask header, staggered    */
/*  entrance, green-glow focus states, shimmer CTA.                    */
/* ------------------------------------------------------------------ */

const PROJECT_TYPES = ['Launch Sprint', 'Core MVP', 'Pro MVP', 'Not sure yet'];

/* anchor pricing per package — shown live in the banner */
const PACKAGE_INFO: Record<string, { price: number; duration: string; tagline: string }> = {
  'Launch Sprint': { price: 1500, duration: 'ship in 7 days', tagline: 'Validate your idea' },
  'Core MVP': { price: 2500, duration: 'ship in 14 days', tagline: 'Get first paying users' },
  'Pro MVP': { price: 3900, duration: 'ship in 14 days', tagline: 'Launch loaded' },
};

const STEPS = [
  { n: '01', t: 'We read your brief', d: 'Your message lands in our inbox instantly. We review it before the call.' },
  { n: '02', t: '30-min strategy call', d: 'We scope your MVP together — features, timeline, fixed price. No pitch deck.' },
  { n: '03', t: 'Build starts in 48h', d: 'You approve the scope, book your slot, and get daily progress from day one.' },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputCls =
  'w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-3 text-[15px] text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-[#4ade80]/70 focus:shadow-[0_0_16px_rgba(74,222,128,0.15)]';

export const BookCall = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: 'Core MVP', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [quote, setQuote] = useState<BookingIntent | null>(null);

  /* prefill from the estimator / pricing cards (booking intent) */
  useEffect(() => {
    const intent = readBookingIntent();
    if (!intent) return;
    setQuote(intent);

    const pkg = PROJECT_TYPES.find(
      (t) => t.toLowerCase() === (intent.package ?? '').toLowerCase()
    );

    /* estimator quotes get a pre-written brief so the price is
       recorded in the lead + email even if they only add one line */
    let message = '';
    if (intent.price) {
      const lines = [
        `— Estimator quote: $${intent.price.toLocaleString()} (${intent.package ?? 'custom'}${
          intent.duration ? ` · ${intent.duration.toLowerCase()}` : ''
        }) —`,
      ];
      if (intent.building) lines.push(`Building: ${intent.building}`);
      if (intent.timeline) lines.push(`Timeline: ${intent.timeline}`);
      if (intent.scope?.length) lines.push(`Scope: ${intent.scope.join(', ')}`);
      lines.push('', 'My idea: ');
      message = lines.join('\n');
    }

    setForm((p) => ({
      ...p,
      projectType: pkg ?? p.projectType,
      message: message || p.message,
    }));
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    /* stamp the price into the message so it's recorded in the Lead
       row + MISSION_INTAKE email (unless the estimator already did) */
    const isQuoteActive =
      quote?.price && (quote.package ?? '').toLowerCase() === form.projectType.toLowerCase();
    const info = PACKAGE_INFO[form.projectType];
    const priceLine = isQuoteActive
      ? '' /* estimator prefill already contains the quote line */
      : info
        ? `— Package: ${form.projectType} ($${info.price.toLocaleString()} · ${info.duration}) —\n\n`
        : '';
    const payload = {
      ...form,
      message: priceLine && !form.message.startsWith('— ') ? priceLine + form.message : form.message,
    };

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="book" className="bg-black relative text-left font-sans select-none overflow-hidden pb-28 min-h-screen">
      {/* ---------- page header: logo home-link + back ---------- */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: customEase }}
        className="relative z-30 max-w-[936px] mx-auto px-4 sm:px-6 lg:px-0 pt-5 sm:pt-6 flex items-center justify-between gap-3"
      >
        <button
          onClick={goHome}
          className="relative bg-transparent border-0 p-0 cursor-pointer flex items-center gap-2 sm:gap-2.5 select-none group/logo min-w-0"
        >
          {/* breathing glow behind the mark — same as the navbar */}
          <span aria-hidden className="bk-logo-glow" />
          {/* same image treatment as the general navbar */}
          <img
            src="/landtnoblogo.png"
            alt="Lux & Taurus Logo"
            className="w-[26px] h-[30px] sm:w-[30px] sm:h-[35px] shrink-0 object-contain relative z-10 mix-blend-screen transition-transform duration-300 group-hover/logo:scale-110"
          />
          <span className="relative z-10 text-white font-extrabold text-[15px] sm:text-[18px] tracking-tight whitespace-nowrap">
            LUX <span style={{ color: GREEN }}>&amp;</span> TAURUS
          </span>
        </button>
        <button
          onClick={goHome}
          className="bg-transparent border-0 p-0 cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-[13.5px] font-semibold tracking-[0.04em] transition-colors duration-200 hover:text-white shrink-0"
          style={{ color: GREEN }}
        >
          <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden min-[420px]:inline">Back to site</span>
          <span className="min-[420px]:hidden">Back</span>
        </button>
      </motion.header>

      {/* inlet spine dropping from the page header */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[76px] h-[92px] w-[3.5px] z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-top"
          style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}50` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
        />
        <span aria-hidden className="bk-pulse" />
      </div>

      <div className="max-w-[936px] mx-auto relative px-4 sm:px-6 lg:px-0 pt-[84px] sm:pt-[110px]">
        {/* header */}
        <div className="text-center mb-8 sm:mb-12 relative z-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: customEase }}
            className="text-[12px] font-bold tracking-[0.2em] uppercase block mb-3"
            style={{ color: GREEN }}
          >
            ✦ Final Step
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: customEase }}
              className="text-[26px] sm:text-[32px] md:text-[42px] font-bold text-white tracking-tight uppercase leading-tight sm:leading-none"
            >
              Book Your Free Call
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-zinc-400 text-[14.5px] sm:text-[16px] mt-3 sm:mt-4 px-2"
          >
            Free · 30 minutes · No commitment. Just bring your idea.
          </motion.p>
        </div>

        {/* frame */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: customEase }}
          className="w-full bg-[#08080a] border border-zinc-800 rounded-2xl flex flex-col md:flex-row relative z-20 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* LEFT — intake form / success state */}
          <div className="w-full md:w-[58%] border-b md:border-b-0 md:border-r border-zinc-800 p-5 sm:p-8 md:p-10">
            {status === 'success' ? (
              /* ---------- success ---------- */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: customEase }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div
                  className="relative w-[64px] h-[64px] rounded-full grid place-items-center mb-6"
                  style={{ background: 'rgba(74,222,128,0.12)', border: `1.5px solid ${GREEN}` }}
                >
                  <span aria-hidden className="bk-ring" />
                  <span aria-hidden className="bk-ring" style={{ animationDelay: '1.4s' }} />
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5">
                    <motion.path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                    />
                  </svg>
                </div>
                <h3 className="text-[24px] font-bold text-white tracking-tight mb-2">Brief received.</h3>
                <p className="text-zinc-400 text-[15px] leading-relaxed max-w-[340px]">
                  We're reading it now — expect a reply within 24 hours to lock your call time.
                  Check your inbox ({form.email}).
                </p>
              </motion.div>
            ) : (
              /* ---------- form ---------- */
              <form onSubmit={submit} className="space-y-5">
                {/* 💰 LIVE price banner — reflects the selected package.
                    If the visitor arrived with an estimator quote AND the
                    selected package still matches it, show their custom
                    price; otherwise show the package's anchor price. */}
                {(() => {
                  const isQuoteActive =
                    quote?.price &&
                    (quote.package ?? '').toLowerCase() === form.projectType.toLowerCase();
                  const info = PACKAGE_INFO[form.projectType];
                  if (!isQuoteActive && !info) {
                    /* "Not sure yet" — no fixed price */
                    return (
                      <div
                        key="unsure"
                        className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3 border-zinc-800 bg-[#0a0a0c]"
                      >
                        <div className="min-w-0">
                          <span className="block text-[10.5px] font-bold tracking-[0.15em] text-zinc-400 uppercase">
                            Your package
                          </span>
                          <span className="block text-[15px] font-bold text-white">
                            Not sure yet <span className="text-zinc-400 font-medium">· we'll scope it together</span>
                          </span>
                        </div>
                        <span className="text-[20px] font-black tracking-tight shrink-0 text-zinc-500">
                          $1,500+
                        </span>
                      </div>
                    );
                  }
                  const price = isQuoteActive ? quote!.price! : info.price;
                  const label = isQuoteActive ? 'Your estimator quote' : 'Your package';
                  const sub = isQuoteActive
                    ? (quote!.duration ?? '').toLowerCase() || info?.duration
                    : `${info.tagline} · ${info.duration}`;
                  return (
                    <motion.div
                      key={form.projectType + String(isQuoteActive)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: customEase }}
                      className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
                      style={{
                        borderColor: 'rgba(74,222,128,0.5)',
                        background: 'rgba(74,222,128,0.06)',
                        boxShadow: '0 0 24px rgba(74,222,128,0.08)',
                      }}
                    >
                      <div className="min-w-0">
                        <span className="block text-[10.5px] font-bold tracking-[0.15em] text-zinc-400 uppercase">
                          {label}
                        </span>
                        <span className="block text-[15px] font-bold text-white truncate">
                          {form.projectType}
                          <span className="text-zinc-400 font-medium"> · {sub}</span>
                        </span>
                      </div>
                      <span
                        className="text-[24px] font-black tracking-tight tabular-nums shrink-0"
                        style={{ color: GREEN }}
                      >
                        ${price.toLocaleString()}
                      </span>
                    </motion.div>
                  );
                })()}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-bold tracking-[0.12em] text-zinc-400 uppercase mb-2">
                      Name *
                    </label>
                    <input required value={form.name} onChange={set('name')} placeholder="Jane Founder" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold tracking-[0.12em] text-zinc-400 uppercase mb-2">
                      Email *
                    </label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="jane@startup.com" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold tracking-[0.12em] text-zinc-400 uppercase mb-2">
                    Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span>
                  </label>
                  <input value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" className={inputCls} />
                </div>

                <div>
                  <label className="block text-[12px] font-bold tracking-[0.12em] text-zinc-400 uppercase mb-2">
                    Which package fits?
                  </label>
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5">
                    {PROJECT_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, projectType: t }))}
                        className="rounded-lg border px-3 py-2.5 text-[13.5px] font-semibold transition-all duration-300 cursor-pointer text-left"
                        style={
                          form.projectType === t
                            ? { borderColor: GREEN, background: 'rgba(74,222,128,0.08)', color: '#fff', boxShadow: '0 0 14px rgba(74,222,128,0.12)' }
                            : { borderColor: '#27272a', background: 'transparent', color: '#a1a1aa' }
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold tracking-[0.12em] text-zinc-400 uppercase mb-2">
                    Your idea, in a few lines *
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={set('message')}
                    rows={4}
                    placeholder="What are you building, who is it for, and what's the one feature it can't launch without?"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-[13px] font-semibold text-red-400/90">
                    Something broke on our end — try again, or email c@luxandtaurus.com directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bk-btn relative overflow-hidden w-full h-[52px] rounded-full text-[15px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 text-black border-0 cursor-pointer disabled:cursor-wait"
                  style={{ background: GREEN, boxShadow: '0 8px 28px rgba(74,222,128,0.25)' }}
                >
                  <span aria-hidden className="bk-btn-shine" />
                  <span className="relative z-10">
                    {status === 'sending' ? 'Transmitting…' : 'Send Brief + Book Call'}
                  </span>
                  {status !== 'sending' && (
                    <svg className="bk-btn-arrow relative z-10 w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT — what happens next */}
          <div className="w-full md:w-[42%] p-5 sm:p-8 md:p-10 bg-[#050506] flex flex-col">
            <h3 className="text-[14px] font-bold tracking-[0.15em] text-white uppercase mb-7">
              What happens next
            </h3>

            <div className="space-y-7 flex-grow">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: 0.5 + i * 0.15, ease: customEase }}
                  className="flex gap-4"
                >
                  <span className="font-mono text-[13px] font-bold shrink-0 mt-0.5" style={{ color: GREEN }}>
                    {s.n}
                  </span>
                  <div>
                    <p className="text-[15.5px] font-bold text-white leading-snug">{s.t}</p>
                    <p className="text-[14px] text-zinc-400 leading-relaxed mt-1">{s.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1, ease: customEase }}
              className="mt-8 pt-6 border-t border-zinc-800/80"
            >
              <p className="text-[13.5px] font-bold leading-relaxed" style={{ color: GREEN }}>
                ⛨ 14 days to launch — or we work free until it's live.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* component-scoped animation engine (transform-only) */}
      <style>{`
        .bk-pulse {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 24px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #d1ffe3, transparent);
          transform: translateY(-28px);
          animation: bk-pulse-run 3.6s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: 2s;
        }
        @keyframes bk-pulse-run {
          0% { transform: translateY(-28px); opacity: 0; }
          10% { opacity: 1; }
          60%, 100% { transform: translateY(104px); opacity: 1; }
        }

        /* breathing glow behind the logo mark — same as the navbar */
        .bk-logo-glow {
          position: absolute;
          left: -6px;
          top: 50%;
          width: 44px;
          height: 44px;
          transform: translateY(-50%);
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(74,222,128,0.28) 0%, transparent 70%);
          animation: bk-breathe 3.2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes bk-breathe {
          0%, 100% { opacity: 0.5; transform: translateY(-50%) scale(1); }
          50% { opacity: 1; transform: translateY(-50%) scale(1.25); }
        }

        .bk-ring {
          position: absolute;
          inset: -1.5px;
          border-radius: 9999px;
          border: 2px solid rgba(74,222,128,0.7);
          animation: bk-ring-run 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          opacity: 0;
        }
        @keyframes bk-ring-run {
          0% { transform: scale(1); opacity: 0.8; }
          70%, 100% { transform: scale(2.1); opacity: 0; }
        }

        .bk-btn { transition: filter 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease; }
        .bk-btn:hover:not(:disabled) {
          filter: brightness(1.08);
          box-shadow: 0 8px 36px rgba(74,222,128,0.45);
        }
        .bk-btn:active:not(:disabled) { transform: scale(0.98); }
        .bk-btn:disabled { filter: saturate(0.6) brightness(0.85); }
        .bk-btn-arrow { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .bk-btn:hover .bk-btn-arrow { transform: translateX(3px); }
        .bk-btn-shine {
          position: absolute;
          top: 0; bottom: 0;
          left: -70%;
          width: 45%;
          transform: skewX(-20deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: bk-shine-run 5.2s ease-in-out infinite;
          animation-delay: 3.2s;
        }
        @keyframes bk-shine-run {
          0%, 68% { left: -70%; }
          92%, 100% { left: 140%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bk-pulse, .bk-ring, .bk-btn-shine, .bk-logo-glow { animation: none !important; }
        }
      `}</style>
    </section>
  );
};
