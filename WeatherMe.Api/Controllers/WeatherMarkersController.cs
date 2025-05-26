using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WeatherMe.Api.Models;
using Microsoft.Extensions.Logging;


namespace WeatherMe.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherMarkersController : ControllerBase
{
    private readonly WeatherMeDbContext _db;
    private readonly ILogger<WeatherMarkersController> _logger;

    public WeatherMarkersController(WeatherMeDbContext db, ILogger<WeatherMarkersController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WeatherMarker>>> GetAll()
    {
        try
        {
            var markers = await _db.WeatherMarkers.ToListAsync();
            return Ok(markers);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting all weather markers");
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    [HttpPost]
    public async Task<ActionResult<WeatherMarker>> Create(WeatherMarker marker)
    {
        try
        {
            _db.WeatherMarkers.Add(marker);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = marker.Id }, marker);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while creating a weather marker");
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var marker = await _db.WeatherMarkers.FindAsync(id);
            if (marker == null)
                return NotFound();

            _db.WeatherMarkers.Remove(marker);
            await _db.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while deleting weather marker with id {Id}", id);
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, WeatherMarker marker)
    {
        try
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
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while updating weather marker with id {Id}", id);
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }
}
