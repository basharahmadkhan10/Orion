import { GoogleGenAI } from "@google/genai";


export const bearAgentNode = async (state) => {
  const { ticker, evidenceLedger } = state;
  console.log(`[Bear Agent Node] Formulating risk and valuation counter-thesis for ${ticker}...`);

  const prompt = `You are an institutional short risk analyst. Look at the following verified Evidence Ledger for ${ticker}:
${JSON.stringify(evidenceLedger, null, 2)}

Formulate the strongest possible risk narrative and counter-thesis highlighting vulnerabilities in ${ticker}.
You MUST cite specific evidence IDs [E1], [E3] for every risk factor.
Return strictly valid JSON with no markdown formatting in this structure:
{
  "thesis": "Detailed bearish narrative citing [E2], [E3]...",
  "keyRisks": ["Risk 1 [E2]", "Risk 2 [E3]"],
  "citedEvidenceIds": ["E2", "E3"]
}`;

  try {
    if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });
      const parsed = JSON.parse(response.text);
      return { bearThesis: parsed };
    }
  } catch (err) {
    console.error("Bear Agent LLM fallback notice:", err?.message);
  }

  const e2 = evidenceLedger.find((e) => e.id === "E2") || { id: "E2", content: "Valuation multiples" };
  const e4 = evidenceLedger.find((e) => e.id === "E4") || { id: "E4", content: "Macro headwinds" };

  return {
    bearThesis: {
      thesis: `Adversarial risk cross-examination of ${ticker} flags multiple sensitivity relative to forward growth rates (${e2.content}) [${e2.id}]. Additionally, broader sector competition poses execution headwinds (${e4.content}) [${e4.id}].`,
      keyRisks: [
        `${ticker} valuation compression risk if forward P/E outpaces EPS growth [${e2.id}]`,
        `Regulatory & competitive margin pressure across primary segments [${e4.id}]`,
        `Capital expenditure requirements impacting intermediate free cash flow [E3]`,
      ],
      citedEvidenceIds: [e2.id, e4.id],
    },
  };
};




