// @ts-nocheck
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NavPill, Icon, FilmOverlay } from "@/components/PrototypeUI";

/* ─── Input primitives ─── */
function Field({
  label,
  icon,
  type = "text",
  placeholder,
  id,
  value,
  onChange,
  required = false,
}: {
  label: string;
  icon?: string;
  type?: string;
  placeholder?: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[12px] text-simc-ink-mute font-body tracking-[0.03em]"
      >
        {label}
        {required && <span className="text-simc-primary-2 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-simc-ink-mute pointer-events-none flex"
          >
            <Icon name={icon} size={14} />
          </span>
        )}
          <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`
            w-full bg-[rgba(10,3,6,0.5)] border border-[rgba(255,247,226,0.12)] rounded-xl text-[var(--cream)] text-[13px] font-sans outline-none
            transition-[border-color,box-shadow] duration-200 box-border
            focus:border-[rgba(198,27,16,0.6)] focus:shadow-[0_0_0_3px_rgba(198,27,16,0.12)]
            placeholder:text-[rgba(255,247,226,0.35)]
            ${icon ? "py-3 pr-3.5 pl-10" : "p-3 px-3.5"}
          `}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  icon,
  id,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  icon?: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[12px] text-simc-ink-mute font-body tracking-[0.03em]"
      >
        {label}
        {required && <span className="text-simc-primary-2 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-simc-ink-mute pointer-events-none flex z-10"
          >
            <Icon name={icon} size={14} />
          </span>
        )}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`
            w-full bg-[rgba(10,3,6,0.5)] border border-[rgba(255,247,226,0.12)] rounded-xl text-[13px] font-sans outline-none cursor-pointer appearance-none
            transition-[border-color,box-shadow] duration-200 box-border
            focus:border-[rgba(198,27,16,0.6)] focus:shadow-[0_0_0_3px_rgba(198,27,16,0.12)]
            ${value ? "text-[var(--cream)]" : "text-[rgba(255,247,226,0.35)]"}
            ${icon ? "py-3 pr-9 pl-10" : "py-3 pr-9 pl-3.5"}
          `}
        >
          <option value="" disabled className="bg-[#160304]">เลือก...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#160304]">
              {o.label}
            </option>
          ))}
        </select>
        {/* chevron */}
        <svg
          viewBox="0 0 24 24" width={14} height={14}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-simc-ink-mute"
          fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Section header pill ─── */
