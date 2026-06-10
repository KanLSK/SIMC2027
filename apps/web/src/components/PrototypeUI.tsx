// @ts-nocheck
"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

// ─── Background scene ─────────────────────────────────────────────────
export function SceneBG({ tone = "warm", children, dense = true }) {
  const orbs = useMemo(() => {
    const palette = tone === "cool"
      ? ["rgba(53,107,109,0.45)", "rgba(143,15,27,0.35)", "rgba(255,236,155,0.18)"]
      : tone === "deep"
      ? ["rgba(75,7,0,0.6)", "rgba(143,15,27,0.4)", "rgba(53,107,109,0.18)"]
      : ["rgba(198,27,16,0.45)", "rgba(143,15,27,0.55)", "rgba(255,236,155,0.18)", "rgba(53,107,109,0.22)"];
    return Array.from({ length: 5 }, (_, i) => ({
      bg: palette[i % palette.length],
      size: 280 + (i * 80) % 320,
      left: (i * 23 + 12) % 90,
      top: (i * 37 + 8) % 80,
      delay: i * 0.7,
    }));
  }, [tone]);

  const dots = useMemo(() => {
    if (!dense) return [];
    return Array.from({ length: 24 }, (_, i) => ({
      left: (i * 41 + 7) % 100,
      top: (i * 23 + 11) % 100,
      size: 2 + (i % 4),
      opacity: 0.25 + ((i * 7) % 50) / 100,
      delay: (i * 0.3) % 6,
    }));
  }, [dense]);

  return (
    <div className={`scene-bg ${tone === "cool" ? "cool" : ""} absolute inset-0`}>
      <div className="scene-orbs">
        {/* orb bg, size, position & animation are all computed → inline only */}
        {orbs.map((o, i) => (
          <span key={i} style={{
            background: o.bg,
            width: o.size, height: o.size,
            left: `${o.left}%`, top: `${o.top}%`,
            animation: `drift ${10 + i * 2}s ease-in-out ${o.delay}s infinite`,
          }} />
        ))}
      </div>
      <div className="bokeh">
        {dots.map((d, i) => (
          <i key={i} style={{
            left: `${d.left}%`, top: `${d.top}%`,
            width: d.size, height: d.size,
            opacity: d.opacity,
            animation: `float ${4 + (i % 5)}s ease-in-out ${d.delay}s infinite`,
          }} />
        ))}
      </div>
      <svg
        viewBox="0 0 600 600"
        className="absolute pointer-events-none opacity-[0.05]"
        style={{ right: "-80px", top: "10%", width: 520, height: 520 }}
        aria-hidden="true"
      >
        <circle cx="300" cy="300" r="220" fill="none" stroke="#FFF7E2" strokeWidth="14"
          strokeDasharray="900 200" strokeDashoffset="20" />
      </svg>
      {children}
    </div>
  );
}

// ─── Nav pill ─────────────────────────────────────────────────────────
export function NavPill({ active = "home", brand = "SIMC 27" }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setIsLoggedIn(!!user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleExamClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(isLoggedIn ? '/exam' : '/auth/login');
  };

  const items = [
    { id: "home",     label: "หน้าแรก", href: "/",          onClick: undefined },
    { id: "exam",     label: "ข้อสอบ",  href: "#",          onClick: handleExamClick },
    { id: "camp",     label: "Camp Day", href: "/#camp",     onClick: undefined },
    { id: "souvenir", label: "Souvenir", href: "/#souvenir", onClick: undefined },
    { id: "game",     label: "Game",     href: "/#game",     onClick: undefined },
  ];

  return (
    <div className="glass nav-pill flex items-center gap-1 p-[6px] rounded-full">
      <a href="/" className="flex items-center gap-2 px-[18px] py-[10px] font-display text-[15px] font-semibold tracking-[0.04em] text-[var(--cream)] no-underline">
        <BrandMark /> <span>{brand}</span>
      </a>
      <div className="w-px h-[22px] bg-[var(--glass-border)] mx-1" />
      {items.map((it) => (
        <a
          key={it.id}
          href={it.href}
          onClick={it.onClick}
          className={[
            "px-4 py-[10px] rounded-full no-underline text-[13px] border cursor-pointer transition-all",
            active === it.id
              ? "text-[var(--cream)] bg-[var(--glass-fill-strong)] border-[var(--glass-border-strong)]"
              : "text-[var(--ink-2)] bg-transparent border-transparent",
          ].join(" ")}
        >
          {it.label}
        </a>
      ))}
      <div className="w-2" />
      <a href="/auth/register" className="btn btn-primary btn-sm mr-1 no-underline">
        สมัครเลย
      </a>
    </div>
  );
}

