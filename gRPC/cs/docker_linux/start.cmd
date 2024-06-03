docker-compose up --force-recreate --build
REM docker-compose up --force-recreate --build --exit-code-from grpc_server_sandbox_20240601
REM docker-compose up --force-recreate --build --abort-on-container-exit --exit-code-from grpc_server_sandbox_20240601
REM keep containers started
pause

docker compose down -v
REM keep containers shutdown logs
pause

docker system prune --volumes --force