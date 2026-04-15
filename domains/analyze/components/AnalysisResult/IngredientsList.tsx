import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";

interface Props {
  ingredients: string[];
}

export default function IngredientsList({ ingredients }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>💊 전체 성분 ({ingredients.length}개)</Text>

      <View style={styles.tagContainer}>
        {ingredients.map((ingredient, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{ingredient}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.sm },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: { fontSize: 12, color: colors.primary, fontWeight: "500" },
});
