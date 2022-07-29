/*

// 'dotnet add package Microsoft.AspNet.WebApi.Client'

namespace GetCurrencies_HttpClient_ReadAsAsync {
  internal class Main {

    private static async Task<string> getCurrencies() {
      // https://stackoverflow.com/questions/32471058/windows-1252-is-not-supported-encoding-name/55434262#55434262
      // https://stackoverflow.com/questions/3967716/how-to-find-encoding-for-1251-codepage
      // dotnet add package System.Text.Encoding
      // dotnet add package System.Text.Encoding.CodePages
      System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

      HttpClient client = new HttpClient();
      try {
        client.DefaultRequestHeaders.Clear();

        var response = await client.GetAsync("https://www.cbr.ru/scripts/XML_daily.asp");

        // **********************
        // TODO: Unhandled exception. System.Xml.XmlException: The encoding in the declaration 'windows-1251' does not match the encoding of the document 'utf-8'.
        // **********************
        var resultAsString = await response.Content.ReadAsAsync<string>();

        Console.WriteLine("< async GetCurrencies");
        return resultAsString;
      }
      finally {
        client.Dispose();
      }
    }

    public static async Task Run() {
      var currencies = await getCurrencies();
      Console.WriteLine($"CBR currencies: {currencies.Substring(0, 200)}");
    }
  }
}
*/
