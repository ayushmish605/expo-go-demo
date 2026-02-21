# expo-go-demo

RUMAD x WiCS Workshop — a minimal full-stack photo uploader:

- **Mobile:** Expo (React Native) app that takes a photo and uploads it
- **Server:** Express API that receives the image and serves it back
- **Web:** Browser viewer that shows the most recent upload

## Requirements

- Laptop (Mac / Windows / Linux)
- Smartphone (iOS or Android)
- Node.js v18+ (v20+ recommended)
- Best case: phone + laptop on the **same Wi‑Fi**

Check Node version:

```bash
node -v
```

## Project structure

```
expo-go-demo/
  mobile/   ← Expo app (Expo Go)
  server/   ← Express upload API
  web/      ← Vite web viewer
```

## 1) Start the backend server

```bash
cd server
npm install
npm start
```

You should see:

```
Server running on http://localhost:4000
```

Leave this terminal running.

## 2) Start the web viewer

Open a second terminal:

```bash
cd web
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

## 3) Start the mobile app (Expo)

Open a third terminal:

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with:

- iOS: Camera app
- Android: Expo Go → Scan QR Code

## IMPORTANT: Networking (phone ↔ laptop)

Your phone cannot call `localhost` (that would mean the phone itself).

When running on a real device, update the server URL in:

- mobile/serverConfig.ts

Change:

```ts
http://YOUR_LAPTOP_IP:4000
```

to your laptop IP on the same network, e.g.:

```ts
http://192.168.1.23:4000
```

Find your laptop IP:

- macOS: `ipconfig getifaddr en0`
- Windows: `ipconfig` (look for “IPv4 Address”)

## Test the app

1. In the mobile app: tap **Take Photo**
2. Tap **Upload**
3. In the browser viewer: the latest image should appear automatically

## Common problems

### Campus Wi‑Fi blocks local networking

Try one of these (in order):

- Use your phone hotspot (connect laptop + phone to the hotspot)
- Start Expo with a tunnel: `cd mobile && npx expo start --tunnel`

### Upload fails

- Server not running
- Wrong IP in mobile/serverConfig.ts
- Firewall blocking port 4000

### Camera not opening

- Grant camera permission in Expo Go


---

## About RUMAD

Rutgers Mobile App Development (RUMAD) helps students build complete, portfolio-ready projects in teams and gain real development experience.

If you enjoyed this workshop, consider joining us!
