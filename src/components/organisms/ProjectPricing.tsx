import { Shield, Check, Zap, Flame, Crown, Clock, HelpCircle, X } from 'lucide-react';

export const ProjectPricing = () => {
  return (
    <section id="pricing" className="py-40 bg-black px-6 border-t border-zinc-900/40 relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.015)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER BLOCK */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1 h-1 bg-amber-500 shadow-[0_0_8px_#D4AF37]" />
              <span className="font-sans text-[10px] tracking-[0.25em] text-amber-400 uppercase font-semibold">Investment Architecture</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight text-neutral-100">
              Our MVP Packages
            </h2>
            <p className="text-zinc-400 font-sans text-sm mt-2 normal-case font-light">
              Built for founders who need to validate fast, acquire first paying users, or scale efficiently.
            </p>
          </div>
          
          {/* SCARCITY INDICATOR TRUST SIGNALS */}
          <div className="bg-zinc-950 border border-zinc-900/60 p-6 font-sans text-xs tracking-wide text-zinc-400 max-w-sm">
            <span className="text-amber-400 font-bold tracking-widest uppercase text-[10px]">// Availability Alert</span> <br />
            <p className="mt-1 normal-case text-zinc-500 font-light">We accept only 2 core studio projects per month to guarantee absolute execution speed. Next open deployment window: July 2026.</p>
          </div>
        </div>

        {/* 3-COLUMN NETWORK TIERS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12 relative z-10">
          
          {/* PACKAGE 1: LAUNCH SPRINT */}
          <div className="bg-zinc-950 border border-zinc-900/80 p-10 flex flex-col justify-between relative transition-all duration-500 hover:border-zinc-800 rounded-none self-center h-full">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest font-medium">Phase 01</span>
                <Zap className="text-zinc-500" size={16} />
              </div>
              <h3 className="text-2xl font-sans font-extrabold text-neutral-100 mb-2">Launch Sprint</h3>
              
              {/* Upgraded Pricing Presentation */}
              <div className="mb-6">
                <span className="text-4xl font-sans font-black tracking-tight text-neutral-100">$1,500</span>
                <span className="text-zinc-500 font-sans text-xs block mt-1 font-light">or 2 payments of $750</span>
              </div>

              <p className="text-zinc-400 font-sans text-xs mb-8 normal-case leading-relaxed font-light">For founders who need to prove concept rapidly before committing full development budget.</p>
              <div className="w-full h-[1px] bg-zinc-900 mb-8" />
              
              <span className="text-[10px] font-sans font-bold text-zinc-500 uppercase tracking-wider block mb-4">What's included</span>
              <ul className="space-y-4 font-sans text-xs text-zinc-400 tracking-wide">
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> High-converting Landing Page</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Waitlist with Email Capture</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> User Auth (Google + Email)</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> 1 Core User Feature</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Deployed Engine (Vercel)</li>
                <li className="flex items-start gap-3 text-neutral-100 font-medium"><Clock size={14} className="text-emerald-500 mt-0.5 shrink-0" /> 7-Day Target Delivery</li>
              </ul>
            </div>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full mt-10 bg-zinc-900 hover:bg-zinc-800 text-neutral-100 font-sans font-bold uppercase text-[10px] tracking-widest py-4 transition-colors border-0 cursor-pointer">
              Reserve 7-Day Slot — $1,500
            </button>
          </div>

          {/* PACKAGE 2: CORE MVP (PROMINENT LUXURY GRADIENT CARD) */}
          <div className="bg-zinc-950 border-2 border-amber-500 p-10 flex flex-col justify-between relative shadow-[0_25px_60px_rgba(212,175,55,0.06)] transform lg:-translate-y-4 rounded-none h-[calc(100%+32px)] z-20">
            {/* Subtle Gold Banner Badge */}
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black font-sans font-extrabold uppercase text-[9px] tracking-[0.25em] px-5 py-1.5 shadow-lg">
              Most Popular Selection
            </div>
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest font-bold">Phase 02</span>
                <Flame className="text-amber-500 animate-pulse" size={16} />
              </div>
              <h3 className="text-2xl font-sans font-extrabold text-neutral-100 mb-2">Core MVP</h3>
              
              {/* Upgraded Pricing Presentation */}
              <div className="mb-6">
                <span className="text-5xl font-sans font-black tracking-tight text-neutral-100">$2,500</span>
                <span className="text-amber-400/80 font-sans text-xs block mt-1 font-medium">or 2 payments of $1,250</span>
              </div>

              <p className="text-zinc-300 font-sans text-xs mb-8 normal-case leading-relaxed font-light">For founders ready to establish secure database structures and collect live payments globally.</p>
              <div className="w-full h-[1px] bg-zinc-800 mb-8" />
              
              <span className="text-[10px] font-sans font-bold text-amber-400 uppercase tracking-wider block mb-4">What's included</span>
              <ul className="space-y-4 font-sans text-xs text-zinc-300 tracking-wide">
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Everything in Launch Sprint</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Full Secure User Dashboard</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Database Stack (Neon/Supabase)</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Stripe Payment Integration</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Onboarding Flow (Resend)</li>
                <li className="flex items-start gap-3 text-emerald-400 font-medium"><Clock size={14} className="text-emerald-500 mt-0.5 shrink-0" /> 14-Day Full Deployment</li>
              </ul>
            </div>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full mt-10 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-black font-sans font-black uppercase text-[10px] tracking-widest py-4.5 transition-all duration-300 shadow-xl border-0 cursor-pointer">
              Reserve 14-Day Slot — $2,500
            </button>
          </div>

          {/* PACKAGE 3: PRO MVP */}
          <div className="bg-zinc-950 border border-zinc-900/80 p-10 flex flex-col justify-between relative transition-all duration-500 hover:border-zinc-800 rounded-none self-center h-full">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest font-medium">Phase 03</span>
                <Crown className="text-zinc-500" size={16} />
              </div>
              <h3 className="text-2xl font-sans font-bold text-neutral-100 mb-2">Pro MVP</h3>
              
              {/* Upgraded Pricing Presentation */}
              <div className="mb-6">
                <span className="text-4xl font-sans font-black tracking-tight text-neutral-100">$3,900</span>
                <span className="text-zinc-500 font-sans text-xs block mt-1 font-light">or 2 payments of $1,950</span>
              </div>

              <p className="text-zinc-400 font-sans text-xs mb-8 normal-case leading-relaxed font-light">For venture-backed founders looking to deploy heavy feature architecture with an AI edge.</p>
              <div className="w-full h-[1px] bg-zinc-900 mb-8" />
              
              <span className="text-[10px] font-sans font-bold text-zinc-500 uppercase tracking-wider block mb-4">What's included</span>
              <ul className="space-y-4 font-sans text-xs text-zinc-400 tracking-wide">
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Everything in Core MVP</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Generative AI API Integration</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Master Admin Dashboard</li>
                <li className="flex items-start gap-3 group/item"><Check size={14} className="text-amber-400 mt-0.5 shrink-0 group-hover/item:scale-125 transition-transform" /> Hardened Encryption & Safety</li>
                <li className="flex items-start gap-3 text-neutral-100 font-medium"><Clock size={14} className="text-emerald-500 mt-0.5 shrink-0" /> 14-Day Delivery Window</li>
              </ul>
            </div>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full mt-10 bg-zinc-900 hover:bg-zinc-800 text-neutral-100 font-sans font-bold uppercase text-[10px] tracking-widest py-4 transition-colors border-0 cursor-pointer">
              Reserve 14-Day Slot — $3,900
            </button>
          </div>
        </div>

        {/* ✦ INFRASTRUCTURE ANCHORS FOOTNOTE */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-8 gap-y-2 font-sans text-[11px] font-medium tracking-wide text-zinc-500 mb-24 relative z-10">
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            All projects include 30 days of post-launch support
          </span>
          <span className="text-zinc-800 hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            Built with enterprise-grade security and scalability in mind
          </span>
        </div>

        {/* ✦ PREMIUM TIER COMPARISON MATRIX */}
        <div className="hidden md:block mb-24 border border-zinc-900 bg-zinc-950/20 p-8 relative z-10">
          <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-neutral-200 mb-6 px-4">Technical Architecture Matrix</h4>
          <table className="w-full text-left font-sans text-xs text-zinc-400 border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 font-medium text-zinc-500 uppercase tracking-wider text-[10px]">
                <th className="p-4 w-2/5">Architectural Layer</th>
                <th className="p-4 text-center">Launch Sprint</th>
                <th className="p-4 text-center text-amber-400">Core MVP</th>
                <th className="p-4 text-center">Pro MVP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60 font-light">
              <tr>
                <td className="p-4 font-medium text-neutral-300">Target Delivery Window</td>
                <td className="p-4 text-center">7 Days</td>
                <td className="p-4 text-center text-neutral-200 font-medium">14 Days</td>
                <td className="p-4 text-center">14 Days</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-300">Database Engine Configuration</td>
                <td className="p-4 text-center text-zinc-600"><X size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-amber-500"><Check size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-emerald-500"><Check size={14} className="mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-300">Stripe Global Payment Gateway</td>
                <td className="p-4 text-center text-zinc-600"><X size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-amber-500"><Check size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-emerald-500"><Check size={14} className="mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-300">Full Secure User Dashboard</td>
                <td className="p-4 text-center text-zinc-600"><X size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-amber-500"><Check size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-emerald-500"><Check size={14} className="mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-300">Generative AI API Node Loops</td>
                <td className="p-4 text-center text-zinc-600"><X size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-zinc-600"><X size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-emerald-500"><Check size={14} className="mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-300">Master Cloud Admin Panel</td>
                <td className="p-4 text-center text-zinc-600"><X size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-zinc-600"><X size={14} className="mx-auto" /></td>
                <td className="p-4 text-center text-emerald-500"><Check size={14} className="mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ✦ THE RE-ENGINEERED 14-DAY DELIVERY GUARANTEE CONTRACT */}
        <div className="border border-zinc-900 bg-zinc-950 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm relative z-10">
          <div className="flex items-start gap-6 max-w-3xl">
            <Shield className="text-amber-500 shrink-0 mt-1" size={26} />
            <div className="font-sans">
              <span className="text-neutral-100 font-extrabold text-base uppercase tracking-wider block">14-Day Delivery Guarantee</span>
              <p className="text-zinc-400 text-xs mt-2 normal-case leading-relaxed font-light">
                If we don’t deliver your production-ready MVP in 14 days, you pay nothing until it’s live. No excuses. We bear all infrastructure execution risk so you can align focus on validation metrics.
              </p>
            </div>
          </div>
          <div className="font-sans text-[10px] text-zinc-500 tracking-widest uppercase bg-black px-6 py-5 border border-zinc-900 text-left md:text-right shrink-0 leading-loose font-medium">
            Escrow Terms: <span className="text-neutral-100">50% to Reserve Slot // 50% on Launch Day</span> <br />
            Channels Mapped: <span className="text-amber-400">Stripe • Payoneer • Wise</span>
          </div>
        </div>

      </div>
    </section>
  );
};