using System.Globalization;

public static class ConsoleUtils {
  public static int ReadIntegerFromConsole(string caption) {
    int result = 0;
    Console.Write($"Введите {caption} (целое число): ");
    while (true) {
      string? idAsString = Console.ReadLine();
      if (idAsString == null) {
        Console.WriteLine($"Введено пустое значение. Повторите ввод {caption}.");
      }
      else {
        if (int.TryParse(idAsString, out result)) {
          // try { int.Parse } catch(ex) {} provides more info about error in ex.message, but try/throw/catch is ~10x slower
          break;
        }
        else {
          Console.WriteLine($"Невозможно сконвертировать введенную строку в целое число. Повторите ввод {caption}.");
        }
      }
    }
    return result;
  }

  public static DateTime ReadDateFromConsole(string caption) {
    DateTime result;
    Console.Write($"Введите {caption} (dd.MM.yyyy): ");
    while (true) {
      string? dateAsString = Console.ReadLine();
      if (dateAsString == null) {
        Console.WriteLine($"Введено пустое значение. Повторите ввод {caption} (dd.MM.yyyy).");
      }
      else {
        if (DateTime.TryParseExact(dateAsString, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out result)) {
          // try { DateTime.ParseExact } catch(ex) {} provides more info about error in ex.message, but try/throw/catch is ~10x slower
          break;
        }
        else {
          Console.WriteLine($"Невозможно сконвертировать введенную строку в дату. Повторите ввод {caption} (dd.MM.yyyy).");
        }
      }
    }
    return result;
  }

  public static decimal ReadDecimalFromConsole(string caption) {
    decimal result;
    Console.Write($"Введите {caption} (###0,0): ");
    while (true) {
      string? amountAsString = Console.ReadLine();
      if (amountAsString == null) {
        Console.WriteLine($"Введено пустое значение. Повторите ввод {caption} (###0,0).");
      }
      else {

        if (decimal.TryParse(amountAsString,
          NumberStyles.Number,
          new NumberFormatInfo() { NumberDecimalSeparator = ",", NumberGroupSeparator = "" },
          out result)) {
          // try { decimal.Parse } catch(ex) {} provides more info about error in ex.message, but try/throw/catch is ~10x slower
          break;
        }
        else {
          Console.WriteLine($"Невозможно сконвертировать введенную строку в число. Повторите ввод {caption} (###0,0).");
        }
      }
    }
    return result;
  }
}
