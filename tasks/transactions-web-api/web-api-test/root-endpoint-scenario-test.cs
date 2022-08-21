using System.Text.Json;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

using entity_store;
using Microsoft.AspNetCore.Http;

namespace web_api_test;

public class RootEndpoint_Scenario_Tests {
  [Fact]
  public async Task Test__Post__Get() {
    void assertEntityEqual(InsertEntityDTO expected, Entity? actual) {
      Assert.NotNull(actual);
      Assert.Equal(expected.Id, actual?.Id);
      Assert.Equal(expected.OperationDate?.UtcDateTime, actual?.OperationDate);
      Assert.Equal(expected.Amount, actual?.Amount);
    };

    await using var application = new WebApplicationFactory<Program>();

    var entity1 = new InsertEntityDTO {
      Id = Guid.NewGuid(),
      OperationDate = new DateTimeOffset(2011, 1, 28, 15, 30, 00, TimeSpan.FromHours(3)),
      Amount = 11.2M
    };
    var entity2 = new InsertEntityDTO {
      Id = Guid.NewGuid(),
      OperationDate = new DateTimeOffset(2022, 1, 28, 15, 30, 00, TimeSpan.FromHours(3)),
      Amount = 22.2M
    };

    using var client = application.CreateClient();
    await client.PostAsync(QueryString.Create("insert", JsonSerializer.Serialize(entity1)).Value, null);
    await client.PostAsync(QueryString.Create("insert", JsonSerializer.Serialize(entity2)).Value, null);

    var actualEntity1 = await client.GetFromJsonAsync<Entity>(QueryString.Create("get", entity1.Id.ToString()).Value);
    var actualEntity2 = await client.GetFromJsonAsync<Entity>(QueryString.Create("get", entity2.Id.ToString()).Value);

    assertEntityEqual(entity1, actualEntity1);
    assertEntityEqual(entity2, actualEntity2);
  }
}
