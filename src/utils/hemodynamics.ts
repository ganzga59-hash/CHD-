import { ZScoreResult, ShuntCalculationResult } from '../types/chd';

/**
 * Calculates Body Surface Area (BSA) using the Haycock formula (widely used in pediatric cardiology)
 * BSA (m²) = 0.024265 * Height(cm)^0.3964 * Weight(kg)^0.5378
 */
export function calculateHaycockBSA(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0.2;
  const bsa = 0.024265 * Math.pow(heightCm, 0.3964) * Math.pow(weightKg, 0.5378);
  return parseFloat(bsa.toFixed(3));
}

/**
 * Mosteller BSA: sqrt( (Height * Weight) / 3600 )
 */
export function calculateMostellerBSA(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0.2;
  const bsa = Math.sqrt((heightCm * weightKg) / 3600);
  return parseFloat(bsa.toFixed(3));
}

export interface ZScoreDefinition {
  structure: string;
  nameCn: string;
  unit: string;
  calcMean: (bsa: number) => number;
  calcSD: (bsa: number) => number;
}

// Pediatric Cardiovascular Z-Score Normative Data based on Pettersen et al. JASE 2008 & Boston Children's
export const PEDIATRIC_ZSCORE_DEFS: Record<string, ZScoreDefinition> = {
  aov: {
    structure: 'Aortic Valve Annulus',
    nameCn: '主动脉瓣环 (AoV)',
    unit: 'mm',
    calcMean: (bsa) => 14.2 * Math.pow(bsa, 0.48),
    calcSD: (bsa) => 1.25 * Math.pow(bsa, 0.35),
  },
  aao: {
    structure: 'Ascending Aorta',
    nameCn: '升主动脉 (AAo)',
    unit: 'mm',
    calcMean: (bsa) => 16.8 * Math.pow(bsa, 0.49),
    calcSD: (bsa) => 1.45 * Math.pow(bsa, 0.35),
  },
  pv: {
    structure: 'Pulmonary Valve Annulus',
    nameCn: '肺动脉瓣环 (PV)',
    unit: 'mm',
    calcMean: (bsa) => 15.5 * Math.pow(bsa, 0.48),
    calcSD: (bsa) => 1.35 * Math.pow(bsa, 0.35),
  },
  mpa: {
    structure: 'Main Pulmonary Artery',
    nameCn: '主肺动脉 (MPA)',
    unit: 'mm',
    calcMean: (bsa) => 16.2 * Math.pow(bsa, 0.48),
    calcSD: (bsa) => 1.48 * Math.pow(bsa, 0.35),
  },
  rpa: {
    structure: 'Right Pulmonary Artery',
    nameCn: '右肺动脉 (RPA)',
    unit: 'mm',
    calcMean: (bsa) => 9.8 * Math.pow(bsa, 0.49),
    calcSD: (bsa) => 1.05 * Math.pow(bsa, 0.35),
  },
  lpa: {
    structure: 'Left Pulmonary Artery',
    nameCn: '左肺动脉 (LPA)',
    unit: 'mm',
    calcMean: (bsa) => 9.3 * Math.pow(bsa, 0.49),
    calcSD: (bsa) => 1.02 * Math.pow(bsa, 0.35),
  },
  mv: {
    structure: 'Mitral Valve Annulus',
    nameCn: '二尖瓣环 (MV)',
    unit: 'mm',
    calcMean: (bsa) => 18.2 * Math.pow(bsa, 0.48),
    calcSD: (bsa) => 1.6 * Math.pow(bsa, 0.35),
  },
  tv: {
    structure: 'Tricuspid Valve Annulus',
    nameCn: '三尖瓣环 (TV)',
    unit: 'mm',
    calcMean: (bsa) => 19.8 * Math.pow(bsa, 0.48),
    calcSD: (bsa) => 1.8 * Math.pow(bsa, 0.35),
  },
  lvedd: {
    structure: 'Left Ventricle End-Diastolic Dimension',
    nameCn: '左室舒张末内径 (LVEDD)',
    unit: 'mm',
    calcMean: (bsa) => 38.5 * Math.pow(bsa, 0.46),
    calcSD: (bsa) => 3.2 * Math.pow(bsa, 0.35),
  },
};

