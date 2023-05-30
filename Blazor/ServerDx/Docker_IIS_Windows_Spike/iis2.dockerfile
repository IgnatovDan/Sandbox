FROM mcr.microsoft.com/windows/servercore/iis AS base

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /source

COPY . .
RUN dotnet restore
RUN dotnet publish ./ServerDx/ServerDx.csproj -c Release -o ./.artifacts

# Create final image
FROM base AS final

WORKDIR /inetpub/wwwroot/ServerDx

# SHELL ["powershell", "-command"]
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'Continue'; $verbosePreference='Continue';"]

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

#EXPOSE 81
