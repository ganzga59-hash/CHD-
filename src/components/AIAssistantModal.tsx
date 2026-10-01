import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Stethoscope, RefreshCw, Copy, Check } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillPrompt?: string;
  defaultDisease?: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  prefillPrompt = '',
  defaultDisease = '室间隔缺损 (VSD)',
}) => {
  const [patientAge, setPatientAge] = useState('1岁2个月');
  const [patientGender, setPatientGender] = useState('男');
  const [patientWeight, setPatientWeight] = useState('9.5');
  const [patientSymptoms, setPatientSymptoms] = useState('平素易哭闹、活动易出汗，轻微发绀');
  const [diseaseType, setDiseaseType] = useState(defaultDisease);
  const [echoFindings, setEchoFindings] = useState(
    prefillPrompt ||
      '经胸超声心动图：胸骨旁左室长轴切面见室间隔膜周部回声失落约 5.2 mm，彩色多普勒探及全收缩期左向右高速喷射血流束，峰值流速 4.3 m/s，跨隔压差 74 mmHg。舒张期见主动脉右冠瓣轻度向缺损口脱垂，伴微量反流 (AR 束宽 1.5mm)。左心房内径 21mm，左心室舒张末内径 34mm (Z-Score +2.1)。三尖瓣反流速度 2.6 m/s。'
  );
  const [clinicalQuestion, setClinicalQuestion] = useState(
    '根据最新小儿先心病临床指南，当前主动脉右冠瓣脱垂情况是否属于绝对外科手术指征？是否可行经皮介入封堵？最佳干预窗口期为何时？'
  );

  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Preset Clinical Complex Scenarios
  const applyPresetScenario = (scenario: string) => {
    if (scenario === 'vsd_ar') {
      setPatientAge('1岁');
      setPatientWeight('9.2');
      setDiseaseType('室间隔缺损 (VSD)');
      setEchoFindings(
        '超声示膜周部室缺5.0mm，收缩期压差70mmHg。舒张期见主动脉右冠瓣向缺损下陷，探及微量至轻度反流束 (VC 1.8mm)。左心室轻度扩大 (LVEDD 33mm)。'
      );
      setClinicalQuestion('评估主动脉瓣脱垂与反流对治疗策略的影响，是否可行经皮封堵？指南建议手术时机为何时？');
    } else if (scenario === 'dtga_emergency') {
      setPatientAge('日龄3天');
      setPatientWeight('3.1');
      setDiseaseType('完全性大动脉转位 (d-TGA)');
      setEchoFindings(
        '大动脉平行走行，主动脉起自右室，肺动脉起自左室。室间隔完整。房间隔卵圆孔未闭2.2mm，双向分流，跨隔压差高 (6mmHg)。动脉导管未闭2.0mm。经皮氧饱和度 62%，代谢性酸中毒。'
      );
      setClinicalQuestion('限制性房间隔缺损导致严重低氧血症，急诊处理方案是什么？Rashkind球囊房隔造口术 (BAS) 与大动脉调转术 (ASO) 的时机如何安排？');
    } else if (scenario === 'tof_spells') {
      setPatientAge('7个月');
      setPatientWeight('6.8');
      setDiseaseType('法洛四联症 (TOF)');
      setEchoFindings(
        '大型对位不良VSD 10mm，主动脉骑跨40%。漏斗部严重狭窄伴肺动脉瓣狭窄，跨狭窄峰值压差 82 mmHg。超声测量右肺动脉 RPA 4.5mm，左肺动脉 LPA 4.2mm，膈肌水平降主动脉 8.2mm。患儿近3天有两次哭闹后发绀晕厥发作。'
      );
      setClinicalQuestion('测算McGoon比值与Nakata指数，患儿出现缺氧发作，目前是否具备一期完全根治术指征？还是先行姑息B-T分流？');
    } else if (scenario === 'asd_rim_deficient') {
      setPatientAge('5岁');
      setPatientWeight('18.0');
      setDiseaseType('继发孔型房间隔缺损 (ASD)');
      setEchoFindings(
        '继发孔型房缺，最大伸展径24mm。心尖四腔心显示房室瓣缘8mm，主动脉缘2mm (菲薄缺如)，剑突下切面显示后下下腔静脉缘 (IVC rim) 仅 3.2 mm 且边缘柔软。右心房右心室显著增大，Qp/Qs 2.3。'
      );
      setClinicalQuestion('下腔静脉缘仅3.2mm，强行实施经皮导管介入封堵器植入的风险是什么？该病例的最佳闭合方式是指南推荐的介入还是外科体外循环修补？');
    }
  };

  const handleRunAnalysis = async () => {
    setLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientInfo: {
            age: patientAge,
            gender: patientGender,
            weight: patientWeight,
            symptoms: patientSymptoms,
          },
          diseaseType,
          echoFindings,
          clinicalQuestion,
        }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setAnalysisResult('分析生成失败，请检查网络连接或稍后重试。');
      }
    } catch (err: any) {
      console.error('Error running AI case analysis:', err);
      setAnalysisResult('请求发生错误：' + (err?.message || '网络异常'));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                先心超声临床指南决策 AI 智能辅诊引擎
                <span className="text-[11px] font-normal text-slate-400 font-mono">
                  (Gemini 3.8 Flash / ASE / ESC / 中华医学会指南标准)
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Quick Scenario Buttons */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-1.5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              快速载入高难度会诊典型疑难案例：
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPresetScenario('vsd_ar')}
                className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 rounded cursor-pointer transition-colors"
              >
                案例1: 膜周室缺伴右冠瓣脱垂与反流
              </button>
              <button
                onClick={() => applyPresetScenario('dtga_emergency')}
                className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-rose-300 rounded cursor-pointer transition-colors"
              >
                案例2: 新生儿危重d-TGA限制性房缺急救
              </button>
              <button
                onClick={() => applyPresetScenario('tof_spells')}
                className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-300 rounded cursor-pointer transition-colors"
              >
                案例3: 法四缺氧发作与肺动脉发育指数
              </button>
              <button
                onClick={() => applyPresetScenario('asd_rim_deficient')}
                className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-purple-300 rounded cursor-pointer transition-colors"
              >
                案例4: 继发孔房缺下腔缘不足介入风险
              </button>
            </div>
          </div>

          {/* Patient Info Inputs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">患儿年龄/日龄</label>
              <input
                type="text"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 font-sans"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">体重 (kg)</label>
              <input
                type="text"
                value={patientWeight}
                onChange={(e) => setPatientWeight(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">疑诊/确诊病种</label>
              <input
                type="text"
                value={diseaseType}
                onChange={(e) => setDiseaseType(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-cyan-300 font-semibold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">临床发绀/体征</label>
              <input
                type="text"
                value={patientSymptoms}
                onChange={(e) => setPatientSymptoms(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100"
              />
            </div>
          </div>

          {/* Ultrasound Findings Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200">
              超声心动图测量数据与声像学描述 (可直接粘贴医院超声报告或描述)：
            </label>
            <textarea
              rows={4}
              value={echoFindings}
              onChange={(e) => setEchoFindings(e.target.value)}
              className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 leading-relaxed font-sans focus:outline-none focus:border-cyan-500/80"
              placeholder="请输入胸骨旁长轴、短轴、心尖四腔及剑突下测量值..."
            />
          </div>

          {/* Clinical Question */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cyan-300">
              临床会诊关注重点 / 决策疑问：
            </label>
            <input
              type="text"
              value={clinicalQuestion}
              onChange={(e) => setClinicalQuestion(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-sans focus:outline-none focus:border-cyan-500/80"
              placeholder="例如：手术还是介入？干预窗口期？有无瓣膜毁损风险？"
            />
          </div>

          {/* Trigger Button */}
          <div className="flex justify-end pt-1">
            <button
              onClick={handleRunAnalysis}
              disabled={loading}
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 disabled:text-slate-400 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  AI多维度指南循证推理中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  生成结构化临床决策支持报告
                </>
              )}
            </button>
          </div>

          {/* AI Result Card */}
          {analysisResult && (
            <div className="mt-5 p-5 bg-slate-950 border border-cyan-500/40 rounded-xl space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono">
                  <Stethoscope className="w-4 h-4" />
                  专家级先心超声决策意见 (Structured Decision Dossier)
                </div>
                <button
                  onClick={handleCopyResult}
                  className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? '已复制' : '复制专家意见'}
                </button>
              </div>

              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                {analysisResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
