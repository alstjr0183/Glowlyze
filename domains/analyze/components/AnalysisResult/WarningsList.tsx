import { StyleSheet, Text, View } from "react-native";
import { IngredientAnalysis } from "../../services/geminiService";

interface Props {
  warnings: IngredientAnalysis["warnings"];
}

export default function WarningsList({ warnings }: Props) {
  if (warnings.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>⚠️ 주의 성분</Text>

      {warnings.map((w, i) => (
        <View key={i} style={styles.warningItem}>
          <Text style={styles.warningName}>{w.name}</Text>
          <Text style={styles.warningReason}>{w.reason}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#222" },
  warningItem: {
    backgroundColor: "#FFF3F3",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#FF4444",
  },
  warningName: { fontWeight: "600", color: "#CC0000" },
  warningReason: { color: "#555", fontSize: 13, marginTop: 2 },
});
