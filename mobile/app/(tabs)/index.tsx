import React, { useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { Alert, Button, Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { pickImage } from '@/pickImage';
import { SERVER_BASE_URL } from '@/serverConfig';
import { uploadImage } from '@/uploadImage';

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);

  const serverMessage = useMemo(() => {
    if (Platform.OS === 'web') return null;

    if (SERVER_BASE_URL.includes('YOUR_LAPTOP_IP')) {
      return {
        text: 'On phone: replace YOUR_LAPTOP_IP in mobile/serverConfig.ts',
        isWarning: true,
      };
    }

    if (SERVER_BASE_URL.includes('localhost')) {
      return {
        text: 'On phone: do not use localhost — use your laptop IP on the same Wi‑Fi',
        isWarning: true,
      };
    }

    return {
      text: 'Server URL looks configured for your phone.',
      isWarning: false,
    };
  }, [SERVER_BASE_URL]);

  const uploadedFullUrl = useMemo(() => {
    if (!uploadedPath) return null;
    return `${SERVER_BASE_URL}${uploadedPath}`;
  }, [uploadedPath]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">RUMAD Photo Uploader</ThemedText>
      <ThemedText style={styles.muted}>
        Server: <ThemedText type="defaultSemiBold">{SERVER_BASE_URL}</ThemedText>
      </ThemedText>
      {serverMessage ? (
        <ThemedText style={[styles.muted, serverMessage.isWarning ? styles.warning : null]}>
          {serverMessage.text}
        </ThemedText>
      ) : null}

      <View style={styles.row}>
        <Button
          title="Take Photo"
          onPress={async () => {
            const uri = await pickImage();
            if (!uri) return;
            setUploadedPath(null);
            setImageUri(uri);
          }}
        />
        <Button
          title={isUploading ? 'Uploading…' : 'Upload'}
          disabled={!imageUri || isUploading}
          onPress={async () => {
            if (!imageUri) return;
            try {
              setIsUploading(true);
              const { imageUrl } = await uploadImage(imageUri, SERVER_BASE_URL);
              setUploadedPath(imageUrl);
              Alert.alert('Uploaded!', imageUrl);
            } catch (err) {
              Alert.alert('Upload failed', err instanceof Error ? err.message : String(err));
            } finally {
              setIsUploading(false);
            }
          }}
        />
      </View>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.preview} contentFit="cover" />
      ) : (
        <ThemedText style={styles.muted}>Take a photo to preview it here.</ThemedText>
      )}

      {uploadedFullUrl ? (
        <ThemedText style={styles.muted}>
          Latest upload URL: <ThemedText type="defaultSemiBold">{uploadedFullUrl}</ThemedText>
        </ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: 'center',
  },
  muted: {
    opacity: 0.75,
  },
  warning: {
    opacity: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: 320,
    borderRadius: 12,
  },
});