export function calculateSingleZScore(
  structureKey: string,
  measuredValueMm: number,
  bsa: number
): ZScoreResult {
  const def = PEDIATRIC_ZSCORE_DEFS[structureKey];
  if (!def || bsa <= 0 || measuredValueMm <= 0) {
    return {
      structure: structureKey,
      measuredMm: measuredValueMm,
      expectedMeanMm: 0,
      standardDeviationMm: 0,
      zScore: 0,
      interpretation: 'Normal',
    };
  }

  const expectedMean = def.calcMean(bsa);
  const sd = def.calcSD(bsa);
  const zScore = (measuredValueMm - expectedMean) / sd;
  const roundedZ = parseFloat(zScore.toFixed(2));

  let interpretation: ZScoreResult['interpretation'] = 'Normal';
  if (roundedZ < -3) interpretation = 'Hypoplastic / Severely Reduced';
  else if (roundedZ < -2) interpretation = 'Mildly Reduced';
  else if (roundedZ <= 2) interpretation = 'Normal';
  else if (roundedZ <= 3) interpretation = 'Mildly Dilated';
  else if (roundedZ <= 4) interpretation = 'Moderately Dilated';
  else interpretation = 'Severely Dilated';

  return {
    structure: def.nameCn,
    measuredMm: measuredValueMm,
    expectedMeanMm: parseFloat(expectedMean.toFixed(1)),
    standardDeviationMm: parseFloat(sd.toFixed(2)),
    zScore: roundedZ,
    interpretation,
  };
}

/**
 * Calculates Shunt Ratio Qp / Qs using Echo Velocity-Time Integrals (VTI) and Diameters:
 * Qp = pi * (RVOT_diam/2)^2 * VTI_RVOT
 * Qs = pi * (LVOT_diam/2)^2 * VTI_LVOT
 * Qp/Qs = (RVOT_diam^2 * VTI_RVOT) / (LVOT_diam^2 * VTI_LVOT)
 */
export function calculateQpQs(
  rvotDiamMm: number,
  rvotVtiCm: number,
  lvotDiamMm: number,
  lvotVtiCm: number
): ShuntCalculationResult {
  if (rvotDiamMm <= 0 || rvotVtiCm <= 0 || lvotDiamMm <= 0 || lvotVtiCm <= 0) {
    return {
      qpQs: 1.0,
      pulmonaryFlowLMin: 0,
      systemicFlowLMin: 0,
      significance: 'Trivial Left-to-Right',
    };
  }

  const qp = Math.PI * Math.pow(rvotDiamMm / 20, 2) * rvotVtiCm; // cm³ per stroke
  const qs = Math.PI * Math.pow(lvotDiamMm / 20, 2) * lvotVtiCm; // cm³ per stroke

  const qpQs = qp / qs;
  const roundedQpQs = parseFloat(qpQs.toFixed(2));

  let significance: ShuntCalculationResult['significance'] = 'Trivial Left-to-Right';
  if (roundedQpQs < 0.9) {
    significance = 'Right-to-Left Shunt';
  } else if (roundedQpQs < 1.5) {
    significance = 'Trivial Left-to-Right';
  } else if (roundedQpQs < 2.0) {
    significance = 'Significant Left-to-Right';
  } else {
    significance = 'Severe Shunt / Volume Overload';
  }

  return {
    qpQs: roundedQpQs,
    pulmonaryFlowLMin: parseFloat((qp / 1000).toFixed(2)),
    systemicFlowLMin: parseFloat((qs / 1000).toFixed(2)),
    significance,
  };
}

