import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK with server-side key
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// API: AI Clinical Decision & Ultrasound Case Analysis
app.post('/api/analyze-case', async (req, res) => {
  try {
    const { patientInfo, echoFindings, clinicalQuestion, diseaseType } = req.body;

    if (!ai) {
      return res.status(200).json({
        success: true,
        source: 'clinical_engine_fallback',
        analysis: generateFallbackAnalysis(patientInfo, echoFindings, diseaseType, clinicalQuestion),
      });
    }

    const systemPrompt = `你是一名资深小儿心脏病学与先天性心脏病超声心动图专家（主任医师级别），熟悉国内外最新指南，包括：
1. 美国超声心动图学会 (ASE) 小儿与先天性心脏病超声指南
2. 欧洲心脏病学会 (ESC) / EACTS 先天性心脏病管理指南
3. 中华医学会儿科学分会心脏学组、中华医学会超声医学分会先心病专家共识

请根据医生提交的超声心动图测量数据、声像学表现和病史，按医学学术与临床决策标准提供严谨的结构化决策意见，包含：
【一、心血管连续节段分析 (Sequential Segmental Analysis)】
1. 心房位置 (Visceroatrial Situs) 与静脉回流
2. 房室连接 (Atrioventricular Connection) 与心室位置/袢向
3. 心室大动脉连接 (Ventriculoarterial Connection) 与大动脉空间关系
4. 伴随分流/梗阻/瓣膜畸形

【二、血流动力学定量与严重度分级】
评估分流方向与量 (Qp/Qs)、压差评估、肺血管阻力 (PVR) 与肺动脉高压 (PAH) 危险度分层，心室功能与容积负荷。

【三、临床指南决策与手术/介入指征评估 (Class I / IIa / IIb / III)】
给出介入封堵、外科根治术或姑息手术（如B-T分流、肺动脉环扎、Norwood/Glenn/Fontan）的适应证、禁忌证与最佳干预窗口期。

【四、超声复查监测重点与高危警示】
列出复查需要重点切面监测的结构（如主动脉瓣脱垂及反流、房室传导阻滞风险、流出道继发肌束肥厚等）。

请使用专业中文临床术语，逻辑严谨，分段清晰，突出客观依据与指南分级。`;

    const userPrompt = `
【患者基本资料】
年龄/日龄: ${patientInfo?.age || '未指定'}
性别: ${patientInfo?.gender || '未指定'}
体表面积(BSA): ${patientInfo?.bsa ? patientInfo.bsa + ' m²' : '未指定'}
体重/身高: ${patientInfo?.weight ? patientInfo.weight + ' kg' : ''} / ${patientInfo?.height ? patientInfo.height + ' cm' : ''}
临床表现/发绀/经皮氧饱和度: ${patientInfo?.symptoms || '无发绀/平素体健'}

【疑诊或确诊病种】: ${diseaseType || '复杂或未定型先心病'}

【超声心动图测量值与声像所见】:
${echoFindings || '未提供具体超声描述'}

【会诊/临床核心关注问题】:
${clinicalQuestion || '评估当前病变的手术或介入指征、最佳治疗时机及血流动力学危险分级。'}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
        }
      ],
      config: {
        temperature: 0.2,
        maxOutputTokens: 2500,
      }
    });

    const analysisText = response.text || '未能获取有效的分析结果，请检查输入或稍后重试。';

    return res.json({
      success: true,
      source: 'gemini-3.8-flash',
      analysis: analysisText,
    });
  } catch (error: any) {
    console.error('Error in analyze-case:', error);
    // Provide clinical rule-based fallback if API fails
    const { patientInfo, echoFindings, diseaseType, clinicalQuestion } = req.body;
    return res.status(200).json({
      success: true,
      source: 'clinical_engine_fallback_after_error',
      analysis: generateFallbackAnalysis(patientInfo, echoFindings, diseaseType, clinicalQuestion),
      apiError: error?.message || 'Gemini API call failed',
    });
  }
});

// Helper for comprehensive rule-based clinical analysis fallback
function generateFallbackAnalysis(
  patientInfo: any,
  echoFindings: string,
  diseaseType: string,
  clinicalQuestion: string
): string {
  const dType = diseaseType || '先天性心脏病';
  return `【超声先心病专科临床决策支持系统 - 规范化专家建议】

【一、心血管连续节段分析 (Sequential Segmental Analysis)】
1. 心房与静脉连接：需明确心房正位 (Situs Solitus)、反位 (Inversus) 或异构 (Isomerism/Heterotaxy)。超声剑突下切面确定下腔静脉与腹主动脉在脊柱两侧的空间关系。
2. 房室连接：评估二尖瓣与三尖瓣附着位置、启闭活动，排除房室瓣闭锁、瓣上隔膜或心内膜垫缺损 (AVSD)。
3. 心室大动脉连接：评估主动脉、肺动脉起始位置及交叉关系。测量大动脉根部、瓣环直径及内径Z-Score。
4. 伴随畸形：结合声像图特征重点排查主动脉弓降部缩窄 (CoA)、左上腔静脉异位引流至冠状静脉窦 (PLSVC) 等。

【二、血流动力学定量与分流评估】
1. 分流束与压差估算：
   - 依据简化的伯努利方程 (ΔP = 4v²)，根据分流峰值流速准确推算心室间/大动脉水平压差。
   - 三尖瓣反流峰值流速 (TR Vmax) 估算肺动脉收缩压 (PASP = 4 × TR_Vmax² + RAP)。
2. 心室容量与阻力评估：
   - 关注左心室舒张末期容积指数 (LVEDVI) 与右心室扩大程度。
   - Qp/Qs > 1.5 提示显著左向右分流及容量负荷过重。

【三、临床指南指征与干预时机 (基于最新专家共识)】
- 针对 ${dType}：
  * 若为房间隔缺损 (ASD继发孔型)：边缘距冠状静脉窦、房室瓣、上/下腔静脉及主动脉边缘≥5mm者，可行经皮导管介入封堵（主动脉缘允许略缺但需其他缘充分支撑）；若伴部分肺静脉异位引流或原发孔型则为外科修补指征。
  * 若为室间隔缺损 (VSD)：干下型 (Supracristal) 及伴主动脉瓣脱垂/反流者，无论缺损大小均建议尽早外科手术；膜周型若边缘距主动脉瓣环充足可权衡介入封堵或体外循环修补。
  * 若为法洛四联症 (TOF) 或大动脉转位 (TGA)：建议多学科心血管外科会诊，测定McGoon比值与Nakata指数，评估肺血管发育情况以决定一期根治或分期姑息。

【四、超声复查监测要点与警示】
1. 严密随访肺动脉压力演变，防范艾森曼格综合征 (Eisenmenger Syndrome)。
2. 定期监测心瓣膜有无继发脱垂、狭窄或反流程度加重。
3. 密切复查左室射血分数 (LVEF) 及室壁运动协调性。`;
}

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CHD Echo Clinical Guidelines & CDSS server running on port ${PORT}`);
  });
}

startServer();
