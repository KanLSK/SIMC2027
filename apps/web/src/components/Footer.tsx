"use client";

import { Globe, Mail, Link as LinkIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="text-xl font-bold tracking-widest text-simc-gold mb-4">
            SIMC 27<span className="text-sm">TH</span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm mb-6">
            Satit Kaset International Mathematics Competition No. 27
            <br />
            Kasetsart University Laboratory School
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-simc-gold transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-simc-gold transition-colors">
              <LinkIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-simc-gold transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">เมนู</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#about" className="hover:text-simc-gold transition-colors">ความเป็นมา</a></li>
            <li><a href="#rules" className="hover:text-simc-gold transition-colors">กติกา</a></li>
            <li><a href="#schedule" className="hover:text-simc-gold transition-colors">ตารางเวลา</a></li>
            <li><a href="#faq" className="hover:text-simc-gold transition-colors">FAQs</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">ติดต่อเรา</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>simc@kus.ku.ac.th</li>
            <li>02-xxx-xxxx</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} SIMC 27th. All rights reserved.
      </div>
    </footer>
  );
}
