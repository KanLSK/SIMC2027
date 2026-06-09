// @ts-nocheck
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField } from '@/components/admin/AdminUI';

export default function NewIssuePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Main form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, overflow: "auto" }} className="scroll-y">
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div>
              <div className="mono" style={{ color: "var(--ink-mute)" }}>
                <span style={{ cursor: "pointer" }}>Admin</span> · <span style={{ cursor: "pointer" }}>User Problems</span> · <span style={{ color: "var(--gold)" }}>New Issue</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4 }}>
                <button className="btn btn-sm"><Icon name="arrow-left" size={12} /> ย้อนกลับ</button>
                <div className="display" style={{ fontSize: 26, color: "var(--cream)" }}>เพิ่มปัญหาผู้ใช้ใหม่</div>
                <span className="chip"><span className="chip-dot" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} /> Draft</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 13, color: "var(--ink-mute)" }}>
                บันทึกปัญหาที่ผู้ใช้รายงาน เพื่อให้ทีมงานติดตามและแก้ไขได้อย่างเป็นระบบ
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-sm">ยกเลิก</button>
              <button className="btn btn-sm">บันทึกเป็นแบบร่าง</button>
              <button className="btn btn-primary btn-sm"><Icon name="check" size={12} /> สร้าง Ticket</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
            {/* Main column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Quick templates */}
              <div className="glass" style={{ padding: 22, borderRadius: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div>
                    <div className="display" style={{ fontSize: 16, color: "var(--cream)" }}>เริ่มจากเทมเพลต</div>
                    <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 2 }}>เลือกเทมเพลตเพื่อกรอกฟอร์มอัตโนมัติ — หรือกรอกเองด้านล่าง</div>
                  </div>
                  <span className="mono" style={{ color: "var(--ink-mute)" }}>OPTIONAL</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {[
                    { i: "fingerprint", l: "Login / OTP", c: "ผู้ใช้เข้าสู่ระบบไม่ได้" },
                    { i: "feather", l: "Registration", c: "กรอกใบสมัครติดขัด", active: true },
                    { i: "clock", l: "Exam Timer", c: "เวลาสอบผิดปกติ" },
                    { i: "spark", l: "Other", c: "ปัญหาทั่วไป" },
                  ].map((t, i) => (
                    <div key={i} className={t.active ? "glass glass-strong" : "glass"} style={{
                      padding: 14, borderRadius: 14, cursor: "pointer",
                      border: t.active ? "1px solid rgba(255,236,155,0.4)" : undefined,
                    }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 10,
                        background: t.active ? "rgba(255,236,155,0.18)" : "rgba(198,27,16,0.18)",
                        color: t.active ? "var(--gold)" : "var(--gold)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon name={t.i} size={16} />
                      </div>
                      <div className="display" style={{ fontSize: 13, color: "var(--cream)", marginTop: 10 }}>{t.l}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 2 }}>{t.c}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title */}
              <FormCard title="ข้อมูลหลัก" subtitle="Issue summary" badge="REQUIRED">
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <div className="label-thin">หัวข้อปัญหา</div>
                    <input className="input" placeholder="สรุปสั้นๆ เช่น ระบบสอบค้าง · ไม่นับเวลาให้" defaultValue="" style={{ fontSize: 16, fontFamily: "var(--f-display)" }} />
                    <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 9, marginTop: 4 }}>0 / 120 ตัวอักษร</div>
                  </div>

                  <div>
                    <div className="label-thin">รายละเอียดปัญหา</div>
                    <div style={{
                      border: "1px solid var(--glass-border)", borderRadius: 14,
                      background: "rgba(10,3,6,0.4)",
                    }}>
                      {/* Toolbar */}
                      <div style={{
                        padding: "8px 12px", borderBottom: "1px solid var(--glass-border)",
                        display: "flex", gap: 6, alignItems: "center",
                      }}>
                        {["B","I","U","•","1.","“","</>","🔗"].map((t, i) => (
                          <button key={i} style={{
                            padding: "4px 8px", borderRadius: 6, fontSize: 12,
                            background: "transparent", border: "none",
                            color: "var(--ink-mute)", cursor: "pointer", fontFamily: i === 0 || i === 2 ? "var(--f-body)" : "var(--f-mono)",
                            fontWeight: i === 0 ? 700 : 400, fontStyle: i === 1 ? "italic" : "normal", textDecoration: i === 2 ? "underline" : "none",
                          }}>{t}</button>
                        ))}
                        <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--ink-faint)", fontFamily: "var(--f-mono)" }}>Markdown supported</span>
                      </div>
                      <textarea
                        rows={6}
                        placeholder={"อธิบายสิ่งที่เกิดขึ้น · ขั้นตอนที่ทำก่อนเจอปัญหา · ผลลัพธ์ที่คาดหวัง\n\nเช่น:\n1. กดส่งใบสมัครในขั้นตอนที่ 5\n2. หน้าเว็บโหลดค้างประมาณ 30 วินาที\n3. แสดง error 500 · ข้อมูลหาย"}
                        style={{
                          width: "100%", padding: "14px 16px", resize: "vertical",
                          background: "transparent", border: "none", outline: "none",
                          color: "var(--cream)", fontFamily: "var(--f-body)", fontSize: 13.5, lineHeight: 1.7,
                          minHeight: 160,
                        }}
                        defaultValue=""
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--ink-mute)", fontFamily: "var(--f-mono)", marginTop: 4 }}>
                      <span>💡 ใช้ /image เพื่อแทรกรูป · /code เพื่อใส่ block code</span>
                      <span>0 คำ</span>
                    </div>
                  </div>
                </div>
              </FormCard>

              {/* Classification */}
              <FormCard title="หมวดหมู่และความเร่งด่วน" subtitle="Category & Priority" badge="REQUIRED">
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div className="label-thin">หมวดหมู่ของปัญหา</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                      {[
                        ["Account", "Login / OTP", "fingerprint"],
                        ["Registration", "กรอกใบสมัคร", "feather", true],
                        ["Exam", "ระบบสอบ", "clock"],
                        ["Payment", "ค่าธรรมเนียม", "key"],
                        ["Other", "อื่น ๆ", "spark"],
                      ].map(([l, s, ic, active]) => (
                        <div key={l} style={{
                          padding: 12, borderRadius: 12, cursor: "pointer", textAlign: "center",
                          background: active ? "rgba(143,15,27,0.25)" : "var(--glass-fill)",
                          border: "1px solid " + (active ? "rgba(198,27,16,0.5)" : "var(--glass-border)"),
                        }}>
                          <Icon name={ic} size={18} stroke={active ? "var(--gold)" : "var(--ink-2)"} />
                          <div style={{ fontSize: 12, color: active ? "var(--cream)" : "var(--ink-2)", marginTop: 6, fontWeight: 500 }}>{l}</div>
                          <div style={{ fontSize: 10, color: "var(--ink-mute)", marginTop: 2 }}>{s}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="label-thin">ความเร่งด่วน</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                      {[
                        { l: "Low", c: "var(--ink-faint)", d: "ไม่กระทบการใช้งาน" },
                        { l: "Medium", c: "#9fd1d3", d: "แก้ใน 1–2 วัน", active: true },
                        { l: "High", c: "var(--gold)", d: "แก้ใน 4 ชม." },
                        { l: "Critical", c: "#ff7783", d: "ต้องแก้ทันที" },
                      ].map((p) => (
                        <div key={p.l} style={{
                          padding: 12, borderRadius: 12, cursor: "pointer",
                          background: p.active ? `${p.c}22` : "var(--glass-fill)",
                          border: "1px solid " + (p.active ? `${p.c}88` : "var(--glass-border)"),
                          display: "flex", alignItems: "center", gap: 10,
                        }}>
                          <span style={{ width: 10, height: 10, borderRadius: 999, background: p.c, boxShadow: p.active ? `0 0 8px ${p.c}` : undefined }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: p.active ? "var(--cream)" : "var(--ink-2)", fontWeight: 500 }}>{p.l}</div>
                            <div style={{ fontSize: 10, color: "var(--ink-mute)", marginTop: 2 }}>{p.d}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="label-thin">สถานะเริ่มต้น</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[
                        { l: "Open", c: "#ff7783", active: true },
                        { l: "Pending", c: "var(--gold)" },
                        { l: "Resolved", c: "#9fd1d3" },
                        { l: "Closed", c: "var(--ink-faint)" },
                      ].map((s) => (
                        <span key={s.l} style={{
                          padding: "8px 14px", borderRadius: 999, cursor: "pointer",
                          background: s.active ? `${s.c}22` : "var(--glass-fill)",
                          border: "1px solid " + (s.active ? `${s.c}66` : "var(--glass-border)"),
                          color: s.active ? "var(--cream)" : "var(--ink-mute)",
                          fontSize: 12, display: "inline-flex", alignItems: "center", gap: 8,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: 999, background: s.c, boxShadow: s.active ? `0 0 6px ${s.c}` : undefined }} />
                          {s.l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FormCard>

              {/* Reporter / context */}
              <FormCard title="ผู้รายงานปัญหา" subtitle="Reporter & context" badge="REQUIRED">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <div className="label-thin">ค้นหาผู้สมัคร / ผู้ใช้</div>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-mute)" }}><Icon name="magnify" size={14} /></span>
                      <input className="input" defaultValue="ปฤษฐา (SIMC-0029)" style={{ paddingLeft: 36 }} />
                    </div>
                    <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 9, marginTop: 4 }}>auto-fills email + phone from applicant record</div>
                  </div>
                  <EditField label="อีเมล" value="prittha.p@stw.ac.th" verified />
                  <EditField label="เบอร์ติดต่อ" value="082-345-6789" />
                  <EditField label="ช่องทางที่รายงาน" type="select" value="Web Form" options={["Web Form","Line OA","Email","Phone","อื่นๆ"]} />
                  <EditField label="พบปัญหาใน URL / หน้า" value="/exam/question/23" mono icon="key" full />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div className="label-thin">Browser / Device</div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["Chrome 119","macOS Sonoma","Safari iOS","Android 14","Edge","Firefox","อื่นๆ"].map((b, i) => (
                        <span key={i} className={i < 2 ? "chip chip-teal" : "chip"} style={{ cursor: "pointer" }}>{i < 2 && <span className="chip-dot" />}{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FormCard>

              {/* Attachments */}
              <FormCard title="ไฟล์แนบ" subtitle="Attachments · screenshots / logs" badge="OPTIONAL">
                <div style={{
                  padding: "32px 24px", borderRadius: 16,
                  border: "2px dashed var(--glass-border)",
                  background: "rgba(10,3,6,0.3)",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  cursor: "pointer",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: "rgba(255,236,155,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--gold)",
                  }}>
                    <Icon name="download" size={22} />
                  </div>
                  <div className="display" style={{ fontSize: 14, color: "var(--cream)" }}>ลากไฟล์มาวาง · หรือคลิกเพื่อเลือก</div>
                  <div style={{ fontSize: 11, color: "var(--ink-mute)" }}>รองรับ PNG / JPG / PDF / MP4 · ไม่เกิน 25 MB/ไฟล์</div>
                </div>

                {/* Already attached */}
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["screenshot-exam-stuck.png", "1.2 MB", "image"],
                    ["console-log.txt", "8 KB", "log"],
                  ].map(([n, s, k], i) => (
                    <div key={i} style={{
                      padding: "10px 14px", borderRadius: 10,
                      background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)",
                      display: "flex", alignItems: "center", gap: 12,
                    }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 8,
                        background: "rgba(255,236,155,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon name={k === "image" ? "sticker" : "feather"} size={16} stroke="var(--gold)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: "var(--cream)" }}>{n}</div>
                        <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 10, marginTop: 2 }}>{s} · อัปโหลดเสร็จ</div>
                      </div>
                      <span style={{ width: 20, height: 20, borderRadius: 999, border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-mute)", cursor: "pointer", fontSize: 14 }}>×</span>
                    </div>
                  ))}
                </div>
              </FormCard>
            </div>

            {/* Right rail — Assignment + Notifications */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="glass-strong" style={{ padding: 20, borderRadius: 18 }}>
                <div className="mono" style={{ color: "var(--gold)", marginBottom: 14 }}>มอบหมาย</div>
                <div className="label-thin">ผู้รับผิดชอบ</div>
                <div style={{
                  padding: "10px 12px", borderRadius: 10,
                  background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 999, background: "linear-gradient(135deg, var(--teal), var(--primary))", border: "1px solid var(--gold)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "var(--cream)" }}>พี่ส้ม</div>
                    <div style={{ fontSize: 10, color: "var(--ink-mute)" }}>admin · academic</div>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--gold)", cursor: "pointer" }}>เปลี่ยน</span>
                </div>

                <div className="label-thin" style={{ marginTop: 14 }}>ทีมที่เกี่ยวข้อง</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {[
                    ["Academic", true],
                    ["Bonding", false],
                    ["IT / Dev", true],
                    ["PR", false],
                  ].map(([t, on], i) => (
                    <span key={i} className={on ? "chip chip-red" : "chip"} style={{ cursor: "pointer" }}>{on && <span className="chip-dot" />}{t}</span>
                  ))}
                </div>

                <div className="label-thin" style={{ marginTop: 14 }}>SLA · กำหนดเสร็จ</div>
                <input className="input" defaultValue="18 ต.ค. 2569 · 18:00" />
              </div>

              {/* Labels */}
              <div className="glass" style={{ padding: 20, borderRadius: 18 }}>
                <div className="mono" style={{ color: "var(--gold)", marginBottom: 14 }}>Labels</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["exam-timer","needs-dev","reproducible"].map((t, i) => (
                    <span key={i} className="chip" style={{ fontSize: 10 }}>{t} <span style={{ marginLeft: 4, color: "var(--ink-mute)" }}>×</span></span>
                  ))}
                </div>
                <input className="input" placeholder="+ เพิ่ม label..." style={{ marginTop: 10, fontSize: 12, padding: "8px 12px" }} />
                <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  <span className="mono" style={{ color: "var(--ink-mute)", width: "100%", marginBottom: 4 }}>SUGGESTED</span>
                  {["session-bug","data-loss","ui-bug","performance","mobile-only"].map((t, i) => (
                    <span key={i} style={{
                      padding: "3px 10px", borderRadius: 999, fontSize: 10,
                      color: "var(--ink-mute)", background: "transparent", border: "1px dashed var(--glass-border)",
                      cursor: "pointer", fontFamily: "var(--f-mono)",
                    }}>+ {t}</span>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="glass" style={{ padding: 20, borderRadius: 18 }}>
                <div className="mono" style={{ color: "var(--gold)", marginBottom: 14 }}>การแจ้งเตือน</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    ["ส่งอีเมลให้ผู้รายงาน", true],
                    ["แจ้งทีม IT ใน Line", true],
                    ["แจ้งใน #ops channel", false],
                    ["สร้าง calendar reminder", false],
                  ].map(([l, on], i) => (
                    <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "var(--ink-2)", cursor: "pointer" }}>
                      <span style={{
                        width: 32, height: 18, borderRadius: 999,
                        background: on ? "var(--gold)" : "rgba(255,247,226,0.1)",
                        position: "relative", transition: "background var(--t-fast)",
                      }}>
                        <span style={{
                          position: "absolute", top: 2, left: on ? 16 : 2,
                          width: 14, height: 14, borderRadius: 999, background: on ? "#2a0a0c" : "var(--cream)",
                          transition: "left var(--t-fast)",
                        }} />
                      </span>
                      <span>{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Linked tickets */}
              <div className="glass" style={{ padding: 20, borderRadius: 18 }}>
                <div className="mono" style={{ color: "var(--gold)", marginBottom: 10 }}>ลิงก์กับ ticket อื่น</div>
                <input className="input" placeholder="ค้นหา PROB-..." style={{ fontSize: 12, padding: "8px 12px" }} />
                <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)" }}>
                  <div className="mono" style={{ color: "var(--gold)" }}>PROB-0138</div>
                  <div style={{ fontSize: 11, color: "var(--ink-2)", marginTop: 4 }}>คะแนนไม่อัปเดต...</div>
                  <span style={{ marginLeft: "auto", float: "right", fontSize: 10, color: "var(--ink-mute)", cursor: "pointer" }}>×</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer sticky action */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 22px", borderRadius: 16,
            background: "rgba(10,3,6,0.6)", border: "1px solid var(--glass-border-strong)",
            backdropFilter: "blur(20px)",
          }}>
            <div className="mono" style={{ color: "var(--ink-mute)" }}>กรอกข้อมูล <span style={{ color: "var(--gold)" }}>6 / 8</span> ฟิลด์ที่จำเป็น</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn">ยกเลิก</button>
              <button className="btn">บันทึกเป็น Draft</button>
              <button className="btn btn-primary"><Icon name="check" size={12} /> สร้าง Ticket</button>
            </div>
          </div>
        </div>
    </div>
  );
}