I can declare one YML file, use it in several pipelines and pass different values using azure devops pipeline variables

- At 'edit pipeline' page add 'selenium_tests_folder' variable ans specify its value: click [Variables] button, add new variable, save

- In my-pipeline.yml file configure DockerCompose@0 task: get value from pipeline variable and pass it to DockerCompose@0 task using dockerComposeFileArgs
```
    - task: DockerCompose@0
      displayName: 'Run a Docker Compose'
      inputs:
        containerregistrytype: 'Container Registry'
        dockerComposeFile: 'pathto/docker-compose.yml'
        action: 'Run a Docker Compose command'
        dockerComposeCommand: 'up --abort-on-container-exit --exit-code-from my_container_name'
        dockerComposeFileArgs: |
          selenium_tests_folder=$(selenium_tests_folder)
```

- In docker-compose.yml configure docker container options: get value from docker-compose environment and pass it to environment variables of a docker container
```
services:
  selenium_tests_linux:
    build:
      context: ./../..
      dockerfile: ./tests-selenium/docker_linux/selenium_tests/dockerfile_selenium_tests
    image: selenium_tests_linux
    container_name: selenium_tests_linux
    environment:
      selenium_tests_folder: $selenium_tests_folder
      screenshots_folder: "/screenshots_folder"
```
- In dockerfile declare an 'sh' script as ENTRYPOINT:
```
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ENTRYPOINT /bin/bash /src/test.sh
```
- In the 'sh' file get variable value from the current process environment (a process in the configured and running docker container):
```
dotnet test $selenium_tests_folder --no-build --no-restore --logger "trx;logfilename=/testresults/testresults.trx"
```
- Or, in a 'cs' file use variable value from the current process environment (a process in the configured and running docker container):
```
var screenshortsFolderPath = Environment.GetEnvironmentVariable("screenshots_folder");
```
---
OR, use pipeline variable at 'image building stage':

- In docker-compose.yml: get value from docker-compose environment and pass it as argument for a docker image builder
```
  selenium_db_linux_sqlserver:
    build:
      context: ./../../..
      dockerfile: ./path/dockerfile_mssqlserver
      args:
        selenium_tests_folder: ${selenium_tests_folder}
```
- In dockerfile: get the passed value using ARG keyword (there are 'scopes' for ARG and it should be declared after 'FROM') and use it through the '$' symbol
```
FROM mcr.microsoft.com/mssql/server:2022-preview-ubuntu-22.04

#Possible values from caller: AncientTests | ActualTests
ARG selenium_tests_folder

USER root
RUN ./run-sql-files-from-folder.sh /tests/$selenium_tests_folder
```
