using System.Text.Json;

using transactions_library;

public static class GetCommand {
  public static void Invoke(TransactionsStore store) {
    Console.WriteLine("Для показа транзакции нужно ввести значение 'идентификатор транзакции (целое число)'");
    int id = ConsoleUtils.ReadIntegerFromConsole("идентификатор транзакции");
    Transaction? transaction = store.Query(id);
    if (transaction == null) {
      Console.WriteLine("Транзакция не найдена.");
    } else {
      Console.WriteLine("Найдена транзакция:" + JsonSerializer.Serialize(transaction));
    }
  }
}
