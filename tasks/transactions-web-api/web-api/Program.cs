using System.Text.Json;

using Microsoft.AspNetCore.Mvc;

using entity_store;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IEntityStore, EntityStore>(); // one instance for all requests

var app = builder.Build();

app.MapGet("/hello", () => "Hello");

app.MapGet("/", (
  [FromQuery(Name = "get")] Guid entityId,
  IEntityStore entityStore
  ) => {
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
);

app.MapPost("/", (
  [FromQuery(Name = "insert")] string entityJson,
  IEntityStore entityStore
  ) => {
    //
    // Brief declares all values as query params:
    // http://127.0.0.1:5000?insert={"id":"cfaa0d3f-7fea-4423-9f69-ebff826e2f89","operationDate":"2019-04-02T13:10:20.0263632+03:00","amount":23.05 }
    // Imho it's better to pass JSON in 'body': app.MapPost("/", (Entity entity) => {...
    //
    if (string.IsNullOrEmpty(entityJson)) {
      return Results.BadRequest(); // cannot process the request due to something that is perceived to be a client error
      // Or, return Results.UnprocessableEntity();
      // Or, throw new BadHttpRequestException(""); as `'insert' query param` handler does
    }

    Entity? entity = null;
    try {
      entity = JsonSerializer.Deserialize<Entity>(entityJson);
    }
    catch {
      return Results.BadRequest(); // cannot process the request due to something that is perceived to be a client error
      // Or, return Results.UnprocessableEntity();
      // Or, throw new BadHttpRequestException("");
      // Or, remove 'try/catch', exceptions are handled and InternalServerError is returned already
    }

    if (entity == null || !entityStore.TryAdd(entity)) {
      return Results.UnprocessableEntity();
      // Or, return Results.BadRequest();
      // Or, throw new BadHttpRequestException("");
    }

    return Results.Ok();
  }
);

app.Run();

public partial class Program { }
