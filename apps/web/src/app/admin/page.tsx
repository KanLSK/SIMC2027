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
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="kicker">· Admin · Applicants Overview</div>
              <div className="display" style={{ fontSize: 28, color: "var(--cream)", marginTop: 4 }}>Phase I · Pre-register</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="glass" style={{ padding: "8px 14px", borderRadius: 999, display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="magnify" size={14} stroke="var(--ink-mute)" />
                <input style={{ background: "transparent", border: "none", outline: "none", color: "var(--cream)", fontFamily: "var(--f-body)", fontSize: 13, width: 240 }} placeholder="ค้นหาชื่อ / รหัสผู้สมัคร" />
              </div>
              <button className="btn btn-sm"><Icon name="filter" size={12} /> Filter</button>
              <button className="btn btn-sm"><Icon name="download" size={12} /> Export CSV</button>
              <div style={{ width: 1, height: 28, background: "var(--glass-border)", margin: "0 6px" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: "linear-gradient(135deg, var(--teal), var(--primary))", border: "1px solid var(--gold)" }} />
                <div style={{ fontSize: 12, color: "var(--ink-2)" }}>
                  <div>พี่ส้ม</div>
                  <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 10 }}>admin · academic</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            <StatCard k="Total Applicants" v="1,247" delta="+38 today" icon="users" sparkline={[3,5,4,7,6,9,8,12,10,14,16,15]} positive />
            <StatCard k="Average Score" v="76.4" delta="+2.1 vs last cohort" icon="chart" sparkline={[60,62,64,63,67,70,68,72,74,73,75,76]} positive />
            <StatCard k="Pending Review" v="184" delta="-22 since yesterday" icon="bell" sparkline={[20,18,22,25,21,19,24,22,19,16,18,17]} />
            <StatCard k="Flagged Cases" v="12" delta="+3 this week" icon="lock" sparkline={[1,2,1,3,2,4,3,5,4,3,5,6]} bad />
          </div>

          {/* Two-up charts */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
            <div className="glass" style={{ padding: 22, borderRadius: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="mono" style={{ color: "var(--gold)" }}>Score Distribution</div>
                  <div className="display" style={{ fontSize: 18, color: "var(--cream)", marginTop: 2 }}>กราฟคะแนนสอบ · Phase I</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span className="chip">All</span>
                  <span className="chip chip-teal"><span className="chip-dot" /> Avg 76.4</span>
                </div>
              </div>
              <BarChart />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "var(--ink-mute)", fontFamily: "var(--f-mono)", marginTop: 8 }}>
                {["0–10","10–20","20–30","30–40","40–50","50–60","60–70","70–80","80–90","90–100"].map((l,i)=><span key={i}>{l}</span>)}
              </div>
            </div>
            <div className="glass" style={{ padding: 22, borderRadius: 22 }}>
              <div className="mono" style={{ color: "var(--gold)" }}>By Region</div>
              <div className="display" style={{ fontSize: 18, color: "var(--cream)", marginTop: 2 }}>ภูมิภาคของผู้สมัคร</div>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["กรุงเทพฯ &amp; ปริมณฑล", 612, 0.49, "var(--primary-2)"],
                  ["ภาคเหนือ", 168, 0.135, "var(--gold)"],
                  ["ภาคอีสาน", 196, 0.157, "var(--teal)"],
                  ["ภาคใต้", 142, 0.114, "#9fd1d3"],
                  ["ภาคตะวันออก", 79, 0.063, "#ffb3b8"],
                  ["ภาคตะวันตก", 50, 0.04, "rgba(255,247,226,0.6)"],
                ].map(([l, n, p, c], i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-2)" }}>
                      <span dangerouslySetInnerHTML={{ __html: l }} />
                      <span><span className="mono" style={{ color: "var(--ink-mute)" }}>{n}</span> <span style={{ color: "var(--gold)" }}>· {(p*100).toFixed(1)}%</span></span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,247,226,0.08)", borderRadius: 999, marginTop: 4, overflow: "hidden" }}>
                      <div style={{ width: `${p*100}%`, height: "100%", background: c, boxShadow: `0 0 8px ${c}` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data table */}
          <div className="glass" style={{ padding: 0, borderRadius: 22, flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: "1px solid var(--glass-border)" }}>
              <div>
                <div className="mono" style={{ color: "var(--gold)" }}>Applicants Table · 1,247 rows</div>
                <div className="display" style={{ fontSize: 16, color: "var(--cream)", marginTop: 2 }}>Showing 10 of 1,247</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span className="chip"><span className="chip-dot" /> All status</span>
                <span className="chip chip-teal"><span className="chip-dot" /> Reviewed 856</span>
                <span className="chip chip-red"><span className="chip-dot" /> Pending 184</span>
              </div>
            </div>
            <div style={{ overflow: "auto", flex: 1 }} className="scroll-y">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ position: "sticky", top: 0, background: "rgba(10,3,6,0.85)", backdropFilter: "blur(12px)", zIndex: 1 }}>
                    {["ID","ชื่อ-นามสกุล","โรงเรียน","ระดับชั้น","คะแนน","สถานะ","Tier",""].map((h, i) => (
                      <th key={i} style={{
                        textAlign: i >= 4 && i <= 6 ? "center" : "left",
                        padding: "12px 18px", color: "var(--ink-mute)", fontWeight: 500,
                        fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                        borderBottom: "1px solid var(--glass-border)",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,247,226,0.05)" }}>
                      <td style={{ padding: "12px 18px", color: "var(--gold)", fontFamily: "var(--f-mono)", fontSize: 12 }}>{r[0]}</td>
                      <td style={{ padding: "12px 18px", color: "var(--cream)" }}>{r[1]}</td>
                      <td style={{ padding: "12px 18px", color: "var(--ink-2)" }}>{r[2]}</td>
                      <td style={{ padding: "12px 18px", color: "var(--ink-2)" }}>{r[3]}</td>
                      <td style={{ padding: "12px 18px", textAlign: "center" }}>
                        <ScoreBar score={r[4]} />
                      </td>
                      <td style={{ padding: "12px 18px", textAlign: "center" }}>
                        <StatusPill status={r[5]} />
                      </td>
                      <td style={{ padding: "12px 18px", textAlign: "center" }}>
                        <TierPill tier={r[6]} />
                      </td>
                      <td style={{ padding: "12px 12px", textAlign: "right" }}>
                        <button className="btn btn-sm" style={{ padding: "5px 10px" }}>เปิด</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 22px", borderTop: "1px solid var(--glass-border)" }}>
              <div className="mono" style={{ color: "var(--ink-mute)" }}>Page 1 of 125</div>
              <div style={{ display: "flex", gap: 6 }}>
                {["‹","1","2","3","…","125","›"].map((p, i) => (
                  <button key={i} className="btn btn-sm" style={{ padding: "4px 10px", background: p === "1" ? "var(--glass-fill-strong)" : undefined }}>{p}</button>
                ))}
              </div>
            </div>
          </div>
    </div>
  );
}