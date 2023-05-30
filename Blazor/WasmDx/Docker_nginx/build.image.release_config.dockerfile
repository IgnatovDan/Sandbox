# https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-webassembly-app/
# https://github.com/waelkdouh/DockerizedClientSideBlazor/
# TODO: set wasmdx.server as startup application

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source

COPY . .
RUN dotnet restore
RUN dotnet publish ./Server/WasmDx.Server.csproj -c Release -o ./.artifacts

FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html
COPY --from=build /source/.artifacts/wwwroot .
COPY ./Docker_nginx/nginx.conf /etc/nginx/nginx.conf
