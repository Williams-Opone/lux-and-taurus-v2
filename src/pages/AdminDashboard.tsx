import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Briefcase, Trash2, Edit3, XCircle, PlusCircle } from 'lucide-react';
import dayjs from 'dayjs';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
  status: string;
  created_at: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  live_link: string;
  image_url: string;
}

export const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'leads' | 'vault'>('leads');
  const [password, setPassword] = useState('');
  
  // Tracking if we are editing an existing project
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  // Form Management State
  const [projectForm, setProjectForm] = useState({
    title: '',
    image_url: '',
    tech_stack: '',
    live_link: '',
    description: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_KEY) {
      setIsAuthenticated(true);
    } else {
      alert("ACCESS_DENIED: Credential Mismatch.");
    }
  };

  // FETCH CORE ENGINE DATA
  useEffect(() => {
    if (isAuthenticated) {
      // 1. Fetch Leads via Vercel index routing
      fetch('/api/index/admin/leads', { headers: { 'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_KEY}` } })
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setLeads(data); })
        .catch(err => console.error("Leads_Sync_Failure:", err));

      // 2. Fetch Projects via Vercel index routing
      fetch('/api/index/projects')
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setProjects(data); })
        .catch(err => console.error("Vault_Sync_Failure:", err));
    }
  }, [isAuthenticated]);

  // HANDLE CREATE OR UPDATE REQUESTS
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProjectId 
      ? `/api/index/admin/projects/${editingProjectId}` 
      : `/api/index/admin/projects`;
    const method = editingProjectId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_KEY}`
        },
        body: JSON.stringify(projectForm)
      });
      
      if (response.ok) {
        alert(editingProjectId ? "VAULT_MODIFICATION: Core project values updated." : "VAULT_DEPLOYMENT: New asset live.");
        // Clean form status and refresh project table layout
        setProjectForm({ title: '', image_url: '', tech_stack: '', live_link: '', description: '' });
        setEditingProjectId(null);
        
        // ✨ FIXED: Realigned endpoint to route through index securely on hot reload
        const res = await fetch('/api/index/projects');
        const data = await res.json();
        if (Array.isArray(data)) setProjects(data);
      }
    } catch (err) {
      console.error("Vault_Transaction_Failure:", err);
    }
  };

  // TRIGGER EDIT SYSTEM CONFIG
  const startEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title,
      image_url: project.image_url,
      tech_stack: project.tech_stack,
      live_link: project.live_link || '',
      description: project.description
    });
  };

  // PURGE RECORD DELETION TARGET
  const handleDeleteProject = async (id: number) => {
    if (!confirm("CRITICAL_WARNING: Are you absolutely sure you want to permanently purge this asset from your database nodes? This cannot be undone.")) return;

    try {
      const response = await fetch(`/api/index/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_KEY}` }
      });
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Purge_Operation_Error:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md border border-zinc-900 p-6 sm:p-8 bg-zinc-950">
          <div className="flex justify-center mb-8"><Shield className="text-emerald-500" size={40} /></div>
          <h1 className="font-mono text-xs text-center text-zinc-500 uppercase tracking-[0.4em] mb-8 italic">// Command_Center_Auth</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="ENTER_ENCRYPTION_KEY"
              className="w-full bg-black border border-zinc-800 p-4 font-mono text-xs text-emerald-500 focus:outline-none focus:border-emerald-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-emerald-600 text-black font-black uppercase text-[10px] py-4 tracking-widest hover:bg-white transition-colors">Authorize_Access</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-6 md:p-12 font-mono pt-24 sm:pt-32 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* RESPONSIVE HEADER BLOCK */}
        <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-12 border-b border-zinc-900 pb-8">
          <div>
            <p className="text-emerald-500 text-[10px] tracking-[.5em] mb-2 uppercase italic">// Lead_Intelligence_Unit</p>
            <h1 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase">Mission_Control</h1>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest">Active_Leads: {leads.length}</p>
          </div>
        </header>

        {/* RESPONSIVE TABS CONTROLLER CONTAINER */}
        <nav className="flex gap-4 sm:gap-8 mb-12 border-b border-zinc-900 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setView('leads')}
            className={`pb-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all shrink-0 ${view === 'leads' ? 'text-emerald-500 border-b border-emerald-500 shadow-[0_4px_12px_-4px_#10b981]' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Layers size={14} /> Intelligence_Leads
          </button>
          <button 
            onClick={() => setView('vault')}
            className={`pb-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all shrink-0 ${view === 'vault' ? 'text-emerald-500 border-b border-emerald-500 shadow-[0_4px_12px_-4px_#10b981]' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Briefcase size={14} /> Vault_Management
          </button>
        </nav>

        {/* --- DYNAMIC RENDERING INTERFACES --- */}
        
        {/* VIEW 1: LEADS RUNNING ENGINE */}
        {view === 'leads' && (
          <div className="w-full overflow-x-auto border border-zinc-900 bg-zinc-950/20 backdrop-blur-md rounded-none">
            <table className="w-full text-left text-xs uppercase tracking-widest min-w-[600px]">
              <thead className="bg-zinc-950 text-zinc-500 border-b border-zinc-900">
                <tr>
                  <th className="p-4 text-[10px]">Contact</th>
                  <th className="p-4 text-[10px]">Project_Brief</th>
                  <th className="p-4 text-[10px]">Timestamp</th>
                  <th className="p-4 text-[10px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-zinc-600 text-[10px] italic">// No database entries found.</td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white mb-1 text-[11px]">{lead.name}</div>
                        <div className="text-zinc-500 text-[10px] lowercase truncate max-w-[150px]">{lead.email}</div>
                        <div className="text-emerald-500/60 text-[9px] mt-1 tracking-normal">{lead.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-emerald-500 mb-1 text-[10px]">[{lead.project_type}]</div>
                        <p className="text-zinc-400 normal-case lowercase truncate max-w-[200px]">{lead.message}</p>
                      </td>
                      <td className="p-4 text-zinc-500 text-[10px] whitespace-nowrap">{dayjs(lead.created_at).format('DD MMM YY // HH:mm')}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 border border-emerald-500/20 text-emerald-500 text-[8px] rounded-full bg-emerald-950/10 whitespace-nowrap">{lead.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* VIEW 2: PROJECTS INTEGRATION HUB */}
        {view === 'vault' && (
          <div className="space-y-12">
            {/* FORM CONTAINER BLOCK */}
            <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-zinc-950 p-5 sm:p-8 border border-zinc-900">
              <h3 className="col-span-full font-bold text-emerald-500 italic uppercase tracking-wider text-xs border-b border-zinc-900 pb-4 flex justify-between items-center">
                <span className="truncate max-w-[70%]">{editingProjectId ? `// Modifying_Asset_ID: [${editingProjectId}]` : '// Deploy_New_Project_To_The_Vault'}</span>
                {editingProjectId && (
                  <button type="button" onClick={() => { setEditingProjectId(null); setProjectForm({ title: '', image_url: '', tech_stack: '', live_link: '', description: '' }); }} className="text-red-500 text-[9px] flex items-center gap-1 hover:underline shrink-0">
                    <XCircle size={12} /> Abort_Edit
                  </button>
                )}
              </h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Project Name</label>
                <input type="text" required placeholder="e.g., ADAKA GLOBAL INC" className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Image URL (Hosted Asset)</label>
                <input type="url" required placeholder="https://image-node.com/asset.webp" className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono tracking-normal" value={projectForm.image_url} onChange={e => setProjectForm({...projectForm, image_url: e.target.value})} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Tech Stack</label>
                <input type="text" required placeholder="React, Flask, PostgreSQL" className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono" value={projectForm.tech_stack} onChange={e => setProjectForm({...projectForm, tech_stack: e.target.value})} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Live Link</label>
                <input type="url" placeholder="https://adakaglobal.com" className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono tracking-normal" value={projectForm.live_link} onChange={e => setProjectForm({...projectForm, live_link: e.target.value})} />
              </div>

              <div className="flex flex-col gap-2 col-span-full">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">System Overview (Description)</label>
                <textarea required placeholder="Outline project deliverables and engine parameters..." className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:outline-none focus:border-emerald-500 h-36 font-mono normal-case" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
              </div>

              <div className="col-span-full pt-2">
                <button type="submit" className="w-full sm:w-auto bg-emerald-600 text-black font-black uppercase text-[10px] py-4 px-8 tracking-widest hover:bg-white transition-colors duration-300">
                  {editingProjectId ? 'Commit_Structural_Update' : 'Execute_Deployment'}
                </button>
              </div>
            </form>

            {/* LIVE INVENTORY RESPONSIVE FRAME */}
            <div className="border border-zinc-900 bg-zinc-950/20">
              <h3 className="p-5 bg-zinc-950 border-b border-zinc-900 text-zinc-500 text-[10px] uppercase tracking-widest font-bold">// Active_Vault_Assets</h3>
              <div className="divide-y divide-zinc-900">
                {projects.length === 0 ? (
                  <div className="p-8 text-center text-zinc-600 text-[10px] italic">// No deployment records located.</div>
                ) : (
                  projects.map(project => (
                    <div key={project.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/10 transition-colors">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <img src={project.image_url} alt="" className="w-10 h-10 sm:w-12 sm:h-12 object-cover border border-zinc-800 bg-black shrink-0" onError={(e)=>{(e.target as HTMLImageElement).src='https://placehold.co/100x100/000000/10b981?text=LT'}} />
                        <div className="overflow-hidden">
                          <h4 className="text-xs sm:text-sm font-bold text-white uppercase truncate">{project.title}</h4>
                          <p className="text-[9px] sm:text-[10px] text-emerald-500 font-mono truncate">{project.tech_stack}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end sm:justify-start pt-2 sm:pt-0 border-t border-zinc-900/50 sm:border-none">
                        <button onClick={() => startEdit(project)} className="p-2 border border-zinc-800 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500 transition-colors" title="Edit Asset">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDeleteProject(project.id)} className="p-2 border border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-500 transition-colors" title="Purge Asset">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};