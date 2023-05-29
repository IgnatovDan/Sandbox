# Similar scenarios are described in [ASP.NET Core Docker Samples](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /source

COPY . .
RUN dotnet restore
# use '-c Release' instead (because css styles are not used in a Linux container)
# or set `<PublishRelease>true</PublishRelease>` in csproj (it is set in https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/aspnetapp/aspnetapp.csproj )
# RUN dotnet publish ./ServerDx/ServerDx.csproj --self-contained false --no-restore -o ./.artifacts
RUN dotnet publish ./ServerDx/ServerDx.csproj -c Release -o ./.artifacts

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /app
COPY --from=build /source/.artifacts .

# Additional packages for Devexpress OfficeFileAPI, https://docs.devexpress.com/OfficeFileAPI/401441/dotnet-core-support/use-office-file-api-on-linux#prerequisites
RUN apt-get update && apt-get install -y apt-transport-https
RUN apt-get install -y libc6 libicu-dev libfontconfig1

ENTRYPOINT ["dotnet", "ServerDx.dll"]
