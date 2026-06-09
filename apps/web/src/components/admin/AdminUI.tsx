// @ts-nocheck
"use client";
import React, { useState } from 'react';
import { Icon, BrandMark } from '@/components/PrototypeUI';

export function StatCard({ k, v, delta, icon, sparkline = [], positive, bad }) {
  const max = Math.max(...sparkline);
  const min = Math.min(...sparkline);
  const range = max - min || 1;
  const w = 120, h = 36;
  const pts = sparkline.map((s, i) => `${(i / (sparkline.length - 1)) * w},${h - ((s - min) / range) * h}`).join(" ");
  return (
    <div className="glass" style={{ padding: 20, borderRadius: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div>
          <div className="mono" style={{ color: "var(--ink-mute)" }}>{k}</div>
          <div className="display" style={{ fontSize: 32, color: "var(--cream)", marginTop: 6, letterSpacing: "-0.01em" }}>{v}</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: "rgba(255,236,155,0.12)",
          border: "1px solid rgba(255,236,155,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)",
        }}>
          <Icon name={icon} size={18} />
        </div>
      </div>
      <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div style={{ fontSize: 11.5, color: bad ? "#ff7783" : positive ? "#9fd1d3" : "var(--ink-mute)" }}>{delta}</div>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
          <polyline points={pts} fill="none" stroke={bad ? "#ff7783" : "var(--gold)"} strokeWidth="1.5" />
          <polyline points={`0,${h} ${pts} ${w},${h}`} fill={bad ? "rgba(255,119,131,0.12)" : "rgba(255,236,155,0.12)"} stroke="none" />
        </svg>
      </div>
    </div>
  );
}

export function BarChart() {
  // distribution bars
  const data = [4, 12, 28, 48, 96, 168, 260, 332, 218, 81];
  const max = Math.max(...data);
  return (
    <div style={{ marginTop: 16, display: "flex", alignItems: "end", gap: 8, height: 180 }}>
      {data.map((d, i) => {
        const isAvg = i === 7;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 10, color: "var(--ink-mute)", fontFamily: "var(--f-mono)" }}>{d}</div>
            <div style={{
              width: "100%",
              height: `${(d / max) * 140}px`,
              borderRadius: 6,
              background: isAvg ? "linear-gradient(180deg, var(--gold), #d9b85a)" : "linear-gradient(180deg, rgba(53,107,109,0.7), rgba(53,107,109,0.3))",
              border: "1px solid rgba(255,247,226,0.1)",
              boxShadow: isAvg ? "0 0 16px rgba(255,236,155,0.35)" : undefined,
            }} />
          </div>
        );
      })}
    </div>
  );
}

export function ScoreBar({ score }) {
  const c = score >= 85 ? "var(--gold)" : score >= 70 ? "#9fd1d3" : "#ff9f9f";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
      <span className="display" style={{ fontSize: 14, color: c, minWidth: 28 }}>{score}</span>
      <div style={{ width: 60, height: 4, background: "rgba(255,247,226,0.08)", borderRadius: 999 }}>
        <div style={{ width: `${score}%`, height: "100%", background: c, borderRadius: 999 }} />
      </div>
    </div>
  );
}

export function StatusPill({ status }) {
  const map = {
    Reviewed: { c: "chip-teal", dot: true },
    Pending: { c: "chip", dot: true },
    Flagged: { c: "chip-red", dot: true },
  };
  const m = map[status] || {};
  return <span className={`chip ${m.c || ""}`}>{m.dot && <span className="chip-dot" />}{status}</span>;
}

export function TierPill({ tier }) {
  const c = tier === "A" ? "var(--gold)" : tier === "B" ? "#9fd1d3" : "#ff9f9f";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 26, height: 26, borderRadius: 8,
      background: `${c}22`,
      border: `1px solid ${c}55`,
      color: c, fontFamily: "var(--f-mono)", fontSize: 12, fontWeight: 600,
    }}>{tier}</span>
  );
}

