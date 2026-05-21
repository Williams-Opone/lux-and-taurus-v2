import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';

export const MissionIntake = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Web Development',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('transmitting'); // UI feedback starts
    
    try {
      const response = await fetch('/api/index/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '',phone: '', projectType: 'Web Development', message: '' });
      } else {
        setStatus('idle');
        alert("Transmission Interrupted.");
      }
    } catch (error) {
      console.error("System Error:", error);
      setStatus('idle');
      alert("System Offline. Check local node (Backend).");
    }
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-emerald-900/20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-emerald-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-4 italic">
            // Mission_Intake_Protocol
          </h2>
          <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
            Secure a <span className="text-zinc-700">Slot.</span>
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NAME */}
            <div className="group flex flex-col gap-2">
              <label className="font-mono text-[9px] uppercase text-zinc-600 group-focus-within:text-emerald-500 transition-colors">
                Identify_Subject [Full Name]
              </label>
              <input 
                required
                name="name"
                type="text" 
                className="bg-[#0a0a0a] border border-zinc-800 p-4 font-mono text-xs text-white focus:border-emerald-500 outline-none transition-all"
                placeholder="WILLIAMS_OPONE" 
                value={formData.name} 
                onChange={handleChange}
              />
            </div>

            {/* EMAIL INPUT */}
            <div className="group flex flex-col gap-2">
              <label className="font-mono text-[9px] uppercase text-zinc-600 group-focus-within:text-emerald-500 transition-colors">
                Return_Channel [Email]
              </label>
              <input 
                required
                name="email"
                type="email" 
                className="bg-[#0a0a0a] border border-zinc-800 p-4 font-mono text-xs text-white focus:border-emerald-500 outline-none transition-all"
                placeholder="DEV@LUXANDTAURUS.COM" 
                value={formData.email} 
                onChange={handleChange}
              />
            </div>
            <div className="group flex flex-col gap-2">
              <label className="font-mono text-[9px] uppercase text-zinc-600 group-focus-within:text-emerald-500 transition-colors">
                Contact_Digit [Phone]
              </label>
              <input 
                name="phone"
                type="tel" 
                className="bg-[#0a0a0a] border border-zinc-800 p-4 font-mono text-xs text-white focus:border-emerald-500 outline-none transition-all"
                placeholder="+234..." 
                value={formData.phone} 
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="group flex flex-col gap-2"> 
            <label className="font-mono text-[9px] uppercase text-zinc-600 group-focus-within:text-emerald-500 transition-colors">
              Mission_Type [Service Selection]
            </label>
            <select 
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="bg-[#0a0a0a] border border-zinc-800 p-4 font-mono text-xs text-white focus:border-emerald-500 outline-none transition-all appearance-none"
            >
              <option value="Web Development">Web Development</option>
              <option value="SaaS / Web App">SaaS / Web App</option>
              <option value="Automation">Automation</option>
              <option value="Consultancy">Consultancy</option>
            </select>
          </div>
          {/* MESSAGE INPUT */}
          <div className="group flex flex-col gap-2">
            <label className="font-mono text-[9px] uppercase text-zinc-600 group-focus-within:text-emerald-500 transition-colors">
              Briefing_Details [Project Scope]
            </label>
            <textarea 
              required
              name="message"
              rows={5}
              className="bg-[#0a0a0a] border border-zinc-800 p-4 font-mono text-xs text-white focus:border-emerald-500 outline-none transition-all resize-none"
              placeholder="DESCRIBE_THE_MISSION..." 
              value={formData.message} 
              onChange={handleChange}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <Button 
              disabled={status === 'transmitting'}
              type="submit" 
              className="w-full md:w-auto"
              variant={status === 'success' ? 'outline' : 'primary'}
            >
              {status === 'idle' && "Transmit_Data"}
              {status === 'transmitting' && "Encrypting..."}
              {status === 'success' && "Mission_Logged_Successfully"}
            </Button>
          </div>
        </form>

        {/* Decorative HUD Footer */}
        <div className="mt-16 flex justify-between items-center opacity-20 font-mono text-[7px] text-emerald-500 uppercase tracking-widest">
          <span>Encrypted_TLS_1.3</span>
          <span>Lagos_Node_Active</span>
          <span>Status: Waiting_For_Brief</span>
        </div>
      </div>
    </section>
  );
};