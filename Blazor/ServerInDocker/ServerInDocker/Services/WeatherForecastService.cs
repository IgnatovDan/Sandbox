using CoreLib.WeatherForecast;
namespace ServerInDocker.Services;

public class WeatherForecastService
{
  ForecastProvider forecastProvider = new();
  public Task<Forecast[]> GetForecastAsync(DateOnly startDate)
  {
    return forecastProvider.GetForecastAsync(startDate);
  }
}
