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
  public async Task Test__EmptyUrl() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.PostAsync("/", null);

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task Test__InsertParam_EmptyString() {
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
  public async Task Test__InsertParam__dummyValue() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.PostAsync("/?insert=dummyValue", null);

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task Test__InsertParam__EmptyObject() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.PostAsync("/?insert={}", null);

    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    // autogenerated entity.Id
  }

  [Fact]
  public async Task Test__InsertParam__id() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var id = Guid.NewGuid();
    var response = await client.PostAsync($"?insert={{\"id\":\"{id}\" }}", null);
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);

    // check the created entry in store
    var scopeFactory = application.Server.Services.GetService<IServiceScopeFactory>();
    using var scope = scopeFactory?.CreateScope();
    var store = scope?.ServiceProvider.GetService<IEntityStore>();
    var entity = store?.Query(id);
    Assert.NotNull(entity);
    Assert.Null(entity?.OperationDate);
    Assert.Null(entity?.Amount);
  }

  [Fact]
  public async Task Test__InsertParam__id_operationDate_amount() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.PostAsync(
      @"?insert={""id"":""cfaa0d3f-7fea-4423-9f69-ebff826e2f89"",""operationDate"":""2019-04-02T13:10:20.0263632+03:00"",""amount"":23.05 }",
      null
    );
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);

    // check the created entry in store
    var scopeFactory = application.Server.Services.GetService<IServiceScopeFactory>();
    using var scope = scopeFactory?.CreateScope();
    var store = scope?.ServiceProvider.GetService<IEntityStore>();
    var entity = store?.Query(Guid.Parse("cfaa0d3f-7fea-4423-9f69-ebff826e2f89"));
    Assert.NotNull(entity);
    Assert.Equal("2019-04-02T13:10:20.0263632 03:00", entity?.OperationDate);
    Assert.Equal(23.05M, entity?.Amount);
  }
}
