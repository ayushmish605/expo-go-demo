import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

import { SERVER_BASE_URL } from '@/serverConfig';

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Workshop Info</ThemedText>

      <ThemedText>
        You’re building: <ThemedText type="defaultSemiBold">Phone → Server → Web</ThemedText>
      </ThemedText>

      <ThemedText style={styles.muted}>
        Mobile entry: <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>
      </ThemedText>
      <ThemedText style={styles.muted}>
        Upload helper: <ThemedText type="defaultSemiBold">mobile/uploadImage.ts</ThemedText>
      </ThemedText>
      <ThemedText style={styles.muted}>
        Server URL: <ThemedText type="defaultSemiBold">{SERVER_BASE_URL}</ThemedText>
      </ThemedText>

      <ThemedText style={styles.muted}>
        If your phone can’t reach the server, update{' '}
        <ThemedText type="defaultSemiBold">YOUR_LAPTOP_IP</ThemedText> in{' '}
        <ThemedText type="defaultSemiBold">mobile/serverConfig.ts</ThemedText>.
      </ThemedText>
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
});

