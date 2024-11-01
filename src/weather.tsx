// src/Weather.tsx
import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from './services/weatherService';
import WeatherComponent from './components/weatherComponent';

const Weather: React.FC = () => {
    const [weatherData, setWeatherData] = useState<any[]>([]);
    const [error, setError] = useState<string>('');

    const getWeather = async () => {
        try {
            const latitude = '59.34'; // Replace with the desired latitude
            const longitude = '10.49'; // Replace with the desired longitude
            const data = await fetchWeatherData(latitude, longitude);
            setWeatherData(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <WeatherComponent weatherData={weatherData} />
        </div>
    );
};

export default Weather;
