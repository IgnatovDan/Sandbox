# https://stackoverflow.com/questions/59502207/how-to-host-blazor-app-with-iis-using-docker
# https://gist.github.com/NBprojekt/2055cba6897d409076e09cff9c7f1635

FROM mcr.microsoft.com/windows/servercore/iis AS base

# SHELL ["powershell", "-command"]
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'Continue'; $verbosePreference='Continue';"]

ADD https://download.visualstudio.microsoft.com/download/pr/32b71802-0b4d-4064-a7e6-083b5155d3b1/080cf60a5c06be4ed27e2eac6c693f2f/dotnet-hosting-3.0.1-win.exe "C:/setup/dotnet-hosting-3.0.1-win.exe"
RUN start-process -Filepath "C:/setup/dotnet-hosting-3.0.1-win.exe" -ArgumentList @('/install', '/quiet', '/norestart') -Wait
RUN Remove-Item -Force "C:/setup/dotnet-hosting-3.0.1-win.exe"
#ADD https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-aspnetcore-7.0.5-windows-hosting-bundle-installer "C:/setup/dotnet-hosting.exe"
#RUN start-process -Filepath "C:/setup/dotnet-hosting.exe" -ArgumentList @('/install', '/quiet', '/norestart') -Wait
#RUN Remove-Item -Force "C:/setup/dotnet-hosting.exe"

# Use dotnet core sdk as build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /source

COPY . .
RUN dotnet restore
RUN dotnet publish ./ServerDx/ServerDx.csproj -c Release -o ./.artifacts

# Create final image
FROM base AS final
WORKDIR /inetpub/wwwroot/ServerDx

RUN Import-Module WebAdministration
RUN Remove-Website -Name 'Default Web Site'

# Create pool
RUN New-WebAppPool -Name 'ServerDx-pool'; \
    Set-ItemProperty IIS:\AppPools\ServerDx-pool -Name managedRuntimeVersion -Value ''; \
    Set-ItemProperty IIS:\AppPools\ServerDx-pool -Name enable32BitAppOnWin64 -Value 0; \
    Set-ItemProperty IIS:\AppPools\ServerDx-pool -Name processModel.identityType -Value Service

# Create new Website
RUN New-Website -Name 'ServerDx' \
    -Port 80 -PhysicalPath 'C:\inetpub\wwwroot\ServerDx' \
    -ApplicationPool 'ServerDx-pool' -force

COPY --from=build /source/.artifacts .

EXPOSE 80
