Docker is used in these projects/files:

- https://github.com/IgnatovDan/yandex-p3-russian-travel-my/blob/main/tests-testcafe/docker-compose.yml
- https://github.com/IgnatovDan/yandex-p3-russian-travel-my/blob/main/tests-testcafe/dockerfile
- https://github.com/IgnatovDan/Sandbox/blob/main/Blazor/ServerInDocker/Docker_Dev_Linux/build.image.release_config.dockerfile
- https://github.com/IgnatovDan/Sandbox/blob/main/Blazor/ServerDx/Docker_Dev_Windows/build.image.release_config.dockerfile

Links

- https://docs.docker.com/get-started/
- [Compose file build reference](https://docs.docker.com/compose/compose-file/build/)
- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- Use pair ["dockerfileXX", "dockerfileXX.dockerignore"] files in the same folder (Linux only?)
  - https://docs.docker.com/build/building/context/#filename-and-location
  - https://stackoverflow.com/questions/40904409/how-to-specify-different-dockerignore-files-for-different-builds-in-the-same-pr
- https://github.com/amitsaha/echorand.me/blob/master/content/posts/windows-docker-containers.md
- https://hub.docker.com/ \
`docker push YOUR-USER-NAME/YOUR-LOCAL-IMAGE-NAME` - uploads a local image to 'hub' storage which allows to use it everywhere
- https://labs.play-with-docker.com/ \
`docker run -dp 3000:3000 YOUR-USER-NAME/YOUR-REPOSITORY` - loads an 'hub repository' image into a 'labs' container and allows to communicate with it from everywhere

Docker files:
- `tutorial\my-dockerfile`, `chrome-in-docker\Dockerfile` - docker configuration files, https://docs.docker.com/get-started/02_our_app/
- `tutorial\docker-compose.yaml` - docker compose files, https://docs.docker.com/get-started/08_using_compose/

Some commands

- `docker ps`/`docker container ls` - shows a list of containers
- `docker image ls` - shows a list of images
- `docker rm confident_goldberg` - removes a container
- `docker build --tag test-image1 --file ./my-dockerfile ./` - builds 'test-image1' image with settings from the './my-dockerfile' file

- `docker tag getting-started YOUR-USER-NAME/getting-started` - rename 'getting-started' image

- `docker run ubuntu ls /` - creates a new container with 'ubuntu' image, shows the root directory content and closes container
- `docker run -d ubuntu bash -c "shuf -i 1-10000 -n 1 -o /data.txt && tail -f /dev/null"` - creates a new container with 'ubuntu' image and executes 'bash' command (save random number into a file and waiting for read)
- `docker run -dp 3000:3000 image-name` - creates a new container (detached) using 'image-name' image and maps 'localhost:3000' port to container
- `docker run -d --network todo-app --network-alias mysql -v todo-mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=todos mysql:5.7` - runs detached container, uses/creates network 'todo-app' with alias mysql, attaches volume 'todo-mysql-data' to '/var/lib/mysql' folder (or "$(pwd):/app") , sets 2 env vars, uses the 'mysql:5.7' image
- `docker run -dp 3000:3000 -w /app -v "%cd%:/app" node:12-alpine sh -c "yarn install && yarn run dev"`
- `docker run -dp 3000:3000 -w /app -v "%cd%:/app" --network todo-app -e MYSQL_HOST=mysql -e MYSQL_USER=root -e MYSQL_PASSWORD=secret -e MYSQL_DB=todos node:12-alpine sh -c "yarn install && yarn run dev"` - runs/creates detached container with mapped port with volume to '/app' folder, with '/app' as working directory, uses docker network 'todo-app', sets 4 env vars, uses the 'node:12-alpine' image, uses 'sh' to execute 'yarn' and run application

- `docker exec <container-id> cat /data.txt` - executes a cmd line in a container (by id, use `docker ps` and shows result)
- `docker login -u USER-NAME` - logins to docker.com
- `docker logs -f <container-id>` - shows logs from the container

- `docker network create todo-app` - creates a 'todo-app' network
- `docker network ls` - shows a list of networks

- `docker compose up -d` - runs containers from the 'docker-compose.yml'
- `docker compose down --volumes` - turns off a compose
- `docker compose logs -f` - shows a logs for a compose

Links:

- [Selenium4Grid: Create docker container and setup chrome browser node](https://www.way2automation.com/selenium4grid-create-docker-container-and-setup-chrome-browser-node/)
- [Launching Google Chrome on Docker container](https://thespecguy.medium.com/launching-google-chrome-on-docker-container-a7dc2ba2d5)
