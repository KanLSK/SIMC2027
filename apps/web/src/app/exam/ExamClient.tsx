"use client";
import React from "react";
// Removed unused PrototypeUI imports

// ─── Data ─────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    num: "01", title: "เชาวน์ปัญญา", en: "APTITUDE & LOGIC",
    tags: ["อนุกรม", "ตรรกะ", "มิติสัมพันธ์"],
    count: 30, format: "ปรนัย 5 ตัวเลือก", time: "25 นาที · ~50 วิ/ข้อ",
    color: "#FFEC9B", colorBg: "rgba(255,236,155,0.12)", colorBorder: "rgba(255,236,155,0.3)", icon: "magnify",
  },
  {
    num: "02", title: "จริยธรรม", en: "ETHICS",
    tags: ["จริยธรรมแพทย์", "การตัดสินใจเชิงสถานการณ์"],
    count: 20, format: "สถานการณ์เลือกตอบ", time: "20 นาที · ~1 นาที/ข้อ",
    color: "#9fd1d3", colorBg: "rgba(53,107,109,0.15)", colorBorder: "rgba(53,107,109,0.4)", icon: "scale",
  },
  {
    num: "03", title: "ความรู้ทางการแพทย์", en: "MEDICAL KNOWLEDGE",
    tags: ["ชีววิทยา", "กายวิภาค", "ข่าวสารสุขภาพ"],
    count: 40, format: "ปรนัย 5 ตัวเลือก", time: "35 นาที · ~50 วิ/ข้อ",
    color: "#C61B10", colorBg: "rgba(198,27,16,0.15)", colorBorder: "rgba(198,27,16,0.4)", icon: "fingerprint",
  },
  {
    num: "04", title: "เกี่ยวกับศิริราช", en: "ABOUT SIRIRAJ",
    tags: ["ประวัติ", "คณะแพทย์", "บุคคลสำคัญ"],
    count: 15, format: "ปรนัย 4 ตัวเลือก", time: "10 นาที · ~40 วิ/ข้อ",
    color: "#FFEC9B", colorBg: "rgba(255,236,155,0.10)", colorBorder: "rgba(255,236,155,0.28)", icon: "pin",
  },
  {
    num: "05", title: "ความคิดสร้างสรรค์", en: "CREATIVITY",
    tags: ["เขียนเรียงสร้างสรรค์", "การแก้ปัญหา"],
    count: 2, format: "อัตนัย · เขียนตอบ", time: "20 นาที · ~10 นาที/ข้อ",
    color: "#9fd1d3", colorBg: "rgba(53,107,109,0.13)", colorBorder: "rgba(53,107,109,0.35)", icon: "feather",
  },
];

type Section = typeof SECTIONS[0];

// ─── Icons ────────────────────────────────────────────────────────────
// SVG stroke color is dynamic → must keep color prop inline
function SectionIcon({ icon, color }: { icon: string; color: string }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "magnify":     return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
    case "scale":       return <svg {...p}><path d="M12 4v16M4 8l8-4 8 4M6 8l-2 6a3 3 0 0 0 6 0L8 8M16 8l-2 6a3 3 0 0 0 6 0l-2-6" /></svg>;
    case "fingerprint": return <svg {...p}><path d="M6 12a6 6 0 0 1 12 0M8 14v1a4 4 0 0 0 8 0v-3M5 16c1 3 2 4 3 5M14 22c1-2 2-5 2-8M10 9a2 2 0 0 1 4 0v5" /></svg>;
    case "pin":         return <svg {...p}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "feather":     return <svg {...p}><path d="M20 4c-7 0-13 6-13 13v3h3c7 0 13-6 13-13V4h-3Z" /><path d="M7 20l8-8M11 12h4M14 9h3" /></svg>;
    default:            return <svg {...p}><circle cx="12" cy="12" r="8" /></svg>;
  }
}

const GridIcon  = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
const ListIcon  = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>;
const ClockIcon = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
const PlayIcon  = () => <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7L7 5Z" /></svg>;

