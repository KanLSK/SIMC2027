// @ts-nocheck
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { NavPill } from "@/components/PrototypeUI";

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "you---@school.ac.th";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  function handleInput(i: number, val: string) {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    setError(null);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputRefs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) inputRefs.current[i + 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent) {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!paste) return;
    const next = [...otp];
    paste.split("").forEach((c, i) => { next[i] = c; });
    setOtp(next);
    inputRefs.current[Math.min(paste.length, 5)]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("กรุณากรอกรหัส 6 หลักให้ครบ"); return; }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }

    router.push(`/auth/success?email=${encodeURIComponent(email)}`);
    router.refresh();
  }

  async function handleResend() {
    if (!canResend) return;
    const supabase = createClient();
    await supabase.auth.resend({ type: "signup", email });
    setCountdown(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  }

  const stars = [
    { x: "8%",  y: "22%" }, { x: "92%", y: "18%" }, { x: "15%", y: "68%" },
    { x: "85%", y: "72%" }, { x: "50%", y: "10%" }, { x: "72%", y: "42%" },
    { x: "28%", y: "85%" }, { x: "60%", y: "90%" }, { x: "5%",  y: "50%" },
    { x: "95%", y: "55%" }, { x: "38%", y: "15%" }, { x: "78%", y: "25%" },
  ];

  const maskEmail = (e: string) => {
    const [u, d] = e.split("@");
    if (!d) return e;
    return u.slice(0, 3) + "---@" + d;
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center" style={{
      background: `
        radial-gradient(circle at 30% 40%, rgba(143,15,27,0.55) 0%, transparent 50%),
        radial-gradient(circle at 75% 65%, rgba(75,7,0,0.7) 0%, transparent 45%),
        radial-gradient(circle at 15% 80%, rgba(198,27,16,0.25) 0%, transparent 40%),
        linear-gradient(160deg, #1a0408 0%, #0d0205 50%, #140306 100%)
      `,
    }}>
      {/* Ambient ring */}
      <div className="absolute right-[8%] top-[20%] w-[340px] h-[340px] rounded-full border border-[rgba(198,27,16,0.18)] pointer-events-none" />
      <div className="absolute right-[10%] top-[22%] w-[280px] h-[280px] rounded-full border border-[rgba(198,27,16,0.1)] pointer-events-none" />

      {/* Star dots */}
      {stars.map((s, i) => (
        <div key={i} className={`absolute rounded-full pointer-events-none ${i % 3 === 0 ? 'w-1 h-1' : 'w-[3px] h-[3px]'}`} style={{
          left: s.x, top: s.y,
          background: i % 4 === 0 ? "var(--gold)" : "rgba(255,247,226,0.35)",
          boxShadow: i % 4 === 0 ? "0 0 6px var(--gold)" : "none",
        }} />
      ))}

      {/* Left vertical strip */}
      <div className="absolute top-[110px] left-9 z-10 flex flex-col gap-8 items-center">
        <div className="mono text-simc-gold tracking-[0.2em] text-[10px]" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
          ACT I · COLD OPEN
        </div>
        <div className="mono text-simc-ink-mute tracking-[0.2em] text-[10px] opacity-60" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
          27 · 01 · 2570
        </div>
      </div>

      {/* Right vertical timecode */}
      <div className="absolute top-[110px] right-9 z-10 flex flex-col gap-6 items-center">
        <div className="mono flicker text-simc-primary-2 text-[10px] tracking-[0.2em] border border-[rgba(198,27,16,0.4)] py-1 px-2 rounded flex items-center gap-1.5 bg-[rgba(198,27,16,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-simc-primary-2" /> REC
        </div>
        <div className="mono text-simc-ink-mute tracking-[0.2em] text-[10px] opacity-60" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
          13°45′32″N · 100°29′07″E
        </div>
      </div>

      {/* Navbar */}
      <div className="fixed top-7 left-0 right-0 flex justify-center z-50">
        <NavPill active="register" />
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center pt-[100px] px-6 pb-[60px] w-full">
        {/* Progress breadcrumb */}
        <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.16em] uppercase mb-8">
          {[
            { n: "01", l: "ลงทะเบียน", done: true },
            { n: "02", l: "ยืนยัน OTP", active: true },
            { n: "03", l: "เสร็จสิ้น" },
          ].map((step, i) => (
            <span key={i} className="flex items-center gap-2.5">
              {i > 0 && <span className="text-[rgba(255,247,226,0.2)]">→</span>}
              <span className={step.active ? "text-simc-gold" : step.done ? "text-[rgba(255,247,226,0.5)]" : "text-[rgba(255,247,226,0.25)]"}>
                {step.n} {step.l}
              </span>
            </span>
          ))}
        </div>

        {/* Heading */}
        <div className="text-center mb-9">
          <div className="kicker mb-3.5">· Verify Identity ·</div>
          <h1 className="m-0 leading-[1.2]">
            <span className="display text-[clamp(28px,4.5vw,48px)] text-simc-cream font-medium">
              ยืนยันรหัส{" "}
            </span>
            <span className="display text-[clamp(28px,4.5vw,48px)] text-simc-gold italic">
              OTP
            </span>
          </h1>
          <p className="mt-3.5 text-[13.5px] text-simc-ink-mute leading-[1.7] max-w-[380px]">
            เราส่งรหัส 6 หลักไปที่ <span className="text-simc-cream">{maskEmail(email)}</span><br />
            กรุณากรอกเพื่อเปิดแฟ้มส่วนตัวของคุณ
          </p>
        </div>

        {/* OTP card */}
        <div className="w-full max-w-[380px] bg-[rgba(255,255,255,0.055)] border border-[rgba(255,247,226,0.14)] rounded-[24px] backdrop-blur-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] py-7 px-6">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
            {/* 6-box OTP input */}
            <div className="flex gap-2.5" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el; }}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleInput(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className={`w-12 h-[60px] text-center text-2xl font-display font-semibold text-simc-cream rounded-xl outline-none transition-all duration-200
                    ${digit ? 'bg-[rgba(143,15,27,0.35)] border-[1.5px] border-[rgba(198,27,16,0.6)] shadow-[0_0_16px_rgba(198,27,16,0.25)]' 
                            : 'bg-[rgba(10,3,6,0.5)] border border-[rgba(255,247,226,0.12)]'}`}
                  style={{ caretColor: "var(--gold)" }}
                  onFocus={e => {
                    e.target.style.borderColor = "rgba(255,236,155,0.5)";
                    e.target.style.boxShadow = "0 0 0 2px rgba(255,236,155,0.12)";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = digit ? "rgba(198,27,16,0.6)" : "rgba(255,247,226,0.12)";
                    e.target.style.boxShadow = digit ? "0 0 16px rgba(198,27,16,0.25)" : "none";
                  }}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="w-full py-2.5 px-3.5 rounded-lg bg-[rgba(198,27,16,0.15)] border border-[rgba(198,27,16,0.35)] text-[12px] text-[#ff9090] text-center">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="otp-submit"
              type="submit"
              disabled={loading || otp.join("").length < 6}
              className={`w-full py-3.5 px-6 rounded-xl border-none font-body text-[14px] font-semibold tracking-[0.04em] flex items-center justify-center gap-2 transition-all duration-200 text-simc-cream
                ${(loading || otp.join("").length < 6) ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                ${otp.join("").length < 6 ? 'bg-[rgba(143,15,27,0.3)]' : 'bg-gradient-to-br from-[#C61B10] to-[#8F0F1B] shadow-[0_8px_28px_rgba(143,15,27,0.5)]'}
              `}
            >
              {loading ? (
                "กำลังยืนยัน…"
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  ยืนยันรหัส
                </>
              )}
            </button>

            {/* Resend / Countdown */}
            <div className="flex items-center gap-1.5 text-[12px] text-simc-ink-mute font-mono tracking-[0.08em]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {canResend ? (
                <span
                  onClick={handleResend}
                  className="text-simc-gold cursor-pointer underline decoration-[rgba(255,236,155,0.4)] hover:decoration-simc-gold"
                >
                  ส่งรหัสใหม่
                </span>
              ) : (
                <span>ส่งรหัสใหม่ได้ใน <span className="text-simc-cream">{formatTime(countdown)}</span></span>
              )}
            </div>

            {/* Footer */}
            <div className="font-mono text-[9px] text-simc-ink-faint tracking-[0.18em] uppercase">
              SIMC 27 · One-Time Passcode · 6 Digits
            </div>
          </form>
        </div>

        {/* Back link */}
        <p className="mt-7 text-[13px] text-simc-ink-mute text-center">
          กรอกผิดอีเมล?{" "}
          <Link href="/auth/register" className="text-simc-gold underline decoration-[rgba(255,236,155,0.4)] hover:decoration-simc-gold font-medium">
            กลับไปแก้ไข →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function OTPPage() {
  return (
    <Suspense>
      <OTPForm />
    </Suspense>
  );
}
