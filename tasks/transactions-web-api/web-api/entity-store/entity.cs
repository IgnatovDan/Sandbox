namespace entity_store;

public class Entity {
  public Guid Id { get; set; }
  public DateTime? OperationDate { get; set; } // UTC value
  public decimal Amount { get; set; }
  public Entity() {
    this.Id = Guid.NewGuid();

    // Бриф предлагает использовать локальное время:
    // this.OperationDate = DateTime.Now;
    // Но с ним будут сложности при работе в нескольких часовых поясах.
    // Поэтому на серверной стороне я сохраняю DateTime в UTC.
    this.OperationDate = DateTime.UtcNow;
  }
}