export function QueueRow({ id, name, mcq, essay, total, status, color }) {
  const active = status === "active";
  const done = status === "done";
  return (
    <div style={{
      padding: "14px 18px",
      borderBottom: "1px solid var(--glass-border)",
      background: active ? "var(--glass-fill-strong)" : "transparent",
      borderLeft: active ? "3px solid var(--gold)" : "3px solid transparent",
      cursor: "pointer",
      opacity: done ? 0.55 : 1,
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: `linear-gradient(135deg, ${color}, ${color}66)`,
          border: "1.5px solid var(--glass-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--cream)", fontSize: 13, fontFamily: "var(--f-display)", fontWeight: 600,
        }}>{name[0]}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span className="mono" style={{ color: "var(--gold)", fontSize: 10 }}>{id}</span>
            {done && <Icon name="check" size={12} stroke="#9fd1d3" />}
            {active && <span className="chip-dot" style={{ width: 7, height: 7, borderRadius: 999, background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />}
          </div>
          <div style={{ fontSize: 13, color: "var(--cream)", marginTop: 2 }}>{name}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 6, fontSize: 10 }}>
            <span style={{ padding: "1px 6px", borderRadius: 6, background: "rgba(53,107,109,0.3)", border: "1px solid rgba(53,107,109,0.5)", color: "#9fd1d3", fontFamily: "var(--f-mono)" }}>MCQ {mcq}</span>
            <span style={{
              padding: "1px 6px", borderRadius: 6,
              background: essay === "graded" ? "rgba(53,107,109,0.3)" : essay === "in-review" ? "rgba(255,236,155,0.18)" : "rgba(198,27,16,0.18)",
              border: "1px solid " + (essay === "graded" ? "rgba(53,107,109,0.5)" : essay === "in-review" ? "rgba(255,236,155,0.4)" : "rgba(198,27,16,0.4)"),
              color: essay === "graded" ? "#9fd1d3" : essay === "in-review" ? "var(--gold)" : "#ff9f9f",
              fontFamily: "var(--f-mono)",
            }}>Essay · {essay === "graded" ? "✓" : essay === "in-review" ? "…" : "?"}</span>
            {total && <span style={{ marginLeft: "auto", color: "var(--gold)", fontFamily: "var(--f-mono)", fontWeight: 600 }}>{total}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScoreCell({ k, v, max, hint, c, pending }) {
  return (
    <div style={{ paddingLeft: 16, borderLeft: "1px solid var(--glass-border)" }}>
      <div className="mono" style={{ color: "var(--ink-mute)" }}>{k}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
        <span className="display" style={{ fontSize: 26, color: c, letterSpacing: "-0.01em" }}>{v}</span>
        {max && <span style={{ fontSize: 12, color: "var(--ink-faint)", fontFamily: "var(--f-mono)" }}>/ {max}</span>}
      </div>
      <div className="mono" style={{ color: pending ? "var(--ink-faint)" : "var(--ink-mute)", marginTop: 2, fontStyle: pending ? "italic" : "normal" }}>{hint}</div>
    </div>
  );
}

export function EssaySection({ n, status, question, answer, max, score, feedback, rubric, rubricBlank, graderName, focus }) {
  const isGraded = status === "graded";
  return (
    <div className={focus ? "glass glass-strong" : "glass"} style={{
      padding: 24, borderRadius: 22,
      border: focus ? "1px solid rgba(255,236,155,0.4)" : undefined,
      boxShadow: focus ? "0 0 0 1px rgba(255,236,155,0.2), 0 0 30px rgba(255,236,155,0.08)" : undefined,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div style={{ flex: 1 }}>
          <div className="kicker" style={{ color: isGraded ? "var(--ink-mute)" : "var(--gold)" }}>
            · Section B · Essay {n} {isGraded ? "(Graded · Manual)" : "(Needs grading · Manual)"}
          </div>
          <div className="display" style={{ fontSize: 18, color: "var(--cream)", marginTop: 8, lineHeight: 1.5, maxWidth: 720 }}>
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>“</em>{question}<em style={{ color: "var(--gold)", fontStyle: "italic" }}>”</em>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isGraded ? (
            <span className="chip chip-teal"><Icon name="check" size={11} /> Graded by {graderName}</span>
          ) : (
            <span className="chip" style={{ background: "rgba(255,236,155,0.18)", borderColor: "rgba(255,236,155,0.4)", color: "var(--gold)" }}>
              <span className="chip-dot" style={{ background: "var(--gold)", boxShadow: "0 0 6px var(--gold)" }} /> NEEDS GRADING
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 22 }}>
        {/* Answer */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div className="mono" style={{ color: "var(--ink-mute)" }}>คำตอบของผู้สมัคร · {answer.split(/\s+/).length} คำ</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn-sm" style={{ padding: "3px 8px", fontSize: 10 }}>highlight</button>
              <button className="btn btn-sm" style={{ padding: "3px 8px", fontSize: 10 }}>comment</button>
            </div>
          </div>
          <div style={{
            padding: 18, borderRadius: 14,
            background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)",
            fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.85,
            fontFamily: "var(--f-display)",
            whiteSpace: "pre-wrap",
            maxHeight: 380, overflow: "auto",
          }} className="scroll-y">
            {answer.split("\n").map((p, i) => <p key={i} style={{ margin: i === 0 ? "0 0 12px" : "12px 0" }}>{p}</p>)}
          </div>
        </div>

        {/* Rubric */}
        <div>
          <div className="mono" style={{ color: "var(--ink-mute)", marginBottom: 8 }}>เกณฑ์การให้คะแนน</div>
          <div style={{
            padding: 18, borderRadius: 14,
            background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            {isGraded
              ? rubric.map(([k, v, m], i) => <RubricRow key={i} label={k} value={v} max={m} />)
              : rubricBlank.map(([k, m], i) => <RubricRow key={i} label={k} value={null} max={m} highlight={i === 0} />)
            }
            <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div className="mono" style={{ color: "var(--gold)" }}>รวม</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span className="display" style={{ fontSize: 28, color: isGraded ? "var(--gold)" : "var(--ink-faint)" }}>{isGraded ? score : "—"}</span>
                <span style={{ fontSize: 12, color: "var(--ink-mute)", fontFamily: "var(--f-mono)" }}>/ {max}</span>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div style={{ marginTop: 12 }}>
            <div className="mono" style={{ color: "var(--ink-mute)", marginBottom: 6 }}>คอมเมนต์ถึงผู้สมัคร</div>
            {isGraded ? (
              <div style={{
                padding: "12px 14px", borderRadius: 12,
                background: "rgba(53,107,109,0.15)", border: "1px solid rgba(53,107,109,0.3)",
                fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.6,
              }}>{feedback}</div>
            ) : (
              <textarea rows={3} placeholder="เขียนคำแนะนำสั้นๆ ที่ผู้สมัครจะเห็นพร้อมคะแนน..." style={{
                width: "100%", padding: 12, borderRadius: 12,
                background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)",
                color: "var(--cream)", fontFamily: "var(--f-body)", fontSize: 12.5, lineHeight: 1.5, resize: "none", outline: "none",
              }} defaultValue=""></textarea>
            )}

            {!isGraded && (
              <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn btn-sm" style={{ padding: "5px 10px" }}>Flag เพื่อตรวจซ้ำ</button>
                  <button className="btn btn-sm" style={{ padding: "5px 10px" }}>ใช้ template</button>
                </div>
                <button className="btn btn-primary btn-sm">บันทึก Essay {n} <Icon name="check" size={11} /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RubricRow({ label, value, max, highlight }) {
  return (
    <div style={{
      padding: highlight ? 10 : 0,
      borderRadius: 8,
      background: highlight ? "rgba(255,236,155,0.08)" : "transparent",
      border: highlight ? "1px dashed rgba(255,236,155,0.3)" : undefined,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{label}</span>
        <span style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          {value != null ? (
            <span className="display" style={{ fontSize: 16, color: "var(--gold)" }}>{value}</span>
          ) : (
            <span className="display" style={{ fontSize: 16, color: "var(--ink-faint)", fontStyle: "italic" }}>—</span>
          )}
          <span className="mono" style={{ color: "var(--ink-mute)" }}>/ {max}</span>
        </span>
      </div>
      {/* Score buttons */}
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <span key={n} style={{
            flex: 1, height: 22, borderRadius: 5, cursor: "pointer",
            background: value && n <= value ? "linear-gradient(180deg, var(--gold), #d9b85a)" : "rgba(255,247,226,0.06)",
            border: "1px solid " + (value && n <= value ? "rgba(255,236,155,0.5)" : "var(--glass-border)"),
            color: value && n <= value ? "#2a0a0c" : "var(--ink-mute)",
            fontSize: 9, fontFamily: "var(--f-mono)", fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{n}</span>
        ))}
      </div>
    </div>
  );
}

export function ToggleRow({ label, subtitle, on }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <span style={{
        width: 32, height: 18, borderRadius: 999, flexShrink: 0,
        background: on ? "var(--gold)" : "rgba(255,247,226,0.1)",
        position: "relative", transition: "background var(--t-fast)",
      }}>
        <span style={{
          position: "absolute", top: 2, left: on ? 16 : 2,
          width: 14, height: 14, borderRadius: 999, background: on ? "#2a0a0c" : "var(--cream)",
        }} />
      </span>
      <div>
        <div style={{ fontSize: 12.5, color: "var(--cream)" }}>{label}</div>
        {subtitle && <div style={{ fontSize: 10, color: "var(--ink-mute)" }}>{subtitle}</div>}
      </div>
    </label>
  );
}

export function MiniStat({ n, l }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 18, color: "var(--cream)" }}>{n}</div>
      <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 9 }}>{l}</div>
    </div>
  );
}

export function TicketRow({ id, title, user, category, priority, status, time, unread, msgs, active }) {
  const priColor = priority === "critical" ? "#ff7783" : priority === "high" ? "var(--gold)" : priority === "medium" ? "#9fd1d3" : "var(--ink-faint)";
  const statColor = status === "Open" ? "#ff7783" : status === "Pending" ? "var(--gold)" : status === "Resolved" ? "#9fd1d3" : "var(--ink-faint)";
  return (
    <div style={{
      padding: "16px 22px",
      borderBottom: "1px solid var(--glass-border)",
      background: active ? "var(--glass-fill-strong)" : "transparent",
      borderLeft: active ? "3px solid var(--gold)" : "3px solid transparent",
      cursor: "pointer",
      position: "relative",
    }}>
      <div style={{ display: "flex", alignItems: "start", gap: 10 }}>
        {/* Priority indicator */}
        <span style={{
          marginTop: 6, width: 8, height: 8, borderRadius: 999, background: priColor,
          boxShadow: `0 0 8px ${priColor}`, flexShrink: 0,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <span className="mono" style={{ color: "var(--gold)", fontSize: 10 }}>{id}</span>
            <span style={{ fontSize: 10, color: "var(--ink-mute)", fontFamily: "var(--f-mono)" }}>{time}</span>
          </div>
          <div className="display" style={{ fontSize: 14, color: unread ? "var(--cream)" : "var(--ink-2)", marginTop: 4, fontWeight: unread ? 600 : 400, lineHeight: 1.35 }}>{title}</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-mute)", marginTop: 4 }}>{user}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <span className="chip" style={{ fontSize: 9, padding: "2px 8px" }}>{category}</span>
            <span style={{
              padding: "2px 8px", borderRadius: 999, fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.12em",
              color: statColor, background: `${statColor}22`, border: `1px solid ${statColor}55`,
              display: "inline-flex", alignItems: "center", gap: 4,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: statColor }} /> {status.toUpperCase()}
            </span>
            {msgs && (
              <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--ink-mute)", display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="feather" size={11} /> {msgs}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TicketDetail() {
  return (
    <>
      {/* Header */}
      <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--glass-border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="mono" style={{ color: "var(--gold)" }}>PROB-0141</span>
              <span className="chip" style={{ fontSize: 10 }}>Exam</span>
              <span style={{
                padding: "3px 10px", borderRadius: 999, fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.15em",
                color: "#ff7783", background: "rgba(198,27,16,0.18)", border: "1px solid rgba(198,27,16,0.5)",
                display: "inline-flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "#ff7783", animation: "pulse-glow 1.4s infinite" }} /> OPEN
              </span>
              <span className="chip chip-red" style={{ fontSize: 10 }}><span className="chip-dot" /> CRITICAL</span>
            </div>
            <div className="display" style={{ fontSize: 22, color: "var(--cream)", marginTop: 8, lineHeight: 1.3 }}>
              ระบบสอบค้าง · ไม่นับเวลาให้
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, fontSize: 12, color: "var(--ink-mute)" }}>
              <span>เปิดเมื่อ <span style={{ color: "var(--ink-2)" }}>28 นาทีที่แล้ว</span></span>
              <span>·</span>
              <span>โดย <span style={{ color: "var(--ink-2)" }}>ปฤษฐา (SIMC-0029)</span></span>
              <span>·</span>
              <span>มอบหมายให้ <span style={{ color: "var(--gold)" }}>พี่ส้ม</span></span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-sm">เปลี่ยนสถานะ</button>
            <button className="btn btn-sm">มอบหมาย</button>
            <button className="btn btn-sm" style={{ padding: "8px 10px" }}>⋯</button>
          </div>
        </div>

        {/* Status / Priority controls */}
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          <DetailField k="Status" v="Open" tone="red" />
          <DetailField k="Priority" v="Critical" tone="red" />
          <DetailField k="Category" v="Exam · Technical" />
          <DetailField k="Reporter" v="ปฤษฐา · ม.6" />
        </div>
      </div>

      {/* Thread + composer */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 0 }}>
        {/* Chat placeholder */}
        <div style={{ padding: 24, overflow: "auto", borderRight: "1px solid var(--glass-border)", display: "flex", flexDirection: "column", gap: 14 }} className="scroll-y">
          <div className="mono" style={{ color: "var(--ink-mute)" }}>Conversation thread</div>
          <div className="placeholder-img" style={{
            flex: 1, minHeight: 460, borderRadius: 16,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
            background: `
              repeating-linear-gradient(135deg, rgba(255,247,226,0.04) 0 14px, rgba(255,247,226,0.02) 14px 28px),
              rgba(10,3,6,0.4)
            `,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: "rgba(255,236,155,0.08)",
              border: "1px dashed rgba(255,236,155,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--gold)",
            }}>
              <Icon name="sound" size={28} />
            </div>
            <div style={{ textAlign: "center", maxWidth: 320 }}>
              <div className="display" style={{ fontSize: 16, color: "var(--cream)" }}>Chatbox Component</div>
              <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 6, lineHeight: 1.6 }}>
                ใส่หน้า conversation thread ของ ticket นี้ตรงนี้<br />
                · message list · attachments · reply composer
              </div>
            </div>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", letterSpacing: "0.2em" }}>
              [ COMPONENT · drop chatbox UI here ]
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14, overflow: "auto" }} className="scroll-y">
          <div>
            <div className="mono" style={{ color: "var(--ink-mute)", marginBottom: 10 }}>Properties</div>
            <PropRow k="Status" v={<span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#ff7783" }}><span style={{ width: 6, height: 6, borderRadius: 999, background: "#ff7783" }} />Open</span>} />
            <PropRow k="Priority" v={<span style={{ color: "#ff7783" }}>● Critical</span>} />
            <PropRow k="Category" v="Exam · Technical" />
            <PropRow k="Assignee" v={<span style={{ color: "var(--gold)" }}>พี่ส้ม</span>} />
            <PropRow k="Reporter" v="ปฤษฐา · SIMC-0029" />
            <PropRow k="Created" v="14:32, 17 ต.ค." />
            <PropRow k="Updated" v="14:50, 17 ต.ค." />
          </div>

          <div>
            <div className="mono" style={{ color: "var(--ink-mute)", marginBottom: 10 }}>Labels</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["exam-timer","session-bug","needs-dev","reproducible"].map((t, i) => (
                <span key={i} className="chip" style={{ fontSize: 10 }}>{t}</span>
              ))}
              <span style={{ padding: "4px 8px", borderRadius: 999, fontSize: 10, color: "var(--ink-mute)", cursor: "pointer", border: "1px dashed var(--glass-border)" }}>+ add</span>
            </div>
          </div>

          <div>
            <div className="mono" style={{ color: "var(--ink-mute)", marginBottom: 10 }}>Linked tickets</div>
            <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)" }}>
              <div className="mono" style={{ color: "var(--gold)" }}>PROB-0138</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-2)", marginTop: 4 }}>คะแนนไม่อัปเดตในหน้า dashboard</div>
              <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--ink-mute)" }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--gold)" }} /> Pending
              </div>
            </div>
          </div>

          <div>
            <div className="mono" style={{ color: "var(--ink-mute)", marginBottom: 10 }}>Activity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 11, color: "var(--ink-mute)" }}>
              <div>· พี่ส้ม รับเรื่อง · 20 นาทีที่แล้ว</div>
              <div>· เพิ่ม label exam-timer · 19 นาทีที่แล้ว</div>
              <div>· เปลี่ยน priority → critical · 18 นาทีที่แล้ว</div>
              <div>· พี่เกม แสดงความเห็น · 12 นาทีที่แล้ว</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DetailField({ k, v, tone }) {
  const color = tone === "red" ? "#ff7783" : "var(--cream)";
  return (
    <div style={{ padding: "10px 14px", borderRadius: 12, background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)" }}>
      <div className="mono" style={{ color: "var(--ink-mute)" }}>{k}</div>
      <div style={{ fontSize: 13, color, marginTop: 4, fontFamily: "var(--f-display)", fontWeight: 500 }}>{v}</div>
    </div>
  );
}

export function PropRow({ k, v }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 12, borderBottom: "1px dashed var(--glass-border)" }}>
      <span style={{ color: "var(--ink-mute)" }}>{k}</span>
      <span style={{ color: "var(--ink-2)" }}>{v}</span>
    </div>
  );
}

