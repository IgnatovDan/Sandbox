
Links

- https://docs.docker.com/get-started/
- https://hub.docker.com/ \
`docker push YOUR-USER-NAME/YOUR-LOCAL-IMAGE-NAME` - uploads a local image to 'hub' storage which allows to use it everywhere
- https://labs.play-with-docker.com/ \
`docker run -dp 3000:3000 YOUR-USER-NAME/YOUR-REPOSITORY` - loads an 'hub repository' image into a 'labs' container and allows to communicate with it from everywhere

Some commands

- `docker ps` - shows a list of containers
- `docker image ls` - shows a list of images
- `docker rm confident_goldberg` - removes a container
- `docker build -t IMAGE-NAME .` - builds IMAGE-NAME image with settings from the 'Dockerfile' file in the current directory ('.')
- `docker run ubuntu ls /` - creates a new container with 'ubuntu' image, shows the root directory content and closes container
- `docker run -d ubuntu bash -c "shuf -i 1-10000 -n 1 -o /data.txt && tail -f /dev/null"` - creates a new container with 'ubuntu' image and executes 'bash' command (save random number into a file and waiting for read)
- `docker run -dp 3000:3000 image-name` - creates a new container (detached) using 'image-name' image and maps 'localhost:3000' port to container
- `docker exec 0621198d1838 cat /data.txt` - executes a cmd in a container (by id, use `docker ps` and shows result)
- `docker login -u USER-NAME` - logins to docker.com
