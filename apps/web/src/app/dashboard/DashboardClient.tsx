"use client";
import React from "react";
// Removed unused PrototypeUI imports

// ─── Types ────────────────────────────────────────────────────────────
interface Props {
  displayName: string;
  applicantNo: string;
  email: string;
}

// ─── Mock data ────────────────────────────────────────────────────────
const TIMELINE = [
  { day: "12", month: "ต.ค.", weekday: "อา.", label: "ประกาศผลรอบเอกสาร",           time: "18:00 น.",        done: true },
  { day: "18", month: "ต.ค.", weekday: "ส.",  label: "สอบข้อเขียนออนไลน์",           time: "09:00 – 10:30 น.", upcoming: true },
  { day: "25", month: "ต.ค.", weekday: "ส.",  label: "สัมภาษณ์ · Cross-examination", time: "เลือกรอบเวลาได้" },
  { day: "02", month: "พ.ย.", weekday: "อา.", label: "Camp Day 1 · เปิดแค็มพ์ดี",    time: "08:00 น. เป็นต้นไป" },
];

const ORDERS = [
  { id: "A0428", status: "จัดส่งสำเร็จ",    statusColor: "#4ade80", items: 2, date: "1 มิ.ย. 2569", price: "1,140", types: ["shirt", "sticker"] },
  { id: "A9431", status: "กำลังจัดส่ง",      statusColor: "#facc15", items: 2, date: "5 มิ.ย. 2569", price: "580",   types: ["mug"] },
  { id: "A0455", status: "กำลังเตรียมพัสดุ", statusColor: "#fb923c", items: 3, date: "7 มิ.ย. 2569", price: "480",   types: ["shirt", "mug"] },
];

// ─── Icons ────────────────────────────────────────────────────────────
const ClockIcon    = () => <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
const CheckIcon    = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="m5 12 5 5L20 6" /></svg>;
const ShirtIcon    = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><path d="M5 7l3-3 4 2 4-2 3 3-3 3v10H8V10L5 7Z" /></svg>;
const MugIcon      = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><rect x="4" y="6" width="13" height="13" rx="2" /><path d="M17 9h2a3 3 0 0 1 0 6h-2" /></svg>;
const StickerIcon  = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><path d="M4 4h11l5 5v11H4z" /><path d="M15 4v5h5" /></svg>;
const ArrowRight   = () => <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
const LockIcon     = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
const CalendarIcon = () => <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>;
const PackageIcon  = () => <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M20 7L12 3 4 7v10l8 4 8-4V7Z" /><path d="M12 3v18M4 7l8 4 8-4" /></svg>;
const InfoIcon     = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>;

function ItemIcon({ type }: { type: string }) {
  const cls = "text-[var(--ink-mute)]";
  if (type === "shirt")   return <span className={cls}><ShirtIcon /></span>;
  if (type === "mug")     return <span className={cls}><MugIcon /></span>;
  return <span className={cls}><StickerIcon /></span>;
}

