Compare two code fragments:
```
ARG VOLUME_DIRECTORY=NO_VALUE
FROM mcr.microsoft.com/dotnet/aspnet:7.0-windowsservercore-ltsc2019
```
And:
```
FROM mcr.microsoft.com/dotnet/aspnet:7.0-windowsservercore-ltsc2019
ARG VOLUME_DIRECTORY=NO_VALUE 
```
Few days ago I used the first approach to pass argument into a multi-FROM dockerfile to use the passed value at several FROM sections at once

But now I lost several hours to find why my value is lost and environment variable refers to an empty string:

1. Pipeline, starting point that defines ```VolumeDirectory: '/VolumeDirectory'```:
```
variables:
  VolumeDirectory: '/VolumeDirectory'
stages:
- stage: build_and_publish_image_stage
  jobs:
  - job: build_and_publish_image_job
    steps:
    - task: Docker@2
      displayName: 'Build image'
      inputs:
        command: 'build'
        containerRegistry: '$(HubDockerServiceConnection)'
        repository: '$(HubDockerComRepository)'
        Dockerfile: '$(PipelineDirectory)/dockerfile'
        buildContext: '$(DockerBuilderDirectory)'
        arguments: '--build-arg VOLUME_DIRECTORY=$(VolumeDirectory)'
```
2. The called Dockerfile that uses that value and passes it to a Powershell script (there is ALOT of comments to diagnose what is going on with my settings):
```
# !!!!!!!!! WARNING !!!!!!!!!
# Argument value is not passed into 'FROM' scope, declare ARG within the 'FROM' scope. IMHO it work for multi-FROM configs only.
#ARG VOLUME_DIRECTORY=NO_VALUE

FROM mcr.microsoft.com/dotnet/aspnet:7.0-windowsservercore-ltsc2019
#FROM mcr.microsoft.com/dotnet/aspnet:7.0

# Place input arguments at the first rows
ARG VOLUME_DIRECTORY=NO_VALUE

ENV VOLUME_DIRECTORY=${VOLUME_DIRECTORY}

# To archive
#ENV VD=Initial__12345
#RUN echo 1 ${VD}
##1 ${VD}
#RUN echo 2 ${VOLUME_DIRECTORY}
##2 ${VOLUME_DIRECTORY}
#RUN echo 3 $VD
##3 $VD
#RUN echo 4 %VD%
##4 Initial__12345 +++++++++++
#RUN echo 4 %VOLUME_DIRECTORY%
##4 /VolumeDirectory +++++++++++
#RUN echo 5 $env:VD
##5 $env:VD
#RUN echo 6 ${env:VD}
##6 ${env:VD}
#RUN echo ------------------------

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
#SHELL [ "pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'Continue'; $verbosePreference='Continue'; "]

# To archive
#RUN echo 1 ${VD}
##1
#RUN echo 2 ${VOLUME_DIRECTORY}
##2
#RUN echo 3 $VD
##3
#RUN echo 4 %VD%
##4
##%VD%
#RUN echo 4 %VOLUME_DIRECTORY%
##4
##%VOLUME_DIRECTORY%
#RUN echo 5 $env:VD
##5
##Initial__12345 +++++++++++
#RUN echo 5 $env:VOLUME_DIRECTORY
##5
##/VolumeDirectory +++++++++++
#RUN echo 6 ${env:VD}
##6
##Initial__12345

WORKDIR /_initialize_code
COPY . .

ENTRYPOINT ./init_volume.ps1 -volume_directory "$env:VOLUME_DIRECTORY"

# To archive
#ENTRYPOINT ["powershell", "java", "--version"]
#ENTRYPOINT ["pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
#CMD ["powershell", "c:\\RunAll.ps1 -NewConnString", "$DB_CONN_STRING"]
#ENTRYPOINT powershell c:\RunAll.ps1 -NewConnString %DB_CONN_STRING%
#ENTRYPOINT [ "powershell", "-NoProfile", "-Command", "./Start.ps1 -connectionString $env:connection_string -Verbose" ]
#ENTRYPOINT [ "powershell" ,  "/src/command.ps1",  "*.sqlproj",  "'/output'" ]
```
3. init_volume.ps1
```
param(
  [Parameter(Mandatory=$true)]
  [string]$volume_directory
)

Set-PSDebug -Trace 1
Write-Output "volume_directory $volume_directory"
```

It seems that Docker guys designed the 'multi-FROM' code as extension that is NOT ENABLED for 'single-FROM' dockerfiles so the passed value is lost without any hint.
And several hours I was searching a typo in my variable names, braces, checking powershell/pwsh/cmd/ENTRYPOINT traps and similar things ....

Now, I love compiled languages much more than yesterday :)
