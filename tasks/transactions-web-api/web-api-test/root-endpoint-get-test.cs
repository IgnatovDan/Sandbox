using System.Net;
using System.Net.Http.Json;

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

using entity_store;

namespace web_api_test;

public class RootEndpoint_Get_Tests {
  [Fact]
  public async Task Test__EmptyUrl() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.GetAsync("/");

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task Test__GetParam_EmptyString() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.GetAsync("/?get=");

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task Test__GetParam__NotExistId() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.GetAsync("/?get=NotExistId");

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task Test__GetParam__ById() {
    await using var application = new WebApplicationFactory<Program>();

    var scopeFactory = application.Server.Services.GetService<IServiceScopeFactory>();
    using var scope = scopeFactory?.CreateScope();
    var store = scope?.ServiceProvider.GetService<IEntityStore>();
    var entity1 = new Entity { Id = Guid.NewGuid(), OperationDate = "date1", Amount = 11.2M };
    var entity2 = new Entity { Id = Guid.NewGuid(), OperationDate = "date2", Amount = 22.2M };
    store?.TryAdd(entity1);
    store?.TryAdd(entity2);

    using var client = application.CreateClient();

    var actualEntity1 = await client.GetFromJsonAsync<Entity>("/?get=" + entity1.Id);
    var actualEntity2 = await client.GetFromJsonAsync<Entity>("/?get=" + entity2.Id);

    void assertEntityEqual(Entity expected, Entity? actual) {
      Assert.NotNull(actual);
      Assert.Equal(expected.Id, actual?.Id);
      Assert.Equal(expected.OperationDate, actual?.OperationDate);
      Assert.Equal(expected.Amount, actual?.Amount);
    };

    assertEntityEqual(entity1, actualEntity1);
    assertEntityEqual(entity2, actualEntity2);
  }
}
