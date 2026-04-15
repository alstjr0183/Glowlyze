import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, spacing } from "../../../../constants/theme";
import AnalysisResult from "../../../analyze/components/AnalysisResult";
import { HistoryItem } from "../../services/historyService";

interface Props {
  item: HistoryItem;
  onBack: () => void;
}

export default function HistoryDetailView({ item, onBack }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← 목록으로</Text>
      </TouchableOpacity>
      <Text style={styles.dateLabel}>{formatDate(item.savedAt)}</Text>
      <AnalysisResult result={item.result} imageUri={item.imageUri} />
    </ScrollView>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.xl, paddingBottom: 40 },
  backButton: { marginBottom: spacing.md },
  backButtonText: { fontSize: 15, color: colors.primary, fontWeight: "600" },
  dateLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
});
