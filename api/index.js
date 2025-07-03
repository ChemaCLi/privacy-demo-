const express = require('express');
const path = require('path');

const app = express();

// Enable JSON parsing
app.use(express.json());

// Middleware to capture headers and extract proxy information
app.use((req, res, next) => {
    // Store request headers for later use
    req.proxyHeaders = {};
    req.allHeaders = req.headers;
    
    // Extract proxy-specific headers
    Object.keys(req.headers).forEach(key => {
        if (key.toLowerCase().includes('x-forwarded') || 
            key.toLowerCase().includes('x-real') || 
            key.toLowerCase().includes('x-original') ||
            key.toLowerCase().includes('ngrok') ||
            key.toLowerCase().includes('cf-') ||
            key.toLowerCase().includes('x-request-id') ||
            key.toLowerCase().includes('x-vercel')) {
            req.proxyHeaders[key] = req.headers[key];
        }
    });
    
    // Log proxy headers to console
    if (Object.keys(req.proxyHeaders).length > 0) {
        console.log('\n=== PROXY HEADERS ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Path:', req.path);
        console.log('Method:', req.method);
        console.log('User-Agent:', req.headers['user-agent']);
        console.log('Proxy Headers:', JSON.stringify(req.proxyHeaders, null, 2));
        console.log('All Headers:', JSON.stringify(req.allHeaders, null, 2));
        console.log('====================\n');
    }
    
    next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// API endpoint to receive user data
app.post('/api/user-data', (req, res) => {
    console.log('\n=== USER DATA COLLECTED ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('User Name:', req.body.userName || 'Not provided');
    console.log('Data:', JSON.stringify(req.body, null, 2));
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('===============================\n');
    
    res.json({ 
        success: true, 
        message: 'Data received successfully',
        timestamp: new Date().toISOString()
    });
});

// API endpoint to receive location data
app.post('/api/location-data', (req, res) => {
    console.log('\n=== LOCATION DATA ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Location:', JSON.stringify(req.body, null, 2));
    console.log('====================\n');
    
    res.json({ 
        success: true, 
        message: 'Location data received successfully',
        timestamp: new Date().toISOString()
    });
});

// API endpoint to get headers info
app.get('/api/headers', (req, res) => {
    const proxyHeaders = {};
    const allHeaders = req.headers;
    
    Object.keys(allHeaders).forEach(key => {
        if (key.toLowerCase().includes('x-forwarded') || 
            key.toLowerCase().includes('x-real') || 
            key.toLowerCase().includes('x-original') ||
            key.toLowerCase().includes('ngrok') ||
            key.toLowerCase().includes('cf-') ||
            key.toLowerCase().includes('x-request-id') ||
            key.toLowerCase().includes('x-vercel')) {
            proxyHeaders[key] = allHeaders[key];
        }
    });
    
    res.json({
        proxySpecific: proxyHeaders,
        allHeaders: allHeaders,
        connectionInfo: {
            remoteAddress: req.connection?.remoteAddress || req.socket?.remoteAddress,
            userAgent: allHeaders['user-agent'],
            origin: allHeaders['origin'],
            referer: allHeaders['referer'],
            host: allHeaders['host']
        }
    });
});

// Handle 404 for other routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Export for Vercel
module.exports = app; 