docker-compose up --force-recreate --build --abort-on-container-exit --exit-code-from sandbox_minapiserver_20240601
REM keep containers started
pause
docker compose down -v
pause
