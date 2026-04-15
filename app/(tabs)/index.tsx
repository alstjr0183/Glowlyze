import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing } from "../../constants/theme";
import SkinTypeSelector from "../../domains/profile/components/SkinTypeSelector";
import {
  SkinType,
  loadProfile,
  saveProfile,
} from "../../domains/profile/services/profileService";

const SKIN_LABEL: Record<SkinType, string> = {
  dry: "건성",
  oily: "지성",
  combination: "복합성",
  sensitive: "민감성",
};

const SKIN_EMOJI: Record<SkinType, string> = {
  dry: "🌵",
  oily: "💧",
  combination: "⚖️",
  sensitive: "🌸",
};

export default function Index() {
  const router = useRouter();
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadProfile().then((p) => setSkinType(p?.skinType ?? null));
    }, [])
  );

  const handleSelectSkinType = async (type: SkinType) => {
    await saveProfile({ skinType: type });
    setSkinType(type);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.decorTop} />

      <View style={styles.decorBottom} />

      <View style={styles.content}>
        <Text style={styles.emoji}>💎</Text>

        <Text style={styles.title}>Glowlyze</Text>

        <Text style={styles.subtitle}>화장품 성분 분석기</Text>

        {skinType ? (
          <TouchableOpacity style={styles.profileChip} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
            <Text style={styles.profileChipText}>
              {SKIN_EMOJI[skinType]} {SKIN_LABEL[skinType]} 피부
            </Text>
            <Text style={styles.profileChipEdit}>변경</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.profileChipEmpty} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
            <Text style={styles.profileChipEmptyText}>✦ 내 피부 타입 설정하기</Text>
          </TouchableOpacity>
        )}

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

      <SkinTypeSelector
        visible={modalVisible}
        currentSkinType={skinType}
        onSelect={handleSelectSkinType}
        onClose={() => setModalVisible(false)}
      />
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
  profileChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  profileChipText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  profileChipEdit: {
    fontSize: 12,
    color: colors.primary,
    opacity: 0.7,
  },
  profileChipEmpty: {
    backgroundColor: colors.accentLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  profileChipEmptyText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.accent,
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
