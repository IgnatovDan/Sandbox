- Windows: [Installing PowerShell on Windows in DOCKERFILE](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows)

      # Powershell releases: https://github.com/PowerShell/PowerShell/releases/
      # Install Powershell: https://github.com/MicrosoftDocs/PowerShell-Docs/issues/5836
      ADD https://github.com/PowerShell/PowerShell/releases/download/v7.4.4/PowerShell-7.4.4-win-x64.zip C:\pwsh\pwsh.zip
      #RUN Unblock-File C:\pwsh\pwsh.zip
      RUN Expand-Archive C:\pwsh\pwsh.zip -DestinationPath C:\pwsh\
      SHELL ["C:\\pwsh\\pwsh.exe", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
      #TODO: PATH is not updated, see https://github.com/IgnatovDan/Sandbox/blob/main/Docker/update-path-environment.md

- Windows: Installing PowerShell v7 using Powershell v5

      New-Item -ItemType Directory -Force -Path ./pwsh
      
      # Powershell releases: https://github.com/PowerShell/PowerShell/releases/
      $pwsh_download_url = "https://github.com/PowerShell/PowerShell/releases/download/v7.4.4/PowerShell-7.4.4-win-x64.zip"
      Invoke-WebRequest -Uri $pwsh_download_url -OutFile ./pwsh/pwsh.zip
      
      #RUN Unblock-File \pwsh\pwsh.zip
      Expand-Archive ./pwsh/pwsh.zip -DestinationPath ./pwsh
      Remove-Item -Force ./pwsh/pwsh.zip
      
      $pwshFolder = Join-Path -Path $PSScriptRoot -ChildPath "pwsh"
      echo "pwshFolder: $pwshFolder"
      [Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $pwshFolder, [System.EnvironmentVariableTarget]::Machine)

- [Install PowerShell on Linux](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux)

      USER root
      RUN apt-get update && apt-get install -y powershell
      SHELL [ "pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'Continue'; $verbosePreference='Continue'; "]
