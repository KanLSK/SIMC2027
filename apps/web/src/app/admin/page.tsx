// @ts-nocheck
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField } from '@/components/admin/AdminUI';

export default function AdminPage() {
  const rows = [
    ["SIMC-0023", "ภูริ พฤกษ์ภิญโญ", "Bangkok Christian", "M.6", 87, "Reviewed", "A"],
    ["SIMC-0024", "วรรณนิดา ปานทอง", "Suankularb Wittayalai", "M.6", 92, "Reviewed", "A"],
    ["SIMC-0025", "ปัณณวัฒน์ สุวรรณกิจ", "Triam Udom Suksa", "M.5", 78, "Pending", "B"],
    ["SIMC-0026", "อนัญพร ศรีศักดิ์", "Mater Dei", "M.6", 95, "Reviewed", "A"],
    ["SIMC-0027", "ชนกานต์ พรหมจักร", "Saint Joseph Convent", "M.5", 70, "Pending", "B"],
    ["SIMC-0028", "ธีรเดช วงศ์ไพศาล", "Assumption College", "M.6", 88, "Reviewed", "A"],
    ["SIMC-0029", "ปฤษฐา เพ็งสวัสดิ์", "Satriwithaya", "M.6", 81, "Reviewed", "B"],
    ["SIMC-0030", "เสฏฐวุฒิ ภวภูตานนท์", "Bangkok Patana", "M.5", 65, "Flagged", "C"],
    ["SIMC-0031", "ลลิตภัทร แซ่ลิ้ม", "Wattana Wittaya", "M.6", 90, "Reviewed", "A"],
    ["SIMC-0032", "ภคพร เกษมพันธ์", "Streesmutprakarn", "M.6", 76, "Pending", "B"],
  ];

  return (
    <div className="flex flex-col gap-4.5">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        <div>
          <div className="kicker">· Admin · Applicants Overview</div>
          <div className="display text-2xl text-simc-cream mt-1">Phase I · Pre-register</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass px-3.5 py-2 rounded-full flex items-center gap-2">
            <Icon name="magnify" size={14} className="text-simc-ink-mute" />
            <input className="bg-transparent border-none outline-none text-simc-cream font-body text-[13px] w-60 placeholder:text-simc-ink-faint" placeholder="ค้นหาชื่อ / รหัสผู้สมัคร" />
          </div>
          <button className="btn btn-sm"><Icon name="filter" size={12} /> Filter</button>
          <button className="btn btn-sm"><Icon name="download" size={12} /> Export CSV</button>
          <div className="w-px h-7 bg-simc-glass-border mx-1.5" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-simc-teal to-simc-primary border border-simc-gold" />
            <div className="text-[12px] text-simc-ink-2">
              <div>พี่ส้ม</div>
              <div className="mono text-simc-ink-mute text-[10px]">admin · academic</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard k="Total Applicants" v="1,247" delta="+38 today" icon="users" sparkline={[3,5,4,7,6,9,8,12,10,14,16,15]} positive />
        <StatCard k="Average Score" v="76.4" delta="+2.1 vs last cohort" icon="chart" sparkline={[60,62,64,63,67,70,68,72,74,73,75,76]} positive />
        <StatCard k="Pending Review" v="184" delta="-22 since yesterday" icon="bell" sparkline={[20,18,22,25,21,19,24,22,19,16,18,17]} />
        <StatCard k="Flagged Cases" v="12" delta="+3 this week" icon="lock" sparkline={[1,2,1,3,2,4,3,5,4,3,5,6]} bad />
      </div>

      {/* Two-up charts */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-3.5">
        <div className="glass p-5 rounded-[22px]">
          <div className="flex justify-between items-center">
            <div>
              <div className="mono text-simc-gold">Score Distribution</div>
              <div className="display text-lg text-simc-cream mt-0.5">กราฟคะแนนสอบ · Phase I</div>
            </div>
            <div className="flex gap-1.5">
              <span className="chip">All</span>
              <span className="chip chip-teal"><span className="chip-dot" /> Avg 76.4</span>
            </div>
          </div>
          <BarChart />
          <div className="flex justify-between text-[10.5px] text-simc-ink-mute font-mono mt-2">
            {["0–10","10–20","20–30","30–40","40–50","50–60","60–70","70–80","80–90","90–100"].map((l,i)=><span key={i}>{l}</span>)}
          </div>
        </div>
        <div className="glass p-5 rounded-[22px]">
          <div className="mono text-simc-gold">By Region</div>
          <div className="display text-lg text-simc-cream mt-0.5">ภูมิภาคของผู้สมัคร</div>
          <div className="mt-4 flex flex-col gap-2.5">
            {[
              ["กรุงเทพฯ &amp; ปริมณฑล", 612, 0.49, "var(--primary-2)"],
              ["ภาคเหนือ", 168, 0.135, "var(--gold)"],
              ["ภาคอีสาน", 196, 0.157, "var(--teal)"],
              ["ภาคใต้", 142, 0.114, "#9fd1d3"],
              ["ภาคตะวันออก", 79, 0.063, "#ffb3b8"],
              ["ภาคตะวันตก", 50, 0.04, "rgba(255,247,226,0.6)"],
            ].map(([l, n, p, c], i) => (
              <div key={i}>
                <div className="flex justify-between text-[12px] text-simc-ink-2">
                  <span dangerouslySetInnerHTML={{ __html: l as string }} />
                  <span><span className="mono text-simc-ink-mute">{n as number}</span> <span className="text-simc-gold">· {((p as number)*100).toFixed(1)}%</span></span>
                </div>
                <div className="h-1.5 bg-simc-glass-fill rounded-full mt-1 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(p as number)*100}%`, background: c as string, boxShadow: `0 0 8px ${c}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data table */}
      <div className="glass p-5 rounded-[22px] flex-1 min-h-0 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="mono text-simc-gold">Applicants Table · 1,247 rows</div>
            <div className="display text-lg text-simc-cream mt-0.5">รายชื่อผู้สมัคร</div>
          </div>
          <div className="flex gap-2">
            <span className="chip"><span className="chip-dot" /> All status</span>
            <span className="chip chip-teal"><span className="chip-dot" /> Reviewed 856</span>
            <span className="chip chip-red"><span className="chip-dot" /> Pending 184</span>
          </div>
        </div>
        <div className="overflow-auto flex-1 scroll-y">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="sticky top-0 bg-[rgba(10,3,6,0.6)] backdrop-blur-[12px] z-10">
                {["ID","ชื่อ-นามสกุล","โรงเรียน","ระดับชั้น","คะแนน","สถานะ","Tier",""].map((h, i) => (
                  <th key={i} className={`
                    py-3 px-4 text-simc-ink-mute font-medium font-mono text-[11px] tracking-[0.16em] uppercase border-b border-[rgba(255,247,226,0.06)]
                    ${i >= 4 && i <= 6 ? "text-center" : "text-left"}
                  `}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-[rgba(255,247,226,0.03)] last:border-0 transition-colors hover:bg-[rgba(255,247,226,0.02)]">
                  <td className="py-3 px-4 text-simc-gold font-mono text-[12px]">{r[0]}</td>
                  <td className="py-3 px-4 text-simc-cream">{r[1]}</td>
                  <td className="py-3 px-4 text-simc-ink-2">{r[2]}</td>
                  <td className="py-3 px-4 text-simc-ink-2">{r[3]}</td>
                  <td className="py-3 px-4 text-center">
                    <ScoreBar score={r[4] as number} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusPill status={r[5] as string} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <TierPill tier={r[6] as string} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="btn btn-sm px-2.5 py-1">เปิด</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center pt-4 mt-2 border-t border-simc-glass-border">
          <div className="mono text-simc-ink-mute text-[11px] tracking-[0.1em] uppercase">Page 1 of 125</div>
          <div className="flex gap-1.5">
            {["‹","1","2","3","…","125","›"].map((p, i) => (
              <button key={i} className={`btn btn-sm px-2.5 py-1 ${p === "1" ? "bg-[rgba(255,247,226,0.1)] text-simc-cream border-simc-glass-border" : "border-transparent"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}