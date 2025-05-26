using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WeatherMe.Api.Models;


namespace WeatherMe.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherMarkersController : ControllerBase
{
    private readonly WeatherMeDbContext _db;

    public WeatherMarkersController(WeatherMeDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WeatherMarker>>> GetAll()
    {
        var markers = await _db.WeatherMarkers.ToListAsync();
        return Ok(markers);
    }

    [HttpPost]
    public async Task<ActionResult<WeatherMarker>> Create(WeatherMarker marker)
    {
        _db.WeatherMarkers.Add(marker);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = marker.Id }, marker);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var marker = await _db.WeatherMarkers.FindAsync(id);
        if (marker == null)
            return NotFound();

        _db.WeatherMarkers.Remove(marker);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, WeatherMarker marker)
    {
        var existing = await _db.WeatherMarkers.FindAsync(id);
        if (existing == null)
            return NotFound();

        existing.Label = marker.Label;
        existing.Latitude = marker.Latitude;
        existing.Longitude = marker.Longitude;
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
