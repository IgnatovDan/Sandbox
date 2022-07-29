using System.Net;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;

namespace Main {

  //
  // Transparent proxy to https://www.cbr-xml-daily.ru/daily.xml
  // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-6.0#stream
  // Returns empty body (content-length: 0)
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
