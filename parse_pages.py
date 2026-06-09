import os

with open("code.md", "r") as f:
    content = f.read()

def extract_function(name):
    start = content.find(f"function {name}")
    if start == -1: return ""
    closing_paren = content.find(")", start)
    if closing_paren == -1: return ""
    body_start = content.find("{", closing_paren)
    if body_start == -1: return ""
    brace_count = 0
    in_string = False
    string_char = ''
    i = body_start
    while i < len(content):
        c = content[i]
        if c in ["'", '"', '`'] and content[i-1] != '\\':
            if not in_string:
                in_string = True
                string_char = c
            elif string_char == c:
                in_string = False
        if not in_string:
            if c == '{': brace_count += 1
            elif c == '}':
                brace_count -= 1
                if brace_count == 0:
                    return content[start:i+1]
        i += 1
    return ""

def process_sidebar_links(func_code):
    func_code = func_code.replace(
        '''[
              { i: "chart", l: "Overview", active: true },
              { i: "users", l: "Applicants" },
              { i: "feather", l: "Exams" },
              { i: "shirt", l: "Souvenirs" },
              { i: "spark", l: "Mini-games" },
              { i: "bell", l: "Comms" },
              { i: "lock", l: "Permissions" },
            ]''',
        '''[
              { i: "chart", l: "Overview", active: typeof window !== 'undefined' && window.location.pathname === '/admin', href: '/admin' },
              { i: "users", l: "Applicants", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/applicants'), href: '/admin/applicants' },
              { i: "feather", l: "Exams", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/exams'), href: '/admin/exams' },
              { i: "shirt", l: "Souvenirs", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/souvenirs'), href: '/admin/souvenirs' },
              { i: "spark", l: "Mini-games", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/games'), href: '/admin/games' },
              { i: "bell", l: "Comms", active: typeof window !== 'undefined' && window.location.pathname.includes('/admin/comms'), href: '/admin/comms' },
              { i: "lock", l: "Permissions", active: false, href: '#' },
            ]'''
    )
    func_code = func_code.replace(
        '''<div key={k} style={{''',
        '''<Link href={it.href} key={k} style={{ textDecoration: 'none', '''
    )
    func_code = func_code.replace(
        '''{it.active && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: 999, background: "var(--gold)" }} />}
              </div>''',
        '''{it.active && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: 999, background: "var(--gold)" }} />}
              </Link>'''
    )
    return func_code

pages_to_extract = {
    "AdminPage": "apps/web/src/app/admin/page.tsx",
    "ApplicantsListPage": "apps/web/src/app/admin/applicants/page.tsx",
    "EditApplicantPage": "apps/web/src/app/admin/applicants/edit/page.tsx",
    "ExamGradingPage": "apps/web/src/app/admin/exams/page.tsx",
    "UserProblemsPage": "apps/web/src/app/admin/comms/page.tsx",
    "NewIssuePage": "apps/web/src/app/admin/comms/new/page.tsx",
}

imports = '''"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArtFrame, Icon, BrandMark } from '@/components/PrototypeUI';
import { StatCard, BarChart, ScoreBar, StatusPill, TierPill, QueueRow, ScoreCell, EssaySection, RubricRow, ToggleRow, MiniStat, TicketRow, TicketDetail, DetailField, PropRow, Message, FilterGroup, FilterChip, ApplicantCard, Row, FormCard, EditField } from '@/components/admin/AdminUI';

'''

for page_func, path in pages_to_extract.items():
    func_code = extract_function(page_func)
    if func_code:
        func_code = func_code.replace(f"function {page_func}", f"export default function {page_func}")
        func_code = process_sidebar_links(func_code)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w") as f:
            f.write(imports + func_code)

print("Pages fixed!")
