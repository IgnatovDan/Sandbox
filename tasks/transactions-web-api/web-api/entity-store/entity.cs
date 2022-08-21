namespace entity_store;

public class Entity {
  public Guid Id { get; set; }
  public DateTime OperationDate { get; set; } // UTC value
  public decimal Amount { get; set; }
  public Entity() {
    this.Id = Guid.NewGuid();

    // Бриф предлагает использовать локальное время: this.OperationDate = DateTime.Now;
    // Но с ним могут быть сложности при обработке запросов из нескольких часовых поясов.
    // Поэтому на серверной стороне я сохраняю DateTime только в UTC.
    this.OperationDate = DateTime.UtcNow;
  }
}
