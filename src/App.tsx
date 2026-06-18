import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

import { Navbar } from './components/organisms/Navbar';
import { Hero } from './pages/Hero'; 
import { CustomCursor } from '@/components/atoms/CustomCursor';
import { Footer } from "@/components/organisms/Footer";

// ⚡ HARDWARE ACCELERATION: Lazy-load heavy downstream views to eliminate initial render blocks
const TacticalProcess = lazy(() => import('@/components/organisms/TacticalProcess').then(m => ({ default: m.TacticalProcess })));
const ProjectPricing = lazy(() => import('@/components/organisms/ProjectPricing').then(m => ({ default: m.ProjectPricing })));
const TechMarquee = lazy(() => import('@/components/organisms/TechMarquee').then(m => ({ default: m.TechMarquee })));
const ProjectVault = lazy(() => import('@/components/organisms/ProjectVault').then(m => ({ default: m.ProjectVault })));
const AboutMe = lazy(() => import('@/components/organisms/AboutMe').then(m => ({ default: m.AboutMe })));
const TestimonialsVault = lazy(() => import('@/components/organisms/TestimonialsVault').then(m => ({ default: m.TestimonialsVault })));
const MissionIntake = lazy(() => import('@/components/organisms/MissionIntake').then(m => ({ default: m.MissionIntake })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

// Minimal, layout-matched terminal pulse skeleton to display while lazy-loaded blocks stream into memory
const SectionLoader = () => <div className="h-48 w-full bg-[#050505] border-t border-zinc-900/50 animate-pulse" />;

// --- THE HOME COMPONENT (With optimized multi-stage rendering) ---
const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      {/* TOP SCANLINE PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-emerald-500 z-[100] origin-left shadow-[0_0_10px_#10b981]"
        style={{ scaleX }}
      />
      <main>
        {/* Hero renders immediately on initial handshakes */}
        <Hero />
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent relative">
          <motion.div 
            initial={{ left: "-100%" }}
            whileInView={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 w-24 h-px bg-emerald-500 shadow-[0_0_15px_#10b981]"
          />
        </div>

        {/* ⚡ SUSPENSE BALANCING GRID: Streams sections as they enter viewport ranges */}
        <Suspense fallback={<SectionLoader />}>
          <TacticalProcess />
          <ProjectPricing />
          <TechMarquee />
          <ProjectVault />
          <AboutMe />
          <TestimonialsVault />
          <section id="contact">
            <MissionIntake />
          </section>
        </Suspense>
      </main>
    </>
  );
};

// --- THE MAIN APP ROUTER ---
export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200 antialiased overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      
      {/* ⚡ ASYNC ROUTING LOGIC */}
      <Suspense fallback={
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 font-mono text-xs text-zinc-600 uppercase tracking-widest">
          <div className="w-4 h-4 border border-zinc-800 border-t-emerald-500 animate-spin" />
          ESTABLISHING_COMMAND_LINK...
        </div>
      }>
        <Routes>
          {/* Shows the main portfolio/agency site */}
          <Route path="/" element={<Home />} />
          
          {/* Shows the hidden admin command center */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}