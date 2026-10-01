export type CHDCategory = 
  | 'atrial_shunts'        // 心房水平分流 (ASD, PFO, PAPVC)
  | 'ventricular_shunts'   // 心室水平分流 (VSD)
  | 'arterial_shunts'      // 大动脉水平分流 (PDA, APW)
  | 'left_obstructive'     // 左心梗阻 (CoA, IAA, AS, BAV, HLHS)
  | 'right_obstructive'    // 右心梗阻 (PS, PA-IVS)
  | 'conotruncal_cyanotic' // 圆锥动脉干与发绀型 (TOF, d-TGA, ccTGA, PTA)
  | 'complex_av_canal';    // 房室管与复合畸形 (CAVSD, Ebstein, TAPVC, 单心室)

export interface GuidelineRecommendation {
  indication: string;
  class: 'Class I' | 'Class IIa' | 'Class IIb' | 'Class III';
  levelOfEvidence: 'Level A' | 'Level B' | 'Level C';
  source: string;
  notes?: string;
}

export interface EchoDiagnosticCriterion {
  parameter: string;
  standardView: string;
  cutoffValue: string;
  clinicalSignificance: string;
}

export interface CHDDefect {
  id: string;
  nameCn: string;
  nameEn: string;
  abbreviation: string;
  category: CHDCategory;
  summary: string;
  pathophysiology: string;
  echoDiagnosticCriteria: EchoDiagnosticCriterion[];
  standardScanningViews: string[];
  keyMeasurements: string[];
  guidelines: GuidelineRecommendation[];
  interventionalCriteria?: string[];
  surgicalCriteria?: string[];
  highRiskPitfalls: string[];
}

export interface PatientProfile {
  ageYears: number;
  ageMonths: number;
  ageDays: number;
  gender: 'male' | 'female';
  weightKg: number;
  heightCm: number;
  bsa: number; // m²
  systolicBP: number; // mmHg
  diastolicBP: number; // mmHg
  heartRate: number; // bpm
  oxygenSaturation: number; // %
  symptoms: string;
}

export interface ZScoreResult {
  structure: string;
  measuredMm: number;
  expectedMeanMm: number;
  standardDeviationMm: number;
  zScore: number;
  interpretation: 'Hypoplastic / Severely Reduced' | 'Mildly Reduced' | 'Normal' | 'Mildly Dilated' | 'Moderately Dilated' | 'Severely Dilated';
}

export interface ShuntCalculationResult {
  qpQs: number;
  pulmonaryFlowLMin: number;
  systemicFlowLMin: number;
  significance: 'Right-to-Left Shunt' | 'Trivial Left-to-Right' | 'Significant Left-to-Right' | 'Severe Shunt / Volume Overload';
}

export interface DecisionNode {
  id: string;
  question: string;
  description?: string;
  criteria?: string;
  options: {
    label: string;
    description?: string;
    nextNodeId?: string;
    result?: DecisionResult;
  }[];
}

export interface DecisionResult {
  decision: string;
  recommendationLevel: 'Class I' | 'Class IIa' | 'Class IIb' | 'Class III' | 'Urgent';
  actionType: 'Interventional Catheterization' | 'Surgical Repair' | 'Medical / Observation' | 'Emergency Intervention' | 'Palliative Surgery';
  rationale: string;
  guidelineReference: string;
  followUpPlan: string;
}

export interface DecisionTree {
  id: string;
  title: string;
  diseaseName: string;
  guidelineSource: string;
  rootNodeId: string;
  nodes: Record<string, DecisionNode>;
}

export interface SegmentalAnalysisData {
  visceroatrialSitus: 'solitus' | 'inversus' | 'ambiguus_right' | 'ambiguus_left';
  systemicVenousReturn: 'normal' | 'plsvc_to_cs' | 'interrupted_ivc' | 'bilateral_svc';
  pulmonaryVenousReturn: 'normal' | 'tapvc_supracardiac' | 'tapvc_cardiac' | 'tapvc_infracardiac' | 'papvc';
  atrioventricularConnection: 'concordant' | 'discordant' | 'double_inlet' | 'single_inlet' | 'absent_right' | 'absent_left';
  ventricularLoop: 'd_loop' | 'l_loop' | 'indeterminate';
  ventriculoarterialConnection: 'concordant' | 'discordant' | 'double_outlet_rv' | 'double_outlet_lv' | 'single_outlet';
  greatArteriesRelation: 'normal_spiral' | 'd_transposition' | 'l_transposition' | 'side_by_side' | 'single_trunk';
  associatedShunts: string[];
  associatedObstructions: string[];
  associatedValvularLesions: string[];
  cardiacChamberDimensions: {
    la: string;
    lv: string;
    ra: string;
    rv: string;
    ef: string;
    fs: string;
  };
  diagnosticImpression: string;
  recommendations: string;
}
