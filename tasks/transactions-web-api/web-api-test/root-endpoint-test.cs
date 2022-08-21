using System.Net;
using System.Text.Json;

using entity_store;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.DependencyInjection;

namespace web_api_test;

public class RootEndpoint_Post_Tests {
  [Fact]
  public async Task EmptyUrl__Returns_BadRequest() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.PostAsync("/", null);

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task InsertParam_EmptyString__Returns_BadRequest() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    // Or: 
    //var req = new HttpRequestMessage(HttpMethod.Post, "?insert=");
    // var queryParams = new Dictionary<string, string?>();
    // queryParams.Add("insert", "");
    // var req = new HttpRequestMessage(HttpMethod.Post, QueryString.Create(queryParams).Value);
    // // Or: var req = new HttpRequestMessage(HttpMethod.Post, QueryHelpers.AddQueryString("", queryParams));
    // var response = await client.SendAsync(req);

    var response = await client.PostAsync("/?insert=", null);

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task InsertParam__dummyValue__Returns_BadRequest() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.PostAsync("/?insert=dummyValue", null);

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task InsertParam__id_operationDate_amount__Returns_OK() {
    await using var application = new WebApplicationFactory<Program>()
      .WithWebHostBuilder(builder => {
        builder.ConfigureTestServices(services => {
          services.AddSingleton<IEntityStore, EntityStore>();
        });
      });

    using var client = application.CreateClient();

    var queryParams = new Dictionary<string, string>();
    var req = new HttpRequestMessage(
      HttpMethod.Post,
      @"?insert={""id"":""cfaa0d3f-7fea-4423-9f69-ebff826e2f89"",""operationDate"":""2019-04-02T13:10:20.0263632+03:00"",""amount"":23.05 }");
    var response = await client.SendAsync(req);
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);

    // check the created entry in store
    var scopeFactory = application.Server.Services.GetService<IServiceScopeFactory>();
    using var scope = scopeFactory.CreateScope();
    var store = scope.ServiceProvider.GetService<IEntityStore>();
    var entity = store.Query("cfaa0d3f-7fea-4423-9f69-ebff826e2f89");
    Assert.NotNull(entity);
    Assert.Equal("2019-04-02T13:10:20.0263632 03:00", entity.operationDate); // TODO: handle '+' in source value
    Assert.Equal(23.05M, entity.amount);
  }
}
