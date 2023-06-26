## Create

- `dotnet new webapp`
- `dotnet add package DevExtreme.AspNet.Data`
- `dotnet add package DevExtreme.AspNet.Core`
- `dotnet add package DevExpress.AspNetCore.Dashboard`
- `npm i devextreme devextreme-aspnet-data`
- `npm i devexpress-diagram`
- `libman init`
  - [docs.devexpress.com: Configure a non Visual Studio Project](https://docs.devexpress.com/AspNetCore/401027/devextreme-based-controls/get-started/configure-a-non-visual-studio-project)

## Build

- `dotnet restore`
- `npm i devextreme devextreme-aspnet-data`
- `dotnet tool install -g Microsoft.Web.LibraryManager.Cli`
- `libman restore`
  - [devblogs.microsoft.com: LibMan CLI Released](https://devblogs.microsoft.com/dotnet/libman-cli-released/)

## Run

- `dotnet run --project AspNetCoreDx.Server` or `Ctrl+F5` or run cmd for Docker

## Details

  - Grid
    - [demos.devexpress.com: ASPNetCore DataGrid demo](https://demos.devexpress.com/ASPNetCore/Demo/DataGrid/Overview/)
    - [demos.devexpress.com: ASPNetCore DataGrid docs](https://docs.devexpress.com/AspNetCore/400767/devextreme-based-controls/controls/data-grid)
  - Chart
    - [demos.devexpress.com: ASPNetCore Chart demo](https://demos.devexpress.com/ASPNetCore/Demo/Charts/Overview/NetCore/Light/)
    - [demos.devexpress.com: ASPNetCore Chart docs](https://docs.devexpress.com/AspNetCore/400762/devextreme-based-controls/controls/chart)
  - Spreadsheet
    - [docs.devexpress: A client-side Spreadsheet object](https://docs.devexpress.com/AspNetCore/js-DevExpress.AspNetCore.Spreadsheet.Spreadsheet?p=netframework)
    - [docs.devexpress: DxSpreadsheet has server state](https://docs.devexpress.com/AspNetCore/404049/spreadsheet/document-management) + [docs.devexpress.com: Server state](https://docs.devexpress.com/AspNetCore/404057/spreadsheet/document-management/share-a-document)
    - [demos.devexpress: Open a Byte Array demo](https://demos.devexpress.com/ASPNetCore/Demo/Spreadsheet/FromBytes/)
    - [DevExpress-Examples: how to update document content](https://github.com/DevExpress-Examples/asp-net-core-spreadsheet-update-document)
    - [github.com: Dx Spreadsheet examples](https://github.com/DevExpress-Examples?q=asp+spreadsheet&type=all&language=&sort=)
    - [supportcenter.devexpress: ASP.NET Core spreadsheet](https://supportcenter.devexpress.com/ticket/list?searchString=spreadsheet%20set%20cell%20value&sorting=Relevance)
    - [supportcenter.devexpress: no plans to add new features in 2022/2023](https://supportcenter.devexpress.com/ticket/details/t1096280/spreadsheet-for-webforms-loading-indicator-for-spreadsheet-control#3b714391-743b-4fe8-a4cf-6689d5fccfbd)
  - Dashboard
    - [docs.devexpress: Create an ASP.NET Core Dashboard Application(https://docs.devexpress.com/Dashboard/119284/get-started/build-web-dashboard-applications/create-an-aspnet-core-dashboard-application)
    - [docs.devexpress: Create a JavaScript Dashboard Application](https://docs.devexpress.com/Dashboard/119109/get-started/build-web-dashboard-applications/create-an-html-javascript-dashboard-application)
    - [docs.devexpress: Web Dashboard Technical Overview](https://docs.devexpress.com/Dashboard/119283/web-dashboard/concepts-and-terminology/web-dashboard-technical-overview#designer-and-viewer-modes)
    - [docs.devexpress: Create Dashboards in the Web Dashboard Control](https://docs.devexpress.com/Dashboard/119165/get-started/build-web-dashboard-applications/create-a-dashboard-in-the-web-dashboard-control)
    - [docs.devexpress: classes that are used for the Web Dashboard client-side](https://docs.devexpress.com/Dashboard/js-DevExpress.Dashboard)
  - Reports
    - [docs.devexpress: Add an End-User Report Designer to an ASP.NET Core Application](https://docs.devexpress.com/XtraReports/401763/web-reporting/asp-net-core-reporting/end-user-report-designer-in-asp-net-applications/quick-start/add-an-end-user-report-designer-to-an-aspnet-core-application)
    - [docs.devexpress: Add a Document Viewer to an ASP.NET Core Application](https://docs.devexpress.com/XtraReports/401762/web-reporting/asp-net-core-reporting/document-viewer-in-asp-net-applications/quick-start/add-the-document-viewer-to-an-aspnet-core-application)
    - [docs.devexpress: JS Report Designer Integration](https://docs.devexpress.com/XtraReports/401256/web-reporting/javascript-reporting/knockout/report-designer/report-designer-integration-with-npm-yarn)
    - [docs.devexpress: Add a Report Storage (ASP.NET Core)](https://docs.devexpress.com/XtraReports/400211/web-reporting/asp-net-core-reporting/end-user-report-designer-in-asp-net-applications/add-a-report-storage)
    - [supportcenter.devexpress](https://supportcenter.devexpress.com/ticket/list)
  - Diagram
    - [js.devexpress: Getting Started with Diagram](https://js.devexpress.com/Documentation/Guide/UI_Components/Diagram/Getting_Started_with_Diagram/)
    - [js.devexpress: Technical Demos: Diagram](https://js.devexpress.com/Demos/WidgetsGallery/Demo/Diagram/Overview/jQuery/Light/)

## Spreadsheet Alternatives

  - x-spreadsheet
    - https://github.com/myliang/x-spreadsheet
    - https://myliang.github.io/x-spreadsheet/
  - DHX
    - https://dhtmlx.com/docs/products/dhtmlxSpreadsheet/
    - https://snippet.dhtmlx.com/wux2b35b?tag=spreadsheet&mode=wide
  - GrapeCity
    - https://www.grapecity.com/spreadjs
    - https://www.grapecity.com/spreadjs/demos/features/calculation/custom-functions/purejs
  - https://jspreadsheets.com/

## Notes
- Don't use `\` (backslash) in paths in a connection string, it will fail in Linux environment. Use `/` instead.

## Links
- [learn.microsoft.com: Get started with ASP.NET Core MVC](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-7.0&tabs=visual-studio-code)
- [docs.devexpress.com: Configure a Visual Studio Project](https://docs.devexpress.com/AspNetCore/401026/devextreme-based-controls/get-started/configure-a-visual-studio-project)
- [docs.devexpress.com: API Controllers](https://docs.devexpress.com/AspNetCore/401020/devextreme-based-controls/concepts/bind-controls-to-data/api-controllers)
- [learn.microsoft.com: Use the LibMan CLI with ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/client-side/libman/libman-cli?view=aspnetcore-7.0)
- [learn.microsoft.com: Call an ASP.NET Core web API with JavaScript](https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-javascript?view=aspnetcore-7.0&viewFallbackFrom=aspnetcore-2.1)
- [Debugging .NET Core in Docker with VSCode](https://www.youtube.com/watch?v=ds2bud0ZYTY)
