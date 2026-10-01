import React from 'react';
import { Stethoscope, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAIAssistant: () => void;
  onNewPatient: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAIAssistant,
  onNewPatient,
}) => {
  const navItems = [
    { id: 'diseases', label: '先心病种与指南库' },
    { id: 'calculator', label: 'Z-Score与动力学' },
    { id: 'decision_trees', label: '临床决策树' },
    { id: 'segmental_report', label: '节段分析报告' },
    { id: 'echo_atlas', label: '超声切面图谱' },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
          <Stethoscope className="w-4 h-4" />
        </div>
        <span 
          onClick={() => setActiveTab('diseases')}
          className="text-base font-semibold tracking-tight text-white cursor-pointer hover:text-cyan-400 transition-colors"
        >
          超声先天性心脏病临床指南与决策系统
        </span>
      </div>

      {/* Zone 2: Clean text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`transition-colors text-xs tracking-wide uppercase cursor-pointer ${
                isActive
                  ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1 -mb-1.5'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onNewPatient}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded hover:border-slate-600 transition-colors whitespace-nowrap cursor-pointer"
        >
          重置/载入预设病例
        </button>
        <button
          onClick={onOpenAIAssistant}
          className="px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm shadow-cyan-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI先心智能辅诊
        </button>
      </div>
    </header>
  );
};
