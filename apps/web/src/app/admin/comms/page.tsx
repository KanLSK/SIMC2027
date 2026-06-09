// @ts-nocheck
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField } from '@/components/admin/AdminUI';

export default function UserProblemsPage() {
  const tickets = [
    { id: "PROB-0142", title: "ส่งใบสมัครไม่ได้ · ขึ้น error 500", user: "ณัฐภัทร · SIMC-0034", category: "Registration", priority: "high", status: "Open", time: "12 นาทีที่แล้ว", unread: true, msgs: 3 },
    { id: "PROB-0141", title: "ระบบสอบค้าง · ไม่นับเวลาให้", user: "ปฤษฐา · SIMC-0029", category: "Exam", priority: "critical", status: "Open", time: "28 นาทีที่แล้ว", unread: true, msgs: 7 },
    { id: "PROB-0140", title: "OTP ไม่เข้ามาในมือถือ", user: "ภคพร · SIMC-0032", category: "Account", priority: "medium", status: "Pending", time: "1 ชม.ที่แล้ว", msgs: 4 },
    { id: "PROB-0139", title: "อัปโหลดสำเนาบัตรไม่สำเร็จ", user: "เซฟ · SIMC-0030", category: "Registration", priority: "medium", status: "Pending", time: "2 ชม.ที่แล้ว", msgs: 2 },
    { id: "PROB-0138", title: "คะแนนไม่อัปเดตในหน้า dashboard", user: "ปัน · SIMC-0025", category: "Exam", priority: "low", status: "Pending", time: "3 ชม.ที่แล้ว", msgs: 5 },
    { id: "PROB-0137", title: "ลืมรหัสผ่าน · ขอ reset", user: "เจน · SIMC-0027", category: "Account", priority: "low", status: "Resolved", time: "เมื่อวาน", msgs: 6 },
    { id: "PROB-0136", title: "ขอเปลี่ยนชื่อโรงเรียนที่กรอก", user: "กช · SIMC-0033", category: "Registration", priority: "low", status: "Resolved", time: "เมื่อวาน", msgs: 4 },
    { id: "PROB-0135", title: "ไม่ได้รับอีเมลยืนยัน", user: "พลอย · SIMC-0032", category: "Account", priority: "low", status: "Closed", time: "3 วันที่แล้ว", msgs: 3 },
  ];

  return (
    <div></div>
  );
}