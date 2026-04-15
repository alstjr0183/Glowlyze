import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";
import { saveAnalysis } from "../../../history/services/historyService";
import { IngredientAnalysis } from "../../services/geminiService";
import IngredientsList from "./IngredientsList";
import SkinTypeCompatibility from "./SkinTypeCompatibility";
import WarningsList from "./WarningsList";

interface Props {
  result: IngredientAnalysis;
  imageUri: string;
}

export default function AnalysisResult({ result, imageUri }: Props) {
  const handleSave = async () => {
    try {
      await saveAnalysis(imageUri, result);
      Alert.alert("저장 완료", "분석 결과가 히스토리에 저장되었습니다.");
    } catch {
      Alert.alert("오류", "저장에 실패했습니다.");
    }
  };

  return (
    <View style={styles.resultBox}>
      <Text style={styles.summary}>{result.summary}</Text>

      <WarningsList warnings={result.warnings} />

      <SkinTypeCompatibility compatibility={result.skinTypeCompatibility} />

      <IngredientsList ingredients={result.ingredients} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
        <Text style={styles.saveButtonText}>💾 히스토리에 저장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  resultBox: { gap: spacing.lg },
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
