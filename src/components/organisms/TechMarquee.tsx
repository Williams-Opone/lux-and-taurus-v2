import { motion } from 'framer-motion';
import { 
  SiPython, SiFlask, SiNextdotjs, SiReact, 
  SiTailwindcss, SiPostgresql, SiSqlalchemy, 
  SiTypescript, SiOpenai, SiDocker 
} from 'react-icons/si';

const TECH_STACK = [
  { name: "Python", icon: SiPython },
  { name: "Flask", icon: SiFlask },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "SQLAlchemy", icon: SiSqlalchemy },
  { name: "TypeScript", icon: SiTypescript },
  { name: "OpenAI", icon: SiOpenai },
  { name: "Docker", icon: SiDocker },
];

export const TechMarquee = () => {
  // Double the array to ensure seamless looping
  const duplicatedTech = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="py-20 bg-black overflow-hidden border-y border-zinc-900/50">
      <div className="flex flex-col gap-8">
        
        {/* ROW 1: MOVING LEFT */}
        <div className="flex overflow-hidden group">
          <motion.div 
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 items-center pr-12"
          >
            {duplicatedTech.map((tech, index) => (
              <div key={index} className="flex items-center gap-3 group/item">
                <tech.icon className="text-zinc-600 group-hover/item:text-emerald-500 transition-colors duration-500" size={24} />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-700 group-hover/item:text-white transition-colors duration-500 italic">
                  {tech.name}
                </span>
                <span className="text-emerald-900/30 ml-8 font-mono text-xs">//</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: MOVING RIGHT (Parallax Feel) */}
        <div className="flex overflow-hidden group">
          <motion.div 
            animate={{ x: ["-50%", 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 items-center pr-12"
          >
            {duplicatedTech.map((tech, index) => (
              <div key={index} className="flex items-center gap-3 group/item">
                <tech.icon className="text-zinc-600 group-hover/item:text-emerald-500 transition-colors duration-500" size={24} />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-700 group-hover/item:text-white transition-colors duration-500 italic">
                  {tech.name}
                </span>
                <span className="text-emerald-900/30 ml-8 font-mono text-xs">//</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};