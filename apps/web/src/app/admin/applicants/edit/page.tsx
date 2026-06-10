// @ts-nocheck
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField } from '@/components/admin/AdminUI';

export default function EditApplicantPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div  className="flex flex-col gap-[18px]">
        {/* Main */}
        <div  className="flex flex-col gap-[18px]" style={{ minHeight: 0 }}>
          {/* Breadcrumb + actions */}
          <div  className="flex justify-between items-center">
            <div>
              <div className="mono" style={{ color: "var(--ink-mute)" }}>
                <span  className="cursor-pointer">Admin</span> · <span  className="cursor-pointer">Applicants</span> · <span style={{ color: "var(--gold)" }}>SIMC-0024</span>
              </div>
              <div  className="flex items-center gap-[14px] mt-[4px]">
                <Link href="/admin/applicants" className="btn btn-sm"><Icon name="arrow-left" size={12} /> ย้อนกลับ</Link>
                <div style={{ color: "var(--cream)" }} className="display text-[26px]">วรรณนิดา ปานทอง</div>
                <StatusPill status="Reviewed" />
                <TierPill tier="A" />
              </div>
            </div>
            <div  className="flex items-center gap-[8px]">
              {isEditing && (
                <>
                  <span className="chip"><span className="chip-dot" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} /> Unsaved changes</span>
                  <div  className="w-[1px] h-[28px]" style={{ background: "var(--glass-border)", margin: "0 4px" }} />
                </>
              )}
              <button className="btn btn-sm"><Icon name="download" size={12} /> Export PDF</button>
              <button className="btn btn-sm">ดูประวัติแก้ไข</button>
              {isEditing ? (
                <>
                  <button className="btn btn-sm" onClick={() => setIsEditing(false)}><Icon name="close" size={12} /> ยกเลิก</button>
                  <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(false)}><Icon name="check" size={12} /> บันทึก</button>
                </>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}><Icon name="edit" size={12} /> แก้ไข</button>
              )}
            </div>
          </div>

          {/* Two-column body */}
          <div style={{ gridTemplateColumns: "1fr 320px", minHeight: 0 }} className="grid gap-[18px] flex-[1] scroll-y">
            {/* Left: form sections */}
            <div  className="flex flex-col gap-[18px]">
              {/* Personal info */}
              <FormCard title="ข้อมูลส่วนตัว" subtitle="Personal Information" badge="REQUIRED">
                <div  className="grid gap-[14px]" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <EditField disabled={!isEditing} label="เลขบัตรประชาชน" value="1 1010 02345 67 8" mono icon="fingerprint" verified hint="ตรวจสอบกับ DOPA แล้ว" />
                  <EditField disabled={!isEditing} label="ชื่อจริง (ไทย)" value="วรรณนิดา" />
                  <EditField disabled={!isEditing} label="นามสกุล (ไทย)" value="ปานทอง" />
                  <EditField disabled={!isEditing} label="First name (EN)" value="Wannida" />
                  <EditField disabled={!isEditing} label="Last name (EN)" value="Panthong" />
                  <EditField disabled={!isEditing} label="ชื่อเล่น" value="ฟ้า" />
                  <EditField disabled={!isEditing} label="วันเกิด" value="14 มีนาคม 2551" />
                  <EditField disabled={!isEditing} label="เพศ" type="select" value="หญิง" options={["ชาย","หญิง","LGBTQIA+","ไม่ระบุ"]} />
                  <EditField disabled={!isEditing} label="หมู่เลือด" type="select" value="O+" options={["A+","A-","B+","B-","AB+","AB-","O+","O-","ไม่ทราบ"]} />
                </div>
              </FormCard>

              {/* Education */}
              <FormCard title="ข้อมูลการศึกษา" subtitle="Education" badge="REQUIRED">
                <div  className="grid gap-[14px]" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
                  <EditField disabled={!isEditing} label="โรงเรียน" value="สวนกุหลาบวิทยาลัย" hint="ค้นหาจากฐานข้อมูล" icon="magnify" />
                  <EditField disabled={!isEditing} label="ระดับชั้น" type="select" value="ม.6" options={["ม.4","ม.5","ม.6","อื่น ๆ"]} />
                  <EditField disabled={!isEditing} label="แผนการเรียน" type="select" value="วิทย์-คณิต" options={["วิทย์-คณิต","ศิลป์-คำนวณ","ศิลป์-ภาษา","อื่น ๆ"]} />
                  <EditField disabled={!isEditing} label="GPAX" value="3.85" />
                  <EditField disabled={!isEditing} label="GPA วิทยาศาสตร์" value="3.92" />
                  <EditField disabled={!isEditing} label="GPA คณิตศาสตร์" value="3.88" />
                </div>
              </FormCard>

              {/* Contact */}
              <FormCard title="ข้อมูลติดต่อ" subtitle="Contact" badge="VERIFIED">
                <div  className="grid gap-[14px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  <EditField disabled={!isEditing} label="อีเมล" value="wannida.p@skw.ac.th" verified />
                  <EditField disabled={!isEditing} label="เบอร์โทรศัพท์" value="082-345-6789" verified hint="OTP confirmed" />
                  <EditField disabled={!isEditing} label="ที่อยู่" value="123/45 ถนนกัลปพฤกษ์ บางพลัด" full />
                  <EditField disabled={!isEditing} label="แขวง/ตำบล" value="บางอ้อ" />
                  <EditField disabled={!isEditing} label="เขต/อำเภอ" value="บางพลัด" />
                  <EditField disabled={!isEditing} label="จังหวัด" value="กรุงเทพมหานคร" />
                  <EditField disabled={!isEditing} label="รหัสไปรษณีย์" value="10700" mono />
                </div>
              </FormCard>

              {/* Emergency */}
              <FormCard title="ผู้ปกครอง / Emergency Contact" subtitle="Guardian" badge="OPTIONAL">
                <div  className="grid gap-[14px]" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <EditField disabled={!isEditing} label="ชื่อ-นามสกุล" value="นางอัจฉรา ปานทอง" />
                  <EditField disabled={!isEditing} label="ความสัมพันธ์" type="select" value="แม่" options={["พ่อ","แม่","ญาติ","ผู้ปกครองอื่น ๆ"]} />
                  <EditField disabled={!isEditing} label="เบอร์โทรศัพท์" value="081-234-5678" />
                </div>
              </FormCard>

              {/* Health */}
              <FormCard title="ข้อมูลสุขภาพ" subtitle="Health & Allergy" badge="CONFIDENTIAL" tone="red">
                <div  className="grid gap-[14px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  <EditField disabled={!isEditing} label="โรคประจำตัว" value="ไม่มี" />
                  <EditField disabled={!isEditing} label="แพ้อาหาร / ยา" value="แพ้อาหารทะเล" />
                  <EditField disabled={!isEditing} label="ยาที่ใช้ประจำ" value="-" />
                  <EditField disabled={!isEditing} label="ข้อจำกัดด้านอาหาร" type="select" value="ไม่มี" options={["ไม่มี","มังสวิรัติ","เจ","ฮาลาล","อื่น ๆ"]} />
                </div>
              </FormCard>

              {/* Application status (admin only) */}
              <FormCard title="สถานะการสมัคร" subtitle="Admin only · audit trail" badge="ADMIN" tone="gold">
                <div  className="grid gap-[14px]" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                  <EditField disabled={!isEditing} label="คะแนนสอบ" value="92" mono />
                  <EditField disabled={!isEditing} label="Tier" type="select" value="A" options={["A","B","C","D"]} />
                  <EditField label="สถานะ" type="select" value="Reviewed" options={["Reviewed","Pending","Flagged","Withdrawn"]} />
                  <EditField label="ผู้ตรวจ" value="พี่ส้ม" />
                </div>
                <div  className="mt-[14px]">
                  <div className="label-thin">หมายเหตุภายใน · Admin notes</div>
                  <div  className="rounded-[12px] p-[14px] text-[13px]" style={{ background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)", color: "var(--ink-2)", lineHeight: "1.65" }}>
                    ผู้สมัครมี Personal Statement ที่ลึกซึ้ง — มีประสบการณ์จากการดูแลคุณยายที่ป่วยเป็น dementia · <span style={{ background: "rgba(255,236,155,0.15)", color: "var(--gold)" }}>เหมาะกับสายเวชศาสตร์ผู้สูงอายุ</span> · GPA วิทยาศาสตร์สูงเด่น
                  </div>
                </div>
              </FormCard>
            </div>

            {/* Right rail */}
            <div  className="flex flex-col gap-[14px]">
              {/* Profile card */}
              <div className="glass-strong p-[22px] rounded-[20px] text-center">
                <div  className="w-[96px] h-[96px] rounded-[999px] flex items-center justify-center text-[36px] font-[600]" style={{ margin: "0 auto 14px", background: "linear-gradient(135deg, var(--teal), var(--primary))", border: "2px solid var(--gold)", color: "var(--cream)", fontFamily: "var(--f-display)" }}>ฟ</div>
                <div style={{ color: "var(--cream)" }} className="display text-[17px]">วรรณนิดา ปานทอง</div>
                <div style={{ color: "var(--gold)" }} className="mono mt-[4px]">SIMC-0024 · ม.6</div>
                <div  className="flex justify-center gap-[6px] mt-[12px]">
                  <StatusPill status="Reviewed" />
                  <TierPill tier="A" />
                </div>
                <div  className="mt-[14px] pt-[14px] grid gap-[10px] text-[11px]" style={{ borderTop: "1px solid var(--glass-border)", gridTemplateColumns: "1fr 1fr" }}>
                  <div>
                    <div className="mono" style={{ color: "var(--ink-mute)" }}>SCORE</div>
                    <div style={{ color: "var(--gold)" }} className="display text-[18px]">92</div>
                  </div>
                  <div>
                    <div className="mono" style={{ color: "var(--ink-mute)" }}>RANK</div>
                    <div style={{ color: "var(--cream)" }} className="display text-[18px]">#14</div>
                  </div>
                </div>
              </div>

              {/* Quick documents */}
              <div className="glass p-[18px] rounded-[18px]">
                <div className="mono" style={{ color: "var(--gold)" }}>เอกสารแนบ · 4 ไฟล์</div>
                <div  className="mt-[12px] flex flex-col gap-[8px]">
                  {[
                    ["สำเนาบัตรประชาชน.pdf", "1.2 MB", true],
                    ["ผลการเรียน ม.4-6.pdf", "840 KB", true],
                    ["รูปถ่ายหน้าตรง.jpg", "320 KB", true],
                    ["Personal Statement.docx", "120 KB", false],
                  ].map(([n, s, ok], i) => (
                    <div key={i}  className="rounded-[10px] flex items-center gap-[10px]" style={{ padding: "10px 12px", background: "rgba(10,3,6,0.4)", border: "1px solid var(--glass-border)" }}>
                      <Icon name="feather" size={14} stroke={ok ? "var(--gold)" : "var(--ink-mute)"} />
                      <div  className="flex-[1] text-[12px]" style={{ color: "var(--ink-2)" }}>
                        <div>{n}</div>
                        <div style={{ color: "var(--ink-mute)" }} className="mono text-[10px] mt-[2px]">{s}</div>
                      </div>
                      {ok ? <Icon name="check" size={14} stroke="rgba(159,209,211,1)" /> : <span className="chip chip-red text-[9px]">missing</span>}
                    </div>
                  ))}
                </div>
                <button className="btn btn-sm mt-[12px] w-full"><Icon name="download" size={12} /> ดาวน์โหลดทั้งหมด</button>
              </div>

              {/* Audit log */}
              <div className="glass p-[18px] rounded-[18px]">
                <div className="mono" style={{ color: "var(--gold)" }}>Audit log</div>
                <div  className="mt-[12px] relative pl-[16px]">
                  <div  className="absolute w-[1px]" style={{ left: 4, top: 6, bottom: 6, background: "var(--glass-border)" }} />
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
                      <div  className="mt-[2px]" style={{ fontSize: "12.5", color: "var(--cream)" }}>{l}</div>
                      <div  className="text-[11px]" style={{ color: "var(--ink-mute)" }}>โดย {by}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger zone */}
              <div style={{ border: "1px solid rgba(198,27,16,0.4)" }} className="glass p-[18px] rounded-[18px]">
                <div className="mono text-[#ff7783]">Danger zone</div>
                <div  className="mt-[8px]" style={{ fontSize: "11.5", color: "var(--ink-mute)", lineHeight: "1.55" }}>
                  การลบหรือ flag จะส่งอีเมลแจ้งผู้สมัครและบันทึกใน audit log
                </div>
                <div  className="flex gap-[8px] mt-[12px]">
                  <button style={{ borderColor: "rgba(198,27,16,0.4)" }} className="btn btn-sm flex-[1] text-[#ff9f9f]">Flag</button>
                  <button style={{ borderColor: "rgba(198,27,16,0.4)" }} className="btn btn-sm flex-[1] text-[#ff9f9f]">ลบใบสมัคร</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}