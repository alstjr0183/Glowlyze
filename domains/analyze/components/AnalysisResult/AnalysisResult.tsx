import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";
import { SkinType } from "../../../profile/services/profileService";
import { saveAnalysis } from "../../../history/services/historyService";
import { IngredientAnalysis } from "../../services/geminiService";
import IngredientsList from "./IngredientsList";
import SkinTypeCompatibility from "./SkinTypeCompatibility";
import WarningsList from "./WarningsList";

const SKIN_LABEL: Record<SkinType, string> = {
  dry: "건성",
  oily: "지성",
  combination: "복합성",
  sensitive: "민감성",
};

const SKIN_EMOJI: Record<SkinType, string> = {
  dry: "🌵",
  oily: "💧",
  combination: "⚖️",
  sensitive: "🌸",
};

const BADGE_STYLE_MAP = {
  적합: { bg: colors.successBg, text: colors.success },
  보통: { bg: colors.warningBg, text: colors.warning },
  주의: { bg: colors.dangerBg, text: colors.danger },
} as const;

interface Props {
  result: IngredientAnalysis;
  imageUri: string;
  userSkinType?: SkinType | null;
}

export default function AnalysisResult({ result, imageUri, userSkinType }: Props) {
  const handleSave = async () => {
    try {
      await saveAnalysis(imageUri, result);
      Alert.alert("저장 완료", "분석 결과가 히스토리에 저장되었습니다.");
    } catch {
      Alert.alert("오류", "저장에 실패했습니다.");
    }
  };

  const myCompatibility = userSkinType ? result.skinTypeCompatibility[userSkinType] : null;
  const myBadgeStyle = myCompatibility ? BADGE_STYLE_MAP[myCompatibility] : null;

  return (
    <View style={styles.resultBox}>
      <Text style={styles.summary}>{result.summary}</Text>

      {userSkinType && myCompatibility && myBadgeStyle && (
        <View style={styles.myCallout}>
          <Text style={styles.myCalloutLabel}>
            {SKIN_EMOJI[userSkinType]} 내 피부({SKIN_LABEL[userSkinType]}) 결과
          </Text>
          <View style={[styles.myBadge, { backgroundColor: myBadgeStyle.bg }]}>
            <Text style={[styles.myBadgeText, { color: myBadgeStyle.text }]}>
              {myCompatibility}
            </Text>
          </View>
        </View>
      )}

      <WarningsList warnings={result.warnings} />

      <SkinTypeCompatibility compatibility={result.skinTypeCompatibility} userSkinType={userSkinType} />

      <IngredientsList ingredients={result.ingredients} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
        <Text style={styles.saveButtonText}>💾 히스토리에 저장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  resultBox: { gap: spacing.lg },
  myCallout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primaryLight,
    padding: 14,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  myCalloutLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  myBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  myBadgeText: {
    fontSize: 14,
    fontWeight: "800",
  },
  summary: {
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.accentLight,
    padding: 14,
    borderRadius: radius.md,
    lineHeight: 22,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: "center",
    marginTop: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
