import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";
import { IngredientAnalysis } from "../../services/geminiService";

const SKIN_TYPES: { key: keyof IngredientAnalysis["skinTypeCompatibility"]; label: string }[] = [
  { key: "dry", label: "건성" },
  { key: "oily", label: "지성" },
  { key: "combination", label: "복합성" },
  { key: "sensitive", label: "민감성" },
];

interface Props {
  compatibility: IngredientAnalysis["skinTypeCompatibility"];
}

export default function SkinTypeCompatibility({ compatibility }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🌿 피부 타입별 적합도</Text>

      {SKIN_TYPES.map(({ key, label }) => {
        const value = compatibility[key];
        const valueStyleMap = { 적합: styles.good, 주의: styles.bad, 보통: styles.neutral };
        const valueStyle = valueStyleMap[value];

        const badgeStyleMap = { 적합: styles.badgeGood, 주의: styles.badgeBad, 보통: styles.badgeNeutral };
        const badgeStyle = badgeStyleMap[value];

        return (
          <View key={key} style={styles.skinRow}>
            <Text style={styles.skinLabel}>{label}</Text>
            <View style={[styles.badge, badgeStyle]}>
              <Text style={[styles.skinValue, valueStyle]}>{value}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.sm },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
  skinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skinLabel: { fontSize: 14, color: colors.text, fontWeight: "500" },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  badgeGood: { backgroundColor: colors.successBg },
  badgeBad: { backgroundColor: colors.dangerBg },
  badgeNeutral: { backgroundColor: colors.warningBg },
  skinValue: { fontSize: 13, fontWeight: "700" },
  good: { color: colors.success },
  bad: { color: colors.danger },
  neutral: { color: colors.warning },
});
