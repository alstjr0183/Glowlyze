import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";

export default function LoadingState() {
  return (
    <View style={styles.loadingBox}>
      <ActivityIndicator size="large" color={colors.primary} />

      <Text style={styles.loadingText}>🔍 성분 분석 중...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingBox: {
    alignItems: "center",
    padding: 30,
    gap: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
  },
  loadingText: { color: colors.primary, fontSize: 15, fontWeight: "600" },
});
