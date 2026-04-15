import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../../../constants/theme";

export default function HistoryEmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🔍</Text>
      <Text style={styles.title}>저장된 분석이 없어요</Text>
      <Text style={styles.desc}>분석 후 저장하기 버튼을 눌러보세요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  emoji: { fontSize: 48 },
  title: { fontSize: 17, fontWeight: "700", color: colors.text },
  desc: { fontSize: 14, color: colors.textSecondary },
});
