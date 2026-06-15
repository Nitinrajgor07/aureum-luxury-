@echo off
echo Starting Aureum Frontend...
echo.

if not exist "node_modules\lucide-react" (
    echo Installing missing packages...
    node node_modules/npm/bin/npm-cli.js install lucide-react motion
    echo.
)

echo Frontend chal raha hai: http://localhost:3000
echo Is window ko band mat karna!
echo.
node node_modules/vite/bin/vite.js --port 3000
