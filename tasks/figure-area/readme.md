# Console Transactions application

## Application:
- queries values in command line to calculate a figure area by a predefined formula and allows to register new formulas (kept in memory)

TODO:  ![image]()

## Used technologies
c#, console application, .NET Core 6, UT, TDD, Github Actions.

This is a console .NET Core application, project was bootstrapped with [Create a .NET console application using Visual Studio Code](https://docs.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio-code?pivots=dotnet-6-0).

```
dotnet new sln -o figure-area 

cd figure-area 

dotnet new classlib -o figure-area-lib 
dotnet sln add figure-area-lib

dotnet new xunit -o figure-area-lib-tests 
dotnet sln add figure-area-lib-tests
dotnet add figure-area-lib-tests reference figure-area-lib

dotnet new console -o figure-area-console
dotnet sln add figure-area-console
dotnet add figure-area-console reference figure-area-lib
```

## Github actions
TODO: 

## Available Scripts:

- `dotnet run --project figure-area-console` - to run console application
- `dotnet test` - to run tests
