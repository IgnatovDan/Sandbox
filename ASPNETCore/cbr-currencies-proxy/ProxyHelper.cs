// namespace Helpers {

//   // https://stackoverflow.com/questions/42000362/creating-a-proxy-to-another-web-api-with-asp-net-core
  
//   public class ProxyHelper {
//     public static HttpRequestMessage CreateProxyHttpRequestMessage(HttpContext context, Uri uri) {
//       var request = context.Request;

//       var requestMessage = new HttpRequestMessage();
//       var requestMethod = request.Method;
//       // if (!HttpMethods.IsGet(requestMethod) &&
//       //     !HttpMethods.IsHead(requestMethod) &&
//       //     !HttpMethods.IsDelete(requestMethod) &&
//       //     !HttpMethods.IsTrace(requestMethod)) {
//       //   var streamContent = new StreamContent(request.Body);
//       //   requestMessage.Content = streamContent;
//       // }
//       // Copy the request headers
//       foreach (var header in request.Headers) {
//         requestMessage.Headers.Add(header.Key, header.Value.ToArray(/* make a copy */));
//         // if (!requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray()) && requestMessage.Content != null) {
//         //   requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
//         // }
//       }

//       requestMessage.Headers.Host = uri.Authority;
//       requestMessage.RequestUri = uri;
//       requestMessage.Method = HttpMethod.Get;// new HttpMethod(request.Method);

//       return requestMessage;
//     }

//     public static async Task CopyProxyHttpResponse(this HttpContext context, HttpResponseMessage responseMessage) {
//       if (responseMessage == null) {
//         throw new ArgumentNullException(nameof(responseMessage));
//       }

//       var response = context.Response;

//       response.StatusCode = (int)responseMessage.StatusCode;
//       foreach (var header in responseMessage.Headers) {
//         response.Headers[header.Key] = header.Value.ToArray();
//       }

//       foreach (var header in responseMessage.Content.Headers) {
//         response.Headers[header.Key] = header.Value.ToArray();
//       }

//       // SendAsync removes chunking from the response. This removes the header so it doesn't expect a chunked response.
//       response.Headers.Remove("transfer-encoding");

//       using (var responseStream = await responseMessage.Content.ReadAsStreamAsync()) {
//         await responseStream.CopyToAsync(response.Body, 10000/*_streamCopyBufferSize*/, context.RequestAborted);
//       }
//     }
//   }

//   public static async Task copyAsync(HttpContext httpContext) {
//     HttpClient _client = new HttpClient();
//     var requestMessage = ProxyHelper.CreateProxyHttpRequestMessage(httpContext, new Uri("https://www.google.com"));
//     var response = await _client.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead, httpContext.RequestAborted);
//     await ProxyHelper.CopyProxyHttpResponse(httpContext, response);
//     return Ok();
//   }
// }
