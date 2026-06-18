import { motion } from 'framer-motion';
import { Sparkles, Layout, Globe, ShieldCheck } from 'lucide-react';

export const AboutMe = () => {
  return (
    <section id="about" className="py-40 bg-black relative overflow-hidden border-t border-zinc-900/40 font-sans">
      
      {/* Luxury Radial Illumination Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,196,140,0.01)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* LEFT: PREMIUM PORTRAIT VISUAL CARD FRAME */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden border border-zinc-900 shadow-2xl transition-all duration-500 group-hover:border-zinc-800">
              
              {/* Cinematic Vignette Overlay Mesh */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />
              
              {/* Portrait Asset Placement */}
              <img 
                src="https://res.cloudinary.com/dotcy7lhz/image/upload/v1781476315/ChatGPT_Image_Jun_14_2026_11_29_21_PM_bfy7zu.webp" 
                alt="Lux & Taurus Studio Principal" 
                className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.02] transition-all duration-700 ease-out filter brightness-95 text-zinc-800"
              />
              
              {/* Refined Metadata Floating Label Container */}
              <div className="absolute top-4 left-4 z-20 font-sans text-[9px] font-bold text-amber-400 uppercase tracking-[0.15em] bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 border border-zinc-900 shadow-sm">
                Studio Lead // Operations Node
              </div>
            </div>
            
            {/* Elegant Floating Metrics Panel Component */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-4 p-6 bg-zinc-950 border border-zinc-900 backdrop-blur-xl z-20 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="font-mono text-[9px] text-amber-400 mb-1 tracking-wider uppercase font-semibold">// Target Metrics</div>
              <div className="text-sm font-sans font-black text-neutral-100 uppercase tracking-wider">
                14-Day Lock
              </div>
            </motion.div>
          </div>

          {/* RIGHT: PREMIUM STUDIO VISION COPY ENGINE */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Agency Frame Header */}
              <div className="flex items-center gap-2.5">
                <span className="w-1 h-1 bg-amber-500 shadow-[0_0_8px_#D4AF37]" />
                <span className="font-sans text-[10px] tracking-[0.25em] text-amber-400 uppercase font-semibold">
                  Corporate Architecture
                </span>
              </div>
              
              {/* Elite Studio Title Block */}
              <h2 className="text-4xl sm:text-5xl font-sans font-black text-neutral-100 tracking-tight leading-tight">
                Lux & Taurus <br />
                <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-500 bg-clip-text text-transparent">Boutique Dev Studio</span>
              </h2>

              {/* Refined High-Ticket Positioning Narrative Copy */}
              <div className="space-y-6 text-zinc-400 font-sans text-xs sm:text-sm font-light leading-relaxed normal-case max-w-2xl">
                <p>
                  Lux & Taurus is a boutique dev studio based in Lagos. We partner with ambitious US and UK founders who refuse to wait 3 months to validate their idea. 
                </p>
                <p>
                  By combining obsessive engineering systems, battle-tested templates, and deep technical craft, my studio and specialist network consistently deliver in 14 days what most legacy agencies take 10–12 weeks to ship.
                </p>
              </div>

              {/* THREE-COLUMN MICRO SPEC MATRIX PANEL */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-900 pt-10">
                
                <div>
                  <div className="flex items-center gap-2 mb-3 text-zinc-400 group">
                    <Layout size={13} className="text-amber-500" />
                    <h4 className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Engine Stack</h4>
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-2 font-sans font-light">
                    <li>Next.js / React Frameworks</li>
                    <li>Python / Robust Flask APIs</li>
                    <li>PostgreSQL / Neon Databases</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3 text-zinc-400">
                    <ShieldCheck size={13} className="text-amber-500" />
                    <h4 className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Capabilities</h4>
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-2 font-sans font-light">
                    <li>Stripe Global Payment Loops</li>
                    <li>Relational DB Engineering</li>
                    <li>Hardened Encryption Auth</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3 text-zinc-400">
                    <Globe size={13} className="text-amber-500" />
                    <h4 className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Studio Status</h4>
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-2 font-sans">
                    <li className="flex items-center gap-2 text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_6px_#00C48C]" />
                      1 Slot Remaining
                    </li>
                    <li className="text-zinc-500 font-light font-mono text-[11px] tracking-normal">Lagos_HQ_Node</li>
                  </ul>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};