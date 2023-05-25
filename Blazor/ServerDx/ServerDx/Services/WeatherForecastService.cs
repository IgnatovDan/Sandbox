using System.Collections.Generic;
using CoreLib.WeatherForecast;

namespace ServerDx.Services;

public class WeatherForecastService {
  private ForecastProvider provider = new ForecastProvider();
  public Task<IEnumerable<Forecast>> GetForecastsAsync(DateOnly startDate) {
    return provider.GetForecastsAsync(startDate);
  }
}
