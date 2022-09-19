using System.Globalization;

namespace console_commands_lib;

public static class ConsoleUtils {
  public static double ReadDoubleFromConsole(IConsoleService console, string caption) {
    double result;
    console.WriteLine($"Введите {caption} (###0,0): ");
    while (true) {
      string? resultAsString = console.ReadLine();
      if (resultAsString == null) {
        console.WriteLine($"Введено пустое значение. Повторите ввод {caption} (###0,0).");
      }
      else {
        try {
          result = double.Parse(resultAsString,
            NumberStyles.Number,
            new NumberFormatInfo() { NumberDecimalSeparator = ",", NumberGroupSeparator = "" });
          break;
        }
        catch (Exception e) {
          console.WriteLine($"Возникла ошибка при получении числа из введенной строки ({e.Message}). Повторите ввод {caption} (###0,0).");
        }
      }
    }
    return result;
  }
}
