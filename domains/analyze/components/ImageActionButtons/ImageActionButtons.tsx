import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
}

export default function ImageActionButtons({ onTakePhoto, onPickFromGallery }: Props) {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
        <Text style={styles.buttonText}>카메라 촬영</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onPickFromGallery}>
        <Text style={styles.buttonText}>갤러리 선택</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
  button: {
    flex: 1,
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
