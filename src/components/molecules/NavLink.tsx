import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  isExternal?: boolean;
}

export const NavLink = ({ to, children, onClick, isExternal = false }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const content = (
    <motion.div 
      className="relative group cursor-pointer py-2"
      initial={false}
      animate={isActive ? "hover" : "idle"}
      whileHover="hover"
    >
      <span className={`relative z-10 transition-colors duration-300 italic font-mono text-[10px] uppercase tracking-[0.2em] ${
        isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-emerald-400'
      }`}>
        {children}
      </span>
      
      {/* HUD-style underline animation */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-emerald-500 shadow-[0_0_8px_#10b981]"
        variants={{ 
          idle: { width: 0, opacity: 0 }, 
          hover: { width: '100%', opacity: 1 } 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );

  if (isExternal) {
    return <a href={to} onClick={onClick} className="no-underline">{content}</a>;
  }

  return (
    <Link to={to} onClick={onClick} className="no-underline">
      {content}
    </Link>
  );
};