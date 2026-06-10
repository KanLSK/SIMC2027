// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';

// Shared pieces — backgrounds, nav, icons, common glass primitives
// Exported to window for use across page files.



// ─────────── Background scene ───────────
export function SceneBG({ tone = "warm", children, dense = true }) {
  // tone: "warm" (crimson) | "cool" (teal) | "deep" (very dark)
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
    <div className={`scene-bg ${tone === "cool" ? "cool" : ""}`} style={{ position: "absolute", inset: 0 }}>
      <div className="scene-orbs">
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
      {/* atmospheric kanji silhouette as faint decoration */}
      <svg viewBox="0 0 600 600" style={{
        position: "absolute", right: "-80px", top: "10%",
        width: 520, height: 520, opacity: 0.05, pointerEvents: "none",
      }} aria-hidden="true">
        <circle cx="300" cy="300" r="220" fill="none" stroke="#FFF7E2" strokeWidth="14"
          strokeDasharray="900 200" strokeDashoffset="20" />
      </svg>
      {children}
    </div>
  );
}

// ─────────── Top nav (glass pill) ───────────
import Link from "next/link";

export function NavPill({ active = "home", brand = "SIMC 27" }) {
  const items = [
    { id: "home", label: "หน้าแรก", href: "/" },
    { id: "exam", label: "ข้อสอบ", href: "/exam" }, 
    { id: "camp", label: "Camp Day", href: "/camp" },
    { id: "souvenir", label: "Souvenir", href: "/souvenir" },
    { id: "game", label: "Game", href: "/game" },
  ];

  return (
    <div className="glass nav-pill bg-[#fdfaf5]/90 border border-[#a01010]/20" style={{
      display: "flex", alignItems: "center", gap: 4,
      padding: 6, borderRadius: 999,
      backdropFilter: "blur(8px)",
    }}>
      {/* Brand Section */}
      <div style={{
        padding: "10px 18px",
        fontFamily: "var(--f-display)",
        fontSize: 15, fontWeight: 600,
        letterSpacing: "0.04em",
        color: "var(--cream)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>{brand}</span> 
      </div>
      
      {/* เส้นแบ่ง */}
      <div style={{ width: 1, height: 22, background: "#d1ccc4", margin: "0 4px" }} />
      
      {/* เมนูต่างๆ: เปลี่ยนมาใช้ <Link> เพื่อให้กดแล้วเปลี่ยนหน้าได้จริงแบบไม่โหลดใหม่ */}
      {items.map((it) => (
        <Link 
          key={it.id} 
          href={it.href}
          className={`${active === it.id ? "active" : ""} transition-all duration-200`} 
          style={{
            padding: "10px 16px", 
            borderRadius: 999,
            fontSize: 14,
            fontWeight: active === it.id ? 600 : 400,
            textDecoration: "none", 
            color: active === it.id ? "#ffffff" : "#b5b5b5",
            background: active === it.id ? "#a01010" : "transparent",
            border: active === it.id ? "1px solid #800d0d" : "1px solid transparent",
            cursor: "pointer",
          }}
        >
          {it.label}
        </Link>
      ))}
      
      <div style={{ width: 8 }} />
      
      {/* ปุ่มสมัครเลย: ปรับเป็นสีแดงเข้มดึงดูดสายตา */}
      <Link href="/auth/signup" className="no-underline">
        <button 
          className="rounded-full bg-[#a01010] text-white px-5 py-2 text-sm font-semibold transition duration-300 hover:bg-[#800d0d] shadow-sm"
          style={{ marginRight: 4 }}
        >
          สมัครเลย
        </button>
      </Link>
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

// ─────────── Icon (line) set ───────────
export function Icon({ name, size = 18, stroke = "currentColor" }: { name: string, size?: number, stroke?: string }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "magnify":
      return (<svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
    case "calendar":
      return (<svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>);
    case "clock":
      return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
    case "pin":
      return (<svg {...common}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></svg>);
    case "check":
      return (<svg {...common}><path d="m5 12 5 5L20 6" /></svg>);
    case "arrow-right":
      return (<svg {...common}><path d="M5 12h14M13 5l7 7-7 7" /></svg>);
    case "arrow-left":
      return (<svg {...common}><path d="M19 12H5M11 5l-7 7 7 7" /></svg>);
    case "user":
      return (<svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>);
    case "users":
      return (<svg {...common}><circle cx="9" cy="8" r="4" /><path d="M2 20c0-4 3.5-6 7-6s7 2 7 6" /><path d="M17 11a3 3 0 1 0 0-6M22 20c0-3-2-4.5-4-5" /></svg>);
    case "fingerprint":
      return (<svg {...common}><path d="M6 12a6 6 0 0 1 12 0M8 14v1a4 4 0 0 0 8 0v-3M5 16c1 3 2 4 3 5M14 22c1-2 2-5 2-8M10 9a2 2 0 0 1 4 0v5" /></svg>);
    case "skull":
      return (<svg {...common}><path d="M5 11a7 7 0 0 1 14 0v3l1 3h-4v3H8v-3H4l1-3v-3Z" /><circle cx="9" cy="12" r="1.2" fill={stroke} /><circle cx="15" cy="12" r="1.2" fill={stroke} /></svg>);
    case "key":
      return (<svg {...common}><circle cx="8" cy="12" r="4" /><path d="M12 12h10M18 12v3M22 12v3" /></svg>);
    case "shirt":
      return (<svg {...common}><path d="M5 7l3-3 4 2 4-2 3 3-3 3v10H8V10L5 7Z" /></svg>);
    case "mug":
      return (<svg {...common}><rect x="4" y="6" width="13" height="13" rx="2" /><path d="M17 9h2a3 3 0 0 1 0 6h-2" /></svg>);
    case "sticker":
      return (<svg {...common}><path d="M4 4h11l5 5v11H4z" /><path d="M15 4v5h5" /></svg>);
    case "cat":
      return (<svg {...common}><path d="M5 11l-1-5 4 3h8l4-3-1 5v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-6Z" /><path d="M9 14h.01M15 14h.01M11 17c.6.5 1.4.5 2 0" /></svg>);
    case "grid":
      return (<svg {...common}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>);
    case "chart":
      return (<svg {...common}><path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-9" /></svg>);
    case "filter":
      return (<svg {...common}><path d="M4 5h16l-6 8v6l-4-2v-4L4 5Z" /></svg>);
    case "download":
      return (<svg {...common}><path d="M12 4v12M7 11l5 5 5-5M5 20h14" /></svg>);
    case "play":
      return (<svg {...common}><path d="M7 5v14l12-7L7 5Z" fill={stroke} /></svg>);
    case "spark":
      return (<svg {...common}><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" /></svg>);
    case "lock":
      return (<svg {...common}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>);
    case "sound":
      return (<svg {...common}><path d="M4 9h4l5-4v14l-5-4H4V9Z" /><path d="M17 8c2 2 2 6 0 8" /></svg>);
    case "bell":
      return (<svg {...common}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>);
    case "menu":
      return (<svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
    case "close":
      return (<svg {...common}><path d="M6 6l12 12M18 6l-12 12" /></svg>);
    case "scale":
      return (<svg {...common}><path d="M12 4v16M4 8l8-4 8 4M6 8l-2 6a3 3 0 0 0 6 0L8 8M16 8l-2 6a3 3 0 0 0 6 0l-2-6" /></svg>);
    case "mask":
      return (<svg {...common}><path d="M4 9c0-2 3-4 8-4s8 2 8 4-2 9-8 9-8-7-8-9Z" /><circle cx="9" cy="11" r="1.2" fill={stroke} /><circle cx="15" cy="11" r="1.2" fill={stroke} /></svg>);
    case "feather":
      return (<svg {...common}><path d="M20 4c-7 0-13 6-13 13v3h3c7 0 13-6 13-13V4h-3Z" /><path d="M7 20l8-8M11 12h4M14 9h3" /></svg>);
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8" /></svg>;
  }
}

// ─────────── Section title (kicker + display) ───────────
export function SectionTitle({ kicker, title, sub, align = "left", titleSize = 36 }) {
  return (
    <div style={{ textAlign: align, maxWidth: 640 }}>
      {kicker && <div className="kicker" style={{ marginBottom: 12 }}>{kicker}</div>}
      <div className="display" style={{
        fontSize: titleSize, lineHeight: 1.15, color: "var(--cream)",
        marginBottom: sub ? 14 : 0,
      }}>{title}</div>
      {sub && <div style={{ color: "var(--ink-mute)", fontSize: 14, lineHeight: 1.6 }}>{sub}</div>}
    </div>
  );
}

// ─────────── Crime-tape stripe (decorative) ───────────
export function Tape({ text = "CASE FILE · SIMC27 · CONFIDENTIAL" }) {
  return (
    <div style={{
      background: "linear-gradient(90deg, transparent, rgba(255,236,155,0.92) 8%, rgba(255,236,155,0.92) 92%, transparent)",
      color: "#2a0a0c",
      fontFamily: "var(--f-mono)",
      fontSize: 11, letterSpacing: "0.32em",
      padding: "6px 20px",
      transform: "rotate(-1.2deg)",
      borderTop: "1px solid rgba(0,0,0,0.15)",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      whiteSpace: "nowrap",
      overflow: "hidden",
    }}>{`${text} · ${text} · ${text}`}</div>
  );
}

// ─────────── Artboard frame helper ───────────
export function ArtFrame({ tone = "warm", children, padding = 0, dense = true }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#0a0306", borderRadius: 8 }}>
      <SceneBG tone={tone} dense={dense} />
      <div style={{ position: "relative", zIndex: 1, height: "100%", padding }}>
        {children}
      </div>
    </div>
  );
}

// ─────────── Falling petals ───────────
// Diagonal flow from upper-left to lower-right. Each petal has its own
// trajectory (--tx/--ty/--tr) so they spread across the whole container
// instead of stacking into a single visible stream.
export function FallingPetals({ count = 16, variant = "sakura" }) {
  const palette = variant === "crimson"
    ? {
        face: ["#C61B10", "#8F0F1B", "#a02030", "#7a1414", "#b3232f"],
        deep: ["#4B0700", "#3a0a0c", "#621010", "#2a0608", "#7a0e18"],
      }
    : {
        face: ["#FFD6E2", "#FFB6C5", "#FFC6D9", "#FFA8BE", "#FFCCD8"],
        deep: ["#E89AAE", "#D67E97", "#E59FB4", "#D88AA3", "#E0A0B6"],
      };
  const petals = React.useMemo(() => Array.from({ length: count }, (_, i) => {
    // half emit from top edge, half from left edge — even coverage
    const fromTop = i % 2 === 0;
    return {
      delay: -((i * 0.55) % 22),                 // negative => start mid-flight
      duration: 13 + ((i * 1.9) % 10),           // 13–22s
      startLeft: fromTop ? -8 + ((i * 19) % 115) : -10 - ((i * 5) % 12),
      startTop: fromTop ? -12 - ((i * 7) % 18)  : -10 + ((i * 13) % 90),
      tx: 1350 + ((i * 53) % 320),               // end-x translation
      ty: 950 + ((i * 41) % 280),                // end-y translation
      tr: 360 + ((i * 89) % 420),                // total rotation
      sway: 24 + ((i * 7) % 30),                 // sway amplitude
      scale: 0.55 + ((i * 17) % 100) / 100 * 0.95,
      swayDelay: -(i * 0.4),
      color: palette.face[i % palette.face.length],
      deep: palette.deep[i % palette.deep.length],
    };
  }), [count, variant]);
  return (
    <div className="petal-rain">
      {petals.map((p, i) => (
        <span key={i} className="petal" style={{
          left: `${p.startLeft}%`,
          top: `${p.startTop}%`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          "--tx": `${p.tx}px`,
          "--ty": `${p.ty}px`,
          "--tr": `${p.tr}deg`,
        }}>
          <i style={{ animationDelay: `${p.swayDelay}s`, "--sway": `${p.sway}px` }}>
            <svg viewBox="0 0 20 20" width={18 * p.scale} height={18 * p.scale} style={{ display: "block", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.55))" }}>
              <defs>
                <linearGradient id={`pg-${variant}-${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={p.color} />
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

// ─────────── Noir Page Header ───────────
// Shared cinematic header that gives every interior page the landing-page feel.
export function NoirHeader({
  act, title, italic, subtitle,
  caseNo = "SIMC-27",
  meta = [],
  active = "home",
  marquee = true,
  marqueeText,
  right,
}) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="mono flicker" style={{
            color: "var(--primary-2)", fontSize: 10, letterSpacing: "0.3em",
            border: "1px solid var(--primary-2)", padding: "3px 8px", borderRadius: 4,
            whiteSpace: "nowrap",
          }}>● REC</div>
          <div className="mono" style={{ color: "var(--ink-mute)", letterSpacing: "0.35em", fontSize: 10 }}>
            CASE No. {caseNo} · CONFIDENTIAL
          </div>
        </div>
        <NavPill active={active} />
      </div>

      <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "end", gap: 32 }}>
        <div>
          {act && (
            <div className="kicker" style={{ marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 26, height: 1, background: "var(--gold)" }} />
              · {act} ·
            </div>
          )}
          <div className="display" style={{ fontSize: 56, lineHeight: 1.0, color: "var(--cream)", letterSpacing: "-0.02em" }}>
            {title}{italic && <> <em style={{ color: "var(--gold)", fontStyle: "italic" }}>{italic}</em></>}
          </div>
          {subtitle && (
            <div style={{ marginTop: 12, fontSize: 13.5, color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: 640, fontFamily: "var(--f-display)", fontStyle: "italic" }}>
              {subtitle}
            </div>
          )}
        </div>
        {right}
      </div>

      {meta.length > 0 && <MetaStrip cells={meta} />}

      {marquee && (
        <div style={{ marginTop: 22 }}>
          <Tape text={marqueeText || `CASE FILE · SIMC 27 · CONFIDENTIAL · 30–31 JAN 2570`} />
        </div>
      )}
    </div>
  );
}

export function MetaStrip({ cells = [] }) {
  return (
    <div className="glass-dim" style={{
      marginTop: 22, padding: "14px 22px", borderRadius: 14,
      display: "grid", gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: 22, alignItems: "center",
    }}>
      {cells.map(([k, v, tone], i) => (
        <div key={i} style={{ paddingLeft: i > 0 ? 16 : 0, borderLeft: i > 0 ? "1px solid var(--glass-border)" : undefined }}>
          <div className="mono" style={{ color: "var(--ink-mute)" }}>{k}</div>
          <div className="display" style={{
            fontSize: 14, marginTop: 2, letterSpacing: "0.02em",
            color: tone === "red" ? "var(--primary-2)" : tone === "gold" ? "var(--gold)" : "var(--cream)",
          }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

// Subtle film scanlines overlay
export function FilmOverlay({ opacity = 0.3 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
      backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0 2px, transparent 2px 4px)",
      opacity,
    }} />
  );
}

// Decorative case file stamp
export function CaseStamp({ children, color = "var(--primary-2)", rotate = -6 }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 14px",
      border: `2px double ${color}`,
      color, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.32em", fontWeight: 600,
      borderRadius: 6, transform: `rotate(${rotate}deg)`,
      background: "rgba(198,27,16,0.06)", textTransform: "uppercase",
      boxShadow: `0 0 0 2px rgba(198,27,16,0.12), inset 0 0 0 1px ${color}33`,
    }}>{children}</div>
  );
}

// Vertical Act ribbon for left edge of pages
export function ActRibbon({ act, code }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 14, alignItems: "center",
      paddingTop: 10,
    }}>
      <div className="vert-text mono" style={{ color: "var(--gold)", letterSpacing: "0.5em", fontSize: 10 }}>
        {act}
      </div>
      <div style={{ width: 1, flex: 1, minHeight: 80, background: "linear-gradient(180deg, var(--gold), transparent)" }} />
      <div className="vert-text mono" style={{ color: "var(--ink-mute)", letterSpacing: "0.4em", fontSize: 9 }}>
        {code}
      </div>
    </div>
  );
}


