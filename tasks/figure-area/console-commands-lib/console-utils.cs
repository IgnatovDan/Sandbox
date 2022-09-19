using System.Globalization;

namespace console_commands_lib;

public static class ConsoleUtils {
  public static double ReadDoubleFromConsole(string caption) {
    double result;
    Console.Write($"Введите {caption} (###0,0): ");
    while (true) {
      string? resultAsString = Console.ReadLine();
      if (resultAsString == null) {
        Console.WriteLine($"Введено пустое значение. Повторите ввод {caption} (###0,0).");
      }
      else {
        try {
          result = double.Parse(resultAsString,
            NumberStyles.Number,
            new NumberFormatInfo() { NumberDecimalSeparator = ",", NumberGroupSeparator = "" });
          break;
        }
        catch (Exception e) {
          Console.WriteLine($"Возникла ошибка при получении числа из введенной строки ({e.Message}). Повторите ввод {caption} (###0,0).");
        }
      }
    }
    return result;
  }
}
