import { ScrollView, StyleSheet, Text } from "react-native";
import AnalysisResult from "../domains/analyze/components/AnalysisResult";
import ImageActionButtons from "../domains/analyze/components/ImageActionButtons";
import ImagePreview from "../domains/analyze/components/ImagePreview";
import LoadingState from "../domains/analyze/components/LoadingState";
import { useImageAnalysis } from "../domains/analyze/hooks/useImageAnalysis";

export default function AnalyzeScreen() {
  const { imageUri, loading, result, takePhoto, pickFromGallery } = useImageAnalysis();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>성분 분석</Text>

      <ImageActionButtons onTakePhoto={takePhoto} onPickFromGallery={pickFromGallery} />

      {imageUri && <ImagePreview uri={imageUri} />}

      {loading && <LoadingState />}

      {result && <AnalysisResult result={result} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center" },
});
