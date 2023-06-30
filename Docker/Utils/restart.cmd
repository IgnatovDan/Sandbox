REM Manually force memory limit to 8GB (if you have 16GB): https://learn.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig
REM c:\users\%USERNAME%\.wslconfig

REM Restart Docker system (then manually start it)
wsl --shutdown

REM https://thegeekpage.com/docker-vmmem-process-takes-too-much-memory/
REM restart-service lxssmanager
