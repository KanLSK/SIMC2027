"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FaqSection() {
  const faqs = [
    {
      q: "รับสมัครผู้เข้าร่วมจำนวนกี่คน?",
      a: "เรารับสมัครนักเรียนชั้นมัธยมศึกษาตอนต้น จำนวน 120 คน (แบ่งเป็นทีมละ 2 คน จำนวน 60 ทีม)"
    },
    {
      q: "มีค่าใช้จ่ายในการสมัครหรือไม่?",
      a: "ไม่มีค่าใช้จ่ายในการสมัครเข้าร่วมการแข่งขัน"
    },
    {
      q: "เนื้อหาที่ใช้ในการแข่งขันเป็นระดับไหน?",
      a: "เนื้อหาคณิตศาสตร์ระดับมัธยมศึกษาตอนต้น และปริศนาเชาว์ปัญญา"
    },
    {
      q: "สามารถคละระดับชั้นในทีมเดียวกันได้หรือไม่?",
      a: "สามารถคละระดับชั้นได้ ขอเพียงกำลังศึกษาอยู่ในระดับชั้นมัธยมศึกษาตอนต้น"
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-6 md:px-12 lg:px-24 bg-simc-red relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
          FAQs
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`glass-panel border ${openIndex === index ? 'border-simc-gold' : 'border-white/10'} rounded-xl overflow-hidden transition-all duration-300`}
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left text-white font-medium focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-simc-gold" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-300 text-sm">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box inside FAQ section as seen in design */}
        <div className="mt-20 glass-panel p-12 rounded-3xl text-center border-t border-b border-simc-gold/30 bg-gradient-to-br from-simc-dark to-simc-red-light">
          <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-simc-gold-light to-simc-gold mb-4">
            พร้อมเปิด<br />คดีหรือยัง?
          </h3>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Satit Kaset International Mathematics Competition No. 27
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="rounded-full bg-simc-red px-8 py-3 text-lg font-semibold text-white border border-red-500 hover:bg-red-900 transition-colors">
              สมัครเลย
            </a>
            <a href="#" className="rounded-full bg-transparent px-8 py-3 text-lg font-semibold text-white border border-white hover:bg-white/10 transition-colors">
              อ่านรายละเอียด
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
