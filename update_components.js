const fs = require('fs');

let code = fs.readFileSync('code.md', 'utf8');

// Strip Object.assign
code = code.replace(/Object\.assign\(window.*?\);?/g, '');

// Prepend imports
let newProtoUI = `"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';

`;

// Find all functions and export them
// Simple replace: `function Name(` or `function Name (` -> `export function Name(`
// Note: Icon and BrandMark might need typing again if we want to avoid TS errors
let componentsToExport = ["SceneBG", "NavPill", "BrandMark", "Icon", "SectionTitle", "Tape", "ArtFrame", "FallingPetals", "NoirHeader", "MetaStrip", "FilmOverlay", "CaseStamp", "ActRibbon"];

for (let c of componentsToExport) {
    let regex = new RegExp(`function ${c}\\s*\\(`, 'g');
    code = code.replace(regex, `export function ${c}(`);
}

// Quick TS fixes for Icon and BrandMark that we did before
code = code.replace(/export function Icon\(\{ name, size = 18, stroke = "currentColor" \}/, 'export function Icon({ name, size = 18, stroke = "currentColor" }: { name: string, size?: number, stroke?: string })');
code = code.replace(/export function BrandMark\(\{ size = 22 \}/, 'export function BrandMark({ size = 22 }: { size?: number })');
code = code.replace(/const Comp = LucideIcons\[iconName\] \|\| LucideIcons\.HelpCircle;/, 'const Comp = (LucideIcons[iconName as keyof typeof LucideIcons] as any) || LucideIcons.HelpCircle;');

// Write to PrototypeUI.tsx
fs.writeFileSync('apps/web/src/components/PrototypeUI.tsx', newProtoUI + code);

// Now for page.tsx, we need to remove these components so they don't clash, and import them.
let pageContent = fs.readFileSync('apps/web/src/app/page.tsx', 'utf8');

// Let's just remove the body of these functions from page.tsx.
// Or wait, since page.tsx is basically just the prototype code, we can just let it import from PrototypeUI.
// Actually, earlier I manually removed Icon and BrandMark from page.tsx? No, they are still there!
// Let's write a simple AST or loop to remove them.
function removeFunction(source, funcName) {
  const keyword = `function ${funcName}`;
  const startIndex = source.indexOf(keyword);
  if (startIndex === -1) return source;

  const parenClose = source.indexOf(')', startIndex);
  if (parenClose === -1) return source;
  const bodyStart = source.indexOf('{', parenClose);
  if (bodyStart === -1) return source;

  let braceCount = 0;
  let inString = false;
  let strChar = '';

  for (let i = bodyStart; i < source.length; i++) {
    const c = source[i];
    if ((c === '"' || c === "'" || c === "\`") && source[i - 1] !== '\\') {
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
          return source.substring(0, startIndex) + source.substring(i + 1);
        }
      }
    }
  }
  return source;
}

for (let c of componentsToExport) {
    pageContent = removeFunction(pageContent, c);
}

// Add imports for the components if not present
if (!pageContent.includes('from "@/components/PrototypeUI"')) {
    pageContent = pageContent.replace(
        /import React.*?;\n/g, 
        `$&import { ${componentsToExport.join(', ')} } from "@/components/PrototypeUI";\n`
    );
}

fs.writeFileSync('apps/web/src/app/page.tsx', pageContent);

console.log("Updated components!");
