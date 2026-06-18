import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Cpu, CheckCircle2, CalendarDays } from 'lucide-react';

const PHASES = [
  {
    step: "01",
    title: "Discovery & Architecture",
    icon: Compass,
    description: "Deep-dive technical assessment. We align on your exact target features, map the global system architecture, and establish a locked scope optimized for pure performance.",
    details: ["Product Scoping", "Stack Blueprinting", "Data Modeling"]
  },
  {
    step: "02",
    title: "Engineering Sprint",
    icon: Cpu,
    description: "High-intensity development phase. We engineer clean, highly scalable production-ready codebase layers in fast iterative loops with continuous time zone updates.",
    details: ["Core Feature Coding", "API Integration", "Staging Deployments"]
  },
  {
    step: "03",
    title: "Polish, Testing & Launch",
    icon: CheckCircle2,
    description: "Rigorous system optimization. We run load tests, clear user authentication pipelines, hook up Stripe, and hand over a robust launch-ready engine.",
    details: ["Security Audits", "Production Handover", "Live System Boot"]
  }
];

const TIMELINE_MILESTONES = [
  { day: "Days 1–3", label: "Discovery & Scope Lock", desc: "Architecture mapped, database schematics modeled, and final feature footprint contractually locked." },
  { day: "Days 4–8", label: "Database & Backend Core", desc: "Serverless endpoints provisioned, database tables configured, and core transactional business logic completed." },
  { day: "Days 9–11", label: "UI Assembly & Integrations", desc: "Front-end coupled seamlessly to your custom APIs, payment processing gateways open, and user protocols wired." },
  { day: "Days 12–14", label: "Testing, QA & Global Launch", desc: "Production-ready staging clusters heavily verified, end-to-end load tests passed, and public server push finalized." }
];

export const TacticalProcess = () => {
  // ⚡ HOOK: Local view reference mapping to lock tracking strictly onto the timeline element frame
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"] // Animates smoothly from the moment the element hits the middle of the screen
  });

  // Transform scroll metrics directly into an percentage style format for height tracking
  const scaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-40 bg-black relative overflow-hidden border-t border-zinc-900/40 font-sans">
      
      {/* Luxury Soft Top Ambient Backlighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,196,140,0.015)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER BLOCK */}
        <div className="mb-28 border-b border-zinc-900 pb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-1 h-1 bg-amber-500 shadow-[0_0_8px_#D4AF37]" />
            <span className="font-sans text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold">
              Operational Roadmap
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight text-neutral-100">
            Our 14-Day Delivery Protocol
          </h2>
          <p className="text-zinc-400 font-sans text-sm mt-2 max-w-xl normal-case font-light">
            We compress standard 10-week corporate lifecycles into a highly targeted 2-week execution block—without ever cutting structural corners.
          </p>
        </div>

        {/* 3-COLUMN PHASE CARDS MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-28">
          {PHASES.map((phase, index) => {
            const IconComponent = phase.icon;
            return (
              <motion.div 
                key={phase.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative group p-10 bg-zinc-950 border border-zinc-900/80 transition-all duration-500 hover:-translate-y-2 hover:border-zinc-800 hover:shadow-[0_15px_40px_rgba(0,196,140,0.03)] rounded-none flex flex-col justify-between h-[360px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <span className="text-zinc-600 font-mono text-xs font-semibold tracking-wider group-hover:text-zinc-400 transition-colors">
                      {phase.step}
                    </span>
                    <IconComponent className="text-zinc-500 group-hover:text-amber-400 transition-colors duration-500" size={18} />
                  </div>

                  <h3 className="text-xl font-bold text-neutral-100 font-sans tracking-tight mb-4 relative z-10 group-hover:text-white transition-colors">
                    {phase.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed normal-case pr-2 relative z-10 group-hover:text-zinc-300 transition-colors">
                    {phase.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 relative z-10">
                  {phase.details.map((detail) => (
                    <span 
                      key={detail} 
                      className="font-mono text-[8px] px-2.5 py-1 bg-black text-zinc-500 uppercase tracking-wider border border-zinc-900/60 group-hover:border-zinc-800 group-hover:text-zinc-400 transition-all font-medium"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ✦ THE LUXURY 14-DAY VERTICAL MILESTONE TIMELINE */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-zinc-900 bg-zinc-950/40 p-8 md:p-12 relative rounded-none"
        >
          <div className="flex items-center gap-3 mb-12 border-b border-zinc-900 pb-6">
            <CalendarDays size={16} className="text-amber-500" />
            <h4 className="font-sans font-bold text-neutral-100 text-sm uppercase tracking-wider">
              Sprint Milestone Parameters
            </h4>
          </div>

          {/* Vertical layout reference bounds container */}
          <div ref={timelineRef} className="relative space-y-10 pl-2 sm:pl-6">
            
            {/* ⚡ THE INTERACTIVE PROGRESS SCROLL LINE */}
            {/* Static background rail tracker */}
            <div className="absolute top-2 bottom-2 left-[13px] w-px bg-zinc-900 z-0" />
            
            {/* Real-time filling emerald vector track line */}
            <motion.div 
              style={{ scaleY }}
              className="absolute top-2 bottom-2 left-[13px] w-px bg-emerald-500 origin-top shadow-[0_0_10px_#10b981] z-10"
            />

            {TIMELINE_MILESTONES.map((milestone, idx) => (
              <div key={idx} className="relative z-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-10 group/node">
                
                {/* Fixed timeline bullet metric block */}
                <div className="flex items-center gap-4 md:block shrink-0 relative z-20">
                  {/* Circle updates background colors automatically as tracking thresholds cross */}
                  <motion.div 
                    className="w-7 h-7 rounded-full bg-black border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-amber-400/90 font-bold group-hover/node:border-emerald-500 transition-colors duration-500 mb-0 md:mb-2 shadow-sm relative z-20"
                  >
                    {idx + 1}
                  </motion.div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block md:hidden">
                    {milestone.day}
                  </span>
                </div>
                
                {/* Content Alignment Grid Frame */}
                <div className="pl-10 md:pl-0 pt-0.5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 w-full relative z-10">
                  <div className="md:col-span-4">
                    <span className="hidden md:block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                      {milestone.day}
                    </span>
                    <h5 className="font-sans font-bold text-sm text-neutral-200 mt-0.5 group-hover/node:text-white transition-colors">
                      {milestone.label}
                    </h5>
                  </div>
                  <div className="md:col-span-8 flex items-center">
                    <p className="font-sans text-xs text-zinc-400 normal-case font-light leading-relaxed group-hover/node:text-zinc-300 transition-colors">
                      {milestone.desc}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};