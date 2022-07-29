using System.Net;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;

namespace TransparentProxyReturnParsedString {

  //
  // Transparent proxy to https://www.cbr-xml-daily.ru/daily.xml
  // Returns full string, but encoding is changed: "utf-8" is used and differs from XML data "<?xml version="1.0" encoding="windows-1251"?>"
  //
  public class Main {
    public async static Task<string> ProcessRequest(HttpContext context) {
      using (HttpClient client = new HttpClient()) {
        client.DefaultRequestHeaders.Clear();
        // foreach (var requestHeader in context.Request.Headers) {
        //   client.DefaultRequestHeaders.Add(requestHeader.Key, requestHeader.Value.ToString());
        // }
        using (var response = await client.GetAsync(Config.Main.CBR_XML_daily_url)) {
          if (response.IsSuccessStatusCode) {
            var bytes = await response.Content.ReadAsByteArrayAsync();

            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var charset = response.Content.Headers.ContentType?.CharSet;
            var encoding = (charset != null) ? Encoding.GetEncoding(charset) : Encoding.UTF8;

            //context.Response.Headers.ContentType = response.Content.Headers.ContentType;

            // await ms.CopyToAsync(httpContext.Response.Body); - https://andrewlock.net/returning-xml-from-minimal-apis-in-dotnet-6/
            var str = encoding.GetString(bytes);
            //response.Headers.ContentType = "text/plain; charset=utf-8";

            context.Response.Headers.ContentEncoding = response.Content.Headers.ContentType?.CharSet;
            //System.Net.Mime.MediaTypeNames.Application.Xml;
            var contentType = new MediaTypeHeaderValue(MediaTypeNames.Application.Xml) {
              CharSet = "utf-8" // string is returned and default string serializator will use "utf-8"
            };
            context.Response.Headers.ContentType = contentType.ToString(); //"application/xml; charset=windows-1251";

            return str;
          }
          else {
            var message = await response.Content.ReadAsStringAsync();
            throw new Exception(message);
          }
        }
      }
    }
  }
}