/**
 * Right Ventricular Systolic Pressure (RVSP) / Pulmonary Artery Systolic Pressure (PASP)
 * PASP = 4 * (TR_Vmax)^2 + RAP
 */
export function calculatePASP(trVmaxMPerS: number, rapMmHg: number = 5): number {
  if (trVmaxMPerS <= 0) return 0;
  const gradient = 4 * Math.pow(trVmaxMPerS, 2);
  return parseFloat((gradient + rapMmHg).toFixed(1));
}

/**
 * RVSP estimation via VSD shunt peak velocity:
 * RVSP = Systolic BP - 4 * (VSD_Vmax)^2
 */
export function calculateRVSPByVSD(systolicBPMmHg: number, vsdVmaxMPerS: number): number {
  if (systolicBPMmHg <= 0 || vsdVmaxMPerS <= 0) return 0;
  const gradient = 4 * Math.pow(vsdVmaxMPerS, 2);
  const rvsp = systolicBPMmHg - gradient;
  return parseFloat(Math.max(0, rvsp).toFixed(1));
}

/**
 * McGoon Ratio for pulmonary artery development (Tetralogy of Fallot / Pulmonary Atresia):
 * McGoon = (RPA_diam + LPA_diam) / Descending_Aorta_diam
 * Reference:
 * >= 2.0: Normal
 * >= 1.5: Favorable for one-stage corrective repair
 * < 1.2: Inadequate pulmonary vascular bed; systemic-to-pulmonary shunt (e.g. modified Blalock-Taussig) indicated
 */
export function calculateMcGoonRatio(rpaMm: number, lpaMm: number, descAoMm: number): {
  ratio: number;
  feasibility: 'Adequate for Primary Repair' | 'Borderline / Relative Stenosis' | 'Inadequate PA Development / Shunt Indicated';
} {
  if (descAoMm <= 0 || (rpaMm + lpaMm) <= 0) {
    return { ratio: 0, feasibility: 'Inadequate PA Development / Shunt Indicated' };
  }
  const ratio = (rpaMm + lpaMm) / descAoMm;
  const rounded = parseFloat(ratio.toFixed(2));

  let feasibility: 'Adequate for Primary Repair' | 'Borderline / Relative Stenosis' | 'Inadequate PA Development / Shunt Indicated' = 'Adequate for Primary Repair';
  if (rounded < 1.2) feasibility = 'Inadequate PA Development / Shunt Indicated';
  else if (rounded < 1.5) feasibility = 'Borderline / Relative Stenosis';
  else feasibility = 'Adequate for Primary Repair';

  return { ratio: rounded, feasibility };
}

/**
 * Nakata PA Index (mm²/m²):
 * Nakata = [ pi * (RPA/2)^2 + pi * (LPA/2)^2 ] / BSA
 * Reference:
 * Normal: ~330 mm²/m²
 * >= 150 - 200 mm²/m²: Adequate for complete repair
 * < 150 mm²/m²: High risk for primary repair, consideration of palliative shunt
 */
export function calculateNakataIndex(rpaMm: number, lpaMm: number, bsa: number): {
  index: number;
  evaluation: 'Normal PA Index' | 'Adequate for Radical Repair' | 'Hypoplastic PA / High Postoperative RV Pressure';
} {
  if (bsa <= 0 || (rpaMm <= 0 && lpaMm <= 0)) {
    return { index: 0, evaluation: 'Hypoplastic PA / High Postoperative RV Pressure' };
  }

  const rpaArea = Math.PI * Math.pow(rpaMm / 2, 2);
  const lpaArea = Math.PI * Math.pow(lpaMm / 2, 2);
  const nakata = (rpaArea + lpaArea) / bsa;
  const rounded = parseFloat(nakata.toFixed(1));

  let evaluation: 'Normal PA Index' | 'Adequate for Radical Repair' | 'Hypoplastic PA / High Postoperative RV Pressure' = 'Adequate for Radical Repair';
  if (rounded >= 250) evaluation = 'Normal PA Index';
  else if (rounded >= 150) evaluation = 'Adequate for Radical Repair';
  else evaluation = 'Hypoplastic PA / High Postoperative RV Pressure';

  return { index: rounded, evaluation };
}

