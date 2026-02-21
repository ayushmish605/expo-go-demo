import { Platform } from 'react-native';

// IMPORTANT:
// - Your phone cannot call `localhost` (that would mean the phone itself).
// - Use your laptop's IP address on the same Wi-Fi network.
// Example: http://10.25.6.140:4000

// export const SERVER_BASE_URL =
//   Platform.OS === 'web'
//     ? 'http://localhost:4000'
//     : 'http://YOUR_LAPTOP_IP:4000';

// In my case, YOUR_LAPTOP_IP = 10.25.6.140
export const SERVER_BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:4000'
    : 'http://10.25.6.140:4000';
