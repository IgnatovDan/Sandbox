```
Write-Verbose "$($MyInvocation.MyCommand.Name) starting"

try {
  Write-Verbose "Trace Preinstalled Powershell SqlServer module details"
  Get-InstalledModule sqlserver
}
catch {
  Write-Verbose $_
}

#
# Use pwsh.exe instead of Powershell_v5 to handle this error:
# Invoke-Sqlcmd : A parameter cannot be found that matches parameter name 'Credential'
# https://stackoverflow.com/questions/51622424/powershell-invoke-sqlcmd-with-get-credential-doesnt-work
#
# Use '-Force' to handle this error:
# WARNING User declined to install module (SqlServer)
# Error: No match was found for the specified search criteria and module name 'SqlServer'.
# https://stackoverflow.com/questions/60661240/unable-to-install-azuread-module-using-install-module-name-azuread-in-ado-pipel
#
Write-Verbose "Install SqlServer module"
Install-Module -Name SqlServer -Force -Scope CurrentUser -AllowClobber

Write-Verbose "Trace New Powershell SqlServer module details"
Get-InstalledModule sqlserver

Write-Verbose "$($MyInvocation.MyCommand.Name) finished"
```
