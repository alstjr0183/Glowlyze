import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingState() {
  return (
    <View style={styles.loadingBox}>
      <ActivityIndicator size="large" color="#4A90E2" />
      <Text style={styles.loadingText}>성분 분석 중...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingBox: { alignItems: "center", padding: 30, gap: 12 },
  loadingText: { color: "#666", fontSize: 15 },
});
