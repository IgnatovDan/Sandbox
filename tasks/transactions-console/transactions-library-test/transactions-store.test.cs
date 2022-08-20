using transactions_library;

namespace transactions_library_test;

public class TransactionsStoreTests {
  [Fact]
  public void AddAndQuery() {
    var store = new TransactionsStore();
    var transaction1 = new Transaction() { Id = 1, TransactionDate = new DateTime(2021, 01, 19), Amount = 21 };
    var transaction2 = new Transaction() { Id = 2, TransactionDate = new DateTime(2022, 02, 19), Amount = 22 };
    store.Add(transaction1);
    store.Add(transaction2);

    Assert.Equivalent(transaction1, store.Query(1));
    Assert.Equivalent(transaction2, store.Query(2));
    Assert.Null(store.Query(15));
  }

  [Fact]
  public void Add_ProtectFromModifications() {
    var store = new TransactionsStore();
    const int id = 1;
    var transactionDate = new DateTime(2021, 01, 19);
    const decimal amount = 21;
    var transaction1 = new Transaction() { Id = id, TransactionDate = transactionDate, Amount = amount };
    store.Add(transaction1);

    transaction1.Id = 2;
    transaction1.TransactionDate.AddDays(1);
    transaction1.Amount++;

    Assert.Equivalent(new Transaction() { Id = id, TransactionDate = transactionDate, Amount = amount }, store.Query(1));
  }

  [Fact]
  public void Add_Null() {
    var store = new TransactionsStore();
    Assert.Throws<ArgumentNullException>(() => store.Add(null));
  }

  [Fact]
  public void Add_DuplicatedId() {
    var store = new TransactionsStore();
    store.Add(new Transaction() { Id = 1 });
    Assert.Throws<ArgumentException>(() => store.Add(new Transaction() { Id = 1 }));
  }

  [Fact]
  public void Add_SameTransaction() {
    var store = new TransactionsStore();
    var transaction = new Transaction() { Id = 1 };
    store.Add(transaction);
    Assert.Throws<ArgumentException>(() => store.Add(transaction));
  }

  [Fact]
  public void Query_ProtectFromModifications() {
    var store = new TransactionsStore();
    const int id = 1;
    var transactionDate = new DateTime(2021, 01, 19);
    const decimal amount = 21;
    var transaction1 = new Transaction() { Id = id, TransactionDate = transactionDate, Amount = amount };
    store.Add(transaction1);

    var queriedTransaction = store.Query(1);
    queriedTransaction.Id = 2;
    queriedTransaction.TransactionDate.AddDays(1);
    queriedTransaction.Amount++;

    Assert.Equivalent(new Transaction() { Id = id, TransactionDate = transactionDate, Amount = amount }, store.Query(1));
  }

}
