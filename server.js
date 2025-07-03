const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to capture headers and extract ngrok information
app.use((req, res, next) => {
    // Store request headers for later use
    req.ngrokHeaders = {};
    req.allHeaders = req.headers;
    
    // Extract ngrok-specific headers
    Object.keys(req.headers).forEach(key => {
        if (key.toLowerCase().includes('x-forwarded') || 
            key.toLowerCase().includes('x-real') || 
            key.toLowerCase().includes('x-original') ||
            key.toLowerCase().includes('ngrok') ||
            key.toLowerCase().includes('cf-') ||
            key.toLowerCase().includes('x-request-id')) {
            req.ngrokHeaders[key] = req.headers[key];
        }
    });
    
    // Log ngrok headers to console
    if (Object.keys(req.ngrokHeaders).length > 0) {
        console.log('\n=== NGROK HEADERS ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Path:', req.path);
        console.log('Method:', req.method);
        console.log('User-Agent:', req.headers['user-agent']);
        console.log('NGROK Headers:', JSON.stringify(req.ngrokHeaders, null, 2));
        console.log('All Headers:', JSON.stringify(req.allHeaders, null, 2));
        console.log('====================\n');
    }
    
    next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket connection handler
io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);
    
    // Send ngrok headers to client immediately on connection
    if (socket.request && socket.request.headers) {
        const ngrokHeaders = {};
        const allHeaders = socket.request.headers;
        
        Object.keys(allHeaders).forEach(key => {
            if (key.toLowerCase().includes('x-forwarded') || 
                key.toLowerCase().includes('x-real') || 
                key.toLowerCase().includes('x-original') ||
                key.toLowerCase().includes('ngrok') ||
                key.toLowerCase().includes('cf-') ||
                key.toLowerCase().includes('x-request-id')) {
                ngrokHeaders[key] = allHeaders[key];
            }
        });
        
        socket.emit('ngrok-headers', {
            ngrokSpecific: ngrokHeaders,
            allHeaders: allHeaders,
            connectionInfo: {
                remoteAddress: socket.request.connection.remoteAddress,
                remotePort: socket.request.connection.remotePort,
                userAgent: allHeaders['user-agent'],
                origin: allHeaders['origin'],
                referer: allHeaders['referer']
            }
        });
    }
    
    // Listen for user data
    socket.on('user-data', (data) => {
        console.log('\n=== USER DATA COLLECTED ===');
        console.log('Socket ID:', socket.id);
        console.log('Timestamp:', new Date().toISOString());
        console.log('User Name:', data.userName || 'Not provided');
        console.log('Data:', JSON.stringify(data, null, 2));
        console.log('===============================\n');
    });
    
    // Handle location data separately if needed
    socket.on('location-data', (data) => {
        console.log('\n=== LOCATION DATA ===');
        console.log('Socket ID:', socket.id);
        console.log('Location:', JSON.stringify(data, null, 2));
        console.log('====================\n');
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Privacy Demo Server running on port ${PORT}`);
    console.log('Open http://localhost:3000 in your browser');
    console.log('Or use ngrok to make it public: ngrok http 3000');
    console.log('\n=== NGROK HEADERS MONITORING ACTIVE ===');
    console.log('The server will log all ngrok and proxy headers when detected');
    console.log('=========================================\n');
});
