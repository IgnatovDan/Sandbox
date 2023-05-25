namespace CoreLib.WeatherForecast;

public class ForecastProvider {
  private static string[] Summaries => new[] {
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
  };

  public async Task<IEnumerable<Forecast>> GetForecastsAsync(DateOnly startDate) {
    await Task.Delay(1000);
    return await Task.FromResult(Enumerable.Range(1, 15).Select(
      index => new Forecast {
        Date = startDate.AddDays(index),
        TemperatureC = Random.Shared.Next(0, 25),
        Summary = Summaries[Random.Shared.Next(Summaries.Length)],
        Precipitation = 10 * Random.Shared.NextDouble()
      }
    ));
  }
}
