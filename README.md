# 🐱 Privacy Demo

A demonstration application that shows how much data websites can collect from users without their explicit knowledge.

Visit it here: [https://privacy-demo.vercel.app/](https://privacy-demo.vercel.app/)

## Screenshots
![Privacy Demo Screenshot 1](/screenshots/screenshot_1.png)
![Privacy Demo Screenshot 2](/screenshots/screenshot_2.png)
![Privacy Demo Screenshot 3](/screenshots/screenshot_3.png)



## Purpose

This application serves as an educational tool to demonstrate:
- How much personal data can be collected automatically by websites
- Real-time monitoring of user interactions
- The difference between data sent to servers vs. data kept locally
- Privacy implications of modern web browsing

## Features

- **Real-time Data Collection**: Automatically collects browser, device, and interaction data
- **Visual Privacy Analysis**: Shows what data is being shared vs. kept local
- **Geolocation Tracking**: Demonstrates location data collection (with permission)
- **Fingerprinting Techniques**: Canvas and WebGL fingerprinting examples
- **Interactive Monitoring**: Real-time tracking of clicks, scrolls, and time spent

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js with Express.js
- **Deployment**: Vercel (Serverless Functions)

## Deployment to Vercel

This application has been configured for deployment to Vercel using serverless functions.

### Changes Made for Vercel Deployment

1. **Serverless Function Structure**: 
   - Created `api/index.js` as the main serverless function
   - Replaced Socket.IO with HTTP-based communication for better serverless compatibility

2. **Configuration Files**:
   - `vercel.json`: Configures routing and function settings
   - Rewrites all requests to the serverless function
   - Sets up CORS headers

3. **API Endpoints**:
   - `POST /api/user-data`: Receives user data
   - `POST /api/location-data`: Receives location data
   - `GET /api/headers`: Returns request headers for analysis

### Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new one
   - Choose settings (usually defaults work fine)
   - Deploy!

### Alternative: Deploy via Git

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

### Environment Variables

No environment variables are required for basic functionality.

## Local Development

To run locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

## Configuration Files

### `vercel.json`
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/index.js": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/api/index.js"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-Requested-With, Content-Type, Accept, Authorization"
        }
      ]
    }
  ]
}
```

### Key Configuration Explanations

- **Functions**: Configures the serverless function with a 30-second timeout
- **Rewrites**: Routes all API calls and static requests to the main function
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