// ─── Glass card ───────────────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass bg-[rgba(20,5,9,0.72)] border border-[rgba(255,247,226,0.1)] rounded-[18px] p-[22px] ${className}`}>
      {children}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold)] mb-4">
      <span className="inline-block w-4 h-px bg-[var(--gold)]" />
      {children}
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────
export default function DashboardClient({ displayName, applicantNo, email }: Props) {
  const practiceScore = 7;
  const practiceTotal = 10;
  const firstName    = displayName.split(" ")[0];
  const avatarLetter = firstName.charAt(0).toUpperCase();

  return (
    <div className="app-bg">
      {/* Film grain — repeating gradient must be inline */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 4px)" }}
      />
      
      <div className="orbit" />

      <div className="content max-w-[1120px] mx-auto px-6 pt-6 pb-16">

        {/* Nav */}
        <div className="flex justify-start">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-[var(--ink-mute)] no-underline uppercase px-3.5 py-2 bg-[rgba(255,247,226,0.04)] border border-[rgba(255,247,226,0.1)] rounded-full hover:text-[var(--cream)] hover:bg-[rgba(255,247,226,0.08)] hover:border-[rgba(255,247,226,0.2)] transition-all duration-200"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
            กลับ
          </a>
        </div>

        <div className="mt-7">

          {/* ─── Hero greeting card ─── */}
          <Card className="mb-5 !p-5">
            <div className="flex items-center justify-between gap-5 flex-wrap">
              {/* Left: avatar + name */}
              <div className="flex items-center gap-4">
                {/* Avatar — gradient is static, expressible in Tailwind */}
                <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-[22px] font-display font-semibold text-[var(--cream)] border border-[rgba(255,247,226,0.18)] shadow-[0_4px_20px_rgba(143,15,27,0.5)] shrink-0 bg-[linear-gradient(135deg,var(--primary)_0%,#4B0700_100%)]">
                  {avatarLetter}
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-[0.3em] text-[var(--gold)] mb-1 uppercase">
                    · DETECTIVE ON FILE ·
                  </div>
                  <div className="font-display text-[26px] font-semibold text-[var(--cream)] leading-[1.1]">
                    สวัสดี, {firstName} 👋
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.18em] text-[var(--ink-mute)] mt-[5px] uppercase">
                    APPLICANT NO. {applicantNo} · {email}
                  </div>
                </div>
              </div>

              {/* Right: status badges */}
              <div className="flex gap-2.5 flex-wrap">
                <div className="bg-[rgba(53,107,109,0.18)] border border-[rgba(53,107,109,0.45)] rounded-[10px] px-4 py-[10px] text-center">
                  <div className="font-mono text-[9px] tracking-[0.2em] text-[rgba(159,209,211,0.7)] mb-0.5 uppercase">สถานะ</div>
                  <div className="font-display text-[13px] text-[#9fd1d3] font-semibold">ผ่านรอบเอกสาร</div>
                </div>
                <div className="bg-[rgba(143,15,27,0.2)] border border-[rgba(198,27,16,0.4)] rounded-[10px] px-4 py-[10px] text-center">
                  <div className="font-mono text-[9px] tracking-[0.2em] text-[rgba(198,27,16,0.7)] mb-0.5 uppercase">รอบถัดไป</div>
                  <div className="font-display text-[13px] text-[var(--primary-2)] font-semibold">สอบข้อเขียน</div>
                </div>
              </div>
            </div>
          </Card>

          {/* ─── Three-column grid ─── */}
          <div className="grid grid-cols-[1fr_1.15fr_1fr] gap-4 items-start">

            {/* ── COL 1: Timeline ── */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <SectionLabel>UPCOMING · กำหนดการ</SectionLabel>
                <div className="flex items-center gap-[5px] font-mono text-[9px] tracking-[0.18em] text-[var(--ink-mute)] bg-[rgba(255,247,226,0.05)] border border-[rgba(255,247,226,0.1)] rounded-[6px] px-2 py-[3px]">
                  <CalendarIcon /> ต.ค.–พ.ย.
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {TIMELINE.map((ev, i) => (
                  <div
                    key={i}
                    className={[
                      "relative flex gap-3.5 items-start px-3.5 py-3 rounded-xl overflow-hidden border",
                      ev.upcoming
                        ? "bg-[rgba(143,15,27,0.25)] border-[rgba(198,27,16,0.35)]"
                        : ev.done
                        ? "bg-[rgba(255,247,226,0.04)] border-[rgba(255,247,226,0.07)]"
                        : "bg-[rgba(255,247,226,0.03)] border-[rgba(255,247,226,0.07)]",
                    ].join(" ")}
                  >
                    {/* Top accent bar for upcoming — inline gradient */}
                    {ev.upcoming && (
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: "linear-gradient(90deg, var(--primary-2), transparent)" }}
                      />
                    )}
                    {/* Date */}
                    <div className="text-center shrink-0 min-w-[32px]">
                      <div className={[
                        "font-display font-bold leading-none",
                        ev.upcoming ? "text-[22px] text-[var(--primary-2)]" : ev.done ? "text-[18px] text-[var(--ink-mute)]" : "text-[18px] text-[var(--cream)]",
                      ].join(" ")}>
                        {ev.day}
                      </div>
                      <div className="font-mono text-[9px] tracking-[0.1em] text-[var(--ink-mute)] mt-0.5">{ev.month}</div>
                      <div className="font-mono text-[8px] text-[rgba(255,247,226,0.3)] mt-px">{ev.weekday}</div>
                    </div>
                    {/* Event info */}
                    <div className="flex-1 min-w-0">
                      <div className={`text-[12.5px] font-medium leading-[1.3] mb-[5px] ${ev.done ? "text-[var(--ink-mute)]" : "text-[var(--cream)]"}`}>
                        {ev.label}
                      </div>
                      <div className="flex items-center gap-1 text-[var(--ink-mute)] text-[10px]">
                        <ClockIcon /> {ev.time}
                      </div>
                    </div>
                    {ev.done && (
                      <div className="text-[#4ade80] shrink-0 mt-0.5">
                        <CheckIcon size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* ── COL 2: Exam Card ── */}
            <Card className="!bg-[rgba(10,3,6,0.82)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-[9px] tracking-[0.28em] text-[var(--primary-2)] uppercase">
                  EXAM · BUREAU
                </div>
                <div className="flex items-center gap-[5px] bg-[rgba(74,222,128,0.15)] border border-[rgba(74,222,128,0.4)] rounded-full px-[10px] py-[3px] font-mono text-[9px] tracking-[0.2em] text-[#4ade80] uppercase">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80] inline-block" />
                  READY
                </div>
              </div>

              {/* Exam title */}
              <div className="font-display text-[28px] font-semibold text-[var(--cream)] leading-[1.15] mb-5">
                สอบข้อเขียนออนไลน์
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                  { label: "วันสอบ", value: "18 ต.ค. · 09:00" },
                  { label: "จำนวนข้อ", value: "50 ข้อ · 90 นาที" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[rgba(255,247,226,0.05)] border border-[rgba(255,247,226,0.1)] rounded-xl px-3.5 py-3">
                    <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--ink-mute)] mb-1 uppercase">{label}</div>
                    <div className="font-display text-[14px] text-[var(--cream)] font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              {/* Practice progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--ink-mute)] uppercase">
                    ความพร้อม · แบบฝึกหัด
                  </div>
                  <div className="font-mono text-[10px] text-[var(--gold)] tracking-[0.1em]">
                    {practiceScore} / {practiceTotal}
                  </div>
                </div>
                {/* Bar track */}
                <div className="h-[6px] bg-[rgba(255,247,226,0.08)] rounded-full overflow-hidden">
                  {/* Fill — width is a dynamic JS value, must be inline */}
                  <div
                    className="h-full rounded-full shadow-[0_0_8px_rgba(198,27,16,0.6)] transition-[width] duration-[800ms] ease-out bg-[linear-gradient(90deg,var(--primary-2),#ff6b35)]"
                    style={{ width: `${(practiceScore / practiceTotal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[rgba(255,247,226,0.07)] mb-5" />

              {/* CTA */}
              <a
                href="/dashboard/exam"
                className="flex items-center justify-center gap-2 w-full py-[14px] rounded-xl font-sans text-[14px] font-semibold text-[var(--cream)] no-underline tracking-[0.02em] bg-[linear-gradient(135deg,var(--primary)_0%,#6b0a14_100%)] border border-[rgba(198,27,16,0.5)] shadow-[0_8px_28px_rgba(143,15,27,0.5),inset_0_1px_0_rgba(255,247,226,0.1)] hover:shadow-[0_12px_36px_rgba(143,15,27,0.65),inset_0_1px_0_rgba(255,247,226,0.1)] hover:-translate-y-px transition-all duration-200"
              >
                <LockIcon />
                เข้าทำข้อสอบ
              </a>
            </Card>

            {/* ── COL 3: Orders ── */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <SectionLabel>MY ORDERS · คำสั่งซื้อ</SectionLabel>
                <div className="flex items-center gap-[5px] font-mono text-[9px] tracking-[0.18em] text-[var(--ink-mute)] bg-[rgba(255,247,226,0.05)] border border-[rgba(255,247,226,0.1)] rounded-[6px] px-2 py-[3px]">
                  <PackageIcon /> {ORDERS.length} รายการ
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="p-[14px] bg-[rgba(255,247,226,0.03)] border border-[rgba(255,247,226,0.08)] rounded-xl hover:bg-[rgba(255,247,226,0.06)] hover:border-[rgba(255,247,226,0.14)] transition-all duration-[180ms]"
                  >
                    {/* Order header */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-mono text-[10px] tracking-[0.1em] text-[var(--ink-2)]">
                        #SIMC27-{order.id}
                      </div>
                      {/* Status dot + label — color is dynamic, keep inline */}
                      <div className="flex items-center gap-1 font-mono text-[9px] tracking-[0.12em]" style={{ color: order.statusColor }}>
                        <span className="w-[5px] h-[5px] rounded-full inline-block" style={{ background: order.statusColor }} />
                        {order.status}
                      </div>
                    </div>

                    {/* Items + date */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="flex gap-1">
                        {order.types.map((t, j) => <ItemIcon key={j} type={t} />)}
                      </div>
                      <div className="font-mono text-[9px] text-[rgba(255,247,226,0.35)] tracking-[0.08em]">
                        {order.items} ชิ้น · {order.date}
                      </div>
                    </div>

                    {/* Price + link */}
                    <div className="flex justify-between items-center">
                      <div className="font-display text-[18px] text-[var(--cream)] font-semibold">
                        ฿{order.price}
                      </div>
                      <a
                        href={`/orders/${order.id}`}
                        className="flex items-center gap-1 font-mono text-[9px] tracking-[0.12em] text-[var(--ink-mute)] no-underline uppercase hover:text-[var(--cream)] transition-colors duration-[180ms]"
                      >
                        ดูสถานะ <ArrowRight />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sign out */}
              <div className="mt-5 pt-4 border-t border-[rgba(255,247,226,0.07)]">
                <a
                  href="/auth/signout"
                  className="block text-center font-mono text-[9px] tracking-[0.2em] text-[rgba(255,247,226,0.3)] no-underline uppercase hover:text-[var(--primary-2)] transition-colors duration-[180ms]"
                >
                  ออกจากระบบ
                </a>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
