@echo off
echo Starting local server for XT 3D Projects website...
echo.
echo If Python is available:
python -m http.server 8080
echo.
echo If Node.js is available:
npx http-server -p 8080
echo.
echo Otherwise, open index.html directly in your browser
pause