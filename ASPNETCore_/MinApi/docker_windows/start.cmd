docker-compose up --force-recreate --build
REM keep containers started
pause

docker compose down -v
REM keep containers shutdown logs
pause

docker system prune --volumes --force