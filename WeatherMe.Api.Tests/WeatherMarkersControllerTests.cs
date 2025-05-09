using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeatherMe.Api.Controllers;
using WeatherMe.Api.Models;
using Xunit;

namespace WeatherMe.Api.Tests;

public class WeatherMarkersControllerTests
{
    private WeatherMeDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<WeatherMeDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        var db = new WeatherMeDbContext(options);
        db.Database.EnsureCreated();
        return db;
    }

    [Fact]
    public async Task GetAll_ReturnsOkResult_WithMarkersList()
    {
        // Arrange
        var db = GetInMemoryDbContext();
        var controller = new WeatherMarkersController(db);
        var marker = new WeatherMarker { Label = "Test", Latitude = 1.0, Longitude = 2.0 };
        await controller.Create(marker);

        // Act
        var result = await controller.GetAll();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var markers = Assert.IsAssignableFrom<IEnumerable<WeatherMarker>>(okResult.Value);
        Assert.Contains(markers, m => m.Label == "Test");
    }

    [Fact]
    public async Task Create_AddsMarker_ReturnsCreatedAtAction()
    {
        // Arrange
        var db = GetInMemoryDbContext();
        var controller = new WeatherMarkersController(db);
        var marker = new WeatherMarker { Label = "CreateTest", Latitude = 3.0, Longitude = 4.0 };

        // Act
        var result = await controller.Create(marker);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedMarker = Assert.IsType<WeatherMarker>(createdResult.Value);
        Assert.Equal("CreateTest", returnedMarker.Label);
    }

    [Fact]
    public async Task Delete_RemovesMarker_ReturnsNoContent()
    {
        // Arrange
        var db = GetInMemoryDbContext();
        var controller = new WeatherMarkersController(db);
        var marker = new WeatherMarker { Label = "DeleteTest", Latitude = 5.0, Longitude = 6.0 };
        await controller.Create(marker);

        // Act
        var result = await controller.Delete(marker.Id);

        // Assert
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task Update_UpdatesMarker_ReturnsNoContent()
    {
        // Arrange
        var db = GetInMemoryDbContext();
        var controller = new WeatherMarkersController(db);
        var marker = new WeatherMarker { Label = "Old", Latitude = 7.0, Longitude = 8.0 };
        await controller.Create(marker);
        var updated = new WeatherMarker { Label = "New", Latitude = 9.0, Longitude = 10.0 };

        // Act
        var result = await controller.Update(marker.Id, updated);

        // Assert
        Assert.IsType<NoContentResult>(result);
        var getResult = await controller.GetAll();
        var okResult = Assert.IsType<OkObjectResult>(getResult.Result);
        var markers = Assert.IsAssignableFrom<IEnumerable<WeatherMarker>>(okResult.Value);
        Assert.Contains(markers, m => m.Label == "New");
    }
}
