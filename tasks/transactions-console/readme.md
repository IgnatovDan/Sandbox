# Console Transactions application

## Application:
- queries values in command line to add new transactions (kept in memory) and show an existing transaction by id

![image](https://user-images.githubusercontent.com/2094015/185720904-df18405f-384e-4b14-8d46-dda2b66d59be.png)

## Used technologies
c#, console application, .NET Core 6, UT, TDD, Github Actions.

This is a console .NET Core application, project was bootstrapped with [Create a .NET console application using Visual Studio Code](https://docs.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio-code?pivots=dotnet-6-0).

## Github actions
See https://github.com/IgnatovDan/Sandbox/blob/main/.github/workflows/tasks__transactions-console__run-tests.yml
[![Run tests](https://github.com/IgnatovDan/Sandbox/actions/workflows/tasks__transactions-console__run-tests.yml/badge.svg?branch=main)](https://github.com/IgnatovDan/Sandbox/actions/workflows/tasks__transactions-console__run-tests.yml)

## Available Scripts:

- `dotnet run --project transactions-console\transactions-console.csproj` - to run console application
- `dotnet test transactions-library-test\transactions-library-test.csproj` - to run tests
