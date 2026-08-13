import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ExternalLink, Award, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">JAVASTORE</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Official E-Commerce Shopping Platform task submission suite for Data Alcott Systems Free Java Full Stack Internship Online (Task ID: JV-EC-001).
            </p>
            <div className="pt-1">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 font-medium text-[11px] border border-amber-500/20">
                Code: DAS-JV-001
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><button onClick={() => setActiveTab('store')} className="hover:text-amber-400">Store Catalog</button></li>
              <li><button onClick={() => setActiveTab('cart')} className="hover:text-amber-400">Shopping Cart</button></li>
              <li><button onClick={() => setActiveTab('orders')} className="hover:text-amber-400">Order History</button></li>
              <li><button onClick={() => setActiveTab('wishlist')} className="hover:text-amber-400">Wishlist</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-amber-400">Admin Control Panel</button></li>
            </ul>
          </div>

          {/* Internship Suite Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Submission Assets</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><button onClick={() => setActiveTab('internship-suite')} className="hover:text-sky-400">Spring Boot Java Code</button></li>
              <li><button onClick={() => setActiveTab('internship-suite')} className="hover:text-emerald-400">MySQL ecommerce_db.sql</button></li>
              <li><button onClick={() => setActiveTab('internship-suite')} className="hover:text-purple-400">Formatted README.md</button></li>
              <li><button onClick={() => setActiveTab('internship-suite')} className="hover:text-amber-400">2-3 Page Project Report</button></li>
              <li><button onClick={() => setActiveTab('internship-suite')} className="hover:text-rose-400">YouTube Script & Checklist</button></li>
            </ul>
          </div>

          {/* Data Alcott Contact */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Company Contact</h4>
            <div className="space-y-2 text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 9600095045</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>mail@freeinternships.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Data Alcott Systems, Chennai, India</span>
              </div>
              <a
                href="https://www.freeinternships.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:underline pt-1"
              >
                <ExternalLink className="w-3 h-3" />
                www.freeinternships.in
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Data Alcott Systems. All rights reserved. Free Java Full Stack Internship Task JV-EC-001.
          </div>
          <div className="flex items-center gap-3">
            <span>Spring Boot</span>
            <span>•</span>
            <span>Hibernate JPA</span>
            <span>•</span>
            <span>MySQL</span>
            <span>•</span>
            <span>React</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
