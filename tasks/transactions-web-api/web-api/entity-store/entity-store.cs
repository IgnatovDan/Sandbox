using System.Collections.Concurrent;

namespace entity_store;

public interface IEntityStore {
  bool TryAdd(Entity entity);
  Entity? Query(Guid entityId);
}

public class EntityStore : IEntityStore {
  private ConcurrentDictionary<Guid, Entity> entities = new ConcurrentDictionary<Guid, Entity>();

  public bool TryAdd(Entity entity) {
    if (entity == null) {
      throw new ArgumentNullException("entity");
    }
    return entities.TryAdd(entity.id, new Entity() { id = entity.id, operationDate = entity.operationDate, amount = entity.amount });
  }

  public Entity? Query(Guid entityId) {
    Entity? storedEntity = entities.GetValueOrDefault(entityId);
    return (storedEntity == null) ?
      null : new Entity() { id = storedEntity.id, operationDate = storedEntity.operationDate, amount = storedEntity.amount };
  }
}
