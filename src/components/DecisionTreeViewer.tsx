import React, { useState } from 'react';
import { DECISION_TREES } from '../data/decisionTrees';
import { DecisionTree, DecisionNode, DecisionResult } from '../types/chd';
import { GitFork, RotateCcw, CheckCircle2, AlertOctagon, HelpCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface DecisionTreeViewerProps {
  initialTreeId?: string;
  onOpenAIForCurrentTree?: (treeTitle: string, currentStep: string) => void;
}

export const DecisionTreeViewer: React.FC<DecisionTreeViewerProps> = ({
  initialTreeId = 'tree_asd_closure',
  onOpenAIForCurrentTree,
}) => {
  const [selectedTreeId, setSelectedTreeId] = useState<string>(initialTreeId);
  const currentTree: DecisionTree = DECISION_TREES[selectedTreeId] || DECISION_TREES.tree_asd_closure;

  // History stack for backtracking
  const [history, setHistory] = useState<
    { nodeId: string; chosenOptionIndex: number }[]
  >([]);
  const [currentNodeId, setCurrentNodeId] = useState<string>(currentTree.rootNodeId);
  const [finalResult, setFinalResult] = useState<DecisionResult | null>(null);

  // Switch tree handler
  const handleSelectTree = (treeId: string) => {
    setSelectedTreeId(treeId);
    const tree = DECISION_TREES[treeId];
    if (tree) {
      setCurrentNodeId(tree.rootNodeId);
      setHistory([]);
      setFinalResult(null);
    }
  };

  // Reset current tree
  const handleReset = () => {
    setCurrentNodeId(currentTree.rootNodeId);
    setHistory([]);
    setFinalResult(null);
  };

  // Step backwards one node
  const handleStepBack = () => {
    if (history.length === 0) return;
    const newHistory = [...history];
    const lastStep = newHistory.pop();
    setHistory(newHistory);
    setFinalResult(null);
    if (lastStep) {
      setCurrentNodeId(lastStep.nodeId);
    }
  };

  // Option selection
  const handleSelectOption = (optionIndex: number) => {
    const currentNode = currentTree.nodes[currentNodeId];
    if (!currentNode) return;

    const chosenOption = currentNode.options[optionIndex];
    if (!chosenOption) return;

    // Record history
    setHistory([...history, { nodeId: currentNodeId, chosenOptionIndex: optionIndex }]);

    if (chosenOption.result) {
      setFinalResult(chosenOption.result);
    } else if (chosenOption.nextNodeId) {
      setCurrentNodeId(chosenOption.nextNodeId);
      setFinalResult(null);
    }
  };

  const currentNode: DecisionNode | undefined = currentTree.nodes[currentNodeId];

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-950">
      {/* Left Sidebar: Select Decision Tree Pathway */}
      <div className="w-full lg:w-80 border-r border-slate-800 bg-slate-900/60 p-4 space-y-4 shrink-0 overflow-y-auto">
        <div>
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1.5 mb-1">
            <GitFork className="w-4 h-4 text-cyan-400" />
            临床决策树算法库
          </div>
          <p className="text-[11px] text-slate-400">
            严格遵循国际ESC/AHA及国内指南阶梯式决策路径
          </p>
        </div>

        <div className="space-y-2">
          {Object.values(DECISION_TREES).map((tree) => {
            const isSelected = tree.id === selectedTreeId;
            return (
              <div
                key={tree.id}
                onClick={() => handleSelectTree(tree.id)}
                className={`p-3 rounded cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/60'
                }`}
              >
                <div className="text-xs font-semibold text-slate-100">{tree.title}</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{tree.diseaseName}</div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">{tree.guidelineSource}</div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded text-xs space-y-2">
          <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            决策支持系统使用说明
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            临床医生根据超声多普勒实际测值与声像学特征在各步骤点击选项。系统实时推演手术指征、规避解剖禁忌并输出指南分级建议。
          </p>
        </div>
      </div>

      {/* Main Workspace: Active Decision Flow & Breadcrumbs */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 space-y-6">
        {/* Active Tree Banner */}
        <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wide">
              {currentTree.diseaseName}
            </div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight mt-0.5">
              {currentTree.title}
            </h1>
            <div className="text-xs text-slate-400 mt-1">
              证据来源: <span className="text-slate-300 font-mono">{currentTree.guidelineSource}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={handleStepBack}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700 rounded hover:border-slate-600 transition-colors cursor-pointer"
              >
                返回上一步
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700 rounded hover:border-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              重新推演
            </button>
          </div>
        </div>

        {/* Pathway Progress Trail (Breadcrumbs) */}
        {history.length > 0 && (
          <div className="p-3 bg-slate-900/40 border border-slate-800 rounded space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              已确立的临床决策推演路径 ({history.length} 步)
            </div>
            <div className="space-y-1.5">
              {history.map((step, idx) => {
                const node = currentTree.nodes[step.nodeId];
                const option = node?.options[step.chosenOptionIndex];
                return (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center text-[10px] shrink-0 font-mono">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <span className="text-slate-400">{node?.question}</span>
                      <div className="text-cyan-300 font-medium flex items-center gap-1 mt-0.5">
                        <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                        {option?.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Current Active Decision Question Node */}
        {!finalResult && currentNode && (
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-lg space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
              <span>决策节点 #{history.length + 1}</span>
            </div>

            <h2 className="text-lg font-bold text-slate-100 leading-snug">
              {currentNode.question}
            </h2>

            {currentNode.description && (
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentNode.description}
              </p>
            )}

            {/* Interactive Decision Options */}
            <div className="space-y-2.5 pt-2">
              {currentNode.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full text-left p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500/80 hover:bg-cyan-950/20 rounded-md transition-all group cursor-pointer flex items-center justify-between"
                >
                  <div className="space-y-1 pr-4">
                    <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-xs text-slate-400">{option.description}</div>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Final Clinical Decision Result Card */}
        {finalResult && (
          <div className="space-y-4">
            <div
              className={`p-6 rounded-lg border space-y-5 ${
                finalResult.recommendationLevel === 'Class I'
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : finalResult.recommendationLevel === 'Urgent'
                  ? 'bg-rose-950/30 border-rose-500/50'
                  : finalResult.recommendationLevel === 'Class III'
                  ? 'bg-rose-950/20 border-rose-500/40'
                  : 'bg-amber-950/20 border-amber-500/40'
              }`}
            >
              {/* Result Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2.5">
                  {finalResult.recommendationLevel === 'Class I' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : finalResult.recommendationLevel === 'Urgent' ? (
                    <AlertOctagon className="w-6 h-6 text-rose-400 animate-pulse" />
                  ) : (
                    <ShieldAlert className="w-6 h-6 text-amber-400" />
                  )}
                  <div>
                    <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-slate-400">
                      临床决策推荐结论 · {finalResult.actionType}
                    </span>
                    <h3 className="text-lg font-bold text-slate-100">
                      {finalResult.decision}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded ${
                      finalResult.recommendationLevel === 'Class I'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : finalResult.recommendationLevel === 'Urgent'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : finalResult.recommendationLevel === 'Class III'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {finalResult.recommendationLevel} 指南推荐
                  </span>
                </div>
              </div>

              {/* Rationale & Evidence */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-300 mb-1">【循证医学依据与病理机制剖析】</div>
                  <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800/80">
                    {finalResult.rationale}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="text-[11px] font-semibold text-cyan-300 mb-1">【参考临床指南】</div>
                    <div className="text-slate-300 font-mono text-[11px]">
                      {finalResult.guidelineReference}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="text-[11px] font-semibold text-cyan-300 mb-1">【超声随访与术后管理规划】</div>
                    <div className="text-slate-300 leading-relaxed text-[11px]">
                      {finalResult.followUpPlan}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-semibold text-slate-100 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded transition-colors cursor-pointer"
                >
                  重新开始推演
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
