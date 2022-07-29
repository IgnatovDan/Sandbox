using System.Net;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;

namespace Main {

  //
  // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-6.0#stream
  //
  public class TransparentProxyReturnResultsStream {
    public async static Task<IResult> ProcessRequest(HttpContext context) {
      using (HttpClient client = new HttpClient()) {
        client.DefaultRequestHeaders.Clear();
        using (var stream = await client.GetStreamAsync(Config.CBR_XML_daily_url)) {
          return Results.Stream(stream, "application/xml");
        }
      }
    }
  }
}
