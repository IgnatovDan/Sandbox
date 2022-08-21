using System.Text.Json;

using Microsoft.AspNetCore.Mvc;

using entity_store;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IEntityStore, EntityStore>(); // one instance for all requests

var app = builder.Build();

app.MapGet("/hello", () => "Hello");

app.MapPost("/", (
  [FromQuery(Name = "insert")] string insert,
  IEntityStore entityStore
  ) => {
    //
    // Brief specifies all values as query params:
    // http://127.0.0.1:5000?insert={"id":"cfaa0d3f-7fea-4423-9f69-ebff826e2f89","operationDate":"2019-04-02T13:10:20.0263632+03:00","amount":23.05 }
    // But passing JSON in 'body' looks better: app.MapPost("/", (Entity entity) => {...
    //
    if (string.IsNullOrEmpty(insert)) {
      // cannot process the request due to something that is perceived to be a client error
      throw new BadHttpRequestException("An empty 'insert' parameter was passed");
    }

    try {
      var entity = JsonSerializer.Deserialize<Entity>(insert);
      if (!entityStore.TryAdd(entity)) {
        throw new BadHttpRequestException("An item with the passed key already exists");
      }
    }
    catch(Exception e) {
      throw new BadHttpRequestException("Error occurs while adding a new entity", e);
    }

    return Results.Ok();
  }
);

app.Run();

public partial class Program { }
