#!/usr/bin/env node
const { spawn } = require('child_process');

// Change to repo root if needed and run server.js
const path = require('path');
const repoRoot = path.resolve(__dirname, '..', '..', '..');
process.chdir(repoRoot);

const child = spawn('node', ['server.js'], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code));
