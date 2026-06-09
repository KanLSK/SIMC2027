// @ts-nocheck

"use client";
import React, { useEffect } from 'react';
import { SceneBG, NavPill, BrandMark, Icon, SectionTitle, Tape, ArtFrame, FallingPetals, NoirHeader, MetaStrip, FilmOverlay, CaseStamp, ActRibbon } from "@/components/PrototypeUI";
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

const BANNER = "/assets/backdrop.png";













function HomePageBold() {
  return (
    <ArtFrame tone="deep">
      <div style={{ padding: "0 0 0", position: "relative" }}>
        {/* ─── ACT I · COLD OPEN ─── */}
        <BoldHero />

        {/* Marquee strip */}
        <BoldMarquee />

        {/* ─── ACT II · THE CASE BRIEF ─── */}
        <BoldCaseBrief />

        {/* ─── ACT III · INVESTIGATORS PINBOARD ─── */}
        <BoldInvestigators />

        {/* Stat bar / case file at-a-glance */}
        <BoldStatStrip />

        {/* ─── ACT IV · EVIDENCE LOCKER (TIMELINE) ─── */}
        <BoldTimeline />

        {/* ─── ACT V · OPERATIONS PLAN (CAMP DAY) ─── */}
        <BoldOperations />

        {/* ─── ACT VI · WITNESS TESTIMONIES ─── */}
        <BoldTestimonies />

        {/* ─── ACT VII · PRE-CAMP INVITATION ─── */}
        <BoldInvitation />

        {/* ─── ACT VIII · FAQ FILE CABINET ─── */}
        <BoldFaqCabinet />

        {/* ─── FINAL · SIGN YOUR NAME ─── */}
        <BoldFinalCta />

        {/* ─── FOOTER ─── */}
        <BoldFooter />
      </div>
    </ArtFrame>
  );
}

