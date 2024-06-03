docker-compose up --force-recreate --build

REM keep containers started
pause
docker compose down -v
REM keep containers logs
pause
