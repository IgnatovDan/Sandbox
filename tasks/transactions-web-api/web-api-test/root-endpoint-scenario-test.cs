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

    var entity1 = new Entity() { id = Guid.NewGuid(), operationDate = "date1", amount = 11.2M };
    var entity2 = new Entity() { id = Guid.NewGuid(), operationDate = "date2", amount = 22.2M };

    using var client = application.CreateClient();
    await client.PostAsync(@"?insert=" + JsonSerializer.Serialize<Entity>(entity1), null);
    await client.PostAsync(@"?insert=" + JsonSerializer.Serialize<Entity>(entity2), null);

    var actualEntity1 = await client.GetFromJsonAsync<Entity>("/?get=" + entity1.id);
    var actualEntity2 = await client.GetFromJsonAsync<Entity>("/?get=" + entity2.id);

    void assertEntityEqual(Entity expected, Entity? actual) {
      Assert.NotNull(actual);
      Assert.Equal(expected.id, actual?.id);
      Assert.Equal(expected.operationDate, actual?.operationDate);
      Assert.Equal(expected.amount, actual?.amount);
    };

    assertEntityEqual(entity1, actualEntity1);
    assertEntityEqual(entity2, actualEntity2);
  }
}
