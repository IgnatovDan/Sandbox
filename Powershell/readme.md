- Copy files by filter recursive in VS:
<code>powershell "Get-ChildItem -Path '$(ProjectDir)\Pages\*' -Include *.js -Recurse | Copy-Item -Destination '$(ProjectDir)\wwwroot\assets\"</code>
- Start new process from 'cmd': set RUNNER_TRACKING_ID=0 && set RUNNER_TRACKING_ID && start cmd /c "set RUNNER_TRACKING_ID && set RUNNER_TRACKING_ID=0 && set RUNNER_TRACKING_ID && set RUNNER_TRACKING_ID && ping 172.0.0.1 -n 2000" && tasklist
- Start new process from 'pws': Start-Process -FilePath start.cmd
