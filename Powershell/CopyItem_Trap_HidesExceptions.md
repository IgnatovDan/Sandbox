In Powershell v5, the Copy-Item hides errors if Verbose option was passed:
```
Copy-Item -Path "$SharedDataInitialContentDirectory\*" -Destination "$SharedDataDirectory\" -Verbose -Recurse
```
so I have to force 'stop on error' manually:
```
Copy-Item -Path "$SharedDataInitialContentDirectory\*" -Destination "$SharedDataDirectory\" -Verbose -Recurse -Container -ErrorAction Stop
```
Later, I changed Powershell v5 to v7

More details at https://stackoverflow.com/questions/64916352/why-does-verbose-make-copy-item-ignore-erroractionpreference
