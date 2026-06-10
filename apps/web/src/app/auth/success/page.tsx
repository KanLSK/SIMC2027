// @ts-nocheck
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NavPill } from "@/components/PrototypeUI";

function SuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const appId = "SIMC27-" + String(
    Math.abs(email.split("").reduce((a, c) => (a << 5) - a + c.charCodeAt(0), 0) % 9000 + 1000)
  ).padStart(4, "0");

  const stars = [
    { x: "6%",  y: "18%" }, { x: "91%", y: "15%" }, { x: "12%", y: "65%" },
    { x: "88%", y: "70%" }, { x: "48%", y: "8%"  }, { x: "75%", y: "38%" },
    { x: "25%", y: "82%" }, { x: "62%", y: "88%" }, { x: "4%",  y: "48%" },
    { x: "94%", y: "52%" }, { x: "35%", y: "12%" }, { x: "80%", y: "22%" },
    { x: "55%", y: "78%" }, { x: "18%", y: "40%" }, { x: "70%", y: "60%" },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center"
      style={{ background: `
        radial-gradient(circle at 25% 30%, rgba(0,130,110,0.18) 0%, transparent 45%),
        radial-gradient(circle at 75% 70%, rgba(143,15,27,0.28) 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, rgba(100,60,20,0.15) 0%, transparent 35%),
        linear-gradient(160deg, #060f0d 0%, #0a0306 50%, #060b09 100%)
      `}}
    >
      {/* Ambient rings */}
      <div className="absolute right-[6%] top-[15%] w-[400px] h-[400px] rounded-full border border-[rgba(0,150,120,0.12)] pointer-events-none" />
      <div className="absolute right-[9%] top-[18%] w-[310px] h-[310px] rounded-full border border-[rgba(0,150,120,0.07)] pointer-events-none" />

      {/* Star dots — positions are data-driven, keep inline */}
      {stars.map((s, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          left: s.x, top: s.y,
          width:  i % 4 === 0 ? 4 : 3,
          height: i % 4 === 0 ? 4 : 3,
          background: i % 5 === 0 ? "var(--gold)" : "rgba(255,247,226,0.28)",
          boxShadow: i % 5 === 0 ? "0 0 6px var(--gold)" : "none",
        }} />
      ))}

      {/* Left vertical strip */}
      <div className="absolute top-[110px] left-9 z-[3] flex flex-col gap-8 items-center">
        <div className="mono text-[var(--gold)] tracking-[0.2em] text-[10px]" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
          ACT I · COLD OPEN
        </div>
        <div className="mono text-[var(--ink-mute)] tracking-[0.2em] text-[10px] opacity-60" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
          27 · 01 · 2570
        </div>
      </div>

      {/* Right vertical timecode */}
      <div className="absolute top-[110px] right-9 z-[3] flex flex-col gap-6 items-center">
        <div className="mono flicker flex items-center gap-1.5 text-[var(--primary-2)] text-[10px] tracking-[0.2em] border border-[rgba(198,27,16,0.4)] px-2 py-1 rounded bg-[rgba(198,27,16,0.1)]">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--primary-2)] inline-block" /> REC
        </div>
      </div>

      {/* Navbar */}
      <div className="fixed top-7 left-0 right-0 flex justify-center z-50">
        <NavPill active="register" />
      </div>

      {/* Body — opacity/transform transition for mount animation */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 pt-[120px] pb-20 w-full transition-[opacity,transform] duration-500 ease-out"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)" }}
      >
        {/* Checkmark circle */}
        <div className="relative mb-7">
          <div className="w-24 h-24 rounded-full border border-[rgba(255,247,226,0.18)] flex items-center justify-center relative shadow-[0_0_40px_rgba(0,180,140,0.12),0_0_80px_rgba(0,180,140,0.06)]">
            <div className="absolute inset-1.5 rounded-full border border-dashed border-[rgba(255,247,226,0.14)]" />
            <div className="w-16 h-16 rounded-full bg-[rgba(198,27,16,0.2)] border border-[rgba(198,27,16,0.5)] flex items-center justify-center shadow-[0_0_24px_rgba(198,27,16,0.25)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>
          {/* OPENED stamp */}
          <div className="absolute -top-2.5 -right-4 rotate-[14deg] px-[9px] py-[3px] rounded bg-[rgba(198,27,16,0.85)] border border-[rgba(255,60,60,0.3)] font-mono text-[8px] tracking-[0.22em] text-[var(--cream)] uppercase shadow-[0_4px_12px_rgba(198,27,16,0.4)]">
            OPENED
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="kicker mb-3 tracking-[0.24em]">· Case File Opened ·</div>
          <h1 className="display text-[clamp(32px,5vw,52px)] text-[var(--cream)] m-0 leading-[1.15]">
            ลงทะเบียนสำเร็จ!
          </h1>
          <p className="mt-3.5 text-[14px] text-[var(--ink-mute)] max-w-[440px] leading-[1.75] mx-auto">
            ยินดีต้อนรับนักสืบใหม่เข้าสู่ SIMC27 — แฟ้มคดีของคุณเปิดแล้ว เรา
            <br />จะส่งรายละเอียดไปยังอีเมลของคุณ
          </p>
        </div>

        {/* Info card */}
        <div className="w-full max-w-[480px] mb-6 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,247,226,0.12)] rounded-[18px] backdrop-blur-xl overflow-hidden">
          <div className="grid grid-cols-3">
            {[
              { label: "APPLICANT ID", value: appId, gold: true },
              { label: "STATUS",       value: "ยืนยันแล้ว" },
              { label: "NEXT PHASE",   value: "Pre-register" },
            ].map((col, i) => (
              <div key={i} className={`px-4 py-[18px] text-center ${i < 2 ? "border-r border-[rgba(255,247,226,0.08)]" : ""}`}>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[rgba(255,247,226,0.35)] mb-2">{col.label}</div>
                <div className={`display text-[14px] ${col.gold ? "text-[var(--gold)]" : "text-[var(--cream)]"}`}>
                  {col.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-[13px] rounded-xl bg-[rgba(255,255,255,0.06)] border border-[rgba(255,247,226,0.14)] text-[var(--cream)] font-sans text-[14px] font-medium no-underline backdrop-blur-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200"
          >
            ดูสถานะการสมัคร
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-[13px] rounded-xl bg-[linear-gradient(135deg,#C61B10_0%,#8F0F1B_100%)] border border-[rgba(255,60,60,0.25)] text-[var(--cream)] font-sans text-[14px] font-semibold no-underline shadow-[0_8px_24px_rgba(143,15,27,0.45)] hover:shadow-[0_12px_32px_rgba(143,15,27,0.6)] hover:-translate-y-px transition-all duration-200"
          >
            ไปต่อ Pre-register
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
