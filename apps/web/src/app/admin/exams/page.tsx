// @ts-nocheck
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField } from '@/components/admin/AdminUI';

export default function ExamGradingPage() {
  const queue = [
    { id: "SIMC-0024", name: "วรรณนิดา ปานทอง", mcq: "48/50", essay: "graded", total: 92, status: "done", color: "#8F0F1B" },
    { id: "SIMC-0026", name: "อนัญพร ศรีศักดิ์", mcq: "47/50", essay: "pending", total: null, status: "active", color: "#356B6D" },
    { id: "SIMC-0023", name: "ภูริ พฤกษ์ภิญโญ", mcq: "44/50", essay: "pending", total: null, status: "pending", color: "#4B0700" },
    { id: "SIMC-0028", name: "ธีรเดช วงศ์ไพศาล", mcq: "45/50", essay: "pending", total: null, status: "pending", color: "#8F0F1B" },
    { id: "SIMC-0031", name: "ลลิตภัทร แซ่ลิ้ม", mcq: "46/50", essay: "pending", total: null, status: "pending", color: "#356B6D" },
    { id: "SIMC-0029", name: "ปฤษฐา เพ็งสวัสดิ์", mcq: "41/50", essay: "pending", total: null, status: "pending", color: "#4B0700" },
    { id: "SIMC-0025", name: "ปัณณวัฒน์ สุวรรณกิจ", mcq: "39/50", essay: "in-review", total: null, status: "pending", color: "#8F0F1B" },
    { id: "SIMC-0027", name: "ชนกานต์ พรหมจักร", mcq: "35/50", essay: "pending", total: null, status: "pending", color: "#356B6D" },
  ];

  return (
    <div className="h-full grid grid-cols-[300px_1fr_320px] gap-4.5">
        {/* ───── Queue (left) ───── */}
        <div className="glass rounded-[22px] p-0 flex flex-col overflow-hidden">
          {/* Sidebar header */}
          <div className="pt-5 px-5 pb-3.5 border-b border-simc-glass-border">
            <div className="flex justify-between items-start">
              <div>
                <div className="kicker">· Exam Grading</div>
                <div className="display text-lg text-simc-cream mt-1">คิวตรวจข้อสอบ</div>
              </div>
              <span className="chip chip-red"><span className="chip-dot" /> 184 รอ</span>
            </div>
            {/* Progress */}
            <div className="mt-3.5 py-2.5 px-3 rounded-xl bg-[rgba(10,3,6,0.4)] border border-simc-glass-border">
              <div className="flex justify-between text-[11px] text-simc-ink-mute">
                <span>วันนี้ · 14/30 คน</span>
                <span className="text-simc-gold">47%</span>
              </div>
              <div className="h-1 bg-[rgba(255,247,226,0.08)] rounded-full mt-1.5 overflow-hidden">
                <div className="w-[47%] h-full bg-gradient-to-r from-simc-primary-2 to-simc-gold" />
              </div>
            </div>
            {/* Filter */}
            <div className="mt-3 flex gap-1">
              {[
                { l: "Pending", n: 184, active: true, c: "var(--gold)" },
                { l: "In review", n: 12, c: "#9fd1d3" },
                { l: "Done", n: 856, c: "#9fd1d3" },
              ].map((t, i) => (
                <div key={i} className={`
                  py-1.5 px-2.5 rounded-full cursor-pointer text-[11.5px] flex items-center gap-1.5 border
                  ${t.active ? "text-simc-cream bg-simc-glass-fill-strong border-simc-glass-border-strong" : "text-simc-ink-mute bg-transparent border-transparent"}
                `}>
                  <span className="w-[5px] h-[5px] rounded-full" style={{ background: t.c }} />
                  {t.l} <span className="mono text-simc-ink-faint">{t.n}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto scroll-y">
            {queue.map((q) => <QueueRow key={q.id} {...q} />)}
          </div>

          {/* Calibration */}
          <div className="py-3 px-4.5 border-t border-simc-glass-border flex justify-between items-center">
            <div className="mono text-simc-ink-mute">Inter-rater · κ 0.84</div>
            <button className="btn btn-sm py-1.5 px-2.5">Calibrate</button>
          </div>
        </div>

        {/* ───── Exam paper (center) ───── */}
        <div className="flex flex-col gap-3.5 min-h-0">
          {/* Header bar */}
          <div className="glass-strong py-4 px-6 rounded-[18px] flex justify-between items-center">
            <div className="flex items-center gap-3.5">
              <button className="btn btn-sm"><Icon name="arrow-left" size={12} /></button>
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="display text-xl text-simc-cream">อนัญพร ศรีศักดิ์</div>
                  <span className="mono text-simc-gold">SIMC-0026</span>
                  <TierPill tier="A" />
                </div>
                <div className="mono text-simc-ink-mute mt-0.5">Mater Dei · ม.6 · ส่งข้อสอบ 14:32, 20 ต.ค.</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="chip"><span className="chip-dot bg-simc-ink-faint" /> ตรวจโดยไม่เห็นชื่อ (anonymous mode · OFF)</span>
              <button className="btn btn-sm">บันทึกร่าง</button>
              <button className="btn btn-sm">บันทึก &amp; ถัดไป →</button>
              <button className="btn btn-primary btn-sm"><Icon name="check" size={12} /> ส่งคะแนน</button>
            </div>
          </div>

          {/* Score summary */}
          <div className="glass p-5 rounded-[18px] grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-5 items-center">
            <div>
              <div className="mono text-simc-gold">Total Score</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="display text-[44px] text-simc-cream tracking-[-0.02em]">89</span>
                <span className="text-base text-simc-ink-mute font-mono">/ 100</span>
                <span className="chip chip-teal ml-1.5"><span className="chip-dot" /> est. Tier A</span>
              </div>
              <div className="h-1.5 bg-[rgba(255,247,226,0.08)] rounded-full mt-2.5 overflow-hidden">
                <div className="w-[89%] h-full bg-gradient-to-r from-simc-primary-2 to-simc-gold" />
              </div>
            </div>
            <ScoreCell k="MCQ · Auto" v="47" max={50} hint="94%" c="#9fd1d3" />
            <ScoreCell k="Essay 01 · Manual" v="18" max={25} hint="graded" c="var(--gold)" />
            <ScoreCell k="Essay 02 · Manual" v="—" max={25} hint="pending" c="var(--ink-faint)" pending />
            <ScoreCell k="Time used" v="01:18" max={null} hint="of 1:30" c="var(--cream)" />
          </div>

          {/* Main scroll area */}
          <div className="flex-1 overflow-auto flex flex-col gap-4 scroll-y">
            {/* ── MCQ section ── */}
            <div className="glass p-6 rounded-[22px]">
              <div className="flex justify-between items-center">
                <div>
                  <div className="kicker text-simc-gold">· Section A · MCQ (Auto-graded)</div>
                  <div className="display text-[22px] text-simc-cream mt-1">ปรนัย · 50 ข้อ × 1 คะแนน</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="text-right">
                    <div className="mono text-simc-ink-mute">Auto-graded</div>
                    <div className="display text-[22px] text-[#9fd1d3] mt-0.5">47 <span className="text-xs text-simc-ink-faint">/ 50</span></div>
                  </div>
                  <span className="chip chip-teal"><Icon name="check" size={11} /> Auto</span>
                </div>
              </div>

              {/* MCQ grid */}
              <div className="mt-4.5 grid grid-cols-10 gap-1.5">
                {Array.from({ length: 50 }, (_, i) => {
                  const n = i + 1;
                  const wrong = [7, 14, 23].includes(n);
                  const state = wrong ? "wrong" : "right";
                  const bg = state === "right" ? "rgba(53,107,109,0.5)" : "rgba(198,27,16,0.55)";
                  const c = state === "right" ? "#9fd1d3" : "#ff9f9f";
                  return (
                    <div key={i} title={`Q${n} · ${state}`} className="h-[34px] rounded-lg text-[11px] font-mono font-medium flex items-center justify-center border border-[rgba(255,247,226,0.08)] relative cursor-pointer" style={{
                      background: bg, color: c,
                    }}>
                      {String(n).padStart(2, "0")}
                      {wrong && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#ff7783]" />}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-simc-ink-mute font-mono">
                <div className="flex gap-3.5">
                  <span><span className="inline-block w-2.5 h-2.5 rounded-[3px] bg-[rgba(53,107,109,0.55)] mr-1.5 align-[-1px]" />ถูก · 47</span>
                  <span><span className="inline-block w-2.5 h-2.5 rounded-[3px] bg-[rgba(198,27,16,0.55)] mr-1.5 align-[-1px]" />ผิด · 3 (Q7, Q14, Q23)</span>
                </div>
                <span className="text-simc-gold cursor-pointer">ดูเฉลย → </span>
              </div>

              {/* Wrong question preview */}
              <div className="mt-3.5 p-4 rounded-[14px] bg-[rgba(198,27,16,0.10)] border border-[rgba(198,27,16,0.3)]">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="mono text-[#ff9f9f]">Q23 · INCORRECT · Pathology · 2 pts</div>
                  <span className="text-[11px] text-simc-gold cursor-pointer font-mono">ดูข้อ Q7 ·  Q14 ›</span>
                </div>
                <div className="text-[13.5px] text-simc-cream leading-[1.5]">
                  ผู้เสียชีวิตถูกพบในห้องล็อก มีรอยช้ำบริเวณ posterior triangle of neck — สาเหตุที่น่าจะเป็นไปได้มากที่สุดคือ?
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <div className="py-2 px-3 rounded-lg bg-[rgba(198,27,16,0.2)] border border-[rgba(198,27,16,0.4)] text-xs text-simc-ink-2 flex items-center gap-2">
                    <span className="text-[#ff9f9f]">✗</span> <span><b>A.</b> Myocardial infarction</span>
                    <span className="mono ml-auto text-[#ff9f9f] text-[10px]">เลือก</span>
                  </div>
                  <div className="py-2 px-3 rounded-lg bg-[rgba(53,107,109,0.25)] border border-[rgba(53,107,109,0.5)] text-xs text-simc-ink-2 flex items-center gap-2">
                    <span className="text-[#9fd1d3]">✓</span> <span><b>B.</b> Asphyxiation จาก strangulation</span>
                    <span className="mono ml-auto text-[#9fd1d3] text-[10px]">เฉลย</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Essay 01 — already graded ── */}
            <EssaySection
              n="01"
              status="graded"
              question="อะไรคือสิ่งที่ทำให้น้องเลือกเส้นทางสายแพทย์? เล่าประสบการณ์ที่เป็นจุดเริ่มต้น"
              answer="ผมรู้จักความหมายของคำว่า “หมอ” ครั้งแรกในห้อง ER ของโรงพยาบาลใกล้บ้าน — วันที่คุณยายของผมหัวใจวาย ผมยืนอยู่หลังกระจกเห็นทีมแพทย์เคลื่อนไหวเหมือนวงออเคสตร้า ทุกการเคลื่อนไหวมีจังหวะ มีเหตุผล มีความหวัง วันนั้นผมรู้ว่าคำว่า “ช่วยคน” มันไม่ใช่แค่คำพูดเท่ๆ มันคือทักษะ ที่ต้องฝึกซ้อมจนกลายเป็นสัญชาตญาณ ตั้งแต่นั้นผมเริ่มอ่านบทความ medical case ของพี่ ๆ ปี 6 จาก SIMC รุ่นก่อน ๆ และพบว่าโลกของหมอ ไม่ได้สวยงามอย่างเดียว — มันมีความเหนื่อยที่ต้องแบก มีความล้มเหลวที่ต้องเผชิญ แต่ก็มี ‘โมเมนต์ที่อธิบายไม่ได้’ ที่ทำให้ทุกอย่างคุ้มค่า ผมอยากเป็นคนหนึ่งที่ได้สัมผัสโมเมนต์นั้น..."
              max={25}
              score={18}
              feedback="เขียนได้ดี ใส่ทั้ง personal story และความเข้าใจในวิชาชีพ ขาดเพียงการเชื่อมโยงกับเป้าหมายระยะยาว — แต่โดยรวมแสดงความคิดที่ลึกซึ้ง"
              rubric={[
                ["ความชัดเจน + เนื้อหา", 8, 10],
                ["ความเข้าใจในวิชาชีพ", 5, 8],
                ["ภาษา + การใช้คำ", 5, 7],
              ]}
              graderName="พี่ส้ม"
            />

            {/* ── Essay 02 — needs grading (FOCUS) ── */}
            <EssaySection
              n="02"
              status="grading"
              question="หาก น้องได้รับโอกาสในการเข้าร่วม SIMC 27 — น้องคาดหวังจะได้กลับบ้านพร้อมกับสิ่งใด และน้องตั้งใจจะมอบสิ่งใดให้กับเพื่อนๆ ในค่าย?"
              answer={'สำหรับหนู ค่าย SIMC 27 ไม่ใช่แค่ค่ายที่จะมาแข่งขันชิงตำแหน่งใดตำแหน่งหนึ่ง แต่เป็นพื้นที่ที่จะได้พบเจอคนที่ฝันเหมือนกัน คนที่จะเข้าใจเมื่อหนูพูดเรื่องการเรียนหมอ — ซึ่งบางครั้งคนรอบตัวหนูไม่เข้าใจ\n\nหนูอยากกลับบ้านพร้อมกับ "เพื่อนร่วมทาง" ที่จะเดินไปด้วยกันในเส้นทางที่ยังยาวอีก 6 ปี และ "พี่" ที่จะเป็นตัวอย่างให้เห็นว่าฝันนี้เป็นจริงได้\n\nและในฐานะที่หนูเรียน Speech & Debate มา 3 ปี หนูตั้งใจจะมอบ "ความกล้าในการตั้งคำถาม" ให้กับเพื่อน ๆ — เพราะหนูเชื่อว่าหมอที่ดี คือหมอที่ไม่หยุดสงสัย ไม่หยุดถาม...'}
              max={25}
              score={null}
              focus
              graderName=""
              rubricBlank={[
                ["ความชัดเจน + เนื้อหา", 10],
                ["ความเข้าใจในวิชาชีพ", 8],
                ["ภาษา + การใช้คำ", 7],
              ]}
            />
          </div>
        </div>

        {/* ───── Right panel ───── */}
        <div className="flex flex-col gap-3.5 min-h-0 overflow-auto scroll-y">
          {/* Anonymity / quick controls */}
          <div className="glass p-4.5 rounded-[18px]">
            <div className="mono text-simc-gold mb-3">Grading mode</div>
            <div className="flex flex-col gap-2.5">
              <ToggleRow label="Anonymous mode" subtitle="ซ่อนชื่อ + โรงเรียน" on />
              <ToggleRow label="Auto-save (15s)" on />
              <ToggleRow label="แสดง MCQ stats" on />
              <ToggleRow label="แจ้งเตือนเมื่อทำเสร็จ" />
            </div>
          </div>

          {/* Rubric reference */}
          <div className="glass p-4.5 rounded-[18px]">
            <div className="mono text-simc-gold mb-3">เกณฑ์การให้คะแนน · Essay</div>
            <div className="flex flex-col gap-2.5">
              {[
                ["A · 9–10", "ดีเยี่ยม — ความคิดลึก ภาษาดี ครอบคลุม", "var(--gold)"],
                ["B · 7–8", "ดี — ครบประเด็น แต่ไม่ลึกพอ", "#9fd1d3"],
                ["C · 5–6", "พอใช้ — มีประเด็นแต่ขาดความเชื่อมโยง", "#e8d9b8"],
                ["D · 1–4", "ต่ำกว่ามาตรฐาน — สั้น ไม่ตรงคำถาม", "#ff9f9f"],
              ].map(([k, v, c], i) => (
                <div key={i} className="flex gap-2.5 text-[11.5px]">
                  <span className="mono min-w-[60px] font-semibold" style={{ color: c }}>{k}</span>
                  <span className="text-simc-ink-mute flex-1 leading-[1.5]">{v}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-sm mt-3 w-full">ดูเกณฑ์เต็ม →</button>
          </div>

          {/* Notes / shortcuts */}
          <div className="glass p-4.5 rounded-[18px]">
            <div className="mono text-simc-gold mb-2.5">หมายเหตุภายใน</div>
            <textarea rows={4} placeholder="บันทึกความคิดส่วนตัว — ไม่แสดงต่อผู้สมัคร" className="w-full p-3 rounded-md bg-[rgba(10,3,6,0.4)] border border-simc-glass-border text-simc-cream font-body text-xs leading-[1.5] resize-none outline-none" defaultValue=""></textarea>
          </div>

          {/* Shortcuts */}
          <div className="glass p-4.5 rounded-[18px]">
            <div className="mono text-simc-gold mb-2.5">Keyboard shortcuts</div>
            <div className="flex flex-col gap-2 text-[11.5px] text-simc-ink-mute">
              {[
                ["↑ ↓", "ก่อนหน้า / ถัดไป"],
                ["1–9", "ให้คะแนน rubric หลักที่กำลังโฟกัส"],
                ["⌘ ↵", "บันทึก & ถัดไป"],
                ["F", "Flag เพื่อให้ผู้อื่นช่วยตรวจ"],
                ["A", "Toggle anonymous mode"],
              ].map(([k, v], i) => (
                <div key={i} className="flex justify-between">
                  <span className="mono text-simc-cream">{k}</span>
                  <span className="text-simc-ink-2">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}