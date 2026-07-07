import { motion } from 'framer-motion';
import { goHome } from '../router';

const GREEN = '#4ade80';
const customEase = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Legal pages — Privacy Policy & Terms of Service.                   */
/*  Shared layout: navbar-style header (logo + back), title on the     */
/*  spine, readable long-form sections in the site's dark style.       */
/* ------------------------------------------------------------------ */

type Section = { h: string; body: string[] };

const LAST_UPDATED = 'January 2026';

/* ----------------------------- content ----------------------------- */

const PRIVACY: Section[] = [
  {
    h: '1. What we collect',
    body: [
      'When you book a call or contact us, we collect the information you give us: your name, email address, phone number (optional), the package you selected or the quote you scoped in our estimator, and your project message.',
      'We do not collect payment card details through this website. Payments are arranged separately after your scoping call.',
    ],
  },
  {
    h: '2. How we use it',
    body: [
      'We use your information for exactly one purpose: to respond to your inquiry, prepare for your strategy call, and — if we work together — deliver your project.',
      'We do not sell, rent, or share your personal information with third parties for marketing. Ever.',
    ],
  },
  {
    h: '3. Where it lives',
    body: [
      'Your inquiry is stored in our secure database (hosted on Neon, with encryption in transit and at rest) and a copy is delivered to our team inbox via email.',
      'Our website is hosted on Vercel. Standard server logs (IP address, browser type, pages visited) may be processed by our hosting provider for security and performance purposes.',
    ],
  },
  {
    h: '4. Local storage',
    body: [
      'This site does not use tracking cookies or third-party analytics. We use your browser\'s local storage for functional purposes only: caching our portfolio for faster loading and carrying your estimator quote to the booking form. This data never leaves your device.',
    ],
  },
  {
    h: '5. Your rights',
    body: [
      'You can request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it entirely — at any time, no questions asked.',
      'Email contact@luxandtaurus.com and we will action your request within 30 days.',
    ],
  },
  {
    h: '6. Changes',
    body: [
      'If we change this policy, we will update the date at the top of this page. Material changes will be flagged on the site.',
    ],
  },
];

const TERMS: Section[] = [
  {
    h: '1. Who we are',
    body: [
      'Lux & Taurus ("we", "us") is a product studio that designs, builds, and ships MVPs and websites for founders and businesses. By engaging our services or using this website, you agree to these terms.',
    ],
  },
  {
    h: '2. Scope & quotes',
    body: [
      'Every project starts with a free strategy call where we agree on a written scope: features, timeline, and a fixed price. Estimates produced by the on-site estimator are indicative, not binding — your final price is the one agreed in writing after the call.',
      'Work outside the agreed scope is quoted separately before we build it. We never bill surprise hours.',
    ],
  },
  {
    h: '3. Payment',
    body: [
      'Projects are billed 50% upfront to reserve your build slot and 50% on delivery. The upfront payment is refundable in full until the build starts; once the build starts, you pay only for work delivered.',
      'Invoices are due within 7 days. Delivery of final code and credentials follows receipt of the final payment.',
    ],
  },
  {
    h: '4. The 14-day guarantee',
    body: [
      'Core MVP and Pro MVP builds ship in 14 days from build start (7 days for Launch Sprint), counted from when we have everything we need from you (content, access, approvals).',
      'If we miss the agreed deadline for reasons within our control, we continue working at no additional cost until your project is live. Delays caused by late feedback, scope changes, or third-party outages pause the clock.',
    ],
  },
  {
    h: '5. You own the code',
    body: [
      'On final payment, you own 100% of the deliverables: source code, designs, and content we created for you. Repositories are created under your account, and domains and hosting are registered in your name.',
      'We may use open-source components under their respective licenses, and we retain the right to reuse generic, non-project-specific techniques and know-how.',
    ],
  },
  {
    h: '6. Your responsibilities',
    body: [
      'You confirm that materials you provide (logos, content, data) do not infringe anyone else\'s rights, and that your project does not involve unlawful activity.',
      'Timely feedback keeps your build on schedule — we ask for responses to daily updates within one business day during the build window.',
    ],
  },
  {
    h: '7. Support & warranty',
    body: [
      'Every build includes 30 days of post-launch support covering bug fixes and small tweaks at no charge. Larger changes are quoted as new scope.',
      'Software is provided "as is" beyond this warranty. We are not liable for indirect or consequential damages; our total liability is capped at the fees you paid for the project.',
    ],
  },
  {
    h: '8. Portfolio rights',
    body: [
      'We may showcase completed work (screenshots, project name, outcomes) in our portfolio unless you request otherwise in writing — just tell us and we won\'t.',
    ],
  },
  {
    h: '9. Contact',
    body: ['Questions about these terms: contact@luxandtaurus.com.'],
  },
];

