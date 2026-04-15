import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "",
});

export interface IngredientAnalysis {
  ingredients: string[];
  warnings: { name: string; reason: string }[];
  skinTypeCompatibility: {
    dry: "적합" | "주의" | "보통";
    oily: "적합" | "주의" | "보통";
    combination: "적합" | "주의" | "보통";
    sensitive: "적합" | "주의" | "보통";
  };
  summary: string;
}

export async function analyzeIngredients(
  imageBase64: string,
  mimeType: string = "image/jpeg"
): Promise<IngredientAnalysis> {
  const prompt = `이 화장품 성분표 이미지에서 성분을 분석해줘.

지시사항:
- "성분", "Ingredients", "全成分" 라벨 뒤에 나오는 모든 성분을 빠짐없이 추출해
- 성분은 쉼표(,) 또는 줄바꿈으로 구분되어 있어
- 성분명을 생략하거나 요약하지 마

JSON 형식으로 답변해:
{
  "ingredients": ["성분1", "성분2", ...],
  "warnings": [
    { "name": "주의 성분명", "reason": "주의 이유" }
  ],
  "skinTypeCompatibility": {
    "dry": "적합/보통/주의",
    "oily": "적합/보통/주의",
    "combination": "적합/보통/주의",
    "sensitive": "적합/보통/주의"
  },
  "summary": "전체 성분에 대한 한 줄 요약"
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: imageBase64 } },
        ],
      },
    ],
    config: {
      temperature: 0,
      responseMimeType: "application/json",
    },
  });

  const text = response.text ?? "";

  const parsed = JSON.parse(text) as IngredientAnalysis;

  return parsed;
}
