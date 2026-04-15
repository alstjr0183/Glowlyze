import { ScrollView, StyleSheet, Text } from "react-native";
import { colors, spacing } from "../constants/theme";
import AnalysisResult from "../domains/analyze/components/AnalysisResult";
import ImageActionButtons from "../domains/analyze/components/ImageActionButtons";
import ImagePreview from "../domains/analyze/components/ImagePreview";
import LoadingState from "../domains/analyze/components/LoadingState";
import { useImageAnalysis } from "../domains/analyze/hooks/useImageAnalysis";

export default function AnalyzeScreen() {
  const { imageUri, loading, result, takePhoto, pickFromGallery } = useImageAnalysis();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>✨ 성분 분석</Text>

      <ImageActionButtons onTakePhoto={takePhoto} onPickFromGallery={pickFromGallery} />

      {imageUri && <ImagePreview uri={imageUri} />}

      {loading && <LoadingState />}

      {result && imageUri && <AnalysisResult result={result} imageUri={imageUri} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: 40 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: spacing.xl,
    textAlign: "center",
    color: colors.text,
  },
});
