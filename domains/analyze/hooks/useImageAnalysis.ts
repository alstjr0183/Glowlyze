import { ImageManipulator, ImageRef, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";
import { IngredientAnalysis, analyzeIngredients } from "../services/geminiService";

export function useImageAnalysis() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IngredientAnalysis | null>(null);

  const analyze = async (uri: string) => {
    if (!uri) {
      Alert.alert("오류", "유효하지 않은 이미지입니다.");
      return;
    }

    setImageUri(uri);
    setResult(null);
    setLoading(true);

    let ref: ImageRef | null = null;

    try {
      ref = await ImageManipulator.manipulate(uri).resize({ width: 1024 }).renderAsync();
      const compressed = await ref.saveAsync({ compress: 0.6, format: SaveFormat.JPEG, base64: true });

      if (!compressed.base64) {
        throw new Error("이미지 데이터를 불러올 수 없습니다.");
      }

      const analysis = await analyzeIngredients(compressed.base64);
      setResult(analysis);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error("[Gemini] 오류:", message);
      Alert.alert("분석 실패", message);
    } finally {
      ref?.release?.();
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("권한 필요", "카메라 접근 권한이 필요합니다.");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.7,
    });

    if (pickerResult.canceled || !pickerResult.assets[0]) return;

    await analyze(pickerResult.assets[0].uri);
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("권한 필요", "사진 접근 권한이 필요합니다.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
      mediaTypes: "images",
    });

    if (pickerResult.canceled || !pickerResult.assets[0]) return;

    await analyze(pickerResult.assets[0].uri);
  };

  return { imageUri, loading, result, takePhoto, pickFromGallery };
}
