# Similar scenarios are described in [ASP.NET Core Docker Samples](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source

COPY . .
RUN dotnet restore
RUN dotnet publish ./ServerInDocker/ServerInDocker.csproj --self-contained false --no-restore -o ./.artifacts

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /source/.artifacts .
ENTRYPOINT ["ServerInDocker.exe"]
