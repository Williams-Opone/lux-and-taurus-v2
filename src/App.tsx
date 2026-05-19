import { Routes, Route } from 'react-router-dom'; // 1. Add these imports
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/organisms/Navbar';
import { Hero } from './pages/Hero'; 
import { TacticalProcess } from '@/components/organisms/TacticalProcess';
import { TechMarquee } from '@/components/organisms/TechMarquee';
import { ProjectVault } from '@/components/organisms/ProjectVault';
import { MissionIntake } from '@/components/organisms/MissionIntake';
import { CustomCursor } from '@/components/atoms/CustomCursor';
import { AboutMe } from '@/components/organisms/AboutMe';
import { Footer } from "@/components/organisms/Footer";
import { AdminDashboard } from "./pages/AdminDashboard"; // Ensure this path is correct

// --- THE HOME COMPONENT (Everything you already built) ---
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
        <Hero />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent relative">
          <motion.div 
            initial={{ left: "-100%" }}
            whileInView={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 w-24 h-px bg-emerald-500 shadow-[0_0_15px_#10b981]"
          />
        </div>
        <TacticalProcess />
        <TechMarquee />
        <ProjectVault />
        <AboutMe />
        <section id="contact">
          <MissionIntake />
        </section>
      </main>
    </>
  );
};

// --- THE MAIN APP ROUTER ---
export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200">
      <CustomCursor />
      <Navbar />
      
      {/* 2. ROUTING LOGIC */}
      <Routes>
        {/* Shows the main portfolio/agency site */}
        <Route path="/" element={<Home />} />
        
        {/* Shows the hidden admin command center */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </div>
  );
}