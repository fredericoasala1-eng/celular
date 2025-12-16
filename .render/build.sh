#!/bin/bash
set -ex

# Build script for Render
npm install --prefix backend
npm install --prefix frontend  
npm run build --prefix frontend

echo "Build completed successfully"
