import os

with open("code.md", "r") as f:
    content = f.read()

def extract_function(name):
    # find function keyword
    start = content.find(f"function {name}")
    if start == -1:
        return ""
    
    # find the closing parenthesis of the arguments
    closing_paren = content.find(")", start)
    if closing_paren == -1:
        return ""
        
    # the function body brace should be after the closing paren
    body_start = content.find("{", closing_paren)
    if body_start == -1:
        return ""
        
    brace_count = 0
    in_string = False
    string_char = ''
    i = body_start
    while i < len(content):
        c = content[i]
        
        # string handling
        if c in ["'", '"', '`'] and content[i-1] != '\\':
            if not in_string:
                in_string = True
                string_char = c
            elif string_char == c:
                in_string = False
                
        if not in_string:
            if c == '{':
                brace_count += 1
            elif c == '}':
                brace_count -= 1
                if brace_count == 0:
                    return content[start:i+1]
        i += 1
    return ""

components = ["StatCard", "BarChart", "ScoreBar", "StatusPill", "TierPill", "QueueRow", "ScoreCell", "EssaySection", "RubricRow", "ToggleRow", "MiniStat", "TicketRow", "TicketDetail", "DetailField", "PropRow", "Message", "FilterGroup", "FilterChip", "ApplicantCard", "Row", "FormCard", "EditField"]

admin_ui = '''"use client";
import React, { useState } from 'react';
import { Icon, BrandMark } from '@/components/PrototypeUI';

'''
for c in components:
    func_code = extract_function(c)
    if func_code:
        admin_ui += func_code.replace(f"function {c}", f"export function {c}") + "\n\n"

with open("apps/web/src/components/admin/AdminUI.tsx", "w") as f:
    f.write(admin_ui)

print("AdminUI generated!")
