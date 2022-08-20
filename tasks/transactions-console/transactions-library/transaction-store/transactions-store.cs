namespace transactions_library;

public class TransactionsStore {
  private Dictionary<int, Transaction> transactions = new Dictionary<int, Transaction>();
  public void Add(Transaction transaction) {
    if (transaction == null) {
      throw new ArgumentNullException("transaction");
    }
    transactions.Add(transaction.Id, new Transaction() { Id = transaction.Id, TransactionDate = transaction.TransactionDate, Amount = transaction.Amount });
  }
  public Transaction? Query(int transactionId) {
    Transaction? storedTransaction = transactions.GetValueOrDefault(transactionId);
    return (storedTransaction == null) ?
      null : new Transaction() { Id = storedTransaction.Id, TransactionDate = storedTransaction.TransactionDate, Amount = storedTransaction.Amount };
  }
}