// ─── Hero: cold open ───────────────────────────────────────────────
function BoldHero() {
  return (
    <div style={{ position: "relative", height: 980, overflow: "hidden" }}>
      <img src={BANNER} alt="" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        filter: "saturate(122%) contrast(112%) brightness(0.85)",
      }} />
      {/* multi-layer vignette + redshift */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, transparent 30%, rgba(10,3,6,0.65) 75%, rgba(10,3,6,0.95) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,3,6,0.55) 0%, rgba(10,3,6,0.0) 25%, rgba(10,3,6,0.0) 55%, rgba(10,3,6,0.92) 100%)" }} />
      {/* scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.10) 0 2px, transparent 2px 4px)",
        mixBlendMode: "multiply", opacity: 0.4,
      }} />

      {/* Top nav */}
      <div style={{ position: "fixed", top: 28, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 50 }}>
        <NavPill active="home" />
      </div>

      {/* Falling petals — diagonal flow from upper-left to lower-right */}
      <FallingPetals count={28} variant="crimson" />

      {/* Left vertical strip */}
      <div style={{ position: "absolute", top: 110, left: 36, zIndex: 3, display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
        <div className="mono" style={{ color: "var(--gold)", letterSpacing: "0.2em", fontSize: 10, writingMode: "vertical-rl", textOrientation: "upright" }}>
          ACT I · COLD OPEN
        </div>
        <div className="mono" style={{ color: "var(--ink-mute)", letterSpacing: "0.2em", fontSize: 10, writingMode: "vertical-rl", textOrientation: "upright", opacity: 0.6 }}>
          27 · 01 · 2570
        </div>
      </div>

      {/* Right vertical timecode + coords */}
      <div style={{ position: "absolute", top: 110, right: 36, zIndex: 3, display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
        <div className="mono flicker" style={{
          color: "var(--primary-2)", fontSize: 10, letterSpacing: "0.2em",
          border: "1px solid rgba(198, 27, 16, 0.4)", padding: "4px 8px", borderRadius: 4,
          display: "flex", alignItems: "center", gap: 6, background: "rgba(198, 27, 16, 0.1)"
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--primary-2)" }} /> REC
        </div>
        <div className="mono" style={{ color: "var(--ink-mute)", letterSpacing: "0.2em", fontSize: 10, writingMode: "vertical-rl", textOrientation: "upright", opacity: 0.6 }}>
          13°45′32″N · 100°29′07″E
        </div>
      </div>

      {/* Bottom-left positioned titles */}
      <div style={{
        position: "absolute", left: 80, right: 80, bottom: 80, zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <span style={{ width: 60, height: 1, background: "var(--gold)" }} />
          <span className="mono" style={{ color: "var(--gold)", letterSpacing: "0.15em", fontSize: 12 }}>THE 27TH INVESTIGATION</span>
        </div>

        <div className="display" style={{
          fontSize: 140, lineHeight: 1.0,
          fontWeight: 700, letterSpacing: "-0.02em",
          display: "flex", gap: 24
        }}>
          <span style={{ color: "var(--primary-2)", fontStyle: "italic", textShadow: "0 4px 30px rgba(198, 27, 16, 0.5)" }}>ปริศนา</span>
          <span style={{ color: "var(--cream)", fontStyle: "normal", textShadow: "0 4px 30px rgba(255, 236, 155, 0.4)" }}>กำลัง</span>
          <span style={{ color: "var(--primary-2)", fontStyle: "italic", textShadow: "0 4px 30px rgba(198, 27, 16, 0.5)" }}>รอ</span>
        </div>

        <div style={{ marginTop: 12, fontFamily: "var(--f-sans)", fontStyle: "italic", fontSize: 22, color: "var(--ink-2)", maxWidth: 540, lineHeight: 1.5, letterSpacing: "0.02em" }}>
          “อะไรคือสิ่งที่ทำให้เรา... เลือกทางเดินนี้?”
        </div>

        <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
          <button style={{
            background: "rgba(143, 15, 27, 0.9)", color: "var(--cream)",
            padding: "14px 28px", borderRadius: 999, fontSize: 14, fontWeight: 500,
            border: "1px solid rgba(255, 60, 60, 0.3)", display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 8px 24px rgba(143, 15, 27, 0.4)"
          }}>
            <Icon name="fingerprint" size={16} /> เริ่มสืบคดี · สมัครเลย
          </button>
          <button style={{
            background: "var(--glass-fill)", color: "var(--cream)",
            padding: "14px 28px", borderRadius: 999, fontSize: 14, fontWeight: 500,
            border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", gap: 10,
            backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
            WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturate))"
          }}>
            <Icon name="play" size={14} /> ดูตัวอย่าง 27 วินาที
          </button>
        </div>
      </div>

      {/* Floating fingerprint / radar corner */}
      <svg viewBox="0 0 100 100" style={{ position: "absolute", right: 100, top: 120, width: 80, height: 80, opacity: 0.15, zIndex: 2 }}>
        <g fill="none" stroke="var(--cream)" strokeWidth="0.5" strokeLinecap="round">
          {[10, 20, 30, 40].map((r, i) => (
            <path key={i} d={`M ${50-r} 80 A ${r} ${r} 0 0 1 ${50+r} 80`} />
          ))}
          <path d="M50 40 L50 80" />
          <path d="M10 80 L90 80" />
        </g>
      </svg>
    </div>
  );
}

function MetaCell({ k, v, tone }) {
  const color = tone === "red" ? "var(--primary-2)" : "var(--cream)";
  return (
    <div>
      <div className="mono" style={{ color: "var(--ink-mute)" }}>{k}</div>
      <div className="display" style={{ fontSize: 15, color, marginTop: 2, letterSpacing: "0.02em" }}>{v}</div>
    </div>
  );
}

// ─── Marquee strip ─────────────────────────────────────────────────
function BoldMarquee() {
  const phrase = "MURDER MYSTERY · SIRIRAJ MEDICAL CAMP · 27TH EDITION · ENTER AT YOUR OWN RISK · CASE OPENED · 01 SEP 2569 · ";
  return (
    <div style={{ position: "relative", padding: "32px 0", overflow: "hidden" }}>
      <div style={{
        position: "relative", overflow: "hidden", padding: "16px 0",
        background: "linear-gradient(90deg, #d9b85a 0%, #FFEC9B 50%, #d9b85a 100%)",
        borderTop: "1px solid rgba(75,7,0,0.4)",
        borderBottom: "1px solid rgba(75,7,0,0.4)",
        boxShadow: "0 14px 40px rgba(0,0,0,0.55), 0 0 30px rgba(255,236,155,0.3)",
        transform: "rotate(-2.2deg) scale(1.04)",
        transformOrigin: "center",
      }}>
        {/* subtle horizontal stitch lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg, rgba(75,7,0,0.10) 0 1px, transparent 1px 6px)",
        }} />
        <div className="marquee-track" style={{ display: "flex", gap: 36 }}>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="mono" style={{
              fontSize: 22, letterSpacing: "0.42em", color: "#2a0a0c",
              fontWeight: 600, opacity: 0.92, whiteSpace: "nowrap",
              display: "inline-flex", alignItems: "center", gap: 26,
            }}>
              {phrase} <span style={{ color: "#8F0F1B" }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Case Brief: newspaper clipping ────────────────────────────────
function BoldCaseBrief() {
  return (
    <div style={{ padding: "100px 56px 80px", position: "relative" }}>
      <div className="kicker" style={{ marginBottom: 12 }}>· Act II · The Brief</div>
      <div className="display" style={{ fontSize: 56, lineHeight: 1.0, color: "var(--cream)", maxWidth: 720 }}>
        เปิดแฟ้ม<br />
        <em style={{ color: "var(--gold)" }}>คดี No. 27</em>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40, alignItems: "start" }}>
        {/* Newspaper clipping */}
        <div className="newsprint" style={{ padding: "36px 40px", transform: "rotate(-0.6deg)", position: "relative" }}>
          <div className="tape-strip" style={{ top: -14, left: 60 }} />
          <div className="tape-strip" style={{ top: -14, right: 70, transform: "rotate(5deg)" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", borderBottom: "2px solid #2a0a0c", paddingBottom: 8, marginBottom: 18 }}>
            <span className="display" style={{ fontSize: 13, color: "#2a0a0c", letterSpacing: "0.18em", fontFamily: "var(--f-mono)" }}>THE SIRIRAJ TIMES · No. 27 · พ.ศ. 2569</span>
            <span className="mono" style={{ color: "#2a0a0c" }}>FRONT PAGE</span>
          </div>

          <div className="display" style={{ fontSize: 54, lineHeight: 1.0, color: "#2a0a0c", letterSpacing: "-0.01em" }}>
            การฆาตกรรม<br /><em style={{ color: "#8F0F1B" }}>ได้เกิดขึ้น…</em>
          </div>

          <div style={{ marginTop: 18, columnCount: 2, columnGap: 28, columnRule: "1px solid rgba(42,10,12,0.2)", fontSize: 14, lineHeight: 1.75, color: "#2a0a0c" }}>
            <p style={{ margin: "0 0 12px" }}>
              ณ สถานที่เกิดเหตุนั้น… มีสัญลักษณ์บางอย่าง ซึ่งลักษณะของ <em>“สิ่งนั้น”</em> คล้ายกับการฆาตกรรมที่เกิดขึ้นเมื่อหลายปีที่แล้ว ท่ามกลางความตื่นตระหนกของโลกแห่งนี้ น้อง ๆ ค่ายถูกอัญเชิญเข้ามา เพื่อแก้ปริศนานี้
            </p>
            <p style={{ margin: 0 }}>
              และพบกับความจริงที่ท้าทายความคิด พร้อมตั้งคำถามว่า <span style={{ background: "#FFEC9B", padding: "0 4px" }}>“อะไรคือสิ่งที่ทำให้เราเลือกทางเดินนี้?”</span> — ตลอด 2 วัน 1 คืน น้องค่ายจะได้พบกับ <span className="redacted">XXXXXXXX</span> ที่ซ่อนอยู่ในตึก <span className="redacted">XXXXXXXX</span>
            </p>
          </div>

          <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "end", fontSize: 12, color: "rgba(42,10,12,0.7)", fontFamily: "var(--f-mono)", letterSpacing: "0.1em" }}>
            <span>FILED BY · DETECTIVE TEAM 27</span>
            <span>· PAGE 01 ·</span>
          </div>

          <div className="stamp-big" style={{
            position: "absolute", right: -18, bottom: -22, transform: "rotate(12deg)",
            background: "rgba(198,27,16,0.12)",
          }}>EVIDENCE · 27</div>
        </div>

        {/* Polaroid stack */}
        <div style={{ position: "relative", height: 540 }}>
          <PolaroidStack />
        </div>
      </div>
    </div>
  );
}

function PolaroidStack() {
  // 4 polaroids stacked / scattered
  const polaroids = [
    { rot: -8, x: 20, y: 0, caption: "ตึก ER · 23:14", gradient: "linear-gradient(135deg, #1a0608, #4B0700, #8F0F1B)" },
    { rot: 6, x: 100, y: 80, caption: "หลักฐาน · #04", gradient: "radial-gradient(circle at 50% 40%, rgba(255,236,155,0.5), transparent), linear-gradient(180deg, #1d0810, #4B0700)" },
    { rot: -3, x: 60, y: 220, caption: "พยาน · นิรนาม", gradient: "linear-gradient(135deg, #356B6D, #1d0810)" },
    { rot: 9, x: 140, y: 320, caption: "ที่เกิดเหตุ · floor 6", gradient: "radial-gradient(circle at 30% 70%, rgba(143,15,27,0.6), transparent), linear-gradient(180deg, #0a0306, #1d0810)" },
  ];
  return (
    <>
      {polaroids.map((p, i) => (
        <div key={i} className="polaroid" style={{
          position: "absolute", left: p.x, top: p.y, width: 220, height: 200,
          transform: `rotate(${p.rot}deg)`,
        }}>
          <div className="tape-strip" style={{ top: -12, left: 70 }} />
          <div style={{
            width: "100%", height: 130, borderRadius: 2,
            background: p.gradient,
            position: "relative", overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.4)",
          }}>
            {/* fake crime-scene marker */}
            <svg viewBox="0 0 100 60" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              {i === 0 && (<>
                <circle cx="50" cy="40" r="14" fill="rgba(255,236,155,0.18)" />
                <text x="50" y="44" textAnchor="middle" fill="#FFEC9B" fontSize="9" fontFamily="JetBrains Mono">{`A-0${i+1}`}</text>
              </>)}
              {i === 1 && (
                <g stroke="#FFEC9B" strokeWidth="0.6" fill="none" opacity="0.8">
                  {[8,14,20,26].map((r, k) => <path key={k} d={`M ${50-r} 30 A ${r} ${r*0.9} 0 0 1 ${50+r} 30`} />)}
                </g>
              )}
              {i === 2 && (
                <g stroke="rgba(159,209,211,0.6)" strokeWidth="0.5" fill="none">
                  <rect x="20" y="14" width="60" height="32" />
                  <line x1="20" y1="30" x2="80" y2="30" />
                  <circle cx="40" cy="30" r="3" fill="#9fd1d3" />
                </g>
              )}
              {i === 3 && (
                <g stroke="rgba(255,159,159,0.5)" strokeWidth="0.6" fill="none" strokeDasharray="2 2">
                  <path d="M10 50 L40 20 L60 40 L90 10" />
                </g>
              )}
            </svg>
          </div>
          <div className="polaroid-caption">{p.caption}</div>
        </div>
      ))}

      {/* Red string between polaroids */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <path d="M 130 100 Q 240 140 220 260 T 280 460" stroke="#C61B10" strokeWidth="1" fill="none" strokeDasharray="3 4" opacity="0.6" />
        <circle cx="130" cy="100" r="3" fill="#C61B10" />
        <circle cx="280" cy="460" r="3" fill="#C61B10" />
      </svg>

      {/* Evidence tag */}
      <div className="glass" style={{
        position: "absolute", left: -10, bottom: -20, padding: "12px 16px", borderRadius: 12,
        transform: "rotate(-4deg)",
      }}>
        <div className="mono" style={{ color: "var(--gold)" }}>EVIDENCE · 27</div>
        <div className="display" style={{ fontSize: 14, color: "var(--cream)", marginTop: 2 }}>recovered at scene</div>
      </div>
    </>
  );
}

// ─── Investigators / 5 teams pinboard ──────────────────────────────
function BoldInvestigators() {
  const teams = [
    { code: "DEPT · 01", title: "Academic", subtitle: "Preclinic + Clinic", body: "ฐานความรู้ที่ประสานทั้ง Preclinic และ Clinic จนน้องสามารถเข้าใจถึงสาเหตุการตายและจับคนร้ายได้จากความรู้นั้น", icon: "skull", tag: "LEAD INVESTIGATION", clue: "พยาธิวิทยา · กายวิภาค · เวชศาสตร์ฉุกเฉิน" },
    { code: "DEPT · 02", title: "Bonding", subtitle: "Squad operations", body: "ฐานที่สร้าง “ความเป็นค่าย” เพิ่มความกล้าของน้อง ๆ ผ่านกิจกรรมที่ผูกใจคนในทีมเข้าด้วยกัน", icon: "users", tag: "SQUAD COHESION", clue: "เกม · กลุ่มสัมพันธ์ · trust falls" },
    { code: "DEPT · 03", title: "พี่กลุ่ม", subtitle: "Field handlers", body: "พี่ ๆ ที่จะอยู่เคียงข้างน้องตลอดค่าย พาให้น้องได้พบประสบการณ์ที่ดีที่สุดและเป็นเพื่อนรุ่นโตที่จะอยู่ในความทรงจำ", icon: "feather", tag: "MENTORSHIP", clue: "1 พี่ : 5 น้อง · 24 ชม. on-call" },
    { code: "DEPT · 04", title: "Guidance", subtitle: "Career counsel", body: "การแนะแนวจากอาจารย์ศิริราชและรุ่นพี่โดยตรง เพื่อพาน้อง ๆ ก้าวสู่ฝัน และเข้าใจเส้นทางสายแพทย์อย่างถ่องแท้", icon: "spark", tag: "PATH TO MD", clue: "แนะแนว · QnA · 1-on-1 sessions" },
  ];
  return (
    <div style={{ padding: "80px 56px 56px", position: "relative" }}>
      <div className="kicker" style={{ marginBottom: 12 }}>· Act III · The Investigators</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 36 }}>
        <div className="display" style={{ fontSize: 56, lineHeight: 1.0, color: "var(--cream)" }}>
          ทีมที่จะ<em style={{ color: "var(--gold)" }}>ไขคดี</em><br />ไปกับน้อง
        </div>
        <div style={{ maxWidth: 360, fontSize: 13.5, color: "var(--ink-mute)", lineHeight: 1.7 }}>
          ฉาก เบาะแส และผู้คน —<br />
          <em style={{ color: "var(--gold)" }}>ที่กำลังรอน้อง ๆ เดินเข้ามา</em>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, position: "relative" }}>
        {teams.map((t, i) => (
          <DeptCard key={i} {...t} flip={i % 2 === 1} />
        ))}
      </div>

      {/* PR team — full width support unit */}
      <div className="glass-strong" style={{
        marginTop: 28, padding: 28, borderRadius: 24,
        display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 28, alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: "radial-gradient(circle at 30% 30%, rgba(255,236,155,0.3), rgba(53,107,109,0.4))",
          border: "1px solid var(--glass-border-strong)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)",
        }}>
          <Icon name="sound" size={32} />
        </div>
        <div>
          <div className="mono" style={{ color: "#9fd1d3" }}>SUPPORT UNIT · 05 · Public Relations</div>
          <div className="display" style={{ fontSize: 24, color: "var(--cream)", marginTop: 4 }}>
            ทีมที่พาน้อง ๆ จาก <em style={{ color: "var(--gold)" }}>“คนที่แค่เลื่อนผ่าน”</em> สู่ <em style={{ color: "var(--gold)" }}>“คนที่อยากสมัคร”</em> และ <em style={{ color: "var(--gold)" }}>“คนที่รอค่ายนี้”</em> ด้วยความรู้สึกพิเศษ
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "end" }}>
          <span className="chip chip-teal"><span className="chip-dot" /> @simc27 · IG</span>
          <span className="chip"><span className="chip-dot" /> 24K followers</span>
        </div>
      </div>
    </div>
  );
}

