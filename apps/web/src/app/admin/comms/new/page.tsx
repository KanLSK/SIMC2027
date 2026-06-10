// @ts-nocheck
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField } from '@/components/admin/AdminUI';

export default function NewIssuePage() {
  return (
    <div  className="flex flex-col gap-[18px]">
        {/* Main form */}
        <div style={{ overflow: "auto" }} className="flex flex-col gap-[18px] scroll-y">
          {/* Header */}
          <div  className="flex justify-between items-start">
            <div>
              <div className="mono" style={{ color: "var(--ink-mute)" }}>
                <span  className="cursor-pointer">Admin</span> · <span  className="cursor-pointer">User Problems</span> · <span style={{ color: "var(--gold)" }}>New Issue</span>
              </div>
              <div  className="flex items-center gap-[14px] mt-[4px]">
                <button className="btn btn-sm"><Icon name="arrow-left" size={12} /> ย้อนกลับ</button>
                <div style={{ color: "var(--cream)" }} className="display text-[26px]">เพิ่มปัญหาผู้ใช้ใหม่</div>
                <span className="chip"><span className="chip-dot" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} /> Draft</span>
              </div>
              <div  className="mt-[6px] text-[13px]" style={{ color: "var(--ink-mute)" }}>
                บันทึกปัญหาที่ผู้ใช้รายงาน เพื่อให้ทีมงานติดตามและแก้ไขได้อย่างเป็นระบบ
              </div>
            </div>
            <div  className="flex gap-[8px]">
              <button className="btn btn-sm">ยกเลิก</button>
              <button className="btn btn-sm">บันทึกเป็นแบบร่าง</button>
              <button className="btn btn-primary btn-sm"><Icon name="check" size={12} /> สร้าง Ticket</button>
            </div>
          </div>

          <div  className="grid gap-[18px]" style={{ gridTemplateColumns: "1fr 320px" }}>
            {/* Main column */}
            <div  className="flex flex-col gap-[16px]">
              {/* Quick templates */}
              <div className="glass p-[22px] rounded-[20px]">
                <div  className="flex items-center justify-between mb-[14px]">
                  <div>
                    <div style={{ color: "var(--cream)" }} className="display text-[16px]">เริ่มจากเทมเพลต</div>
                    <div  className="text-[12px] mt-[2px]" style={{ color: "var(--ink-mute)" }}>เลือกเทมเพลตเพื่อกรอกฟอร์มอัตโนมัติ — หรือกรอกเองด้านล่าง</div>
                  </div>
                  <span className="mono" style={{ color: "var(--ink-mute)" }}>OPTIONAL</span>
                </div>
                <div  className="grid gap-[10px]" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
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
                      <div style={{ color: "var(--cream)" }} className="display text-[13px] mt-[10px]">{t.l}</div>
                      <div  className="text-[11px] mt-[2px]" style={{ color: "var(--ink-mute)" }}>{t.c}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title */}
              <FormCard title="ข้อมูลหลัก" subtitle="Issue summary" badge="REQUIRED">
                <div  className="flex flex-col gap-[14px]">
                  <div>
                    <div className="label-thin">หัวข้อปัญหา</div>
                    <input placeholder="สรุปสั้นๆ เช่น ระบบสอบค้าง · ไม่นับเวลาให้" defaultValue="" style={{ fontFamily: "var(--f-display)" }}  className="input text-[16px]"/>
                    <div style={{ color: "var(--ink-mute)" }} className="mono text-[9px] mt-[4px]">0 / 120 ตัวอักษร</div>
                  </div>

                  <div>
                    <div className="label-thin">รายละเอียดปัญหา</div>
                    <div  className="rounded-[14px]" style={{ border: "1px solid var(--glass-border)", background: "rgba(10,3,6,0.4)" }}>
                      {/* Toolbar */}
                      <div  className="flex gap-[6px] items-center" style={{ padding: "8px 12px", borderBottom: "1px solid var(--glass-border)" }}>
                        {["B","I","U","•","1.","“","</>","🔗"].map((t, i) => (
                          <button key={i} style={{
                            padding: "4px 8px", borderRadius: 6, fontSize: 12,
                            background: "transparent", border: "none",
                            color: "var(--ink-mute)", cursor: "pointer", fontFamily: i === 0 || i === 2 ? "var(--f-body)" : "var(--f-mono)",
                            fontWeight: i === 0 ? 700 : 400, fontStyle: i === 1 ? "italic" : "normal", textDecoration: i === 2 ? "underline" : "none",
                          }}>{t}</button>
                        ))}
                        <span  className="text-[10px]" style={{ marginLeft: "auto", color: "var(--ink-faint)", fontFamily: "var(--f-mono)" }}>Markdown supported</span>
                      </div>
                      <textarea
                        rows={6}
                        placeholder={"อธิบายสิ่งที่เกิดขึ้น · ขั้นตอนที่ทำก่อนเจอปัญหา · ผลลัพธ์ที่คาดหวัง\n\nเช่น:\n1. กดส่งใบสมัครในขั้นตอนที่ 5\n2. หน้าเว็บโหลดค้างประมาณ 30 วินาที\n3. แสดง error 500 · ข้อมูลหาย"}
                         className="w-full bg-[transparent] border-[none]" style={{ padding: "14px 16px", resize: "vertical", outline: "none", color: "var(--cream)", fontFamily: "var(--f-body)", fontSize: "13.5", lineHeight: "1.7", minHeight: 160 }}
                        defaultValue=""
                      />
                    </div>
                    <div  className="flex justify-between text-[10px] mt-[4px]" style={{ color: "var(--ink-mute)", fontFamily: "var(--f-mono)" }}>
                      <span>💡 ใช้ /image เพื่อแทรกรูป · /code เพื่อใส่ block code</span>
                      <span>0 คำ</span>
                    </div>
                  </div>
                </div>
              </FormCard>

              {/* Classification */}
              <FormCard title="หมวดหมู่และความเร่งด่วน" subtitle="Category & Priority" badge="REQUIRED">
                <div  className="flex flex-col gap-[16px]">
                  <div>
                    <div className="label-thin">หมวดหมู่ของปัญหา</div>
                    <div  className="grid gap-[8px]" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
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
                          <div  className="text-[10px] mt-[2px]" style={{ color: "var(--ink-mute)" }}>{s}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="label-thin">ความเร่งด่วน</div>
                    <div  className="grid gap-[8px]" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
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
                          <div  className="flex-[1]">
                            <div style={{ fontSize: 13, color: p.active ? "var(--cream)" : "var(--ink-2)", fontWeight: 500 }}>{p.l}</div>
                            <div  className="text-[10px] mt-[2px]" style={{ color: "var(--ink-mute)" }}>{p.d}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="label-thin">สถานะเริ่มต้น</div>
                    <div  className="flex gap-[6px]">
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
                <div  className="grid gap-[14px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  <div>
                    <div className="label-thin">ค้นหาผู้สมัคร / ผู้ใช้</div>
                    <div  className="relative">
                      <span  className="absolute" style={{ left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-mute)" }}><Icon name="magnify" size={14} /></span>
                      <input defaultValue="ปฤษฐา (SIMC-0029)"  className="input pl-[36px]"/>
                    </div>
                    <div style={{ color: "var(--ink-mute)" }} className="mono text-[9px] mt-[4px]">auto-fills email + phone from applicant record</div>
                  </div>
                  <EditField label="อีเมล" value="prittha.p@stw.ac.th" verified />
                  <EditField label="เบอร์ติดต่อ" value="082-345-6789" />
                  <EditField label="ช่องทางที่รายงาน" type="select" value="Web Form" options={["Web Form","Line OA","Email","Phone","อื่นๆ"]} />
                  <EditField label="พบปัญหาใน URL / หน้า" value="/exam/question/23" mono icon="key" full />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div className="label-thin">Browser / Device</div>
                    <div  className="flex gap-[10px]" style={{ flexWrap: "wrap" }}>
                      {["Chrome 119","macOS Sonoma","Safari iOS","Android 14","Edge","Firefox","อื่นๆ"].map((b, i) => (
                        <span key={i} className={i < 2 ? "chip chip-teal cursor-pointer" : "chip cursor-pointer"}>{i < 2 && <span className="chip-dot" />}{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FormCard>

              {/* Attachments */}
              <FormCard title="ไฟล์แนบ" subtitle="Attachments · screenshots / logs" badge="OPTIONAL">
                <div  className="rounded-[16px] flex flex-col items-center gap-[10px] cursor-pointer" style={{ padding: "32px 24px", border: "2px dashed var(--glass-border)", background: "rgba(10,3,6,0.3)" }}>
                  <div  className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center" style={{ background: "rgba(255,236,155,0.12)", color: "var(--gold)" }}>
                    <Icon name="download" size={22} />
                  </div>
                  <div style={{ color: "var(--cream)" }} className="display text-[14px]">ลากไฟล์มาวาง · หรือคลิกเพื่อเลือก</div>
                  <div  className="text-[11px]" style={{ color: "var(--ink-mute)" }}>รองรับ PNG / JPG / PDF / MP4 · ไม่เกิน 25 MB/ไฟล์</div>
                </div>

                {/* Already attached */}
                <div  className="mt-[14px] flex flex-col gap-[8px]">
                  {[
                    ["screenshot-exam-stuck.png", "1.2 MB", "image"],
                    ["console-log.txt", "8 KB", "log"],
                  ].map(([n, s, k], i) => (
                    <div key={i}  className="rounded-[10px] flex items-center gap-[12px]" style={{ padding: "10px 14px", background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)" }}>
                      <div  className="w-[38px] h-[38px] rounded-[8px] flex items-center justify-center" style={{ background: "rgba(255,236,155,0.1)" }}>
                        <Icon name={k === "image" ? "sticker" : "feather"} size={16} stroke="var(--gold)" />
                      </div>
                      <div  className="flex-[1]">
                        <div  className="text-[13px]" style={{ color: "var(--cream)" }}>{n}</div>
                        <div style={{ color: "var(--ink-mute)" }} className="mono text-[10px] mt-[2px]">{s} · อัปโหลดเสร็จ</div>
                      </div>
                      <span  className="w-[20px] h-[20px] rounded-[999px] flex items-center justify-center cursor-pointer text-[14px]" style={{ border: "1px solid var(--glass-border)", color: "var(--ink-mute)" }}>×</span>
                    </div>
                  ))}
                </div>
              </FormCard>
            </div>

            {/* Right rail — Assignment + Notifications */}
            <div  className="flex flex-col gap-[14px]">
              <div className="glass-strong p-[20px] rounded-[18px]">
                <div style={{ color: "var(--gold)" }} className="mono mb-[14px]">มอบหมาย</div>
                <div className="label-thin">ผู้รับผิดชอบ</div>
                <div  className="rounded-[10px] flex items-center gap-[10px]" style={{ padding: "10px 12px", background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)" }}>
                  <div  className="w-[28px] h-[28px] rounded-[999px]" style={{ background: "linear-gradient(135deg, var(--teal), var(--primary))", border: "1px solid var(--gold)" }} />
                  <div  className="flex-[1]">
                    <div  className="text-[13px]" style={{ color: "var(--cream)" }}>พี่ส้ม</div>
                    <div  className="text-[10px]" style={{ color: "var(--ink-mute)" }}>admin · academic</div>
                  </div>
                  <span  className="text-[12px] cursor-pointer" style={{ color: "var(--gold)" }}>เปลี่ยน</span>
                </div>

                <div className="label-thin mt-[14px]">ทีมที่เกี่ยวข้อง</div>
                <div  className="flex gap-[6px]" style={{ flexWrap: "wrap" }}>
                  {[
                    ["Academic", true],
                    ["Bonding", false],
                    ["IT / Dev", true],
                    ["PR", false],
                  ].map(([t, on], i) => (
                    <span key={i} className={on ? "chip chip-red cursor-pointer" : "chip cursor-pointer"}>{on && <span className="chip-dot" />}{t}</span>
                  ))}
                </div>

                <div className="label-thin mt-[14px]">SLA · กำหนดเสร็จ</div>
                <input className="input" defaultValue="18 ต.ค. 2569 · 18:00" />
              </div>

              {/* Labels */}
              <div className="glass p-[20px] rounded-[18px]">
                <div style={{ color: "var(--gold)" }} className="mono mb-[14px]">Labels</div>
                <div  className="flex gap-[6px]" style={{ flexWrap: "wrap" }}>
                  {["exam-timer","needs-dev","reproducible"].map((t, i) => (
                    <span key={i} className="chip text-[10px]">{t} <span  className="ml-[4px]" style={{ color: "var(--ink-mute)" }}>×</span></span>
                  ))}
                </div>
                <input placeholder="+ เพิ่ม label..." style={{ padding: "8px 12px" }}  className="input mt-[10px] text-[12px]"/>
                <div  className="mt-[10px] flex gap-[6px]" style={{ flexWrap: "wrap" }}>
                  <span style={{ color: "var(--ink-mute)" }} className="mono w-full mb-[4px]">SUGGESTED</span>
                  {["session-bug","data-loss","ui-bug","performance","mobile-only"].map((t, i) => (
                    <span key={i}  className="rounded-[999px] text-[10px] bg-[transparent] cursor-pointer" style={{ padding: "3px 10px", color: "var(--ink-mute)", border: "1px dashed var(--glass-border)", fontFamily: "var(--f-mono)" }}>+ {t}</span>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="glass p-[20px] rounded-[18px]">
                <div style={{ color: "var(--gold)" }} className="mono mb-[14px]">การแจ้งเตือน</div>
                <div  className="flex flex-col gap-[10px]">
                  {[
                    ["ส่งอีเมลให้ผู้รายงาน", true],
                    ["แจ้งทีม IT ใน Line", true],
                    ["แจ้งใน #ops channel", false],
                    ["สร้าง calendar reminder", false],
                  ].map(([l, on], i) => (
                    <label key={i}  className="flex items-center gap-[10px] cursor-pointer" style={{ fontSize: "12.5", color: "var(--ink-2)" }}>
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
              <div className="glass p-[20px] rounded-[18px]">
                <div style={{ color: "var(--gold)" }} className="mono mb-[10px]">ลิงก์กับ ticket อื่น</div>
                <input placeholder="ค้นหา PROB-..." style={{ padding: "8px 12px" }}  className="input text-[12px]"/>
                <div  className="mt-[10px] rounded-[10px]" style={{ padding: "8px 12px", background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)" }}>
                  <div className="mono" style={{ color: "var(--gold)" }}>PROB-0138</div>
                  <div  className="text-[11px] mt-[4px]" style={{ color: "var(--ink-2)" }}>คะแนนไม่อัปเดต...</div>
                  <span  className="text-[10px] cursor-pointer" style={{ marginLeft: "auto", float: "right", color: "var(--ink-mute)" }}>×</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer sticky action */}
          <div  className="flex justify-between items-center rounded-[16px]" style={{ padding: "16px 22px", background: "rgba(10,3,6,0.6)", border: "1px solid var(--glass-border-strong)", backdropFilter: "blur(20px)" }}>
            <div className="mono" style={{ color: "var(--ink-mute)" }}>กรอกข้อมูล <span style={{ color: "var(--gold)" }}>6 / 8</span> ฟิลด์ที่จำเป็น</div>
            <div  className="flex gap-[10px]">
              <button className="btn">ยกเลิก</button>
              <button className="btn">บันทึกเป็น Draft</button>
              <button className="btn btn-primary"><Icon name="check" size={12} /> สร้าง Ticket</button>
            </div>
          </div>
        </div>
    </div>
  );
}