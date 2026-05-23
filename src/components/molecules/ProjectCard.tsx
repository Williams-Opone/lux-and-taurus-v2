import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';

interface ProjectCardProps {
  id: string | number;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  imageUrl?: string;
}

export const ProjectCard = ({ id, title, description, techStack, link, imageUrl }: ProjectCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      // Added mb-6 for layout padding space separation gaps on mobile tracking targets
      className="group relative h-[540px] w-full flex flex-col bg-[#070707] border border-zinc-900 overflow-hidden transition-colors duration-500 hover:bg-[#090909] mb-6 md:mb-0"
    >
      {/* Dynamic Glow Spotlight Matrix Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              240px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.06),
              transparent 80%
            )
          `,
        }}
      />

      {/* Cinematic Corner Accents */}
      <div className="absolute top-0 right-0 w-[4px] h-[4px] border-r border-t border-zinc-800 group-hover:border-emerald-500 transition-colors z-20" />
      <div className="absolute bottom-0 left-0 w-[4px] h-[4px] border-l border-b border-zinc-800 group-hover:border-emerald-500 transition-colors z-20" />

      {/* Hardware Badge ID */}
      <div className="absolute top-0 left-0 bg-zinc-950 px-3 py-1 border-r border-b border-zinc-900 z-20 transition-colors duration-500 group-hover:border-emerald-500/30 group-hover:bg-black">
        <span className="font-mono text-[8px] text-zinc-500 tracking-[0.2em] uppercase font-black transition-colors duration-500 group-hover:text-emerald-400">
          SYS_FILE // 00{id}
        </span>
      </div>

      {/* Image Node Wrapper (Optimized Aspect Display Frame) */}
      <div className="h-[65%] bg-[#030303] relative overflow-hidden shrink-0 border-b border-zinc-900/80 p-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
        
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-contain opacity-40 group-hover:opacity-90 transition-all duration-700 group-hover:scale-[1.02] drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative z-20">
            <div className="w-8 h-8 border-t border-r border-emerald-500/20 rounded-full animate-spin" />
          </div>
        )}
        
        {/* Deep Field Gradient Shadow Box Integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-90 pointer-events-none" />
        
        {/* CRT Scanline Terminal Filter Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
      </div>

      {/* Content Engine Body Frame (35% Spatial Weight) */}
      <div className="h-[35%] p-6 flex flex-col justify-between relative z-20 bg-[#070707]">
        <div>
          <div className="flex justify-between items-start gap-4 mb-3">
            <h4 className="text-xl font-bold uppercase tracking-tight text-zinc-100 font-sans transition-colors duration-500 group-hover:text-white">
              {title}<span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1 font-mono">.</span>
            </h4>
            
            {/* Architectural Stack Mapping Chips */}
            <div className="flex gap-1.5 shrink-0 pt-1">
              {techStack.slice(0, 3).map((tech) => (
                <span 
                  key={tech} 
                  className="text-[7px] font-mono font-bold px-2 py-0.5 border border-zinc-800 bg-zinc-900/40 text-zinc-400 uppercase tracking-widest transition-all duration-500 group-hover:border-emerald-500/20 group-hover:text-emerald-400 group-hover:bg-emerald-950/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="text-zinc-400 text-xs font-mono font-medium leading-relaxed tracking-wide line-clamp-2">
            {description}
          </p>
        </div>

        {/* Tactical Interaction Row */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-900/60">
          <a 
            href={link} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.5em] text-zinc-400 transition-all duration-300 hover:tracking-[0.6em] group-hover:text-emerald-400"
          >
            EXECUTE_LAUNCH
            <span className="w-4 h-[1px] bg-zinc-700 group-hover:bg-emerald-500 group-hover:w-10 transition-all duration-500" />
          </a>
          
          <div className="flex items-center gap-1.5 text-zinc-600 font-mono text-[8px] tracking-tight">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-emerald-500 group-hover:shadow-[0_0_8px_#10b981] transition-all duration-500" />
            LIVE_NODE
          </div>
        </div>
      </div>
      
      {/* Precise Tracking Laser Line Animation Layer */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent -translate-y-full group-hover:animate-scan z-30 pointer-events-none" />
    </motion.div>
  );
};