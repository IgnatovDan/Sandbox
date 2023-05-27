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
- DxXlsx
  - `dotnet add package DevExpress.Document.Processor`

## Commands to start application

- `Ctrl+F5`

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

## See also

- [docs.devexpress: Microsoft Templates (.NET CLI)](https://docs.devexpress.com/Blazor/402564/get-started/microsoft-templates-nuget-cli)
- [learn.microsoft.com: ASP.NET Core Razor component lifecycle](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-7.0)
- [metanit: Async methods](https://metanit.com/sharp/tutorial/13.7.php)
