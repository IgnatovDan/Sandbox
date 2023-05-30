FROM mcr.microsoft.com/windows/servercore/iis AS base

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /source

COPY . .
RUN dotnet restore
RUN dotnet publish ./ServerDx/ServerDx.csproj -c Release -o ./.artifacts

# Create final image
FROM base AS final

# SHELL ["powershell", "-command"]
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'Continue'; $verbosePreference='Continue';"]

# Install the .NET Core Hosting Bundle
# https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/?view=aspnetcore-7.0#install-the-aspnet-core-modulehosting-bundle
#ADD https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-aspnetcore-7.0.5-windows-hosting-bundle-installer "C:/setup/runtime-aspnetcore.exe"
#RUN start-process -Filepath "C:/setup/runtime-aspnetcore.exe" -ArgumentList @('/install', '/quiet', '/norestart') -Wait
#RUN Remove-Item -Force "C:/setup/runtime-aspnetcore.exe"

#RUN net stop was /y
#RUN net start w3svc


# setup Remote IIS management
# https://devblogs.microsoft.com/premier-developer/iis-remote-management-for-docker-containers/

RUN Install-WindowsFeature Web-Mgmt-Service; \
    New-ItemProperty -Path HKLM:\software\microsoft\WebManagement\Server -Name EnableRemoteManagement -Value 1 -Force; \
    Set-Service -Name wmsvc -StartupType automatic;

# Add user for Remote IIS Manager Login

RUN net user iisadmin 1234 /ADD; \
    net localgroup administrators iisadmin /add;

RUN Import-Module WebAdministration

#RUN Remove-Website -Name 'Default Web Site'

WORKDIR /inetpub/wwwroot/ServerDx
COPY --from=build /source/.artifacts .

# Create pool for application website
RUN New-WebAppPool -Name 'ServerDx-pool'; \
    Set-ItemProperty IIS:\AppPools\ServerDx-pool -Name managedRuntimeVersion -Value ''; \
    Set-ItemProperty IIS:\AppPools\ServerDx-pool -Name enable32BitAppOnWin64 -Value 0; \
    Set-ItemProperty IIS:\AppPools\ServerDx-pool -Name processModel.identityType -Value Service

# Create new Website for application
RUN New-Website -Name 'ServerDx' \
    -Port 81 -PhysicalPath 'C:\inetpub\wwwroot\ServerDx' \
    -ApplicationPool 'ServerDx-pool' -force

EXPOSE 81
