"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-simc-dark flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/backdrop.png"
          alt="SIMC 27 Background"
          fill
          className="object-cover object-top opacity-80"
          priority
        />
        {/* Overlay gradient to blend into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-simc-dark/50 to-simc-dark z-10 pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <div className="text-xl font-bold tracking-widest text-simc-gold">
          SIMC
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#about" className="hover:text-simc-gold transition-colors">ความเป็นมา</Link>
          <Link href="#rules" className="hover:text-simc-gold transition-colors">กติกา</Link>
          <Link href="#schedule" className="hover:text-simc-gold transition-colors">ตารางเวลา</Link>
          <Link href="#faq" className="hover:text-simc-gold transition-colors">FAQs</Link>
        </div>
        <Link
          href="/auth/login"
          className="rounded-full bg-simc-gold px-6 py-2 text-sm font-semibold text-simc-dark hover:bg-simc-gold-light transition-colors"
        >
          เข้าสู่ระบบ
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        
        {/* SIMC 27th Text (assuming it might be part of backdrop, but we add it if not) */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 opacity-90 drop-shadow-2xl">
            SIMC
          </h2>
          <span className="text-4xl md:text-6xl font-bold text-simc-gold">27<span className="text-2xl align-top">TH</span></span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
          <span className="text-red-500">ปริศนา</span> กำลังรอ...
        </h1>
        
        <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-lg md:text-xl font-medium bg-simc-dark/60 px-6 py-2 rounded-full border border-simc-gold/30">
            <span className="text-simc-gold">23 - 26</span> มกราคม 2568
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="#details"
            className="rounded-full bg-simc-red px-8 py-3 text-lg font-semibold text-white border border-red-500 hover:bg-red-900 transition-colors"
          >
            อ่านรายละเอียด
          </Link>
          <Link
            href="/auth/register"
            className="rounded-full bg-simc-gold px-8 py-3 text-lg font-semibold text-simc-dark hover:bg-simc-gold-light transition-colors"
          >
            สมัครเลย
          </Link>
        </div>
      </div>

      {/* Falling Maple Leaf Animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30 overflow-hidden">
        <Leaf 
          className="absolute text-red-500/60 w-12 h-12 animate-falling" 
          style={{ animationDuration: '12s', left: '10%' }}
        />
        <Leaf 
          className="absolute text-red-600/50 w-8 h-8 animate-falling" 
          style={{ animationDuration: '15s', animationDelay: '2s', left: '30%' }}
        />
        <Leaf 
          className="absolute text-orange-500/40 w-10 h-10 animate-falling" 
          style={{ animationDuration: '10s', animationDelay: '5s', left: '50%' }}
        />
      </div>

      {/* Sliding Yellow Tab */}
      <div className="absolute bottom-0 left-0 w-full bg-simc-gold overflow-hidden py-3 z-40">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-8">
          <span className="text-simc-dark font-bold text-lg uppercase">Satit Kaset International Mathematics Competition No. 27</span>
          <span className="text-simc-dark font-bold text-lg">•</span>
          <span className="text-simc-dark font-bold text-lg uppercase">Satit Kaset International Mathematics Competition No. 27</span>
          <span className="text-simc-dark font-bold text-lg">•</span>
          <span className="text-simc-dark font-bold text-lg uppercase">Satit Kaset International Mathematics Competition No. 27</span>
          <span className="text-simc-dark font-bold text-lg">•</span>
          <span className="text-simc-dark font-bold text-lg uppercase">Satit Kaset International Mathematics Competition No. 27</span>
        </div>
      </div>
    </section>
  );
}
