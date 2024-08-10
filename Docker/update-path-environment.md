- Environment.SetEnvironmentVariable
```
$pwshFolder = Join-Path -Path $PSScriptRoot -ChildPath "pwsh"
echo "pwshFolder: $pwshFolder"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $pwshFolder, [System.EnvironmentVariableTarget]::Machine)
```
- setx - https://stackoverflow.com/questions/42092932/appending-to-path-in-a-windows-docker-container
```
# use backslash to escape quote chars
# some code removes quotes, add '\"' for "Invalid syntax. Default option is not allowed more than '2' time(s)." error, https://stackoverflow.com/questions/29190444/invalid-syntax-with-setx-for-having-more-than-two-arguments-when-there-are-onl
USER ContainerAdministrator
RUN setx /M PATH $(${Env:PATH} + \";c:/temp/pwsh\")
USER ContainerUser
```

- ENV PATH - https://github.com/PowerShell/PowerShell-Docker/issues/236
```
# "The ENV instruction is not going to work on Windows."
ENV PATH="$WindowsPATH;c:\temp\pwsh\"
```
