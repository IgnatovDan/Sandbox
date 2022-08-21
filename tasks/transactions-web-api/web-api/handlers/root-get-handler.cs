using entity_store;

namespace handlers;

public static class RootGetHandler {
  public static IResult Handle(Guid entityId, IEntityStore entityStore) {
    //
    // Brief declares all values as query params:
    // http://127.0.0.1:5000?get=cfaa0d3f-7fea-4423-9f69-ebff826e2f89
    //
    var entity = entityStore.Query(entityId);
    if (entity == null) {
      return Results.BadRequest();
      // Or, return Results.NotFound();
    }
    return Results.Json(entity);
  }
}
