import * as ImagePicker from 'expo-image-picker';

export async function pickImage(): Promise<string | null> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
  });

  if (result.canceled) return null;
  return result.assets[0]?.uri ?? null;
}
