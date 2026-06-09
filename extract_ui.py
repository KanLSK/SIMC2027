import os

with open("apps/web/src/app/page.tsx", "r") as f:
    content = f.read()

def extract_function(name):
    start = content.find(f"function {name}(")
    if start == -1:
        start = content.find(f"function {name} (")
    if start == -1:
        return ""
    brace_count = 0
    in_string = False
    string_char = ''
    i = start
    while i < len(content):
        c = content[i]
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

proto_ui = '''"use client";
import React from 'react';

'''
for c in ["ArtFrame", "Icon", "BrandMark"]:
    func_code = extract_function(c)
    if func_code:
        proto_ui += func_code.replace(f"function {c}", f"export function {c}") + "\n\n"

os.makedirs("apps/web/src/components", exist_ok=True)
with open("apps/web/src/components/PrototypeUI.tsx", "w") as f:
    f.write(proto_ui)

print("Prototype UI extracted!")
