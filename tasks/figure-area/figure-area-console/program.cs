using console_commands_lib;
using figure_area_console_commands_lib;

Console.OutputEncoding = System.Text.Encoding.UTF8; // Enable UTF8 to show RU chars in console and VSCode terminal

Console.WriteLine("Welcome, Dear Customer!");
Console.WriteLine("This application allows you to calculate areas of different figures.");

IConsoleService console = new ConsoleService();

ConsoleCommandsManager commandsManager = new ConsoleCommandsManager(console);

commandsManager.RegisterCommand("circle", () => { CircleAreaCommand.Invoke(console); });
commandsManager.RegisterCommand("triangle_height", () => { TriangleAreaBottomHeightCommand.Invoke(console); });
commandsManager.RegisterCommand("triangle_sides", () => { TriangleAreaSidesCommand.Invoke(console); });
commandsManager.RegisterCommand("polygon", () => { PolygonAreaCommand.Invoke(console); });

commandsManager.RunCycle();

Console.WriteLine("Goodbye! Nice to see you!");
