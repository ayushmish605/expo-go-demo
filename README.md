# expo-go-demo
RUMAD x WiCS Workshop — Build a mobile app that sends images from your phone to your laptop using Expo Go.

By the end of this workshop you will:
- run a real mobile app on your phone
- take a picture
- upload it to a local server
- see it appear instantly in a webpage

---

## Requirements
- Laptop (Mac / Windows / Linux)
- Smartphone (iOS or Android)
- **Both devices on the SAME Wi-Fi network**
- Node.js v18 or newer

Check Node version:
```bash
node -v
````

If Node is missing, install from: [https://nodejs.org](https://nodejs.org)

---

## Project Structure

```
expo-go-demo/
  mobile/   ← Expo React Native app
  server/   ← Express backend API
  web/      ← Browser viewer
```

---

## 1. Start the Backend Server

Open a terminal:

```bash
cd server
npm install
node index.js
```

You should see:

```
Server running on http://localhost:4000
```

Leave this terminal running.

---

## 2. Start the Web Viewer

Open a **second terminal**:

```bash
cd web
npm install
npm run dev
```

Then open your browser to:

```
http://localhost:5173
```

Leave this page open.

---

## 3. Start the Mobile App (Expo)

Open a **third terminal**:

```bash
cd mobile
npm install
npx expo start
```

A QR code will appear in the terminal or browser.

---

## 4. Connect Your Phone

1. Install **Expo Go** from the App Store or Google Play
2. Open Expo Go
3. Tap **Scan QR Code**
4. Scan the QR code on your computer

The starter app should now open on your phone.

---

## IMPORTANT — Networking Step

Your phone **cannot** use `localhost`.

You must use your laptop’s **local IP address**.

Find it:

### Mac / Linux

```bash
ipconfig getifaddr en0
```

### Windows

```bash
ipconfig
```

Look for:

```
IPv4 Address: 192.168.X.X
```

Now open:

`mobile/uploadImage.ts`

Change:

```ts
http://localhost:4000
```

to:

```ts
http://YOUR_IP:4000
```

Example:

```ts
http://192.168.1.23:4000
```

Then restart Expo:

* press `r` in the Expo terminal

---

## Test the App

1. Tap **Take Photo**
2. Tap **Upload**
3. Check the browser window

Your image should appear in the webpage!

---

## Common Problems

### Phone cannot connect to server

* Phone and laptop not on the same Wi-Fi
* Campus guest Wi-Fi may block local networking
* Try using your phone hotspot

### Upload fails

* Server not running
* Wrong IP address
* Firewall blocking port 4000

### Expo stuck loading

Press `r` in the Expo terminal to reload.

### Camera not opening

Grant camera permissions inside Expo Go.

---

## What You Just Built

* Mobile app (React Native)
* Camera integration
* HTTP file upload (POST request)
* Backend API server
* Live web viewer

This is a real full-stack architecture used in production systems.

---

## About RUMAD

Rutgers Mobile App Development (RUMAD) helps students build complete, portfolio-ready projects in teams and gain real development experience.

If you enjoyed this workshop, consider joining us!
