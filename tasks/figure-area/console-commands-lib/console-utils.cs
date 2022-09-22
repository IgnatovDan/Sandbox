using System.Globalization;

namespace console_commands_lib;

public static class ConsoleUtils {
  public static void WriteDoubleToConsole(IConsoleService console, string formatString, double value) {
    NumberFormatInfo formatInfo = new NumberFormatInfo();
    formatInfo.NumberDecimalSeparator = ",";
    console.WriteLine(String.Format(formatString, value.ToString(formatInfo)));
  }
  public static double ReadDoubleFromConsole(IConsoleService console, string caption) {
    double? result = ReadDoubleFromConsole(console, caption, false);
    return result ?? 0;
  }
  public static double? ReadDoubleFromConsole(IConsoleService console, string caption, bool returnNullForEmptyString, int maxInfiniteLoop = 10) {
    double? result;
    int currentCycle = 0;
    console.WriteLine($"Введите {caption} (###0,0): ");
    while (true) {
      string? resultAsString = console.ReadLine();
      if (string.IsNullOrWhiteSpace(resultAsString)) {
        if (returnNullForEmptyString) {
          result = null;
          break;
        }
        else {
          console.WriteLine($"Введено пустое значение. Повторите ввод {caption} (###0,0).");
          if (currentCycle > maxInfiniteLoop) {
            throw new ArgumentNullException();
          }
        }
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
          if (currentCycle > maxInfiniteLoop) {
            throw;
          }
        }
      }
      currentCycle++;
    }
    return result;
  }
}
