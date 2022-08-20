# WebApi Transactions application

## Application:
- web-api that allows to add new transaction data (kept in memory) and to view an existing transaction by id

TODO: image

## Used technologies
c#, ASP.NET Core 6, UT, xUnit, TDD.

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

## Available Scripts:

- `dotnet run --project web-api` - to run web-api server
- `dotnet test` - to run tests

## Links
- [How to test ASP.NET Core Minimal APIs](https://www.twilio.com/blog/test-aspnetcore-minimal-apis)
