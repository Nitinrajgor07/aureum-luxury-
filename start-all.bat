@echo off
echo ============================================
echo   AUREUM LUXURY — Starting All Servers
echo ============================================
echo.

REM ── Frontend dependencies check ──
echo [1/3] Checking frontend dependencies...
if not exist "node_modules\vite" (
    echo Installing frontend packages...
    node node_modules/npm/bin/npm-cli.js install
)

REM ── lucide-react check ──
echo [2/3] Checking lucide-react...
if not exist "node_modules\lucide-react" (
    echo Installing lucide-react + motion...
    node node_modules/npm/bin/npm-cli.js install lucide-react motion
)

REM ── Start Backend ──
echo [3/3] Starting Backend on localhost:8080 ...
if exist "backend\mvnw.cmd" (
    start "Aureum Backend (8080)" cmd /k "cd backend && mvnw.cmd spring-boot:run"
) else (
    echo Backend skipped - mvnw.cmd not found
)

timeout /t 2 /nobreak >nul

REM ── Start Frontend (mingw bypass) ──
echo Starting Frontend on localhost:3000 ...
start "Aureum Frontend (3000)" cmd /k "node node_modules/vite/bin/vite.js --port 3000"

echo.
echo ============================================
echo  Frontend : http://localhost:3000
echo  Backend  : http://localhost:8080
echo ============================================
echo.
echo Dono windows ko BAND mat karna!
pause
