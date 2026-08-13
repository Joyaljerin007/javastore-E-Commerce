import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Code2, Database, FileText, ExternalLink, CheckCircle, Sparkles } from 'lucide-react';

export const HeaderBanner: React.FC = () => {
  const { setActiveTab, studentCode } = useApp();

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          
          {/* Left info badge */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Data Alcott Systems
            </span>
            <span className="text-slate-300 font-mono hidden sm:inline">|</span>
            <span className="text-slate-200 font-semibold">Task ID: JV-EC-001</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-emerald-400 font-medium hidden md:inline-flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Free Java Full Stack Internship
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">
              Code: {studentCode}
            </span>
          </div>

          {/* Right quick shortcut buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => setActiveTab('internship-suite')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-sm transition-all hover:scale-102 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              Internship Submission Suite
            </button>

            <button
              onClick={() => setActiveTab('internship-suite')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs border border-slate-700"
              title="View Spring Boot & MySQL Files"
            >
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Spring Boot Code</span>
            </button>

            <button
              onClick={() => setActiveTab('internship-suite')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs border border-slate-700"
              title="Download ecommerce_db.sql"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">MySQL .SQL</span>
            </button>

            <a
              href="https://www.freeinternships.in/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors text-xs border border-amber-500/20"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Submit Task</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
