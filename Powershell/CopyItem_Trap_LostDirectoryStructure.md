In Powershell 5, the Copy-Item doesn't keep directories structure when called with 'Recurse' option in some circumstances:
```
Copy-Item -Path "$SharedDataInitialContentDirectory\*" -Destination "$SharedDataDirectory\" -Verbose -Recurse -Container -ErrorAction Stop
```
In my local environment, this command works correctly. But it ignores directories structure when called in azure environment.

The commands were the same:
```
>>>> Copy-Item -Path "$volume_initial_content_directory\*" -Destination "$shared_volume_directory" -Verbose -Recurse -ErrorAction Stop
>>>> Copy-Item -Path "$volume_initial_content_directory\*" -Destination "$shared_volume_directory" -Verbose -Recurse -ErrorAction Stop
```
The variable values were the same:
```
shared_volume_directory '/_SharedVolumeDirectory'
shared_volume_directory '/_SharedVolumeDirectory'

volume_initial_content_directory '_VolumeInitialContent'
volume_initial_content_directory '_VolumeInitialContent'
```
The Powershell versions were the same:
```
$PSVersionTable.PSVersion
Major  Minor  Build  Revision
5      1      17763  5820   
```
But the 'ItemsData' folder is lost:
```
Performing the operation "Copy Directory" on target "Item: C:\_initialize_code\_VolumeInitialContent\ItemsData Destination: C:\_SharedVolumeDirectory".
Performing the operation "Copy Directory" on target "Item: C:\_initialize_code\_VolumeInitialContent\ItemsData Destination: C:\_SharedVolumeDirectory\ItemsData".
```
when executing command in azure environment:
```
FROM mcr.microsoft.com/dotnet/aspnet:7.0-windowsservercore-ltsc2019
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue'; $VerbosePreference = 'Continue';"]
```
I did not found a way to correctly copy directory structure (```Get-ChildItem + Copy-Item``` keeps most folders but losts SOME! folders)

My solution was to change Powershell v5 to v7:
```
FROM mcr.microsoft.com/dotnet/sdk:7.0-windowsservercore-ltsc2019
SHELL [ "pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'Continue'; $verbosePreference='Continue'; "]
```
