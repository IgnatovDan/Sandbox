## Commands to create application

- `dotnet new blazorwasm --hosted -o WasmDxGrid -f net7.0`
- `dotnet add package DevExpress.Blazor`

## Commands to start application

- `Ctrl+F5`

## Details

- Client
  - [Client/Pages/Index.razor](Client/Pages/Index.razor)
- Server
  - [Server/Controllers/WeatherForecastController.cs](Server/Controllers/WeatherForecastController.cs)
  - [Server/Services/WeatherForecastService.cs](Server/Services/WeatherForecastService.cs)
- Client/Server Shared
  - [Shared/SharedForecast.cs](Shared/SharedForecast.cs)
- Library
  - [WeatherForecast/WeatherForecastProvider.cs](WeatherForecast/WeatherForecastProvider.cs)
  - [WeatherForecast/WeatherForecast.cs](WeatherForecast/WeatherForecast.cs)

## See also

- [docs.devexpress: Themes](https://docs.devexpress.com/Blazor/401523/common-concepts/customize-appearance/themes)
- [docs.devexpress: Microsoft Templates (.NET CLI)](https://docs.devexpress.com/Blazor/402564/get-started/microsoft-templates-nuget-cli)
- [docs.devexpress: Get Started with Grid](https://docs.devexpress.com/Blazor/403625/grid/get-started-with-grid)
- [learn.microsoft.com: ASP.NET Core Razor component lifecycle](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-7.0)