export function Message({ who, time, color, body, me, system, attachment }) {
  if (system) {
    return (
      <div style={{
        padding: "10px 14px", borderRadius: 10,
        background: "rgba(255,247,226,0.04)",
        border: "1px dashed var(--glass-border)",
        fontSize: 11.5, color: "var(--ink-mute)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <Icon name="spark" size={12} stroke="var(--ink-mute)" />
        <span style={{ flex: 1 }}>{body}</span>
        <span className="mono" style={{ fontSize: 10 }}>{time}</span>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: me ? "row-reverse" : "row" }}>
      <div style={{
        width: 36, height: 36, borderRadius: 999, flexShrink: 0,
        background: `linear-gradient(135deg, ${color}, ${color}66)`,
        border: "1.5px solid var(--glass-border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--cream)", fontSize: 13, fontFamily: "var(--f-display)", fontWeight: 600,
      }}>{who.split(" ")[0][0]}</div>
      <div style={{ flex: 1, maxWidth: "80%", textAlign: me ? "right" : "left" }}>
        <div style={{ display: "flex", justifyContent: me ? "flex-end" : "space-between", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: "var(--cream)", fontWeight: 500 }}>{who}</span>
          <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 10 }}>{time}</span>
        </div>
        <div style={{
          display: "inline-block",
          padding: "12px 16px", borderRadius: 14,
          background: me ? "rgba(143,15,27,0.25)" : "var(--glass-fill)",
          border: "1px solid " + (me ? "rgba(143,15,27,0.5)" : "var(--glass-border)"),
          fontSize: 13, color: "var(--cream)", lineHeight: 1.6,
          textAlign: "left",
        }}>
          {body}
          {attachment && (
            <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="feather" size={12} stroke="var(--gold)" />
              <span style={{ fontSize: 11.5, color: "var(--gold)" }}>{attachment}</span>
              <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--ink-mute)", fontFamily: "var(--f-mono)" }}>1.2 MB</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FilterGroup({ label, children }) {
  return (
    <div>
      <div className="mono" style={{ color: "var(--ink-mute)", marginBottom: 10 }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {children}
      </div>
    </div>
  );
}

export function FilterChip({ label, count, active, dot }) {
  const dotColor = dot === "teal" ? "#9fd1d3" : dot === "gold" ? "var(--gold)" : dot === "red" ? "#ff7783" : undefined;
  return (
    <div style={{
      padding: "8px 12px", borderRadius: 10, cursor: "pointer",
      background: active ? "rgba(198,27,16,0.18)" : "var(--glass-fill)",
      border: "1px solid " + (active ? "rgba(198,27,16,0.5)" : "var(--glass-border)"),
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontSize: 12.5, color: active ? "var(--cream)" : "var(--ink-2)",
    }}>
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {dotColor && <span style={{ width: 7, height: 7, borderRadius: 999, background: dotColor, boxShadow: `0 0 6px ${dotColor}` }} />}
        {label}
      </span>
      <span className="mono" style={{ color: "var(--ink-mute)" }}>{count}</span>
    </div>
  );
}

export function ApplicantCard({ id, name, nick, school, level, region, score, status, tier, gender, color, selected }) {
  const initials = name.split(" ").map(s => s[0]).slice(0, 2).join("");
  const scoreColor = score >= 85 ? "var(--gold)" : score >= 70 ? "#9fd1d3" : "#ff9f9f";
  return (
    <div className={selected ? "glass glass-strong" : "glass"} style={{
      padding: 0, borderRadius: 18, position: "relative", overflow: "hidden",
      border: selected ? "1px solid rgba(255,236,155,0.5)" : undefined,
      boxShadow: selected ? "0 0 0 1px rgba(255,236,155,0.2)" : undefined,
      cursor: "pointer",
    }}>
      {/* Selection checkbox */}
      <span style={{
        position: "absolute", top: 12, right: 12, zIndex: 2,
        width: 22, height: 22, borderRadius: 6,
        background: selected ? "var(--gold)" : "rgba(10,3,6,0.5)",
        border: "1.5px solid " + (selected ? "var(--gold)" : "var(--glass-border)"),
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {selected && <Icon name="check" size={12} stroke="#2a0a0c" />}
      </span>

      {/* Top banner with avatar */}
      <div style={{
        height: 72, position: "relative",
        background: `linear-gradient(135deg, ${color}cc, ${color}33)`,
        borderBottom: "1px solid var(--glass-border)",
      }}>
        <div style={{
          position: "absolute", left: 18, bottom: -22,
          width: 50, height: 50, borderRadius: 999,
          background: `linear-gradient(135deg, ${color}, ${color}aa)`,
          border: "2px solid var(--bg-1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--cream)", fontSize: 18, fontFamily: "var(--f-display)", fontWeight: 600,
        }}>{initials}</div>

        {/* Score chip */}
        <div style={{
          position: "absolute", right: 50, top: 12,
          padding: "4px 10px", borderRadius: 999,
          background: "rgba(10,3,6,0.6)",
          border: `1px solid ${scoreColor}55`,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 9 }}>SCORE</span>
          <span className="display" style={{ fontSize: 16, color: scoreColor, letterSpacing: "-0.01em" }}>{score}</span>
        </div>
      </div>

      <div style={{ padding: "30px 18px 18px" }}>
        <div className="mono" style={{ color: "var(--gold)" }}>{id}</div>
        <div className="display" style={{ fontSize: 16, color: "var(--cream)", marginTop: 4 }}>{name}</div>
        <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 2 }}>ชื่อเล่น <span style={{ color: "var(--ink-2)" }}>{nick}</span></div>

        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px dashed var(--glass-border)", display: "flex", flexDirection: "column", gap: 6 }}>
          <Row icon="pin" v={`${school} · ${level}`} />
          <Row icon="users" v={region} />
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6 }}>
            <StatusPill status={status} />
            <TierPill tier={tier} />
          </div>
          <button className="btn btn-sm" style={{ padding: "5px 10px" }}>เปิด <Icon name="arrow-right" size={10} /></button>
        </div>
      </div>
    </div>
  );
}

