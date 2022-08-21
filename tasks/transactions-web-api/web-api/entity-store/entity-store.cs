using System.Collections.Concurrent;

namespace entity_store;

public interface IEntityStore {
  bool TryAdd(Entity entity);
  Entity? Query(string entityId);  // TODO: change string to Guid
}

public class EntityStore : IEntityStore {
  private ConcurrentDictionary<string, Entity> entities = new ConcurrentDictionary<string, Entity>(); // TODO: change string to Guid

  public bool TryAdd(Entity entity) {
    if (entity == null) {
      throw new ArgumentNullException("entity");
    }
    return entities.TryAdd(entity.id, new Entity() { id = entity.id, operationDate = entity.operationDate, amount = entity.amount });
  }
  public Entity? Query(string transactionId) {
    Entity? storedEntity = entities.GetValueOrDefault(transactionId);
    return (storedEntity == null) ?
      null : new Entity() { id = storedEntity.id, operationDate = storedEntity.operationDate, amount = storedEntity.amount };
  }
}
