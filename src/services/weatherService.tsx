// src/services/weatherService.ts
export const fetchWeatherData = async (latitude: string, longitude: string) => {

    const response =  await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`, {
        // method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'User-Agent': '"AcmeWeatherApp/0.9 github.com/acmeweatherapp',
        //     'Access-Control-Allow-Origi': '*',
        // },
    });

    //https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=59.34&lon=10.49&altitude=90
    
    if (!response.ok) {
        console.log(response.blob);
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data.properties.timeseries.map((entry: any) => ({
        time: entry.time,
        temperature: entry.data.instant.details.air_temperature,
        windSpeed: entry.data.instant.details.wind_speed,
        windDirection: entry.data.instant.details.wind_from_direction,
        weatherCode: entry.data.next_1_hours ? entry.data.next_1_hours.summary.symbol_code : '',
    }));
};
