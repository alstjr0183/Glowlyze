import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";
import { SkinType } from "../../../profile/services/profileService";
import { IngredientAnalysis } from "../../services/geminiService";

const SKIN_TYPES: { key: keyof IngredientAnalysis["skinTypeCompatibility"]; label: string }[] = [
  { key: "dry", label: "건성" },
  { key: "oily", label: "지성" },
  { key: "combination", label: "복합성" },
  { key: "sensitive", label: "민감성" },
];

interface Props {
  compatibility: IngredientAnalysis["skinTypeCompatibility"];
  userSkinType?: SkinType | null;
}

export default function SkinTypeCompatibility({ compatibility, userSkinType }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🌿 피부 타입별 적합도</Text>

      {SKIN_TYPES.map(({ key, label }) => {
        const value = compatibility[key];
        const isMyType = userSkinType === key;

        const valueStyleMap = { 적합: styles.good, 주의: styles.bad, 보통: styles.neutral };
        const valueStyle = valueStyleMap[value];

        const badgeStyleMap = { 적합: styles.badgeGood, 주의: styles.badgeBad, 보통: styles.badgeNeutral };
        const badgeStyle = badgeStyleMap[value];

        return (
          <View key={key} style={[styles.skinRow, isMyType && styles.skinRowHighlighted]}>
            <View style={styles.labelGroup}>
              <Text style={[styles.skinLabel, isMyType && styles.skinLabelHighlighted]}>{label}</Text>
              {isMyType && (
                <View style={styles.myBadge}>
                  <Text style={styles.myBadgeText}>내 피부</Text>
                </View>
              )}
            </View>
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
  skinRowHighlighted: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  labelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  skinLabel: { fontSize: 14, color: colors.text, fontWeight: "500" },
  skinLabelHighlighted: { color: colors.primary, fontWeight: "700" },
  myBadge: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  myBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
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
