using transactions_library;

Console.OutputEncoding = System.Text.Encoding.UTF8; // Enable UTF8 to show RU chars in console and VSCode terminal

Console.WriteLine("Welcome, Dear Customer!");
Console.WriteLine("Here, you can add new transactions, review the entered transactions, or close console.");
Console.WriteLine("Type `add`, `get` or `exit` and press `Enter`");

TransactionsStore store = new TransactionsStore();

CommandsManager commandsManager = new CommandsManager();
commandsManager.RegisterCommand("add", () => { AddCommand.Invoke(store); return null; });
commandsManager.RegisterCommand("get", () => { GetCommand.Invoke(store); return null; });
commandsManager.RegisterCommand("exit", () => { return ExitCommand.Invoke(); });

while (true) {
  string? command = Console.ReadLine();
  object? commandResult = null;
  if (command == null || !commandsManager.TryRunCommand(command, out commandResult)) {
    Console.WriteLine("Unknown command.");
  }
  if (commandResult == ExitCommand.Result) {
    break;
  }
  Console.WriteLine("--- Type `add`, `get` or `exit` and press `Enter` ---");
}

Console.WriteLine("Goodbye! You are welcome!");
