const fs = require('fs');

const code = fs.readFileSync('code.md', 'utf8');
const pageCode = fs.readFileSync('apps/web/src/app/page.tsx', 'utf8');

function extractFunction(source, funcName) {
  const keyword = `function ${funcName}`;
  const startIndex = source.indexOf(keyword);
  if (startIndex === -1) return null;

  // find the first `{` after the `)` of the function definition
  const parenClose = source.indexOf(')', startIndex);
  if (parenClose === -1) return null;
  const bodyStart = source.indexOf('{', parenClose);
  if (bodyStart === -1) return null;

  let braceCount = 0;
  let inString = false;
  let strChar = '';

  for (let i = bodyStart; i < source.length; i++) {
    const c = source[i];
    if ((c === '"' || c === "'" || c === "`") && source[i - 1] !== '\\') {
      if (!inString) {
        inString = true;
        strChar = c;
      } else if (strChar === c) {
        inString = false;
      }
    }
    
    if (!inString) {
      if (c === '{') braceCount++;
      else if (c === '}') {
        braceCount--;
        if (braceCount === 0) {
          return source.substring(startIndex, i + 1);
        }
      }
    }
  }
  return null;
}

// 1. PrototypeUI.tsx
const protoUI = `"use client";
import React from 'react';

${extractFunction(pageCode, 'ArtFrame').replace('function ArtFrame', 'export function ArtFrame')}

${extractFunction(pageCode, 'Icon').replace('function Icon', 'export function Icon')}

${extractFunction(pageCode, 'BrandMark').replace('function BrandMark', 'export function BrandMark')}
`;

fs.writeFileSync('apps/web/src/components/PrototypeUI.tsx', protoUI);

// 2. AdminUI.tsx
const components = ["StatCard", "BarChart", "ScoreBar", "StatusPill", "TierPill", "QueueRow", "ScoreCell", "EssaySection", "RubricRow", "ToggleRow", "MiniStat", "TicketRow", "TicketDetail", "DetailField", "PropRow", "Message", "FilterGroup", "FilterChip", "ApplicantCard", "Row", "FormCard", "EditField"];

let adminUI = `"use client";
import React, { useState } from 'react';
import { Icon, BrandMark } from '@/components/PrototypeUI';

`;

for (const c of components) {
  let fn = extractFunction(code, c);
  if (fn) {
    adminUI += fn.replace(`function ${c}`, `export function ${c}`) + '\n\n';
  }
}
fs.writeFileSync('apps/web/src/components/admin/AdminUI.tsx', adminUI);

// 3. Pages
const pages = {
    "AdminPage": "apps/web/src/app/admin/page.tsx",
    "ApplicantsListPage": "apps/web/src/app/admin/applicants/page.tsx",
    "EditApplicantPage": "apps/web/src/app/admin/applicants/edit/page.tsx",
    "ExamGradingPage": "apps/web/src/app/admin/exams/page.tsx",
    "UserProblemsPage": "apps/web/src/app/admin/comms/page.tsx",
    "NewIssuePage": "apps/web/src/app/admin/comms/new/page.tsx",
};

const imports = `"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField } from '@/components/admin/AdminUI';

`;

for (const [pageFunc, path] of Object.entries(pages)) {
  let fn = extractFunction(code, pageFunc);
  if (fn) {
    fn = fn.replace(`function ${pageFunc}`, `export default function ${pageFunc}`);
    
    // Replace sidebar array links
    fn = fn.replace(
      `[\n              { i: "chart", l: "Overview", active: true },\n              { i: "users", l: "Applicants" },\n              { i: "feather", l: "Exams" },\n              { i: "shirt", l: "Souvenirs" },\n              { i: "spark", l: "Mini-games" },\n              { i: "bell", l: "Comms" },\n              { i: "lock", l: "Permissions" },\n            ]`,
      `[
              { i: "chart", l: "Overview", active: typeof window !== 'undefined' && window.location.pathname === '/admin', href: '/admin' },
              { i: "users", l: "Applicants", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/applicants'), href: '/admin/applicants' },
              { i: "feather", l: "Exams", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/exams'), href: '/admin/exams' },
              { i: "shirt", l: "Souvenirs", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/souvenirs'), href: '/admin/souvenirs' },
              { i: "spark", l: "Mini-games", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/games'), href: '/admin/games' },
              { i: "bell", l: "Comms", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/comms'), href: '/admin/comms' },
              { i: "lock", l: "Permissions", active: false, href: '#' },
            ]`
    );
    fn = fn.replace(
      `<div key={k} style={{`,
      `<Link href={it.href || '#'} key={k} style={{ textDecoration: 'none', `
    );
    fn = fn.replace(
      `{it.active && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: 999, background: "var(--gold)" }} />}\n              </div>`,
      `{it.active && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: 999, background: "var(--gold)" }} />}\n              </Link>`
    );
    
    fs.writeFileSync(path, imports + fn);
  }
}
