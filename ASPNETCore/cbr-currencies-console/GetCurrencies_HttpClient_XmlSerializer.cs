using System.Net;
using System.Net.Http.Json;
using System.Xml.Serialization;

namespace GetCurrencies_HttpClient_XmlSerializer {
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
    public static async Task Run() {
      var getCurrencies = async Task<ValCurs?> () => {
        HttpClient client = new HttpClient();
        try {
          client.DefaultRequestHeaders.Clear();

          Console.WriteLine("> async GetCurrencies");
          var resultAsString = await client.GetStringAsync("https://www.cbr.ru/scripts/XML_daily.asp");

          if (String.IsNullOrWhiteSpace(resultAsString)) {
            Console.WriteLine("< async GetCurrencies: empty string");
            return null;
          }
          else {
            XmlSerializer serializer = new XmlSerializer(typeof(ValCurs));
            using (StringReader reader = new StringReader(resultAsString)) {
              var result = serializer.Deserialize(reader) as ValCurs;
              Console.WriteLine("< async GetCurrencies: deserialized");
              return result;
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
        
        Console.WriteLine($"CBR currencies count: {currencies?.name}, {currencies?.Items.Count}, {currencies?.Date}");
        Console.WriteLine($"CBR currencies[0]: ID - {currencies?.Items[0].ID}, Name - {currencies?.Items[0].Name}");
      }
      catch (Exception e) {
        Console.WriteLine($"Error occurs: {e.Message}");
      }
    }
  }
}
