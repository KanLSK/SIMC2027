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
    { id: "SIMC-0031", name: "ลลิตภัทร แซ่ลิ้ม", nick: "ลิตา", school: "วัฒนาวิทยาลัย", level: "ม.6", region: "กรุงเทพฯ", score: 90, status: "Reviewed", tier: "A", gender: "F", color: "#8F0F1B" },
    { id: "SIMC-0023", name: "ภูริ พฤกษ์ภิญโญ", nick: "ภู", school: "Bangkok Christian", level: "ม.6", region: "กรุงเทพฯ", score: 87, status: "Reviewed", tier: "A", gender: "M", color: "#356B6D" },
    { id: "SIMC-0028", name: "ธีรเดช วงศ์ไพศาล", nick: "เดช", school: "อัสสัมชัญ", level: "ม.6", region: "กรุงเทพฯ", score: 88, status: "Reviewed", tier: "A", gender: "M", color: "#8F0F1B" },
    { id: "SIMC-0029", name: "ปฤษฐา เพ็งสวัสดิ์", nick: "หนูเล็ก", school: "สตรีวิทยา", level: "ม.6", region: "กรุงเทพฯ", score: 81, status: "Reviewed", tier: "B", gender: "F", color: "#8F0F1B" },
    { id: "SIMC-0025", name: "ปัณณวัฒน์ สุวรรณกิจ", nick: "ปัน", school: "เตรียมอุดมศึกษา", level: "ม.5", region: "กรุงเทพฯ", score: 78, status: "Pending", tier: "B", gender: "M", color: "#356B6D" },
    { id: "SIMC-0027", name: "ชนกานต์ พรหมจักร", nick: "เจน", school: "เซนต์โยเซฟคอนเวนต์", level: "ม.5", region: "กรุงเทพฯ", score: 70, status: "Pending", tier: "B", gender: "F", color: "#8F0F1B" },
    { id: "SIMC-0032", name: "ภคพร เกษมพันธ์", nick: "พลอย", school: "สตรีสมุทรปราการ", level: "ม.6", region: "ปริมณฑล", score: 76, status: "Pending", tier: "B", gender: "F", color: "#8F0F1B" },
    { id: "SIMC-0030", name: "เสฏฐวุฒิ ภวภูตานนท์", nick: "เซฟ", school: "Bangkok Patana", level: "ม.5", region: "กรุงเทพฯ", score: 65, status: "Flagged", tier: "C", gender: "M", color: "#8F0F1B" },
    { id: "SIMC-0033", name: "กชพร อมรสกุล", nick: "กช", school: "มงฟอร์ตวิทยาลัย", level: "ม.6", region: "ภาคเหนือ", score: 84, status: "Reviewed", tier: "A", gender: "F", color: "#356B6D" },
    { id: "SIMC-0034", name: "ณัฐภัทร สิงห์ลำพอง", nick: "เน", school: "ขอนแก่นวิทยายน", level: "ม.6", region: "ภาคอีสาน", score: 79, status: "Reviewed", tier: "B", gender: "M", color: "#8F0F1B" },
  ];

  return (
    <div className="grid grid-cols-[220px_1fr] gap-4.5 h-full">
        {/* Filter rail */}
        <div className="glass p-4.5 rounded-[20px] flex flex-col gap-4.5 overflow-auto">
          <div className="flex justify-between items-center">
            <div className="display text-[15px] text-simc-cream">Filters</div>
            <span className="text-[11px] text-simc-gold cursor-pointer font-mono">RESET</span>
          </div>

          <FilterGroup label="สถานะ">
            <FilterChip label="ทั้งหมด" count={1247} active />
            <FilterChip label="Reviewed" count={856} dot="teal" />
            <FilterChip label="Pending" count={184} dot="gold" />
            <FilterChip label="Flagged" count={12} dot="red" />
          </FilterGroup>

          <FilterGroup label="Tier">
            <div className="grid grid-cols-4 gap-1.5">
              {[["A", 412], ["B", 528], ["C", 254], ["D", 53]].map(([t, n]) => (
                <div key={t} className={`
                  py-2.5 px-1 rounded-md text-center cursor-pointer border
                  ${t === "A" ? "bg-[rgba(255,236,155,0.14)] border-[rgba(255,236,155,0.4)]" : "bg-simc-glass-fill border-simc-glass-border"}
                `}>
                  <div className={`display text-base ${t === "A" ? "text-simc-gold" : "text-simc-cream"}`}>{t}</div>
                  <div className="mono text-simc-ink-mute">{n}</div>
                </div>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="คะแนน">
            <div className="flex justify-between text-[11px] text-simc-ink-mute font-mono mb-1.5">
              <span>70</span><span>—</span><span>100</span>
            </div>
            <div className="relative h-1.5 bg-[rgba(255,247,226,0.08)] rounded-full">
              <div className="absolute left-[20%] right-[20%] top-0 bottom-0 bg-gradient-to-r from-simc-primary-2 to-simc-gold rounded-full" />
              <div className="absolute left-[20%] top-1/2 w-3 h-3 rounded-full bg-simc-cream border border-simc-glass-border -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute left-[80%] top-1/2 w-3 h-3 rounded-full bg-simc-cream border border-simc-glass-border -translate-x-1/2 -translate-y-1/2" />
            </div>
          </FilterGroup>

          <FilterGroup label="ระดับชั้น">
            <div className="flex gap-1.5">
              {["ม.4","ม.5","ม.6","อื่น"].map((l, i) => (
                <span key={l} className={`chip flex-1 justify-center cursor-pointer ${i === 2 ? "chip-red" : ""}`}>{i === 2 && <span className="chip-dot" />}{l}</span>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="ภูมิภาค">
            {["กรุงเทพฯ &amp; ปริมณฑล","ภาคเหนือ","ภาคอีสาน","ภาคใต้","ภาคตะวันออก","ภาคตะวันตก"].map((r, i) => (
              <label key={i} className="flex items-center gap-2.5 py-1.5 cursor-pointer text-xs text-simc-ink-2">
                <span className={`w-3.5 h-3.5 rounded bg-transparent border-[1.5px] flex items-center justify-center ${i < 2 ? "bg-simc-gold border-simc-gold" : "border-simc-glass-border"}`}>
                  {i < 2 && <Icon name="check" size={10} stroke="#2a0a0c" />}
                </span>
                <span dangerouslySetInnerHTML={{ __html: r }} />
              </label>
            ))}
          </FilterGroup>

          <FilterGroup label="แผนการเรียน">
            {["วิทย์-คณิต","ศิลป์-คำนวณ","ศิลป์-ภาษา","อื่น ๆ"].map((p, i) => (
              <label key={i} className="flex items-center gap-2.5 py-1.5 cursor-pointer text-xs text-simc-ink-2">
                <span className={`w-3.5 h-3.5 rounded bg-transparent border-[1.5px] flex items-center justify-center ${i === 0 ? "bg-simc-gold border-simc-gold" : "border-simc-glass-border"}`}>
                  {i === 0 && <Icon name="check" size={10} stroke="#2a0a0c" />}
                </span>
                <span>{p}</span>
              </label>
            ))}
          </FilterGroup>

          <button className="btn btn-primary btn-sm mt-auto">ใช้ตัวกรอง (1,247)</button>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <div className="kicker">· Admin · Applicants</div>
              <div className="display text-[28px] text-simc-cream mt-1">ผู้สมัครทั้งหมด <span className="text-simc-gold">1,247 คน</span></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="glass py-2 px-3.5 rounded-full flex items-center gap-2">
                <Icon name="magnify" size={14} className="text-simc-ink-mute" />
                <input className="bg-transparent border-none outline-none text-simc-cream font-body text-[13px] w-[240px]" placeholder="ค้นหาชื่อ / รหัส / โรงเรียน" defaultValue="" />
                <span className="mono text-simc-ink-faint">⌘K</span>
              </div>
              <div className="glass flex p-[3px] rounded-full">
                <button style={viewToggleStyle(true)}><Icon name="grid" size={14} /></button>
                <button style={viewToggleStyle(false)}><Icon name="menu" size={14} /></button>
              </div>
              <button className="btn btn-sm"><Icon name="filter" size={12} /> Sort · คะแนน ↓</button>
              <button className="btn btn-sm"><Icon name="download" size={12} /> Export</button>
              <button className="btn btn-primary btn-sm">+ เพิ่มผู้สมัคร</button>
            </div>
          </div>

          {/* Active filter chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="mono text-simc-ink-mute mr-1">Active filters:</span>
            {["Tier: A","Score: 70–100","ม.6","กรุงเทพฯ + ปริมณฑล","แผน วิทย์-คณิต"].map((f, i) => (
              <span key={i} className="chip chip-red cursor-pointer">
                <span className="chip-dot" />{f}
                <span className="ml-1.5 text-simc-ink-mute">×</span>
              </span>
            ))}
            <span className="text-[11px] text-simc-gold cursor-pointer font-mono ml-1">CLEAR ALL</span>
            <span className="ml-auto text-xs text-simc-ink-mute">แสดง 12 จาก <span className="text-simc-cream">1,247</span> · เลือก <span className="text-simc-gold">3 คน</span></span>
          </div>

          {/* Bulk action bar */}
          <div className="glass-strong py-2.5 px-4.5 rounded-[14px] flex items-center gap-3.5 text-[12.5px] border border-[rgba(255,236,155,0.4)]">
            <span className="w-5.5 h-5.5 rounded-md bg-simc-gold text-[#2a0a0c] flex items-center justify-center font-semibold">3</span>
            <span className="text-simc-cream">ผู้สมัคร 3 คนถูกเลือก</span>
            <div className="w-px h-4.5 bg-simc-glass-border" />
            <button className="btn btn-sm">เปลี่ยน Tier</button>
            <button className="btn btn-sm">ส่งอีเมล</button>
            <button className="btn btn-sm">Mark as Reviewed</button>
            <button className="btn btn-sm text-[#ff9f9f] border-[rgba(198,27,16,0.4)]">Flag</button>
            <span className="ml-auto text-[11px] text-simc-ink-mute cursor-pointer">ยกเลิกการเลือก</span>
          </div>

          {/* Applicant grid */}
          <div className="grid grid-cols-4 gap-3.5 overflow-auto pb-2 scroll-y">
            {applicants.map((a, i) => (
              <ApplicantCard key={a.id} {...a} selected={i < 3} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center py-4 px-2">
            <div className="mono text-[10px] text-simc-ink-mute tracking-[0.1em] uppercase">PAGE 1 OF 104 · 12 ต่อหน้า</div>
            <div className="flex gap-1.5">
              {["‹","1","2","3","4","5","…","104","›"].map((p, i) => (
                <button 
                  key={i} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] transition-all duration-200 ${
                    p === "1" 
                    ? "bg-[rgba(255,247,226,0.12)] text-simc-cream border border-[rgba(255,247,226,0.2)]" 
                    : p === "…"
                    ? "text-simc-ink-mute cursor-default"
                    : "bg-[rgba(10,3,6,0.3)] text-simc-ink-mute border border-[rgba(255,247,226,0.05)] hover:bg-[rgba(255,247,226,0.06)] hover:text-simc-cream"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}