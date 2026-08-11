@echo off
title XAMPP MySQL (Port 3307)
echo Starting XAMPP MySQL on port 3307...
echo Close this window to stop the database.
echo.
"C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini" --console
pause
