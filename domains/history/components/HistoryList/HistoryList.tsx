import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";
import { HistoryItem } from "../../services/historyService";

interface Props {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

export default function HistoryList({ history, onSelect, onDelete }: Props) {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={history}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => onSelect(item)} activeOpacity={0.8}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardDate}>{formatDate(item.savedAt)}</Text>
            <TouchableOpacity onPress={() => onDelete(item.id)} hitSlop={8}>
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
  container: { flex: 1 },
  listContent: { padding: spacing.xl, gap: spacing.md, paddingBottom: 40 },

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
});
