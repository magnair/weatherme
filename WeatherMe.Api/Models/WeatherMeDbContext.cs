using Microsoft.EntityFrameworkCore;

namespace WeatherMe.Api.Models;

public class WeatherMeDbContext : DbContext
{
    public WeatherMeDbContext(DbContextOptions<WeatherMeDbContext> options) : base(options) { }

    public DbSet<WeatherMarker> WeatherMarkers { get; set; }
}
