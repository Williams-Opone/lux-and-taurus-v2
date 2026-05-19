import { useLocation, useNavigate } from 'react-router-dom';

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname === '/admin';

  // Smart routing scroll handler
  const scrollTo = (id: string) => {
    if (isAdmin) {
      // If the user is on the admin dashboard, reroute home first, then snap scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand Side */}
        <div className="space-y-4">
          <div 
            onClick={() => isAdmin ? navigate('/') : window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="w-4 h-4 border border-emerald-500 rotate-45 transition-transform duration-500 group-hover:rotate-90" />
            <span className="font-mono text-xs font-black tracking-[0.3em] uppercase text-white">
              Lux <span className="text-emerald-500">&</span> Taurus
            </span>
          </div>
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest max-w-xs leading-relaxed">
            Technical supremacy for the modern web. Built for visionary founders.
          </p>
        </div>

        {/* Intelligence Side */}
        <div className="grid grid-cols-2 gap-16 uppercase font-mono text-[9px] tracking-widest text-zinc-500">
          <div className="space-y-4">
            <p className="text-zinc-300 italic">// Sector</p>
            <ul className="space-y-2">
              <li 
                onClick={() => scrollTo('vault')} 
                className="hover:text-emerald-500 cursor-pointer transition-colors"
              >
                The_Vault
              </li>
              <li 
                onClick={() => scrollTo('process')} 
                className="hover:text-emerald-500 cursor-pointer transition-colors"
              >
                The_Method
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-300 italic">// Node</p>
            <ul className="space-y-2">
              <li>Lagos, NG</li>
              <li>Remote_Ready</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[8px] text-zinc-800 uppercase tracking-[0.5em]">
          © 2026 // Lux_And_Taurus_Sole_Proprietorship
        </span>
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-900 animate-pulse" />
          <span className="font-mono text-[8px] text-zinc-700 uppercase tracking-widest">
            System_Encrypted // All_Rights_Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};