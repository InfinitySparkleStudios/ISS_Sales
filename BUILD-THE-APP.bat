@echo off
setlocal

echo ============================================
echo  Infinity Sparkle Studios - Desktop App Build
echo ============================================
echo.
echo This will download the build tools (first time only - needs internet)
echo and then build the Windows app. This can take a few minutes.
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found on this computer.
  echo Please install it first from https://nodejs.org ^(the "LTS" version^),
  echo then run this file again.
  echo.
  pause
  exit /b 1
)

echo Step 1 of 2: Installing build tools...
call npm install
if errorlevel 1 (
  echo.
  echo Something went wrong during "npm install". Scroll up to see the error,
  echo or send it to Claude to diagnose.
  pause
  exit /b 1
)

echo.
echo Step 2 of 2: Building the app...
call npm run dist
if errorlevel 1 (
  echo.
  echo Something went wrong during the build. Scroll up to see the error,
  echo or send it to Claude to diagnose.
  pause
  exit /b 1
)

echo.
echo ============================================
echo  Done! Look in the "release" folder for:
echo    - Infinity Sparkle Studios Setup *.exe   (installer - recommended)
echo    - Infinity Sparkle Studios *.exe         (portable, no install needed)
echo ============================================
pause
