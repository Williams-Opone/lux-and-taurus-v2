import { motion } from 'framer-motion';

const PHASES = [
  {
    step: "01",
    title: "Recon & Architecture",
    description: "Deep-dive technical audit. We define the mission scope, map the system architecture, and eliminate all non-essential bloat.",
    details: ["System_Mapping", "Stack_Selection", "Risk_Assessment"]
  },
  {
    step: "02",
    title: "Rapid Deployment",
    description: "High-intensity 14-day development sprint. We push production-ready code in iterative cycles with zero technical debt.",
    details: ["Active_Coding", "Daily_Sync", "Live_Staging"]
  },
  {
    step: "03",
    title: "Extraction & Launch",
    description: "Rigorous testing and final deployment. We hand over a battle-tested infrastructure ready for immediate scaling.",
    details: ["Load_Testing", "Cloud_Deploy", "Mission_Complete"]
  }
];

export const TacticalProcess = () => {
  return (
    <section id="process" className="py-32 bg-black relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="w-full h-full border-x border-emerald-500/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-1.5 h-1.5 bg-emerald-500 rotate-45" />
            <span className="font-mono text-[10px] text-emerald-500 tracking-[0.5em] uppercase">The_Methodology</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter">
            14-Day <br /> <span className="text-zinc-800 underline decoration-emerald-500/20">Tactical Sprint.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {PHASES.map((phase, index) => (
            <motion.div 
              key={phase.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group p-8 border border-zinc-900 bg-[#080808] hover:border-emerald-500/30 transition-all duration-500"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-black border border-zinc-800 flex items-center justify-center font-mono text-xs text-emerald-500 italic">
                [{phase.step}]
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight italic">
                {phase.title}
              </h3>
              
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light italic">
                {phase.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {phase.details.map((detail) => (
                  <span key={detail} className="font-mono text-[7px] px-2 py-1 bg-zinc-900 text-zinc-500 uppercase tracking-widest border border-white/5 group-hover:border-emerald-500/20 transition-colors">
                    {detail}
                  </span>
                ))}
              </div>

              {/* Decorative Scanline inside the box */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-700 shadow-[0_0_10px_#10b981]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};