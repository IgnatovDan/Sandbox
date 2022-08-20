using System.Net;
using System.Text.Json;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.WebUtilities;

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
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var queryParams = new Dictionary<string, string>();
    var req = new HttpRequestMessage(
      HttpMethod.Post,
      @"?insert={""id"":""cfaa0d3f-7fea-4423-9f69-ebff826e2f89"",""operationDate"":""2019-04-02T13:10:20.0263632+03:00"",""amount"":23.05 }");
    var response = await client.SendAsync(req);
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);

    // TODO: check the created entry in store
  }

  // [Fact]
  // public async Task InsertParam__id_operationDate_amount_2__Returns_OK() {
  //   await using var application = new WebApplicationFactory<Program>();
  //   using var client = application.CreateClient();

  //   var queryParams = new Dictionary<string, string>();
  //   var req = new HttpRequestMessage(
  //     HttpMethod.Post,
  //     @"?insert={""id"":""cfaa0d3f-7fea-4423-9f69-ebff826e2f89"" }");
  //   var response = await client.SendAsync(req);
  //   var data = await response.Content.ReadAsStringAsync();
  //   Assert.Equal("", data);
  //   Assert.Equal(HttpStatusCode.OK, response.StatusCode);
  // }

  // public class Test1 {
  //   public string? id { get; set; }
  // }

  // [Fact]
  // public async Task InsertParam__id_operationDate_amount_3__Returns_OK() {
  //   await using var application = new WebApplicationFactory<Program>();
  //   using var client = application.CreateClient();

  //   var json = JsonSerializer.Serialize(new Test1() { id = "11" });
  //   var queryParams = new Dictionary<string, string>();
  //   var req = new HttpRequestMessage(
  //     HttpMethod.Post,
  //     //@"?insert={""id"":""cfaa0d3f-7fea-4423-9f69-ebff826e2f89"" }");
  //     @"?insert=a");
  //   var response = await client.SendAsync(req);
  //   //var data = await response.Content.ReadAsStringAsync();
  //   //Assert.Equal("", data);
  //   Assert.Equal(HttpStatusCode.OK, response.StatusCode);
  // }

  // readonly struct TransactionDTO {
  //   public Guid id { get; init; }
  //   public DateTime operationDate { get; init; }
  //   public decimal amount { get; init; }
  // }

  // [Fact]
  // public async Task InsertParam__id_operationDate_amount_JSON__Returns_OK() {
  //   await using var application = new WebApplicationFactory<Program>();
  //   using var client = application.CreateClient();

  //   var queryParams = new Dictionary<string, string>();
  //   queryParams.Add(
  //     "insert",
  //     JsonSerializer.Serialize(new TransactionDTO() { id = Guid.NewGuid(), operationDate = new DateTime(2021, 1, 30, 1, 30, 20, 400), amount = 23.05M }));
  //   var req = new HttpRequestMessage(HttpMethod.Post, "") { Content = new FormUrlEncodedContent(queryParams) };
  //   var response = await client.SendAsync(req);

  //   Assert.Equal(HttpStatusCode.OK, response.StatusCode);
  // }
}
