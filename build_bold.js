const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, 'code.md'), 'utf-8');

// Find the start of HomePageBold
const boldStart = code.indexOf('function HomePageBold()');
const variantsEnd = code.indexOf('function HomePageExperimental()');

let boldCode = code.slice(boldStart, variantsEnd);

// Also need the BANNER constant
const bannerRegex = /const BANNER = "assets\/simc27-banner.png";/;
const bannerMatch = code.match(bannerRegex);

// Add missing polyfills
const polyfills = `
"use client";
import React, { useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

const BANNER = "/assets/backdrop.png";

function Icon({ name, size = 24, stroke }) {
  // Map some names
  let iconName = name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  if (iconName === 'Play') iconName = 'PlayCircle';
  if (iconName === 'Fingerprint') iconName = 'Fingerprint';
  if (iconName === 'Skull') iconName = 'Skull';
  if (iconName === 'Users') iconName = 'Users';
  if (iconName === 'Feather') iconName = 'Feather';
  if (iconName === 'Spark') iconName = 'Sparkles';
  if (iconName === 'Sound') iconName = 'Volume2';
  if (iconName === 'Calendar') iconName = 'Calendar';
  if (iconName === 'Clock') iconName = 'Clock';
  if (iconName === 'Pin') iconName = 'MapPin';
  if (iconName === 'Check') iconName = 'Check';
  if (iconName === 'ArrowRight') iconName = 'ArrowRight';

  const Comp = LucideIcons[iconName] || LucideIcons.HelpCircle;
  return <Comp size={size} color={stroke || "currentColor"} />;
}

function NavPill({ active }) {
  return (
    <div className="glass" style={{ display: 'flex', gap: 20, padding: '10px 24px', borderRadius: 999 }}>
      <span style={{ color: active === 'home' ? 'var(--gold)' : 'var(--cream)' }}>Home</span>
      <span style={{ color: 'var(--ink-mute)' }}>About</span>
      <span style={{ color: 'var(--ink-mute)' }}>Apply</span>
    </div>
  );
}

function FallingPetals({ count, variant }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, x: Math.random() * 1000 - 200, rotate: 0, opacity: 0 }}
          animate={{
            y: 1200,
            x: Math.random() * 1000 + 200,
            rotate: 360,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            background: variant === 'crimson' ? 'var(--primary)' : 'var(--gold)',
            borderRadius: '50% 0 50% 50%',
          }}
        />
      ))}
    </div>
  );
}

function ArtFrame({ tone, children }) {
  return <div style={{ background: tone === 'deep' ? 'var(--background)' : 'var(--background)', minHeight: '100vh' }}>{children}</div>;
}

function BrandMark({ size }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 8, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
      S
    </div>
  );
}

function Tape({ text }) {
  return (
    <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(-2deg)', background: 'rgba(255,255,255,0.8)', padding: '4px 20px', color: 'black', fontFamily: 'monospace', fontSize: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
      {text || 'TAPE'}
    </div>
  );
}

`;

fs.writeFileSync(path.join(__dirname, 'apps/web/src/app/page.tsx'), polyfills + boldCode + "\nexport default HomePageBold;\n");
console.log('Done!');
