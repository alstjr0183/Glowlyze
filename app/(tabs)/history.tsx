import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing } from "../../constants/theme";
import {
  HistoryItem,
  deleteHistoryItem,
  loadHistory,
} from "../../domains/history/services/historyService";
import AnalysisResult from "../../domains/analyze/components/AnalysisResult";

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
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => setSelected(null)}>
          <Text style={styles.backButtonText}>← 목록으로</Text>
        </TouchableOpacity>
        <Text style={styles.dateLabel}>{formatDate(selected.savedAt)}</Text>
        <AnalysisResult result={selected.result} imageUri={selected.imageUri} />
      </ScrollView>
    );
  }

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🔍</Text>
        <Text style={styles.emptyTitle}>저장된 분석이 없어요</Text>
        <Text style={styles.emptyDesc}>분석 후 저장하기 버튼을 눌러보세요</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={history}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => setSelected(item)} activeOpacity={0.8}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardDate}>{formatDate(item.savedAt)}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)} hitSlop={8}>
              <Text style={styles.deleteText}>삭제</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.cardSummary} numberOfLines={2}>{item.result.summary}</Text>

          <View style={styles.cardMeta}>
            <View style={styles.metaBadge}>
              <Text style={styles.metaText}>성분 {item.result.ingredients.length}개</Text>
            </View>
            {item.result.warnings.length > 0 && (
              <View style={[styles.metaBadge, styles.metaBadgeDanger]}>
                <Text style={[styles.metaText, styles.metaTextDanger]}>
                  주의 {item.result.warnings.length}개
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: 40 },
  listContent: { padding: spacing.xl, gap: spacing.md, paddingBottom: 40 },

  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
  emptyDesc: { fontSize: 14, color: colors.textSecondary },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardDate: { fontSize: 12, color: colors.textMuted, fontWeight: "500" },
  deleteText: { fontSize: 13, color: colors.danger, fontWeight: "600" },
  cardSummary: { fontSize: 14, color: colors.text, lineHeight: 20 },
  cardMeta: { flexDirection: "row", gap: spacing.sm },
  metaBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  metaBadgeDanger: { backgroundColor: colors.dangerBg },
  metaText: { fontSize: 12, color: colors.primary, fontWeight: "600" },
  metaTextDanger: { color: colors.danger },

  backButton: { marginBottom: spacing.md },
  backButtonText: { fontSize: 15, color: colors.primary, fontWeight: "600" },
  dateLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
});
