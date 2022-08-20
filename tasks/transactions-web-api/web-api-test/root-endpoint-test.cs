using Microsoft.AspNetCore.Mvc.Testing;
namespace web_api_test;

public class RootEndpoint {
  [Fact]
  public async Task TestRootEndpoint() {
    await using var application = new WebApplicationFactory<Program>();
    using var client = application.CreateClient();

    var response = await client.GetStringAsync("/");

    Assert.Equal("Hello World!", response);
  }
}
