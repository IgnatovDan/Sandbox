# Similar scenarios are described in [ASP.NET Core Docker Samples](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /source

COPY . .
RUN dotnet restore
RUN dotnet publish ./ServerDx/ServerDx.csproj -c Release -o ./.artifacts

FROM mcr.microsoft.com/windows/servercore/iis

# SHELL ["powershell", "-command"]
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'Continue'; $verbosePreference='Continue';"]

RUN Remove-Item -Recurse C:\inetpub\wwwroot\*

COPY --from=build /source/.artifacts C:/inetpub/wwwroot
