## Commands to create application

- Environment
  - `dotnet new gitignore`
- Blazor server project
  - `dotnet new blazorserver -o ServerInDocker -f net7.0`
- Core library
  - `dotnet new classlib -o CoreLib`
  - `dotnet add ServerInDocker reference CoreLib`
- Solution file
  - `dotnet new sln`
  - `dotnet sln add ServerInDocker CoreLib`

## Run locally

  - `Ctrl+F5`

## Run in Docker container

  - Run [\Docker\run.docker-compose.release_config.cmd](\Docker\run.docker-compose.release_config.cmd)
  - Open `http://localhost:8000/`

## Details

  - [\Docker\build.image.release_config.dockerfile](\Docker\build.image.release_config.dockerfile)
  - [\Docker\docker-compose.release_config.yml](\Docker\docker-compose.release_config.yml)

## Links

  - ASP.NET Core in Docker
    - [Host and deploy ASP.NET Core Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/?view=aspnetcore-7.0&tabs=netcore-cli)
    - [Migrating ASP.NET MVC Applications to Windows Containers](https://learn.microsoft.com/en-us/aspnet/mvc/overview/deployment/docker-aspnetmvc)
    - [Containerising a Blazor Server App](https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-server-app/)

  - ASP.NET Docker Containers
    - [Github: dotnet/dotnet-docker](https://github.com/dotnet/dotnet-docker/tree/main)
    - [Github: ASP.NET Core Docker Samples](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md)
    - [ASP.NET Core Runtime](https://hub.docker.com/_/microsoft-dotnet-aspnet)
    - [ASP.NET](https://hub.docker.com/_/microsoft-dotnet-framework-aspnet)
    - [Windows IIS](https://hub.docker.com/_/microsoft-windows-servercore-iis)
    - [Windows base OS images](https://hub.docker.com/_/microsoft-windows-base-os-images)

  - Docker
    - [Compose file build reference](https://docs.docker.com/compose/compose-file/build/)
    - [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
