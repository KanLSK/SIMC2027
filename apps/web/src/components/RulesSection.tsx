"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export function RulesSection() {
  return (
    <section id="rules" className="py-20 px-6 md:px-12 lg:px-24 bg-simc-dark relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          2 in 1 ทีม
        </h2>
        <h3 className="text-xl md:text-2xl text-simc-gold mb-12">
          SIMC No. 27
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Do's */}
          <div className="glass-panel p-8 rounded-2xl border-t-4 border-t-green-500">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-green-500" />
              สิ่งที่ทำได้
            </h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-simc-gold mt-1">•</span>
                <span>ปรึกษากันภายในทีมได้อย่างอิสระ</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-simc-gold mt-1">•</span>
                <span>ใช้อุปกรณ์เครื่องเขียนพื้นฐาน</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-simc-gold mt-1">•</span>
                <span>ใช้กระดาษทดที่ทางผู้จัดเตรียมไว้ให้</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-simc-gold mt-1">•</span>
                <span>สอบถามข้อสงสัยเรื่องโจทย์จากกรรมการ</span>
              </li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="glass-panel p-8 rounded-2xl border-t-4 border-t-red-500">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <XCircle className="text-red-500" />
              สิ่งที่ห้ามทำ
            </h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-simc-gold mt-1">•</span>
                <span>ห้ามใช้เครื่องคิดเลขทุกชนิด</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-simc-gold mt-1">•</span>
                <span>ห้ามนำอุปกรณ์สื่อสารเข้าห้องสอบ</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-simc-gold mt-1">•</span>
                <span>ห้ามปรึกษากับทีมอื่นโดยเด็ดขาด</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-simc-gold mt-1">•</span>
                <span>ห้ามนำข้อสอบออกจากห้องสอบ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
