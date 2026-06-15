@echo off
echo Starting Aureum Backend...
echo.
cd backend
if exist "mvnw.cmd" (
    echo Backend chal raha hai: http://localhost:8080
    echo Is window ko band mat karna!
    echo.
    mvnw.cmd spring-boot:run
) else (
    echo mvnw.cmd nahi mila!
    pause
)
