// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { NavPill } from "@/components/PrototypeUI";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) { setError(signInError.message); setLoading(false); return; }
    router.push("/dashboard");
    router.refresh();
  }

  // Ambient star dots
  const stars = [
    { x: "8%",  y: "22%" }, { x: "92%", y: "18%" }, { x: "15%", y: "68%" },
    { x: "85%", y: "72%" }, { x: "50%", y: "10%" }, { x: "72%", y: "42%" },
    { x: "28%", y: "85%" }, { x: "60%", y: "90%" }, { x: "5%",  y: "50%" },
    { x: "95%", y: "55%" }, { x: "38%", y: "15%" }, { x: "78%", y: "25%" },
  ];

  return (
    // Complex multi-stop radial gradient background — must stay inline
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center"
      style={{ background: `
        radial-gradient(circle at 30% 40%, rgba(143,15,27,0.55) 0%, transparent 50%),
        radial-gradient(circle at 75% 65%, rgba(75,7,0,0.7) 0%, transparent 45%),
        radial-gradient(circle at 15% 80%, rgba(198,27,16,0.25) 0%, transparent 40%),
        linear-gradient(160deg, #1a0408 0%, #0d0205 50%, #140306 100%)
      `}}
    >
      {/* Ambient circle rings */}
      <div className="absolute right-[8%] top-[20%] w-[340px] h-[340px] rounded-full border border-[rgba(198,27,16,0.18)] pointer-events-none" />
      <div className="absolute right-[10%] top-[22%] w-[280px] h-[280px] rounded-full border border-[rgba(198,27,16,0.1)] pointer-events-none" />

      {/* Star dots — positions are JS data, keep inline */}
      {stars.map((s, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          left: s.x, top: s.y,
          width:  i % 3 === 0 ? 4 : 3,
          height: i % 3 === 0 ? 4 : 3,
          background: i % 4 === 0 ? "var(--gold)" : "rgba(255,247,226,0.35)",
          boxShadow: i % 4 === 0 ? "0 0 6px var(--gold)" : "none",
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
        <div className="mono text-[var(--ink-mute)] tracking-[0.2em] text-[10px] opacity-60" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
          13°45′32″N · 100°29′07″E
        </div>
      </div>

      {/* Navbar */}
      <div className="fixed top-7 left-0 right-0 flex justify-center z-50">
        <NavPill active="login" />
      </div>

      {/* Page body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-[120px] pb-[60px] w-full">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="kicker mb-3.5 tracking-[0.28em]">· Returning Detective ·</div>
          <h1 className="display text-[clamp(32px,5vw,52px)] text-[var(--cream)] m-0 leading-[1.15]">
            เปิดแฟ้มคดีอีกครั้ง
          </h1>
          <p className="mt-4 text-[14px] text-[var(--ink-mute)] max-w-[480px] leading-[1.7]">
            สำหรับนักสืบที่ลงทะเบียนไว้แล้ว — เข้าด้วยอีเมลและรหัสผ่านที่ตั้งไว้
          </p>
        </div>

        {/* Login card */}
        <div className="w-full max-w-[360px] bg-[rgba(255,255,255,0.055)] border border-[rgba(255,247,226,0.14)] rounded-3xl backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,247,226,0.06)] p-7">
          {/* Card header */}
          <div className="flex items-center justify-between mb-6">
            <div className="display text-[17px] text-[var(--cream)]">เข้าสู่ระบบ</div>
            <span className="font-mono text-[9px] tracking-[0.22em] text-[var(--primary-2)] border border-[rgba(198,27,16,0.5)] px-2 py-[3px] rounded bg-[rgba(198,27,16,0.12)] uppercase">
              NO-OPEN
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Email */}
            <div>
              <div className="text-[11px] text-[var(--ink-mute)] font-mono tracking-[0.12em] uppercase mb-1.5">อีเมล</div>
              <div className="flex items-center gap-2.5 bg-[rgba(10,3,6,0.5)] border border-[rgba(255,247,226,0.12)] rounded-xl px-3.5 py-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,247,226,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@school.ac.th"
                  className="flex-1 bg-transparent border-none outline-none text-[var(--cream)] font-sans text-[13px]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="text-[11px] text-[var(--ink-mute)] font-mono tracking-[0.12em] uppercase mb-1.5">รหัสผ่าน</div>
              <div className="flex items-center gap-2.5 bg-[rgba(10,3,6,0.5)] border border-[rgba(255,247,226,0.12)] rounded-xl px-3.5 py-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,247,226,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent border-none outline-none text-[var(--cream)] font-sans text-[13px] tracking-[0.12em]"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-3.5 py-2.5 rounded-[10px] bg-[rgba(198,27,16,0.15)] border border-[rgba(198,27,16,0.35)] text-[12px] text-[#ff9090] font-sans">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className={[
                "mt-1.5 w-full py-3.5 px-6 rounded-xl border-none flex items-center justify-center gap-2",
                "font-sans text-[14px] font-semibold tracking-[0.04em] text-[var(--cream)] transition-all duration-200",
                loading
                  ? "bg-[rgba(143,15,27,0.5)] cursor-not-allowed opacity-60"
                  : "bg-[linear-gradient(135deg,#C61B10_0%,#8F0F1B_100%)] cursor-pointer shadow-[0_8px_28px_rgba(143,15,27,0.5)]",
              ].join(" ")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              {loading ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
            </button>

            <div className="text-center font-mono text-[9px] text-[var(--ink-faint)] tracking-[0.18em] uppercase mt-1">
              SIMC 27 · Secure Login · TLS 1.3
            </div>
          </form>
        </div>

        {/* Sign up link */}
        <p className="mt-7 text-[13px] text-[var(--ink-mute)] text-center">
          ยังไม่มีบัญชี?{" "}
          <Link href="/auth/register" className="text-[var(--gold)] underline decoration-[rgba(255,236,155,0.4)] font-medium">
            ลงทะเบียนผู้สมัครใหม่ →
          </Link>
        </p>
      </div>
    </div>
  );
}
