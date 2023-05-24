namespace ServerDxChart.Data;

public class WeatherForecastService
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    public Task<WeatherForecast[]> GetForecastAsync()
    {
        return Task.FromResult(Enumerable.Range(1, 15).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Today).AddDays(index),
            TemperatureC = Random.Shared.Next(0, 25),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)],
            Precipitation = 10 * Random.Shared.NextDouble()
        }).ToArray());
    }
}
