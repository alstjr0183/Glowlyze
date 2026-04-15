import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "glowlyze_profile";

export type SkinType = "dry" | "oily" | "combination" | "sensitive";

export interface UserProfile {
  skinType: SkinType;
}

export async function loadProfile(): Promise<UserProfile | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as UserProfile;
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export async function clearProfile(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
