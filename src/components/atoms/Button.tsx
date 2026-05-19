import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'outline';
  className?: string;
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}
export const Button = ({ children, onClick, type = 'button', variant = 'primary', className = "" }: ButtonProps) => {
  const baseStyles = "relative px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-500 overflow-hidden group";
  
  const variants = {
    primary: "bg-emerald-600 text-black hover:bg-emerald-500",
    outline: "border border-emerald-900/50 text-emerald-500 hover:border-emerald-400 hover:text-emerald-400 bg-transparent"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: "0_0_20px_rgba(16,185,129,0.4)" }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Cinematic Glitch Overlay (on Hover) */}
      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
      
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
        {/* Modern Arrow Icon */}
        <span className="w-2 h-2 border-t-2 border-r-2 border-current rotate-45 group-hover:translate-x-1 transition-transform" />
      </span>
    </motion.button>
  );
};