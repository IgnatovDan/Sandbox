## Commands to create application

- Environment
  - `dotnet new editorconfig`
  - `dotnet new gitignore`
- Blazor server project
  - `dotnet new blazorserver -o ServerDx -f net7.0`
  - `dotnet add package DevExpress.Blazor`
- Core library
  - `dotnet new classlib -o CoreLib`
  - `dotnet add reference ../CoreLib`
- DxXlsx (add `NuGet.config` at root folder)
  - `dotnet add package DevExpress.Document.Processor`

## Run locally

  - `Ctrl+F5` or `dotnet run --project ServerDx`

## Run in Docker container

  - Run [\Docker\run.docker-compose.release_config.cmd](\Docker\run.docker-compose.release_config.cmd)
  - Open `http://localhost:8000/`

## Details

- Xlsx
  - BlazorServer
    - [ServerDx/Pages/DxWorkbook.razor](ServerDx/Pages/DxWorkbook.razor)
    - [ServerDx/Utils/RouteUrls.cs](ServerDx/Utils/RouteUrls.cs)
  - Server
    - [ServerDx/Controllers/GenerateXlsxFileController.cs](ServerDx/Controllers/GenerateXlsxFileController.cs)
    - [ServerDx/Services/XlsxFileGeneratorService.cs](ServerDx/Services/XlsxFileGeneratorService.cs)
  - Library
    - [CoreLib/XlsxFileGenerator.cs](CoreLib/XlsxFileGenerator.cs)
  - Notes
    - [mcr.microsoft.com/dotnet/sdk](https://hub.docker.com/_/microsoft-dotnet-sdk) is based on [nanoserver](https://hub.docker.com/_/microsoft-windows-nanoserver) image which doesn't include `gdiplus.dll` while Devexpress.Spreadsheet.Processor requires it to generate XLSX files. This is why I cannot use [mcr.microsoft.com/dotnet/sdk](https://hub.docker.com/_/microsoft-dotnet-sdk). (Unable to load DLL 'gdiplus.dll' when using Windows based docker images)[https://github.com/dotnet/dotnet-docker/issues/1098]
  - Links
    - [docs.devexpress: ICustomFunction Interface](https://docs.devexpress.com/OfficeFileAPI/DevExpress.Spreadsheet.Functions.ICustomFunction)
    - [docs.devexpress: Get Started - Create and Export an Excel File](https://docs.devexpress.com/OfficeFileAPI/15072/spreadsheet-document-api/getting-started)

- DxGrid
  - BlazorServer
    - [ServerDx/Pages/DxGridPage.razor](ServerDx/Pages/DxGridPage.razor)
  - Server
    - [ServerDx/Services/WeatherForecastService.cs](ServerDx/Services/WeatherForecastService.cs)
  - Library
    - [CoreLib/WeatherForecast/ForecastProvider.cs](CoreLib/WeatherForecast/ForecastProvider.cs)
  - Links
    - [docs.devexpress: Get Started with Grid](https://docs.devexpress.com/Blazor/403625/grid/get-started-with-grid)

-DxChart
  - BlazorServer
    - [ServerDx/Pages/DxChartPage.razor](ServerDx/Pages/DxChartPage.razor)
  - Server
    - [ServerDx/Services/WeatherForecastService.cs](ServerDx/Services/WeatherForecastService.cs)
  - Library
    - [CoreLib/WeatherForecast/ForecastProvider.cs](CoreLib/WeatherForecast/ForecastProvider.cs)
  - Links
    - [docs.devexpress: Get Started with Charts](https://docs.devexpress.com/Blazor/401769/charts/get-started-with-charts)

- Docker
  - [Docker_Dev_Linux\build.image.release_config.dockerfile](Docker_Dev_Linux\build.image.release_config.dockerfile)
  - [Docker_Dev_Windows\build.image.release_config.dockerfile](Docker_Dev_Windows\build.image.release_config.dockerfile)
  - Links: https://github.com/IgnatovDan/Sandbox/tree/main/Blazor/ServerInDocker#links

## See also

- [docs.devexpress: Microsoft Templates (.NET CLI)](https://docs.devexpress.com/Blazor/402564/get-started/microsoft-templates-nuget-cli)
- [learn.microsoft.com: ASP.NET Core Razor component lifecycle](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-7.0)
- [metanit: Async methods](https://metanit.com/sharp/tutorial/13.7.php)
