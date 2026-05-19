import { motion } from 'framer-motion';

export const AboutMe = () => {
  return (
    <section id="about" className="py-32 bg-[#080808] relative overflow-hidden border-y border-zinc-900/50">
      {/* Background Graphic - Geometric Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#10b981_1px,_transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: IMAGE / VISUAL BLOCK */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-800">
              {/* This is where your professional photo goes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img 
                src="https://res.cloudinary.com/dotcy7lhz/image/upload/v1779012126/BOW_pnu4o5.webp" 
                alt="Williams Opone" 
                className="w-full h-full object-cover  opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              
              {/* HUD Overlay for the image */}
              <div className="absolute top-4 left-4 z-20 font-mono text-[8px] text-emerald-500/60 uppercase tracking-widest">
                ID_VERIFIED // OPONE_W
              </div>
            </div>
            
            {/* Artistic Floating Data Point */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 p-6 bg-black border border-emerald-500/20 backdrop-blur-xl z-20"
            >
              <div className="font-mono text-[10px] text-emerald-500 mb-1 tracking-widest uppercase italic">Specialization</div>
              <div className="text-xl font-black text-white uppercase italic">Full_Stack</div>
            </motion.div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-emerald-500" />
                <span className="font-mono text-[10px] text-emerald-500 tracking-[0.5em] uppercase italic">Lead_Operative</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter mb-8 leading-none">
                Williams <br /> <span className="text-zinc-800">Opone.</span>
              </h2>

              <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed italic font-light">
                <p>
                  I am a Nigerian software developer and entrepreneur dedicated to engineering high-stakes digital infrastructure. My approach combines the precision of **Quantity Surveying** with the speed of modern full-stack development.
                </p>
                <p>
                  With a focus on **Python, Flask, and Next.js**, I lead **Lux and Taurus**—a technical unit focused on deploying production-ready MVPs within strict 14-day tactical sprints.
                </p>
              </div>

              {/* Skill Matrix */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-zinc-900 pt-10">
                <div>
                  <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3 italic">// Technical_Core</h4>
                  <ul className="text-xs text-white space-y-2 font-mono">
                    <li>Next.js / React</li>
                    <li>Python / Flask</li>
                    <li>SQLAlchemy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3 italic">// Creative_Ops</h4>
                  <ul className="text-xs text-white space-y-2 font-mono">
                    <li>AI_Automation</li>
                    <li>Brand_Design</li>
                    <li>UI_Engineering</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3 italic">// Status</h4>
                  <ul className="text-xs text-white space-y-2 font-mono">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Available_Q3
                    </li>
                    <li className="text-zinc-600">Lagos_Node</li>
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