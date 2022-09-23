namespace console_commands_lib;

public interface IConsoleService {
  void WriteLine(string? str);
  void Write(string? str);
  string? ReadLine();
}

public class ConsoleService : IConsoleService {
  public void Write(string? str) {
    Console.Write(str);
  }
  public void WriteLine(string? str) {
    Console.WriteLine(str);
  }
  public string? ReadLine() {
    return Console.ReadLine();
  }
}
