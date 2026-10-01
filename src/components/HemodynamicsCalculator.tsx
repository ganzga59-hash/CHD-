import React, { useState, useMemo } from 'react';
import {
  calculateHaycockBSA,
  PEDIATRIC_ZSCORE_DEFS,
  calculateSingleZScore,
  calculateQpQs,
  calculatePASP,
  calculateRVSPByVSD,
  calculateMcGoonRatio,
  calculateNakataIndex,
  calculateCelermayerScore,
  calculateEchoPVR,
} from '../utils/hemodynamics';
import { PatientProfile } from '../types/chd';
import { Calculator, Activity, ArrowRight, RotateCcw } from 'lucide-react';

interface HemodynamicsCalculatorProps {
  initialPatient?: Partial<PatientProfile>;
}

export const HemodynamicsCalculator: React.FC<HemodynamicsCalculatorProps> = ({ initialPatient }) => {
  // Patient Anthropometry State
  const [patient, setPatient] = useState<PatientProfile>({
    ageYears: 3,
    ageMonths: 6,
    ageDays: 0,
    gender: 'female',
    weightKg: 14.5,
    heightCm: 98,
    bsa: 0.62,
    systolicBP: 95,
    diastolicBP: 60,
    heartRate: 105,
    oxygenSaturation: 98,
    symptoms: '平素易感冒，活动耐量稍差，未见发绀',
    ...initialPatient,
  });

  // Re-calculate BSA whenever height or weight changes
  const computedBSA = useMemo(() => {
    return calculateHaycockBSA(patient.heightCm, patient.weightKg);
  }, [patient.heightCm, patient.weightKg]);

  // Z-Score Inputs (in mm)
  const [zInputs, setZInputs] = useState<Record<string, number>>({
    aov: 11.8,
    aao: 13.5,
    pv: 13.2,
    mpa: 14.0,
    rpa: 8.5,
    lpa: 8.0,
    mv: 15.0,
    tv: 17.5,
    lvedd: 33.0,
  });

  // Qp/Qs Inputs
  const [qpQsInputs, setQpQsInputs] = useState({
    rvotDiamMm: 15.5,
    rvotVtiCm: 22.0,
    lvotDiamMm: 12.0,
    lvotVtiCm: 16.5,
  });

  // Pulmonary Hemodynamics Inputs
  const [paspInputs, setPaspInputs] = useState({
    trVmax: 3.2, // m/s
    rap: 5,      // mmHg
    vsdVmax: 4.2, // m/s
    rvotVtiForPvr: 22.0, // cm
  });

  // TOF McGoon & Nakata Inputs
  const [tofInputs, setTofInputs] = useState({
    rpaDiamMm: 7.2,
    lpaDiamMm: 6.8,
    descAoMm: 9.0,
  });

  // Ebstein Inputs (cm²)
  const [ebsteinInputs, setEbsteinInputs] = useState({
    raArea: 14.0,
    arvArea: 10.5,
    frvArea: 12.0,
    laArea: 8.0,
    lvArea: 15.0,
  });

  // Derived Calculations
  const zScoreResults = useMemo(() => {
    return Object.keys(PEDIATRIC_ZSCORE_DEFS).map((key) => {
      const val = zInputs[key] || 0;
      return calculateSingleZScore(key, val, computedBSA);
    });
  }, [zInputs, computedBSA]);

  const qpQsResult = useMemo(() => {
    return calculateQpQs(
      qpQsInputs.rvotDiamMm,
      qpQsInputs.rvotVtiCm,
      qpQsInputs.lvotDiamMm,
      qpQsInputs.lvotVtiCm
    );
  }, [qpQsInputs]);

  const paspResult = useMemo(() => {
    return calculatePASP(paspInputs.trVmax, paspInputs.rap);
  }, [paspInputs.trVmax, paspInputs.rap]);

  const rvspByVsd = useMemo(() => {
    return calculateRVSPByVSD(patient.systolicBP, paspInputs.vsdVmax);
  }, [patient.systolicBP, paspInputs.vsdVmax]);

  const pvrResult = useMemo(() => {
    return calculateEchoPVR(paspInputs.trVmax, paspInputs.rvotVtiForPvr);
  }, [paspInputs.trVmax, paspInputs.rvotVtiForPvr]);

  const mcgoonResult = useMemo(() => {
    return calculateMcGoonRatio(tofInputs.rpaDiamMm, tofInputs.lpaDiamMm, tofInputs.descAoMm);
  }, [tofInputs]);

  const nakataResult = useMemo(() => {
    return calculateNakataIndex(tofInputs.rpaDiamMm, tofInputs.lpaDiamMm, computedBSA);
  }, [tofInputs.rpaDiamMm, tofInputs.lpaDiamMm, computedBSA]);

  const celermayerResult = useMemo(() => {
    return calculateCelermayerScore(
      ebsteinInputs.raArea,
      ebsteinInputs.arvArea,
      ebsteinInputs.frvArea,
      ebsteinInputs.laArea,
      ebsteinInputs.lvArea
    );
  }, [ebsteinInputs]);

  // Quick Clinical Presets
  const applyPreset = (presetName: string) => {
    if (presetName === 'asd_large_shunt') {
      setPatient((prev) => ({
        ...prev,
        ageYears: 4,
        weightKg: 16,
        heightCm: 102,
        symptoms: '易疲劳，反复气支管炎',
      }));
      setQpQsInputs({
        rvotDiamMm: 18.0,
        rvotVtiCm: 25.0,
        lvotDiamMm: 12.0,
        lvotVtiCm: 15.0,
      });
      setPaspInputs((prev) => ({ ...prev, trVmax: 2.8, rap: 8 }));
    } else if (presetName === 'tof_stenosis') {
      setPatient((prev) => ({
        ...prev,
        ageYears: 0,
        ageMonths: 8,
        weightKg: 7.2,
        heightCm: 68,
        oxygenSaturation: 82,
        symptoms: '口周及指端发绀，哭闹加重',
      }));
      setTofInputs({
        rpaDiamMm: 4.8,
        lpaDiamMm: 4.5,
        descAoMm: 7.2,
      });
      setZInputs((prev) => ({
        ...prev,
        pv: 6.2,
        mpa: 6.5,
        rpa: 4.8,
        lpa: 4.5,
      }));
    } else if (presetName === 'vsd_restrictive') {
      setPaspInputs((prev) => ({
        ...prev,
        vsdVmax: 4.4,
      }));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950">
      {/* Top Banner & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            儿科心脏超声 Z-Score 与血流动力学计算引擎
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            采用 Haycock BSA 标准公式及波士顿儿童医院 (Boston Children's / Pettersen) 儿科心血管正常值回归方程
          </p>
        </div>

        {/* Preset quick buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">典型预设：</span>
          <button
            onClick={() => applyPreset('asd_large_shunt')}
            className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded cursor-pointer transition-colors"
          >
            典型ASD大分流
          </button>
          <button
            onClick={() => applyPreset('tof_stenosis')}
            className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded cursor-pointer transition-colors"
          >
            法洛四联症小婴儿
          </button>
          <button
            onClick={() => applyPreset('vsd_restrictive')}
            className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded cursor-pointer transition-colors"
          >
            限制性室缺高压差
          </button>
        </div>
      </div>

      {/* Grid: Left Patient Anthropometry & Right BSA Ribbon */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Patient Parameters Box */}
        <div className="lg:col-span-3 p-4 bg-slate-900/60 border border-slate-800 rounded space-y-3">
          <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wide flex items-center justify-between">
            <span>患儿体格发育参数 (Anthropometric Parameters)</span>
            <span className="font-mono text-slate-400 text-[11px]">
              实时计算 BSA = {computedBSA.toFixed(3)} m²
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            <div>
              <label className="text-[11px] text-slate-400">年龄 (岁/月)</label>
              <div className="flex items-center gap-1 mt-1">
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={patient.ageYears}
                  onChange={(e) => setPatient({ ...patient, ageYears: parseInt(e.target.value) || 0 })}
                  className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
                />
                <span className="text-xs text-slate-500">岁</span>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={patient.ageMonths}
                  onChange={(e) => setPatient({ ...patient, ageMonths: parseInt(e.target.value) || 0 })}
                  className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
                />
                <span className="text-xs text-slate-500">月</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400">体重 (kg)</label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                value={patient.weightKg}
                onChange={(e) => setPatient({ ...patient, weightKg: parseFloat(e.target.value) || 1 })}
                className="w-full mt-1 px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400">身高/身长 (cm)</label>
              <input
                type="number"
                step="0.5"
                min="30"
                value={patient.heightCm}
                onChange={(e) => setPatient({ ...patient, heightCm: parseFloat(e.target.value) || 40 })}
                className="w-full mt-1 px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400">收缩压 / 舒张压 (mmHg)</label>
              <div className="flex items-center gap-1 mt-1">
                <input
                  type="number"
                  value={patient.systolicBP}
                  onChange={(e) => setPatient({ ...patient, systolicBP: parseInt(e.target.value) || 90 })}
                  className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
                />
                <span className="text-slate-500">/</span>
                <input
                  type="number"
                  value={patient.diastolicBP}
                  onChange={(e) => setPatient({ ...patient, diastolicBP: parseInt(e.target.value) || 60 })}
                  className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400">心率 (bpm)</label>
              <input
                type="number"
                value={patient.heartRate}
                onChange={(e) => setPatient({ ...patient, heartRate: parseInt(e.target.value) || 100 })}
                className="w-full mt-1 px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400">经皮血氧 (SpO₂ %)</label>
              <input
                type="number"
                min="30"
                max="100"
                value={patient.oxygenSaturation}
                onChange={(e) => setPatient({ ...patient, oxygenSaturation: parseInt(e.target.value) || 98 })}
                className="w-full mt-1 px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Current Case Metric Summary Tile */}
        <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded flex flex-col justify-between">
          <div>
            <div className="text-[11px] text-cyan-300 uppercase tracking-wide font-medium">体表面积 (Haycock)</div>
            <div className="text-3xl font-mono font-bold text-white mt-1">
              {computedBSA} <span className="text-sm font-normal text-slate-400">m²</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-cyan-500/20 text-[11px] text-slate-400 space-y-0.5">
            <div>脉压差: {patient.systolicBP - patient.diastolicBP} mmHg</div>
            <div>血氧状态: {patient.oxygenSaturation < 90 ? '低氧发绀危急' : '常态氧合'}</div>
          </div>
        </div>
      </div>

      {/* Module 1: Comprehensive Pediatric Echo Z-Score Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            1. 心脏大血管与瓣环内径 Z-Score 矩阵 (校正至当前 BSA: {computedBSA} m²)
          </h2>
          <span className="text-[11px] text-slate-500 font-mono">
            [-2.0 ~ +2.0 正常范围 | &lt;-2 狭窄/发育不良 | &gt;+2 扩张]
          </span>
        </div>

        <div className="border border-slate-800 rounded overflow-x-auto bg-slate-900/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800 font-mono">
              <tr>
                <th className="py-2.5 px-3">解剖解构</th>
                <th className="py-2.5 px-3">实测值 (mm)</th>
                <th className="py-2.5 px-3">预期均值 (Mean)</th>
                <th className="py-2.5 px-3">标准差 (SD)</th>
                <th className="py-2.5 px-3">计算 Z-Score</th>
                <th className="py-2.5 px-3">临床评价</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {Object.entries(PEDIATRIC_ZSCORE_DEFS).map(([key, def]) => {
                const measured = zInputs[key] || 0;
                const result = calculateSingleZScore(key, measured, computedBSA);
                const isHypoplastic = result.zScore < -2.0;
                const isDilated = result.zScore > 2.0;
                const isSeverelyAbnormal = Math.abs(result.zScore) >= 3.0;

                return (
                  <tr key={key} className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-sans font-medium text-slate-100">
                      {def.nameCn}
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="0.1"
                        value={measured}
                        onChange={(e) =>
                          setZInputs({
                            ...zInputs,
                            [key]: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-20 px-2 py-0.5 text-xs bg-slate-950 border border-slate-800 rounded text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                      />
                    </td>
                    <td className="py-2 px-3 text-slate-400">{result.expectedMeanMm} mm</td>
                    <td className="py-2 px-3 text-slate-500">{result.standardDeviationMm} mm</td>
                    <td className="py-2 px-3">
                      <span
                        className={`font-bold tabular-nums ${
                          isSeverelyAbnormal
                            ? 'text-rose-400'
                            : isHypoplastic
                            ? 'text-amber-400'
                            : isDilated
                            ? 'text-purple-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {result.zScore > 0 ? `+${result.zScore}` : result.zScore}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-sans">
                      <span
                        className={`text-[11px] ${
                          isSeverelyAbnormal
                            ? 'text-rose-400 font-semibold'
                            : isHypoplastic
                            ? 'text-amber-400'
                            : isDilated
                            ? 'text-purple-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {result.interpretation === 'Normal'
                          ? '正常区间'
                          : result.interpretation === 'Hypoplastic / Severely Reduced'
                          ? '极度发育不良 / 重度狭窄'
                          : result.interpretation === 'Mildly Reduced'
                          ? '偏小 / 轻度发育迟缓'
                          : result.interpretation === 'Mildly Dilated'
                          ? '轻度扩张 / 容量负荷'
                          : result.interpretation === 'Moderately Dilated'
                          ? '中度扩张'
                          : '重度扩张'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Module 2: Hemodynamics Section (Qp/Qs, RVSP, PVR) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Qp/Qs Shunt Calculator */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">
              2. 分流比率 Qp / Qs 多普勒定量计算
            </h3>
            <span className="text-[11px] font-mono text-cyan-400 font-bold">
              Qp/Qs = {qpQsResult.qpQs}
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            公式: (RVOT内径² × RVOT VTI) / (LVOT内径² × LVOT VTI)
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] text-slate-400">RVOT内径 (mm)</label>
              <input
                type="number"
                step="0.5"
                value={qpQsInputs.rvotDiamMm}
                onChange={(e) => setQpQsInputs({ ...qpQsInputs, rvotDiamMm: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">RVOT VTI (cm)</label>
              <input
                type="number"
                step="0.5"
                value={qpQsInputs.rvotVtiCm}
                onChange={(e) => setQpQsInputs({ ...qpQsInputs, rvotVtiCm: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">LVOT内径 (mm)</label>
              <input
                type="number"
                step="0.5"
                value={qpQsInputs.lvotDiamMm}
                onChange={(e) => setQpQsInputs({ ...qpQsInputs, lvotDiamMm: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">LVOT VTI (cm)</label>
              <input
                type="number"
                step="0.5"
                value={qpQsInputs.lvotVtiCm}
                onChange={(e) => setQpQsInputs({ ...qpQsInputs, lvotVtiCm: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">分流判定：</span>
            <span
              className={`font-semibold ${
                qpQsResult.qpQs >= 2.0
                  ? 'text-rose-400'
                  : qpQsResult.qpQs >= 1.5
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {qpQsResult.qpQs >= 1.5
                ? `显著左向右分流 (Qp/Qs ≥ 1.5 - 符合闭合适应证)`
                : `微量或非显著分流 (暂无容量负荷指征)`}
            </span>
          </div>
        </div>

        {/* Pulmonary Pressures & Echo PVR */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">
              3. 肺动脉收缩压 (PASP) 与超声阻力估算
            </h3>
            <span className="text-[11px] font-mono text-cyan-400 font-bold">
              PASP = {paspResult} mmHg
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] text-slate-400">三尖瓣反流速度 TR Vmax (m/s)</label>
              <input
                type="number"
                step="0.1"
                value={paspInputs.trVmax}
                onChange={(e) => setPaspInputs({ ...paspInputs, trVmax: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">预设右心房压 RAP (mmHg)</label>
              <input
                type="number"
                value={paspInputs.rap}
                onChange={(e) => setPaspInputs({ ...paspInputs, rap: parseInt(e.target.value) || 5 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">室缺分流速度 VSD Vmax (m/s)</label>
              <input
                type="number"
                step="0.1"
                value={paspInputs.vsdVmax}
                onChange={(e) => setPaspInputs({ ...paspInputs, vsdVmax: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">RVOT VTI (用于PVR推算, cm)</label>
              <input
                type="number"
                step="0.5"
                value={paspInputs.rvotVtiForPvr}
                onChange={(e) => setPaspInputs({ ...paspInputs, rvotVtiForPvr: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded border border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">VSD压差推算右室压 (RVSP = SBP - 4v²):</span>
              <span className="font-mono text-slate-100 font-bold">{rvspByVsd} mmHg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">超声推算肺血管阻力 (PVR Wood Units):</span>
              <span className="font-mono text-cyan-300 font-bold">{pvrResult.pvrWoodUnits} WU ({pvrResult.status})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: Specialized Indices (McGoon/Nakata for TOF & Celermayer for Ebstein) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* TOF McGoon & Nakata Box */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">
              4. 法洛四联症肺动脉发育评估 (McGoon比值 & Nakata指数)
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-[11px] text-slate-400">右肺动脉 RPA (mm)</label>
              <input
                type="number"
                step="0.1"
                value={tofInputs.rpaDiamMm}
                onChange={(e) => setTofInputs({ ...tofInputs, rpaDiamMm: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">左肺动脉 LPA (mm)</label>
              <input
                type="number"
                step="0.1"
                value={tofInputs.lpaDiamMm}
                onChange={(e) => setTofInputs({ ...tofInputs, lpaDiamMm: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">膈肌降主动脉 (mm)</label>
              <input
                type="number"
                step="0.1"
                value={tofInputs.descAoMm}
                onChange={(e) => setTofInputs({ ...tofInputs, descAoMm: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-950/80 rounded border border-slate-800">
              <div className="text-[11px] text-slate-400">McGoon 比值</div>
              <div className="text-lg font-mono font-bold text-cyan-300">{mcgoonResult.ratio}</div>
              <div className="text-[11px] text-slate-300 mt-1">{mcgoonResult.feasibility}</div>
            </div>
            <div className="p-3 bg-slate-950/80 rounded border border-slate-800">
              <div className="text-[11px] text-slate-400">Nakata 肺动脉指数</div>
              <div className="text-lg font-mono font-bold text-cyan-300">{nakataResult.index} <span className="text-xs text-slate-500 font-sans">mm²/m²</span></div>
              <div className="text-[11px] text-slate-300 mt-1">{nakataResult.evaluation}</div>
            </div>
          </div>
        </div>

        {/* Ebstein Celermayer Score */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">
              5. 埃布斯坦综合征 Celermayer 超声危险积分
            </h3>
            <span className="text-[11px] font-mono text-cyan-400 font-bold">
              积分: {celermayerResult.score} ({celermayerResult.grade})
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            公式: (右心房RA + 房化右室aRV) / (功能右室fRV + 左心房LA + 左心室LV)
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-slate-400">RA (cm²)</label>
              <input
                type="number"
                step="0.5"
                value={ebsteinInputs.raArea}
                onChange={(e) => setEbsteinInputs({ ...ebsteinInputs, raArea: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-1.5 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400">aRV房化 (cm²)</label>
              <input
                type="number"
                step="0.5"
                value={ebsteinInputs.arvArea}
                onChange={(e) => setEbsteinInputs({ ...ebsteinInputs, arvArea: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-1.5 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400">fRV功能 (cm²)</label>
              <input
                type="number"
                step="0.5"
                value={ebsteinInputs.frvArea}
                onChange={(e) => setEbsteinInputs({ ...ebsteinInputs, frvArea: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-1.5 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400">LA (cm²)</label>
              <input
                type="number"
                step="0.5"
                value={ebsteinInputs.laArea}
                onChange={(e) => setEbsteinInputs({ ...ebsteinInputs, laArea: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-1.5 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400">LV (cm²)</label>
              <input
                type="number"
                step="0.5"
                value={ebsteinInputs.lvArea}
                onChange={(e) => setEbsteinInputs({ ...ebsteinInputs, lvArea: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 px-1.5 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-100"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded border border-slate-800 text-xs">
            <div className="font-semibold text-slate-200">临床预后与病死率风险评估：</div>
            <div className="text-slate-300 mt-1 leading-relaxed">
              {celermayerResult.riskDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