/* ------------------------------ layout ------------------------------ */

const LegalLayout = ({
  eyebrow,
  title,
  sections,
}: {
  eyebrow: string;
  title: string;
  sections: Section[];
}) => (
  <section className="bg-black relative text-left font-sans min-h-screen overflow-hidden pb-28">
    {/* header — same brand block as the navbar */}
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: customEase }}
      className="relative z-30 max-w-[820px] mx-auto px-6 pt-6 flex items-center justify-between"
    >
      <button
        onClick={goHome}
        className="relative bg-transparent border-0 p-0 cursor-pointer flex items-center gap-2.5 select-none group/logo"
      >
        <span aria-hidden className="lg-logo-glow" />
        <img
          src="../landtnoblogo.png"
          alt="Lux & Taurus Logo"
          className="w-[30px] h-[35px] shrink-0 object-contain relative z-10 mix-blend-screen transition-transform duration-300 group-hover/logo:scale-110"
        />
        <span className="relative z-10 text-white font-extrabold text-[18px] tracking-tight whitespace-nowrap">
          LUX <span style={{ color: GREEN }}>&amp;</span> TAURUS
        </span>
      </button>
      <button
        onClick={goHome}
        className="bg-transparent border-0 p-0 cursor-pointer inline-flex items-center gap-2 text-[13.5px] font-semibold tracking-[0.04em] transition-colors duration-200 hover:text-white"
        style={{ color: GREEN }}
      >
        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to site</span>
      </button>
    </motion.header>

    {/* spine into the title */}
    <div className="relative mx-auto w-[3.5px] h-[56px] mt-6 hidden sm:block overflow-hidden">
      <motion.div
        className="absolute inset-0 origin-top"
        style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}50` }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: customEase }}
      />
    </div>

    <div className="max-w-[820px] mx-auto px-6">
      {/* title */}
      <div className="text-center mt-8 sm:mt-4 mb-14 relative z-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: customEase }}
          className="text-[12px] font-bold tracking-[0.2em] uppercase block mb-3 bg-black px-4 inline-block"
          style={{ color: GREEN }}
        >
          ✦ {eyebrow}
        </motion.span>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.3, ease: customEase }}
            className="text-[30px] md:text-[40px] font-bold text-white tracking-tight uppercase leading-none"
          >
            {title}
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-zinc-500 text-[13.5px] mt-4"
        >
          Last updated: {LAST_UPDATED}
        </motion.p>
      </div>

      {/* sections */}
      <div className="space-y-10">
        {sections.map((s, i) => (
          <motion.div
            key={s.h}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.25), ease: customEase }}
            className="relative pl-5 border-l"
            style={{ borderColor: 'rgba(74,222,128,0.25)' }}
          >
            <span
              className="absolute -left-[5px] top-[7px] w-[9px] h-[9px] rounded-full"
              style={{ background: GREEN, boxShadow: `0 0 7px ${GREEN}` }}
            />
            <h2 className="text-[17px] font-bold text-white tracking-tight mb-3">{s.h}</h2>
            <div className="space-y-3">
              {s.body.map((p) => (
                <p key={p.slice(0, 40)} className="text-[15px] text-zinc-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* footer strip */}
      <div className="mt-16 pt-8 border-t border-zinc-800/80 text-center">
        <p className="text-[13.5px] text-zinc-500">
          Questions?{' '}
          <a
            href="mailto:contact@luxandtaurus.com"
            className="no-underline transition-colors hover:text-white"
            style={{ color: GREEN }}
          >
            contact@luxandtaurus.com
          </a>
        </p>
      </div>
    </div>

    <style>{`
      .lg-logo-glow {
        position: absolute;
        left: -6px;
        top: 50%;
        width: 44px;
        height: 44px;
        transform: translateY(-50%);
        border-radius: 9999px;
        background: radial-gradient(circle, rgba(74,222,128,0.28) 0%, transparent 70%);
        animation: lg-breathe 3.2s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes lg-breathe {
        0%, 100% { opacity: 0.5; transform: translateY(-50%) scale(1); }
        50% { opacity: 1; transform: translateY(-50%) scale(1.25); }
      }
      @media (prefers-reduced-motion: reduce) {
        .lg-logo-glow { animation: none; }
      }
    `}</style>
  </section>
);

/* ------------------------------ pages ------------------------------ */

export const PrivacyPage = () => (
  <LegalLayout eyebrow="Legal" title="Privacy Policy" sections={PRIVACY} />
);

export const TermsPage = () => (
  <LegalLayout eyebrow="Legal" title="Terms of Service" sections={TERMS} />
);
