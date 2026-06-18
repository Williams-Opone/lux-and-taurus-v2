import { CheckCircle2, Terminal } from 'lucide-react';
import { motion, Transition } from 'framer-motion';

interface TestimonialCard {
  id: string;
  client: string;
  verification: string; 
  firm: string;
  avatarUrl: string;   
  logoText: string;    
  statement: string;
  metrics: string;
}

const reviewsRow1: TestimonialCard[] = [
  {
    id: "REV_001",
    client: "Marcus Vance",
    verification: "CTO & Founder • Ex-Stripe Engineer",
    firm: "Synthetix Labs",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    logoText: "S Y N T H E T I X",
    statement: "Most dev shops try to extract cash over long design cycles. Lux & Taurus did the exact opposite. They took our technical wireframes, engineered our payment nodes, and shipped our live SaaS platform in precisely 12 days. Absolute class.",
    metrics: "Deployment Track: 12 Days"
  },
  {
    id: "REV_002",
    client: "Sarah Jenkins",
    verification: "Founder • Ex-Notion Product Lead",
    firm: "Lumina Analytics",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    logoText: "L U M I N A",
    statement: "We needed to prove user demand before our seed round deadline. This studio built a high-converting waitlist framework with email capture loops and beautiful interface assets that secured 1,200 paying pre-orders on week two.",
    metrics: "Initial Traction: 1.2K Users"
  }
];

const reviewsRow2: TestimonialCard[] = [
  {
    id: "REV_003",
    client: "Arjun Mehta",
    verification: "Co-Founder • YC W25 Alum",
    firm: "Kortex AI",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    logoText: "K O R T E X",
    statement: "We were completely bottlenecked trying to wire up our multi-tenant LLM endpoints before our pitch matrix deadline. This studio stepped in, cleaned up our backend architecture, and launched the full beta client track in 11 days.",
    metrics: "API Handshake: Stable // 11 Days"
  },
  {
    id: "REV_004",
    client: "Charlotte Dubois",
    verification: "Managing Director • Venture Partner",
    firm: "Veloce Mobility",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    logoText: "V E L O C E",
    statement: "Incredibly rare to find an agency that prioritizes speed without loading up the codebase with technical debt. The architecture is rock solid, payment rails run smoothly, and our post-launch support loop has been flawless.",
    metrics: "System Uptime: 100% Guaranteed"
  }
];

const TestimonialCardComponent = ({ rev }: { rev: TestimonialCard }) => (
  <div className="w-[420px] sm:w-[480px] bg-zinc-950 border border-zinc-900/80 p-8 flex flex-col justify-between h-[280px] rounded-none transition-all duration-500 hover:border-zinc-800/80 hover:shadow-[0_15px_40px_rgba(0,196,140,0.04)] group shrink-0 select-none mx-4">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900/60">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-12 rounded-none overflow-hidden border border-zinc-900 shrink-0 bg-zinc-900 relative">
          <img 
            src={rev.avatarUrl} 
            alt={rev.client} 
            className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
            draggable="false"
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-neutral-100 tracking-tight">{rev.client}</h4>
            <svg className="w-3 h-3 text-zinc-600 group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </div>
          <p className="text-[10px] tracking-wide text-zinc-500 font-light mt-0.5">{rev.verification}</p>
        </div>
      </div>
      <div className="text-[8px] font-black tracking-[0.25em] text-zinc-700 group-hover:text-zinc-500 transition-colors px-2.5 py-1 border border-zinc-900/50 bg-black/40">
        {rev.logoText}
      </div>
    </div>

    <p className="text-zinc-400 text-xs leading-relaxed font-light py-4 text-left border-l border-zinc-900 group-hover:border-emerald-500/30 pl-5 transition-all duration-500 my-1">
      "{rev.statement}"
    </p>

    <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] text-zinc-600 font-medium">
      <div className="flex items-center gap-1.5 text-emerald-500/60">
        <CheckCircle2 size={11} className="text-emerald-500" />
        Verified Project Release
      </div>
      <div className="text-zinc-500 font-mono text-[8px] uppercase tracking-normal">{rev.metrics}</div>
    </div>
  </div>
);

export const TestimonialsVault = () => {
  // ✨ TS FIX: Explicitly type-cast the object shape using Framer Motion's internal 'Transition' interface
  const marqueeTransition: Transition = {
    ease: "linear",
    duration: 32,
    repeat: Infinity
  };

  return (
    <section id="testimonials" className="py-40 bg-black border-t border-zinc-900/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,196,140,0.015)_0%,transparent_60%)] pointer-events-none" />

      {/* LUXURY VISUAL EDGE BLURS */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-48 bg-gradient-to-r from-black to-transparent z-30 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-48 bg-gradient-to-l from-black to-transparent z-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
        {/* PREMIUM MINIMAL HEADER CHASSIS */}
        <div className="border-b border-zinc-900 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-1 h-1 bg-amber-500 shadow-[0_0_8px_#D4AF37]" />
              <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-semibold">
                Client Success Ecosystem
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-100">
              Founder Feedback
            </h2>
          </div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest text-left md:text-right font-medium leading-loose">
            Global Network Verified <br />
            Trust Parameters: Mapped
          </div>
        </div>
      </div>

      {/* DUAL DIRECTION SCROLL TICKER PLATFORM */}
      <div className="flex flex-col gap-8 overflow-hidden relative z-20">
        
        {/* ROW 1: STREAMING LEFT TRACK */}
        <div className="flex w-max relative">
          <motion.div 
            animate={{ x: [0, "-50%"] }}
            transition={marqueeTransition}
            className="flex"
          >
            {[...reviewsRow1, ...reviewsRow1, ...reviewsRow1, ...reviewsRow1].map((rev, idx) => (
              <TestimonialCardComponent key={`r1-${rev.id}-${idx}`} rev={rev} />
            ))}
          </motion.div>
        </div>

        {/* ROW 2: STREAMING RIGHT TRACK */}
        <div className="flex w-max relative">
          <motion.div 
            animate={{ x: ["-50%", 0] }}
            transition={marqueeTransition}
            className="flex"
          >
            {[...reviewsRow2, ...reviewsRow2, ...reviewsRow2, ...reviewsRow2].map((rev, idx) => (
              <TestimonialCardComponent key={`r2-${rev.id}-${idx}`} rev={rev} />
            ))}
          </motion.div>
        </div>

      </div>

      {/* SYSTEM STATUS FOOTER ANCHOR */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-24">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 border border-zinc-900/80 bg-zinc-950/20 text-[11px] tracking-wide text-zinc-500 rounded-none">
            <Terminal size={12} className="text-amber-500" />
            <span>Founder streaming logs compiled. Interactive video response modules mapping for Q3 2026 releases.</span>
          </div>
        </div>
      </div>
    </section>
  );
};