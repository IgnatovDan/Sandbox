Console.OutputEncoding = System.Text.Encoding.UTF8; // Enable UTF8 to show RU chars in console and VSCode terminal

Console.WriteLine("Welcome, Dear Customer!");
Console.WriteLine("This application allows you to calculate areas of different figures.");

CommandsManager commandsManager = new CommandsManager();
commandsManager.RegisterCommand("circle", () => { CircleAreaCommand.Invoke(); });
commandsManager.RegisterCommand("triangle", () => { TriangleAreaCommand.Invoke(); });

commandsManager.RunCycle();

Console.WriteLine("Goodbye! Nice to see you!");
