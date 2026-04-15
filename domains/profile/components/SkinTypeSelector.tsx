import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, radius, spacing } from "../../../constants/theme";
import { SkinType } from "../services/profileService";

const SKIN_OPTIONS: {
  key: SkinType;
  label: string;
  emoji: string;
  description: string;
}[] = [
  { key: "dry", label: "건성", emoji: "🌵", description: "수분이 부족하고 건조함" },
  { key: "oily", label: "지성", emoji: "💧", description: "피지 분비가 많고 번들거림" },
  { key: "combination", label: "복합성", emoji: "⚖️", description: "T존은 지성, 볼은 건성" },
  { key: "sensitive", label: "민감성", emoji: "🌸", description: "자극에 민감하고 쉽게 붉어짐" },
];

interface Props {
  visible: boolean;
  currentSkinType: SkinType | null;
  onSelect: (skinType: SkinType) => void;
  onClose: () => void;
}

export default function SkinTypeSelector({ visible, currentSkinType, onSelect, onClose }: Props) {
  const [selected, setSelected] = useState<SkinType | null>(currentSkinType);

  const handleConfirm = () => {
    if (selected) onSelect(selected);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      onShow={() => setSelected(currentSkinType)}
    >
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.card} activeOpacity={1}>
          <Text style={styles.title}>내 피부 타입을 선택해 주세요</Text>

          <View style={styles.options}>
            {SKIN_OPTIONS.map(({ key, label, emoji, description }) => {
              const isSelected = selected === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => setSelected(key)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.optionEmoji}>{emoji}</Text>
                  <View style={styles.optionText}>
                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      {label}
                    </Text>
                    <Text style={styles.optionDesc}>{description}</Text>
                  </View>
                  {isSelected && <View style={styles.checkDot} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.confirmButton, !selected && styles.confirmButtonDisabled]}
            onPress={handleConfirm}
            disabled={!selected}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmButtonText}>확인</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    width: "100%",
    gap: spacing.lg,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  options: { gap: spacing.sm },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.md,
  },
  optionSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.primaryLight,
  },
  optionEmoji: { fontSize: 22 },
  optionText: { flex: 1 },
  optionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  optionLabelSelected: { color: colors.primary },
  optionDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  confirmButtonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
