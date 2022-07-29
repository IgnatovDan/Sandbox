using System.Net;
using System.Net.Http.Json;

namespace GetCurrencies_HttpClient_GetFromJsonAsync {
  public class CBRCurrency {
  }
  internal class Main {
    public static async Task Run() {
      var getCurrencies = async Task<IEnumerable<CBRCurrency>> () => {
        HttpClient client = new HttpClient();
        try {
          client.DefaultRequestHeaders.Clear();
          //client.DefaultRequestHeaders.Add("Accept", "application/json");
          client.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");

          Console.WriteLine("> async GetCurrencies");
          HttpResponseMessage res = await client.GetAsync("https://www.cbr.ru/scripts/XML_daily.asp");

          if (res.StatusCode == HttpStatusCode.NoContent) {
            Console.WriteLine("< async GetCurrencies: no content");
            return new CBRCurrency[0];
          }
          else {
            if (res.IsSuccessStatusCode) {
              // TODO: cancellation token?
              var result = await res.Content.ReadFromJsonAsync<IEnumerable<CBRCurrency>>();
              if (result == null) {
                return new CBRCurrency[0];
              }
              else {
                Console.WriteLine("< async GetCurrencies");
                return result;
              }
            }
            else {
              var message = await res.Content.ReadAsStringAsync();
              throw new Exception(message);
            }
          }
        }
        finally {
          client.Dispose();
        }
      };

      try {
        var currencies = await getCurrencies();
        //currencies.ToList().ForEach()
        Console.WriteLine($"CBR currencies count: {currencies.Count()}");
      }
      catch (Exception e) {
        Console.WriteLine($"Error occurs: {e.Message}");
      }
    }
  }
}
