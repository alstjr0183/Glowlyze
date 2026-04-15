import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";

interface Props {
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
}

export default function ImageActionButtons({ onTakePhoto, onPickFromGallery }: Props) {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.buttonPrimary} onPress={onTakePhoto} activeOpacity={0.85}>
        <Text style={styles.buttonPrimaryText}>📷 카메라 촬영</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonOutline} onPress={onPickFromGallery} activeOpacity={0.85}>
        <Text style={styles.buttonOutlineText}>🖼 갤러리 선택</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.xl },
  buttonPrimary: {
    flex: 1,
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
  buttonPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  buttonOutline: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonOutlineText: { color: colors.primary, fontWeight: "700", fontSize: 14 },
});
