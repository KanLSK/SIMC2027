"use client";

export function TimelineSection() {
  const timeline = [
    { step: "01", date: "15 พ.ย. 67", title: "เปิดรับสมัคร", desc: "รับสมัครผู้เข้าแข่งขันแบบออนไลน์" },
    { step: "02", date: "20 ธ.ค. 67", title: "ประกาศผล", desc: "ประกาศรายชื่อผู้มีสิทธิ์เข้าร่วม" },
    { step: "03", date: "23 ม.ค. 68", title: "วันแข่งขัน", desc: "เริ่มการแข่งขันสุดเข้มข้น" },
    { step: "04", date: "26 ม.ค. 68", title: "ประกาศรางวัล", desc: "มอบรางวัลแก่ผู้ชนะ" },
  ];

  return (
    <section id="schedule" className="py-20 px-6 md:px-12 lg:px-24 bg-simc-red relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">
          ตารางเวลา
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeline.map((item, index) => (
            <div key={index} className="glass-panel p-6 rounded-xl border border-simc-gold/20 relative">
              <div className="text-simc-gold/20 text-6xl font-black absolute top-2 right-4 z-0">
                {item.step}
              </div>
              <div className="relative z-10">
                <div className="text-simc-gold font-bold mb-2">{item.date}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
