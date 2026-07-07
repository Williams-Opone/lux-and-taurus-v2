export const Nav = () => {
  const jumpToNode = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 inset-x-0 h-20 bg-black/80 backdrop-blur-xl border-b border-zinc-900/60 z-50 flex items-center justify-between px-6 sm:px-12 font-sans">
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="cursor-pointer select-none font-black text-sm tracking-[0.3em] text-white flex items-center gap-1.5"
      >
        <span>LUX & TAURUS</span>
        <span className="w-1.5 h-1.5 bg-[#10B981] rotate-45" />
      </div>

      <div className="hidden md:flex items-center gap-8 font-medium text-[11px] uppercase tracking-widest text-zinc-400">
        <button onClick={() => jumpToNode('portfolio')} className="hover:text-[#10B981] transition-colors cursor-pointer bg-transparent border-0">Work</button>
        <button onClick={() => jumpToNode('method')} className="hover:text-[#10B981] transition-colors cursor-pointer bg-transparent border-0">Method</button>
        <button onClick={() => jumpToNode('pricing')} className="hover:text-[#10B981] transition-colors cursor-pointer bg-transparent border-0">Plans</button>
        
        <button 
          onClick={() => jumpToNode('contact')} 
          className="px-4 py-2 border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black font-bold transition-all duration-300 rounded-none cursor-pointer tracking-wider"
        >
          [ CALL → ]
        </button>
      </div>
    </nav>
  );
};