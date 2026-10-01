/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { DiseaseLibrary } from './components/DiseaseLibrary';
import { HemodynamicsCalculator } from './components/HemodynamicsCalculator';
import { DecisionTreeViewer } from './components/DecisionTreeViewer';
import { SegmentalAnalysisBuilder } from './components/SegmentalAnalysisBuilder';
import { EchoAtlas } from './components/EchoAtlas';
import { AIAssistantModal } from './components/AIAssistantModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('diseases');
  const [activeTreeId, setActiveTreeId] = useState<string>('tree_asd_closure');
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [aiPrefillPrompt, setAiPrefillPrompt] = useState<string>('');
  const [aiDefaultDisease, setAiDefaultDisease] = useState<string>('室间隔缺损 (VSD)');

  const handleSelectDecisionTree = (treeId: string) => {
    setActiveTreeId(treeId);
    setActiveTab('decision_trees');
  };

  const handleNavigateToCalculator = () => {
    setActiveTab('calculator');
  };

  const handleOpenAIAssistantWithCase = (prompt: string, disease: string) => {
    setAiPrefillPrompt(prompt);
    setAiDefaultDisease(disease);
    setIsAIOpen(true);
  };

  const handleNewPatientReset = () => {
    setActiveTab('diseases');
    setActiveTreeId('tree_asd_closure');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* 3-Zone Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAIAssistant={() => {
          setAiPrefillPrompt('');
          setIsAIOpen(true);
        }}
        onNewPatient={handleNewPatientReset}
      />

      {/* Main Clinical Stage */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'diseases' && (
          <DiseaseLibrary
            onSelectDecisionTree={handleSelectDecisionTree}
            onNavigateToCalculator={handleNavigateToCalculator}
          />
        )}

        {activeTab === 'calculator' && <HemodynamicsCalculator />}

        {activeTab === 'decision_trees' && (
          <DecisionTreeViewer
            initialTreeId={activeTreeId}
            onOpenAIForCurrentTree={(title, step) => {
              handleOpenAIAssistantWithCase(
                `关于【${title}】在步骤【${step}】的指南依据与风险预警咨询...`,
                title
              );
            }}
          />
        )}

        {activeTab === 'segmental_report' && <SegmentalAnalysisBuilder />}

        {activeTab === 'echo_atlas' && <EchoAtlas />}
      </main>

      {/* AI Clinical Decision Consultation Modal */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        prefillPrompt={aiPrefillPrompt}
        defaultDisease={aiDefaultDisease}
      />
    </div>
  );
}
