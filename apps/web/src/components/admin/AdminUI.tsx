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
    <div className="glass p-5 rounded-2xl">
      <div className="flex justify-between items-start">
        <div>
          <div className="mono text-simc-ink-mute">{k}</div>
          <div className="display text-3xl text-simc-cream mt-1.5 tracking-[-0.01em]">{v}</div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-[rgba(255,236,155,0.12)] border border-[rgba(255,236,155,0.25)] flex items-center justify-center text-simc-gold">
          <Icon name={icon} size={18} />
        </div>
      </div>
      <div className="mt-1.5 flex justify-between items-end">
        <div className={`text-[11.5px] ${bad ? "text-[#ff7783]" : positive ? "text-[#9fd1d3]" : "text-simc-ink-mute"}`}>{delta}</div>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
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
    <div className="mt-4 flex items-end gap-2 h-[180px]">
      {data.map((d, i) => {
        const isAvg = i === 7;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="text-[10px] text-simc-ink-mute font-mono">{d}</div>
            <div className={`
              w-full rounded-md border border-[rgba(255,247,226,0.1)]
              ${isAvg ? "bg-gradient-to-b from-simc-gold to-[#d9b85a] shadow-[0_0_16px_rgba(255,236,155,0.35)]" : "bg-gradient-to-b from-[rgba(53,107,109,0.7)] to-[rgba(53,107,109,0.3)]"}
            `} style={{ height: `${(d / max) * 140}px` }} />
          </div>
        );
      })}
    </div>
  );
}

export function ScoreBar({ score }) {
  const c = score >= 85 ? "var(--gold)" : score >= 70 ? "#9fd1d3" : "#ff9f9f";
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="display text-sm min-w-[28px]" style={{ color: c }}>{score}</span>
      <div className="w-[60px] h-1 bg-[rgba(255,247,226,0.08)] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: c }} />
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
    <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-lg font-mono text-xs font-semibold" style={{
      background: `${c}22`,
      border: `1px solid ${c}55`,
      color: c,
    }}>{tier}</span>
  );
}

