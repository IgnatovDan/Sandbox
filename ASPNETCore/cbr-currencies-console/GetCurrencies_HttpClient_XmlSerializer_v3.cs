using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace GetCurrencies_HttpClient_XmlSerializer_v3 {
  /*
  <ValCurs Date="23.07.2022" name="Foreign Currency Market">
    <Valute ID="R01010">
      <NumCode>036</NumCode>
      <CharCode>AUD</CharCode>
      <Nominal>1</Nominal>
      <Name>Австралийский доллар</Name>
      <Value>39,6347</Value>
    </Valute>
  */
  [XmlRootAttribute("ValCurs")]
  public class ExchangeRates {
    [XmlAttribute]
    public string? name;
    [XmlAttribute]
    public string? Date; // TODO: parse as Date? 
    [XmlElement(typeof(Currency), ElementName = "Valute")]
    public List<Currency> Items { get; set; } = new List<Currency>();
  }

  public class Currency {
    [XmlAttribute]
    public string? ID;
    public string? Name;
    public string? NumCode;
    public string? CharCode;
    public string? Value;
  }

  internal class Main {

    private static async Task<ExchangeRates?> getCurrencies() {
      // https://stackoverflow.com/questions/32471058/windows-1252-is-not-supported-encoding-name/55434262#55434262
      // https://stackoverflow.com/questions/3967716/how-to-find-encoding-for-1251-codepage
      // dotnet add package System.Text.Encoding
      // dotnet add package System.Text.Encoding.CodePages
      System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

      HttpClient client = new HttpClient();
      try {
        client.DefaultRequestHeaders.Clear();

        // https://www.cbr.ru/development/SXML/
        var response = await client.GetAsync("https://www.cbr.ru/scripts/XML_daily.asp");
        if (response.StatusCode == HttpStatusCode.NoContent) {
          // handle 'no content' as 'empty list'
          return new ExchangeRates();
        }
        else {
          if (response.IsSuccessStatusCode) {
            var charset = response.Content.Headers.ContentType?.CharSet;
            // Or, get 'encoding' from xml internals: <?xml version=""1.0"" encoding=""UTF-8""?>
            // https://stackoverflow.com/questions/34293196/obtaining-the-xml-encoding-from-an-xml-declaration-fragment-xmldeclaration-is-n
            var encoding = (charset != null) ? Encoding.GetEncoding(charset) : Encoding.UTF8;

            var bytes = await response.Content.ReadAsByteArrayAsync();
            var str = encoding.GetString(bytes);

            //File.WriteAllText("C:\\Work\\ToDelete\\Hello\\Boo.xml", str, Encoding.UTF8);

            // Aternative approach: work with xml elements directly
            // https://alekseev74.ru/lessons/show/aspnet-core-mvc/currency-converter-example
            // using System.Xml.Linq;
            // var xmlDoc = XDocument.Load(ExchangesServiceUrl);
            // var valueUSD = Convert.ToDecimal(xmlDoc.Elements("ValCurs").Elements("Valute").FirstOrDefault(x => x.Element("NumCode").Value == "840").Elements("Value").FirstOrDefault().Value);

            XmlSerializer serializer = new XmlSerializer(typeof(ExchangeRates));
            using (StringReader reader = new StringReader(str)) {
              var result = serializer.Deserialize(reader) as ExchangeRates;
              Console.WriteLine("< async GetCurrencies: deserialized");
              return result;
            }
          }
          else {
            var message = await response.Content.ReadAsStringAsync();
            throw new Exception(message);
          }
        }
      }
      finally {
        client.Dispose();
      }
    }

    public static async Task Run() {
      try {
        var currencies = await getCurrencies();

        Console.WriteLine($"CBR exchange rates: currencies count - {currencies?.Items.Count}, rates date - {currencies?.Date}");
        Console.WriteLine($"currency[0]: ID - {currencies?.Items[0].ID}, Name - {currencies?.Items[0].Name}");
      }
      catch (Exception e) {
        Console.WriteLine($"Error occurs: {e.Message}");
      }
    }
  }
}
