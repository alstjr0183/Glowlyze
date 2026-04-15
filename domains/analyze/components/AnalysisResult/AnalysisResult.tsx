import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";
import { IngredientAnalysis } from "../../services/geminiService";
import IngredientsList from "./IngredientsList";
import SkinTypeCompatibility from "./SkinTypeCompatibility";
import WarningsList from "./WarningsList";

interface Props {
  result: IngredientAnalysis;
}

export default function AnalysisResult({ result }: Props) {
  return (
    <View style={styles.resultBox}>
      <Text style={styles.summary}>{result.summary}</Text>

      <WarningsList warnings={result.warnings} />

      <SkinTypeCompatibility compatibility={result.skinTypeCompatibility} />

      <IngredientsList ingredients={result.ingredients} />
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
});
