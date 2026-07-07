import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Briefcase, Trash2, Edit3, XCircle } from 'lucide-react';
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
      fetch('/api/admin/leads', { 
        headers: { 'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_KEY}` } 
      })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setLeads(data); })
      .catch(err => console.error(err));

      // 2. Fetch Projects via Vercel index routing
      fetch('/api/projects')
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setProjects(data); })
        .catch(err => console.error("Vault_Sync_Failure:", err));
    }
  }, [isAuthenticated]);

  // HANDLE CREATE OR UPDATE REQUESTS
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProjectId 
      ? `/api/admin/projects/${editingProjectId}` 
      : `/api/admin/projects`;
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
        
        // Securely re-align endpoint to route through index on hot reload
        const res = await fetch('/api/projects');
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

  // PURGE LEAD RECORD DELETION TARGET
  const handleDeleteLead = async (leadId: number) => {
    if (!confirm(`Execute hard purge on Lead ID: #${leadId}? This action is irreversible.`)) {
      return;
    }
  
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_KEY}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
        alert(`Lead #${leadId} has been successfully purged from cloud arrays.`);
      } else {
        const errorData = await response.json();
        alert(`Purge aborted: ${errorData.error || 'Server rejected request.'}`);
      }
    } catch (error) {
      console.error("Deletion breakdown:", error);
      alert("System Offline. Purge communication failure.");
    }
  };

  // PURGE PROJECT RECORD DELETION TARGET
  const handleDeleteProject = async (projectId: number) => {
    if (!confirm(`Execute hard purge on Project Asset ID: #${projectId}? This action is irreversible.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
        alert(`Asset #${projectId} has been successfully dropped from database layers.`);
      } else {
        const errorData = await response.json();
        alert(`Purge aborted: ${errorData.error || 'Server rejected transaction request.'}`);
      }
    } catch (error) {
      console.error("Vault manipulation error:", error);
      alert("System Offline. Vault endpoint unreachable.");
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
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-6 md:p-8 lg:p-12 font-mono pt-24 sm:pt-32 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* RESPONSIVE HEADER BLOCK */}
        <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 border-b border-zinc-900 pb-8">
          <div>
            <p className="text-emerald-500 text-[9px] sm:text-[10px] tracking-[.5em] mb-2 uppercase italic">// Lead_Intelligence_Unit</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase">Mission_Control</h1>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest">Active_Leads: {leads.length}</p>
          </div>
        </header>

        {/* RESPONSIVE TABS CONTROLLER CONTAINER */}
        <nav className="flex gap-4 sm:gap-8 mb-10 border-b border-zinc-900 overflow-x-auto no-scrollbar scroll-smooth">
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

        {/* VIEW 1: LEADS RUNNING ENGINE */}
        {view === 'leads' && (
          <div className="w-full">
            {/* DESKTOP RESPONSIVE GRID TABLE (Hidden on Small Screens) */}
            <div className="hidden md:block w-full border border-zinc-900 bg-zinc-950/20 backdrop-blur-md rounded-none overflow-hidden">
              <table className="w-full text-left text-xs uppercase tracking-widest">
                <thead className="bg-zinc-950 text-zinc-500 border-b border-zinc-900">
                  <tr>
                    <th className="p-4 text-[10px] lg:w-1/4">Contact</th>
                    <th className="p-4 text-[10px] lg:w-2/5">Project_Brief</th>
                    <th className="p-4 text-[10px]">Timestamp</th>
                    <th className="p-4 text-[10px]">Status</th>
                    <th className="p-4 text-[10px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-zinc-600 text-[10px] italic">// No database entries found.</td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="p-4 align-top">
                          <div className="font-bold text-white mb-1 text-[11px] truncate max-w-[180px]">{lead.name}</div>
                          <div className="text-zinc-500 text-[10px] lowercase truncate max-w-[180px]">{lead.email}</div>
                          <div className="text-emerald-500/60 text-[9px] mt-1 tracking-normal">{lead.phone || 'N/A'}</div>
                        </td>
                        <td className="p-4 align-top">
                          <div className="text-emerald-500 mb-1 text-[10px]">[{lead.project_type}]</div>
                          <p className="text-zinc-400 normal-case lowercase text-[11px] line-clamp-3 md:max-w-[280px] lg:max-w-[400px]" title={lead.message}>
                            {lead.message}
                          </p>
                        </td>
                        <td className="p-4 align-top text-zinc-500 text-[10px] whitespace-nowrap">
                          {dayjs(lead.created_at).format('DD MMM YY // HH:mm')}
                        </td>
                        <td className="p-4 align-top">
                          <span className="px-2.5 py-0.5 border border-emerald-500/20 text-emerald-500 text-[8px] rounded-full bg-emerald-950/10 whitespace-nowrap">{lead.status}</span>
                        </td>
                        <td className="p-4 align-top text-right">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-zinc-600 hover:text-red-500 border border-transparent hover:border-red-500/20 hover:bg-red-950/10 transition-all rounded-none"
                            title="Purge Record"
                          >
                            <Trash2 size={13} /> 
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE ADAPTIVE METRIC CARDS (Visible only on Mobile Viewports) */}
            <div className="block md:hidden space-y-4">
              {leads.length === 0 ? (
                <div className="p-10 border border-zinc-900 bg-zinc-950/20 text-center text-zinc-600 text-[10px] italic rounded-none">
                  // No database entries found.
                </div>
              ) : (
                leads.map((lead) => (
                  <div key={lead.id} className="w-full border border-zinc-900 bg-zinc-950/40 p-4 rounded-none flex flex-col gap-3 relative overflow-hidden">
                    <div className="flex justify-between items-start border-b border-zinc-900/60 pb-2">
                      <div className="overflow-hidden max-w-[80%]">
                        <div className="font-bold text-white text-[12px] truncate">{lead.name}</div>
                        <div className="text-zinc-500 text-[10px] lowercase truncate">{lead.email}</div>
                        <div className="text-emerald-500/60 text-[9px] tracking-normal mt-0.5">{lead.phone || 'N/A'}</div>
                      </div>
                      <span className="px-2 py-0.5 border border-emerald-500/20 text-emerald-500 text-[8px] rounded-full bg-emerald-950/10 shrink-0">
                        {lead.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-400">
                      <div className="text-emerald-500 text-[9px] mb-1 font-bold">PROJECT_TYPE: [{lead.project_type}]</div>
                      <p className="normal-case lowercase leading-relaxed line-clamp-4 bg-black/20 p-2 border border-zinc-900/40">
                        {lead.message}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-zinc-900/60 text-[9px]">
                      <span className="text-zinc-500">
                        {dayjs(lead.created_at).format('DD MMM YY // HH:mm')}
                      </span>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 text-zinc-500 hover:text-red-500 border border-zinc-900 hover:border-red-500/20 bg-zinc-950/80 transition-all flex items-center gap-1 uppercase tracking-widest text-[8px]"
                      >
                        <Trash2 size={11} /> Purge
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: PROJECTS INTEGRATION HUB */}
        {view === 'vault' && (
          <div className="space-y-8 lg:space-y-12">
            {/* TWO COLUMN MASTER LAYOUT ON DESKTOP */}
            <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 bg-zinc-950 p-4 sm:p-6 md:p-8 border border-zinc-900">
              <h3 className="col-span-full font-bold text-emerald-500 italic uppercase tracking-wider text-xs border-b border-zinc-900 pb-4 flex justify-between items-center">
                <span className="truncate max-w-[70%]">{editingProjectId ? `// Modifying_Asset_ID: [${editingProjectId}]` : '// Deploy_New_Project_To_The_Vault'}</span>
                {editingProjectId && (
                  <button type="button" onClick={() => { setEditingProjectId(null); setProjectForm({ title: '', image_url: '', tech_stack: '', live_link: '', description: '' }); }} className="text-red-500 text-[9px] flex items-center gap-1 hover:underline shrink-0">
                    <XCircle size={12} /> Abort_Edit
                  </button>
                )}
              </h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Project Name</label>
                <input type="text" required placeholder="e.g., ADAKA GLOBAL INC" className="w-full bg-black border border-zinc-800 p-3 sm:p-4 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono rounded-none" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Image URL (Hosted Asset)</label>
                <input type="url" required placeholder="https://image-node.com/asset.webp" className="w-full bg-black border border-zinc-800 p-3 sm:p-4 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono tracking-normal rounded-none" value={projectForm.image_url} onChange={e => setProjectForm({...projectForm, image_url: e.target.value})} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Tech Stack</label>
                <input type="text" required placeholder="React, Flask, PostgreSQL" className="w-full bg-black border border-zinc-800 p-3 sm:p-4 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono rounded-none" value={projectForm.tech_stack} onChange={e => setProjectForm({...projectForm, tech_stack: e.target.value})} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Live Link</label>
                <input type="url" placeholder="https://adakaglobal.com" className="w-full bg-black border border-zinc-800 p-3 sm:p-4 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono tracking-normal rounded-none" value={projectForm.live_link} onChange={e => setProjectForm({...projectForm, live_link: e.target.value})} />
              </div>

              <div className="flex flex-col gap-1.5 col-span-full">
                <label className="text-[9px] text-zinc-500 uppercase tracking-widest">System Overview (Description)</label>
                <textarea required placeholder="Outline project deliverables and engine parameters..." className="w-full bg-black border border-zinc-800 p-3 sm:p-4 text-xs text-white focus:outline-none focus:border-emerald-500 h-28 sm:h-36 font-mono normal-case rounded-none resize-none" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
              </div>

              <div className="col-span-full pt-1">
                <button type="submit" className="w-full sm:w-auto bg-emerald-600 text-black font-black uppercase text-[10px] py-3.5 px-8 tracking-widest hover:bg-white transition-colors duration-300 rounded-none">
                  {editingProjectId ? 'Commit_Structural_Update' : 'Execute_Deployment'}
                </button>
              </div>
            </form>

            {/* LIVE INVENTORY RESPONSIVE FRAME */}
            <div className="border border-zinc-900 bg-zinc-950/20">
              <h3 className="p-4 sm:p-5 bg-zinc-950 border-b border-zinc-900 text-zinc-500 text-[10px] uppercase tracking-widest font-bold">// Active_Vault_Assets</h3>
              <div className="divide-y divide-zinc-900">
                {projects.length === 0 ? (
                  <div className="p-8 text-center text-zinc-600 text-[10px] italic">// No deployment records located.</div>
                ) : (
                  projects.map(project => (
                    <div key={project.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/10 transition-colors">
                      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                        <img 
                          src={project.image_url} 
                          alt="" 
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover border border-zinc-800 bg-black shrink-0" 
                          onError={(e)=>{(e.target as HTMLImageElement).src='https://placehold.co/100x100/000000/10b981?text=LT'}} 
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs sm:text-sm font-bold text-white uppercase truncate max-w-[180px] sm:max-w-[300px] md:max-w-[400px]">{project.title}</h4>
                          <p className="text-[9px] sm:text-[10px] text-emerald-500 font-mono truncate max-w-[180px] sm:max-w-[300px]">{project.tech_stack}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end sm:justify-start pt-3 sm:pt-0 border-t border-zinc-900/40 sm:border-none shrink-0">
                        <button onClick={() => startEdit(project)} className="p-2 border border-zinc-800 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500 transition-colors bg-zinc-950/40 rounded-none" title="Edit Asset">
                          <Edit3 size={13} />
                        </button>
                        <button onClick={() => handleDeleteProject(project.id)} className="p-2 border border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-500 transition-colors bg-zinc-950/40 rounded-none" title="Purge Asset">
                          <Trash2 size={13} />
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