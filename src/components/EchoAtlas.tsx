import React, { useState } from 'react';
import { Eye, Compass, Info, CheckCircle2 } from 'lucide-react';

interface EchoViewItem {
  id: string;
  nameCn: string;
  nameEn: string;
  transducerPosition: string;
  clinicalUtility: string;
  keyStructures: string[];
  diagnosticChecklist: string[];
}

export const ECHO_VIEWS: EchoViewItem[] = [
  {
    id: 'plax',
    nameCn: '胸骨旁左室长轴切面 (PLAX)',
    nameEn: 'Parasternal Long Axis View',
    transducerPosition: '胸骨左缘第3~4肋间，探头标志点指向患儿右肩',
    clinicalUtility: '评估右室前壁、室间隔基底部、主动脉根部、主动脉骑跨率、主动脉瓣二尖瓣纤维连续、二尖瓣后叶活动及左室后壁收缩力。',
    keyStructures: ['右心室流出道 (RVOT)', '室间隔 (IVS)', '主动脉根部与半月瓣 (AoV)', '左心房 (LA)', '二尖瓣 (MV)', '左心室腔 (LV)', '冠状静脉窦 (CS)'],
    diagnosticChecklist: [
      '检查主动脉瓣与二尖瓣前叶是否存在正常纤维连续 (排除右室双出口 DORV)',
      '观察室间隔与主动脉前壁连续性，评估骑跨率 (TOF 25%~50%, 超过50%倾向DORV)',
      '观察主动脉右冠瓣及无冠瓣在收缩期及舒张期有无脱入室间隔缺损口',
      '排除降主动脉后方冠状静脉窦增宽 (提示永存左上腔静脉 PLSVC)'
    ],
  },
  {
    id: 'psax_ao',
    nameCn: '胸骨旁大动脉短轴切面 (PSAX Ao Level)',
    nameEn: 'Parasternal Short Axis View at Aortic Level',
    transducerPosition: '胸骨左缘第2~3肋间，探头顺时针旋转90度指向患儿左肩',
    clinicalUtility: '主动脉瓣三叶形态 (“奔驰征”)、室间隔缺损精确时钟定位、右室流出道、肺动脉瓣与主肺动脉分叉。',
    keyStructures: ['主动脉瓣 (左冠/右冠/无冠瓣)', '右心房 (RA)', '三尖瓣 (TV)', '右心室流出道 (RVOT)', '肺动脉瓣 (PV)', '主肺动脉 (MPA) 及左右分支'],
    diagnosticChecklist: [
      'VSD精确时钟方位：干下型 (12~1点，肺动脉瓣下)，膜周型 (9~11点，紧邻三尖瓣隔瓣与无冠瓣)',
      '观察主动脉瓣叶数目：二叶式 (BAV) 常见于主动脉缩窄 CoA 患儿',
      '彩色多普勒探查肺动脉分叉处有无持续红蓝相间导管血流喷入左肺动脉根部 (PDA)',
      '评估肺动脉瓣圆顶状收缩开放受限 (瓣膜型PS)'
    ],
  },
  {
    id: 'a4c',
    nameCn: '心尖四腔心切面 (A4C)',
    nameEn: 'Apical 4-Chamber View',
    transducerPosition: '心尖搏动点处，探头标志点指向患儿左侧腋中线',
    clinicalUtility: '评价左右心房、左右心室大小与对称性、二尖瓣与三尖瓣隔叶附着高度差、原发孔与继发孔房间隔、流入道室间隔。',
    keyStructures: ['左心房 (LA)', '右心房 (RA)', '二尖瓣 (MV)', '三尖瓣 (TV)', '左心室 (LV)', '右心室 (RV, 伴节制索 Moderator Band)', '房间隔与室间隔'],
    diagnosticChecklist: [
      '正常时三尖瓣隔瓣附着点比二尖瓣前叶更靠近心尖 (约5~8 mm/m²)。若高度差消失提示完全性心内膜垫缺损；若三尖瓣下移 ≥ 8 mm/m² 诊断埃布斯坦畸形 (Ebstein)',
      '形态学右室的辨认：心尖部有明显粗糙肌小梁和粗大的节制索，房室瓣为三叶且隔瓣直接附着于室间隔',
      '形态学左室的辨认：心内膜光整，两个大型游离乳头肌 (前外侧与后内侧)，无间隔腱索附着',
      '双心室平衡度评价：测量双侧房室瓣流入道横截径比值 (LV/RV Inflow Ratio)'
    ],
  },
  {
    id: 'subcostal_bicaval',
    nameCn: '剑突下双腔静脉切面 (Subcostal Bicaval)',
    nameEn: 'Subcostal Bicaval View',
    transducerPosition: '剑突下正中偏右，探头顺时针旋转呈矢状扫查',
    clinicalUtility: '小儿及新生儿先心病评价金标准切面。超声束与房间隔垂直，彻底消除心尖切面的假性回声失落。',
    keyStructures: ['上腔静脉 (SVC)', '下腔静脉 (IVC)', '右心房 (RA)', '左心房 (LA)', '卵圆窝/继发孔房间隔', '肝静脉汇入处'],
    diagnosticChecklist: [
      '继发孔型ASD介入封堵术前核心切面：直接精准测量后下下腔静脉缘 (IVC Rim) 与后上上腔静脉缘 (SVC Rim)',
      '上腔型静脉窦型ASD：缺损位于上腔静脉与右房交界处，常规伴发右上肺静脉异位引流 (PAPVC)',
      '探查下腔静脉与腹主动脉位置关系，判定心房内脏反位或双侧异构 (Isomerism)'
    ],
  },
  {
    id: 'suprasternal_arch',
    nameCn: '胸骨上窝主动脉弓长轴切面 (Suprasternal Arch)',
    nameEn: 'Suprasternal Aortic Arch View',
    transducerPosition: '胸骨上切迹，探头指向后下方朝向左肩胛骨',
    clinicalUtility: '主动脉弓形态 (左弓/右弓)、主动脉弓分支 (头臂干、左颈总、左锁骨下)、主动脉峡部缩窄 (CoA)、主动脉弓离断 (IAA) 及动脉导管 (PDA)。',
    keyStructures: ['升主动脉 (AAo)', '主动脉弓横弓 (Transverse Arch)', '头臂干 (Innominate A.)', '左颈总动脉 (LCCA)', '左锁骨下动脉 (LSCA)', '主动脉峡部 (Isthmus)', '降主动脉 (DAo)'],
    diagnosticChecklist: [
      '主动脉缩窄 (CoA)：观察左锁骨下动脉远端峡部后壁局限性凹陷，多普勒测定收缩期高速喷射伴舒张期拖尾 (Diastolic tail)',
      '主动脉弓离断 (IAA)：Celoria-Patton分型：A型(左锁骨下远端离断), B型(左颈总与左锁骨下之间离断), C型(头臂干与左颈总之间离断)',
      '导管切面：探查峡部降主动脉与左肺动脉根部之间的PDA管道形态'
    ],
  },
];

