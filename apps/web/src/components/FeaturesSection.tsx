"use client";

import { Box, Users, HelpCircle, Trophy } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Box className="w-8 h-8 text-simc-gold mb-4" />,
      title: "รูปแบบใหม่",
      description: "ปรับเปลี่ยนรูปแบบการแข่งขันใหม่ทั้งหมด เพื่อความท้าทายที่มากขึ้น",
      link: "รายละเอียดเพิ่มเติม"
    },
    {
      icon: <Users className="w-8 h-8 text-simc-gold mb-4" />,
      title: "ทีมเวิร์ค",
      description: "เน้นการทำงานเป็นทีมเพื่อแก้ปัญหาที่ซับซ้อนไปพร้อมกัน",
      link: "รายละเอียดทีม"
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-simc-gold mb-4" />,
      title: "ปริศนาลึกลับ",
      description: "พบกับโจทย์ปริศนาที่ไม่เคยมีที่ไหนมาก่อน ต้องใช้ทักษะไหวพริบ",
      link: "ตัวอย่างโจทย์"
    },
    {
      icon: <Trophy className="w-8 h-8 text-simc-gold mb-4" />,
      title: "รางวัลใหญ่",
      description: "ชิงเงินรางวัลรวมกว่า 100,000 บาท พร้อมเกียรติบัตร",
      link: "รายละเอียดรางวัล"
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-simc-dark relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center md:text-left">
          มีอะไรใหม่ในนี้บ้าง?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-panel p-8 rounded-2xl hover:bg-simc-red-light/50 transition-all duration-300 group"
            >
              {feature.icon}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-simc-gold transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {feature.description}
              </p>
              <a href="#" className="text-sm text-simc-gold font-semibold underline decoration-transparent hover:decoration-simc-gold transition-all">
                {feature.link} &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
