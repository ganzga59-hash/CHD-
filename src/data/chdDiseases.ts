import { CHDDefect } from '../types/chd';

export const CHD_DISEASES: CHDDefect[] = [
  {
    id: 'asd_secundum',
    nameCn: '继发孔型房间隔缺损',
    nameEn: 'Secundum Atrial Septal Defect',
    abbreviation: 'ASD (Secundum)',
    category: 'atrial_shunts',
    summary: '位于房间隔中心卵圆窝区域的缺损，占所有先心病ASD的75%~80%。血流动力学主要引起右心房、右心室容量负荷过重及肺血流增多。',
    pathophysiology: '左心房压力高于右心房，产生心房水平持续左向右分流。长期大分流可致右室重构、顺应性降低、肺血管阻力进行性升高及三尖瓣相对关闭不全。',
    standardScanningViews: [
      '剑突下双房/双腔切面 (Subcostal Bicaval View - 测量后下IVC缘的金标准)',
      '心尖四腔心切面 (Apical 4-Chamber - 测量房室瓣前下缘与后上缘)',
      '胸骨旁主动脉短轴切面 (PSAX Ao - 测量主动脉前上缘与后房壁缘)',
      '经食管超声 (TEE) 3D双房全景切面 (用于复杂多孔或边缘临界评估)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: '缺损最大伸展径 (Stretch Diameter)',
        standardView: '剑突下或TEE多切面',
        cutoffValue: '通常 5 ~ 38 mm',
        clinicalSignificance: '指导选择封堵器型号 (通常比测量静止径大2~4mm)'
      },
      {
        parameter: '后下缘 (IVC Rim - 下腔静脉缘)',
        standardView: '剑突下双腔静脉切面',
        cutoffValue: '必须 ≥ 5 mm (硬缘)',
        clinicalSignificance: '经皮封堵核心绝对条件，IVC缘不足极易导致封堵器脱落进入右房或下腔'
      },
      {
        parameter: '前上缘 (Aortic Rim - 主动脉缘)',
        standardView: '胸骨旁主动脉短轴切面',
        cutoffValue: '可缺如或 < 5 mm (允许部分包绕主动脉根部)',
        clinicalSignificance: '如主动脉缘完全缺如且组织松软，需警惕主动脉窦磨损或心包填塞并发症'
      },
      {
        parameter: '房室瓣缘 (AV Rim - 前下缘)',
        standardView: '心尖四腔心切面',
        cutoffValue: '必须 ≥ 5 mm 且与二/三尖瓣环分离',
        clinicalSignificance: '防止封堵器伞翼压迫阻碍二尖瓣前叶或三尖瓣隔叶运动'
      },
      {
        parameter: '分流比率 (Qp / Qs)',
        standardView: '多普勒血流定量计算',
        cutoffValue: 'Qp/Qs ≥ 1.5 为显著分流',
        clinicalSignificance: '右室容量负荷增大，达到介入封堵或外科修补指征'
      }
    ],
    keyMeasurements: [
      '缺损静态最大径与彩色多普勒血流束宽度',
      '周围6个边缘厚度与长度 (Aortic, SVC, IVC, Posterior, Mitral/AV, CS rims)',
      '右心房内径 (RA) 与右心室舒张末期内径 (RVEDD)',
      '肺动脉收缩压 (PASP) 及三尖瓣反流速度 (TR Vmax)'
    ],
    guidelines: [
      {
        indication: '无论有无症状，只要存在明确右心室容量负荷过重 (RV扩大) 且无不可逆肺动脉高压 (PVR < 5 Wood Units)',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: '2020 ESC ACHD Guidelines & 中华医学会儿科学分会共识',
        notes: '首选经皮导管介入封堵器闭合术 (解剖边缘符合时)'
      },
      {
        indication: '经皮介入封堵术：解剖边缘充分 (除主动脉缘外其余各边缘 ≥ 5mm，缺损至冠状静脉窦与右上肺静脉开口距离安全)',
        class: 'Class I',
        levelOfEvidence: 'Level A',
        source: 'ASE/SCAI Congenital Interventional Guidelines',
        notes: '创伤小、恢复快、无需体外循环'
      },
      {
        indication: '外科体外循环修补术：缺损过大 (静态径 > 38mm)、边缘不足 (< 5mm，尤其下腔静脉缘缺失) 或合并多孔筛状/房中隔瘤',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'STS/EACTS Guidelines',
        notes: '可行微创右侧前胸或胸骨下段正中切口直视修补'
      },
      {
        indication: '重度肺动脉高压已发展为艾森曼格综合征 (PVR ≥ 8 Wood Units, 静息双向或右向左分流, 经吸氧试验无反应)',
        class: 'Class III',
        levelOfEvidence: 'Level C',
        source: 'ESC / AHA ACHD Guidelines',
        notes: '绝对禁忌封堵或修补，盲目关闭将导致急性右心衰竭竭致死'
      }
    ],
    interventionalCriteria: [
      '继发孔型缺损最大径 ≤ 38 mm',
      '下腔静脉缘 (IVC rim) ≥ 5 mm 且硬挺',
      '上腔静脉缘 (SVC rim) ≥ 5 mm',
      '房室瓣缘 (AV rim) ≥ 5 mm，距二尖瓣及三尖瓣附着处有足够安全距离',
      '无合并需要开胸同期矫治的心内畸形'
    ],
    surgicalCriteria: [
      '解剖边缘不足，尤其是下腔静脉缘缺如 (< 5mm)',
      '巨大缺损 (> 38mm) 经评估无匹配封堵器',
      '合并部分肺静脉异位引流 (PAPVC) 或三尖瓣重度反流需瓣环成形',
      '尝试介入封堵失败或出现移位先兆'
    ],
    highRiskPitfalls: [
      '切忌仅凭心尖四腔心单一平面判断边缘，必须行剑突下双腔静脉切面评估IVC后下缘',
      '主动脉缘缺如时应选用腰部偏小、包边较软的封堵器，术中及术后严密监测有无心包积液防磨损穿孔',
      '成人或老年ASD合并左室舒张功能减退者，封堵后左房压骤升可能诱发急性左心衰/肺水肿，需预先试封堵测左房压'
    ]
  },
  {
    id: 'vsd_perimembranous',
    nameCn: '膜周部室间隔缺损',
    nameEn: 'Perimembranous Ventricular Septal Defect',
    abbreviation: 'pmVSD',
    category: 'ventricular_shunts',
    summary: '最常见的VSD亚型 (占70%~80%)，位于膜部室间隔周围，紧邻三尖瓣隔瓣与主动脉右冠瓣/无冠瓣交界区。常伴假性室隔瘤形成。',
    pathophysiology: '左心室收缩压 (约90~120mmHg) 远高于右心室 (约20~30mmHg)，产生全收缩期高压差左向右高速喷射分流，导致左房、左室容量负荷过重与肺动脉高压。',
    standardScanningViews: [
      '胸骨旁左室长轴切面 (PLAX - 观察主动脉瓣下缺损、有无主动脉瓣右冠瓣脱垂)',
      '胸骨旁主动脉根部短轴切面 (PSAX Ao - 明确时钟定位：膜周部多在9~11点方位)',
      '心尖五腔心切面 (A5C - 探查左室流出道至右室面分流，测量分流压差峰值流速)',
      '左室两腔及三腔心切面 (排除多发肌部缺损)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: '主动脉瓣环至缺损上缘距离 (Aortic Rim)',
        standardView: '胸骨旁左室长轴与五腔心',
        cutoffValue: '介入封堵要求 ≥ 2.0 mm',
        clinicalSignificance: '若距离 < 2mm 甚至缺损直接贴近主动脉瓣环，介入易夹持瓣膜诱发主动脉瓣反流'
      },
      {
        parameter: '主动脉瓣脱垂 (Aortic Cusp Prolapse)',
        standardView: '胸骨旁左室长轴收缩期与舒张期',
        cutoffValue: '右冠瓣或无冠瓣膨入缺损口',
        clinicalSignificance: '一旦出现主动脉瓣脱垂或继发轻度主动脉瓣反流 (AR)，为早期外科直视修补强指征'
      },
      {
        parameter: '分流峰值流速与跨隔压差 (ΔP = 4v²)',
        standardView: '连续波多普勒 (CW) A5C',
        cutoffValue: '高速分流 (v > 4.0 m/s, ΔP > 64 mmHg)',
        clinicalSignificance: '提示右心室压力正常，无显著肺血管阻力增高；若分流速度 < 3.0 m/s 则警惕严重肺动脉高压'
      },
      {
        parameter: '左心室舒张末内径 (LVEDD / Z-Score)',
        standardView: 'M型或二维胸骨旁长轴',
        cutoffValue: 'Z-Score ≥ +2.0',
        clinicalSignificance: '左室容量过载明显，提示具有显著血流动力学意义'
      }
    ],
    keyMeasurements: [
      '缺损左室面与右室面大小 (假性室隔瘤多破口测量)',
      '缺损距主动脉瓣环距离及距三尖瓣隔瓣距离',
      'VSD分流束峰值流速 (v_max) 及压差',
      '主动脉瓣有无形态不对称及反流束宽度 (AR Vena Contracta)'
    ],
    guidelines: [
      {
        indication: '血流动力学显著的VSD (Qp/Qs ≥ 1.5，伴左房左室明显扩大或轻中度肺高压)，无不可逆肺高压',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'AHA/ACC ACHD Guidelines & 中国儿科心脏外科指南',
        notes: '外科直视修补为金标准，解剖适宜且年龄>2~3岁可权衡介入'
      },
      {
        indication: '伴随进行性主动脉瓣脱垂 (Aortic Valve Prolapse) 或任何程度的主动脉瓣反流 (AR)',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'STS Pediatric Heart Guidelines',
        notes: '无论缺损大小及Qp/Qs多大，均应早期外科手术，防止瓣叶不可逆结构毁损'
      },
      {
        indication: '合并感染性心内膜炎反复发作，抗感染稳定后',
        class: 'Class I',
        levelOfEvidence: 'Level C',
        source: 'ESC Guidelines',
        notes: '外科根治切除感染赘生物并补片修补缺损'
      },
      {
        indication: '无症状、缺损极小 (<3mm)、分流压差极高 (>80mmHg)、左心腔大小完全正常、无瓣叶脱垂',
        class: 'Class IIa',
        levelOfEvidence: 'Level B',
        source: 'ASE Pediatric Echo Consensus',
        notes: '密切临床随访，因膜周部VSD在幼儿期具有高达30%~40%自然假性室隔瘤闭合倾向'
      }
    ],
    interventionalCriteria: [
      '年龄通常 ≥ 2~3岁，体重 ≥ 10~15kg',
      '缺损上缘距离主动脉瓣环 ≥ 2 mm',
      '无主动脉瓣脱垂及反流',
      '假性室隔瘤形态规则，右心室面无多发散在细小微破口',
      '心电图无预激或传导阻滞'
    ],
    surgicalCriteria: [
      '婴幼儿反复肺部感染、顽固性心衰、生长发育落后',
      '缺损距主动脉瓣环 < 2mm，合并主动脉瓣脱垂',
      '膜周部缺损巨大 (> 10~12mm) 伴重度肺动脉高压',
      '介入术后出现三度房室传导阻滞 (AVB) 或新发主动脉瓣反流'
    ],
    highRiskPitfalls: [
      '介入术后急性或迟发性完全性房室传导阻滞 (cAVB)：因膜周区紧贴房室结与希氏束，封堵器压迫缺血可致阻滞，需术中严格心电监测',
      '切不可忽视收缩期主动脉瓣右冠瓣脱入缺损造成的掩盖现象，可能导致缺损面积被低估',
      '分流速度降低并不一定是病情好转，若缺损未缩小心室间压差下降，往往是肺阻力不可逆增高 (肺高压恶化) 的危象'
    ]
  },
  {
    id: 'vsd_supracristal',
    nameCn: '干下型室间隔缺损 (嵴下/漏斗部VSD)',
    nameEn: 'Subarterial / Supracristal Ventricular Septal Defect',
    abbreviation: 'saVSD',
    category: 'ventricular_shunts',
    summary: '位于右室漏斗部肺动脉瓣下与主动脉瓣下，缺损上缘直接由主动脉瓣环和肺动脉瓣环构成，无肌性边缘隔开。在东亚人群发生率显著高于西方 (占东亚VSD的25%~30%)。',
    pathophysiology: '由于文丘里效应 (Venturi effect) 及缺乏主动脉瓣下支撑，高速分流产生负压直接牵拉主动脉右冠瓣向缺损处脱垂，引发进行性中重度主动脉瓣关闭不全 (AR)。',
    standardScanningViews: [
      '胸骨旁左室长轴切面 (PLAX - 观察主动脉瓣右冠瓣在收缩期与舒张期的形态与下陷)',
      '胸骨旁主动脉短轴切面 (PSAX Ao - 缺损位于12点~1点方位，正对肺动脉瓣口)',
      '胸骨旁右室流出道长轴切面 (RVOT View - 观察缺损与肺动脉瓣纤维连续)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: '时钟方位 (Clock Position)',
        standardView: '胸骨旁大动脉短轴切面',
        cutoffValue: '12点 ~ 1点方位 (肺动脉瓣下与主动脉瓣环之间)',
        clinicalSignificance: '鉴别膜周部 (9~11点) 与干下型 (12~1点) 的决定性切面'
      },
      {
        parameter: '主动脉瓣环支撑缺损 (Subpulmonary / Subaortic Continuity)',
        standardView: 'PSAX与右室流出道切面',
        cutoffValue: '无肌性上缘，主动脉瓣纤维直接与肺动脉瓣纤维相连',
        clinicalSignificance: '绝对禁忌常规经皮导管介入封堵器夹持'
      },
      {
        parameter: '主动脉瓣脱垂程度',
        standardView: '胸骨旁长轴多切面观察',
        cutoffValue: '瓣叶膨出超出窦管交界线',
        clinicalSignificance: '无论缺损多小，均视为早期外科开胸直视修补的急诊或亚急诊绝对指征'
      }
    ],
    keyMeasurements: [
      '缺损前后径与左右径',
      '主动脉瓣右冠瓣脱垂深度 (mm) 及瓣叶变形程度',
      '主动脉瓣反流束宽度与面积 (AR Vena Contracta / Jet Area)',
      '右心室流出道有无继发漏斗部肌束肥厚梗阻'
    ],
    guidelines: [
      {
        indication: '确诊干下型室间隔缺损，无论缺损大小 (即使仅2~3mm) 及有无症状',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: '中华医学会儿科学分会心脏学组 & 国际先心病外科共识',
        notes: '明确诊断后均建议择期外科手术修补，绝不宜长期盲目等待自然愈合'
      },
      {
        indication: '已出现主动脉右冠瓣脱垂或伴发微量至轻度主动脉瓣反流',
        class: 'Class I',
        levelOfEvidence: 'Level A',
        source: 'STS Pediatric Heart Surgery Guidelines',
        notes: '必须尽早行外科体外循环下VSD补片修补 + 主动脉瓣悬吊成形术'
      },
      {
        indication: '经皮传统导管封堵器封堵术',
        class: 'Class III',
        levelOfEvidence: 'Level B',
        source: 'ASE / SCAI Interventional Guidelines',
        notes: '禁忌常规经皮封堵！因上缘缺如且靠近两大半月瓣，封堵器必将严重挤压破坏主动脉瓣及肺动脉瓣'
      }
    ],
    surgicalCriteria: [
      '干下型VSD一经确诊即为外科手术适应证',
      '最佳手术窗口通常为1岁以内，若在随访中一经发现右冠瓣脱垂先兆即刻安排手术'
    ],
    highRiskPitfalls: [
      '极易误判为“自愈”：当右冠瓣严重脱垂塞入缺损口时，分流束可能显著变细甚至变弱，非专科医生易误认为缺损变小或自愈，实为主动脉瓣毁损恶化的极危险假象！',
      '超声医生必须仔细在舒张期观察主动脉瓣有无偏心性反流束，切不可因分流信号减弱而放松警惕'
    ]
  },
  {
    id: 'pda_krichenko',
    nameCn: '动脉导管未闭 (PDA)',
    nameEn: 'Patent Ductus Arteriosus',
    abbreviation: 'PDA',
    category: 'arterial_shunts',
    summary: '降主动脉峡部与左肺动脉根部之间的胎儿期生理性血管通道出生后未能正常闭合。Krichenko分型将其分为A~E五种解剖类型。',
    pathophysiology: '主动脉舒张压与收缩压全心动周期均高于肺动脉，产生连续性左向右分流。可致左心容量超负荷、肺循环充血、主动脉舒张压骤降及脉压增大。',
    standardScanningViews: [
      '胸骨高位左心房/主动脉弓切面 (Ductal Cut View - 观察导管全貌与主肺动脉接口)',
      '胸骨旁肺动脉分叉短轴切面 (PSAX Bifurcation - 探查左肺动脉根部与导管喷射血流)',
      '胸骨上窝主动脉弓长轴切面 (Suprasternal Arch - 观察主动脉端壶腹部及峡部缩窄关系)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: 'Krichenko 解剖形态分型',
        standardView: '胸骨高位左锁骨下切面',
        cutoffValue: 'A型(漏斗型70%), B型(窗型), C型(管型), D型(复合型), E型(延长型)',
        clinicalSignificance: '指导封堵器材选择 (弹簧圈、蘑菇伞或可降解封堵器)'
      },
      {
        parameter: '肺动脉端最窄内径 (Minimum Ductal Diameter)',
        standardView: '胸骨高位短轴',
        cutoffValue: '小导管 (<1.5mm), 中导管 (1.5~3mm), 大导管 (>3mm)',
        clinicalSignificance: '选择封堵器腰部直径的关键参考 (通常比最窄径大2~4mm)'
      },
      {
        parameter: '分流多普勒血流频谱形态',
        standardView: '连续波多普勒 (CW) Ductal View',
        cutoffValue: '典型双期连续性高速分流 (收缩期+舒张期, 峰值压差显著)',
        clinicalSignificance: '若舒张期分流消失或出现双向分流，提示已发生重度肺动脉高压'
      }
    ],
    keyMeasurements: [
      '导管主动脉端壶腹直径 (Ampulla Diameter)',
      '导管肺动脉端最窄直径与导管全长',
      '左心室舒张末内径 (LVEDD) 与左心房内径 (LA/Ao 比值)',
      '降主动脉与左肺动脉有无受压或血流加速'
    ],
    guidelines: [
      {
        indication: '有血流动力学意义的PDA (左心扩大或Qp/Qs ≥ 1.5) 且解剖适宜',
        class: 'Class I',
        levelOfEvidence: 'Level A',
        source: 'AHA/ACC ACHD Guidelines',
        notes: '首选经皮导管介入封堵术 (弹簧圈 Coil 或封堵器 Occluder)'
      },
      {
        indication: '早产儿极低体重儿 (<1000g) 伴充血性心衰，药物 (布洛芬/消炎痛) 治疗无效或禁忌',
        class: 'Class I',
        levelOfEvidence: 'Level A',
        source: 'AAP Neonatal Cardiology Guidelines',
        notes: '急诊床旁微创经胸结扎术或新型小儿专用介入封堵'
      },
      {
        indication: 'PDA合并重度不可逆肺血管闭塞性病变 (Eisenmenger, 静息右向左分流, 下肢发绀多于上肢)',
        class: 'Class III',
        levelOfEvidence: 'Level C',
        source: 'ESC Guidelines',
        notes: '禁忌关闭未闭动脉导管'
      }
    ],
    interventionalCriteria: [
      '体重通常 ≥ 4~5kg (新型早产儿微创器械可放宽至700g)',
      '导管解剖形态适合封堵器放置，主动脉壶腹部能有效锚定',
      '术后试放确保左肺动脉无狭窄 (流速 < 2.0 m/s) 且降主动脉无狭窄'
    ],
    surgicalCriteria: [
      '早产儿危重伴心衰、坏死性小肠结肠炎 (NEC) 且介入条件不成熟',
      '巨大PDA伴肺动脉高压、解剖呈宽短窗型 (Krichenko B型)',
      '合并需要同期外科处理的心内畸形 (如主动脉缩窄 CoA、主动脉弓离断 IAA)'
    ],
    highRiskPitfalls: [
      '封堵器过大向主动脉侧突出可引起降主动脉医源性狭窄，向肺动脉侧突出可导致左肺动脉 (LPA) 狭窄，术后需常规扫查两大血管流速',
      '注意下半身发绀差异 (Differential Cyanosis)：严重肺动脉高压右向左分流时，导管后降主动脉氧分压显著低于升主动脉，表现为下肢发绀而右上肢红润'
    ]
  },
  {
    id: 'tof_fallot',
    nameCn: '法洛四联症',
    nameEn: 'Tetralogy of Fallot',
    abbreviation: 'TOF',
    category: 'conotruncal_cyanotic',
    summary: '最常见的发绀型先心病 (占发绀型先心病的50%~75%)。病理解剖特征包括漏斗部室间隔向前上移位导致的：肺动脉狭窄、大室间隔缺损、主动脉骑跨、右心室肥厚。',
    pathophysiology: '右心室流出道 (RVOT) 狭窄导致右室收缩压等于或超过左心室，静脉血经大型VSD向右向左分流进入骑跨的主动脉，导致全身动脉血低氧血症、发绀及继发红细胞增多。',
    standardScanningViews: [
      '胸骨旁左室长轴切面 (PLAX - 观察主动脉骑跨率与对位不良型VSD)',
      '胸骨旁右室流出道及肺动脉分叉长轴短轴 (观察漏斗部肌束狭窄、瓣环及左右分支肺动脉)',
      '心尖五腔心切面 (观察室水平分流方向)',
      '胸骨上窝主动脉弓切面 (排除伴发右位主动脉弓 25%~30%、主肺动脉侧支 MAPCAs)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: '主动脉骑跨率 (Aortic Overriding)',
        standardView: '胸骨旁左室长轴切面',
        cutoffValue: '通常 25% ~ 50% (超过50%需鉴别右室双出口 DORV)',
        clinicalSignificance: '评估主动脉根部移位程度'
      },
      {
        parameter: 'McGoon比值',
        standardView: '胸骨旁大动脉分叉与胸骨上窝切面',
        cutoffValue: 'McGoon = (RPA径 + LPA径) / 膈肌降主动脉径; ≥ 1.5 ~ 2.0',
        clinicalSignificance: '评估肺动脉发育床是否足以接受一期完全根治术'
      },
      {
        parameter: 'Nakata肺动脉指数 (PA Index)',
        standardView: '测量左右肺动脉截面积',
        cutoffValue: 'Nakata = (RPA面积 + LPA面积) / BSA; ≥ 150 ~ 200 mm²/m²',
        clinicalSignificance: '< 150 mm²/m² 提示肺血管发育严重受限，一期根治术后易发生致死性右心衰竭'
      },
      {
        parameter: '左心室舒张末期容积指数 (LVEDVI)',
        standardView: '双平面Simpson法',
        cutoffValue: '必须 ≥ 30 ml/m²',
        clinicalSignificance: '若左室容积极小 (<30 ml/m²)，一期根治难以维持有效体循环灌注'
      }
    ],
    keyMeasurements: [
      '肺动脉瓣环直径及其Z-Score (指导是否需要跨瓣环补片 TAP)',
      '主肺动脉、左肺动脉及右肺动脉分支内径与狭窄部位',
      '漏斗部肌束厚度及RVOT收缩期峰值压差',
      '有无异常冠状动脉走行 (尤其是前降支 LAD 起自右冠或单独横跨 RVOT)'
    ],
    guidelines: [
      {
        indication: '无严重缺氧发作、McGoon比值 ≥ 1.5 且左右肺动脉发育良好的典型TOF患儿',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'STS-EACTS Guidelines & 中华医学会小儿外科学分会',
        notes: '推荐在生后3~6个月行一期外科完全根治术 (VSD疏导补片 + RVOT疏通)'
      },
      {
        indication: '极度低体重、肺动脉发育严重不良 (McGoon < 1.2, Nakata < 150)、严重缺氧发作或合并复杂畸形',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'AHA/ACC Pediatric Guidelines',
        notes: '首选一期姑息手术 (改良Blalock-Taussig分流术或经皮RVOT支架植入术)'
      },
      {
        indication: '冠状动脉异常走行：前降支 (LAD) 横跨右室流出道表面',
        class: 'Class I',
        levelOfEvidence: 'Level C',
        source: 'Surgical Consensus',
        notes: '严禁直接沿RVOT纵向切开，需采用右室流出道外管道 (Rastelli术) 或谨慎侧方切口'
      }
    ],
    surgicalCriteria: [
      '一期根治指征：年龄 3~12个月，肺动脉发育良好，LVEDVI ≥ 30 ml/m²',
      '跨瓣环补片 (Transannular Patch, TAP)：若肺动脉瓣环 Z-Score < -2.0~-3.0 且切开无法有效解除梗阻，需行TAP，但应尽量保留部分瓣叶防远期重度肺动脉瓣反流 (PR)',
      '双期手术：首期姑息分流促进肺动脉床发育，待McGoon > 1.5后再行根治'
    ],
    highRiskPitfalls: [
      '超声必须千方百计探查冠状动脉起源与走向！漏诊跨RVOT的前降支将导致术中切断LAD引发大面积心肌梗死与术中死亡',
      '注意排查有无合并主-肺动脉侧支循环血管 (MAPCAs)，尤其在极度发绀或肺动脉极细小的重型TOF中',
      '远期随访核心：跨瓣补片术后中晚期重度肺动脉瓣反流伴右室进行性扩张，达指征时需行经皮肺动脉瓣置换 (PPVI) 或外科PVR'
    ]
  },
  {
    id: 'tga_transposition',
    nameCn: '完全性大动脉转位 (d-TGA)',
    nameEn: 'Complete D-Transposition of the Great Arteries',
    abbreviation: 'd-TGA',
    category: 'conotruncal_cyanotic',
    summary: '房室连接一致而室大动脉连接不一致：右心房接右心室，右心室发出主动脉；左心房接左心室，左心室发出肺动脉。体循环与肺循环呈并联双循环，是新生儿期最常见的急危重发绀型先心病。',
    pathophysiology: '必须依赖心内或心外交通 (房缺ASD、室缺VSD或动脉导管PDA) 进行动静脉血液混合。若房间隔交通受限，动脉导管功能性闭合将迅速导致不可逆低氧血症、代谢性酸中毒及多器官衰竭致死。',
    standardScanningViews: [
      '胸骨旁左室长轴切面 (大动脉失去正常交叉，呈双管平行向前发出)',
      '胸骨旁大动脉短轴切面 (主动脉位于右前，肺动脉位于左后，可见“双环并列征”)',
      '心尖四腔与五腔切面 (确认后方左室发出肺动脉分支，前方右室发出主动脉弓)',
      '剑突下切面 (详细观察房间隔交通大小及冠状动脉开口分型)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: '大动脉解剖起源与平行征',
        standardView: '胸骨旁长轴与心尖五腔心',
        cutoffValue: '后方发出之大动脉分出左/右分支 (确认为肺动脉起自左室); 前方大动脉延伸为头臂干弓部 (确认为主动脉起自右室)',
        clinicalSignificance: '确立d-TGA室大动脉连接不一致的根本诊断'
      },
      {
        parameter: '心房间分流交通 (ASD/PFO) 孔径与跨隔压差',
        standardView: '剑突下双房与心尖四腔心',
        cutoffValue: '交通孔径 < 3~4 mm 或跨隔压差高 (平均压差 > 5 mmHg)',
        clinicalSignificance: '提示限制性房缺 (Restrictive ASD)，急需紧急行Rashkind球囊房隔造口术 (BAS)'
      },
      {
        parameter: '左心室构型与后壁厚度 (LV Mass Index)',
        standardView: '胸骨旁短轴二尖瓣腱索水平',
        cutoffValue: '室间隔平直呈“D”字形或凸向左室；LV mass index ≥ 35 g/m²',
        clinicalSignificance: '完整室间隔型 (d-TGA/IVS) 生后2~3周后左室压力负荷迅速衰退，若LV质量退化无法直接承受大动脉调转术 (ASO)'
      }
    ],
    keyMeasurements: [
      '房间隔分流孔径及双向分流速度',
      '动脉导管未闭 (PDA) 内径与跨导管压差',
      '冠状动脉起源与走行 (Yacoub/Leiden分型 - 1LCx-2R 正常型还是单支/倒位型)',
      '左心室舒张末期后壁厚度 (LVPW) 与室间隔曲率 (香蕉形 vs 圆形)'
    ],
    guidelines: [
      {
        indication: '新生儿d-TGA伴严重低氧血症 (经皮氧饱和度 < 70%)、酸中毒，房间隔交通限制',
        class: 'Class I',
        levelOfEvidence: 'Level A',
        source: 'AHA/ACC Pediatric Resuscitation Guidelines',
        notes: '立即静脉持续泵入前列腺素E1 (PGE1) 维持PDA开放，紧急行超声监视下床旁Rashkind球囊房隔造口术 (BAS)'
      },
      {
        indication: '室间隔完整型d-TGA (d-TGA/IVS) 患儿',
        class: 'Class I',
        levelOfEvidence: 'Level A',
        source: 'STS-EACTS Guidelines',
        notes: '最佳手术窗口为生后2周之内，行解剖学根治的大动脉调转术 (Jatene / ASO术)'
      },
      {
        indication: '超龄患儿 (生后>3~4周) 且超声评估左室后壁厚度菲薄、呈香蕉形、LV mass index < 35 g/m²',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'Surgical Consensus',
        notes: '不能直接ASO，需急诊行快速二期或左室再训练 (肺动脉环扎 PA Banding + B-T分流) 待左室心肌肥厚后再行ASO'
      }
    ],
    surgicalCriteria: [
      '大动脉调转术 (Jatene ASO)：切除主动脉与肺动脉并相互调转，必须精细移植双侧冠状动脉纽扣至新主动脉根部 (新肺动脉前壁)',
      'Rastelli术：适用于d-TGA合并大VSD且伴肺动脉瓣严重狭窄者'
    ],
    highRiskPitfalls: [
      '冠状动脉解剖变异！术前超声必须明确冠脉走向。单支冠状动脉或壁内走行的冠状动脉移植难度极大，漏诊可能直接导致术后急性心肌缺血死亡',
      '完整室间隔者切忌盲目拖延手术时间，生后每延迟一周左心室都在快速退化“失训”'
    ]
  },
  {
    id: 'cavsd_canal',
    nameCn: '完全性房室间隔缺损 (CAVSD / 心内膜垫缺损)',
    nameEn: 'Complete Atrioventricular Septal Defect',
    abbreviation: 'CAVSD',
    category: 'complex_av_canal',
    summary: '原发孔房缺、流入道室缺与单一共同房室瓣环及共同瓣叶畸形三位一体。与21-三体综合征 (唐氏综合征) 高度相关 (约占40%~50%)。',
    pathophysiology: '心房与心室水平双重大分流，伴随共同房室瓣大量反流，极易在生后早期 (2~3个月内) 迅速进展为不可逆肺小动脉重构与肺动脉高压。',
    standardScanningViews: [
      '心尖四腔心切面 (A4C - 观察共同瓣叶启闭、桥瓣附着及两心室平衡度)',
      '胸骨旁左室长轴切面 (PLAX - 观察“鹅颈征” Gooseneck Sign，左室流出道延长狭窄)',
      '剑突下冠状及矢状切面 (观察心房心室连续性及流入道缺损大小)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: 'Rastelli 解剖分型 (根据前桥瓣附着部位)',
        standardView: '心尖四腔心与剑突下切面',
        cutoffValue: 'A型(前桥瓣附着于室间隔嵴), B型(附着于异常乳头肌), C型(自由漂浮型 Free Floating)',
        clinicalSignificance: '指导外科共同房室瓣分割成形及补片修补策略'
      },
      {
        parameter: '心室平衡度 (Ventricular Balance)',
        standardView: '双心室容积测量',
        cutoffValue: '左室流入道内径与右室流入道比值 (LV/RV Inflow Ratio) 0.67 ~ 1.5 为平衡型',
        clinicalSignificance: '若比值 < 0.67 (发育不良型左室) 或 > 1.5 则为不平衡型，决定行双心室矫治还是单心室Fontan路径'
      },
      {
        parameter: '共同房室瓣反流 (AV Valve Regurgitation)',
        standardView: '彩色多普勒心尖四腔心',
        cutoffValue: '反流束面积及瓣叶裂隙 (Cleft) 严重度',
        clinicalSignificance: '左侧房室瓣裂修补成形质量是决定远期再次手术率的核心因素'
      }
    ],
    keyMeasurements: [
      '左室与右室舒张末期容积指数',
      '原发孔缺损大小与流入道室缺基底宽度',
      '左室流出道长度与流速 (排除继发性LVOTO)',
      '肺动脉压力及三尖瓣反流压差估算'
    ],
    guidelines: [
      {
        indication: '平衡型完全性房室间隔缺损患儿，心功能耐受',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'STS Pediatric Guidelines & 中国先心病诊疗指南',
        notes: '推荐在生后3~6个月内完成体外循环下双心室根治矫治术 (双补片或单补片瓣膜成形术)'
      },
      {
        indication: '不平衡型CAVSD (合并左室发育不良或右室发育不良)',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'Single Ventricle Clinical Pathway',
        notes: '不宜强行行双心室矫治，应走分期单心室姑息路径 (Norwood/Damus/Glenn/Fontan)'
      }
    ],
    surgicalCriteria: [
      '双心室根治术：补片闭合原发孔房缺与流入道室缺，将共同瓣分割为独立的二尖瓣和三尖瓣，严密缝合二尖瓣侧瓣裂 (Cleft) 防术后严重反流'
    ],
    highRiskPitfalls: [
      '唐氏综合征患儿肺血管阻力增高速度远快于非唐氏患儿，绝不能等待至1岁以后，超过6个月手术极易并发无法逆转的肺血管闭塞性病变',
      '术前务必精确判断双心室对称性，切不可把不平衡型误当平衡型实施双室矫治，否则术后无法脱离体外循环'
    ]
  },
  {
    id: 'ebstein_anomaly',
    nameCn: '埃布斯坦畸形 (三尖瓣下移畸形)',
    nameEn: "Ebstein's Anomaly",
    abbreviation: 'Ebstein',
    category: 'complex_av_canal',
    summary: '三尖瓣隔瓣和后瓣未能按正常胚胎发育分化脱落，显著向下移位附着于右心室壁上，造成右心房化心室 (Atrialized RV)、功能性右室缩小及严重三尖瓣关闭不全。',
    pathophysiology: '巨大房化心室在收缩期与心房同步舒张，吸收血流造成“蓄水池效应”，导致功能性右室排出量锐减，右心房极度扩张，常经房缺PFO产生严重右向左发绀分流，易并发B型预激综合征 (WPW)。',
    standardScanningViews: [
      '心尖四腔心切面 (测量二尖瓣前环与三尖瓣隔环下移绝对距离与体表面积校正值)',
      '右室流入道切面 (观察三尖瓣后瓣下移及前瓣“风帆样”过长变形)',
      '剑突下四腔切面 (评估房化心室面积与功能右心室比例)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: '三尖瓣隔瓣下移距离 (Displacement Index)',
        standardView: '心尖四腔心舒张末期',
        cutoffValue: '隔瓣附着点距真正瓣环 ≥ 8 mm/m² BSA (成人通常 ≥ 20 mm)',
        clinicalSignificance: '超声诊断埃布斯坦畸形的金标准界值'
      },
      {
        parameter: 'Celermayer超声积分 (Great Ormond Street Echo Score)',
        standardView: '心尖四腔心收缩末期面积测算',
        cutoffValue: '(房化心室aRV + 右心房RA面积) / (功能右室fRV + 左心房LA + 左心室LV面积)',
        clinicalSignificance: 'Grade 1 (<0.5), Grade 2 (0.5~0.99), Grade 3 (1.0~1.49), Grade 4 (≥1.5 极高危死亡率)'
      },
      {
        parameter: '前瓣活动度与功能 (Sail-like Anterior Leaflet)',
        standardView: '心尖四腔及右室流入道',
        cutoffValue: '游离缘活动良好，无广泛心肌束锚定固定',
        clinicalSignificance: '决定能否实施锥形重建术 (Cone Procedure) 的解剖核心'
      }
    ],
    keyMeasurements: [
      '三尖瓣隔瓣和后瓣实际下移距离 (mm 及 mm/m²)',
      '房化右心室与功能性右心室面积比率',
      '三尖瓣反流程度及喷流速度 (反流流速低往往反映右室做功能力丧失)',
      '房间隔分流方向 (常为右向左分流致发绀)'
    ],
    guidelines: [
      {
        indication: '儿童或成人Ebstein伴进行性心功能恶化 (NYHA II~IV级)、发绀 (SaO2 < 90%) 或右室进行性扩张',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'ESC / AHA ACHD Guidelines',
        notes: '首选解剖学三尖瓣锥形重建术 (Cone Reconstruction Procedure)'
      },
      {
        indication: '新生儿重症Ebstein伴“圆形巨大心脏” (Cardiothoracic Ratio > 0.8)、重度发绀、功能性肺动脉闭锁',
        class: 'Class I',
        levelOfEvidence: 'Level C',
        source: 'Pediatric Critical Care Consensus',
        notes: '急诊应用前列腺素E1降低肺血管阻力，若内科无效急诊行Starnes三尖瓣闭孔术 + 单心室路径'
      }
    ],
    surgicalCriteria: [
      'Cone术 (锥形重建术)：将广泛下移附着的前瓣、后瓣游离，顺钟向旋转拼接成一个立体的360度圆锥形“新三尖瓣”，原位缝合于解剖瓣环，同时纵向折叠房化右心室',
      '1.5心室矫治术 (One-and-a-half Ventricle Repair)：功能性右室偏小者，行Cone术联合双向Glenn分流术，分担右心室40%前负荷'
    ],
    highRiskPitfalls: [
      '新生儿期常出现由于右室高阻力导致的“假性/功能性肺动脉闭锁”，彩色多普勒见肺动脉瓣口无前向血流，实因右室压力不足以冲开瓣膜，切不可误诊为解剖性肺动脉闭锁',
      '并发旁路传导 (WPW综合征) 发生率高达15%~25%，术前需常规做食管调搏或腔内电生理评估，术中可同期行旁路射频消融或切断'
    ]
  },
  {
    id: 'coa_coarctation',
    nameCn: '主动脉缩窄 (CoA)',
    nameEn: 'Coarctation of the Aorta',
    abbreviation: 'CoA',
    category: 'left_obstructive',
    summary: '主动脉峡部（左锁骨下动脉远端、动脉导管附着处对面）局限性严重狭窄，常与二叶式主动脉瓣 (BAV, 占50%~75%)、室缺或二尖瓣畸形合并存在。',
    pathophysiology: '狭窄前段 (脑与上肢) 严重高血压与左室后负荷剧增，狭窄远段 (腹腔内脏与下肢) 严重低灌注、股动脉搏动微弱。导管闭合可诱发急性心源性休克。',
    standardScanningViews: [
      '胸骨上窝主动脉弓长轴切面 (Suprasternal Arch View - 观察主动脉峡部后壁“局限性后棚样隆起”及管径)',
      '胸骨上窝主动脉弓高位连续波多普勒切面 (探查狭窄处收缩期喷射伴特征性“舒张期拖尾”流速)',
      '胸骨旁左室长轴及短轴切面 (检查主动脉瓣二叶瓣畸形 BAV 及左室肥厚程度)',
      '腹主动脉剑突下多普勒 (观察腹主动脉血流搏动是否减弱、呈低平单相舒张期延长波形)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: '狭窄部位管径与邻近降主动脉比值',
        standardView: '胸骨上窝主动脉弓长轴',
        cutoffValue: '狭窄处内径 / 正常降主动脉内径 < 50%',
        clinicalSignificance: '解剖学显著缩窄'
      },
      {
        parameter: '连续波多普勒跨缩窄处压差及“舒张期拖尾征” (Diastolic Tail)',
        standardView: '胸骨上窝连续多普勒 (CW)',
        cutoffValue: '收缩期峰值压差 ≥ 20 mmHg 且伴持续舒张期前向血流 (Diastolic runoff)',
        clinicalSignificance: '特征性血流动力学标志，反映跨狭窄处全心动周期持续压差'
      },
      {
        parameter: '上下肢血压梯度',
        standardView: '体循环血压计对照',
        cutoffValue: '上肢收缩压比下肢高 ≥ 20 mmHg',
        clinicalSignificance: '临床诊断与干预强依据'
      }
    ],
    keyMeasurements: [
      '主动脉弓横弓、峡部及降主动脉各段内径与Z-Score',
      '缩窄处峰值流速 (m/s) 与跨缩窄峰值/平均压差',
      '左心室后壁厚度 (LVPW) 及射血分数 (EF)',
      '主动脉瓣叶数目及有无瓣膜狭窄/反流'
    ],
    guidelines: [
      {
        indication: '跨缩窄处峰值无创压差 ≥ 20 mmHg，伴上肢高血压或下肢灌注不良',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'AHA/ACC ACHD Guidelines',
        notes: '儿童与成人首选覆膜或裸支架经皮介入置入术；新生儿及小婴儿首选外科端端吻合术'
      },
      {
        indication: '新生儿导管依赖性危重主动脉缩窄伴严重心源性休克',
        class: 'Class I',
        levelOfEvidence: 'Level A',
        source: 'AHA Pediatric Emergency Guidelines',
        notes: '立即静脉滴注PGE1重新开放动脉导管恢复下肢灌注，稳定后急诊行外科缩窄切除吻合术'
      }
    ],
    interventionalCriteria: [
      '体重通常 ≥ 20~25kg 的年长儿及成人患者',
      '解剖结构适宜植入球囊扩张式大血管支架 (Stent)',
      '无合并广泛长段升弓发育不良'
    ],
    surgicalCriteria: [
      '新生儿及小婴儿 (<1岁) 缩窄，支架植入受血管口径及生长潜能限制',
      '合并主动脉弓发育不良 (Hypoplastic Arch) 需行扩大端侧吻合术'
    ],
    highRiskPitfalls: [
      '新生儿期当PDA大开放且存在右向左分流时，缩窄前后压差可能表现不明显，多普勒压差可被低估，必须直接依赖二维解剖测量结合股动脉搏动确诊',
      '支架置入或外科术后必须长期随访胸主动脉CT或超声，严密警惕术区动脉瘤形成或再缩窄 (Re-coarctation)'
    ]
  },
  {
    id: 'ps_stenosis',
    nameCn: '先天性肺动脉瓣狭窄 (PS)',
    nameEn: 'Pulmonary Valve Stenosis',
    abbreviation: 'PVS',
    category: 'right_obstructive',
    summary: '胚胎发育期肺动脉瓣交界融合、瓣叶增厚或形成圆顶状 (Dome-shaped)，收缩期开放受限。可合并Noonan综合征 (瓣膜发育异常型)。',
    pathophysiology: '右心室收缩期排血受阻，产生显著跨瓣收缩期压力阶差，引起进行性右心室向心性肥厚、顺应性下降及右房代偿性增大。',
    standardScanningViews: [
      '胸骨旁主动脉短轴切面 (PSAX Ao - 观察肺动脉瓣启闭、呈“圆顶征” Dome sign 与测量瓣环)',
      '胸骨旁右室流出道长轴切面 (观察有无继发性漏斗部肌束肥厚)',
      '剑突下双房切面 (观察卵圆孔水平有无右向左分流)'
    ],
    echoDiagnosticCriteria: [
      {
        parameter: '跨肺动脉瓣峰值压差 (Peak Gradient, ΔP = 4v²)',
        standardView: '连续波多普勒 (CW) RVOT/PA',
        cutoffValue: '轻度 (<36 mmHg), 中度 (36~64 mmHg), 重度 (>64 mmHg 或流速 > 4.0 m/s)',
        clinicalSignificance: '中重度狭窄 (压差 ≥ 50~64 mmHg) 为介入球囊扩张治疗指征'
      },
      {
        parameter: '瓣膜解剖构型',
        standardView: '胸骨旁短轴切面',
        cutoffValue: '交界融合型 (典型适合球囊) vs 瓣膜发育不良型 (Dysplastic, 常见于Noonan综合征，球囊效果差)',
        clinicalSignificance: '决定球囊扩张成功率与复发风险'
      }
    ],
    keyMeasurements: [
      '肺动脉瓣环内径与Z-Score (指导选择扩张球囊直径，通常球囊/瓣环比为 1.2~1.4)',
      '跨瓣峰值流速与瞬时最高跨瓣压差',
      '右心室游离壁厚度 (RVAW) 及右室射血分数',
      '主肺动脉与左右肺动脉分支有无狭窄后扩张 (Post-stenotic Dilation)'
    ],
    guidelines: [
      {
        indication: '典型肺动脉瓣狭窄伴导管测压峰峰压差 ≥ 50 mmHg 或超声峰值压差 ≥ 60 mmHg (无论有无症状)',
        class: 'Class I',
        levelOfEvidence: 'Level A',
        source: 'AHA/ACC Pediatric Interventional Guidelines',
        notes: '首选经皮经导管球囊肺动脉瓣成形术 (PBPV)，创伤极小，成功率 > 95%'
      },
      {
        indication: '发育不良型瓣叶、极重度漏斗部肌束梗阻合并瓣膜狭窄，或球囊扩张失败者',
        class: 'Class I',
        levelOfEvidence: 'Level B',
        source: 'STS Pediatric Heart Guidelines',
        notes: '行外科直视瓣膜交界切开成形术或流出道疏通术'
      }
    ],
    highRiskPitfalls: [
      '成功球囊扩张解除瓣膜狭窄后，部分患儿由于继发严重漏斗部肌束痉挛可出现“自杀性右室” (Suicidal Right Ventricle) 动态流出道梗阻，需使用β受体阻滞剂及充分扩容，切勿盲目加用正性肌力药物'
    ]
  }
];

export const CHD_CATEGORIES_METADATA = {
  atrial_shunts: { label: '心房水平分流', desc: '继发孔/原发孔/静脉窦型房缺、PFO', count: 3 },
  ventricular_shunts: { label: '心室水平分流', desc: '膜周部/干下漏斗部/肌部室缺', count: 3 },
  arterial_shunts: { label: '大动脉水平分流', desc: '动脉导管未闭 (PDA)、主肺动脉间隔缺损', count: 1 },
  left_obstructive: { label: '左心梗阻性病变', desc: '主动脉缩窄、主动脉瓣狭窄、主动脉弓发育不良', count: 1 },
  right_obstructive: { label: '右心梗阻性病变', desc: '单纯肺动脉瓣狭窄、漏斗部狭窄', count: 1 },
  conotruncal_cyanotic: { label: '圆锥动脉干及发绀型', desc: '法洛四联症、大动脉转位 (d-TGA, ccTGA)', count: 2 },
  complex_av_canal: { label: '房室管及复合畸形', desc: '完全性房室间隔缺损、埃布斯坦综合征', count: 2 },
};
