@echo off
REM Create directory structure for Code4Coding project

cd /d "c:\Users\lampr\OneDrive\Documents\aa\ALL\AA leetcode\c4c"

echo Creating client directories...
mkdir client\app\lobby 2>nul
mkdir client\app\game\code-duel 2>nul
mkdir client\app\game\bug-hunter 2>nul
mkdir client\app\game\guess-output 2>nul
mkdir client\components\landing 2>nul
mkdir client\components\game 2>nul
mkdir client\components\common 2>nul
mkdir client\components\ui 2>nul
mkdir client\hooks 2>nul
mkdir client\lib 2>nul
mkdir client\store 2>nul

echo Creating server directories...
mkdir server\src\socket 2>nul
mkdir server\src\game 2>nul
mkdir server\src\types 2>nul
mkdir server\data 2>nul

echo.
echo Directory structure created successfully!
echo.
echo Directory tree:
tree /d
pause
