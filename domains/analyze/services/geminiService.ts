import { GoogleGenAI } from "@google/genai";
import { SkinType } from "../../profile/services/profileService";

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

const SKIN_LABEL: Record<SkinType, string> = {
  dry: "건성",
  oily: "지성",
  combination: "복합성",
  sensitive: "민감성",
};

export async function analyzeIngredients(
  imageBase64: string,
  mimeType: string = "image/jpeg",
  userSkinType?: SkinType
): Promise<IngredientAnalysis> {
  const skinTypeInstruction = userSkinType
    ? `- 사용자의 피부 타입은 "${SKIN_LABEL[userSkinType]}"입니다. summary 필드는 이 피부 타입 관점에서 먼저 한 줄로 작성해줘. 예: "${SKIN_LABEL[userSkinType]} 피부에는 ..."`
    : "";

  const prompt = `이 화장품 성분표 이미지에서 성분을 분석해줘.

지시사항:
- "성분", "Ingredients", "全成分" 라벨 뒤에 나오는 모든 성분을 빠짐없이 추출해
- 성분은 쉼표(,) 또는 줄바꿈으로 구분되어 있어
- 성분명을 생략하거나 요약하지 마${skinTypeInstruction ? `\n${skinTypeInstruction}` : ""}

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
