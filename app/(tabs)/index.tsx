import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing } from "../../constants/theme";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.decorTop} />

      <View style={styles.decorBottom} />

      <View style={styles.content}>
        <Text style={styles.emoji}>💎</Text>

        <Text style={styles.title}>Glowlyze</Text>

        <Text style={styles.subtitle}>화장품 성분 분석기</Text>

        <Text style={styles.description}>
          사진 한 장으로 성분을 분석하고{"\n"}내 피부에 맞는 제품을 찾아보세요
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/analyze")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>성분 분석 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  decorTop: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.primaryLight,
    opacity: 0.6,
  },
  decorBottom: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.accentLight,
    opacity: 0.5,
  },
  content: {
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  emoji: {
    fontSize: 52,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.accent,
    letterSpacing: 1,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
