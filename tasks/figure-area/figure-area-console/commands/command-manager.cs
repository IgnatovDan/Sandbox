using System.Text;

public class CommandsManager {
  private static readonly string Exit = "exit";
  private Dictionary<string, Action> commands = new Dictionary<string, Action>(StringComparer.InvariantCultureIgnoreCase);

  public void RegisterCommand(string commandName, Action callback) {
    commands.Add(commandName, callback);
  }

  public void RunCycle() {
    while (true) {
      string availableCommands = string.Join(", ", commands.Keys.Select(item => $"`{item}`"));
      Console.WriteLine("");
      Console.WriteLine($"--- Type {availableCommands} or `{Exit}` and press `Enter` ---");
      string? commandName = Console.ReadLine();
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
            Console.WriteLine("Error occurred: " + e.Message);
          }
        }
        else {
          Console.WriteLine("Unknown command.");
        }
      }
    }
  }
}
