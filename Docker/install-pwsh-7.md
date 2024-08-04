- [Installing PowerShell on Windows](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows)

      # Powershell releases: https://github.com/PowerShell/PowerShell/releases/
      # Install Powershell: https://github.com/MicrosoftDocs/PowerShell-Docs/issues/5836
      ADD https://github.com/PowerShell/PowerShell/releases/download/v7.4.4/PowerShell-7.4.4-win-x64.zip C:\pwsh\pwsh.zip
      #RUN Unblock-File C:\pwsh\pwsh.zip
      RUN Expand-Archive C:\pwsh\pwsh.zip -DestinationPath C:\pwsh\
      SHELL ["C:\\pwsh\\pwsh.exe", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

- [Install PowerShell on Linux](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux)

      USER root
      RUN apt-get update && apt-get install -y powershell
      SHELL [ "pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'Continue'; $verbosePreference='Continue'; "]
