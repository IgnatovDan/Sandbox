- Copy files by filter recursive in VS:
<code>powershell "Get-ChildItem -Path '$(ProjectDir)\Pages\*' -Include *.js -Recurse | Copy-Item -Destination '$(ProjectDir)\wwwroot\assets\"</code>
  
