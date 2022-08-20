namespace transactions_library;

public delegate object? CommandCallBack();

public class CommandsManager {
  private Dictionary<string, CommandCallBack?> commands = new Dictionary<string, CommandCallBack?>(StringComparer.InvariantCultureIgnoreCase);

  public void RegisterCommand(string commandName, CommandCallBack? callback) {
    commands.Add(commandName, callback);
  }

  public bool TryRunCommand(string commandName, out object? result) {
    CommandCallBack? callback;
    if (commands.TryGetValue(commandName, out callback)) {
      result = callback?.Invoke();
      return true;
    }
    else {
      result = null;
      return false;
    }
  }
}