export function BrandMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="url(#bg1)" strokeWidth="2" />
      <path d="M9 16c2 -4 6 -4 8 0s6 4 8 0" stroke="#FFEC9B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="16" r="2" fill="#C61B10" />
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFEC9B" />
          <stop offset="100%" stopColor="#C61B10" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Icon set ─────────────────────────────────────────────────────────
export function Icon({ name, size = 18, stroke = "currentColor" }: { name: string; size?: number; stroke?: string }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "magnify":     return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
    case "calendar":    return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>;
    case "clock":       return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "pin":         return <svg {...p}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "check":       return <svg {...p}><path d="m5 12 5 5L20 6" /></svg>;
    case "arrow-right": return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case "arrow-left":  return <svg {...p}><path d="M19 12H5M11 5l-7 7 7 7" /></svg>;
    case "user":        return <svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>;
    case "users":       return <svg {...p}><circle cx="9" cy="8" r="4" /><path d="M2 20c0-4 3.5-6 7-6s7 2 7 6" /><path d="M17 11a3 3 0 1 0 0-6M22 20c0-3-2-4.5-4-5" /></svg>;
    case "fingerprint": return <svg {...p}><path d="M6 12a6 6 0 0 1 12 0M8 14v1a4 4 0 0 0 8 0v-3M5 16c1 3 2 4 3 5M14 22c1-2 2-5 2-8M10 9a2 2 0 0 1 4 0v5" /></svg>;
    case "skull":       return <svg {...p}><path d="M5 11a7 7 0 0 1 14 0v3l1 3h-4v3H8v-3H4l1-3v-3Z" /><circle cx="9" cy="12" r="1.2" fill={stroke} /><circle cx="15" cy="12" r="1.2" fill={stroke} /></svg>;
    case "key":         return <svg {...p}><circle cx="8" cy="12" r="4" /><path d="M12 12h10M18 12v3M22 12v3" /></svg>;
    case "shirt":       return <svg {...p}><path d="M5 7l3-3 4 2 4-2 3 3-3 3v10H8V10L5 7Z" /></svg>;
    case "mug":         return <svg {...p}><rect x="4" y="6" width="13" height="13" rx="2" /><path d="M17 9h2a3 3 0 0 1 0 6h-2" /></svg>;
    case "sticker":     return <svg {...p}><path d="M4 4h11l5 5v11H4z" /><path d="M15 4v5h5" /></svg>;
    case "cat":         return <svg {...p}><path d="M5 11l-1-5 4 3h8l4-3-1 5v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-6Z" /><path d="M9 14h.01M15 14h.01M11 17c.6.5 1.4.5 2 0" /></svg>;
    case "grid":        return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
    case "chart":       return <svg {...p}><path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-9" /></svg>;
    case "filter":      return <svg {...p}><path d="M4 5h16l-6 8v6l-4-2v-4L4 5Z" /></svg>;
    case "download":    return <svg {...p}><path d="M12 4v12M7 11l5 5 5-5M5 20h14" /></svg>;
    case "play":        return <svg {...p}><path d="M7 5v14l12-7L7 5Z" fill={stroke} /></svg>;
    case "spark":       return <svg {...p}><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" /></svg>;
    case "lock":        return <svg {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
    case "sound":       return <svg {...p}><path d="M4 9h4l5-4v14l-5-4H4V9Z" /><path d="M17 8c2 2 2 6 0 8" /></svg>;
    case "bell":        return <svg {...p}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>;
    case "menu":        return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "close":       return <svg {...p}><path d="M6 6l12 12M18 6l-12 12" /></svg>;
    case "scale":       return <svg {...p}><path d="M12 4v16M4 8l8-4 8 4M6 8l-2 6a3 3 0 0 0 6 0L8 8M16 8l-2 6a3 3 0 0 0 6 0l-2-6" /></svg>;
    case "mask":        return <svg {...p}><path d="M4 9c0-2 3-4 8-4s8 2 8 4-2 9-8 9-8-7-8-9Z" /><circle cx="9" cy="11" r="1.2" fill={stroke} /><circle cx="15" cy="11" r="1.2" fill={stroke} /></svg>;
    case "feather":     return <svg {...p}><path d="M20 4c-7 0-13 6-13 13v3h3c7 0 13-6 13-13V4h-3Z" /><path d="M7 20l8-8M11 12h4M14 9h3" /></svg>;
    case "edit":        return <svg {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>;
    default:            return <svg {...p}><circle cx="12" cy="12" r="8" /></svg>;
  }
}

// ─── Section title ────────────────────────────────────────────────────
export function SectionTitle({ kicker, title, sub, align = "left", titleSize = 36 }) {
  return (
    <div className={`max-w-[640px] text-${align}`}>
      {kicker && <div className="kicker mb-3">{kicker}</div>}
      <div
        className="display text-[var(--cream)]"
        style={{ fontSize: titleSize, lineHeight: 1.15, marginBottom: sub ? 14 : 0 }}
      >
        {title}
      </div>
      {sub && <div className="text-[var(--ink-mute)] text-[14px] leading-relaxed">{sub}</div>}
    </div>
  );
}

// ─── Crime-tape stripe ────────────────────────────────────────────────
export function Tape({ text = "CASE FILE · SIMC27 · CONFIDENTIAL" }) {
  return (
    <div
      className="font-mono text-[11px] tracking-[0.32em] text-[#2a0a0c] py-[6px] px-5 rotate-[-1.2deg] border-t border-b border-black/15 whitespace-nowrap overflow-hidden"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,236,155,0.92) 8%, rgba(255,236,155,0.92) 92%, transparent)" }}
    >
      {`${text} · ${text} · ${text}`}
    </div>
  );
}

