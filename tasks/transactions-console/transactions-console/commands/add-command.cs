using System.Globalization;

using transactions_library;

public static class AddCommand {
  public static void Invoke(TransactionsStore store) {
    Console.WriteLine("Для транзакции нужно ввести значения 'идентификатор транзакции (целое число)', 'дата транзакции (dd.MM.yyyy)' и 'сумма транзакции (###0,0)'");
    var transaction = new Transaction();

    transaction.Id = ConsoleUtils.ReadIntegerFromConsole("идентификатор транзакции");
    transaction.TransactionDate = ConsoleUtils.ReadDateFromConsole("дата транзакции");
    transaction.Amount = ConsoleUtils.ReadDecimalFromConsole("сумма транзакции");

    try {
      store.Add(transaction);
      Console.WriteLine("Транзакция успешно добавлена");
    }
    catch (Exception e) {
      Console.WriteLine("Транзакция не добавлена, произошла ошибка: " + e.Message);
    }
  }
}
