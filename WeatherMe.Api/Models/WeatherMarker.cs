using System.ComponentModel.DataAnnotations;

namespace WeatherMe.Api.Models;

public class WeatherMarker
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Label { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
