import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Spring settings for that "heavy" tactical feel
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if the user is hovering over a button or link
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* The Central Crosshair Dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
        
        {/* The Outer "Targeting" Ring */}
        <motion.div
          animate={{
            scale: isPointer ? 1.5 : 1,
            rotate: isPointer ? 90 : 0,
            borderColor: isPointer ? '#10b981' : 'rgba(16, 185, 129, 0.2)'
          }}
          className="absolute w-8 h-8 border border-emerald-500/20 rounded-sm transition-colors duration-300"
        />

        {/* Tactical Crosshair Lines */}
        <motion.div 
           animate={{ opacity: isPointer ? 1 : 0.3 }}
           className="absolute w-[1px] h-3 bg-emerald-500/40 -top-4" 
        />
        <motion.div 
           animate={{ opacity: isPointer ? 1 : 0.3 }}
           className="absolute w-[1px] h-3 bg-emerald-500/40 -bottom-4" 
        />
        <motion.div 
           animate={{ opacity: isPointer ? 1 : 0.3 }}
           className="absolute h-[1px] w-3 bg-emerald-500/40 -left-4" 
        />
        <motion.div 
           animate={{ opacity: isPointer ? 1 : 0.3 }}
           className="absolute h-[1px] w-3 bg-emerald-500/40 -right-4" 
        />
      </motion.div>
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-[-1] pointer-events-none"
        />
    </div>
  );
};