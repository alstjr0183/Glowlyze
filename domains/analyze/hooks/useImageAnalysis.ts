import { ImageManipulator, ImageRef, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { SkinType, UserProfile, loadProfile } from "../../profile/services/profileService";
import { IngredientAnalysis, analyzeIngredients } from "../services/geminiService";

export function useImageAnalysis() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IngredientAnalysis | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadProfile().then(setProfile);
  }, []);

  const analyze = async (uri: string) => {
    if (!uri) {
      Alert.alert("오류", "유효하지 않은 이미지입니다.");
      return;
    }

    console.log("[analyze] 시작 uri:", uri.slice(0, 80));
    setImageUri(uri);
    setResult(null);
    setLoading(true);

    let ref: ImageRef | null = null;

    try {
      console.log("[analyze] 이미지 압축 시작");
      ref = await ImageManipulator.manipulate(uri).resize({ width: 1024 }).renderAsync();
      const compressed = await ref.saveAsync({ compress: 0.6, format: SaveFormat.JPEG, base64: true });
      console.log("[analyze] 압축 완료, base64 길이:", compressed.base64?.length ?? 0);

      if (!compressed.base64) {
        throw new Error("이미지 데이터를 불러올 수 없습니다.");
      }

      console.log("[analyze] Gemini API 호출 시작");
      const analysis = await analyzeIngredients(compressed.base64, "image/jpeg", profile?.skinType);
      console.log("[analyze] Gemini 응답 완료, 성분 수:", analysis.ingredients?.length);
      setResult(analysis);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error("[analyze] 오류:", message);
      if (e instanceof Error) console.error("[analyze] 스택:", e.stack);
      Alert.alert("분석 실패", message);
    } finally {
      ref?.release?.();
      setLoading(false);
      console.log("[analyze] 종료, loading=false");
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

  return { imageUri, loading, result, takePhoto, pickFromGallery, userSkinType: (profile?.skinType ?? null) as SkinType | null };
}
