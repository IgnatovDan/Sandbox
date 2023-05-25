## Commands to create application

- `dotnet new blazorwasm --hosted -o WasmDxXlsx -f net7.0`
- `dotnet new classlib -o XlsxGenerator`
- `dotnet add package DevExpress.Blazor`
- `dotnet add reference ../XlsxGenerator`

## Commands to start application

- `Ctrl+F5`

## Details

- Client
  - [Client/Pages/Index.razor](Client/Pages/Index.razor)
  - [Client/Utils/RouteUrls.cs](Client/Utils/RouteUrls.cs)
- Server
  - [Server/Controllers/GenerateXlsxFileController.cs](Server/Controllers/GenerateXlsxFileController.cs)
  - [Server/Services/XlsxFileGeneratorService.cs](Server/Services/XlsxFileGeneratorService.cs)
- Library
  - [XlsxGenerator/XlsxFileGenerator.cs](XlsxGenerator/XlsxFileGenerator.cs)

## See also

- [docs.devexpress: Themes](https://docs.devexpress.com/Blazor/401523/common-concepts/customize-appearance/themes)
- [docs.devexpress: Microsoft Templates (.NET CLI)](https://docs.devexpress.com/Blazor/402564/get-started/microsoft-templates-nuget-cli)
- [docs.devexpress: ICustomFunction Interface](https://docs.devexpress.com/OfficeFileAPI/DevExpress.Spreadsheet.Functions.ICustomFunction)
- [docs.devexpress: Get Started - Create and Export an Excel File](https://docs.devexpress.com/OfficeFileAPI/15072/spreadsheet-document-api/getting-started)
- [learn.microsoft.com: ASP.NET Core Razor component lifecycle](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-7.0)
