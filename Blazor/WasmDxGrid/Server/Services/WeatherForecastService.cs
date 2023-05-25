using System.Collections.Generic;
using WeatherForecast;
using WasmDxGrid.Shared;

public class WeatherForecastService
{
  private WeatherForecastProvider provider = new WeatherForecastProvider();
  public IEnumerable<SharedForecast> GetForecast()
  {
    return provider.GetForecast().Select(item => new SharedForecast {
        Date = item.Date,
        TemperatureC = item.TemperatureC,
        Summary = item.Summary
    });
  }
}
