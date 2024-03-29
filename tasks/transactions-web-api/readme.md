# WebApi Transactions application

## Application:
- web-api that allows to add new transaction data (kept in memory) and to view an existing transaction by id

![image](https://user-images.githubusercontent.com/2094015/185815269-6f5abf90-6a63-496a-a9a5-75581d02b1ab.png)

## Used technologies
c#, ASP.NET Core 6, UT, xUnit, TDD, minimal web api, http, xml, json, Github Actions.

This is an ASP.NET Core application, project was bootstrapped with [Create a minimal web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-6.0&tabs=visual-studio).

```
dotnet new web -o web-api
dotnet new xunit -o web-api-test
dotnet add web-api-test reference web-api
dotnet new sln
dotnet sln add web-api
dotnet sln add web-api-test
dotnet add web-api-test package Microsoft.AspNetCore.Mvc.Testing
```
[.NET default templates for dotnet new](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates#test)

## Github actions
See https://github.com/IgnatovDan/Sandbox/blob/main/.github/workflows/tasks__transactions-console__run-tests.yml

[![Run ./tasks/transactions-web-api tests](https://github.com/IgnatovDan/Sandbox/actions/workflows/tasks__transactions-web-api__run-tests.yml/badge.svg?branch=main)](https://github.com/IgnatovDan/Sandbox/actions/workflows/tasks__transactions-web-api__run-tests.yml)

## Available Scripts:

- `dotnet run --project web-api` - to run web-api server
- `dotnet test` - to run tests

## Examples for 'curl':
- `curl https://localhost:7167/hello` - gets the 'Hello' string from web-api
- `curl https://localhost:7167?insert=%7B%22id%22%3A%22cfaa0d3f-7fea-4423-9f69-ebff826e2f89%22,%22operationDate%22%3A%222019-04-02T13%3A10%3A20.0263632%2B03%3A00%22,%22amount%22%3A23.05%20%7D -X POST` - adds a new entry to the web-api store
- `curl https://localhost:7167?get=cfaa0d3f-7fea-4423-9f69-ebff826e2f89` - gets an entry data from the web-api store by 'id'

## Links
- [Unit testing C# in .NET Core](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test)
- [How to test ASP.NET Core Minimal APIs](https://www.twilio.com/blog/test-aspnetcore-minimal-apis)
- [Integration tests in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-6.0)
- [Minimal APIs overview](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-6.0)
- [Минимальные API в .NET 6](https://habr.com/ru/company/otus/blog/666676/)
- [Tutorial: Create a minimal web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-6.0&tabs=visual-studio-code)
- [Dependency injection in .NET](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection)
