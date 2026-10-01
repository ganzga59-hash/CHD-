import React, { useState } from 'react';
import { SegmentalAnalysisData } from '../types/chd';
import { FileText, Copy, Printer, Check, Layers, AlertCircle } from 'lucide-react';

export const SegmentalAnalysisBuilder: React.FC = () => {
  const [data, setData] = useState<SegmentalAnalysisData>({
    visceroatrialSitus: 'solitus',
    systemicVenousReturn: 'normal',
    pulmonaryVenousReturn: 'normal',
    atrioventricularConnection: 'concordant',
    ventricularLoop: 'd_loop',
    ventriculoarterialConnection: 'concordant',
    greatArteriesRelation: 'normal_spiral',
    associatedShunts: ['膜周部室间隔缺损 (pmVSD) 4.2mm', '继发孔房间隔缺损 (ASD) 5.0mm'],
    associatedObstructions: ['轻度肺动脉瓣狭窄 (峰值压差 28 mmHg)'],
    associatedValvularLesions: ['三尖瓣轻度反流 (TR Vmax 2.8 m/s)'],
    cardiacChamberDimensions: {
      la: '22',
      lv: '36',
      ra: '20',
      rv: '18',
      ef: '64',
      fs: '34',
    },
    diagnosticImpression:
      '1. 先天性心脏病 (心房正位，心室右袢，大动脉连接一致)\n2. 膜周部室间隔缺损 (左向右分流，跨隔压差 68 mmHg)\n3. 继发孔型房间隔缺损 (左向右分流)\n4. 轻度肺动脉瓣狭窄\n5. 左心室轻度容量负荷过重，左室收缩功能正常 (LVEF 64%)',
    recommendations:
      '建议3~6个月内密切随访，复查超声心动图观察缺损有无假性室隔瘤形成及分流演变；若反复肺部感染或左室进行性扩大，评估择期微创封堵或外科修补。',
  });

  const [copied, setCopied] = useState(false);
  const [newShuntText, setNewShuntText] = useState('');
  const [newObstructionText, setNewObstructionText] = useState('');

  // Sample Case Switcher
  const loadPresetCase = (caseType: string) => {
    if (caseType === 'dtga') {
      setData({
        visceroatrialSitus: 'solitus',
        systemicVenousReturn: 'normal',
        pulmonaryVenousReturn: 'normal',
        atrioventricularConnection: 'concordant',
        ventricularLoop: 'd_loop',
        ventriculoarterialConnection: 'discordant',
        greatArteriesRelation: 'd_transposition',
        associatedShunts: ['限制性小房缺 (2.5mm, 双向分流)', '动脉导管未闭 (PDA 2.8mm, 左向右为主)'],
        associatedObstructions: ['无明显流出道梗阻'],
        associatedValvularLesions: ['轻度三尖瓣反流'],
        cardiacChamberDimensions: {
          la: '15',
          lv: '21',
          ra: '16',
          rv: '22',
          ef: '60',
          fs: '31',
        },
        diagnosticImpression:
          '1. 先天性心脏病：完全性大动脉转位 (d-TGA, {S, D, D})\n2. 室大动脉连接不一致 (主动脉起自解剖右室，肺动脉起自解剖左室)\n3. 限制性房间隔缺损伴双向分流 (限制性交通，需警惕低氧血症加重)\n4. 动脉导管未闭 (PDA)\n5. 室间隔完整 (IVS)',
        recommendations:
          '危重病变！立即微量泵入PGE1维持PDA开放；严密监测经皮氧饱和度，若限制性房缺致重度缺氧建议急诊行超声床旁Rashkind球囊房隔造口术 (BAS)；于生后2周内尽快行解剖学大动脉调转术 (ASO)。',
      });
    } else if (caseType === 'tof') {
      setData({
        visceroatrialSitus: 'solitus',
        systemicVenousReturn: 'normal',
        pulmonaryVenousReturn: 'normal',
        atrioventricularConnection: 'concordant',
        ventricularLoop: 'd_loop',
        ventriculoarterialConnection: 'concordant',
        greatArteriesRelation: 'normal_spiral',
        associatedShunts: ['对位不良型大型室间隔缺损 (对位不良VSD 11mm, 双向分流)'],
        associatedObstructions: ['右室流出道及肺动脉瓣重度狭窄 (PG_peak 78 mmHg, 瓣环 Z=-2.4)', '主肺动脉发育偏细'],
        associatedValvularLesions: ['轻度主动脉瓣反流'],
        cardiacChamberDimensions: {
          la: '18',
          lv: '28',
          ra: '22',
          rv: '26',
          ef: '62',
          fs: '33',
        },
        diagnosticImpression:
          '1. 先天性心脏病：法洛四联症 (TOF)\n2. 漏斗部室间隔向前上移位，大型对位不良VSD\n3. 主动脉增粗骑跨于室间隔之上 (骑跨率约40%)\n4. 漏斗部肌束肥厚伴肺动脉瓣狭窄 (跨狭窄峰值压差 78 mmHg)\n5. 右心室显著向心性肥厚 (右室前壁厚度 5.8 mm)',
        recommendations:
          '测算McGoon比值 1.58，Nakata指数 165 mm²/m²，肺动脉分支发育尚可，具备生后3~6个月行一期外科完全根治术指征。防范剧烈哭闹诱发缺氧发作。',
      });
    } else if (caseType === 'cavsd') {
      setData({
        visceroatrialSitus: 'solitus',
        systemicVenousReturn: 'normal',
        pulmonaryVenousReturn: 'normal',
        atrioventricularConnection: 'double_inlet',
        ventricularLoop: 'd_loop',
        ventriculoarterialConnection: 'concordant',
        greatArteriesRelation: 'normal_spiral',
        associatedShunts: ['原发孔房间隔缺损 12mm', '流入道大室间隔缺损 10mm (共同房室瓣口下)'],
        associatedObstructions: ['左室流出道狭长 (鹅颈征 Gooseneck Sign)'],
        associatedValvularLesions: ['单一共同房室瓣环，前桥瓣自由漂浮 (Rastelli C型)', '左侧房室瓣中度反流'],
        cardiacChamberDimensions: {
          la: '24',
          lv: '32',
          ra: '25',
          rv: '30',
          ef: '63',
          fs: '33',
        },
        diagnosticImpression:
          '1. 先天性心脏病：完全性房室间隔缺损 (CAVSD, Rastelli C型)\n2. 原发孔房缺伴流入道室缺\n3. 单一共同房室瓣伴中度关闭不全\n4. 双心室平衡型 (LV/RV流入道比值 0.95)\n5. 双心室容量负荷过重，肺动脉收缩压中度增高 (PASP 52 mmHg)',
        recommendations:
          '建议于生后3~4个月内完成体外循环下双心室完全矫治术 (双补片法修补房室缺损及共同瓣分割成形)。患儿需严密随访肺血管阻力，预防不可逆肺高压。',
      });
    }
  };

  const handleCopyReport = () => {
    const reportText = `
【先心病连续节段分析法超声诊断报告 (Sequential Segmental Echo Report)】

一、心房与静脉连接 (Situs & Venous Return):
- 内脏心房位置: ${data.visceroatrialSitus === 'solitus' ? '心房正位 (Situs Solitus)' : data.visceroatrialSitus === 'inversus' ? '心房反位 (Situs Inversus)' : '心房异构/多脾/无脾'}
- 体静脉回流: ${data.systemicVenousReturn === 'normal' ? '上下腔静脉正常回流右房' : data.systemicVenousReturn}
- 肺静脉回流: ${data.pulmonaryVenousReturn === 'normal' ? '四支肺静脉正常回流左房' : data.pulmonaryVenousReturn}

二、房室连接与心室形态 (Atrioventricular Connection):
- 房室连接方式: ${data.atrioventricularConnection}
- 心室袢向: ${data.ventricularLoop === 'd_loop' ? 'D-袢 (右室位于右侧)' : 'L-袢 (心室倒位)'}

三、心室大动脉连接与空间关系 (Ventriculoarterial Connection):
- 室大动脉连接: ${data.ventriculoarterialConnection}
- 大动脉空间交叉关系: ${data.greatArteriesRelation}

四、合并畸形与分流:
- 分流性病变: ${data.associatedShunts.join('; ') || '无'}
- 梗阻性病变: ${data.associatedObstructions.join('; ') || '无'}
- 瓣膜病变: ${data.associatedValvularLesions.join('; ') || '无'}

五、超声测量与心功能指标:
LA: ${data.cardiacChamberDimensions.la} mm | LV: ${data.cardiacChamberDimensions.lv} mm | RA: ${data.cardiacChamberDimensions.ra} mm | RV: ${data.cardiacChamberDimensions.rv} mm | LVEF: ${data.cardiacChamberDimensions.ef}% | FS: ${data.cardiacChamberDimensions.fs}%

【超声诊断印象 (Diagnostic Impressions)】:
${data.diagnosticImpression}

【临床处理与手术建议 (Clinical Recommendations)】:
${data.recommendations}
    `.trim();

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-950">
      {/* Left Form: Segmental Approach Selections */}
      <div className="w-full lg:w-[480px] border-r border-slate-800 bg-slate-900/60 p-5 space-y-5 overflow-y-auto shrink-0">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              连续节段分析法 (Segmental Approach)
            </h2>
            <p className="text-[11px] text-slate-400">Van Praagh / Anderson 先心病三节段规范</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500">载入范例:</span>
            <button
              onClick={() => loadPresetCase('dtga')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[11px] cursor-pointer"
            >
              d-TGA
            </button>
            <button
              onClick={() => loadPresetCase('tof')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[11px] cursor-pointer"
            >
              法四
            </button>
            <button
              onClick={() => loadPresetCase('cavsd')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[11px] cursor-pointer"
            >
              房室管
            </button>
          </div>
        </div>

        {/* Step 1: Visceroatrial Situs */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-cyan-300">
            节段 1: 内脏与心房心耳位置 (Visceroatrial Situs)
          </label>
          <select
            value={data.visceroatrialSitus}
            onChange={(e) => setData({ ...data, visceroatrialSitus: e.target.value as any })}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100 font-sans"
          >
            <option value="solitus">心房正位 (Situs Solitus - 右房在右，左房在左)</option>
            <option value="inversus">心房反位 (Situs Inversus - 镜像倒位)</option>
            <option value="ambiguus_right">右侧异构 / 无脾综合征 (Right Isomerism / Asplenia)</option>
            <option value="ambiguus_left">左侧异构 / 多脾综合征 (Left Isomerism / Polysplenia)</option>
          </select>
        </div>

        {/* Step 2: Systemic & Pulmonary Venous Connections */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-300">体静脉连接 (SVC/IVC)</label>
            <select
              value={data.systemicVenousReturn}
              onChange={(e) => setData({ ...data, systemicVenousReturn: e.target.value as any })}
              className="w-full mt-1 px-2 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100"
            >
              <option value="normal">正常 (上下腔直回右房)</option>
              <option value="plsvc_to_cs">永存左上腔引流至冠状静脉窦 (PLSVC)</option>
              <option value="interrupted_ivc">下腔静脉中断伴奇静脉代偿引流</option>
              <option value="bilateral_svc">双上腔静脉 (Bilateral SVC)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-300">肺静脉连接 (PV Return)</label>
            <select
              value={data.pulmonaryVenousReturn}
              onChange={(e) => setData({ ...data, pulmonaryVenousReturn: e.target.value as any })}
              className="w-full mt-1 px-2 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100"
            >
              <option value="normal">正常 (四支肺静脉回流左房)</option>
              <option value="papvc">部分肺静脉异位引流 (PAPVC)</option>
              <option value="tapvc_supracardiac">完全性肺静脉异位心上型 (TAPVC)</option>
              <option value="tapvc_cardiac">完全性肺静脉异位心内型</option>
              <option value="tapvc_infracardiac">完全性肺静脉异位心下型</option>
            </select>
          </div>
        </div>

        {/* Step 3: Atrioventricular Connection & Loop */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-cyan-300">
              节段 2: 房室连接方式 (AV Connection)
            </label>
            <select
              value={data.atrioventricularConnection}
              onChange={(e) => setData({ ...data, atrioventricularConnection: e.target.value as any })}
              className="w-full mt-1 px-2 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100"
            >
              <option value="concordant">房室一致 (Concordant: RA-RV, LA-LV)</option>
              <option value="discordant">房室不一致 (Discordant: RA-LV, LA-RV)</option>
              <option value="double_inlet">双入口心室 (Double Inlet Ventricle)</option>
              <option value="single_inlet">单入口心室 (Single Inlet)</option>
              <option value="absent_right">右侧房室连接缺如 (三尖瓣闭锁)</option>
              <option value="absent_left">左侧房室连接缺如 (二尖瓣闭锁)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-cyan-300">心室袢向 (Looping)</label>
            <select
              value={data.ventricularLoop}
              onChange={(e) => setData({ ...data, ventricularLoop: e.target.value as any })}
              className="w-full mt-1 px-2 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100"
            >
              <option value="d_loop">D-袢 (形态学右室位于右前方)</option>
              <option value="l_loop">L-袢 (形态学右室位于左侧 - 心室倒位)</option>
              <option value="indeterminate">不定型心室</option>
            </select>
          </div>
        </div>

        {/* Step 4 & 5: Ventriculoarterial Connection & Great Arteries Relation */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-cyan-300">
              节段 3: 室大动脉连接 (VA Connection)
            </label>
            <select
              value={data.ventriculoarterialConnection}
              onChange={(e) => setData({ ...data, ventriculoarterialConnection: e.target.value as any })}
              className="w-full mt-1 px-2 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100"
            >
              <option value="concordant">室大动脉一致 (RV-PA, LV-Ao)</option>
              <option value="discordant">室大动脉不一致 (RV-Ao, LV-PA 大动脉转位)</option>
              <option value="double_outlet_rv">右心室双出口 (DORV)</option>
              <option value="double_outlet_lv">左心室双出口 (DOLV)</option>
              <option value="single_outlet">单一大动脉干 (永存动脉干 / 闭锁)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-300">大动脉空间关系</label>
            <select
              value={data.greatArteriesRelation}
              onChange={(e) => setData({ ...data, greatArteriesRelation: e.target.value as any })}
              className="w-full mt-1 px-2 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100"
            >
              <option value="normal_spiral">正常空间螺旋交叉 (主动脉右后，肺动脉左前)</option>
              <option value="d_transposition">D-转位 (主动脉位于右前方，两血管平行)</option>
              <option value="l_transposition">L-转位 (主动脉位于左前方)</option>
              <option value="side_by_side">并列排列 (Side-by-side)</option>
              <option value="single_trunk">单干型 (Single Trunk)</option>
            </select>
          </div>
        </div>

        {/* Chamber Dimensions & EF */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">心腔超声测值 (mm) 与功能</label>
          <div className="grid grid-cols-6 gap-2">
            <div>
              <span className="text-[10px] text-slate-400">LA</span>
              <input
                type="text"
                value={data.cardiacChamberDimensions.la}
                onChange={(e) =>
                  setData({
                    ...data,
                    cardiacChamberDimensions: { ...data.cardiacChamberDimensions, la: e.target.value },
                  })
                }
                className="w-full mt-0.5 px-1 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-center text-slate-100 font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">LV</span>
              <input
                type="text"
                value={data.cardiacChamberDimensions.lv}
                onChange={(e) =>
                  setData({
                    ...data,
                    cardiacChamberDimensions: { ...data.cardiacChamberDimensions, lv: e.target.value },
                  })
                }
                className="w-full mt-0.5 px-1 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-center text-slate-100 font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">RA</span>
              <input
                type="text"
                value={data.cardiacChamberDimensions.ra}
                onChange={(e) =>
                  setData({
                    ...data,
                    cardiacChamberDimensions: { ...data.cardiacChamberDimensions, ra: e.target.value },
                  })
                }
                className="w-full mt-0.5 px-1 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-center text-slate-100 font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">RV</span>
              <input
                type="text"
                value={data.cardiacChamberDimensions.rv}
                onChange={(e) =>
                  setData({
                    ...data,
                    cardiacChamberDimensions: { ...data.cardiacChamberDimensions, rv: e.target.value },
                  })
                }
                className="w-full mt-0.5 px-1 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-center text-slate-100 font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">EF%</span>
              <input
                type="text"
                value={data.cardiacChamberDimensions.ef}
                onChange={(e) =>
                  setData({
                    ...data,
                    cardiacChamberDimensions: { ...data.cardiacChamberDimensions, ef: e.target.value },
                  })
                }
                className="w-full mt-0.5 px-1 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-center text-cyan-300 font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">FS%</span>
              <input
                type="text"
                value={data.cardiacChamberDimensions.fs}
                onChange={(e) =>
                  setData({
                    ...data,
                    cardiacChamberDimensions: { ...data.cardiacChamberDimensions, fs: e.target.value },
                  })
                }
                className="w-full mt-0.5 px-1 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-center text-slate-100 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Associated Shunts & Defects */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">合并分流病变 (分流孔径与压差)</label>
          <div className="space-y-1">
            {data.associatedShunts.map((shunt, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs bg-slate-950 p-1.5 rounded border border-slate-800">
                <span className="text-slate-300">{shunt}</span>
                <button
                  onClick={() => setData({ ...data, associatedShunts: data.associatedShunts.filter((_, i) => i !== idx) })}
                  className="text-slate-500 hover:text-rose-400 text-xs px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-1.5 mt-1">
            <input
              type="text"
              placeholder="输入分流描述 (如: 膜周部缺损5mm, 左向右分流)..."
              value={newShuntText}
              onChange={(e) => setNewShuntText(e.target.value)}
              className="flex-1 px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100"
            />
            <button
              onClick={() => {
                if (newShuntText.trim()) {
                  setData({ ...data, associatedShunts: [...data.associatedShunts, newShuntText.trim()] });
                  setNewShuntText('');
                }
              }}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
            >
              添加
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Live Clinical Structured Report & Print Preview */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-slate-100">先心超声连续节段结构化报告预览</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? '已复制报告' : '一键复制报告'}
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              打印/导出
            </button>
          </div>
        </div>

        {/* Paper Document Layout */}
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg space-y-5 text-xs font-sans shadow-md">
          {/* Header of Report */}
          <div className="text-center border-b border-slate-800 pb-3 space-y-0.5">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              CONGENITAL ECHOCARDIOGRAPHY STRUCTURED REPORT
            </div>
            <div className="text-base font-bold text-slate-100">超声心动图检查报告单 (先心病专科)</div>
            <div className="text-[11px] text-slate-400">连续节段分析法规范 (Situs-Loop-Vessels)</div>
          </div>

          {/* Section 1: Three Main Segments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-slate-950/60 rounded border border-slate-800/80">
            <div>
              <div className="text-[11px] font-semibold text-cyan-400 uppercase">【1. 心房与静脉】</div>
              <div className="text-slate-300 mt-1">
                {data.visceroatrialSitus === 'solitus'
                  ? '心房正位 (Situs Solitus)'
                  : data.visceroatrialSitus === 'inversus'
                  ? '心房反位 (Situs Inversus)'
                  : '心房异构畸形'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                体静脉: {data.systemicVenousReturn}
              </div>
              <div className="text-[11px] text-slate-400">
                肺静脉: {data.pulmonaryVenousReturn}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-cyan-400 uppercase">【2. 房室连接】</div>
              <div className="text-slate-300 mt-1">
                {data.atrioventricularConnection}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                心室袢向: {data.ventricularLoop === 'd_loop' ? 'D-袢 (右室居右)' : 'L-袢 (心室倒位)'}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-cyan-400 uppercase">【3. 室大动脉连接】</div>
              <div className="text-slate-300 mt-1">
                {data.ventriculoarterialConnection}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                空间关系: {data.greatArteriesRelation}
              </div>
            </div>
          </div>

          {/* Section 2: Measurements */}
          <div className="p-3 bg-slate-950/60 rounded border border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-300 mb-1.5">【心腔内径与收缩功能指标】</div>
            <div className="grid grid-cols-6 gap-2 text-center font-mono">
              <div className="p-1.5 bg-slate-900 rounded">
                <span className="text-[10px] text-slate-500 block">左房 (LA)</span>
                <span className="text-slate-200 font-bold">{data.cardiacChamberDimensions.la} mm</span>
              </div>
              <div className="p-1.5 bg-slate-900 rounded">
                <span className="text-[10px] text-slate-500 block">左室 (LV)</span>
                <span className="text-slate-200 font-bold">{data.cardiacChamberDimensions.lv} mm</span>
              </div>
              <div className="p-1.5 bg-slate-900 rounded">
                <span className="text-[10px] text-slate-500 block">右房 (RA)</span>
                <span className="text-slate-200 font-bold">{data.cardiacChamberDimensions.ra} mm</span>
              </div>
              <div className="p-1.5 bg-slate-900 rounded">
                <span className="text-[10px] text-slate-500 block">右室 (RV)</span>
                <span className="text-slate-200 font-bold">{data.cardiacChamberDimensions.rv} mm</span>
              </div>
              <div className="p-1.5 bg-slate-900 rounded">
                <span className="text-[10px] text-slate-500 block">射血分数 EF</span>
                <span className="text-cyan-300 font-bold">{data.cardiacChamberDimensions.ef}%</span>
              </div>
              <div className="p-1.5 bg-slate-900 rounded">
                <span className="text-[10px] text-slate-500 block">缩短分数 FS</span>
                <span className="text-slate-200 font-bold">{data.cardiacChamberDimensions.fs}%</span>
              </div>
            </div>
          </div>

          {/* Section 3: Diagnostic Impressions (Editable) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200">
              【超声诊断结论与声像所见】
            </label>
            <textarea
              rows={4}
              value={data.diagnosticImpression}
              onChange={(e) => setData({ ...data, diagnosticImpression: e.target.value })}
              className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100 leading-relaxed font-sans focus:outline-none focus:border-cyan-500/80"
            />
          </div>

          {/* Section 4: Clinical Recommendations */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cyan-300">
              【指南循证建议与临床干预时机】
            </label>
            <textarea
              rows={3}
              value={data.recommendations}
              onChange={(e) => setData({ ...data, recommendations: e.target.value })}
              className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded text-slate-100 leading-relaxed font-sans focus:outline-none focus:border-cyan-500/80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
