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
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: `
        radial-gradient(circle at 18% 18%, rgba(0, 170, 150, 0.32), transparent 32%),
        radial-gradient(circle at 80% 35%, rgba(130, 85, 40, 0.24), transparent 35%),
        radial-gradient(circle at 70% 85%, rgba(170, 20, 45, 0.35), transparent 42%),
        linear-gradient(135deg, #061514, #101211 55%, #17080c)
      `,
      padding: 20, gap: 20,
    }}>
      {/* ─── Sidebar glass card ─── */}
      <aside className="glass" style={{
        width: 256, flexShrink: 0, borderRadius: 22, padding: '28px 20px',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40, paddingLeft: 4 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 999,
            border: '1px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Activity size={16} color="var(--gold)" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--cream)', letterSpacing: '0.05em' }}>SIMC 27</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.15em', marginTop: 2 }}>ADMIN CONSOLE</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {menuItems.map((item, i) => {
            const active = pathname === item.path;
            return (
              <div
                key={i}
                onClick={() => router.push(item.path)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 14px', borderRadius: 12, cursor: 'pointer',
                  background: active ? 'var(--glass-fill-strong)' : 'transparent',
                  border: active ? '1px solid var(--glass-border-strong)' : '1px solid transparent',
                  color: active ? 'var(--cream)' : 'var(--ink-mute)',
                  transition: 'var(--t-fast)',
                }}
              >
                <span style={{ color: active ? 'var(--teal)' : 'var(--ink-faint)', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 13.5, fontWeight: active ? 500 : 400, flex: 1 }}>{item.label}</span>
                {active && (
                  <div style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--gold)', flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom snapshot — nested glass */}
        <div className="glass" style={{ marginTop: 'auto', borderRadius: 14, padding: 14 }}>
          <div className="kicker" style={{ marginBottom: 6, color: 'var(--gold)' }}>SNAPSHOT · 17 MAY</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', lineHeight: 1.6 }}>
            Backups daily at 03:00 ICT · 14 days kept
          </div>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '4px 4px 4px 0' }}>
        {children}
      </main>
    </div>
  );
}
