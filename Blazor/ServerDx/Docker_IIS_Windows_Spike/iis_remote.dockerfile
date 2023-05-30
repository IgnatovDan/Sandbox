# https://devblogs.microsoft.com/premier-developer/iis-remote-management-for-docker-containers/

FROM mcr.microsoft.com/windows/servercore/iis AS base

SHELL ["powershell", "-command"]

#setup Remote IIS management

RUN Install-WindowsFeature Web-Mgmt-Service; \
    New-ItemProperty -Path HKLM:\software\microsoft\WebManagement\Server -Name EnableRemoteManagement -Value 1 -Force; \
    Set-Service -Name wmsvc -StartupType automatic;

#Add user for Remote IIS Manager Login

RUN net user iisadmin Password~1234 /ADD; \
    net localgroup administrators iisadmin /add;
