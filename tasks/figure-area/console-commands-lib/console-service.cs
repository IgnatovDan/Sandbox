namespace console_commands_lib;

public interface IConsoleService {
  void WriteLine(string? str);
  string? ReadLine();
}

public class ConsoleService : IConsoleService {
  public void WriteLine(string? str) {
    Console.WriteLine(str);
  }
  public string? ReadLine() {
    return Console.ReadLine();
  }
}
