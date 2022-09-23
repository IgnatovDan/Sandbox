namespace console_commands_lib;

public class ConsoleCommandsManager {
  public static readonly string Exit = "exit";

  private Dictionary<string, Action> commands = new Dictionary<string, Action>(StringComparer.InvariantCultureIgnoreCase);
  private IConsoleService console;

  public ConsoleCommandsManager(IConsoleService console) {
    this.console = console;
  }

  public void RegisterCommand(string commandName, Action callback) {
    commands.Add(commandName, callback);
  }

  public void RunCycle(int maxInfiniteLoop = 100) {
    for (int i = 0; i < maxInfiniteLoop; i++) {
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
