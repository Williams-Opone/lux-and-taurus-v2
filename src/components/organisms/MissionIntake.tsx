import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';

export const MissionIntake = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Core MVP ($2,500)',
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
    setStatus('transmitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        setStatus('success');
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          projectType: 'Core MVP ($2,500)', 
          message: '' 
        });
        
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('idle');
        alert("Transmission Interrupted. Verify serverless status thresholds.");
      }
    } catch (error) {
      console.error("System Error:", error);
      setStatus('idle');
      alert("System Offline. Check production network routing layers.");
    }
  };

  return (
    <section id="contact" className="py-40 bg-black border-t border-zinc-900/40 relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,196,140,0.01)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* PREMIUM SIMPLIFIED HEADER ARCHITECTURE */}
        <div className="mb-16 border-b border-zinc-900 pb-8 text-left">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-1 h-1 bg-amber-500 shadow-[0_0_8px_#D4AF37]" />
            <span className="font-sans text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold">Intake Protocol</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight text-neutral-100">
            Begin Your 14-Day Sprint
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* NAME */}
            <div className="group flex flex-col gap-2">
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                Full Name
              </label>
              <input 
                required
                name="name"
                type="text" 
                className="bg-zinc-950 border border-zinc-900 p-4 font-sans text-xs text-white focus:border-emerald-500 outline-none transition-all rounded-none"
                placeholder="John Doe" 
                value={formData.name} 
                onChange={handleChange}
              />
            </div>

            {/* EMAIL */}
            <div className="group flex flex-col gap-2">
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                Email Address
              </label>
              <input 
                required
                name="email"
                type="email" 
                className="bg-zinc-950 border border-zinc-900 p-4 font-sans text-xs text-white focus:border-emerald-500 outline-none transition-all rounded-none"
                placeholder="founder@company.com" 
                value={formData.email} 
                onChange={handleChange}
              />
            </div>

            {/* PHONE */}
            <div className="group flex flex-col gap-2">
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                Direct Wire [Optional]
              </label>
              <input 
                name="phone"
                type="tel" 
                className="bg-zinc-950 border border-zinc-900 p-4 font-sans text-xs text-white focus:border-emerald-500 outline-none transition-all rounded-none"
                placeholder="+1 (555) 000-0000" 
                value={formData.phone} 
                onChange={handleChange}
              />
            </div>

            {/* PACKAGE SELECTION */}
            <div className="group flex flex-col gap-2"> 
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                Deployment Tier Selection
              </label>
              <div className="relative">
                <select 
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-900 p-4 font-sans text-xs text-white focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer rounded-none"
                >
                  <option value="Launch Sprint ($1,500)">Launch Sprint — $1,500 (7 Days)</option>
                  <option value="Core MVP ($2,500)">Core MVP — $2,500 (14 Days)</option>
                  <option value="Pro MVP ($3,900)">Pro MVP — $3,900 (14 Days)</option>
                  <option value="Custom Enterprise / Advisory">Custom Enterprise Architecture</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[8px] text-zinc-600">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          <div className="group flex flex-col gap-2">
            <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
              Core Deliverables & Core Features Briefing
            </label>
            <textarea 
              required
              name="message"
              rows={5}
              className="bg-zinc-950 border border-zinc-900 p-4 font-sans text-xs text-white focus:border-emerald-500 outline-none transition-all resize-none rounded-none"
              placeholder="Outline your application logic, core database models, or desired API nodes here..." 
              value={formData.message} 
              onChange={handleChange}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <Button 
              disabled={status === 'transmitting'}
              type="submit" 
              className="w-full md:w-auto font-sans font-bold text-xs uppercase tracking-widest px-10 py-5 rounded-none"
              variant={status === 'success' ? 'outline' : 'primary'}
            >
              {status === 'idle' && "Transmit Sprint Request"}
              {status === 'transmitting' && "Encrypting Payload..."}
              {status === 'success' && "Mission Briefing Logged Successfully"}
            </Button>
          </div>
        </form>

        {/* Minimalist Tech HUD Footer */}
        <div className="mt-20 flex justify-between items-center opacity-30 font-sans text-[8px] text-zinc-500 uppercase tracking-widest font-medium">
          <span>TLS 1.3 Encryption Active</span>
          <span>Node // Lagos Studio</span>
          <span>Status: {status === 'transmitting' ? "Syncing Nodes" : "Stream Port Listening"}</span>
        </div>
      </div>
    </section>
  );
};