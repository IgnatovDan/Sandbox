using System.Net;
using System.Net.Http.Json;

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

using entity_store;
using System.Text.Json;

namespace web_api_test;

public class RootEndpoint_Scenario_Tests {
  [Fact]
  public async Task Test__Post__Get() {
    await using var application = new WebApplicationFactory<Program>();

    var entity1 = new InputEntityDTO {
      Id = Guid.NewGuid(),
      OperationDate = new DateTimeOffset(2011, 1, 28, 15, 30, 00, TimeSpan.FromHours(3)),
      Amount = 11.2M
    };
    var entity2 = new InputEntityDTO {
      Id = Guid.NewGuid(),
      OperationDate = new DateTimeOffset(2022, 1, 28, 15, 30, 00, TimeSpan.FromHours(3)),
      Amount = 22.2M
    };

    using var client = application.CreateClient();
    await client.PostAsync(@"?insert=" + Uri.EscapeDataString(JsonSerializer.Serialize(entity1)), null);
    await client.PostAsync(@"?insert=" + Uri.EscapeDataString(JsonSerializer.Serialize(entity2)), null);

    var actualEntity1 = await client.GetFromJsonAsync<Entity>("/?get=" + Uri.EscapeDataString(entity1.Id.ToString()));
    var actualEntity2 = await client.GetFromJsonAsync<Entity>("/?get=" + Uri.EscapeDataString(entity2.Id.ToString()));

    void assertEntityEqual(InputEntityDTO expected, Entity? actual) {
      Assert.NotNull(actual);
      Assert.Equal(expected.Id, actual?.Id);
      Assert.Equal(expected.OperationDate?.UtcDateTime, actual?.OperationDate);
      Assert.Equal(expected.Amount, actual?.Amount);
    };

    assertEntityEqual(entity1, actualEntity1);
    assertEntityEqual(entity2, actualEntity2);
  }
}
