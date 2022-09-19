namespace console_commands_lib;

public class ConsoleCommandsManager {
  private static readonly string Exit = "exit";
  private Dictionary<string, Action> commands = new Dictionary<string, Action>(StringComparer.InvariantCultureIgnoreCase);
  private IConsole console;

  public ConsoleCommandsManager(IConsole console) {
    this.console = console;
  }

  public void RegisterCommand(string commandName, Action callback) {
    commands.Add(commandName, callback);
  }

  public void RunCycle() {
    while (true) {
      string availableCommands = string.Join(", ", commands.Keys.Select(item => $"`{item}`"));
      console.WriteLine("");
      console.WriteLine($"--- Type {availableCommands} or `{Exit}` and press `Enter` ---");
      string? commandName = console.ReadLine();
      if (commandName == Exit) {
        break;
      }
      else {
        Action? callback;
        if (!string.IsNullOrEmpty(commandName) && commands.TryGetValue((string)commandName, out callback)) {
          try {
            callback();
          }
          catch (Exception e) {
            console.WriteLine("Error occurred: " + e.Message);
          }
        }
        else {
          console.WriteLine("Unknown command.");
        }
      }
    }
  }
}
