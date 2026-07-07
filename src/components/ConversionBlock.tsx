const GREEN = '#4ade80';

/* ------------------------------------------------------------------ */
/*  Final CTA — big green pill + two-line reassurance subtext.         */
/*  Sits right below the FAQ's terminal dot, closing the page.         */
/* ------------------------------------------------------------------ */

export const ConversionBlock = () => (
  <section id="book" className="bg-black relative text-center px-6 font-sans select-none">
    <div className="max-w-xl mx-auto relative z-20 pt-6 pb-28 lg:pt-10 lg:pb-36">
      <button
        className="inline-flex items-center justify-center gap-3 rounded-full border-0 cursor-pointer px-10 sm:px-14 h-[64px] sm:h-[72px] text-black font-extrabold text-[22px] sm:text-[26px] tracking-tight transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: GREEN, boxShadow: '0 10px 40px rgba(74,222,128,0.3)' }}
      >
        <span>BOOK YOUR FREE CALL</span>
        <svg
          className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <p className="mt-6 text-[17px] sm:text-[18px] text-zinc-200 leading-relaxed">
        Free · 30 minutes · No commitment
        <br />
        Just bring your idea
      </p>
    </div>
  </section>
);