function DeptCard({ code, title, subtitle, body, icon, tag, clue, flip }) {
  return (
    <div className="glass" style={{
      borderRadius: 22, overflow: "hidden",
      transform: flip ? "rotate(0.3deg)" : "rotate(-0.3deg)",
      transition: "transform var(--t-mid)",
    }}>
      {/* photo area */}
      <div style={{
        position: "relative", height: 180,
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,236,155,0.18), transparent 60%),
          linear-gradient(180deg, rgba(143,15,27,0.45), rgba(75,7,0,0.7)),
          repeating-linear-gradient(135deg, rgba(255,247,226,0.05) 0 14px, rgba(255,247,226,0.02) 14px 28px)
        `,
        borderBottom: "1px solid var(--glass-border)",
      }}>
        <div style={{
          position: "absolute", top: 14, left: 14,
          fontFamily: "var(--f-mono)", color: "var(--gold)", fontSize: 10,
          letterSpacing: "0.3em", padding: "3px 8px",
          border: "1px solid rgba(255,236,155,0.4)", borderRadius: 4,
        }}>{code}</div>
        <span className="stamp" style={{
          position: "absolute", top: 14, right: 14, transform: "rotate(4deg)",
        }}>{tag}</span>
        {/* icon as suspect silhouette */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,247,226,0.75)",
        }}>
          <Icon name={icon} size={64} />
        </div>
        {/* corner brackets */}
        {["tl","tr","bl","br"].map((c, k) => {
          const styles = { tl: { top: 8, left: 8 }, tr: { top: 8, right: 8 }, bl: { bottom: 8, left: 8 }, br: { bottom: 8, right: 8 } }[c];
          return <span key={k} style={{ position: "absolute", width: 14, height: 14, border: "1.5px solid var(--gold)", ...styles, borderTop: c.startsWith("t") ? undefined : "none", borderBottom: c.startsWith("b") ? undefined : "none", borderLeft: c.endsWith("l") ? undefined : "none", borderRight: c.endsWith("r") ? undefined : "none" }} />;
        })}
      </div>
      <div style={{ padding: 22 }}>
        <div className="display" style={{ fontSize: 24, color: "var(--cream)" }}>{title}</div>
        <div className="mono" style={{ color: "var(--gold)", marginTop: 2 }}>{subtitle}</div>
        <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 12, lineHeight: 1.65 }}>{body}</div>

        <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: 10, background: "rgba(10,3,6,0.5)", border: "1px dashed var(--glass-border)" }}>
          <div className="mono" style={{ color: "var(--ink-mute)" }}>CLUE</div>
          <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 4, fontStyle: "italic", fontFamily: "var(--f-display)" }}>{clue}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat strip ────────────────────────────────────────────────────
function BoldStatStrip() {
  return (
    <div style={{ padding: "0 56px" }}>
      <div className="glass-strong" style={{ borderRadius: 24, padding: "28px 36px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 28, alignItems: "center" }}>
        <BigStat n="120" unit="คน" label="โควต้ารับเข้าค่าย" />
        <BigStat n="2" unit="วัน 1 คืน" label="ระยะเวลา" />
        <BigStat n="27" unit="ปี" label="รุ่นของค่าย" />
        <BigStat n="50" unit="ข้อ" label="ข้อสอบคัดเลือก" />
        <BigStat n="∞" unit="memories" label="สิ่งที่จะติดตัวไป" />
      </div>
    </div>
  );
}

function BigStat({ n, unit, label }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 64, color: "var(--cream)", lineHeight: 1, letterSpacing: "-0.02em" }}>
        {n} <span style={{ fontSize: 16, color: "var(--gold)", fontFamily: "var(--f-mono)", letterSpacing: "0.1em" }}>{unit}</span>
      </div>
      <div className="mono" style={{ color: "var(--ink-mute)", marginTop: 6 }}>{label}</div>
    </div>
  );
}

// ─── Evidence locker timeline ──────────────────────────────────────
function BoldTimeline() {
  const phases = [
    { n: "01", title: "Pre-register", date: "ก.ย. — ต.ค. 2569", body: "เปิดสมัครสอบ · กรอกข้อมูล · เขียน Personal Statement", status: "active", stamp: "OPEN", evidence: "A-001" },
    { n: "02", title: "Exam Day", date: "20 ต.ค. 2569", body: "สอบออนไลน์ · 90 นาที · 50 ข้อ · MCQ + Case-based", status: "next", stamp: "SCHEDULED", evidence: "B-014" },
    { n: "03", title: "Pre-camp", date: "15 พ.ย. 2569", body: "แนะแนว + กิจกรรม warm-up · ออนไซต์/ออนไลน์", status: "upcoming", stamp: "PENDING", evidence: "C-027" },
    { n: "04", title: "Camp Day", date: "30–31 ม.ค. 2570", body: "ค่ายตัวจริง · 2 วัน 1 คืน · ศิริราช + ศูนย์ปฏิบัติธรรม", status: "upcoming", stamp: "PENDING", evidence: "D-031" },
  ];
  return (
    <div style={{ padding: "100px 56px 60px", position: "relative" }}>
      <div className="kicker" style={{ marginBottom: 12 }}>· Act IV · Evidence Locker</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 32 }}>
        <div className="display" style={{ fontSize: 56, lineHeight: 1.0, color: "var(--cream)" }}>
          <span style={{ display: "block", fontSize: 22, color: "var(--gold)", fontFamily: "var(--f-mono)", letterSpacing: "0.4em", marginBottom: 14 }}>ROADMAP</span>
          เส้นทาง<em style={{ color: "var(--gold)" }}>สู่คดี</em>
        </div>
        <div className="mono" style={{ color: "var(--ink-mute)" }}>04 PHASES · SEP 2569 — JAN 2570</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, position: "relative" }}>
        {/* connector */}
        <div style={{
          position: "absolute", top: 96, left: "5%", right: "5%", height: 2,
          background: "repeating-linear-gradient(90deg, var(--glass-border-strong) 0 8px, transparent 8px 14px)",
          zIndex: 0,
        }} />
        {phases.map((p, i) => <EvidenceFolder key={i} {...p} />)}
      </div>
    </div>
  );
}

function EvidenceFolder({ n, title, date, body, status, stamp, evidence }) {
  const dot = status === "active" ? "var(--primary-2)" : status === "next" ? "var(--gold)" : "var(--ink-faint)";
  const stampColor = status === "active" ? "var(--primary-2)" : status === "next" ? "var(--gold)" : "var(--ink-mute)";
  return (
    <div className="glass" style={{
      padding: 0, borderRadius: 16, overflow: "hidden", position: "relative", zIndex: 1,
      transform: status === "active" ? "rotate(-0.4deg)" : "rotate(0.2deg)",
    }}>
      {/* folder tab */}
      <div style={{
        background: "rgba(255,247,226,0.06)",
        padding: "10px 18px",
        borderBottom: "1px solid var(--glass-border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span className="mono" style={{ color: "var(--gold)" }}>EVIDENCE · {evidence}</span>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: dot, boxShadow: `0 0 12px ${dot}` }} />
      </div>
      <div style={{ padding: 22, position: "relative" }}>
        <div className="display" style={{ fontSize: 56, color: "rgba(255,247,226,0.08)", lineHeight: 1, position: "absolute", top: 8, right: 14, fontWeight: 600 }}>{n}</div>
        <div className="mono" style={{ color: "var(--ink-mute)" }}>PHASE {n}</div>
        <div className="display" style={{ fontSize: 22, color: "var(--cream)", marginTop: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--gold)", fontFamily: "var(--f-mono)", letterSpacing: "0.1em", marginTop: 2 }}>{date}</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-mute)", marginTop: 14, lineHeight: 1.6 }}>{body}</div>

        <div style={{
          marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 10px", border: `1.5px solid ${stampColor}`, color: stampColor,
          borderRadius: 4, fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.3em",
          transform: "rotate(-3deg)",
        }}>● {stamp}</div>
      </div>
    </div>
  );
}

// ─── Operations / Camp Day preview ─────────────────────────────────
function BoldOperations() {
  return (
    <div style={{ padding: "60px 56px 80px" }}>
      <div className="kicker" style={{ marginBottom: 12 }}>· Act V · Operations Plan</div>
      <div className="display" style={{ fontSize: 56, lineHeight: 1.0, color: "var(--cream)" }}>
        2 วัน 1 คืน<br />
        <em style={{ color: "var(--gold)" }}>กับคดี No. 27</em>
      </div>
      <div style={{ marginTop: 14, color: "var(--ink-mute)", fontSize: 14, maxWidth: 640, lineHeight: 1.7 }}>
        จัด ณ <em style={{ color: "var(--cream)" }}>คณะแพทยศาสตร์ศิริราชพยาบาล</em> · 30–31 มกราคม 2570 · ค้างคืนได้ที่ <em style={{ color: "var(--cream)" }}>ศูนย์ปฏิบัติธรรมศิริราช นครปฐม</em> (ไม่บังคับ)
      </div>

      <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <OpsCard
          day="DAY 01"
          date="ศ. 30 ม.ค. 2570"
          tag="OPENING THE CASE"
          highlight
          rows={[
            ["07:30","ลงทะเบียน · รับ Case Kit"],
            ["08:30","Opening · เปิดคดี No. 27"],
            ["10:00","ฐาน Academic I · Preclinic"],
            ["12:00","Bonding lunch"],
            ["13:30","ฐาน Academic II · Clinic"],
            ["16:00","Forensic Hunt · กิจกรรมกลุ่ม"],
            ["18:30","Welcome Dinner"],
            ["20:30","Night Activity · Mystery Stories"],
          ]}
        />
        <OpsCard
          day="DAY 02"
          date="ส. 31 ม.ค. 2570"
          tag="CLOSING THE CASE"
          rows={[
            ["07:00","ตื่นเช้า · activity ยืดเส้น"],
            ["08:30","ฐาน Academic III · Final Lab"],
            ["10:30","เปิดคดี · นำเสนอผู้ต้องสงสัย"],
            ["12:00","Guidance · เส้นทางสู่หมอ"],
            ["14:00","Closing Ceremony"],
            ["15:30","Group Photo + Farewell"],
          ]}
        />
      </div>
    </div>
  );
}

function OpsCard({ day, date, tag, highlight, rows }) {
  return (
    <div className={highlight ? "glass glass-strong" : "glass"} style={{ borderRadius: 24, overflow: "hidden", position: "relative" }}>
      <div style={{
        padding: "20px 26px", borderBottom: "1px solid var(--glass-border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: highlight ? "rgba(143,15,27,0.18)" : "rgba(10,3,6,0.4)",
      }}>
        <div>
          <div className="display" style={{ fontSize: 24, color: highlight ? "var(--gold)" : "var(--cream)", letterSpacing: "0.04em" }}>{day}</div>
          <div className="mono" style={{ color: "var(--ink-mute)", marginTop: 2 }}>{date}</div>
        </div>
        <span className="stamp" style={{ transform: "rotate(-3deg)" }}>{tag}</span>
      </div>
      <div style={{ padding: 22 }}>
        {rows.map(([t, l], i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 18,
            padding: "10px 0",
            borderBottom: i < rows.length - 1 ? "1px dashed var(--glass-border)" : undefined,
          }}>
            <span className="mono" style={{ color: "var(--gold)", minWidth: 60 }}>{t}</span>
            <span style={{ flex: 1, fontSize: 13.5, color: "var(--cream)" }}>{l}</span>
            <Icon name="arrow-right" size={12} stroke="var(--ink-faint)" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Witness testimonies ────────────────────────────────────────────
function BoldTestimonies() {
  const witnesses = [
    { name: "พี่ออม", role: "SIMC 25 · พี่กลุ่ม", q: "ค่ายนี้คือที่ที่หาเพื่อนสนิทได้ในเวลา 2 วัน — และเป็นแรงผลักดันให้ฉันมาเป็นหมอจริง ๆ", rot: -2 },
    { name: "พี่เกม", role: "SIMC 23 · alumni", q: "ตอนนั้นกลัวมากว่าจะไม่ไหว แต่พี่ ๆ จับมือพาน้องผ่านทุกฐาน รู้ตัวอีกที — ฉันอยู่ปี 4 แล้ว", rot: 1.5 },
    { name: "พี่ฟ้า", role: "SIMC 26 · Academic", q: "Forensic case ในค่ายไม่ใช่แค่สนุก — มันคือบทเรียน Pathology ที่ฉันเอาไปใช้ตอนสอบจริง", rot: -1 },
  ];
  return (
    <div style={{ padding: "60px 56px 80px" }}>
      <div className="kicker" style={{ marginBottom: 12 }}>· Act VI · Witness Testimony</div>
      <div className="display" style={{ fontSize: 56, lineHeight: 1.0, color: "var(--cream)" }}>
        เสียงจาก<em style={{ color: "var(--gold)" }}>พยานในเหตุการณ์</em>
      </div>

      <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {witnesses.map((w, i) => (
          <div key={i} className="glass" style={{
            borderRadius: 18, padding: 26, position: "relative",
            transform: `rotate(${w.rot}deg)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 999, background: "linear-gradient(135deg, var(--teal), var(--primary))", border: "1.5px solid var(--gold)" }} />
              <div>
                <div className="display" style={{ fontSize: 16, color: "var(--cream)" }}>{w.name}</div>
                <div className="mono" style={{ color: "var(--gold)" }}>{w.role}</div>
              </div>
              <span className="stamp" style={{ marginLeft: "auto", transform: "rotate(4deg)", fontSize: 9 }}>VERIFIED</span>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.7, fontFamily: "var(--f-display)", fontStyle: "italic" }}>
              <span style={{ color: "var(--primary-2)", fontSize: 38, lineHeight: 0, verticalAlign: "-18px", marginRight: 4 }}>“</span>
              {w.q}<span style={{ color: "var(--primary-2)" }}>”</span>
            </div>
            <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="mono" style={{ color: "var(--ink-faint)" }}>STATEMENT · {String(i+1).padStart(3,"0")}</div>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3,4,5].map(k => <span key={k} style={{ width: 6, height: 10, background: "var(--gold)", display: "inline-block" }} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pre-camp invitation ────────────────────────────────────────────
function BoldInvitation() {
  return (
    <div style={{ padding: "0 56px 80px" }}>
      <div className="newsprint" style={{
        padding: "44px 56px 52px", borderRadius: 6, position: "relative", overflow: "hidden",
        display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40, alignItems: "start",
      }}>
        <div className="tape-strip" style={{ top: -14, left: "30%" }} />
        <div className="tape-strip" style={{ top: -14, right: "30%", transform: "rotate(6deg)" }} />

        {/* Decorative top crest */}
        <div style={{
          position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: 10,
          color: "#8F0F1B", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.4em",
        }}>
          <span>✦</span><span>SIMC · BUREAU OF MEDICAL CASES</span><span>✦</span>
        </div>

        <div style={{ position: "relative" }}>
          <div className="kicker" style={{ color: "#8F0F1B", marginBottom: 14, letterSpacing: "0.3em" }}>· Act VII · Pre-Camp Invitation</div>
          <div className="display" style={{ fontSize: 56, lineHeight: 1.0, color: "#2a0a0c" }}>
            หมายเรียก<br /><em style={{ color: "#8F0F1B" }}>นักสืบฝึกหัด</em>
          </div>
          <div style={{ marginTop: 16, fontSize: 14, color: "#3a1a1c", lineHeight: 1.8, maxWidth: 520, fontFamily: "var(--f-display)" }}>
            <em>เรียน ผู้สมัครทุกคน,</em><br /><br />
            ในวันที่ <strong>15 พฤศจิกายน 2569</strong> ทีมงานขอเรียนเชิญน้อง ๆ มาร่วมงาน <em style={{ color: "#8F0F1B" }}>Precamp Day</em> งานที่จัดก่อนวันค่ายเพื่อเป็นการอุ่นเครื่องให้กับน้องค่าย — เปิดให้ผู้ที่สมัครสอบทุกท่านมาเข้าร่วมในวันจริง หรือผ่านทางช่องทางออนไลน์ก็ได้
            <br /><br />
            ภายในงานจะประกอบไปด้วยการแนะแนวของพี่ ๆ และอาจารย์จากศิริราชโดยตรง พร้อมกิจกรรมสนุก ๆ อีกมากมาย
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn btn-primary">
              <Icon name="calendar" size={12} /> ลงทะเบียน Pre-camp
            </button>
            <button className="btn">ดู Live ผ่าน Online</button>
          </div>
          <div style={{ marginTop: 24, fontFamily: "var(--f-display)", fontStyle: "italic", color: "#2a0a0c", fontSize: 16 }}>
            ด้วยความเคารพ,<br />
            <span style={{ fontFamily: "Caveat, var(--f-display)", fontSize: 28, color: "#8F0F1B" }}>ทีมจัดทำ SIMC 27</span>
          </div>

          {/* P.S. note */}
          <div style={{
            marginTop: 28, padding: "14px 18px",
            borderTop: "1px dashed rgba(42,10,12,0.35)",
            fontFamily: "var(--f-display)", fontStyle: "italic",
            fontSize: 13.5, color: "#3a1a1c", lineHeight: 1.6,
          }}>
            <span style={{ fontFamily: "Caveat, var(--f-display)", fontSize: 18, color: "#8F0F1B", marginRight: 6 }}>P.S.</span>
            อย่าลืมพกความตั้งใจมาด้วย — ที่เหลือเดี๋ยวพี่ ๆ จัดการให้ ✦
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Event info */}
          <div style={{
            padding: 22, borderRadius: 4,
            border: "2px dashed rgba(42,10,12,0.4)",
            background: "rgba(255,247,226,0.4)",
            color: "#2a0a0c",
          }}>
            <div className="mono" style={{ color: "#8F0F1B" }}>EVENT INFO</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12, fontSize: 13.5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Icon name="calendar" size={14} stroke="#8F0F1B" /> 15 พฤศจิกายน 2569</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Icon name="clock" size={14} stroke="#8F0F1B" /> 09:00 – 16:00 น.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Icon name="pin" size={14} stroke="#8F0F1B" /> ศิริราช + Online</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Icon name="users" size={14} stroke="#8F0F1B" /> ผู้สมัครสอบทุกคน</div>
            </div>
          </div>

          {/* What to bring checklist */}
          <div style={{
            padding: 22, borderRadius: 4,
            background: "rgba(143,15,27,0.08)",
            border: "1px solid rgba(143,15,27,0.25)",
            color: "#2a0a0c",
          }}>
            <div className="mono" style={{ color: "#8F0F1B" }}>WHAT TO BRING</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12, fontSize: 13 }}>
              {[
                "อุปกรณ์เครื่องเขียน + สมุดจด",
                "Notebook / iPad สำหรับ workshop",
                "ความสงสัย · คำถามที่อยากถามพี่ ๆ",
                "เสื้อกันหนาวเบา ๆ (ห้องแอร์เย็น)",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: 3,
                    border: "1.5px solid #8F0F1B",
                    background: i < 2 ? "#8F0F1B" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {i < 2 && <Icon name="check" size={10} stroke="#f0e8d6" />}
                  </span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wax seal + stamp */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <div style={{ position: "relative", width: 90, height: 90 }}>
              <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                <defs>
                  <radialGradient id="wax" cx="40%" cy="35%">
                    <stop offset="0%" stopColor="#d62e26" />
                    <stop offset="60%" stopColor="#8F0F1B" />
                    <stop offset="100%" stopColor="#4B0700" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="36" fill="url(#wax)" stroke="#4B0700" strokeWidth="1" />
                {/* drips / scalloped edge */}
                {Array.from({ length: 14 }, (_, i) => {
                  const a = (i / 14) * Math.PI * 2;
                  const r = 36 + (i % 2 ? 2 : 4);
                  const x = 50 + Math.cos(a) * r;
                  const y = 50 + Math.sin(a) * r;
                  return <circle key={i} cx={x} cy={y} r="3" fill="#8F0F1B" opacity="0.85" />;
                })}
                <text x="50" y="46" textAnchor="middle" fill="#f0e8d6" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="2">SIMC</text>
                <text x="50" y="60" textAnchor="middle" fill="#f0e8d6" fontFamily="Noto Serif Thai" fontSize="14" fontWeight="600" fontStyle="italic">27</text>
                <line x1="32" y1="68" x2="68" y2="68" stroke="#f0e8d6" strokeWidth="0.6" opacity="0.6" />
              </svg>
            </div>

            <div className="stamp-big" style={{
              transform: "rotate(-8deg)",
              background: "rgba(198,27,16,0.06)",
            }}>SEALED · DELIVER</div>
          </div>

          {/* Postmark */}
          <div style={{
            marginTop: 4, padding: "10px 14px",
            border: "1.5px dashed rgba(42,10,12,0.4)",
            color: "#3a1a1c",
            fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: "0.2em",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "rgba(255,247,226,0.25)",
            transform: "rotate(-1deg)",
          }}>
            <span>POSTED · BANGKOK · 12 SEP 2569</span>
            <span style={{ color: "#8F0F1B" }}>AIR MAIL · ✦</span>
          </div>
        </div>

        {/* Bottom decorative footer of the letter */}
        <div style={{
          gridColumn: "1 / -1",
          marginTop: 12, paddingTop: 18,
          borderTop: "1px solid rgba(42,10,12,0.25)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "var(--f-mono)", fontSize: 10, color: "rgba(42,10,12,0.6)", letterSpacing: "0.25em",
        }}>
          <span>SIMC · BUREAU OF MEDICAL CASES · 27TH EDITION</span>
          <span>FOLD HERE ⌐</span>
          <span>END OF DOCUMENT · 01/01</span>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ file cabinet ───────────────────────────────────────────────
function BoldFaqCabinet() {
  return (
    <div style={{ padding: "60px 56px 60px" }}>
      <div className="kicker" style={{ marginBottom: 12 }}>· Act VIII · FAQ · Filed Questions</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 32 }}>
        <div className="display" style={{ fontSize: 56, lineHeight: 1.0, color: "var(--cream)" }}>
          FAQs
        </div>
        <div className="mono" style={{ color: "var(--ink-mute)" }}>04 OF 04 · DECLASSIFIED</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FileFaq n="01" q="ค่ายจัดที่ไหน?" a="คณะแพทยศาสตร์ศิริราชพยาบาล กรุงเทพฯ — ใกล้สถานี MRT อิสรภาพ และ Wongwian Yai" open />
        <FileFaq n="02" q="ค้างคืนหรือไม่?" a="ไม่บังคับ — แต่ถ้าน้องต้องการค้างคืน จะมีค่าใช้จ่ายเพิ่มเติมเล็กน้อย พักที่ศูนย์ปฏิบัติธรรมศิริราช นครปฐม (รถรับ-ส่ง)" />
        <FileFaq n="03" q="ค่ายใช้เวลากี่วัน?" a="2 วัน 1 คืน · เริ่ม ศุกร์ 30 มกราคม 2570 — สิ้นสุด เสาร์ 31 มกราคม 2570" />
        <FileFaq n="04" q="Pre-camp day จัดเมื่อไหร่?" a="15 พฤศจิกายน 2569 · เข้าร่วมได้ทั้งออนไซต์และออนไลน์ · เปิดให้ผู้สมัครสอบทุกคน" />
      </div>
    </div>
  );
}

