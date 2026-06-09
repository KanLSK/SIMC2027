"use client";

export function StatsSection() {
  const stats = [
    { number: "120+", label: "ผู้เข้าร่วม" },
    { number: "2...", label: "โรงเรียน" },
    { number: "27", label: "รุ่น" },
    { number: "50+", label: "ทีม" },
    { number: "00", label: "ยังไม่เปิดเผย" },
  ];

  return (
    <section className="py-12 bg-simc-dark border-y border-simc-red-light/30">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center flex-1 min-w-[120px]">
            <div className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">
              {stat.number}
            </div>
            <div className="text-sm text-simc-gold font-medium tracking-widest uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
