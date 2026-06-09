"use client";

import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24 bg-simc-red relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            เป็นมายังไง<br />
            <span className="text-simc-gold">ถึง SIMC No. 27</span>
          </h2>
          
          <div className="bg-[#FAF8F1] text-simc-dark p-8 rounded-xl relative shadow-2xl border-b-8 border-red-800">
            {/* Tape effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/50 backdrop-blur-sm -rotate-2"></div>
            
            <h3 className="text-2xl font-bold text-red-900 mb-4">
              การมาทบทวน<br />
              สิ่งลึกลับ...
            </h3>
            
            <p className="text-sm md:text-base leading-relaxed text-gray-800">
              เมื่อปริศนาที่ซ่อนอยู่กำลังรอการถูกเปิดเผย สู่การแข่งขันที่ท้าทายมากกว่าครั้งไหนๆ 
              เตรียมพบกับการกลับมาของ Satit Kaset International Mathematics Competition 
              ที่จะพาทุกคนไขความลับและเผชิญหน้ากับความท้าทายใหม่ๆ
            </p>
            
            <div className="mt-8 bg-red-900 text-white p-4 rounded-lg inline-block font-bold rotate-2 transform origin-bottom-right">
              TOP SECRET
            </div>
          </div>
        </div>

        {/* Polaroids */}
        <div className="flex-1 relative min-h-[400px] w-full mt-12 lg:mt-0">
          {/* Polaroid 1 */}
          <div className="absolute top-0 right-10 w-48 h-56 bg-white p-3 shadow-xl rotate-6 z-20 transition-transform hover:scale-105 hover:z-50">
            <div className="w-full h-40 bg-simc-dark overflow-hidden relative">
               <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070')] bg-cover bg-center mix-blend-overlay"></div>
            </div>
            <div className="mt-2 text-center text-xs font-bold text-gray-800">File_01.jpg</div>
          </div>
          
          {/* Polaroid 2 */}
          <div className="absolute top-20 right-40 w-48 h-56 bg-white p-3 shadow-xl -rotate-12 z-10 transition-transform hover:scale-105 hover:z-50">
            <div className="w-full h-40 bg-simc-dark overflow-hidden relative">
               <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1633613286848-e6f43bbafb84?q=80&w=2070')] bg-cover bg-center mix-blend-overlay"></div>
            </div>
            <div className="mt-2 text-center text-xs font-bold text-gray-800">File_02.jpg</div>
          </div>

          {/* Polaroid 3 */}
          <div className="absolute top-40 right-16 w-48 h-56 bg-white p-3 shadow-xl rotate-12 z-30 transition-transform hover:scale-105 hover:z-50">
            <div className="w-full h-40 bg-simc-dark overflow-hidden relative">
               <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070')] bg-cover bg-center mix-blend-overlay"></div>
            </div>
            <div className="mt-2 text-center text-xs font-bold text-gray-800">File_03.jpg</div>
          </div>
        </div>

      </div>
    </section>
  );
}