export function QueueRow({ id, name, mcq, essay, total, status, color }) {
  const active = status === "active";
  const done = status === "done";
  return (
    <div className={`
      py-3.5 px-4.5 border-b border-simc-glass-border cursor-pointer
      ${active ? "bg-simc-glass-fill-strong border-l-[3px] border-l-simc-gold" : "bg-transparent border-l-[3px] border-l-transparent"}
      ${done ? "opacity-[0.55]" : "opacity-100"}
    `}>
      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 rounded-full border-[1.5px] border-simc-glass-border flex items-center justify-center text-simc-cream text-[13px] font-display font-semibold" style={{ background: `linear-gradient(135deg, ${color}, ${color}66)` }}>{name[0]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-2">
            <span className="mono text-simc-gold text-[10px]">{id}</span>
            {done && <Icon name="check" size={12} stroke="#9fd1d3" />}
            {active && <span className="chip-dot w-[7px] h-[7px] rounded-full bg-simc-gold shadow-[0_0_8px_var(--gold)]" />}
          </div>
          <div className="text-[13px] text-simc-cream mt-0.5">{name}</div>
          <div className="flex gap-1.5 mt-1.5 text-[10px]">
            <span className="py-[1px] px-1.5 rounded-md bg-[rgba(53,107,109,0.3)] border border-[rgba(53,107,109,0.5)] text-[#9fd1d3] font-mono">MCQ {mcq}</span>
            <span className={`py-[1px] px-1.5 rounded-md border font-mono
              ${essay === "graded" ? "bg-[rgba(53,107,109,0.3)] border-[rgba(53,107,109,0.5)] text-[#9fd1d3]" : essay === "in-review" ? "bg-[rgba(255,236,155,0.18)] border-[rgba(255,236,155,0.4)] text-simc-gold" : "bg-[rgba(198,27,16,0.18)] border-[rgba(198,27,16,0.4)] text-[#ff9f9f]"}
            `}>Essay · {essay === "graded" ? "✓" : essay === "in-review" ? "…" : "?"}</span>
            {total && <span className="ml-auto text-simc-gold font-mono font-semibold">{total}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScoreCell({ k, v, max, hint, c, pending }) {
  return (
    <div className="pl-4 border-l border-simc-glass-border">
      <div className="mono text-simc-ink-mute">{k}</div>
      <div className="flex items-baseline gap-1.5 mt-1">
        <span className="display text-[26px] tracking-[-0.01em]" style={{ color: c }}>{v}</span>
        {max && <span className="text-xs text-simc-ink-faint font-mono">/ {max}</span>}
      </div>
      <div className={`mono mt-0.5 ${pending ? "text-simc-ink-faint italic" : "text-simc-ink-mute not-italic"}`}>{hint}</div>
    </div>
  );
}

export function EssaySection({ n, status, question, answer, max, score, feedback, rubric, rubricBlank, graderName, focus }) {
  const isGraded = status === "graded";
  return (
    <div className={`glass p-6 rounded-[22px] ${focus ? "glass-strong border border-[rgba(255,236,155,0.4)] shadow-[0_0_0_1px_rgba(255,236,155,0.2),_0_0_30px_rgba(255,236,155,0.08)]" : ""}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className={`kicker ${isGraded ? "text-simc-ink-mute" : "text-simc-gold"}`}>
            · Section B · Essay {n} {isGraded ? "(Graded · Manual)" : "(Needs grading · Manual)"}
          </div>
          <div className="display text-lg text-simc-cream mt-2 leading-[1.5] max-w-[720px]">
            <em className="text-simc-gold italic">“</em>{question}<em className="text-simc-gold italic">”</em>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {isGraded ? (
            <span className="chip chip-teal"><Icon name="check" size={11} /> Graded by {graderName}</span>
          ) : (
            <span className="chip bg-[rgba(255,236,155,0.18)] border-[rgba(255,236,155,0.4)] text-simc-gold">
              <span className="chip-dot bg-simc-gold shadow-[0_0_6px_var(--gold)]" /> NEEDS GRADING
            </span>
          )}
        </div>
      </div>

      <div className="mt-4.5 grid grid-cols-[1.5fr_1fr] gap-5.5">
        {/* Answer */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="mono text-simc-ink-mute">คำตอบของผู้สมัคร · {answer.split(/\s+/).length} คำ</div>
            <div className="flex gap-1.5">
              <button className="btn btn-sm py-[3px] px-2 text-[10px]">highlight</button>
              <button className="btn btn-sm py-[3px] px-2 text-[10px]">comment</button>
            </div>
          </div>
          <div className="p-4.5 rounded-2xl bg-[rgba(10,3,6,0.4)] border border-simc-glass-border text-[13.5px] text-simc-ink-2 leading-[1.85] font-display whitespace-pre-wrap max-h-[380px] overflow-auto scroll-y">
            {answer.split("\n").map((p, i) => <p key={i} className={i === 0 ? "mb-3 mt-0" : "my-3"}>{p}</p>)}
          </div>
        </div>

        {/* Rubric */}
        <div>
          <div className="mono text-simc-ink-mute mb-2">เกณฑ์การให้คะแนน</div>
          <div className="p-4.5 rounded-[14px] bg-[rgba(10,3,6,0.4)] border border-simc-glass-border flex flex-col gap-3.5">
            {isGraded
              ? rubric.map(([k, v, m], i) => <RubricRow key={i} label={k} value={v} max={m} />)
              : rubricBlank.map(([k, m], i) => <RubricRow key={i} label={k} value={null} max={m} highlight={i === 0} />)
            }
            <div className="border-t border-simc-glass-border pt-3 flex justify-between items-baseline">
              <div className="mono text-simc-gold">รวม</div>
              <div className="flex items-baseline gap-1.5">
                <span className={`display text-2xl ${isGraded ? "text-simc-gold" : "text-simc-ink-faint"}`}>{isGraded ? score : "—"}</span>
                <span className="text-xs text-simc-ink-mute font-mono">/ {max}</span>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="mt-3">
            <div className="mono text-simc-ink-mute mb-1.5">คอมเมนต์ถึงผู้สมัคร</div>
            {isGraded ? (
              <div className="py-3 px-3.5 rounded-xl bg-[rgba(53,107,109,0.15)] border border-[rgba(53,107,109,0.3)] text-[12.5px] text-simc-ink-2 leading-[1.6]">{feedback}</div>
            ) : (
              <textarea rows={3} placeholder="เขียนคำแนะนำสั้นๆ ที่ผู้สมัครจะเห็นพร้อมคะแนน..." className="w-full p-3 rounded-xl bg-[rgba(10,3,6,0.4)] border border-simc-glass-border text-simc-cream font-body text-[12.5px] leading-[1.5] resize-none outline-none" defaultValue=""></textarea>
            )}

            {!isGraded && (
              <div className="mt-2.5 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <button className="btn btn-sm py-1.5 px-2.5">Flag เพื่อตรวจซ้ำ</button>
                  <button className="btn btn-sm py-1.5 px-2.5">ใช้ template</button>
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
    <div className={`rounded-lg ${highlight ? "p-2.5 bg-[rgba(255,236,155,0.08)] border border-dashed border-[rgba(255,236,155,0.3)]" : "p-0 bg-transparent border-none"}`}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-simc-ink-2">{label}</span>
        <span className="flex items-baseline gap-1">
          {value != null ? (
            <span className="display text-base text-simc-gold">{value}</span>
          ) : (
            <span className="display text-base text-simc-ink-faint italic">—</span>
          )}
          <span className="mono text-simc-ink-mute">/ {max}</span>
        </span>
      </div>
      {/* Score buttons */}
      <div className="flex gap-[3px]">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <span key={n} className={`
            flex-1 h-[22px] rounded-[5px] cursor-pointer text-[9px] font-mono font-semibold flex items-center justify-center border
            ${value && n <= value ? "bg-gradient-to-b from-simc-gold to-[#d9b85a] border-[rgba(255,236,155,0.5)] text-[#2a0a0c]" : "bg-[rgba(255,247,226,0.06)] border-simc-glass-border text-simc-ink-mute"}
          `}>{n}</span>
        ))}
      </div>
    </div>
  );
}

export function ToggleRow({ label, subtitle, on }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer">
      <span className={`w-8 h-4.5 rounded-full shrink-0 relative transition-colors duration-200 ${on ? "bg-simc-gold" : "bg-[rgba(255,247,226,0.1)]"}`}>
        <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full ${on ? "left-4 bg-[#2a0a0c]" : "left-0.5 bg-simc-cream"}`} />
      </span>
      <div>
        <div className="text-[12.5px] text-simc-cream">{label}</div>
        {subtitle && <div className="text-[10px] text-simc-ink-mute">{subtitle}</div>}
      </div>
    </label>
  );
}

export function MiniStat({ n, l }) {
  return (
    <div>
      <div className="display text-lg text-simc-cream">{n}</div>
      <div className="mono text-simc-ink-mute text-[9px]">{l}</div>
    </div>
  );
}

export function TicketRow({ id, title, user, category, priority, status, time, unread, msgs, active }) {
  const priColor = priority === "critical" ? "#ff7783" : priority === "high" ? "var(--gold)" : priority === "medium" ? "#9fd1d3" : "var(--ink-faint)";
  const statColor = status === "Open" ? "#ff7783" : status === "Pending" ? "var(--gold)" : status === "Resolved" ? "#9fd1d3" : "var(--ink-faint)";
  return (
    <div className={`
      py-4 px-5.5 border-b border-simc-glass-border cursor-pointer relative
      ${active ? "bg-simc-glass-fill-strong border-l-[3px] border-l-simc-gold" : "bg-transparent border-l-[3px] border-l-transparent"}
    `}>
      <div className="flex items-start gap-2.5">
        {/* Priority indicator */}
        <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: priColor, boxShadow: `0 0 8px ${priColor}` }} />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-2.5">
            <span className="mono text-simc-gold text-[10px]">{id}</span>
            <span className="text-[10px] text-simc-ink-mute font-mono">{time}</span>
          </div>
          <div className={`display text-sm mt-1 leading-[1.35] ${unread ? "text-simc-cream font-semibold" : "text-simc-ink-2 font-normal"}`}>{title}</div>
          <div className="text-[11.5px] text-simc-ink-mute mt-1">{user}</div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="chip text-[9px] py-0.5 px-2">{category}</span>
            <span className="py-0.5 px-2 rounded-full font-mono text-[9px] tracking-[0.12em] inline-flex items-center gap-1 border" style={{ color: statColor, background: `${statColor}22`, borderColor: `${statColor}55` }}>
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: statColor }} /> {status.toUpperCase()}
            </span>
            {msgs && (
              <span className="ml-auto text-[10px] text-simc-ink-mute flex items-center gap-1">
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
      <div className="py-5 px-7 border-b border-simc-glass-border">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="mono text-simc-gold">PROB-0141</span>
              <span className="chip text-[10px]">Exam</span>
              <span className="py-[3px] px-2.5 rounded-full font-mono text-[10px] tracking-[0.15em] text-[#ff7783] bg-[rgba(198,27,16,0.18)] border border-[rgba(198,27,16,0.5)] inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff7783] animate-pulse" /> OPEN
              </span>
              <span className="chip chip-red text-[10px]"><span className="chip-dot" /> CRITICAL</span>
            </div>
            <div className="display text-[22px] text-simc-cream mt-2 leading-[1.3]">
              ระบบสอบค้าง · ไม่นับเวลาให้
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-simc-ink-mute">
              <span>เปิดเมื่อ <span className="text-simc-ink-2">28 นาทีที่แล้ว</span></span>
              <span>·</span>
              <span>โดย <span className="text-simc-ink-2">ปฤษฐา (SIMC-0029)</span></span>
              <span>·</span>
              <span>มอบหมายให้ <span className="text-simc-gold">พี่ส้ม</span></span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-sm">เปลี่ยนสถานะ</button>
            <button className="btn btn-sm">มอบหมาย</button>
            <button className="btn btn-sm py-2 px-2.5">⋯</button>
          </div>
        </div>

        {/* Status / Priority controls */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          <DetailField k="Status" v="Open" tone="red" />
          <DetailField k="Priority" v="Critical" tone="red" />
          <DetailField k="Category" v="Exam · Technical" />
          <DetailField k="Reporter" v="ปฤษฐา · ม.6" />
        </div>
      </div>

      {/* Thread + composer */}
      <div className="flex-1 grid grid-cols-[1fr_280px] min-h-0">
        {/* Chat placeholder */}
        <div className="p-6 overflow-auto border-r border-simc-glass-border flex flex-col gap-3.5 scroll-y">
          <div className="mono text-simc-ink-mute">Conversation thread</div>
          <div className="placeholder-img flex-1 min-h-[460px] rounded-2xl flex flex-col items-center justify-center gap-3.5" style={{
            background: `
              repeating-linear-gradient(135deg, rgba(255,247,226,0.04) 0 14px, rgba(255,247,226,0.02) 14px 28px),
              rgba(10,3,6,0.4)
            `,
          }}>
            <div className="w-16 h-16 rounded-2xl bg-[rgba(255,236,155,0.08)] border border-dashed border-[rgba(255,236,155,0.35)] flex items-center justify-center text-simc-gold">
              <Icon name="sound" size={28} />
            </div>
            <div className="text-center max-w-[320px]">
              <div className="display text-base text-simc-cream">Chatbox Component</div>
              <div className="text-xs text-simc-ink-mute mt-1.5 leading-[1.6]">
                ใส่หน้า conversation thread ของ ticket นี้ตรงนี้<br />
                · message list · attachments · reply composer
              </div>
            </div>
            <div className="mono text-[10px] text-simc-ink-faint tracking-[0.2em]">
              [ COMPONENT · drop chatbox UI here ]
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="p-5 flex flex-col gap-3.5 overflow-auto scroll-y">
          <div>
            <div className="mono text-simc-ink-mute mb-2.5">Properties</div>
            <PropRow k="Status" v={<span className="inline-flex items-center gap-1.5 text-[#ff7783]"><span className="w-1.5 h-1.5 rounded-full bg-[#ff7783]" />Open</span>} />
            <PropRow k="Priority" v={<span className="text-[#ff7783]">● Critical</span>} />
            <PropRow k="Category" v="Exam · Technical" />
            <PropRow k="Assignee" v={<span className="text-simc-gold">พี่ส้ม</span>} />
            <PropRow k="Reporter" v="ปฤษฐา · SIMC-0029" />
            <PropRow k="Created" v="14:32, 17 ต.ค." />
            <PropRow k="Updated" v="14:50, 17 ต.ค." />
          </div>

          <div>
            <div className="mono text-simc-ink-mute mb-2.5">Labels</div>
            <div className="flex flex-wrap gap-1.5">
              {["exam-timer","session-bug","needs-dev","reproducible"].map((t, i) => (
                <span key={i} className="chip text-[10px]">{t}</span>
              ))}
              <span className="py-1 px-2 rounded-full text-[10px] text-simc-ink-mute cursor-pointer border border-dashed border-simc-glass-border">+ add</span>
            </div>
          </div>

          <div>
            <div className="mono text-simc-ink-mute mb-2.5">Linked tickets</div>
            <div className="py-2.5 px-3 rounded-xl bg-[rgba(10,3,6,0.4)] border border-simc-glass-border">
              <div className="mono text-simc-gold">PROB-0138</div>
              <div className="text-[11.5px] text-simc-ink-2 mt-1">คะแนนไม่อัปเดตในหน้า dashboard</div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-simc-ink-mute">
                <span className="w-[5px] h-[5px] rounded-full bg-simc-gold" /> Pending
              </div>
            </div>
          </div>

          <div>
            <div className="mono text-simc-ink-mute mb-2.5">Activity</div>
            <div className="flex flex-col gap-2 text-[11px] text-simc-ink-mute">
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
    <div className="py-2.5 px-3.5 rounded-xl bg-[rgba(10,3,6,0.4)] border border-simc-glass-border">
      <div className="mono text-simc-ink-mute">{k}</div>
      <div className="text-[13px] mt-1 font-display font-medium" style={{ color }}>{v}</div>
    </div>
  );
}

export function PropRow({ k, v }) {
  return (
    <div className="flex justify-between py-2 text-xs border-b border-dashed border-simc-glass-border">
      <span className="text-simc-ink-mute">{k}</span>
      <span className="text-simc-ink-2">{v}</span>
    </div>
  );
}

export function Message({ who, time, color, body, me, system, attachment }) {
  if (system) {
    return (
      <div className="py-2.5 px-3.5 rounded-xl bg-[rgba(255,247,226,0.04)] border border-dashed border-simc-glass-border text-[11.5px] text-simc-ink-mute flex items-center gap-2.5">
        <Icon name="spark" size={12} className="text-simc-ink-mute" />
        <span className="flex-1">{body}</span>
        <span className="mono text-[10px]">{time}</span>
      </div>
    );
  }
  return (
    <div className={`flex gap-3 ${me ? "flex-row-reverse" : "flex-row"}`}>
      <div className="w-9 h-9 rounded-full shrink-0 border-[1.5px] border-simc-glass-border flex items-center justify-center text-simc-cream text-[13px] font-display font-semibold" style={{ background: `linear-gradient(135deg, ${color}, ${color}66)` }}>{who.split(" ")[0][0]}</div>
      <div className={`flex-1 max-w-[80%] ${me ? "text-right" : "text-left"}`}>
        <div className={`flex gap-2.5 mb-1 ${me ? "justify-end" : "justify-between"}`}>
          <span className="text-xs text-simc-cream font-medium">{who}</span>
          <span className="mono text-simc-ink-mute text-[10px]">{time}</span>
        </div>
        <div className={`
          inline-block py-3 px-4 rounded-[14px] text-[13px] text-simc-cream leading-[1.6] text-left border
          ${me ? "bg-[rgba(143,15,27,0.25)] border-[rgba(143,15,27,0.5)]" : "bg-simc-glass-fill border-simc-glass-border"}
        `}>
          {body}
          {attachment && (
            <div className="mt-2.5 py-2 px-3 rounded-lg bg-[rgba(10,3,6,0.4)] border border-simc-glass-border flex items-center gap-2">
              <Icon name="feather" size={12} className="text-simc-gold" />
              <span className="text-[11.5px] text-simc-gold">{attachment}</span>
              <span className="ml-auto text-[10px] text-simc-ink-mute font-mono">1.2 MB</span>
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
      <div className="mono text-simc-ink-mute mb-2.5">{label}</div>
      <div className="flex flex-col gap-1.5">
        {children}
      </div>
    </div>
  );
}

export function FilterChip({ label, count, active, dot }) {
  const dotColor = dot === "teal" ? "#9fd1d3" : dot === "gold" ? "var(--gold)" : dot === "red" ? "#ff7783" : undefined;
  return (
    <div className={`
      py-2 px-3 rounded-xl cursor-pointer flex items-center justify-between text-[12.5px] border
      ${active ? "bg-[rgba(198,27,16,0.18)] border-[rgba(198,27,16,0.5)] text-simc-cream" : "bg-simc-glass-fill border-simc-glass-border text-simc-ink-2"}
    `}>
      <span className="flex items-center gap-2">
        {dotColor && <span className="w-[7px] h-[7px] rounded-full" style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }} />}
        {label}
      </span>
      <span className="mono text-simc-ink-mute">{count}</span>
    </div>
  );
}

import Link from 'next/link';

export function ApplicantCard({ id, name, nick, school, level, region, score, status, tier, gender, color, selected }) {
  const initials = name.split(" ").map(s => s[0]).slice(0, 2).join("");
  const scoreColor = score >= 85 ? "var(--gold)" : score >= 70 ? "#9fd1d3" : "#ff9f9f";

  return (
    <Link href="/admin/applicants/edit" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <div 
        className={`glass p-0 rounded-[18px] relative overflow-hidden cursor-pointer transition-all duration-200 ${selected ? "glass-strong" : ""}`}
      style={{
        border: selected ? "1px solid rgba(255,236,155,0.5)" : undefined,
        boxShadow: selected ? "0 0 0 1px rgba(255,236,155,0.2)" : undefined,
      }}
    >
      {/* Selection checkbox */}
      <span 
        className="absolute top-3 right-3 z-10 w-[22px] h-[22px] rounded-md border-[1.5px] flex items-center justify-center transition-colors"
        style={{
          background: selected ? "var(--gold)" : "rgba(10,3,6,0.5)",
          borderColor: selected ? "var(--gold)" : "var(--glass-border)",
        }}
      >
        {selected && <Icon name="check" size={12} stroke="#2a0a0c" />}
      </span>

      {/* Top banner with avatar */}
      <div 
        className="h-[72px] relative border-b border-[rgba(255,247,226,0.03)]"
        style={{
          background: `linear-gradient(135deg, ${color}cc, ${color}33)`,
        }}
      >
        <div 
          className="absolute left-[18px] -bottom-[22px] w-[50px] h-[50px] rounded-full border-2 border-simc-bg-1 flex items-center justify-center text-simc-cream text-[18px] font-display font-semibold"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}aa)`,
          }}
        >
          {initials}
        </div>

        {/* Score chip */}
        <div 
          className="absolute right-[50px] top-3 px-2.5 py-1 rounded-full flex items-center gap-1.5"
          style={{
            background: "rgba(10,3,6,0.6)",
            border: `1px solid ${scoreColor}55`,
          }}
        >
          <span className="mono text-simc-ink-mute text-[9px]">SCORE</span>
          <span className="display text-[16px] tracking-[-0.01em]" style={{ color: scoreColor }}>{score}</span>
        </div>
      </div>

      <div className="pt-[30px] px-[18px] pb-[18px]">
        <div className="mono text-simc-gold text-[10px] tracking-[0.05em]">{id}</div>
        <div className="display text-[16px] text-simc-cream mt-1">{name}</div>
        <div className="text-[12px] text-simc-ink-mute mt-0.5">
          ชื่อเล่น <span className="text-simc-ink-2">{nick}</span>
        </div>

        <div className="mt-4 pt-3.5 border-t border-dashed border-simc-glass-border flex flex-col gap-1.5">
          <Row icon="pin" v={`${school} · ${level}`} />
          <Row icon="users" v={region} />
        </div>
      </div>
    </div>
    </Link>
  );
}

export function Row({ icon, v }) {
  return (
    <div className="flex items-center gap-2 text-[11.5px] text-simc-ink-2">
      <Icon name={icon} size={12} className="text-simc-ink-mute" />
      <span>{v}</span>
    </div>
  );
}

export function FormCard({ title, subtitle, badge, tone, children }) {
  const badgeColor = tone === "red" ? "#ff7783" : tone === "gold" ? "var(--gold)" : "var(--ink-mute)";
  const badgeBg = tone === "red" ? "rgba(198,27,16,0.18)" : tone === "gold" ? "rgba(255,236,155,0.14)" : "rgba(255,247,226,0.08)";
  return (
    <div className="glass p-5.5 rounded-2xl !bg-[rgba(255,247,226,0.015)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="display text-[17px] text-simc-cream">{title}</div>
          <div className="mono text-simc-ink-mute mt-1">{subtitle}</div>
        </div>
        <span className="py-1 px-2.5 rounded-full font-mono text-[9px] tracking-[0.2em] border" style={{ color: badgeColor, background: badgeBg, borderColor: `${badgeColor}33` }}>{badge}</span>
      </div>
      {children}
    </div>
  );
}

export function EditField({ label, value, type, options = [], full, mono, icon, verified, hint, disabled }) {
  return (
    <div className={full ? "col-span-full" : ""}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="label-thin m-0">{label}</div>
        {verified && <span className="chip chip-teal py-0.5 px-2 text-[9px]"><Icon name="check" size={9} /> verified</span>}
      </div>
      <div className={`relative ${disabled ? "opacity-75 pointer-events-none" : ""}`}>
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-simc-ink-mute pointer-events-none z-10">
            <Icon name={icon} size={14} />
          </span>
        )}
        {type === "select" ? (
          <>
            <select 
              className={`
                w-full bg-[rgba(255,247,226,0.06)] backdrop-blur-lg border border-[rgba(255,247,226,0.1)] rounded-xl text-[13px] font-sans outline-none cursor-pointer appearance-none text-[var(--cream)]
                transition-[border-color,background,box-shadow] duration-200 box-border
                hover:bg-[rgba(255,247,226,0.09)]
                focus:border-[rgba(198,27,16,0.6)] focus:shadow-[0_0_0_3px_rgba(198,27,16,0.12)] focus:bg-[rgba(10,3,6,0.6)]
                ${icon ? "py-3 pr-9 pl-10" : "py-3 pr-9 pl-3.5"}
                ${mono ? "font-mono" : "font-body"}
              `} 
              defaultValue={value}
              tabIndex={disabled ? -1 : undefined}
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
            >
              {options.map((o, i) => <option key={i} className="bg-[#160304]" value={o}>{o}</option>)}
            </select>
            <svg
              viewBox="0 0 24 24" width={14} height={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-simc-ink-mute"
              fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </>
        ) : (
          <input 
            className={`
              w-full bg-[rgba(255,247,226,0.06)] backdrop-blur-lg border border-[rgba(255,247,226,0.1)] rounded-xl text-[var(--cream)] text-[13px] font-sans outline-none
              transition-[border-color,background,box-shadow] duration-200 box-border
              hover:bg-[rgba(255,247,226,0.09)]
              focus:border-[rgba(198,27,16,0.6)] focus:shadow-[0_0_0_3px_rgba(198,27,16,0.12)] focus:bg-[rgba(10,3,6,0.6)]
              placeholder:text-[rgba(255,247,226,0.35)]
              ${icon ? "py-3 pr-3.5 pl-10" : "p-3 px-3.5"}
              ${mono ? "font-mono tracking-[0.04em]" : "font-body"}
            `} 
            defaultValue={value} 
            readOnly={disabled}
            tabIndex={disabled ? -1 : undefined}
          />
        )}
      </div>
      {hint && <div className="mono text-simc-ink-mute text-[9px] mt-1.5">{hint}</div>}
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