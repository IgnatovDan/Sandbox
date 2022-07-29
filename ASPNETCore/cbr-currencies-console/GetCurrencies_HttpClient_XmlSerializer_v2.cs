using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace GetCurrencies_HttpClient_XmlSerializer_v2 {
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
  public class ValCurs {
    [XmlAttribute]
    public string? name;
    [XmlAttribute]
    public string? Date; // TODO: parse as Date? 
    [XmlElement(typeof(Valute), ElementName = "Valute")]
    public List<Valute> Items { get; set; } = new List<Valute>();
  }

  public class Valute {
    [XmlAttribute]
    public string? ID;
    public string? Name;
  }

  internal class Main {
    private static string? readXmlEncoding(string? xmlString) {
      if (string.IsNullOrWhiteSpace(xmlString)) {
        return null;
      }

      using (var stringReader = new StringReader(xmlString)) {
        using (var xmlReader = XmlReader.Create(stringReader, new XmlReaderSettings { ConformanceLevel = ConformanceLevel.Fragment })) {
          if (!xmlReader.Read()) {
            return null;
          }

          return xmlReader.GetAttribute("encoding");
        }
      }
    }

    private static async Task<ValCurs?> getCurrencies() {
      // https://stackoverflow.com/questions/32471058/windows-1252-is-not-supported-encoding-name/55434262#55434262
      // https://stackoverflow.com/questions/3967716/how-to-find-encoding-for-1251-codepage
      // dotnet add package System.Text.Encoding
      // dotnet add package System.Text.Encoding.CodePages
      System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

      HttpClient client = new HttpClient();
      try {
        client.DefaultRequestHeaders.Clear();

        Console.WriteLine("> async GetCurrencies");
        var xmlString = await client.GetStringAsync("https://www.cbr.ru/scripts/XML_daily.asp");

        XmlSerializer serializer = new XmlSerializer(typeof(ValCurs));
        using (StringReader reader = new StringReader(xmlString)) {
          var result = serializer.Deserialize(reader) as ValCurs;
          Console.WriteLine("< async GetCurrencies: deserialized");
          return result;
        }
      }
      finally {
        client.Dispose();
      }
    }


    public static async Task Run() {
      try {
        var currencies = await getCurrencies();
        //currencies.ToList().ForEach()

        Console.WriteLine($"CBR currencies count: {currencies?.name}, {currencies?.Items.Count}, {currencies?.Date}");
        Console.WriteLine($"CBR currencies[0]: ID - {currencies?.Items[0].ID}, Name - {currencies?.Items[0].Name}");
      }
      catch (Exception e) {
        Console.WriteLine($"Error occurs: {e.Message}");
      }
    }
  }
}
