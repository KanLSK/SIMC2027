// @ts-nocheck
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField } from '@/components/admin/AdminUI';

export default function EditApplicantPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, minHeight: 0 }}>
          {/* Breadcrumb + actions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="mono" style={{ color: "var(--ink-mute)" }}>
                <span style={{ cursor: "pointer" }}>Admin</span> · <span style={{ cursor: "pointer" }}>Applicants</span> · <span style={{ color: "var(--gold)" }}>SIMC-0024</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4 }}>
                <button className="btn btn-sm"><Icon name="arrow-left" size={12} /> ย้อนกลับ</button>
                <div className="display" style={{ fontSize: 26, color: "var(--cream)" }}>วรรณนิดา ปานทอง</div>
                <StatusPill status="Reviewed" />
                <TierPill tier="A" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="chip"><span className="chip-dot" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} /> Unsaved changes · 3</span>
              <div style={{ width: 1, height: 28, background: "var(--glass-border)", margin: "0 4px" }} />
              <button className="btn btn-sm"><Icon name="download" size={12} /> Export PDF</button>
              <button className="btn btn-sm">ดูประวัติแก้ไข</button>
              <button className="btn btn-sm">ยกเลิก</button>
              <button className="btn btn-primary btn-sm"><Icon name="check" size={12} /> บันทึก</button>
            </div>
          </div>

          {/* Two-column body */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, minHeight: 0, flex: 1 }} className="scroll-y">
            {/* Left: form sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Personal info */}
              <FormCard title="ข้อมูลส่วนตัว" subtitle="Personal Information" badge="REQUIRED">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  <EditField label="เลขบัตรประชาชน" value="1 1010 02345 67 8" mono icon="fingerprint" verified hint="ตรวจสอบกับ DOPA แล้ว" />
                  <EditField label="ชื่อจริง (ไทย)" value="วรรณนิดา" />
                  <EditField label="นามสกุล (ไทย)" value="ปานทอง" />
                  <EditField label="First name (EN)" value="Wannida" />
                  <EditField label="Last name (EN)" value="Panthong" />
                  <EditField label="ชื่อเล่น" value="ฟ้า" />
                  <EditField label="วันเกิด" value="14 มีนาคม 2551" />
                  <EditField label="เพศ" type="select" value="หญิง" options={["ชาย","หญิง","LGBTQIA+","ไม่ระบุ"]} />
                  <EditField label="หมู่เลือด" type="select" value="O+" options={["A+","A-","B+","B-","AB+","AB-","O+","O-","ไม่ทราบ"]} />
                </div>
              </FormCard>

              {/* Education */}
              <FormCard title="ข้อมูลการศึกษา" subtitle="Education" badge="REQUIRED">
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14 }}>
                  <EditField label="โรงเรียน" value="สวนกุหลาบวิทยาลัย" hint="ค้นหาจากฐานข้อมูล" icon="magnify" />
                  <EditField label="ระดับชั้น" type="select" value="ม.6" options={["ม.4","ม.5","ม.6","อื่น ๆ"]} />
                  <EditField label="แผนการเรียน" type="select" value="วิทย์-คณิต" options={["วิทย์-คณิต","ศิลป์-คำนวณ","ศิลป์-ภาษา","อื่น ๆ"]} />
                  <EditField label="GPAX" value="3.85" />
                  <EditField label="GPA วิทยาศาสตร์" value="3.92" />
                  <EditField label="GPA คณิตศาสตร์" value="3.88" />
                </div>
              </FormCard>

              {/* Contact */}
              <FormCard title="ข้อมูลติดต่อ" subtitle="Contact" badge="VERIFIED">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <EditField label="อีเมล" value="wannida.p@skw.ac.th" verified />
                  <EditField label="เบอร์โทรศัพท์" value="082-345-6789" verified hint="OTP confirmed" />
                  <EditField label="ที่อยู่" value="123/45 ถนนกัลปพฤกษ์ บางพลัด" full />
                  <EditField label="แขวง/ตำบล" value="บางอ้อ" />
                  <EditField label="เขต/อำเภอ" value="บางพลัด" />
                  <EditField label="จังหวัด" value="กรุงเทพมหานคร" />
                  <EditField label="รหัสไปรษณีย์" value="10700" mono />
                </div>
              </FormCard>

              {/* Emergency */}
              <FormCard title="ผู้ปกครอง / Emergency Contact" subtitle="Guardian" badge="OPTIONAL">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  <EditField label="ชื่อ-นามสกุล" value="นางอัจฉรา ปานทอง" />
                  <EditField label="ความสัมพันธ์" type="select" value="แม่" options={["พ่อ","แม่","ญาติ","ผู้ปกครองอื่น ๆ"]} />
                  <EditField label="เบอร์โทรศัพท์" value="081-234-5678" />
                </div>
              </FormCard>

              {/* Health */}
              <FormCard title="ข้อมูลสุขภาพ" subtitle="Health & Allergy" badge="CONFIDENTIAL" tone="red">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <EditField label="โรคประจำตัว" value="ไม่มี" />
                  <EditField label="แพ้อาหาร / ยา" value="แพ้อาหารทะเล" />
                  <EditField label="ยาที่ใช้ประจำ" value="-" />
                  <EditField label="ข้อจำกัดด้านอาหาร" type="select" value="ไม่มี" options={["ไม่มี","มังสวิรัติ","เจ","ฮาลาล","อื่น ๆ"]} />
                </div>
              </FormCard>

              {/* Application status (admin only) */}
              <FormCard title="สถานะการสมัคร" subtitle="Admin only · audit trail" badge="ADMIN" tone="gold">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
                  <EditField label="คะแนนสอบ" value="92" mono />
                  <EditField label="Tier" type="select" value="A" options={["A","B","C","D"]} />
                  <EditField label="สถานะ" type="select" value="Reviewed" options={["Reviewed","Pending","Flagged","Withdrawn"]} />
                  <EditField label="ผู้ตรวจ" value="พี่ส้ม" />
                </div>
                <div style={{ marginTop: 14 }}>
                  <div className="label-thin">หมายเหตุภายใน · Admin notes</div>
                  <div style={{
                    background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)",
                    borderRadius: 12, padding: 14, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.65,
                  }}>
                    ผู้สมัครมี Personal Statement ที่ลึกซึ้ง — มีประสบการณ์จากการดูแลคุณยายที่ป่วยเป็น dementia · <span style={{ background: "rgba(255,236,155,0.15)", color: "var(--gold)" }}>เหมาะกับสายเวชศาสตร์ผู้สูงอายุ</span> · GPA วิทยาศาสตร์สูงเด่น
                  </div>
                </div>
              </FormCard>
            </div>

            {/* Right rail */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Profile card */}
              <div className="glass-strong" style={{ padding: 22, borderRadius: 20, textAlign: "center" }}>
                <div style={{
                  width: 96, height: 96, borderRadius: 999, margin: "0 auto 14px",
                  background: "linear-gradient(135deg, var(--teal), var(--primary))",
                  border: "2px solid var(--gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--cream)", fontSize: 36, fontFamily: "var(--f-display)", fontWeight: 600,
                }}>ฟ</div>
                <div className="display" style={{ fontSize: 17, color: "var(--cream)" }}>วรรณนิดา ปานทอง</div>
                <div className="mono" style={{ color: "var(--gold)", marginTop: 4 }}>SIMC-0024 · ม.6</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
                  <StatusPill status="Reviewed" />
                  <TierPill tier="A" />
                </div>
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--glass-border)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 11 }}>
                  <div>
                    <div className="mono" style={{ color: "var(--ink-mute)" }}>SCORE</div>
                    <div className="display" style={{ fontSize: 18, color: "var(--gold)" }}>92</div>
                  </div>
                  <div>
                    <div className="mono" style={{ color: "var(--ink-mute)" }}>RANK</div>
                    <div className="display" style={{ fontSize: 18, color: "var(--cream)" }}>#14</div>
                  </div>
                </div>
              </div>

              {/* Quick documents */}
              <div className="glass" style={{ padding: 18, borderRadius: 18 }}>
                <div className="mono" style={{ color: "var(--gold)" }}>เอกสารแนบ · 4 ไฟล์</div>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["สำเนาบัตรประชาชน.pdf", "1.2 MB", true],
                    ["ผลการเรียน ม.4-6.pdf", "840 KB", true],
                    ["รูปถ่ายหน้าตรง.jpg", "320 KB", true],
                    ["Personal Statement.docx", "120 KB", false],
                  ].map(([n, s, ok], i) => (
                    <div key={i} style={{
                      padding: "10px 12px", borderRadius: 10,
                      background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <Icon name="feather" size={14} stroke={ok ? "var(--gold)" : "var(--ink-mute)"} />
                      <div style={{ flex: 1, fontSize: 12, color: "var(--ink-2)" }}>
                        <div>{n}</div>
                        <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 10, marginTop: 2 }}>{s}</div>
                      </div>
                      {ok ? <Icon name="check" size={14} stroke="rgba(159,209,211,1)" /> : <span className="chip chip-red" style={{ fontSize: 9 }}>missing</span>}
                    </div>
                  ))}
                </div>
                <button className="btn btn-sm" style={{ marginTop: 12, width: "100%" }}><Icon name="download" size={12} /> ดาวน์โหลดทั้งหมด</button>
              </div>

              {/* Audit log */}
              <div className="glass" style={{ padding: 18, borderRadius: 18 }}>
                <div className="mono" style={{ color: "var(--gold)" }}>Audit log</div>
                <div style={{ marginTop: 12, position: "relative", paddingLeft: 16 }}>
                  <div style={{ position: "absolute", left: 4, top: 6, bottom: 6, width: 1, background: "var(--glass-border)" }} />
                  {[
                    ["12:34", "เปลี่ยน school", "พี่ส้ม"],
                    ["12:18", "review applicant", "พี่ส้ม"],
                    ["10:02", "อัปโหลดเอกสาร", "ผู้สมัคร"],
                    ["09:45", "ส่งใบสมัคร", "ผู้สมัคร"],
                    ["09:12", "เริ่มกรอกใบสมัคร", "ผู้สมัคร"],
                  ].map(([t, l, by], i) => (
                    <div key={i} style={{ position: "relative", padding: "8px 0", borderBottom: i < 4 ? "1px dashed var(--glass-border)" : undefined }}>
                      <span style={{ position: "absolute", left: -16, top: 14, width: 8, height: 8, borderRadius: 999, background: i === 0 ? "var(--gold)" : "var(--ink-faint)", boxShadow: i === 0 ? "0 0 8px var(--gold)" : undefined }} />
                      <div className="mono" style={{ color: "var(--ink-mute)" }}>{t}</div>
                      <div style={{ fontSize: 12.5, color: "var(--cream)", marginTop: 2 }}>{l}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-mute)" }}>โดย {by}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger zone */}
              <div className="glass" style={{ padding: 18, borderRadius: 18, border: "1px solid rgba(198,27,16,0.4)" }}>
                <div className="mono" style={{ color: "#ff7783" }}>Danger zone</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-mute)", marginTop: 8, lineHeight: 1.55 }}>
                  การลบหรือ flag จะส่งอีเมลแจ้งผู้สมัครและบันทึกใน audit log
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button className="btn btn-sm" style={{ flex: 1, borderColor: "rgba(198,27,16,0.4)", color: "#ff9f9f" }}>Flag</button>
                  <button className="btn btn-sm" style={{ flex: 1, borderColor: "rgba(198,27,16,0.4)", color: "#ff9f9f" }}>ลบใบสมัคร</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}