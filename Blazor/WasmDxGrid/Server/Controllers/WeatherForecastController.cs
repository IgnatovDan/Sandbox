using Microsoft.AspNetCore.Mvc;
using WasmDxGrid.Shared;

namespace WasmDxGrid.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    WeatherForecastService forecastService;
    public WeatherForecastController(WeatherForecastService forecastService)
    {
        this.forecastService = forecastService;
    }

    [HttpGet]
    public IEnumerable<SharedForecast> Get()
    {
        return forecastService.GetForecast();
    }
}
