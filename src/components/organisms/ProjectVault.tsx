import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/molecules/ProjectCard';

interface DBProject {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  live_link: string;
  image_url: string;
}

export const ProjectVault = () => {
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
  .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Vault_Stream_Failure:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="vault" className="py-36 bg-[#050505] px-6 relative overflow-hidden">
      {/* Background Matrix Engineering Grid GridLines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f10_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f10_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER ASSEMBLY */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900 pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="font-mono text-[9px] tracking-[0.5em] text-emerald-500 uppercase font-black italic">
                ENG_REPOSITORIES
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
              THE <span className="text-zinc-800 transition-colors duration-700 hover:text-zinc-700 select-none">VAULT.</span>
            </h2>
          </div>
          
          <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.2em] leading-loose text-left md:text-right">
            <span className="text-zinc-700">// INDEXING_ACTIVE</span> <br />
            [ TOTAL_UNITS: {projects.length < 10 ? `0${projects.length}` : projects.length} ] <br />
            [ PIPELINE_STATUS: <span className={isLoading ? "text-amber-500" : "text-emerald-500"}>{isLoading ? "FETCH_STREAM" : "RECORDS_SECURE"}</span> ]
          </div>
        </div>

        {/* SYSTEM STATUS HANDLING ROUTES */}
        {isLoading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4 font-mono text-xs text-zinc-500 uppercase tracking-[0.3em] italic">
            <div className="w-6 h-6 border border-zinc-800 border-t-emerald-500 animate-spin" />
            STABILIZING_ENCRYPTED_STREAM...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-24 text-center font-mono text-xs text-zinc-600 uppercase tracking-[0.2em] border border-dashed border-zinc-900 bg-[#070707]/30">
            // NO ACTIVE RECORDS DISCOVERED. CHECK SYSTEM INFRASTRUCTURE.
          </div>
        ) : (
          /* Staggered Content Mounting Border Box */
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-zinc-900/40 gap-px border border-zinc-900"
          >
            {projects.map((project) => {
              const standardTechArray = typeof project.tech_stack === 'string' 
                ? project.tech_stack.split(',').map(s => s.trim()) 
                : project.tech_stack;

              return (
                <ProjectCard 
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  techStack={standardTechArray}
                  link={project.live_link || "#"}
                  imageUrl={project.image_url}
                />
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};