import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";
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
  section: { gap: spacing.sm },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
  warningItem: {
    backgroundColor: colors.dangerBg,
    padding: spacing.md,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.danger,
  },
  warningName: { fontWeight: "700", color: colors.danger, fontSize: 14 },
  warningReason: { color: colors.textSecondary, fontSize: 13, marginTop: 3, lineHeight: 18 },
});
