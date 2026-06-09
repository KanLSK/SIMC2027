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
    <ArtFrame tone="cool" dense={false}>
      <div style={{ padding: "24px 32px", height: "100%", display: "grid", gridTemplateColumns: "300px 1fr 320px", gap: 18 }}>
        {/* ───── Queue (left) ───── */}
        <div className="glass" style={{ borderRadius: 22, padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Sidebar header */}
          <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid var(--glass-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <div className="kicker">· Exam Grading</div>
                <div className="display" style={{ fontSize: 18, color: "var(--cream)", marginTop: 4 }}>คิวตรวจข้อสอบ</div>
              </div>
              <span className="chip chip-red"><span className="chip-dot" /> 184 รอ</span>
            </div>
            {/* Progress */}
            <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: 12, background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-mute)" }}>
                <span>วันนี้ · 14/30 คน</span>
                <span style={{ color: "var(--gold)" }}>47%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,247,226,0.08)", borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
                <div style={{ width: "47%", height: "100%", background: "linear-gradient(90deg, var(--primary-2), var(--gold))" }} />
              </div>
            </div>
            {/* Filter */}
            <div style={{ marginTop: 12, display: "flex", gap: 4 }}>
              {[
                { l: "Pending", n: 184, active: true, c: "var(--gold)" },
                { l: "In review", n: 12, c: "#9fd1d3" },
                { l: "Done", n: 856, c: "#9fd1d3" },
              ].map((t, i) => (
                <div key={i} style={{
                  padding: "6px 10px", borderRadius: 999, cursor: "pointer", fontSize: 11.5,
                  color: t.active ? "var(--cream)" : "var(--ink-mute)",
                  background: t.active ? "var(--glass-fill-strong)" : "transparent",
                  border: "1px solid " + (t.active ? "var(--glass-border-strong)" : "transparent"),
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: 999, background: t.c }} />
                  {t.l} <span className="mono" style={{ color: "var(--ink-faint)" }}>{t.n}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflow: "auto" }} className="scroll-y">
            {queue.map((q) => <QueueRow key={q.id} {...q} />)}
          </div>

          {/* Calibration */}
          <div style={{ padding: "12px 18px", borderTop: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="mono" style={{ color: "var(--ink-mute)" }}>Inter-rater · κ 0.84</div>
            <button className="btn btn-sm" style={{ padding: "5px 10px" }}>Calibrate</button>
          </div>
        </div>

        {/* ───── Exam paper (center) ───── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 0 }}>
          {/* Header bar */}
          <div className="glass-strong" style={{ padding: "16px 24px", borderRadius: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button className="btn btn-sm"><Icon name="arrow-left" size={12} /></button>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="display" style={{ fontSize: 20, color: "var(--cream)" }}>อนัญพร ศรีศักดิ์</div>
                  <span className="mono" style={{ color: "var(--gold)" }}>SIMC-0026</span>
                  <TierPill tier="A" />
                </div>
                <div className="mono" style={{ color: "var(--ink-mute)", marginTop: 2 }}>Mater Dei · ม.6 · ส่งข้อสอบ 14:32, 20 ต.ค.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="chip"><span className="chip-dot" style={{ background: "var(--ink-faint)" }} /> ตรวจโดยไม่เห็นชื่อ (anonymous mode · OFF)</span>
              <button className="btn btn-sm">บันทึกร่าง</button>
              <button className="btn btn-sm">บันทึก &amp; ถัดไป →</button>
              <button className="btn btn-primary btn-sm"><Icon name="check" size={12} /> ส่งคะแนน</button>
            </div>
          </div>

          {/* Score summary */}
          <div className="glass" style={{ padding: 20, borderRadius: 18, display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 20, alignItems: "center" }}>
            <div>
              <div className="mono" style={{ color: "var(--gold)" }}>Total Score</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
                <span className="display" style={{ fontSize: 44, color: "var(--cream)", letterSpacing: "-0.02em" }}>89</span>
                <span style={{ fontSize: 16, color: "var(--ink-mute)", fontFamily: "var(--f-mono)" }}>/ 100</span>
                <span className="chip chip-teal" style={{ marginLeft: 6 }}><span className="chip-dot" /> est. Tier A</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,247,226,0.08)", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: "89%", height: "100%", background: "linear-gradient(90deg, var(--primary-2), var(--gold))" }} />
              </div>
            </div>
            <ScoreCell k="MCQ · Auto" v="47" max={50} hint="94%" c="#9fd1d3" />
            <ScoreCell k="Essay 01 · Manual" v="18" max={25} hint="graded" c="var(--gold)" />
            <ScoreCell k="Essay 02 · Manual" v="—" max={25} hint="pending" c="var(--ink-faint)" pending />
            <ScoreCell k="Time used" v="01:18" max={null} hint="of 1:30" c="var(--cream)" />
          </div>

          {/* Main scroll area */}
          <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 16 }} className="scroll-y">
            {/* ── MCQ section ── */}
            <div className="glass" style={{ padding: 24, borderRadius: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="kicker" style={{ color: "var(--gold)" }}>· Section A · MCQ (Auto-graded)</div>
                  <div className="display" style={{ fontSize: 22, color: "var(--cream)", marginTop: 4 }}>ปรนัย · 50 ข้อ × 1 คะแนน</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ textAlign: "right" }}>
                    <div className="mono" style={{ color: "var(--ink-mute)" }}>Auto-graded</div>
                    <div className="display" style={{ fontSize: 22, color: "#9fd1d3", marginTop: 2 }}>47 <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>/ 50</span></div>
                  </div>
                  <span className="chip chip-teal"><Icon name="check" size={11} /> Auto</span>
                </div>
              </div>

              {/* MCQ grid */}
              <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 6 }}>
                {Array.from({ length: 50 }, (_, i) => {
                  const n = i + 1;
                  const wrong = [7, 14, 23].includes(n);
                  const state = wrong ? "wrong" : "right";
                  const bg = state === "right" ? "rgba(53,107,109,0.5)" : "rgba(198,27,16,0.55)";
                  const c = state === "right" ? "#9fd1d3" : "#ff9f9f";
                  return (
                    <div key={i} title={`Q${n} · ${state}`} style={{
                      height: 34, borderRadius: 8, background: bg, color: c,
                      fontSize: 11, fontFamily: "var(--f-mono)", fontWeight: 500,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(255,247,226,0.08)",
                      position: "relative", cursor: "pointer",
                    }}>
                      {String(n).padStart(2, "0")}
                      {wrong && <span style={{ position: "absolute", top: -3, right: -3, width: 6, height: 6, borderRadius: 999, background: "#ff7783" }} />}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-mute)", fontFamily: "var(--f-mono)" }}>
                <div style={{ display: "flex", gap: 14 }}>
                  <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "rgba(53,107,109,0.55)", marginRight: 6, verticalAlign: "-1px" }} />ถูก · 47</span>
                  <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "rgba(198,27,16,0.55)", marginRight: 6, verticalAlign: "-1px" }} />ผิด · 3 (Q7, Q14, Q23)</span>
                </div>
                <span style={{ color: "var(--gold)", cursor: "pointer" }}>ดูเฉลย → </span>
              </div>

              {/* Wrong question preview */}
              <div style={{ marginTop: 14, padding: 16, borderRadius: 14, background: "rgba(198,27,16,0.10)", border: "1px solid rgba(198,27,16,0.3)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div className="mono" style={{ color: "#ff9f9f" }}>Q23 · INCORRECT · Pathology · 2 pts</div>
                  <span style={{ fontSize: 11, color: "var(--gold)", cursor: "pointer", fontFamily: "var(--f-mono)" }}>ดูข้อ Q7 ·  Q14 ›</span>
                </div>
                <div style={{ fontSize: 13.5, color: "var(--cream)", lineHeight: 1.5 }}>
                  ผู้เสียชีวิตถูกพบในห้องล็อก มีรอยช้ำบริเวณ posterior triangle of neck — สาเหตุที่น่าจะเป็นไปได้มากที่สุดคือ?
                </div>
                <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(198,27,16,0.2)", border: "1px solid rgba(198,27,16,0.4)", fontSize: 12, color: "var(--ink-2)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#ff9f9f" }}>✗</span> <span><b>A.</b> Myocardial infarction</span>
                    <span className="mono" style={{ marginLeft: "auto", color: "#ff9f9f", fontSize: 10 }}>เลือก</span>
                  </div>
                  <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(53,107,109,0.25)", border: "1px solid rgba(53,107,109,0.5)", fontSize: 12, color: "var(--ink-2)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#9fd1d3" }}>✓</span> <span><b>B.</b> Asphyxiation จาก strangulation</span>
                    <span className="mono" style={{ marginLeft: "auto", color: "#9fd1d3", fontSize: 10 }}>เฉลย</span>
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
        <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 0, overflow: "auto" }} className="scroll-y">
          {/* Anonymity / quick controls */}
          <div className="glass" style={{ padding: 18, borderRadius: 18 }}>
            <div className="mono" style={{ color: "var(--gold)", marginBottom: 12 }}>Grading mode</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ToggleRow label="Anonymous mode" subtitle="ซ่อนชื่อ + โรงเรียน" on />
              <ToggleRow label="Auto-save (15s)" on />
              <ToggleRow label="แสดง MCQ stats" on />
              <ToggleRow label="แจ้งเตือนเมื่อทำเสร็จ" />
            </div>
          </div>

          {/* Rubric reference */}
          <div className="glass" style={{ padding: 18, borderRadius: 18 }}>
            <div className="mono" style={{ color: "var(--gold)", marginBottom: 12 }}>เกณฑ์การให้คะแนน · Essay</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["A · 9–10", "ดีเยี่ยม — ความคิดลึก ภาษาดี ครอบคลุม", "var(--gold)"],
                ["B · 7–8", "ดี — ครบประเด็น แต่ไม่ลึกพอ", "#9fd1d3"],
                ["C · 5–6", "พอใช้ — มีประเด็นแต่ขาดความเชื่อมโยง", "#e8d9b8"],
                ["D · 1–4", "ต่ำกว่ามาตรฐาน — สั้น ไม่ตรงคำถาม", "#ff9f9f"],
              ].map(([k, v, c], i) => (
                <div key={i} style={{ display: "flex", gap: 10, fontSize: 11.5 }}>
                  <span className="mono" style={{ color: c, minWidth: 60, fontWeight: 600 }}>{k}</span>
                  <span style={{ color: "var(--ink-mute)", flex: 1, lineHeight: 1.5 }}>{v}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-sm" style={{ marginTop: 12, width: "100%" }}>ดูเกณฑ์เต็ม →</button>
          </div>

          {/* Notes / shortcuts */}
          <div className="glass" style={{ padding: 18, borderRadius: 18 }}>
            <div className="mono" style={{ color: "var(--gold)", marginBottom: 10 }}>หมายเหตุภายใน</div>
            <textarea rows={4} placeholder="บันทึกความคิดส่วนตัว — ไม่แสดงต่อผู้สมัคร" style={{
              width: "100%", padding: 12, borderRadius: 10,
              background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)",
              color: "var(--cream)", fontFamily: "var(--f-body)", fontSize: 12, lineHeight: 1.5, resize: "none", outline: "none",
            }} defaultValue=""></textarea>
          </div>

          {/* Shortcuts */}
          <div className="glass" style={{ padding: 18, borderRadius: 18 }}>
            <div className="mono" style={{ color: "var(--gold)", marginBottom: 10 }}>Keyboard shortcuts</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 11.5, color: "var(--ink-mute)" }}>
              {[
                ["↑ ↓", "ก่อนหน้า / ถัดไป"],
                ["1–9", "ให้คะแนน rubric หลักที่กำลังโฟกัส"],
                ["⌘ ↵", "บันทึก & ถัดไป"],
                ["F", "Flag เพื่อให้ผู้อื่นช่วยตรวจ"],
                ["A", "Toggle anonymous mode"],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="mono" style={{ color: "var(--cream)" }}>{k}</span>
                  <span style={{ color: "var(--ink-2)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ArtFrame>
  );
}