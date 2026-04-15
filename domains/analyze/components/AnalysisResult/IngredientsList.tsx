import { StyleSheet, Text, View } from "react-native";

interface Props {
  ingredients: string[];
}

export default function IngredientsList({ ingredients }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>전체 성분 ({ingredients.length}개)</Text>

      <Text style={styles.ingredientList}>{ingredients.join(", ")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#222" },
  ingredientList: { fontSize: 13, color: "#555", lineHeight: 20 },
});
