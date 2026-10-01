import { DecisionTree } from '../types/chd';

export const DECISION_TREES: Record<string, DecisionTree> = {
  tree_asd_closure: {
    id: 'tree_asd_closure',
    title: '继发孔型ASD 经皮介入封堵 vs 外科修补 临床决策路径',
    diseaseName: '继发孔型房间隔缺损 (Secundum ASD)',
    guidelineSource: '2020 ESC ACHD Guidelines & 中华医学会小儿心脏超声介入共识',
    rootNodeId: 'node_rv_overload',
    nodes: {
      node_rv_overload: {
        id: 'node_rv_overload',
        question: '超声评估是否存在明确的右心房/右心室增大，或分流比率 Qp/Qs ≥ 1.5？',
        description: '判断缺损是否引起具有血流动力学意义的心室容量负荷过重。',
        options: [
          {
            label: '是 (右心室扩大 / Qp/Qs ≥ 1.5 / 运动耐量受限)',
            nextNodeId: 'node_pulmonary_hypertension',
          },
          {
            label: '否 (无右心增大，Qp/Qs < 1.5，缺损极小无症状)',
            result: {
              decision: '内科定期超声随访，暂不实施侵入性干预',
              recommendationLevel: 'Class IIa',
              actionType: 'Medical / Observation',
              rationale: '无右室容量负荷过重且分流微小的继发孔ASD对长远期心肺功能无明显不良影响，无手术或介入指征。',
              guidelineReference: 'ESC ACHD 2020: 3.1.2 缺损闭合适应证',
              followUpPlan: '每1~2年复查超声心动图，随访右心房室大小及三尖瓣反流速度。',
            },
          },
        ],
      },
      node_pulmonary_hypertension: {
        id: 'node_pulmonary_hypertension',
        question: '是否存在重度肺动脉高压及右向左反向分流？(静息多普勒估算或右心导管测压)',
        description: '必须排除艾森曼格综合征或固定性肺血管闭塞性病变。',
        options: [
          {
            label: '无重度肺高压，或 PVR < 5 Wood Units (以左向右分流为主)',
            nextNodeId: 'node_ivc_rim',
          },
          {
            label: '疑似重度肺高压 (PVR ≥ 5 Wood Units 或静息双向/右向左分流)',
            result: {
              decision: '禁忌盲目闭合缺损！必须行右心导管检查及急性肺血管扩张试验 (AVT)',
              recommendationLevel: 'Class III',
              actionType: 'Medical / Observation',
              rationale: '若PVR ≥ 8 WU且对扩张剂无反应，强行关闭ASD将消除心房水平“减压阀”，引发急性右心衰竭和猝死。',
              guidelineReference: 'ESC/AHA Guidelines Class III (Harm)',
              followUpPlan: '靶向靶向降肺动脉高压药物治疗 (内皮素拮抗剂、PDE5抑制剂)，严密专科评估。',
            },
          },
        ],
      },
      node_ivc_rim: {
        id: 'node_ivc_rim',
        question: '剑突下双腔静脉切面评估：下腔静脉后下缘 (IVC Rim) 是否 ≥ 5 mm 且质地硬挺？',
        description: 'IVC缘是经皮封堵器下伞盘稳定抓持房间隔的关键防线。',
        options: [
          {
            label: '是 (IVC缘 ≥ 5 mm，无软塌撕裂)',
            nextNodeId: 'node_other_rims',
          },
          {
            label: '否 (IVC缘缺如或 < 5 mm，或后下壁组织菲薄软塌)',
            result: {
              decision: '推荐转外科体外循环下开胸或微创小切口补片修补术',
              recommendationLevel: 'Class I',
              actionType: 'Surgical Repair',
              rationale: '下腔静脉缘缺失是导致封堵器移位脱落至下腔静脉或右心房的最主要原因，经皮封堵失败及栓塞风险极高。',
              guidelineReference: 'ASE/SCAI Interventional Safety Criteria',
              followUpPlan: '心胸外科会诊，可考虑微创右侧前胸壁小切口直视修补。',
            },
          },
        ],
      },
      node_other_rims: {
        id: 'node_other_rims',
        question: '缺损最大拉伸伸展径是否 ≤ 38 mm，且房室瓣前下缘 (AV Rim) 与上腔静脉缘 (SVC Rim) 均 ≥ 5 mm？',
        description: '注：前上部主动脉缘即使 < 5 mm 或缺如，若其余边缘充分仍可实施包绕封堵。',
        options: [
          {
            label: '是 (缺损 ≤ 38 mm，周围其余各边缘充足 ≥ 5 mm)',
            result: {
              decision: '首选经皮心导管继发孔型ASD封堵器植入术 (Percutaneous Closure)',
              recommendationLevel: 'Class I',
              actionType: 'Interventional Catheterization',
              rationale: '解剖结构完全符合介入适应证。相较于开胸手术创伤小、术后恢复快、并发症率低、无需体外循环停跳。',
              guidelineReference: '2020 ESC ACHD Guidelines Class I, Level A',
              followUpPlan: '术后口服阿司匹林抗血小板3~6个月，术后1天、1个月、3个月及6个月常规复查超声排除残余分流及心包积液。',
            },
          },
          {
            label: '否 (巨大缺损 > 38 mm，或合并多孔筛状，或房室瓣前下缘不足阻碍二尖瓣)',
            result: {
              decision: '推荐外科体外循环心内直视补片修补术 (Surgical Patch Closure)',
              recommendationLevel: 'Class I',
              actionType: 'Surgical Repair',
              rationale: '超大缺损缺乏足够封堵器规格支撑；房室瓣边缘不足强行封堵将挤压二尖瓣前叶造成新发二尖瓣关闭不全或传导阻滞。',
              guidelineReference: 'STS Guidelines for Pediatric Heart Surgery',
              followUpPlan: '外科术后预防感染及定期心功能随访。',
            },
          },
        ],
      },
    },
  },
  tree_vsd_strategy: {
    id: 'tree_vsd_strategy',
    title: '室间隔缺损 (VSD) 手术与介入分型阶梯决策路径',
    diseaseName: '室间隔缺损 (VSD: 膜周型 / 干下型 / 肌部)',
    guidelineSource: '中华医学会儿科学分会心脏学组先心病介入指南 & STS Guidelines',
    rootNodeId: 'node_vsd_location',
    nodes: {
      node_vsd_location: {
        id: 'node_vsd_location',
        question: '超声大动脉短轴与长轴切面确诊VSD解剖部位与时钟方位：',
        description: '不同部位的VSD病理机制与干预策略截然不同。',
        options: [
          {
            label: '干下型 / 嵴下漏斗部 (12点~1点方位，肺动脉瓣下紧邻主动脉瓣)',
            nextNodeId: 'node_supracristal_ar',
          },
          {
            label: '膜周部 (9点~11点方位，伴或不伴假性室隔瘤)',
            nextNodeId: 'node_pmvsd_ar_prolapse',
          },
          {
            label: '肌部 (室间隔肌部小梁部、心尖部或流入道)',
            nextNodeId: 'node_muscular_vsd',
          },
        ],
      },
      node_supracristal_ar: {
        id: 'node_supracristal_ar',
        question: '干下型VSD：无论缺损大小，是否已观察到主动脉右冠瓣脱垂或轻微反流 (AR)？',
        description: '干下型由于文丘里效应极易吸附主动脉瓣叶，导致不可逆瓣膜毁损。',
        options: [
          {
            label: '已伴有主动脉瓣脱垂或反流 (AR)，或缺损虽小但持续存在',
            result: {
              decision: '绝对外科开胸体外循环下修补术 + 主动脉瓣成形悬吊术 (严禁经皮封堵！)',
              recommendationLevel: 'Class I',
              actionType: 'Surgical Repair',
              rationale: '干下型缺乏主动脉瓣下支撑，常规封堵器必将破坏半月瓣；瓣叶脱垂一旦出现进展迅速，尽早外科修补是挽救自主主动脉瓣的唯一途径。',
              guidelineReference: '中华儿科学会心脏学组指南 Class I & STS Guidelines',
              followUpPlan: '早期安排体外循环手术，术后长期随访主动脉瓣启闭与反流程度。',
            },
          },
          {
            label: '确诊干下型，目前暂无明显瓣脱垂 (婴儿期)',
            result: {
              decision: '限期外科择期手术修补 (通常在6~12月龄内完成，绝不宜长期拖延)',
              recommendationLevel: 'Class I',
              actionType: 'Surgical Repair',
              rationale: '干下型VSD自愈率趋近于零 (<1%)，随时间推移超过80%将继发主动脉瓣脱垂及反流，必须限期手术。',
              guidelineReference: 'Pediatric Cardiac Surgery Consensus',
              followUpPlan: '密切监测超声，每月复查，一旦出现瓣叶膨入缺损立即转为急诊手术。',
            },
          },
        ],
      },
      node_pmvsd_ar_prolapse: {
        id: 'node_pmvsd_ar_prolapse',
        question: '膜周部VSD：超声检查缺损上缘距离主动脉瓣环是否 ≥ 2.0 mm，且无主动脉瓣脱垂及反流？',
        description: '评估有无安全解剖距离，避免封堵器损伤主动脉半月瓣。',
        options: [
          {
            label: '是 (主动脉缘 ≥ 2mm，无瓣膜脱垂，年龄 ≥ 2~3岁且体重 ≥ 10~15kg)',
            nextNodeId: 'node_pmvsd_hemodynamics',
          },
          {
            label: '否 (主动脉缘 < 2mm，或合并右冠瓣脱垂，或婴幼儿体重过小)',
            result: {
              decision: '推荐外科体外循环直视修补术 (经右房切口或肺动脉切口补片修补)',
              recommendationLevel: 'Class I',
              actionType: 'Surgical Repair',
              rationale: '边缘不足2mm若行经皮封堵极易夹伤主动脉瓣导致术后严重AR，或挤压三尖瓣隔叶，外科直视下修补直观安全。',
              guidelineReference: 'AHA/ACC ACHD Guidelines Class I',
              followUpPlan: '外科直视修补术，常规术后心电图监测排除房室传导阻滞。',
            },
          },
        ],
      },
      node_pmvsd_hemodynamics: {
        id: 'node_pmvsd_hemodynamics',
        question: '多普勒评估：左室容量过载明显 (LVEDD Z-Score ≥ +2.0) 或 Qp/Qs ≥ 1.5？',
        description: '确定是否已达到关闭室间隔缺损的血流动力学指征。',
        options: [
          {
            label: '是 (容量负荷过重 / 肺充血 / 伴轻中度肺高压)',
            result: {
              decision: '可行经皮导管膜周部VSD封堵术，或选择微创小切口修补',
              recommendationLevel: 'Class I',
              actionType: 'Interventional Catheterization',
              rationale: '血流动力学干预指征明确且解剖边缘符合介入要求。术中必须严格行连续心电监护，防范希氏束压迫引起房室传导阻滞。',
              guidelineReference: '中华医学会儿科学分会心血管介入共识',
              followUpPlan: '术中及术后即刻、24小时、1周严密做动态心电图监测，警惕迟发性III度房室传导阻滞。',
            },
          },
          {
            label: '否 (缺损极小 < 3mm，无左心扩大，收缩期压差 > 70 mmHg，无症状)',
            result: {
              decision: '门诊定期超声随访 (膜周部VSD幼年期具有高达30%~40%纤维瘤假性囊袋自然闭合倾向)',
              recommendationLevel: 'Class IIa',
              actionType: 'Medical / Observation',
              rationale: '微小无血流动力学紊乱的膜周缺损常形成假性室隔瘤逐渐变小闭合，盲目介入反增加心律失常风险。',
              guidelineReference: 'ASE Pediatric Echo Guidelines',
              followUpPlan: '每6~12个月复查超声心动图，注意口腔卫生预防感染性心内膜炎。',
            },
          },
        ],
      },
      node_muscular_vsd: {
        id: 'node_muscular_vsd',
        question: '肌部VSD：缺损形态与患儿状态评估：',
        description: '肌部缺损肌性四周边缘完整，远离心脏传导系统与半月瓣。',
        options: [
          {
            label: '单发或多发肌部缺损，伴充血性心力衰竭与喂养困难',
            result: {
              decision: '首选经导管经皮封堵或外科直视/经胸心肌穿刺镶嵌杂交封堵术 (Hybrid)',
              recommendationLevel: 'Class I',
              actionType: 'Interventional Catheterization',
              rationale: '肌部VSD边缘四周均为厚心肌，极少损伤传导束与主动脉瓣，经胸微创穿刺或经股动静脉封堵成功率极高。',
              guidelineReference: 'SCAI / STS Hybrid Strategy Guidelines',
              followUpPlan: '术后常规复查心脏彩超与抗凝监测。',
            },
          },
          {
            label: '小型肌部缺损 (Swiss-cheese肌部或肌小梁细孔，无心功能障碍)',
            result: {
              decision: '保守观察随访 (肌部VSD在一岁内具有超过80%的极高自然闭合率)',
              recommendationLevel: 'Class I',
              actionType: 'Medical / Observation',
              rationale: '小婴儿随着心肌小梁生长肥厚，绝大多数肌部微小缺损将在1~2岁内自行闭合。',
              guidelineReference: 'Pediatric Cardiology Natural History Studies',
              followUpPlan: '半年复查彩超，观察缺损自发缩小进程。',
            },
          },
        ],
      },
    },
  },
  tree_tof_repair: {
    id: 'tree_tof_repair',
    title: '法洛四联症 (TOF) 一期根治 vs 分期姑息手术 决策算法',
    diseaseName: '法洛四联症 (Tetralogy of Fallot)',
    guidelineSource: 'STS-EACTS Guidelines & AHA/ACC Pediatric Guidelines',
    rootNodeId: 'node_tof_symptoms',
    nodes: {
      node_tof_symptoms: {
        id: 'node_tof_symptoms',
        question: '患儿是否频繁出现严重低氧发绀危象 (Hypercyanotic / Tet Spell) 或静息血氧饱和度 < 70%？',
        description: '评估缺氧发作与全身氧合危急度。',
        options: [
          {
            label: '是 (频繁缺氧发作 / 晕厥 / 严重紫绀 / 酸中毒)',
            nextNodeId: 'node_tof_spell_pa',
          },
          {
            label: '否 (病情平稳，轻度发绀，经皮血氧保持在 75%~88%)',
            nextNodeId: 'node_tof_mcgoon_nakata',
          },
        ],
      },
      node_tof_spell_pa: {
        id: 'node_tof_spell_pa',
        question: '急诊超声与造影：左右分支肺动脉发育指数 (McGoon比值与Nakata指数)：',
        description: '极度缺氧状态下评估急诊根治或急诊减状分流。',
        options: [
          {
            label: 'McGoon比值 ≥ 1.5 且 Nakata ≥ 150 mm²/m² (肺动脉床发育尚可)',
            result: {
              decision: '急诊或亚急诊行体外循环下一期完全根治术 (Complete Surgical Repair)',
              recommendationLevel: 'Class I',
              actionType: 'Surgical Repair',
              rationale: '肺血管床足以耐受肺循环全血流冲击，尽快彻底疏通右室流出道并修补VSD可从根本上消除缺氧危象。',
              guidelineReference: 'STS Pediatric Heart Surgery Guidelines',
              followUpPlan: '重症监护室术后管理，警惕右室功能不全与低心排综合征。',
            },
          },
          {
            label: 'McGoon比值 < 1.2 或 Nakata < 120 mm²/m² (肺血管纤细如线，极度发育不良)',
            result: {
              decision: '急诊行改良Blalock-Taussig分流术 (mB-T Shunt) 或经皮右室流出道支架 (RVOT Stenting)',
              recommendationLevel: 'Class I',
              actionType: 'Palliative Surgery',
              rationale: '强行一期根治因肺动脉流出道阻力过高术后必致急性严重右心衰衰竭死亡；先行姑息分流增加肺血流，促使肺动脉发育粗大后再行二期根治。',
              guidelineReference: 'EACTS / AHA Consensus Class I',
              followUpPlan: '术后口服抗血小板维持分流管通畅，每2~3个月复查超声监测肺动脉生长情况。',
            },
          },
        ],
      },
      node_tof_mcgoon_nakata: {
        id: 'node_tof_mcgoon_nakata',
        question: '平稳期患儿评估：McGoon比值是否 ≥ 1.5，Nakata指数 ≥ 150 mm²/m²，且左室舒张末容积 LVEDVI ≥ 30 ml/m²？',
        description: '判断肺血管床及左心室容积是否达到一期根治标准。',
        options: [
          {
            label: '是 (各项发育指标达标，且无冠脉前降支横跨RVOT)',
            nextNodeId: 'node_tof_valve_annulus',
          },
          {
            label: '否 (肺动脉严重发育不全或左心室微小 LVEDVI < 30 ml/m²)',
            result: {
              decision: '建议一期行姑息手术 (改良B-T分流术或导管RVOT支架)，择期二期根治',
              recommendationLevel: 'Class I',
              actionType: 'Palliative Surgery',
              rationale: '左心室容量微小无法维持根治后正常体循环心输出量，肺血管细小无法容纳全部心排血量，需分步实施。',
              guidelineReference: 'STS Guidelines for TOF Repair',
              followUpPlan: '待分流后6~12个月肺动脉发育良好 (McGoon > 1.5) 再评估二期根治。',
            },
          },
        ],
      },
      node_tof_valve_annulus: {
        id: 'node_tof_valve_annulus',
        question: '超声测量肺动脉瓣环 (PV Annulus) Z-Score：',
        description: '决定外科手术是否需要切开瓣环采用跨瓣环补片 (TAP)。',
        options: [
          {
            label: '瓣环发育良好，Z-Score ≥ -2.0',
            result: {
              decision: '行保留肺动脉瓣环的完全根治术 (Valve-Sparing Complete Repair)',
              recommendationLevel: 'Class I',
              actionType: 'Surgical Repair',
              rationale: '尽可能保护天然肺动脉瓣环与瓣叶完整性，极大降低远期重度肺动脉瓣反流与右心功能衰竭风险。',
              guidelineReference: 'Contemporary Pediatric Cardiac Surgery Practice',
              followUpPlan: '术后定期长期超声监测右室重构与残余压差。',
            },
          },
          {
            label: '瓣环极度发育不良，Z-Score < -3.0 (单纯切开瓣下肌束仍严重梗阻)',
            result: {
              decision: '行跨瓣环补片完全根治术 (Transannular Patch, TAP)，术中尽量行单叶自体瓣成形',
              recommendationLevel: 'Class I',
              actionType: 'Surgical Repair',
              rationale: '为彻底解除流出道重度机械性梗阻必须切开瓣环加宽，远期需终身密切随访肺动脉瓣反流演变。',
              guidelineReference: 'STS/EACTS Surgical Guidelines',
              followUpPlan: '青少年期常规每年心脏MRI与超声评估右心室舒张末容积 (RVEDVI)，若反流严重且RVEDVI > 160 ml/m²应适时行经皮肺动脉瓣置换 (PPVI)。',
            },
          },
        ],
      },
    },
  },
  tree_neonatal_cyanosis: {
    id: 'tree_neonatal_cyanosis',
    title: '新生儿危急发绀与导管依赖性先心病 急诊鉴别与处置决策树',
    diseaseName: '新生儿急危重先天性心脏病 (Critical CHD)',
    guidelineSource: 'AHA Neonatal Resuscitation Guidelines & 欧洲儿科急危重症共识',
    rootNodeId: 'node_hyperoxia_test',
    nodes: {
      node_hyperoxia_test: {
        id: 'node_hyperoxia_test',
        question: '新生儿发绀，高氧试验 (Hyperoxia Test 100%纯氧吸入10~15分钟)：右桡动脉PaO2是否 < 100~150 mmHg？',
        description: '高氧试验是鉴别心源性发绀与肺源性发绀的金标准无创筛查。',
        options: [
          {
            label: '是 (吸纯氧后血氧无明显改善，PaO2 < 100 mmHg，高度怀疑心源性先心病)',
            nextNodeId: 'node_echo_segmental_type',
          },
          {
            label: '否 (吸纯氧后PaO2迅速上升至 > 200~300 mmHg)',
            result: {
              decision: '考虑肺实质疾病或新生儿持续肺动脉高压 (PPHN)，非发绀型心内分流畸形',
              recommendationLevel: 'Class I',
              actionType: 'Medical / Observation',
              rationale: '排除严重心内右向左发绀分流或大动脉转位等急危先心病，重点排查新生儿呼吸窘迫综合征、胎粪吸入或肺血管痉挛。',
              guidelineReference: 'Neonatal Critical Care Protocols',
              followUpPlan: '新生儿ICU对症吸氧、一氧化氮吸入试验及复查心彩超。',
            },
          },
        ],
      },
      node_echo_segmental_type: {
        id: 'node_echo_segmental_type',
        question: '床旁超声心动图鉴别病变类型：',
        description: '紧急区分大动脉转位、导管依赖性肺血病变、导管依赖性体血病变。',
        options: [
          {
            label: '大动脉转位 (d-TGA)：主动脉起自右室，肺动脉起自左室',
            nextNodeId: 'node_tga_mixing',
          },
          {
            label: '导管依赖性肺循环 (严重肺动脉闭锁 PA-IVS, 极重型四联症, 三尖瓣闭锁)',
            result: {
              decision: '立即持续微量泵入前列腺素E1 (PGE1, 0.01~0.05 µg/kg/min) 维持动脉导管开放！',
              recommendationLevel: 'Urgent',
              actionType: 'Emergency Intervention',
              rationale: '肺血完全依赖未闭动脉导管 (PDA) 维持生命！导管一旦功能性闭合患儿将死于窒息性缺氧。',
              guidelineReference: 'AHA Critical CHD Management Guidelines Class I',
              followUpPlan: 'PGE1维持氧合，紧急行改良B-T分流术或PDA支架植入术。',
            },
          },
          {
            label: '导管依赖性体循环 (左心发育不良综合征 HLHS, 极重型主动脉缩窄 CoA, 主动脉弓中断 IAA)',
            result: {
              decision: '立即静脉滴注PGE1维持PDA开放，同时避免高浓度吸氧 (防止肺血管阻力骤降加剧体循环休克)',
              recommendationLevel: 'Urgent',
              actionType: 'Emergency Intervention',
              rationale: '体循环及下半身灌注完全依赖PDA右向左反流！高氧吸入会降低肺阻力促使肺充血而体循环无血灌注，引发严重代谢性酸中毒及无尿休克。',
              guidelineReference: 'HLHS / Arch Obstruction Emergency Guidelines',
              followUpPlan: '稳定后行急诊Norwood手术或主动脉弓端侧吻合矫正术。',
            },
          },
        ],
      },
      node_tga_mixing: {
        id: 'node_tga_mixing',
        question: '新生儿d-TGA：超声心房水平分流 (ASD/PFO) 是否限制 (孔径 < 3mm 或跨隔压差高)？',
        description: '决定是否需要行急诊球囊房隔造口术。',
        options: [
          {
            label: '是 (限制性小卵圆孔/房缺，严重紫绀及顽固酸中毒，经皮SaO2 < 65%)',
            result: {
              decision: '急救指征！静脉推注PGE1同时，超声床旁引导行急诊Rashkind球囊房隔造口术 (BAS)',
              recommendationLevel: 'Urgent',
              actionType: 'Emergency Intervention',
              rationale: '撕开房间隔形成有效双向心房水平充分血流混合，迅速逆转组织缺氧，为择期大动脉调转术 (ASO) 赢得手术时机。',
              guidelineReference: 'AHA/ESC Guidelines Class I Urgent Indication',
              followUpPlan: '造口术后经皮血氧上升至75%~85%后，于生后1~2周内安排急诊ASO手术。',
            },
          },
          {
            label: '否 (房水平交通充分 > 5mm，双向分流良好，经皮SaO2 > 75%~80%)',
            result: {
              decision: '维持PGE1低剂量泵入，积极完善术前评估，安排生后2周内大动脉调转术 (ASO)',
              recommendationLevel: 'Class I',
              actionType: 'Surgical Repair',
              rationale: '血流混合充足，病情相对稳定，抓紧生后前两周黄金窗口完成解剖学根治。',
              guidelineReference: 'STS Pediatric Heart Guidelines',
              followUpPlan: '严密心电及超声监护，择期ASO根治术。',
            },
          },
        ],
      },
    },
  },
};
