namespace entity_store;

// TODO: change to declaration from brief
// public class Entity {
//   public Guid Id { get; set; }
//   public DateTime OperationDate { get; set; }
//   public decimal Amount { get; set; }
//   public Entity() {
//     this.Id = Guid.NewGuid();
//     this.OperationDate = DateTime.Now;
//   }
// }

public class Entity {
  public string? Id { get; set; }
  public string? OperationDate { get; set; }
  public decimal? Amount { get; set; }
}

// public class Transaction {
//   public int Id { get; set; }
//   public DateTime TransactionDate { get; set; }
//   public decimal Amount { get; set; }
// }
