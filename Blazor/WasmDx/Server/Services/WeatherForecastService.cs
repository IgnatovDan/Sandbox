using System.Collections.Generic;
using CoreLib.WeatherForecast;
using WasmDx.Shared;

namespace WasmDx.Server.Services;

public class WeatherForecastService {
  private ForecastProvider provider = new ForecastProvider();
  public async Task<IEnumerable<SharedWeatherForecast>> GetForecastsAsync(DateOnly startDate) {
    var forecasts = await provider.GetForecastsAsync(startDate);
    return forecasts.Select(item => new SharedWeatherForecast {
        Date = item.Date,
        TemperatureC = item.TemperatureC,
        Summary = item.Summary,
        Precipitation = item.Precipitation
    });
  }
}
