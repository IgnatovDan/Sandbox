using Microsoft.AspNetCore.Mvc;

using entity_store;
using handlers;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IEntityStore, EntityStore>(); // one instance for all requests

var app = builder.Build();

app.MapGet("/hello", () => "Hello");

app.MapGet("/", (
  [FromQuery(Name = "get")] Guid entityId,
  IEntityStore entityStore
  ) => {
    return RootGetHandler.Handle(entityId, entityStore);
  }
);

app.MapPost("/", (
  [FromQuery(Name = "insert")] string entityJson,
  IEntityStore entityStore
  ) => {
    return RootPostHandler.Handle(entityJson, entityStore);
  }
);

app.Run();

public partial class Program { }
