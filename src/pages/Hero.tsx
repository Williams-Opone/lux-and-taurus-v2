import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Play, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export const Hero = () => {
  // Setup smooth hardware-accelerated values for interactive mouse tracking coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 300, mass: 0.5 };
  const sphereX = useSpring(mouseX, springConfig);
  const sphereY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate cursor deviation from center coordinate thresholds
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.12;
      const moveY = (clientY - window.innerHeight / 2) * 0.12;
      
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="min-h-screen flex flex-col justify-center bg-black relative pt-36 pb-20 overflow-hidden font-sans select-none">
      
      {/* LUXURY RADIAL ILLUMINATION BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,196,140,0.02)_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/5 to-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: HIGH-TIER BRAND POSITIONING COPY */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* ELITE BRAND ACCENT BADGE */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-zinc-900 bg-zinc-950 text-[10px] tracking-[0.2em] text-amber-400 uppercase font-semibold rounded-full"
          >
            <Sparkles size={10} className="text-amber-400" />
            Elite Speed-To-Market Infrastructure
          </motion.div>

          {/* HEADLINE */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-neutral-100 leading-[0.95] max-w-2xl">
            We ship production-ready startup MVPs in <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-500 bg-clip-text text-transparent">14 days.</span>
          </h1>

          {/* SUBHEADLINE */}
          <p className="max-w-xl text-zinc-400 font-sans text-sm md:text-base md:leading-relaxed font-normal tracking-wide">
            A Lagos-based dev studio trusted by US & UK founders to compress 10-week builds into 2 weeks — without cutting corners.
          </p>
          
          {/* STRATEGIC CTAS */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest px-8 py-5 transition-all duration-300 shadow-[0_15px_30px_rgba(0,196,140,0.15)] flex items-center justify-center gap-2 border-0 cursor-pointer group"
            >
              See Our Packages
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 font-sans text-xs uppercase font-bold tracking-widest text-zinc-500 hover:text-amber-400 transition-colors bg-transparent border-0 cursor-pointer"
            >
              <span>// Explore Architecture</span>
              <svg className="w-3 h-3 translate-y-[0.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* HIGH-TRUST ENTERPRISE SIGNALS BAR */}
          <div className="pt-8 border-t border-zinc-900/60 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-[11px] tracking-wide text-zinc-500 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle size={12} className="text-emerald-500" />
              Featured in Indie Hackers
            </span>
            <span className="text-zinc-800 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle size={12} className="text-emerald-500" />
              Worked with YC W25 founders
            </span>
            <span className="text-zinc-800 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle size={12} className="text-emerald-500" />
              100% on-time delivery
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: HIGH-END INTERACTIVE GRADIENT METALLIC ART SCULPTURE */}
        <div className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full flex items-center justify-center relative bg-transparent lg:mt-0 mt-6">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            
            {/* Ambient Background Aura Node */}
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Native Luxury Orb Layer 01 - Emerald Core Mesh */}
            <motion.div
              style={{ x: sphereX, y: sphereY }}
              animate={{ 
                borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 52% 48% / 60% 40% 60% 40%", "42% 58% 70% 30% / 45% 45% 55% 55%"],
                rotate: 360
              }}
              transition={{
                borderRadius: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 25, repeat: Infinity, ease: "linear" }
              }}
              className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-emerald-500 via-emerald-400/40 to-transparent opacity-40 blur-sm mix-blend-screen"
            />

            {/* Native Luxury Orb Layer 02 - Metallic Gold Intersect Fluid Component */}
            <motion.div
              style={{ 
                x: useSpring(mouseX, { damping: 40, stiffness: 200 }), 
                y: useSpring(mouseY, { damping: 40, stiffness: 200 }) 
              }}
              animate={{ 
                borderRadius: ["50% 50% 30% 70% / 50% 60% 40% 50%", "30% 70% 70% 30% / 50% 30% 70% 50%", "50% 50% 30% 70% / 50% 60% 40% 50%"],
                rotate: -360
              }}
              transition={{
                borderRadius: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 35, repeat: Infinity, ease: "linear" }
              }}
              className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-bl from-amber-500 via-amber-400/30 to-transparent opacity-30 blur-[2px] mix-blend-screen"
            />

            {/* Concentric Geometric UI Fine Lines (Adds the "Tech" to the Luxury) */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 border border-zinc-900 rounded-full opacity-60 pointer-events-none scale-105" />
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 border border-dashed border-zinc-900 rounded-full opacity-30 pointer-events-none" />
            
            {/* Minimalist Tech Reticle Target Overlay */}
            <div className="absolute w-3 h-3 border border-amber-500/40 rounded-full" />
            <div className="absolute w-px h-6 bg-zinc-900" />
            <div className="absolute h-px w-6 bg-zinc-900" />
          </div>
        </div>

      </div>
    </section>
  );
};