function FileFaq({ n, q, a, open: defaultOpen }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className={open ? "glass glass-strong" : "glass"} style={{
      borderRadius: 14, padding: 0, overflow: "hidden", cursor: "pointer",
      transition: "all var(--t-fast)",
    }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 22px" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: open ? "linear-gradient(135deg, var(--gold), #d9b85a)" : "rgba(255,247,226,0.06)",
          color: open ? "#2a0a0c" : "var(--gold)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--f-mono)", fontWeight: 600, fontSize: 13,
          border: "1px solid var(--glass-border)",
        }}>{n}</div>
        <div style={{ flex: 1 }}>
          <div className="mono" style={{ color: "var(--ink-mute)" }}>FILE · {n}/04</div>
          <div className="display" style={{ fontSize: 17, color: "var(--cream)", marginTop: 2 }}>{q}</div>
        </div>
        <span style={{
          width: 28, height: 28, borderRadius: 999, border: "1px solid var(--glass-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 200ms",
          color: "var(--gold)", fontSize: 14,
        }}>+</span>
      </div>
      {open && (
        <div style={{
          padding: "0 22px 18px 76px", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.7,
          borderTop: "1px dashed var(--glass-border)", paddingTop: 14, marginTop: 4,
        }}>{a}</div>
      )}
    </div>
  );
}

