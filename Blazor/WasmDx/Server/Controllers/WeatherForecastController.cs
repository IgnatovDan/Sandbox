using Microsoft.AspNetCore.Mvc;
using WasmDx.Shared;

namespace WasmDx.Server.Services;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    WeatherForecastService forecastService;
    public WeatherForecastController(WeatherForecastService forecastService)
    {
        this.forecastService = forecastService;
    }

    [HttpGet]
    public async Task<IEnumerable<SharedWeatherForecast>> GetAsync()
    {
        return await forecastService.GetForecastsAsync(DateOnly.FromDateTime(DateTime.Now));
    }
}
