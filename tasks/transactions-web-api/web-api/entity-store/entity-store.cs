// namespace transactions_library;

// public interface ITransactionsStore {
//   void Add(Transaction transaction);
//   Transaction? Query(int transactionId);
// }

// public class TransactionsStore : ITransactionsStore {
//   private Dictionary<int, Transaction> transactions = new Dictionary<int, Transaction>();
//   public TransactionsStore() {
//     this.Add(new Transaction() { Id = 1, TransactionDate = new DateTime(2022, 01, 31), Amount = 101 });
//   }
//   public void Add(Transaction transaction) {
//     if (transaction == null) {
//       throw new ArgumentNullException("transaction");
//     }
//     transactions.Add(transaction.Id, new Transaction() { Id = transaction.Id, TransactionDate = transaction.TransactionDate, Amount = transaction.Amount });
//   }
//   public Transaction? Query(int transactionId) {
//     Transaction? storedTransaction = transactions.GetValueOrDefault(transactionId);
//     return (storedTransaction == null) ?
//       null : new Transaction() { Id = storedTransaction.Id, TransactionDate = storedTransaction.TransactionDate, Amount = storedTransaction.Amount };
//   }
// }
