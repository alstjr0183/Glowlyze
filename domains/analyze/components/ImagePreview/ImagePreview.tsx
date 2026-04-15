import { Image, StyleSheet } from "react-native";

interface Props {
  uri: string;
}

export default function ImagePreview({ uri }: Props) {
  return <Image source={{ uri }} style={styles.image} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 20 },
});
