import { StyleSheet, Text, View } from "react-native";
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
      <Text style={styles.sectionTitle}>피부 타입별 적합도</Text>

      {SKIN_TYPES.map(({ key, label }) => {
        const value = compatibility[key];
        const valueStyleMap = { 적합: styles.good, 주의: styles.bad, 보통: styles.neutral };
        const valueStyle = valueStyleMap[value];

        return (
          <View key={key} style={styles.skinRow}>
            <Text style={styles.skinLabel}>{label}</Text>

            <Text style={[styles.skinValue, valueStyle]}>{value}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#222" },
  skinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
  skinLabel: { fontSize: 14, color: "#444" },
  skinValue: { fontSize: 14, fontWeight: "600" },
  good: { color: "#2E9E4F" },
  bad: { color: "#E53E3E" },
  neutral: { color: "#D97706" },
});
