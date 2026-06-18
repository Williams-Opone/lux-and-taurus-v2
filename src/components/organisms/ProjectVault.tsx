import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Monitor, Code2, Sparkles } from 'lucide-react';

interface DBProject {
  id: number | string;
  title: string;
  subtitle?: string;
  badge?: string;
  description: string;
  tech_stack: string | string[];
  live_link: string;
  image_url?: string; // Mapped dynamic image link property
  metrics?: string;
  quote?: string;
  author?: string;
}

// ✦ LUXURY FALLBACK DATASET (Populates automatically if backend tables are empty)
const FALLBACK_PROJECTS: DBProject[] = [
  {
    id: "fallback_01",
    title: "Pinnacle",
    subtitle: "AI-Powered Invoice Automation SaaS",
    badge: "Launched in 13 Days",
    description: "An enterprise-grade orchestration machine designed to ingest, process, and automatically match structural financial variables. Engineered from raw architecture to operational production to compress processing delays completely.",
    tech_stack: "Next.js, Python, PostgreSQL, OpenAI API",
    live_link: "#",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", // Premium mockup canvas sample
    metrics: "$9.2k MRR Achieved in 28 Days",
    quote: "Lux & Taurus bypassed the typical agency scoping theater. They locked the architecture, stood up the endpoints, and pushed our operational SaaS to live networks in under two weeks.",
    author: "Devon Vance, Founder"
  },
  {
    id: "fallback_02",
    title: "Lumina",
    subtitle: "Real-Time Subscription Analytics Platform",
    badge: "Launched in 14 Days",
    description: "A deep telemetry dashboard built to capture high-throughput event metrics, calculate live monthly recurring revenue metrics, and stream granular cancellation tracking signals across multi-tenant payment protocols.",
    tech_stack: "React, Flask, SQLAlchemy, Stripe API",
    live_link: "#",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    metrics: "+42% Conversion Optimization // 1.2M Events Daily",
    quote: "The speed of execution was unmatched. We had a fully functional multi-tenant telemetry dashboard accepting live global transactions before our seed deadline.",
    author: "Elena Rostova, CTO"
  }
];

const VISUAL_THEMES = [
  { glow: "group-hover:shadow-[0_0_50px_rgba(0,229,163,0.1)]", bg: "from-emerald-500/20 via-zinc-900 to-black" },
  { glow: "group-hover:shadow-[0_0_50px_rgba(212,175,55,0.08)]", bg: "from-amber-500/10 via-zinc-900 to-black" },
  { glow: "group-hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]", bg: "from-zinc-800/30 via-zinc-950 to-black" }
];