// ─── Artboard frame ───────────────────────────────────────────────────
export function ArtFrame({ tone = "warm", children, padding = 0, dense = true }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0306] rounded-lg">
      <SceneBG tone={tone} dense={dense} />
      <div className="relative z-[1] h-full" style={{ padding }}>
        {children}
      </div>
    </div>
  );
}

// ─── Falling petals ───────────────────────────────────────────────────
export function FallingPetals({ count = 16, variant = "sakura" }) {
  const palette = variant === "crimson"
    ? { face: ["#C61B10","#8F0F1B","#a02030","#7a1414","#b3232f"], deep: ["#4B0700","#3a0a0c","#621010","#2a0608","#7a0e18"] }
    : { face: ["#FFD6E2","#FFB6C5","#FFC6D9","#FFA8BE","#FFCCD8"], deep: ["#E89AAE","#D67E97","#E59FB4","#D88AA3","#E0A0B6"] };

  const petals = useMemo(() => Array.from({ length: count }, (_, i) => {
    const fromTop = i % 2 === 0;
    return {
      delay: -((i * 0.55) % 22),
      duration: 13 + ((i * 1.9) % 10),
      startLeft: fromTop ? -8 + ((i * 19) % 115) : -10 - ((i * 5) % 12),
      startTop:  fromTop ? -12 - ((i * 7) % 18)  : -10 + ((i * 13) % 90),
      tx: 1350 + ((i * 53) % 320),
      ty: 950  + ((i * 41) % 280),
      tr: 360  + ((i * 89) % 420),
      sway: 24 + ((i * 7) % 30),
      scale: 0.55 + ((i * 17) % 100) / 100 * 0.95,
      swayDelay: -(i * 0.4),
      color: palette.face[i % palette.face.length],
      deep:  palette.deep[i % palette.deep.length],
    };
  }), [count, variant]);

  return (
    <div className="petal-rain">
      {petals.map((p, i) => (
        // All petal values are computed JS → inline only
        <span key={i} className="petal" style={{
          left: `${p.startLeft}%`, top: `${p.startTop}%`,
          animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
          "--tx": `${p.tx}px`, "--ty": `${p.ty}px`, "--tr": `${p.tr}deg`,
        }}>
          <i style={{ animationDelay: `${p.swayDelay}s`, "--sway": `${p.sway}px` }}>
            <svg viewBox="0 0 20 20" width={18 * p.scale} height={18 * p.scale} className="block drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]">
              <defs>
                <linearGradient id={`pg-${variant}-${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor={p.color} />
                  <stop offset="100%" stopColor={p.deep} />
                </linearGradient>
              </defs>
              <path d="M10 2 C 14 5 14 11 11 15 C 9.5 17 9 17 8 15 C 6 11 6 5 10 2 Z" fill={`url(#pg-${variant}-${i})`} opacity="0.95" />
              <path d="M10 4 Q 11.5 8 10.5 14" fill="none" stroke={variant === "crimson" ? "rgba(255,180,180,0.45)" : "rgba(255,255,255,0.55)"} strokeWidth="0.5" />
              <circle cx="9.5" cy="14.5" r="0.8" fill="#FFEC9B" opacity="0.7" />
            </svg>
          </i>
        </span>
      ))}
    </div>
  );
}

// ─── Noir page header ────────────────────────────────────────────────
export function NoirHeader({ act, title, italic, subtitle, caseNo = "SIMC-27", meta = [], active = "home", marquee = true, marqueeText, right }) {
  return (
    <div className="relative">
      <div className="flex justify-between items-center gap-3.5">
        <div className="flex items-center gap-3.5">
          <div className="mono flicker text-[var(--primary-2)] text-[10px] tracking-[0.3em] border border-[var(--primary-2)] px-2 py-[3px] rounded whitespace-nowrap">
            ● REC
          </div>
          <div className="mono text-[var(--ink-mute)] tracking-[0.35em] text-[10px]">
            CASE No. {caseNo} · CONFIDENTIAL
          </div>
        </div>
        <NavPill active={active} />
      </div>

      <div className="mt-[22px] flex justify-between items-end gap-8">
        <div>
          {act && (
            <div className="kicker mb-3.5 inline-flex items-center gap-2.5">
              <span className="inline-block w-[26px] h-px bg-[var(--gold)]" />
              · {act} ·
            </div>
          )}
          <div className="display text-[56px] leading-none text-[var(--cream)] tracking-[-0.02em]">
            {title}{italic && <> <em className="text-[var(--gold)] italic">{italic}</em></>}
          </div>
          {subtitle && (
            <div className="mt-3 text-[13.5px] text-[var(--ink-mute)] leading-relaxed max-w-[640px] font-display italic">
              {subtitle}
            </div>
          )}
        </div>
        {right}
      </div>

      {meta.length > 0 && <MetaStrip cells={meta} />}

      {marquee && (
        <div className="mt-[22px]">
          <Tape text={marqueeText || `CASE FILE · SIMC 27 · CONFIDENTIAL · 30–31 JAN 2570`} />
        </div>
      )}
    </div>
  );
}

// ─── Meta strip ───────────────────────────────────────────────────────
export function MetaStrip({ cells = [] }) {
  return (
    <div
      className="glass-dim mt-[22px] px-[22px] py-3.5 rounded-[14px] grid items-center gap-[22px]"
      style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}
    >
      {cells.map(([k, v, tone], i) => (
        <div key={i} className={i > 0 ? "pl-4 border-l border-[var(--glass-border)]" : ""}>
          <div className="mono text-[var(--ink-mute)]">{k}</div>
          <div className={[
            "display text-[14px] mt-0.5 tracking-[0.02em]",
            tone === "red" ? "text-[var(--primary-2)]" : tone === "gold" ? "text-[var(--gold)]" : "text-[var(--cream)]",
          ].join(" ")}>{v}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Film overlay ────────────────────────────────────────────────────
export function FilmOverlay({ opacity = 0.3 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0 2px, transparent 2px 4px)",
        opacity,
      }}
    />
  );
}

// ─── Case stamp ───────────────────────────────────────────────────────
export function CaseStamp({ children, color = "var(--primary-2)", rotate = -6 }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3.5 py-[6px] font-mono text-[11px] tracking-[0.32em] font-semibold rounded-md uppercase bg-[rgba(198,27,16,0.06)]"
      style={{
        border: `2px double ${color}`,
        color,
        transform: `rotate(${rotate}deg)`,
        boxShadow: `0 0 0 2px rgba(198,27,16,0.12), inset 0 0 0 1px ${color}33`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Act ribbon ───────────────────────────────────────────────────────
export function ActRibbon({ act, code }) {
  return (
    <div className="flex flex-col gap-3.5 items-center pt-2.5">
      <div className="vert-text mono text-[var(--gold)] tracking-[0.5em] text-[10px]">{act}</div>
      {/* gradient must be inline */}
      <div className="w-px flex-1 min-h-[80px]" style={{ background: "linear-gradient(180deg, var(--gold), transparent)" }} />
      <div className="vert-text mono text-[var(--ink-mute)] tracking-[0.4em] text-[9px]">{code}</div>
    </div>
  );
}
