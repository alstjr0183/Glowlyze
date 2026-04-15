import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../../constants/theme";
import HistoryDetailView from "../../domains/history/components/HistoryDetailView";
import HistoryEmptyState from "../../domains/history/components/HistoryEmptyState";
import HistoryList from "../../domains/history/components/HistoryList";
import {
  HistoryItem,
  deleteHistoryItem,
  loadHistory,
} from "../../domains/history/services/historyService";
import { Text } from "react-native";

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadHistory().then(setHistory);
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert("삭제", "이 항목을 삭제할까요?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          await deleteHistoryItem(id);
          setHistory((prev) => prev.filter((item) => item.id !== id));
          if (selected?.id === id) setSelected(null);
        },
      },
    ]);
  };

  if (selected) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <HistoryDetailView item={selected} onBack={() => setSelected(null)} />
      </SafeAreaView>
    );
  }

  if (history.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <HistoryEmptyState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Text style={styles.screenTitle}>히스토리</Text>
      <HistoryList history={history} onSelect={setSelected} onDelete={handleDelete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  screenTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -0.5,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
});