export const EchoAtlas: React.FC = () => {
  const [selectedViewId, setSelectedViewId] = useState<string>('plax');
  const activeView = ECHO_VIEWS.find((v) => v.id === selectedViewId) || ECHO_VIEWS[0];

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-950">
      {/* Left List of Standard Echo Views */}
      <div className="w-full lg:w-80 border-r border-slate-800 bg-slate-900/60 p-4 space-y-3 shrink-0 overflow-y-auto">
        <div>
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400" />
            小儿先心标准超声切面图谱
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            涵盖胸骨旁、心尖、剑突下与胸骨上窝核心诊断切面
          </p>
        </div>

        <div className="space-y-1.5">
          {ECHO_VIEWS.map((view) => {
            const isSelected = view.id === selectedViewId;
            return (
              <div
                key={view.id}
                onClick={() => setSelectedViewId(view.id)}
                className={`p-3 rounded cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/60'
                }`}
              >
                <div className="text-xs font-semibold text-slate-100">{view.nameCn}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{view.nameEn}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Viewport: Vector Schematic and Clinical Guidance */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 space-y-6">
        {/* Banner */}
        <div className="border-b border-slate-800 pb-4">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wide">
            STANDARD ULTRASOUND TRANSDUCER SECTION
          </div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight mt-1 flex items-center gap-2">
            {activeView.nameCn}
            <span className="text-xs font-normal text-slate-400">({activeView.nameEn})</span>
          </h1>
          <div className="text-xs text-slate-300 mt-2 bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
            <span className="font-semibold text-cyan-300">探头摆放与声束方位：</span>
            {activeView.transducerPosition}
          </div>
        </div>

        {/* High-Fidelity Vector Echo Ultrasound Visualizer */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-lg flex flex-col items-center justify-center relative overflow-hidden shadow-inner min-h-[320px]">
          {/* Fan Beam Graphic */}
          <div className="w-full max-w-lg aspect-[16/9] relative bg-slate-950/90 rounded border border-cyan-500/30 p-4 flex flex-col items-center justify-center">
            {/* Sector Arc Guide */}
            <svg className="w-full h-full" viewBox="0 0 400 240">
              {/* Transducer Probe Top */}
              <rect x="180" y="5" width="40" height="15" rx="3" fill="#0891b2" opacity="0.8" />
              <text x="200" y="16" textAnchor="middle" fill="#cffafe" fontSize="8" fontFamily="monospace">PROBE</text>

              {/* Ultrasound Sector Fan Lines */}
              <path
                d="M 200 20 L 40 220 A 240 240 0 0 0 360 220 Z"
                fill="none"
                stroke="#1e293b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M 200 20 L 70 215 A 220 220 0 0 0 330 215 Z"
                fill="rgba(6, 182, 212, 0.04)"
              />

              {/* Dynamic View Vector Elements */}
              {activeView.id === 'plax' && (
                <g>
                  {/* RVOT */}
                  <path d="M 120 70 Q 180 60 230 75 Q 180 85 120 70" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="175" y="70" fill="#94a3b8" fontSize="10">RVOT</text>
                  {/* IVS */}
                  <path d="M 130 95 Q 180 100 220 115" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                  <text x="170" y="105" fill="#f8fafc" fontSize="10" fontWeight="bold">IVS</text>
                  {/* LV cavity */}
                  <ellipse cx="170" cy="140" rx="35" ry="25" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="170" y="145" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">LV</text>
                  {/* Aorta */}
                  <path d="M 220 95 Q 260 85 280 120 Q 240 130 220 115" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                  <text x="250" y="110" fill="#fda4af" fontSize="10" fontWeight="bold">Aorta</text>
                  {/* LA */}
                  <ellipse cx="230" cy="160" rx="25" ry="20" fill="none" stroke="#a855f7" strokeWidth="2" />
                  <text x="230" y="165" textAnchor="middle" fill="#d8b4fe" fontSize="10">LA</text>
                  {/* Mitral valve leaflets */}
                  <line x1="200" y1="130" x2="220" y2="145" stroke="#e2e8f0" strokeWidth="2" />
                  <line x1="185" y1="148" x2="205" y2="155" stroke="#e2e8f0" strokeWidth="2" />
                  <text x="200" y="140" fill="#cbd5e1" fontSize="9">MV</text>
                </g>
              )}

              {activeView.id === 'psax_ao' && (
                <g>
                  {/* Central Aortic Valve Mercedes Benz sign */}
                  <circle cx="200" cy="120" r="28" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                  <line x1="200" y1="120" x2="200" y2="92" stroke="#f43f5e" strokeWidth="2" />
                  <line x1="200" y1="120" x2="176" y2="134" stroke="#f43f5e" strokeWidth="2" />
                  <line x1="200" y1="120" x2="224" y2="134" stroke="#f43f5e" strokeWidth="2" />
                  <text x="200" y="112" textAnchor="middle" fill="#fda4af" fontSize="9" fontWeight="bold">AoV (NCC/RCC/LCC)</text>

                  {/* RVOT wrapping around Ao */}
                  <path d="M 130 90 Q 200 65 270 95 Q 260 145 240 170" fill="none" stroke="#0284c7" strokeWidth="3" />
                  <text x="180" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold">RVOT</text>
                  
                  {/* Pulmonary Artery Bifurcation */}
                  <path d="M 260 120 L 290 105" stroke="#06b6d4" strokeWidth="3" />
                  <path d="M 260 120 L 295 135" stroke="#06b6d4" strokeWidth="3" />
                  <text x="285" y="98" fill="#67e8f9" fontSize="9">RPA</text>
                  <text x="290" y="148" fill="#67e8f9" fontSize="9">LPA (PDA在此)</text>
                  
                  {/* RA & TV */}
                  <text x="145" y="150" fill="#94a3b8" fontSize="10">RA/TV</text>
                </g>
              )}

              {activeView.id === 'a4c' && (
                <g>
                  {/* Ventricles & Atria 4 chambers */}
                  {/* LA & RA */}
                  <ellipse cx="160" cy="165" rx="30" ry="25" fill="none" stroke="#0284c7" strokeWidth="2" />
                  <text x="160" y="170" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">RA</text>
                  <ellipse cx="240" cy="165" rx="30" ry="25" fill="none" stroke="#a855f7" strokeWidth="2" />
                  <text x="240" y="170" textAnchor="middle" fill="#d8b4fe" fontSize="11" fontWeight="bold">LA</text>

                  {/* Ventricles */}
                  <path d="M 130 140 Q 140 70 200 60 Q 195 140 195 140" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                  <text x="165" y="105" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">RV</text>
                  
                  <path d="M 270 140 Q 260 70 200 60 Q 205 140 205 140" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="235" y="105" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold">LV (心尖)</text>

                  {/* Central Crux of Heart / Septum */}
                  <line x1="200" y1="140" x2="200" y2="190" stroke="#f1f5f9" strokeWidth="3" />
                  <text x="200" y="160" textAnchor="middle" fill="#f8fafc" fontSize="8">房间隔</text>
                  <line x1="200" y1="65" x2="200" y2="140" stroke="#f1f5f9" strokeWidth="3.5" />
                  <text x="200" y="125" textAnchor="middle" fill="#f8fafc" fontSize="8">室间隔</text>

                  {/* Offset AV valves */}
                  <circle cx="185" cy="138" r="3" fill="#38bdf8" />
                  <text x="170" y="135" fill="#7dd3fc" fontSize="8">三尖瓣附着</text>
                  <circle cx="215" cy="144" r="3" fill="#d8b4fe" />
                  <text x="220" y="145" fill="#f0abfc" fontSize="8">二尖瓣附着</text>
                </g>
              )}

              {activeView.id === 'subcostal_bicaval' && (
                <g>
                  {/* Right Atrium in center */}
                  <ellipse cx="200" cy="120" rx="40" ry="30" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                  <text x="200" y="115" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">RA (右心房)</text>
                  {/* SVC coming from top */}
                  <path d="M 180 50 L 180 95 L 210 95 L 210 50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="195" y="70" textAnchor="middle" fill="#93c5fd" fontSize="10">SVC</text>
                  {/* IVC coming from bottom */}
                  <path d="M 185 145 L 185 190 L 215 190 L 215 145" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="200" y="175" textAnchor="middle" fill="#93c5fd" fontSize="10">IVC</text>
                  {/* Atrial Septum to left of RA */}
                  <line x1="235" y1="95" x2="235" y2="145" stroke="#f8fafc" strokeWidth="4" />
                  <text x="250" y="125" fill="#f8fafc" fontSize="9" fontWeight="bold">房间隔 (ASD测IVC/SVC缘)</text>
                  <ellipse cx="270" cy="120" rx="25" ry="25" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="270" y="125" textAnchor="middle" fill="#d8b4fe" fontSize="10">LA</text>
                </g>
              )}

              {activeView.id === 'suprasternal_arch' && (
                <g>
                  {/* Aortic Arch "Candy Cane" */}
                  <path
                    d="M 140 180 L 140 110 Q 150 60 220 60 Q 270 60 280 110 L 280 190"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Inner channel */}
                  <path
                    d="M 140 180 L 140 110 Q 150 60 220 60 Q 270 60 280 110 L 280 190"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <text x="110" y="145" fill="#fda4af" fontSize="10">升主动脉 (AAo)</text>
                  <text x="210" y="50" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="bold">横弓 (Arch)</text>
                  <text x="290" y="140" fill="#f43f5e" fontSize="10" fontWeight="bold">峡部 (CoA好发区)</text>

                  {/* Three Head & Neck Branches */}
                  <line x1="180" y1="65" x2="175" y2="35" stroke="#f43f5e" strokeWidth="3" />
                  <text x="175" y="30" textAnchor="middle" fill="#fecdd3" fontSize="8">头臂干</text>
                  <line x1="215" y1="60" x2="215" y2="35" stroke="#f43f5e" strokeWidth="3" />
                  <text x="215" y="30" textAnchor="middle" fill="#fecdd3" fontSize="8">左颈总</text>
                  <line x1="245" y1="65" x2="250" y2="35" stroke="#f43f5e" strokeWidth="3" />
                  <text x="255" y="30" textAnchor="middle" fill="#fecdd3" fontSize="8">左锁骨下</text>

                  {/* RPA under arch */}
                  <circle cx="210" cy="120" r="15" fill="#0891b2" opacity="0.6" />
                  <text x="210" y="124" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">RPA (横断面)</text>
                </g>
              )}
            </svg>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            标准超声扇形声束与解剖结构定位图谱
          </div>
        </div>

        {/* Section: Key Structures & Diagnostic Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-2">
            <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wide flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-cyan-400" />
              该切面涵盖的关键解剖标志 (Key Anatomical Landmarks)
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              {activeView.keyStructures.map((struct, idx) => (
                <li key={idx}>{struct}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-2">
            <h3 className="text-xs font-semibold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              先心病扫查鉴别诊断要领 (Echocardiography Checklist)
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              {activeView.diagnosticChecklist.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
