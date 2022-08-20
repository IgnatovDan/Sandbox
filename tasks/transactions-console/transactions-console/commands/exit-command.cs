using transactions_library;

public static class ExitCommand {
  public static readonly object Result = new object();
  public static object Invoke() {
    return Result;
  }
}
