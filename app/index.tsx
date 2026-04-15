import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glowlyze</Text>

      <Text style={styles.subtitle}>화장품 성분 분석기</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/analyze")}
      >
        <Text style={styles.buttonText}>성분 분석 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 12,
  },
  title: { fontSize: 36, fontWeight: "800", color: "#4A90E2" },
  subtitle: { fontSize: 16, color: "#888", marginBottom: 20 },
  button: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 14,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
