import React, { useState } from 'react';
import { CHDDefect, CHDCategory } from '../types/chd';
import { CHD_DISEASES, CHD_CATEGORIES_METADATA } from '../data/chdDiseases';
import { Search, ChevronRight, AlertTriangle, ShieldCheck, Activity, GitFork, ArrowUpRight } from 'lucide-react';

interface DiseaseLibraryProps {
  onSelectDecisionTree?: (treeId: string) => void;
  onNavigateToCalculator?: (prefillData?: any) => void;
}

export const DiseaseLibrary: React.FC<DiseaseLibraryProps> = ({
  onSelectDecisionTree,
  onNavigateToCalculator,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>(CHD_DISEASES[0].id);

  const filteredDiseases = CHD_DISEASES.filter((d) => {
    const matchesSearch =
      d.nameCn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || d.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const currentDisease = CHD_DISEASES.find((d) => d.id === selectedDiseaseId) || CHD_DISEASES[0];

  const getTreeIdForDisease = (defectId: string): string | null => {
    if (defectId === 'asd_secundum') return 'tree_asd_closure';
    if (defectId.startsWith('vsd')) return 'tree_vsd_strategy';
    if (defectId === 'tof_fallot') return 'tree_tof_repair';
    if (defectId === 'tga_transposition') return 'tree_neonatal_cyanosis';
    return null;
  };

  const associatedTreeId = getTreeIdForDisease(currentDisease.id);

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-950">
      {/* Left Column: Disease Navigation & Filter list */}
      <div className="w-full lg:w-96 flex flex-col border-r border-slate-800 bg-slate-900/60 shrink-0">
        <div className="p-4 border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="搜索病种 (如 ASD, 膜周型, TOF, 缩窄)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 font-sans"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2 py-1 text-[11px] rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800'
              }`}
            >
              全部病种 ({CHD_DISEASES.length})
            </button>
            {Object.entries(CHD_CATEGORIES_METADATA).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-2 py-1 text-[11px] rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === key
                    ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800'
                }`}
              >
                {meta.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1">
          {filteredDiseases.map((disease) => {
            const isSelected = disease.id === currentDisease.id;
            return (
              <div
                key={disease.id}
                onClick={() => setSelectedDiseaseId(disease.id)}
                className={`p-3 rounded cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border border-cyan-500/40 shadow-sm'
                    : 'hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-100">{disease.nameCn}</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400/90">{disease.abbreviation}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{disease.nameEn}</div>
                <div className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-between">
                  <span>{CHD_CATEGORIES_METADATA[disease.category]?.label || '先心病'}</span>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                    <span>{disease.guidelines.length}条指南标准</span>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </div>
                </div>
              </div>
            );
          })}
          {filteredDiseases.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500">
              未检索到符合条件的病种，请尝试输入英文简称或主要关键词。
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Disease Detail Dossier */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Title Header with Category & Quick Jump */}
        <div className="border-b border-slate-800 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
                {currentDisease.abbreviation} · {CHD_CATEGORIES_METADATA[currentDisease.category]?.label}
              </div>
              <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
                {currentDisease.nameCn}
                <span className="text-sm font-normal text-slate-400 font-sans">({currentDisease.nameEn})</span>
              </h1>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2">
              {associatedTreeId && onSelectDecisionTree && (
                <button
                  onClick={() => onSelectDecisionTree(associatedTreeId)}
                  className="px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 rounded hover:bg-cyan-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  启动临床决策树
                </button>
              )}
              {onNavigateToCalculator && (
                <button
                  onClick={() => onNavigateToCalculator()}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700 rounded hover:border-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" />
                  计算Z-Score/血流动力学
                </button>
              )}
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-300 leading-relaxed max-w-4xl">
            {currentDisease.summary}
          </p>

          <div className="mt-3 p-3 bg-slate-900/60 rounded border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold text-slate-200">病理生理机制：</span>
            {currentDisease.pathophysiology}
          </div>
        </div>

        {/* Section 1: Standard Ultrasound Scanning Views */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            超声规范切面探查与测量要点 (ASE/EACVI/国内指南推荐)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentDisease.standardScanningViews.map((view, idx) => (
              <div key={idx} className="p-3 bg-slate-900/70 border border-slate-800/80 rounded">
                <div className="text-xs font-medium text-cyan-300">规范切面 {idx + 1}</div>
                <div className="text-xs text-slate-300 mt-1 leading-relaxed">{view}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Echo Quantitative Diagnostic Criteria Table */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            超声核心量化诊断标准与临界阈值 (Cutoff Values)
          </h2>
          <div className="overflow-x-auto border border-slate-800 rounded bg-slate-900/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-2.5 px-3">参数指标</th>
                  <th className="py-2.5 px-3">推荐超声切面</th>
                  <th className="py-2.5 px-3">临床标准临界值 (Cutoff)</th>
                  <th className="py-2.5 px-3">决策意义</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {currentDisease.echoDiagnosticCriteria.map((crit, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-medium text-slate-100">{crit.parameter}</td>
                    <td className="py-2 px-3 text-slate-400">{crit.standardView}</td>
                    <td className="py-2 px-3 font-mono text-cyan-300">{crit.cutoffValue}</td>
                    <td className="py-2 px-3 text-slate-300">{crit.clinicalSignificance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Evidence-Based Clinical Guidelines (Class I / IIa / IIb / III) */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            临床干预与手术指征指南循证 (ESC / AHA / STS / 中华医学会)
          </h2>
          <div className="space-y-2">
            {currentDisease.guidelines.map((rec, idx) => {
              const isClassI = rec.class === 'Class I';
              const isClassIII = rec.class === 'Class III';
              return (
                <div
                  key={idx}
                  className={`p-3 rounded border ${
                    isClassI
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : isClassIII
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : 'bg-amber-950/20 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isClassI ? 'text-emerald-400' : isClassIII ? 'text-rose-400' : 'text-amber-400'}`}>
                        {rec.class} · {rec.levelOfEvidence}
                      </span>
                      <span className="text-slate-500">|</span>
                      <span className="text-slate-400">{rec.source}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-200 leading-relaxed font-medium">
                    {rec.indication}
                  </div>
                  {rec.notes && (
                    <div className="text-[11px] text-slate-400 mt-1 italic">
                      临床批注: {rec.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Intervention vs Surgery Criteria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDisease.interventionalCriteria && (
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-2">
              <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">
                经皮导管介入封堵 / 球囊成形 解剖适应证
              </h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                {currentDisease.interventionalCriteria.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {currentDisease.surgicalCriteria && (
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-2">
              <h3 className="text-xs font-semibold text-amber-300 uppercase tracking-wide">
                外科开胸体外循环直视修补 / 姑息手术 核心指征
              </h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                {currentDisease.surgicalCriteria.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section 5: High Risk Pitfalls & Warning Warnings */}
        <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4" />
            超声高危陷阱、盲区与术后监测警示 (Expert Red Flags)
          </div>
          <ul className="text-xs text-rose-200/90 space-y-1.5 list-disc list-inside">
            {currentDisease.highRiskPitfalls.map((pitfall, i) => (
              <li key={i}>{pitfall}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
