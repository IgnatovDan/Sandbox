namespace GetCurrencies_HttpClient_GetStringAsync {
  internal class Main {
    public static async Task Run() {
      var getCurrencies = async () => {
        // https://stackoverflow.com/questions/32471058/windows-1252-is-not-supported-encoding-name/55434262#55434262
        // https://stackoverflow.com/questions/3967716/how-to-find-encoding-for-1251-codepage
        // dotnet add package System.Text.Encoding
        // dotnet add package System.Text.Encoding.CodePages
        System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

        HttpClient client = new HttpClient();
        try {
          client.DefaultRequestHeaders.Clear();

          var resultAsString = await client.GetStringAsync("https://www.cbr.ru/scripts/XML_daily.asp");
          // TODO: incorrect encoding for RU symbols - GetStringAsync always uses UTF-8 while server uses windows-1251
          Console.WriteLine("< async GetCurrencies");
          return resultAsString;
        }
        finally {
          client.Dispose();
        }
      };

      var currencies = await getCurrencies();
      Console.WriteLine($"CBR currencies: {currencies.Substring(0, 200)}");
      File.WriteAllText("C:\\Work\\ToDelete\\Hello\\GetStringAsync.txt", currencies.Substring(0, 300));
    }
  }
}