/**
 * Celermayer Echo Score for Ebstein's Anomaly:
 * Score = (RA area + aRV area) / (fRV area + LA area + LV area)
 * Grade 1: < 0.5 (Mortality < 10%)
 * Grade 2: 0.5 - 0.99 (Mortality ~10%)
 * Grade 3: 1.0 - 1.49 (Mortality ~45%)
 * Grade 4: >= 1.5 (Mortality ~100% in neonates without surgical salvage)
 */
export function calculateCelermayerScore(
  raAreaCm2: number,
  arvAreaCm2: number,
  frvAreaCm2: number,
  laAreaCm2: number,
  lvAreaCm2: number
): {
  score: number;
  grade: 'Grade 1 (Mild)' | 'Grade 2 (Moderate)' | 'Grade 3 (Severe)' | 'Grade 4 (Very Severe)';
  riskDescription: string;
} {
  const numerator = raAreaCm2 + arvAreaCm2;
  const denominator = frvAreaCm2 + laAreaCm2 + lvAreaCm2;

  if (denominator <= 0 || numerator <= 0) {
    return {
      score: 0,
      grade: 'Grade 1 (Mild)',
      riskDescription: '输入有效心腔面积以计算Celermayer积分',
    };
  }

  const score = parseFloat((numerator / denominator).toFixed(2));
  if (score < 0.5) {
    return {
      score,
      grade: 'Grade 1 (Mild)',
      riskDescription: '预后优良，新生儿期病死率低 (<10%)，常规内科监测或适龄成形',
    };
  } else if (score < 1.0) {
    return {
      score,
      grade: 'Grade 2 (Moderate)',
      riskDescription: '中度畸形，部分患儿需药物抗心衰支持，适龄评估Cone手术 (锥形重建术)',
    };
  } else if (score < 1.5) {
    return {
      score,
      grade: 'Grade 3 (Severe)',
      riskDescription: '重度畸形，围产期血流动力学显著不稳定，病死率约45%，需高度警惕功能性肺动脉闭锁',
    };
  } else {
    return {
      score,
      grade: 'Grade 4 (Very Severe)',
      riskDescription: '极重度畸形，新生儿期循环衰竭与病死率极高，需紧急评估Starnes术或单心室Fontan姑息路径',
    };
  }
}

/**
 * Pulmonary Vascular Resistance (PVR) Echocardiographic Estimation:
 * Abbas formula: PVR (Wood Units) = 10 * (TR_Vmax / RVOT_VTI) + 0.16
 */
export function calculateEchoPVR(trVmaxMPerS: number, rvotVtiCm: number): {
  pvrWoodUnits: number;
  status: 'Normal PVR (< 3 WU)' | 'Borderline Elevated (3-5 WU)' | 'Significantly High (> 5 WU - Vasoreactivity Testing Required)';
} {
  if (trVmaxMPerS <= 0 || rvotVtiCm <= 0) {
    return { pvrWoodUnits: 0, status: 'Normal PVR (< 3 WU)' };
  }

  const pvr = 10 * (trVmaxMPerS / rvotVtiCm) + 0.16;
  const rounded = parseFloat(pvr.toFixed(2));

  let status: 'Normal PVR (< 3 WU)' | 'Borderline Elevated (3-5 WU)' | 'Significantly High (> 5 WU - Vasoreactivity Testing Required)' = 'Normal PVR (< 3 WU)';
  if (rounded < 3.0) status = 'Normal PVR (< 3 WU)';
  else if (rounded <= 5.0) status = 'Borderline Elevated (3-5 WU)';
  else status = 'Significantly High (> 5 WU - Vasoreactivity Testing Required)';

  return { pvrWoodUnits: rounded, status };
}
