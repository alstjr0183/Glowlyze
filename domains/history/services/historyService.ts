import AsyncStorage from "@react-native-async-storage/async-storage";
import { IngredientAnalysis } from "../../analyze/services/geminiService";

const STORAGE_KEY = "glowlyze_history";

export interface HistoryItem {
  id: string;
  savedAt: string;
  imageUri: string;
  result: IngredientAnalysis;
}

export async function saveAnalysis(
  imageUri: string,
  result: IngredientAnalysis
): Promise<void> {
  const history = await loadHistory();
  const newItem: HistoryItem = {
    id: String(Date.now()),
    savedAt: new Date().toISOString(),
    imageUri,
    result,
  };
  const updated = [newItem, ...history];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function loadHistory(): Promise<HistoryItem[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as HistoryItem[];
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const history = await loadHistory();
  const updated = history.filter((item) => item.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
