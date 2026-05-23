import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/atoms/Button';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, skewX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      skewX: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      },
    },
};



export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] px-6 overflow-hidden">
      
      {/* BACKGROUND DATA STREAM */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Artistic Watermark - High Status */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.01] uppercase italic tracking-[0.2em] select-none">
          ENGINEERING
        </div>
      </div>

      {/* FLOATING HUD: 14-DAY DELIVERY GUARANTEE */}


      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-6xl"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="font-mono text-[10px] text-emerald-500 tracking-[0.6em] uppercase border border-emerald-500/20 px-4 py-2 bg-emerald-500/5 backdrop-blur-sm">
            Lux_&_Taurus // Intelligence_Unit
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-8">
          Build Faster <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-emerald-400 to-zinc-600">
            With Lux & Taurus.
          </span>
        </motion.h1>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-8">
          <p className="max-w-xl text-zinc-400 text-sm md:text-base font-light tracking-wide leading-relaxed italic">
            Transforming visionary concepts into high-stakes digital reality. 
            Surgical-grade architecture delivered within 14-day tactical sprints.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Initiate_Mission
            </Button>
            <button 
              onClick={() => document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-4 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500 hover:text-emerald-400 transition-all underline decoration-zinc-800 underline-offset-8"
            >
              The_Vault
              <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-emerald-500 animate-pulse" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* BOTTOM HUD: STATUS GRID */}
      <div className="absolute bottom-10 left-10 hidden md:flex flex-col gap-2 opacity-20 font-mono text-[8px] text-emerald-500 uppercase tracking-[0.3em]">
        <span>// Connectivity: Secure</span>
        <span>// Lagos_Node: 01</span>
        <span>// Target: Modern_Web</span>
      </div>
    </section>
  );
};