const GREEN = '#4ade80';

/* ------------------------------------------------------------------ */
/*  Footer — thin green rule with a centered ✦ diamond node (the       */
/*  pipeline's final flourish), wordmark + nav left, contact right.    */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: 'WORK', href: '#vault' },
  { label: 'METHOD', href: '#process' },
  { label: 'PLANS', href: '#pricing' },
  { label: 'CONTACT', href: '#/book' },
];

export const BaseFooter = () => (
  <footer className="bg-black relative font-sans select-none">
    {/* green rule with centered diamond node */}
    <div className="relative h-px" style={{ background: 'rgba(74,222,128,0.55)' }}>
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[13px] h-[13px] rotate-45"
        style={{
          background: GREEN,
          boxShadow: `0 0 12px ${GREEN}`,
          borderRadius: '2px',
        }}
      />
    </div>

    <div className="max-w-[880px] mx-auto px-6 pt-12 pb-14">
      <div className="flex flex-col sm:flex-row justify-between gap-10 sm:gap-6 text-center sm:text-left">
        {/* LEFT — logo + wordmark (same treatment as the navbar) + nav */}
        <div className="space-y-5">
          <div className="relative inline-flex items-center gap-2.5 select-none group/logo">
            {/* breathing glow behind the mark — same as the navbar */}
            <span aria-hidden className="ft-logo-glow" />
            <img
              src="../landtnoblogo.png"
              alt="Lux & Taurus Logo"
              className="w-[30px] h-[35px] shrink-0 object-contain relative z-10 mix-blend-screen transition-transform duration-300 group-hover/logo:scale-110"
            />
            <span className="relative z-10 text-[19px] font-extrabold text-white tracking-tight whitespace-nowrap">
              LUX <span style={{ color: GREEN }}>&amp;</span> TAURUS
            </span>
          </div>
          <nav className="flex items-center justify-center sm:justify-start gap-7">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[14px] font-semibold tracking-[0.06em] text-white no-underline transition-colors hover:text-[#4ade80]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* RIGHT — contact + legal */}
        <div className="space-y-3 sm:text-right">
          <div className="flex items-center justify-center sm:justify-end gap-3.5">
          <a
  href="mailto:contact@luxandtaurus.com?subject=Inquiry%20from%20Website&body=Hi%20Lux%20%26%20Taurus%2C%20"
  className="text-[15px] text-zinc-100 no-underline transition-colors hover:text-[#4ade80]"
>
  contact@luxandtaurus.com
</a>
            {/* Twitter / X */}
            <a
              href="#"
              aria-label="Twitter"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 4.9c-.8.4-1.7.6-2.6.8a4.5 4.5 0 0 0 2-2.5c-.9.5-1.9.9-2.9 1.1a4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 2.5 3.7a4.5 4.5 0 0 0 1.4 6A4.4 4.4 0 0 1 1.8 9v.1a4.5 4.5 0 0 0 3.6 4.4c-.7.2-1.4.2-2 .1a4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 18.6a12.7 12.7 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2.3z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.2zM5.2 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7 20.4H3.4V9H7v11.4z" />
              </svg>
            </a>
          </div>

          <p className="text-[14px] text-zinc-400">© 2026 Lux &amp; Taurus</p>
          <p className="text-[14px] text-zinc-500">
            <a href="#/privacy" className="text-zinc-500 no-underline transition-colors hover:text-zinc-300">
              Privacy
            </a>
            <span className="mx-1.5">·</span>
            <a href="#/terms" className="text-zinc-500 underline underline-offset-2 decoration-zinc-600 transition-colors hover:text-zinc-300">
              Terms
            </a>
          </p>
        </div>
      </div>
    </div>

    {/* component-scoped styles — same breathing glow as the navbar */}
    <style>{`
      .ft-logo-glow {
        position: absolute;
        left: -6px;
        top: 50%;
        width: 44px;
        height: 44px;
        transform: translateY(-50%);
        border-radius: 9999px;
        background: radial-gradient(circle, rgba(74,222,128,0.28) 0%, transparent 70%);
        animation: ft-breathe 3.2s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes ft-breathe {
        0%, 100% { opacity: 0.5; transform: translateY(-50%) scale(1); }
        50% { opacity: 1; transform: translateY(-50%) scale(1.25); }
      }
      @media (prefers-reduced-motion: reduce) {
        .ft-logo-glow { animation: none; }
      }
    `}</style>
  </footer>
);
