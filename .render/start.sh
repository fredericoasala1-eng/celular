#!/bin/bash
set -ex

# Start script for Render
cd backend
npm install
node index.js
