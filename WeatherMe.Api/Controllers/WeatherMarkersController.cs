using Microsoft.AspNetCore.Mvc;
using WeatherMe.Api.Models;


namespace WeatherMe.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherMarkersController : ControllerBase
{
    private static readonly List<WeatherMarker> _markers = new();

    [HttpGet]
    public ActionResult<IEnumerable<WeatherMarker>> GetAll()
    {
        return Ok(_markers);
    }

    [HttpPost]
    public ActionResult<WeatherMarker> Create(WeatherMarker marker)
    {
        _markers.Add(marker);
        return CreatedAtAction(nameof(GetAll), new { id = marker.Id }, marker);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var marker = _markers.FirstOrDefault(m => m.Id == id);
        if (marker == null)
            return NotFound();

        _markers.Remove(marker);
        return NoContent();
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, WeatherMarker marker)
    {
        var existing = _markers.FirstOrDefault(m => m.Id == id);
        if (existing == null)
            return NotFound();

        existing.Label = marker.Label;
        existing.Latitude = marker.Latitude;
        existing.Longitude = marker.Longitude;

        return NoContent();
    }
}
