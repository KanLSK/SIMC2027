// @ts-nocheck
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField, viewToggleStyle } from '@/components/admin/AdminUI';

export default function ApplicantsListPage() {
  const applicants = [
    { id: "SIMC-0024", name: "วรรณนิดา ปานทอง", nick: "ฟ้า", school: "สวนกุหลาบวิทยาลัย", level: "ม.6", region: "กรุงเทพฯ", score: 92, status: "Reviewed", tier: "A", gender: "F", color: "#356B6D" },
    { id: "SIMC-0026", name: "อนัญพร ศรีศักดิ์", nick: "พีช", school: "Mater Dei", level: "ม.6", region: "กรุงเทพฯ", score: 95, status: "Reviewed", tier: "A", gender: "F", color: "#8F0F1B" },
    { id: "SIMC-0031", name: "ลลิตภัทร แซ่ลิ้ม", nick: "ลิตา", school: "วัฒนาวิทยาลัย", level: "ม.6", region: "กรุงเทพฯ", score: 90, status: "Reviewed", tier: "A", gender: "F", color: "#4B0700" },
    { id: "SIMC-0023", name: "ภูริ พฤกษ์ภิญโญ", nick: "ภู", school: "Bangkok Christian", level: "ม.6", region: "กรุงเทพฯ", score: 87, status: "Reviewed", tier: "A", gender: "M", color: "#356B6D" },
    { id: "SIMC-0028", name: "ธีรเดช วงศ์ไพศาล", nick: "เดช", school: "อัสสัมชัญ", level: "ม.6", region: "กรุงเทพฯ", score: 88, status: "Reviewed", tier: "A", gender: "M", color: "#8F0F1B" },
    { id: "SIMC-0029", name: "ปฤษฐา เพ็งสวัสดิ์", nick: "หนูเล็ก", school: "สตรีวิทยา", level: "ม.6", region: "กรุงเทพฯ", score: 81, status: "Reviewed", tier: "B", gender: "F", color: "#4B0700" },
    { id: "SIMC-0025", name: "ปัณณวัฒน์ สุวรรณกิจ", nick: "ปัน", school: "เตรียมอุดมศึกษา", level: "ม.5", region: "กรุงเทพฯ", score: 78, status: "Pending", tier: "B", gender: "M", color: "#356B6D" },
    { id: "SIMC-0027", name: "ชนกานต์ พรหมจักร", nick: "เจน", school: "เซนต์โยเซฟคอนเวนต์", level: "ม.5", region: "กรุงเทพฯ", score: 70, status: "Pending", tier: "B", gender: "F", color: "#8F0F1B" },
    { id: "SIMC-0032", name: "ภคพร เกษมพันธ์", nick: "พลอย", school: "สตรีสมุทรปราการ", level: "ม.6", region: "ปริมณฑล", score: 76, status: "Pending", tier: "B", gender: "F", color: "#4B0700" },
    { id: "SIMC-0030", name: "เสฏฐวุฒิ ภวภูตานนท์", nick: "เซฟ", school: "Bangkok Patana", level: "ม.5", region: "กรุงเทพฯ", score: 65, status: "Flagged", tier: "C", gender: "M", color: "#C61B10" },
    { id: "SIMC-0033", name: "กชพร อมรสกุล", nick: "กช", school: "มงฟอร์ตวิทยาลัย", level: "ม.6", region: "ภาคเหนือ", score: 84, status: "Reviewed", tier: "A", gender: "F", color: "#356B6D" },
    { id: "SIMC-0034", name: "ณัฐภัทร สิงห์ลำพอง", nick: "เน", school: "ขอนแก่นวิทยายน", level: "ม.6", region: "ภาคอีสาน", score: 79, status: "Reviewed", tier: "B", gender: "M", color: "#8F0F1B" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 18, height: "100%" }}>
        {/* Filter rail */}
        <div className="glass" style={{ padding: 18, borderRadius: 20, display: "flex", flexDirection: "column", gap: 18, overflow: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="display" style={{ fontSize: 15, color: "var(--cream)" }}>Filters</div>
            <span style={{ fontSize: 11, color: "var(--gold)", cursor: "pointer", fontFamily: "var(--f-mono)" }}>RESET</span>
          </div>

          <FilterGroup label="สถานะ">
            <FilterChip label="ทั้งหมด" count={1247} active />
            <FilterChip label="Reviewed" count={856} dot="teal" />
            <FilterChip label="Pending" count={184} dot="gold" />
            <FilterChip label="Flagged" count={12} dot="red" />
          </FilterGroup>

          <FilterGroup label="Tier">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {[["A", 412], ["B", 528], ["C", 254], ["D", 53]].map(([t, n]) => (
                <div key={t} style={{
                  padding: "10px 4px", borderRadius: 10, textAlign: "center", cursor: "pointer",
                  background: t === "A" ? "rgba(255,236,155,0.14)" : "var(--glass-fill)",
                  border: t === "A" ? "1px solid rgba(255,236,155,0.4)" : "1px solid var(--glass-border)",
                }}>
                  <div className="display" style={{ fontSize: 16, color: t === "A" ? "var(--gold)" : "var(--cream)" }}>{t}</div>
                  <div className="mono" style={{ color: "var(--ink-mute)" }}>{n}</div>
                </div>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="คะแนน">
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-mute)", fontFamily: "var(--f-mono)", marginBottom: 6 }}>
              <span>70</span><span>—</span><span>100</span>
            </div>
            <div style={{ position: "relative", height: 6, background: "rgba(255,247,226,0.08)", borderRadius: 999 }}>
              <div style={{ position: "absolute", left: "20%", right: "20%", top: 0, bottom: 0, background: "linear-gradient(90deg, var(--primary-2), var(--gold))", borderRadius: 999 }} />
              <div style={{ position: "absolute", left: "20%", top: "50%", width: 12, height: 12, borderRadius: 999, background: "var(--cream)", border: "1px solid var(--glass-border)", transform: "translate(-50%, -50%)" }} />
              <div style={{ position: "absolute", left: "80%", top: "50%", width: 12, height: 12, borderRadius: 999, background: "var(--cream)", border: "1px solid var(--glass-border)", transform: "translate(-50%, -50%)" }} />
            </div>
          </FilterGroup>

          <FilterGroup label="ระดับชั้น">
            <div style={{ display: "flex", gap: 6 }}>
              {["ม.4","ม.5","ม.6","อื่น"].map((l, i) => (
                <span key={l} className={i === 2 ? "chip chip-red" : "chip"} style={{ flex: 1, justifyContent: "center", cursor: "pointer" }}>{i === 2 && <span className="chip-dot" />}{l}</span>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="ภูมิภาค">
            {["กรุงเทพฯ &amp; ปริมณฑล","ภาคเหนือ","ภาคอีสาน","ภาคใต้","ภาคตะวันออก","ภาคตะวันตก"].map((r, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", cursor: "pointer", fontSize: 12, color: "var(--ink-2)" }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: i < 2 ? "var(--gold)" : "transparent", border: "1.5px solid " + (i < 2 ? "var(--gold)" : "var(--glass-border)"), display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i < 2 && <Icon name="check" size={10} stroke="#2a0a0c" />}
                </span>
                <span dangerouslySetInnerHTML={{ __html: r }} />
              </label>
            ))}
          </FilterGroup>

          <FilterGroup label="แผนการเรียน">
            {["วิทย์-คณิต","ศิลป์-คำนวณ","ศิลป์-ภาษา","อื่น ๆ"].map((p, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", cursor: "pointer", fontSize: 12, color: "var(--ink-2)" }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: i === 0 ? "var(--gold)" : "transparent", border: "1.5px solid " + (i === 0 ? "var(--gold)" : "var(--glass-border)"), display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i === 0 && <Icon name="check" size={10} stroke="#2a0a0c" />}
                </span>
                <span>{p}</span>
              </label>
            ))}
          </FilterGroup>

          <button className="btn btn-primary btn-sm" style={{ marginTop: "auto" }}>ใช้ตัวกรอง (1,247)</button>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="kicker">· Admin · Applicants</div>
              <div className="display" style={{ fontSize: 28, color: "var(--cream)", marginTop: 4 }}>ผู้สมัครทั้งหมด <span style={{ color: "var(--gold)" }}>1,247 คน</span></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="glass" style={{ padding: "8px 14px", borderRadius: 999, display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="magnify" size={14} stroke="var(--ink-mute)" />
                <input style={{ background: "transparent", border: "none", outline: "none", color: "var(--cream)", fontFamily: "var(--f-body)", fontSize: 13, width: 240 }} placeholder="ค้นหาชื่อ / รหัส / โรงเรียน" defaultValue="" />
                <span className="mono" style={{ color: "var(--ink-faint)" }}>⌘K</span>
              </div>
              <div className="glass" style={{ display: "flex", padding: 3, borderRadius: 999 }}>
                <button style={viewToggleStyle(true)}><Icon name="grid" size={14} /></button>
                <button style={viewToggleStyle(false)}><Icon name="menu" size={14} /></button>
              </div>
              <button className="btn btn-sm"><Icon name="filter" size={12} /> Sort · คะแนน ↓</button>
              <button className="btn btn-sm"><Icon name="download" size={12} /> Export</button>
              <button className="btn btn-primary btn-sm">+ เพิ่มผู้สมัคร</button>
            </div>
          </div>

          {/* Active filter chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span className="mono" style={{ color: "var(--ink-mute)", marginRight: 4 }}>Active filters:</span>
            {["Tier: A","Score: 70–100","ม.6","กรุงเทพฯ + ปริมณฑล","แผน วิทย์-คณิต"].map((f, i) => (
              <span key={i} className="chip chip-red" style={{ cursor: "pointer" }}>
                <span className="chip-dot" />{f}
                <span style={{ marginLeft: 6, color: "var(--ink-mute)" }}>×</span>
              </span>
            ))}
            <span style={{ fontSize: 11, color: "var(--gold)", cursor: "pointer", fontFamily: "var(--f-mono)", marginLeft: 4 }}>CLEAR ALL</span>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--ink-mute)" }}>แสดง 12 จาก <span style={{ color: "var(--cream)" }}>1,247</span> · เลือก <span style={{ color: "var(--gold)" }}>3 คน</span></span>
          </div>

          {/* Bulk action bar */}
          <div className="glass-strong" style={{
            padding: "10px 18px", borderRadius: 14,
            display: "flex", alignItems: "center", gap: 14, fontSize: 12.5,
            border: "1px solid rgba(255,236,155,0.4)",
          }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: "var(--gold)", color: "#2a0a0c", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>3</span>
            <span style={{ color: "var(--cream)" }}>ผู้สมัคร 3 คนถูกเลือก</span>
            <div style={{ width: 1, height: 18, background: "var(--glass-border)" }} />
            <button className="btn btn-sm">เปลี่ยน Tier</button>
            <button className="btn btn-sm">ส่งอีเมล</button>
            <button className="btn btn-sm">Mark as Reviewed</button>
            <button className="btn btn-sm" style={{ borderColor: "rgba(198,27,16,0.4)", color: "#ff9f9f" }}>Flag</button>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink-mute)", cursor: "pointer" }}>ยกเลิกการเลือก</span>
          </div>

          {/* Applicant grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, overflow: "auto", paddingBottom: 8 }} className="scroll-y">
            {applicants.map((a, i) => (
              <ApplicantCard key={a.id} {...a} selected={i < 3} />
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 4px" }}>
            <div className="mono" style={{ color: "var(--ink-mute)" }}>Page 1 of 104 · 12 ต่อหน้า</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["‹","1","2","3","4","5","…","104","›"].map((p, i) => (
                <button key={i} className="btn btn-sm" style={{ padding: "4px 10px", background: p === "1" ? "var(--glass-fill-strong)" : undefined }}>{p}</button>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}