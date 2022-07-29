using System.Net;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;

using Microsoft.AspNetCore.Mvc;

namespace Main {

  //
  // https://stackoverflow.com/questions/42000362/creating-a-proxy-to-another-web-api-with-asp-net-core
  // https://github.com/aspnet/Proxy/blob/148a5ea41393ef9e1ac319eef61dc3593a370c92/src/Microsoft.AspNetCore.Proxy/ProxyAdvancedExtensions.cs
  //
  public class TransparentProxyReturnStreamBody {
    public async static Task<IResult> ProcessRequest(HttpContext context) {
      using (HttpClient client = new HttpClient()) {
        client.DefaultRequestHeaders.Clear();

        var requestMessage = new HttpRequestMessage();
        // foreach (var header in context.Request.Headers) {
        //   if (!requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray()) && requestMessage.Content != null) {
        //     requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
        //   }
        // }

        requestMessage.RequestUri = new Uri(Config.CBR_XML_daily_url);
        requestMessage.Method = new HttpMethod(context.Request.Method);

        using (var responseMessage = await client.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead, context.RequestAborted)) {
          context.Response.StatusCode = (int)responseMessage.StatusCode;
          foreach (var header in responseMessage.Headers) {
            context.Response.Headers[header.Key] = header.Value.ToArray();
          }

          foreach (var header in responseMessage.Content.Headers) {
            context.Response.Headers[header.Key] = header.Value.ToArray();
          }

          // SendAsync removes chunking from the response. This removes the header so it doesn't expect a chunked response.
          context.Response.Headers.Remove("transfer-encoding");

          using (var responseStream = await responseMessage.Content.ReadAsStreamAsync()) {
            await responseStream.CopyToAsync(context.Response.Body, 10000, context.RequestAborted);
          }

          return Results.Ok();
        }
      }
    }
  }
}