function SectionHeader({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-[rgba(255,247,226,0.1)]">
      <div
        className="w-[34px] h-[34px] rounded-lg bg-[rgba(143,15,27,0.35)] border border-[rgba(198,27,16,0.4)] flex items-center justify-center font-mono text-[12px] text-simc-gold shrink-0"
      >
        {num}
      </div>
      <div>
        <div className="text-[15px] font-display text-simc-cream font-medium">{title}</div>
        <div className="mono text-simc-ink-mute mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "",
    nickname: "", dob: "",
    school: "", grade: "",
    email: "", nationalId: "",
    phone: "", guardianPhone: "",
    consent: false,
  });
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    // Redirect to OTP verification page
    router.push(`/auth/otp?email=${encodeURIComponent(form.email)}`);
  };

  return (
    <>
      {/* ─── Page background ─── */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 15%, rgba(180,35,25,0.45), transparent 32%),
            radial-gradient(circle at 75% 35%, rgba(160,50,35,0.35), transparent 38%),
            radial-gradient(circle at 45% 70%, rgba(180,25,35,0.35), transparent 42%),
            radial-gradient(circle at 15% 85%, rgba(130,20,15,0.4), transparent 35%),
            linear-gradient(135deg, #160304 0%, #2a0909 42%, #120608 70%, #050507 100%)
          `,
        }}
      />

      {/* Film scanlines */}
      <div
        className="fixed inset-0 z-10 pointer-events-none opacity-50"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0 2px, transparent 2px 4px)",
        }}
      />

      {/* ─── Orbit rings (decorative) ─── */}
      <div className="orbit" />
      <div className="orbit orbit-inner" />

      {/* ─── Nav (static, top of page) ─── */}
      <div className="relative z-50 flex justify-center pt-6">
        <NavPill active="home" />
      </div>

      {/* ─── Page content ─── */}
      <div
        className="page relative z-10 min-h-screen pt-7 px-4 pb-20 flex flex-col items-center"
      >
        {/* ─── Page header ─── */}
        <div className="w-full max-w-[640px] mb-9">
          {/* Kicker row */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="mono text-simc-gold flex items-center gap-2">
              <span className="w-5 h-px bg-simc-gold inline-block" />
              · BEGIN YOUR CASE · PHASE 1
            </span>
            <div
              className="mono flicker ml-auto text-simc-primary-2 text-[10px] tracking-[0.3em] border border-[rgba(198,27,16,0.45)] py-[3px] px-2 rounded bg-[rgba(198,27,16,0.10)]"
            >
              ● REC
            </div>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h1
                className="display text-[52px] leading-[1.05] text-simc-cream m-0"
              >
                เปิดแฟ้มคดี{" "}
                <em className="text-simc-gold italic">SIMC 27</em>
              </h1>
              <p className="mt-2.5 text-[13.5px] text-simc-ink-mute leading-[1.6] max-w-[440px]">
                กรอกข้อมูลผู้สมัครใหม่ให้ครบทุกช่อง · ใช้เวลาไม่เกิน 5 นาที
              </p>
            </div>

            {/* Case file stamp */}
            <div
              className="shrink-0 border-[1.5px] border-simc-gold rounded-md py-1.5 px-3 font-mono text-[10px] text-simc-gold tracking-[0.22em] bg-[rgba(255,236,155,0.06)] whitespace-nowrap rotate-2"
            >
              FILE · 27
            </div>
          </div>
        </div>

        {/* ─── Form card ─── */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[640px]"
            aria-label="Registration form"
          >
            <div
              className="w-full bg-[rgba(255,255,255,0.055)] border border-[rgba(255,247,226,0.14)] rounded-3xl backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,247,226,0.06)] pt-8 px-8 pb-7"
            >
              {/* ── Section 01: Personal ── */}
              <section aria-labelledby="sec-personal">
                <SectionHeader num="01" title="ข้อมูลส่วนตัว" sub="PERSONAL DETAILS" />
                <div id="sec-personal" className="grid grid-cols-2 gap-y-3.5 gap-x-4.5">
                  <Field
                    id="firstName" label="ชื่อจริง" icon="user" placeholder="กรอกชื่อ"
                    value={form.firstName} onChange={set("firstName")} required
                  />
                  <Field
                    id="lastName" label="นามสกุล" icon="user" placeholder="กรอกนามสกุล"
                    value={form.lastName} onChange={set("lastName")} required
                  />
                  <Field
                    id="nickname" label="ชื่อเล่น" icon="mask" placeholder="ชื่อเล่นอยากให้พี่เรียก"
                    value={form.nickname} onChange={set("nickname")} required
                  />
                  <Field
                    id="dob" label="วันเกิด" icon="calendar" type="date" placeholder="DD / MM / YYYY"
                    value={form.dob} onChange={set("dob")} required
                  />
                </div>
              </section>

              {/* divider */}
              <div className="h-px bg-[rgba(255,247,226,0.1)] my-6.5" />

              {/* ── Section 02: Education ── */}
              <section aria-labelledby="sec-education">
                <SectionHeader num="02" title="การศึกษา" sub="EDUCATION" />
                <div id="sec-education" className="grid grid-cols-2 gap-y-3.5 gap-x-4.5">
                  <Field
                    id="school" label="โรงเรียน" icon="pin" placeholder="ชื่อโรงเรียน"
                    value={form.school} onChange={set("school")} required
                  />
                  <SelectField
                    id="grade" label="ระดับชั้น" icon="feather"
                    value={form.grade} onChange={set("grade")} required
                    options={[
                      { value: "m4", label: "ม.4" },
                      { value: "m5", label: "ม.5" },
                      { value: "m6", label: "ม.6" },
                    ]}
                  />
                </div>
              </section>

              {/* divider */}
              <div className="h-px bg-[rgba(255,247,226,0.1)] my-6.5" />

              {/* ── Section 03: Contact ── */}
              <section aria-labelledby="sec-contact">
                <SectionHeader num="03" title="ติดต่อ & ยืนยันตัวตน" sub="CONTACT & IDENTITY" />
                <div id="sec-contact" className="flex flex-col gap-3.5">
                  <Field
                    id="email" label="อีเมล" icon="key" type="email" placeholder="you@school.ac.th"
                    value={form.email} onChange={set("email")} required
                  />
                  <Field
                    id="nationalId" label="รหัสประจำตัวประชาชน" icon="fingerprint" placeholder="x-xxxx-xxxxx-xx-x"
                    value={form.nationalId} onChange={set("nationalId")} required
                  />
                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-4.5">
                    <Field
                      id="phone" label="เบอร์ติดต่อ" icon="bell" placeholder="08x-xxx-xxxx"
                      value={form.phone} onChange={set("phone")} required
                    />
                    <Field
                      id="guardianPhone" label="เบอร์ผู้ปกครอง" icon="users" placeholder="08x-xxx-xxxx"
                      value={form.guardianPhone} onChange={set("guardianPhone")} required
                    />
                  </div>
                </div>
              </section>

              {/* ── Consent ── */}
              <div className="mt-6.5 flex items-start gap-3">
                <div
                  id="consent-box"
                  role="checkbox"
                  aria-checked={form.consent}
                  tabIndex={0}
                  onClick={() => set("consent")(!form.consent)}
                  onKeyDown={(e) => e.key === " " && set("consent")(!form.consent)}
                  className={`
                    w-[18px] h-[18px] rounded-[5px] shrink-0 mt-0.5 flex items-center justify-center cursor-pointer transition-all duration-200
                    ${form.consent ? 'bg-[rgba(198,27,16,0.8)] border-[1.5px] border-simc-primary-2 shadow-[0_0_10px_rgba(198,27,16,0.4)]' : 'bg-[rgba(10,3,6,0.6)] border-[1.5px] border-[rgba(255,247,226,0.2)]'}
                  `}
                >
                  {form.consent && <Icon name="check" size={11} stroke="#fff" />}
                </div>
                <label
                  htmlFor="consent-box"
                  className="text-[12.5px] text-simc-ink-mute leading-[1.65] cursor-pointer"
                >
                  ฉันยินยอมให้ SIMC 27 จัดเก็บและใช้ข้อมูลเพื่อการสมัครผ่านค่ายเท่านั้น —{" "}
                  <a
                    href="#"
                    className="text-simc-gold underline underline-offset-[3px]"
                    onClick={(e) => e.preventDefault()}
                  >
                    อ่านนโยบาย
                  </a>
                </label>
              </div>

              {/* ── Submit ── */}
              <button
                id="register-submit"
                type="submit"
                disabled={!form.consent || loading}
                className={`
                  mt-5.5 w-full py-[15px] px-6 rounded-full font-body text-[15px] font-medium tracking-[0.03em] flex items-center justify-center gap-2.5 transition-all duration-300 border
                  ${form.consent 
                    ? "bg-gradient-to-r from-[rgba(143,15,27,0.95)] to-[rgba(198,27,16,0.9)] border-[rgba(255,60,60,0.35)] text-simc-cream cursor-pointer shadow-[0_8px_28px_rgba(143,15,27,0.45)]" 
                    : "bg-[rgba(80,10,10,0.4)] border-[rgba(255,60,60,0.35)] text-simc-ink-faint cursor-not-allowed"}
                `}
              >
                {loading ? (
                  <>
                    <LoadingSpinner />
                    กำลังส่งข้อมูล...
                  </>
                ) : (
                  <>
                    ลงทะเบียน · Register
                    <Icon name="arrow-right" size={16} />
                  </>
                )}
              </button>
            </div>

            {/* Already registered */}
            <p className="mt-5 text-center text-[13.5px] text-simc-ink-mute">
              เคยลงทะเบียนแล้ว?{" "}
              <a
                href="/auth/login"
                className="text-simc-gold underline underline-offset-[3px] inline-flex items-center gap-1"
              >
                เข้าสู่ระบบที่นี่ <Icon name="arrow-right" size={12} stroke="var(--gold)" />
              </a>
            </p>
          </form>
        ) : (
          <SuccessCard />
        )}
      </div>

      <style>{`
        /* Vignette overlay */
        .page::after {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.65) 100%);
          z-index: 5;
        }

        /* Decorative orbit rings */
        .orbit {
          position: fixed;
          right: -120px;
          top: 150px;
          width: 420px;
          height: 420px;
          border: 14px solid rgba(255,180,140,0.07);
          border-radius: 50%;
          pointer-events: none;
          z-index: 3;
        }
        .orbit-inner {
          right: -40px;
          top: 230px;
          width: 260px;
          height: 260px;
          border-width: 8px;
          border-color: rgba(255,180,140,0.04);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes successPop {
          0% { transform: scale(0.85); opacity: 0; }
          60% { transform: scale(1.04); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"
      className="shrink-0"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function SuccessCard() {
  return (
    <div
      className="glass w-full max-w-[540px] rounded-[28px] pt-[52px] px-10 pb-[44px] bg-[rgba(22,4,8,0.75)] backdrop-blur-[28px] text-center"
      style={{
        animation: "successPop 0.5s cubic-bezier(.2,.7,.2,1) both",
      }}
    >
      {/* Checkmark circle */}
      <div
        className="w-[72px] h-[72px] rounded-full bg-[rgba(143,15,27,0.25)] border-2 border-[rgba(198,27,16,0.6)] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(198,27,16,0.3)]"
      >
        <Icon name="check" size={34} stroke="var(--primary-2)" />
      </div>

      <div className="kicker mb-3 text-simc-gold">
        · CASE REGISTERED SUCCESSFULLY ·
      </div>
      <h2
        className="display text-4xl text-simc-cream m-0 leading-[1.1]"
      >
        ยินดีต้อนรับสู่<br />
        <em className="text-simc-gold italic">SIMC 27</em>
      </h2>
      <p className="mt-3.5 text-[14px] text-simc-ink-mute leading-[1.7]">
        ข้อมูลของน้องได้รับการบันทึกแล้ว · ทีมงานจะส่งอีเมลยืนยันภายใน 24 ชั่วโมง
      </p>

      <div
        className="mt-7 py-3.5 px-5 rounded-2xl bg-[rgba(10,3,6,0.5)] border border-dashed border-simc-glass-border flex items-center gap-3"
      >
        <Icon name="bell" size={18} stroke="var(--gold)" />
        <p className="m-0 text-[13px] text-simc-ink-2 text-left leading-[1.5]">
          ติดตามประกาศได้ที่{" "}
          <a href="https://instagram.com/simc27" className="text-simc-gold">@simc27</a>{" "}
          และอีเมลที่น้องลงทะเบียน
        </p>
      </div>

      <a
        href="/"
        className="inline-flex items-center gap-2 mt-7 py-3 px-7 rounded-full bg-[rgba(143,15,27,0.8)] border border-[rgba(255,60,60,0.3)] text-simc-cream text-[14px] no-underline shadow-[0_6px_20px_rgba(143,15,27,0.35)]"
      >
        <Icon name="arrow-left" size={14} /> กลับหน้าหลัก
      </a>
    </div>
  );
}
