using System.Text.Json;

using entity_store;

namespace handlers;

public static class RootPostHandler {
  public static IResult Handle(string entityJson, IEntityStore entityStore) {
    //
    // Brief declares all values as query params:
    // http://127.0.0.1:5000?insert={"id":"cfaa0d3f-7fea-4423-9f69-ebff826e2f89","operationDate":"2019-04-02T13:10:20.0263632+03:00","amount":23.05 }
    // Imho it's better to pass JSON in 'body': app.MapPost("/", (Entity entity) => {...
    //

    if (string.IsNullOrEmpty(entityJson)) {
      return Results.BadRequest(); // cannot process the request due to something that is perceived to be a client error
                                   // Or, throw new BadHttpRequestException(""); as `'insert' query param` handler does
    }

    InsertEntityDTO? inputEntityDTO = null;
    try {
      inputEntityDTO = JsonSerializer.Deserialize<InsertEntityDTO>(
        entityJson,
        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
      );
    }
    catch {
      return Results.BadRequest(); // cannot process the request due to something that is perceived to be a client error
                                   // Or, throw new BadHttpRequestException("", e);
                                   // Or, remove 'try/catch', exceptions are handled and InternalServerError is returned by default
    }

    if (inputEntityDTO == null) {
      return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }

    Entity entity = inputEntityDTO.ConvertToEntity();
    if (entity == null || !entityStore.TryAdd(entity)) {
      return Results.StatusCode(StatusCodes.Status500InternalServerError);
      // Or, return Results.BadRequest();
      // Or, throw new BadHttpRequestException("");
    }

    return Results.Ok();
  }
}
