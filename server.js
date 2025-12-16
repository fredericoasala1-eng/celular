#!/usr/bin/env node
// Fallback server entry point for Render deployment
const path = require('path');
const backendPath = path.join(__dirname, 'backend', 'index.js');

// Change to backend directory and require the server
process.chdir(path.join(__dirname, 'backend'));
require('./index.js');
