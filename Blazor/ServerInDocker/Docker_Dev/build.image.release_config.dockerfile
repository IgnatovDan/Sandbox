# Similar scenarios are described in [ASP.NET Core Docker Samples](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source

COPY . .
RUN dotnet restore
RUN dotnet publish ./ServerInDocker/ServerInDocker.csproj --self-contained false --no-restore -o ./.artifacts

# final stage/image
# [7.0](https://hub.docker.com/_/microsoft-dotnet-aspnet/?tab=description) is based on [nanoserver](https://hub.docker.com/_/microsoft-windows-nanoserver) image
# which doesn't include `gdiplus.dll`
# Use `7.0-windowsservercore-ltsc2019` image instead of `7.0`.
# [Unable to load DLL 'gdiplus.dll' when using Windows based docker images](https://github.com/dotnet/dotnet-docker/issues/1098)
# [Using the System.Drawing.Common Package in a Docker Container](https://github.com/dotnet/dotnet-docker/blob/main/documentation/scenarios/using-system-drawing-common.md)
# [Installing .NET in a Dockerfile](https://github.com/dotnet/dotnet-docker/blob/main/documentation/scenarios/installing-dotnet.md)
# FROM mcr.microsoft.com/dotnet/aspnet:7.0-windowsservercore-ltsc2019
FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /app
COPY --from=build /source/.artifacts .
ENTRYPOINT ["ServerInDocker.exe"]
