REM !!! Switch Docker to 'Windows containers' mode: the 'mydockerhub/myproject:mydb-windows' image is a 'windows' image

SET COMPOSE_FILE=docker-compose.yml

docker network rm run-local-my-db-windows_default
docker login -u mydockerhub -p dckr_pat_mykeyforlocalrun
docker-compose --file %COMPOSE_FILE% up --force-recreate
docker logout