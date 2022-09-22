# Console 'Calc figure area' application

## Исходное задание
Напишите на C# библиотеку для поставки внешним клиентам, которая умеет вычислять площадь круга по радиусу и треугольника по трем сторонам.
Дополнительно к работоспособности оценим:
- Юнит-тесты
- Легкость добавления других фигур
- Вычисление площади фигуры без знания типа фигуры в compile-time
- Проверку на то, является ли треугольник прямоугольным

## Описание решения
Я сделал консольное приложение `figure-area-console`

Это приложение и есть клиентское приложение, которое использует библиотеку.

Приложение взаимодействует с пользователем через консоль: 

1. выбор алгоритма расчета
1. получение данных для выбранного алгоритма (через `console.readLine()`)
1. вывод результата работы алгоритма (через `console.writeLine()`)
1. goto 1

Библиотеку я разделил на три части:

1. figure-area-lib - предоставляет функции для расчета площади различных фигур (например, `double CalcCircleArea(double radius)`)
1. console-commands-lib - предоставляет функции для взаимодействия с пользователем через консоль (например, `double ReadDoubleFromConsole(IConsoleService console, string caption)`)
1. figure-area-console-commands-lib - предоставляет функции для передачи в `ConsoleCommandsManager.RegisterCommand` (например, `CircleAreaCommand.Invoke(IConsoleService console)`). Эти функции получают данные через `ReadDoubleFromConsole`, выполняют расчет через `figure-area-lib` и выводят результат в консоль через `console.writeLine`

Подробности по решению условий задания:
1. "Юнит-тесты" - для каждой библиотеки я создал отдельный проекты с тестами в этом же солюшене, в имени проекта с тестами я добавил "tests". Запуск тестов сделан на GA: [![Run ./tasks/figure-area tests](https://github.com/IgnatovDan/Sandbox/actions/workflows/tasks__figure-area__run-tests.yml/badge.svg)](https://github.com/IgnatovDan/Sandbox/actions/workflows/tasks__figure-area__run-tests.yml)
2. "Легкость добавления других фигур": можно написать новую функцию по аналогии с `CircleAreaCommand` и зарегистрировать ее через `ConsoleCommandsManager.RegisterCommand` - функция станет доступна в интерфейсе командной строки, будет получать данные и выводить результат. Тесты для новой функции можно написать по аналогиии с тестами на `CircleAreaCommand`. Запуск всех тестовых проектов солюшена уже подключен в GA.
3. "Проверку на то, является ли треугольник прямоугольным" - TODO:
4. "Вычисление площади фигуры без знания типа фигуры в compile-time" - я сделал расчет по последовательности вершин многоугольника в `PolygonAreaCommand`

## Application:
- queries values in command line to calculate a figure area by a predefined formula and allows to register new formulas (kept in memory)

![image](https://user-images.githubusercontent.com/2094015/190881448-bc6dcf22-bb17-4b5a-84af-a3a72e9b68f5.png)

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

dotnet new classlib -o console-commands-lib
dotnet sln add console-commands-lib

dotnet new xunit -o console-commands-lib-tests
dotnet sln add console-commands-lib-tests
dotnet add console-commands-lib-tests reference console-commands-lib
cd console-commands-lib-tests
dotnet add package Moq
cd ..

dotnet new classlib -o figure-area-console-commands-lib
dotnet sln add figure-area-console-commands-lib
dotnet add figure-area-console-commands-lib reference figure-area-lib
dotnet add figure-area-console-commands-lib reference console-commands-lib

dotnet new xunit -o figure-area-console-commands-lib-tests
dotnet sln add figure-area-console-commands-lib-tests
dotnet add figure-area-console-commands-lib-tests reference figure-area-lib
dotnet add figure-area-console-commands-lib-tests reference console-commands-lib
dotnet add figure-area-console-commands-lib-tests reference figure-area-console-commands-lib
cd figure-area-console-commands-lib-tests
dotnet add package Moq
cd ..

dotnet new console -o figure-area-console
dotnet sln add figure-area-console
dotnet add figure-area-console reference figure-area-lib
dotnet add figure-area-console reference console-commands-lib
dotnet add figure-area-console reference figure-area-console-commands-lib
```

## Github actions
See https://github.com/IgnatovDan/Sandbox/blob/main/.github/workflows/tasks__figure-area__run-tests.yml

[![Run ./tasks/figure-area tests](https://github.com/IgnatovDan/Sandbox/actions/workflows/tasks__figure-area__run-tests.yml/badge.svg)](https://github.com/IgnatovDan/Sandbox/actions/workflows/tasks__figure-area__run-tests.yml)

## Available Scripts:

- `dotnet run --project figure-area-console` - to run console application
- `dotnet test` - to run tests
