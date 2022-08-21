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

// TODO: sync property types with brief
public class Entity {
  public Guid Id { get; set; }
  public DateTime? OperationDate { get; set; }
  public decimal Amount { get; set; }
  // TODO: sync with brief:
  // public Entity() {
  //   this.Id = Guid.NewGuid();
  //   this.OperationDate = DateTime.Now;
  // }
}