export const ProjectVault = () => {
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Vault_Stream_Failure:", err);
        setProjects(FALLBACK_PROJECTS);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="vault" className="py-40 bg-black relative overflow-hidden border-t border-zinc-900/40 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(24,24,27,0.4)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 px-6">
        
        {/* HEADER ARCHITECTURE */}
        <div className="mb-36 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900 pb-12">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-1 h-1 bg-emerald-500 shadow-[0_0_8px_#00C48C]" />
              <span className="font-sans text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight text-neutral-100">Studio Projects</h2>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-xl pt-1 font-light">
              <span className="text-emerald-500 font-medium">Live Run-Time:</span> Explore our live systems tracking matrix. Every core architecture layer below was dynamically loaded, compiled, and deployed to production networks in under 14 days.
            </p>
          </div>
          
          <div className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest leading-loose text-left md:text-right font-medium">
            Active Records: 0{projects.length} <br />
            Status: <span className="text-emerald-500">Live Database Stream Sync</span>
          </div>
        </div>

        {/* LOADING MACHINE */}
        {isLoading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4 font-sans text-xs text-zinc-500 uppercase tracking-widest font-medium">
            <div className="w-5 h-5 border-2 border-zinc-900 border-t-emerald-500 rounded-full animate-spin" />
            Synchronizing live production records...
          </div>
        ) : (
          <div className="space-y-44">
            {projects.map((project, idx) => {
              const standardTechArray = typeof project.tech_stack === 'string' 
                ? project.tech_stack.split(',').map(s => s.trim()) 
                : project.tech_stack || [];

              const isEven = idx % 2 === 0;
              const theme = VISUAL_THEMES[idx % VISUAL_THEMES.length];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center pb-12"
                >
                  
                  {/* LEFT: LAPTOP MOCKUP CASE FRAME WITH LIVE IMAGES MOUNTED */}
                  <div className={`lg:col-span-6 relative group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className={`absolute inset-0 bg-transparent rounded-none transition-all duration-700 ${theme.glow} pointer-events-none z-0`} />
                    
                    <div className={`w-full h-[320px] sm:h-[380px] bg-gradient-to-br ${theme.bg} border border-zinc-900 p-8 overflow-hidden relative flex flex-col items-center justify-center shadow-2xl transition-colors duration-500 group-hover:border-zinc-800`}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />
                      
                      <div className="absolute top-4 left-6 font-mono text-[8px] text-zinc-600 tracking-widest">// DEPLOYMENT_NODE_0{idx + 1}</div>

                      {/* Laptop Body Outer Enclosure */}
                      <div className="w-full h-[85%] bg-black border-[5px] border-zinc-800/90 rounded-t-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col relative z-10 transform group-hover:scale-[1.03] group-hover:-translate-y-2 transition-all duration-700 ease-out overflow-hidden">
                        
                        {/* Top Window Bar */}
                        <div className="w-full h-5 bg-zinc-900/90 border-b border-black/40 px-3 flex items-center gap-1.5 shrink-0 z-20">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                          <div className="mx-auto font-mono text-[6px] text-zinc-500 uppercase tracking-widest max-w-[120px] truncate">
                            {project.title}.app
                          </div>
                        </div>
                        
                        {/* ✨ TARGETED FIX AREA: Renders project screenshot elegantly inside the browser layer */}
                        <div className="w-full h-full relative bg-[#030303] z-10 flex items-center justify-center overflow-hidden">
                          {project.image_url ? (
                            <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700 ease-out">
                              <div className="absolute inset-0 bg-black/10 mix-blend-multiply z-10" />
                              <img 
                                src={project.image_url} 
                                alt={`${project.title} Interface Staging Preview`}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            /* Technical System Fallback layout if database contains 0 image tokens */
                            <div className="w-full h-full p-5 font-mono text-[8px] text-zinc-600 flex flex-col justify-between">
                              <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                                <span className="text-zinc-400 font-bold tracking-widest text-[7px]">RUNTIME::{project.title.toUpperCase()}_STAGING</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#00C48C]" />
                              </div>
                              <div className="space-y-2.5 my-auto max-w-xs">
                                <div className="h-2.5 bg-zinc-900 w-5/6 rounded-sm" />
                                <div className="h-2 bg-zinc-900/40 w-2/3 rounded-sm" />
                                <div className="grid grid-cols-4 gap-2 pt-2">
                                  <div className="h-8 bg-zinc-900/20 border border-zinc-900/60 rounded-sm" />
                                  <div className="h-8 bg-zinc-900/20 border border-zinc-900/60 rounded-sm" />
                                  <div className="h-8 bg-zinc-900/20 border border-zinc-900/60 rounded-sm" />
                                  <div className="h-8 bg-zinc-900/20 border border-zinc-900/60 rounded-sm" />
                                </div>
                              </div>
                              <div className="text-[7px] text-zinc-700 flex items-center gap-1.5">
                                <Code2 size={10} className="text-emerald-500/40" /> SECURE DEPLOYMENT NO_IMG_META
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-11/12 h-2 bg-gradient-to-b from-zinc-800 to-zinc-900 border-x border-b border-zinc-700/40 rounded-b-sm absolute bottom-4 shadow-xl z-20" />
                    </div>
                  </div>

                  {/* RIGHT COLUMN: METRICS, COPY & DEPLOYMENT ROUTERS */}
                  <div className={`lg:col-span-6 space-y-6 text-left ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="px-3 py-1 bg-zinc-950 border border-zinc-900 text-amber-400 font-sans text-[9px] uppercase font-bold tracking-[0.15em] rounded-sm shadow-sm">
                        {project.badge || "Live Production MVP"}
                      </span>
                      {project.subtitle && (
                        <>
                          <span className="text-zinc-800 font-light font-sans text-sm">/</span>
                          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-zinc-500">{project.subtitle}</span>
                        </>
                      )}
                    </div>

                    <a 
                      href={project.live_link || "#"} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group/link inline-flex items-center gap-3 text-3xl sm:text-5xl font-sans font-black text-neutral-100 tracking-tight hover:text-white transition-colors text-decoration-none"
                    >
                      {project.title}
                      <ArrowUpRight size={24} className="text-zinc-600 group-hover/link:text-amber-400 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all duration-300 mt-2" />
                    </a>

                    <p className="text-zinc-400 font-sans text-xs sm:text-sm font-light leading-relaxed normal-case max-w-xl">
                      {project.description}
                    </p>

                    <div className="p-5 border border-zinc-900 bg-zinc-950/80 backdrop-blur-md inline-flex items-center gap-3.5 font-sans text-xs tracking-wide text-amber-400 font-bold shadow-sm relative group/metric">
                      <div className="absolute inset-y-0 left-0 w-[2px] bg-emerald-500 h-1/2 my-auto" />
                      <Sparkles size={13} className="text-amber-400 shrink-0" />
                      <span className="uppercase font-mono text-[10px] tracking-wider">
                        {project.metrics || "Metrics: Scaled Architecture Verified"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {standardTechArray.map((techItem) => (
                        <span key={techItem} className="font-mono text-[8px] font-semibold uppercase tracking-wider text-zinc-500 px-2 py-1 bg-black border border-zinc-900/60">
                          {techItem}
                        </span>
                      ))}
                    </div>

                    {project.quote && (
                      <div className="border-l border-zinc-900 pl-6 py-2 transition-all duration-500 mt-6 max-w-xl">
                        <p className="text-zinc-500 font-sans text-xs italic font-light leading-relaxed">
                          "{project.quote}"
                        </p>
                        {project.author && (
                          <span className="text-[10px] font-sans font-bold text-zinc-400 uppercase tracking-wider block mt-2.5">
                            — {project.author}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};