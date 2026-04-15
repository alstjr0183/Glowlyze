import { Image, StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../../../../constants/theme";

interface Props {
  uri: string;
}

export default function ImagePreview({ uri }: Props) {
  return (
    <View style={styles.wrapper}>
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: { width: "100%", height: 220 },
});