export function Row({ icon, v }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "var(--ink-2)" }}>
      <Icon name={icon} size={12} stroke="var(--ink-mute)" />
      <span>{v}</span>
    </div>
  );
}

export function FormCard({ title, subtitle, badge, tone, children }) {
  const badgeColor = tone === "red" ? "#ff7783" : tone === "gold" ? "var(--gold)" : "var(--ink-mute)";
  const badgeBg = tone === "red" ? "rgba(198,27,16,0.18)" : tone === "gold" ? "rgba(255,236,155,0.14)" : "rgba(255,247,226,0.08)";
  return (
    <div className="glass" style={{ padding: 22, borderRadius: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
        <div>
          <div className="display" style={{ fontSize: 17, color: "var(--cream)" }}>{title}</div>
          <div className="mono" style={{ color: "var(--ink-mute)", marginTop: 3 }}>{subtitle}</div>
        </div>
        <span style={{
          padding: "4px 10px", borderRadius: 999, fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.2em",
          color: badgeColor, background: badgeBg, border: `1px solid ${badgeColor}33`,
        }}>{badge}</span>
      </div>
      {children}
    </div>
  );
}

export function EditField({ label, value, type, options = [], full, mono, icon, verified, hint }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div className="label-thin" style={{ margin: 0 }}>{label}</div>
        {verified && <span className="chip chip-teal" style={{ padding: "2px 8px", fontSize: 9 }}><Icon name="check" size={9} /> verified</span>}
      </div>
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-mute)", pointerEvents: "none" }}>
            <Icon name={icon} size={14} />
          </span>
        )}
        {type === "select" ? (
          <select className="input" defaultValue={value} style={{
            paddingLeft: icon ? 36 : 14,
            fontFamily: mono ? "var(--f-mono)" : "var(--f-body)",
          }}>
            {options.map((o, i) => <option key={i} style={{ background: "#1a0608" }}>{o}</option>)}
          </select>
        ) : (
          <input className="input" defaultValue={value} style={{
            paddingLeft: icon ? 36 : 14,
            fontFamily: mono ? "var(--f-mono)" : "var(--f-body)",
            letterSpacing: mono ? "0.04em" : undefined,
          }} />
        )}
      </div>
      {hint && <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 9, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}



export function viewToggleStyle(active) {
  return {
    padding: "6px 12px",
    borderRadius: 999,
    border: "none",
    background: active ? "var(--glass-fill-strong)" : "transparent",
    color: active ? "var(--cream)" : "var(--ink-mute)",
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  };
}