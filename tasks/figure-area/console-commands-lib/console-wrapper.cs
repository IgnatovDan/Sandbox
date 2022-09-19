namespace console_commands_lib;

public interface IConsole {
  void WriteLine(string? str);
  string? ReadLine();
}

public class ConsoleWrapper : IConsole {
  public void WriteLine(string? str) {
    Console.WriteLine(str);
  }
  public string? ReadLine() {
    return Console.ReadLine();
  }
}
