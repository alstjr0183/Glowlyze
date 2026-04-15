import { StyleSheet, Text, View } from "react-native";
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
  resultBox: { gap: 16 },
  summary: {
    fontSize: 15,
    color: "#333",
    backgroundColor: "#F0F4FF",
    padding: 14,
    borderRadius: 10,
    lineHeight: 22,
  },
});
