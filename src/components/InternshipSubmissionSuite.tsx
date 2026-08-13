import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JAVA_SPRING_BOOT_FILES } from '../data/javaCodeTemplates';
import { ECOMMERCE_MYSQL_DUMP_SQL } from '../data/databaseSqlTemplate';
import { GENERATE_README_MARKDOWN, PROJECT_REPORT_MARKDOWN, YOUTUBE_DEMO_SCRIPT } from '../data/reportTemplates';
import { 
  FileCheck2, 
  Code2, 
  Database, 
  FileText, 
  Video, 
  Copy, 
  Download, 
  Check, 
  ExternalLink, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Layers,
  FolderTree,
  FileCode,
  Printer
} from 'lucide-react';

export const InternshipSubmissionSuite: React.FC = () => {
  const { studentCode, setStudentCode, addToast } = useApp();

  const [activeSuiteTab, setActiveSuiteTab] = useState<'OVERVIEW' | 'JAVA_CODE' | 'SQL_DUMP' | 'README' | 'REPORT' | 'YOUTUBE_CHECKLIST'>('OVERVIEW');
  const [selectedJavaFile, setSelectedJavaFile] = useState(JAVA_SPRING_BOOT_FILES[0]);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    addToast('Copied to Clipboard!', `${label} has been copied to your clipboard.`, 'success');
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast('File Downloaded', `Successfully downloaded ${filename}`, 'success');
  };

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Data Alcott Systems
            </span>
            <span className="text-xs px-2.5 py-1 bg-slate-800 text-sky-300 font-mono font-semibold rounded-md border border-slate-700">
              TASK ID: JV-EC-001
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Student Code:</span>
            <input
              type="text"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Internship Task Submission & Code Suite
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Complete production-ready Spring Boot source files, MySQL database schema dump (\`ecommerce_db.sql\`), formatted README markdown, 3-page project report, and YouTube video demonstration script for task submission on <strong>freeinternships.in/blog/</strong>.
        </p>
      </div>

      {/* Suite Tabs */}
      <div className="flex border-b border-slate-800 gap-2 text-xs font-bold overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setActiveSuiteTab('OVERVIEW')}
          className={`pb-2.5 px-3.5 shrink-0 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeSuiteTab === 'OVERVIEW'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Task Specification
        </button>

        <button
          onClick={() => setActiveSuiteTab('JAVA_CODE')}
          className={`pb-2.5 px-3.5 shrink-0 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeSuiteTab === 'JAVA_CODE'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-sky-400" />
          Spring Boot Source Code
        </button>

        <button
          onClick={() => setActiveSuiteTab('SQL_DUMP')}
          className={`pb-2.5 px-3.5 shrink-0 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeSuiteTab === 'SQL_DUMP'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          MySQL ecommerce_db.sql
        </button>

        <button
          onClick={() => setActiveSuiteTab('README')}
          className={`pb-2.5 px-3.5 shrink-0 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeSuiteTab === 'README'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          README.md Generator
        </button>

        <button
          onClick={() => setActiveSuiteTab('REPORT')}
          className={`pb-2.5 px-3.5 shrink-0 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeSuiteTab === 'REPORT'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
          Project Report (2-3 Pages)
        </button>

        <button
          onClick={() => setActiveSuiteTab('YOUTUBE_CHECKLIST')}
          className={`pb-2.5 px-3.5 shrink-0 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeSuiteTab === 'YOUTUBE_CHECKLIST'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-rose-400" />
          YouTube Video & Submission Guide
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeSuiteTab === 'OVERVIEW' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">Task Metadata</h3>
              <div className="space-y-1 text-slate-300">
                <div><strong>Task ID:</strong> JV-EC-001</div>
                <div><strong>Domain:</strong> E-Commerce & Retail Technology</div>
                <div><strong>Task Name:</strong> Online Shopping Platform</div>
                <div><strong>Company:</strong> Data Alcott Systems (www.dataalcott.com)</div>
                <div><strong>Location:</strong> Work From Home Remote</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-400 text-sm">Technology Stack Required</h3>
              <div className="space-y-1 text-slate-300">
                <div><strong>Backend:</strong> Java 17+, Spring Boot 3, REST API</div>
                <div><strong>ORM:</strong> Hibernate ORM, Spring Data JPA</div>
                <div><strong>Database:</strong> MySQL 8.0 Relational DB</div>
                <div><strong>Security:</strong> Spring Security (BCrypt Hashing, RBAC)</div>
                <div><strong>Frontend:</strong> Thymeleaf / React 19 + Tailwind CSS</div>
              </div>
            </div>
          </div>

          {/* Submission Checklist */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Submission Requirements Checklist
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-slate-200">1. GitHub Repository</div>
                <p className="text-slate-400 text-[11px]">Public repo with source code, proper commits, and setup instructions.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-slate-200">2. MySQL Database Dump</div>
                <p className="text-slate-400 text-[11px]">Database export file (\`ecommerce_db.sql\`) with sample products and orders.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-slate-200">3. Project Report (2-3 Pages)</div>
                <p className="text-slate-400 text-[11px]">Architecture breakdown, MVC design, ER diagram, and learning outcomes.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-slate-200">4. YouTube Video Demonstration</div>
                <p className="text-slate-400 text-[11px]">5-7 minute video walking through code, database, and running storefront.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SPRING BOOT JAVA CODE TAB */}
      {activeSuiteTab === 'JAVA_CODE' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-sky-400" />
              <h3 className="font-bold text-sm text-white">Spring Boot Project Files</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyText(selectedJavaFile.content, selectedJavaFile.filename)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs rounded-lg border border-slate-700 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy File
              </button>

              <button
                onClick={() => handleDownloadFile(selectedJavaFile.filename, selectedJavaFile.content)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download {selectedJavaFile.filename}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-xs">
            
            {/* File Tree Selector */}
            <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800 max-h-96 overflow-y-auto">
              <div className="font-bold text-slate-400 text-[11px] uppercase tracking-wider mb-2">Project Files Tree</div>
              {JAVA_SPRING_BOOT_FILES.map((file) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedJavaFile(file)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                    selectedJavaFile.path === file.path
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{file.filename}</span>
                </button>
              ))}
            </div>

            {/* File Code Display */}
            <div className="lg:col-span-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-950 px-3 py-2 rounded-t-xl border border-slate-800">
                <span className="text-amber-300">{selectedJavaFile.path}</span>
                <span className="text-slate-500">{selectedJavaFile.description}</span>
              </div>

              <pre className="p-4 bg-slate-950 text-slate-100 rounded-b-xl border border-slate-800 overflow-x-auto text-xs font-mono leading-relaxed max-h-[500px]">
                <code>{selectedJavaFile.content}</code>
              </pre>
            </div>

          </div>

        </div>
      )}

      {/* MYSQL SQL DUMP TAB */}
      {activeSuiteTab === 'SQL_DUMP' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-bold text-sm text-white">MySQL Database Dump (ecommerce_db.sql)</h3>
                <p className="text-[11px] text-slate-400">Complete SQL schema script with sample products, categories, users, and orders</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyText(ECOMMERCE_MYSQL_DUMP_SQL, 'ecommerce_db.sql')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-lg border border-slate-700 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy SQL Dump
              </button>

              <button
                onClick={() => handleDownloadFile('ecommerce_db.sql', ECOMMERCE_MYSQL_DUMP_SQL)}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download ecommerce_db.sql
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-950 text-emerald-300 rounded-xl border border-slate-800 overflow-x-auto text-xs font-mono leading-relaxed max-h-[500px]">
            <code>{ECOMMERCE_MYSQL_DUMP_SQL}</code>
          </pre>

        </div>
      )}

      {/* README.MD TAB */}
      {activeSuiteTab === 'README' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-sm text-white">Formatted README.md Generator</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyText(GENERATE_README_MARKDOWN(studentCode), 'README.md')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-xs rounded-lg border border-slate-700 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy README.md
              </button>

              <button
                onClick={() => handleDownloadFile('README.md', GENERATE_README_MARKDOWN(studentCode))}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download README.md
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 overflow-x-auto text-xs font-mono leading-relaxed max-h-[500px]">
            <code>{GENERATE_README_MARKDOWN(studentCode)}</code>
          </pre>

        </div>
      )}

      {/* PROJECT REPORT TAB */}
      {activeSuiteTab === 'REPORT' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-bold text-sm text-white">Internship Project Report (2-3 Pages)</h3>
                <p className="text-[11px] text-slate-400">Formal report covering architecture, MVC model, security & outcomes</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg border border-slate-700 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>

              <button
                onClick={() => handleCopyText(PROJECT_REPORT_MARKDOWN(studentCode), 'Project Report')}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Report Markdown
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-4 font-mono max-h-[550px] overflow-y-auto">
            <pre className="whitespace-pre-wrap font-sans">
              {PROJECT_REPORT_MARKDOWN(studentCode)}
            </pre>
          </div>

        </div>
      )}

      {/* YOUTUBE SCRIPT & SUBMISSION GUIDE TAB */}
      {activeSuiteTab === 'YOUTUBE_CHECKLIST' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs text-slate-100">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-base text-white">YouTube Video Script & Submission Guide</h3>
            </div>

            <a
              href="https://www.freeinternships.in/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              Open Task Submission Portal
            </a>
          </div>

          {/* Timed Script Cards */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">
              Recommended 5-7 Minute Demonstration Video Script
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {YOUTUBE_DEMO_SCRIPT.map((item) => (
                <div key={item.time} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-400">{item.time}</span>
                    <span className="font-extrabold text-amber-300">{item.title}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{item.script}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to submit steps */}
          <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-2">
            <h4 className="font-bold text-amber-400">Step-by-Step Task Submission Guide</h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 text-xs">
              <li>Register or log in at <strong>freeinternships.in/register.php</strong></li>
              <li>Navigate to the blog section at <strong>freeinternships.in/blog/</strong></li>
              <li>Create a new post and select the <strong>"Task Submit"</strong> category.</li>
              <li>Set Title: <span className="font-mono text-amber-300">E-Commerce Shopping Platform - {studentCode}</span></li>
              <li>Paste your GitHub Repository URL, YouTube Demo link, and brief project summary.</li>
            </ol>
          </div>

        </div>
      )}

    </div>
  );
};
