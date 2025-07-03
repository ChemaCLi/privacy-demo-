# Privacy and Security Demo

This project demonstrates how much data can be collected from users visiting a seemingly innocent website with funny cat GIFs.

## ⚠️ Educational Purpose Only

This demo is designed for privacy and security education. It shows how websites can collect extensive user data without explicit consent.

## What Data is Collected

The demo collects:

### 📍 Location Data (Most Important)
- GPS coordinates (latitude, longitude)
- Location accuracy
- Altitude and heading information
- Speed information

### 💻 Computer Specs
- Screen resolution and color depth
- Device memory and CPU cores
- Operating system and platform
- Browser information and version
- Hardware capabilities

### 🔍 Personal Data
- Browser language and preferences
- Timezone and locale
- Cookie information
- Local storage capabilities
- Battery level and charging status
- Connected media devices (cameras, microphones)

### 🕵️ Advanced Fingerprinting
- WebGL renderer information
- Canvas fingerprinting
- WebRTC information
- Performance metrics
- Network connection details

### 📱 Mobile Support
- Touch capabilities
- Device orientation
- Mobile-specific hardware info

## Running the Demo

1. **Start the server:**
   ```bash
   cd /Users/chema/Documents/personal/privacy-demo
   npm start
   ```

2. **Access locally:**
   - Open http://localhost:3000 in your browser
   - The server will display collected data in the console

3. **Make it public with ngrok:**
   ```bash
   # Install ngrok if you haven't already
   # brew install ngrok (on macOS)
   
   # In another terminal
   ngrok http 3000
   ```
   
   Share the ngrok URL to demonstrate data collection from remote users.

## Console Output

The server will display all collected data in JSON format in the console, including:
- User connection/disconnection events
- Comprehensive user data
- Location data (separate event)
- User interactions (clicks, scrolls)

## Files Structure

```
privacy-demo/
├── server.js          # Node.js server with WebSocket
├── package.json       # Dependencies and scripts
├── README.md          # This file
└── public/
    └── index.html     # Frontend with cat GIFs and data collection
```

## Security Considerations

This demo shows why:
- Users should be aware of what data they're sharing
- Websites should be transparent about data collection
- Location permissions should be granted carefully
- Browser fingerprinting is a real privacy concern

## Browser Permissions

The demo will request:
- Location access (most important for the demo)
- Camera/microphone enumeration (for device fingerprinting)
- Battery information (where supported)

Users can deny these permissions, but the demo will still collect significant other data.

## Notes

- The page clearly indicates it's a privacy demo
- All data collection is for educational purposes
- No data is stored permanently
- Works on both desktop and mobile browsers
- Cat GIFs are sourced from Giphy
