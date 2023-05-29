# Similar scenarios are described in [ASP.NET Core Docker Samples](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /source

COPY . .
RUN dotnet restore
# use '-c Release' instead (because css styles are not used in a Linux container)
# or set `<PublishRelease>true</PublishRelease>` in csproj (it is set in https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/aspnetapp/aspnetapp.csproj )
# RUN dotnet publish ./ServerInDocker/ServerInDocker.csproj --self-contained false --no-restore -o ./.artifacts
RUN dotnet publish ./ServerInDocker/ServerInDocker.csproj -c Release -o ./.artifacts

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /app
COPY --from=build /source/.artifacts .
ENTRYPOINT ["dotnet", "ServerInDocker.dll"]
