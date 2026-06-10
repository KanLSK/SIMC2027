"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Activity, Users, FileText, Gift, Gamepad2, MessageSquare, Lock } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: 'Overview',    path: '/admin',              icon: <Activity size={16} /> },
    { label: 'Applicants',  path: '/admin/applicants',   icon: <Users size={16} /> },
    { label: 'Exams',       path: '/admin/exams',        icon: <FileText size={16} /> },
    { label: 'Souvenirs',   path: '/admin/souvenirs',    icon: <Gift size={16} /> },
    { label: 'Mini-games',  path: '/admin/mini-games',   icon: <Gamepad2 size={16} /> },
    { label: 'Comms',       path: '/admin/comms',        icon: <MessageSquare size={16} /> },
    { label: 'Permissions', path: '/admin/permissions',  icon: <Lock size={16} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden p-5 gap-5" style={{
      background: `
        radial-gradient(circle at 18% 18%, rgba(0, 170, 150, 0.32), transparent 32%),
        radial-gradient(circle at 80% 35%, rgba(130, 85, 40, 0.24), transparent 35%),
        radial-gradient(circle at 70% 85%, rgba(170, 20, 45, 0.35), transparent 42%),
        linear-gradient(135deg, #061514, #101211 55%, #17080c)
      `
    }}>
      {/* ─── Sidebar glass card ─── */}
      <aside className="glass w-64 shrink-0 rounded-[22px] py-7 px-5 flex flex-col overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3.5 mb-10 pl-1">
          <div className="w-9 h-9 rounded-full border border-simc-gold flex items-center justify-center">
            <Activity size={16} className="text-simc-gold" />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-simc-cream tracking-wide">SIMC 27</div>
            <div className="mono text-[9px] text-simc-ink-mute tracking-[0.15em] mt-0.5">ADMIN CONSOLE</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item, i) => {
            const active = pathname === item.path;
            return (
              <div
                key={i}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl cursor-pointer transition-colors duration-200 border
                  ${active ? 'bg-simc-glass-fill-strong border-simc-glass-border-strong text-simc-cream' 
                           : 'bg-transparent border-transparent text-simc-ink-mute'}`}
              >
                <span className={`shrink-0 ${active ? 'text-simc-teal' : 'text-simc-ink-faint'}`}>{item.icon}</span>
                <span className={`text-[13.5px] flex-1 ${active ? 'font-medium' : 'font-normal'}`}>{item.label}</span>
                {active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-simc-gold shrink-0" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom snapshot — nested glass */}
        <div className="glass mt-auto rounded-[14px] p-3.5">
          <div className="kicker mb-1.5 text-simc-gold">SNAPSHOT · 17 MAY</div>
          <div className="text-[11.5px] text-simc-ink-mute leading-relaxed">
            Backups daily at 03:00 ICT · 14 days kept
          </div>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <main className="flex-1 overflow-y-auto p-1 pr-0">
        {children}
      </main>
    </div>
  );
}