// ─── Final CTA ──────────────────────────────────────────────────────
function BoldFinalCta() {
  return (
    <div style={{ padding: "40px 56px 0", position: "relative" }}>
      <div style={{
        borderRadius: 28, overflow: "hidden", position: "relative", padding: "80px 56px",
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(143,15,27,0.45), transparent 65%),
          linear-gradient(135deg, rgba(75,7,0,0.55), rgba(10,3,6,0.55))
        `,
        border: "1px solid var(--glass-border-strong)",
        textAlign: "center",
      }}>
        <Tape text="WILL YOU ACCEPT THE CASE · SIMC27" />
        <div className="kicker" style={{ color: "var(--gold)", marginTop: 38, marginBottom: 18 }}>· FINAL · The Verdict ·</div>
        <div className="display" style={{
          fontSize: 110, lineHeight: 0.95, color: "var(--cream)",
          letterSpacing: "-0.03em", fontWeight: 600,
        }}>
          พร้อมเปิด<br /><em style={{ color: "var(--gold)" }}>คดีหรือยัง?</em>
        </div>
        <div style={{ marginTop: 24, fontSize: 16, color: "var(--ink-mute)", maxWidth: 580, margin: "24px auto 0", lineHeight: 1.7 }}>
          กดปุ่มด้านล่างเพื่อเซ็นชื่อในแฟ้มคดี — เริ่มเส้นทางของน้อง สู่บทบาทนักสืบฝึกหัดของ SIMC 27
        </div>
        <div style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center" }}>
          <button className="btn btn-primary btn-lg">
            <Icon name="fingerprint" size={14} /> เซ็นชื่อ · สมัครเลย
          </button>
          <button className="btn btn-lg">
            <Icon name="arrow-right" size={12} /> ดูข้อมูลเพิ่มเติม
          </button>
        </div>
        <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 16, padding: "10px 18px", borderRadius: 999, border: "1px solid var(--glass-border)", background: "rgba(10,3,6,0.4)" }}>
          <span className="chip-dot" style={{ width: 8, height: 8, borderRadius: 999, background: "var(--primary-2)", boxShadow: "0 0 10px var(--primary-2)", display: "inline-block" }} />
          <span className="mono" style={{ color: "var(--cream)" }}>Phase I open · เหลือเวลา 14 วัน 8 ชั่วโมง</span>
        </div>
      </div>
    </div>
  );
}

// ─── Bold Footer ────────────────────────────────────────────────────
function BoldFooter() {
  return (
    <div style={{ background: "#080204", padding: "64px 56px 0" }}>
      {/* Main footer grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 48, paddingBottom: 56 }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <BrandMark size={32} />
            <div className="display" style={{ fontSize: 22, color: "var(--cream)", letterSpacing: "0.02em" }}>SIMC 27</div>
          </div>
          <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 10, letterSpacing: "0.25em" }}>SIRIRAJ MEDICAL CAMP</div>
          <div style={{ marginTop: 14, fontSize: 12.5, color: "var(--ink-faint)", lineHeight: 1.75, maxWidth: 220 }}>
            ค่ายสานฝันสู่หมอศิริราช จัดโดยนักศึกษาคณะแพทย์ศิริราช มหาวิทยาลัยมหิดล
          </div>
        </div>

        {/* Col 1 */}
        <div>
          <div className="mono" style={{ color: "var(--cream)", letterSpacing: "0.28em", fontSize: 11, marginBottom: 16 }}>ค่าย</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12.5, color: "var(--ink-mute)", letterSpacing: "0.08em" }}>
            <span>เกี่ยวกับ SIMC 27</span>
            <span>กำหนดการค่าย</span>
            <span>Pre-camp Day</span>
            <span>Camp Day</span>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <div className="mono" style={{ color: "var(--cream)", letterSpacing: "0.28em", fontSize: 11, marginBottom: 16 }}>สมัคร</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12.5, color: "var(--ink-mute)", letterSpacing: "0.08em" }}>
            <span>เงื่อนไขการสมัคร</span>
            <span>กรอกใบสมัคร</span>
            <span>ตรวจสอบสถานะ</span>
            <span>ประกาศผล</span>
          </div>
        </div>

        {/* Col 3 */}
        <div>
          <div className="mono" style={{ color: "var(--cream)", letterSpacing: "0.28em", fontSize: 11, marginBottom: 16 }}>ข้อมูล</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12.5, color: "var(--ink-mute)", letterSpacing: "0.08em" }}>
            <span>FAQ</span>
            <span>Souvenir Shop</span>
            <span>Mini Games</span>
            <span>แนะแนวแพทย์</span>
          </div>
        </div>

        {/* Col 4 */}
        <div>
          <div className="mono" style={{ color: "var(--cream)", letterSpacing: "0.28em", fontSize: 11, marginBottom: 16 }}>ติดต่อ</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12.5, color: "var(--ink-mute)", letterSpacing: "0.08em" }}>
            <span>ทีม PR · @simc27</span>
            <span>Email ทีมงาน</span>
            <span>Line Official</span>
            <span>นโยบายส่วนตัว</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,247,226,0.1)" }} />

      {/* Bottom bar — social icons centered */}
      <div style={{ padding: "36px 0 48px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", gap: 14 }}>
          {[
            { l: "IG", icon: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 3.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm5-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" },
            { l: "FB", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
            { l: "TT", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
            { l: "X",  icon: "M4 4l16 16M20 4L4 20" },
            { l: "YT", icon: "M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
          ].map((s, i) => (
            <div key={i} style={{
              width: 40, height: 40, borderRadius: 999,
              border: "1px solid rgba(255,247,226,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all var(--t-fast)",
              background: "transparent",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,247,226,0.08)"; e.currentTarget.style.borderColor = "rgba(255,247,226,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,247,226,0.2)"; }}
            >
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="rgba(255,247,226,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </div>
          ))}
        </div>
        <div className="mono" style={{ color: "var(--ink-faint)", fontSize: 10, letterSpacing: "0.25em" }}>
          © 2569–2570 SIMC 27 · คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล · ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="mono" style={{ color: "var(--gold)", marginBottom: 16, letterSpacing: "0.3em" }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((l, i) => (
          <span key={i} style={{ fontSize: 13, color: "var(--ink-mute)", cursor: "pointer", transition: "color var(--t-fast)" }}
            onMouseEnter={e => e.target.style.color = "var(--cream)"}
            onMouseLeave={e => e.target.style.color = "var(--ink-mute)"}
          >{l}</span>
        ))}
      </div>
    </div>
  );
}

export default HomePageBold;
