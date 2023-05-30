## Commands to create application

- Environment
  - `dotnet new editorconfig`
  - `dotnet new gitignore`
- Blazor server project
  - `dotnet new blazorwasm --hosted -o WasmDx -f net7.0`
  - `dotnet add package DevExpress.Blazor`
- Core library
  - `dotnet new classlib -o CoreLib`
  - `dotnet sln add CoreLib`
  - `dotnet add package DevExpress.Document.Processor`
  - `dotnet add server reference CoreLib`

## Commands to start application

- `Ctrl+F5`

## Details

- Xlsx
  - BlazorWasm
    - [Client/Pages/DxWorkbook.razor](Client/Pages/DxWorkbook.razor)
    - [Client/Utils/RouteUrls.cs](Client/Utils/RouteUrls.cs)
  - Server
    - [Server/Controllers/GenerateXlsxFileController.cs](Server/Controllers/GenerateXlsxFileController.cs)
    - [Server/Services/XlsxFileGeneratorService.cs](Server/Services/XlsxFileGeneratorService.cs)
  - Library
    - [CoreLib/XlsxFileGenerator.cs](CoreLib/XlsxFileGenerator.cs)
  - Links
    - [docs.devexpress: ICustomFunction Interface](https://docs.devexpress.com/OfficeFileAPI/DevExpress.Spreadsheet.Functions.ICustomFunction)
    - [docs.devexpress: Get Started - Create and Export an Excel File](https://docs.devexpress.com/OfficeFileAPI/15072/spreadsheet-document-api/getting-started)

- DxGrid
  - BlazorWasm
    - [Client/Pages/DxGridPage.razor](Client/Pages/DxGridPage.razor)
  - Server
    - [Client/Services/WeatherForecastService.cs](Server/Services/WeatherForecastService.cs)
  - Library
    - [CoreLib/WeatherForecast/ForecastProvider.cs](CoreLib/WeatherForecast/ForecastProvider.cs)
  - Links
    - [docs.devexpress: Get Started with Grid](https://docs.devexpress.com/Blazor/403625/grid/get-started-with-grid)

-DxChart
  - BlazorWasm
    - [Client/Pages/DxChartPage.razor](Client/Pages/DxChartPage.razor)
  - Server
    - [Server/Services/WeatherForecastService.cs](Server/Services/WeatherForecastService.cs)
  - Library
    - [CoreLib/WeatherForecast/ForecastProvider.cs](CoreLib/WeatherForecast/ForecastProvider.cs)
  - Links
    - [docs.devexpress: Get Started with Charts](https://docs.devexpress.com/Blazor/401769/charts/get-started-with-charts)

## See also

- [docs.devexpress: Microsoft Templates (.NET CLI)](https://docs.devexpress.com/Blazor/402564/get-started/microsoft-templates-nuget-cli)
- [learn.microsoft.com: ASP.NET Core Razor component lifecycle](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-7.0)
- [metanit: Async methods](https://metanit.com/sharp/tutorial/13.7.php)
- [metanit: Публикация на IIS](https://metanit.com/sharp/aspnet5/20.1.php)