// ─── Stat pill ────────────────────────────────────────────────────────
function StatPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-[rgba(255,247,226,0.4)]">{icon}</div>
      <div>
        <div className="font-mono text-[8px] tracking-[0.2em] text-[rgba(255,247,226,0.4)] uppercase mb-px">{label}</div>
        <div className="text-[12px] font-medium text-[var(--ink-2)]">{value}</div>
      </div>
    </div>
  );
}

// ─── Section row ──────────────────────────────────────────────────────
function SectionRow({ section, index }: { section: Section; index: number }) {
  return (
    <div className="group relative flex items-center gap-5 px-6 py-5 rounded-2xl border backdrop-blur-xl bg-[rgba(20,5,9,0.6)] border-[rgba(255,247,226,0.08)] hover:bg-[rgba(255,247,226,0.055)] hover:border-[rgba(255,247,226,0.16)] transition-all duration-200 overflow-hidden cursor-default">

      {/* Left accent bar — gradient color is dynamic, keep inline */}
      <div
        className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-sm opacity-40 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: `linear-gradient(180deg, ${section.color}, transparent)` }}
      />

      {/* Section number */}
      <div className="font-display text-[28px] font-bold text-[rgba(255,247,226,0.12)] tracking-[-0.03em] shrink-0 w-11 leading-none select-none">
        {section.num}
      </div>

      {/* Icon box — background/border/shadow are all dynamic, keep inline */}
      <div
        className="w-12 h-12 rounded-[13px] shrink-0 flex items-center justify-center transition-shadow duration-200"
        style={{ background: section.colorBg, border: `1.5px solid ${section.colorBorder}`, boxShadow: `0 0 20px ${section.colorBg}` }}
      >
        <SectionIcon icon={section.icon} color={section.color} />
      </div>

      {/* Title + tags */}
      <div className="w-[220px] shrink-0 min-w-0">
        <div className="font-display text-[19px] font-semibold text-[var(--cream)] leading-[1.2] mb-0.5">
          {section.title}
        </div>
        {/* Section EN label color is dynamic */}
        <div className="font-mono text-[9px] tracking-[0.28em] uppercase mb-2" style={{ color: section.color }}>
          {section.en}
        </div>
        <div className="flex flex-wrap gap-1">
          {section.tags.map((tag, i) => (
            <span key={i} className="font-mono text-[9px] tracking-[0.08em] text-[var(--ink-mute)] bg-[rgba(255,247,226,0.06)] border border-[rgba(255,247,226,0.1)] rounded px-1.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Vertical divider */}
      <div className="self-stretch w-px bg-[rgba(255,247,226,0.07)] shrink-0" />

      {/* Stats */}
      <div className="flex-1 flex items-center gap-7 flex-wrap">
        <StatPill icon={<GridIcon />} label="จำนวนข้อ"       value={`${section.count} ข้อ`} />
        <StatPill icon={<ListIcon />} label="ประเภทคำตอบ"    value={section.format} />
        <StatPill icon={<ClockIcon />} label="เวลา"           value={section.time} />
      </div>

      {/* CTA — group-hover brightens background */}
      <a
        href={`/exam/section/${index + 1}`}
        className="flex items-center gap-1.5 shrink-0 px-5 py-[11px] rounded-[10px] font-sans text-[13px] font-semibold text-[var(--cream)] no-underline tracking-[0.02em] whitespace-nowrap border border-[rgba(198,27,16,0.5)] bg-[rgba(143,15,27,0.65)] group-hover:bg-[rgba(198,27,16,0.9)] group-hover:shadow-[0_6px_22px_rgba(143,15,27,0.6)] transition-all duration-200"
      >
        <PlayIcon />
        เริ่มทำส่วนนี้
      </a>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────
export default function ExamClient() {
  const totalQ = SECTIONS.reduce((s, sec) => s + sec.count, 0);

  return (
    <div className="app-bg">
      {/* Film grain — repeating gradient must be inline */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 4px)" }}
      />
      
      <div className="orbit" />

      <div className="content max-w-[1120px] mx-auto px-6 pt-6 pb-16">

        {/* Back button */}
        <a
          href="/dashboard"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-[var(--ink-mute)] no-underline uppercase px-3.5 py-2 bg-[rgba(255,247,226,0.04)] border border-[rgba(255,247,226,0.1)] rounded-full hover:text-[var(--cream)] hover:bg-[rgba(255,247,226,0.08)] hover:border-[rgba(255,247,226,0.2)] transition-all duration-200"
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
          กลับ
        </a>

        {/* ─── Header ─── */}
        <div className="relative mt-8 mb-9">
          {/* Kicker */}
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.32em] text-[var(--gold)] uppercase mb-3">
            <span className="inline-block w-[22px] h-px bg-[var(--gold)]" />
            EXAM BRIEFING · ระเบียบการสอบ
          </div>

          {/* Title */}
          <h1 className="font-display text-[52px] font-semibold text-[var(--cream)] leading-[1.05] tracking-[-0.02em] mb-3.5">
            ข้อสอบแบ่งเป็น <em className="text-[var(--gold)]">5 ส่วน</em>
          </h1>

          {/* Subtitle */}
          <p className="font-display text-[13.5px] italic text-[var(--ink-mute)] leading-relaxed max-w-[580px] mb-5">
            อ่านกติกาของแต่ละส่วนก่อน แล้วจึงเริ่มทำได้พร้อมส่วน · เมื่อเริ่มแล้วเวลาจะเดินทันที
          </p>

          {/* Stamp */}
          <div className="absolute top-2 right-0 inline-flex items-center gap-2 px-4 py-[7px] border-2 border-double border-[rgba(198,27,16,0.55)] text-[rgba(198,27,16,0.65)] font-mono text-[10px] tracking-[0.32em] font-semibold rounded-md bg-[rgba(198,27,16,0.06)] rotate-[-2deg] shadow-[0_0_0_2px_rgba(198,27,16,0.08)]">
            CASE · EXAM
          </div>

          {/* Summary pills */}
          <div className="flex gap-2.5 flex-wrap">
            {[
              { label: "รวมทั้งหมด",   value: `${totalQ} ข้อ` },
              { label: "ส่วน",          value: "5 ส่วน" },
              { label: "ระยะเวลารวม",   value: "~110 นาที" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2 bg-[rgba(255,247,226,0.05)] border border-[rgba(255,247,226,0.1)] rounded-lg px-3.5 py-1.5">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--ink-mute)] uppercase">{label}</span>
                <div className="w-px h-3 bg-[rgba(255,247,226,0.15)]" />
                <span className="font-display text-[14px] text-[var(--cream)] font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tape divider — gradient must be inline */}
        <div
          className="mb-6 font-mono text-[10px] tracking-[0.32em] text-[#2a0a0c] py-[5px] px-5 rotate-[-0.4deg] border-t border-b border-black/10 whitespace-nowrap overflow-hidden"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,236,155,0.85) 8%, rgba(255,236,155,0.85) 92%, transparent)" }}
        >
          {Array(6).fill("CASE FILE · SIMC 27 · EXAM SECTIONS · CONFIDENTIAL · ").join("")}
        </div>

        {/* Section list */}
        <div className="flex flex-col gap-3">
          {SECTIONS.map((section, i) => (
            <SectionRow key={section.num} section={section} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-7 flex items-center gap-2.5 px-5 py-3.5 bg-[rgba(255,236,155,0.06)] border border-[rgba(255,236,155,0.18)] rounded-[10px] font-mono text-[10px] tracking-[0.12em] text-[rgba(255,236,155,0.6)]">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="shrink-0 text-[rgba(255,236,155,0.5)]">
            <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" />
          </svg>
          หมายเหตุ: ทำแต่ละส่วนให้ครบก่อนจึงจะผ่านไปส่วนถัดไปได้ · ไม่สามารถย้อนกลับมาแก้ไขคำตอบที่ส่งแล้ว
        </div>
      </div>
    </div>
  );
}
