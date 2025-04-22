import { act }  from 'react';
import { render, screen } from '@testing-library/react';
import WeatherComponent from './weatherComponent';
import * as weatherService from '../services/weatherService';

jest.mock('../services/weatherService');

test('renders weather component', async () => {
    const mockWeatherData = [
        {
            time: '2023-10-01T00:00:00Z',
            temperature: 20,
            windSpeed: 10,
            windDirection: 0,
            weatherCode: 'clear'
        }
    ];

    (weatherService.fetchWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);

    await act(async () => {
        render(<WeatherComponent weatherData={mockWeatherData} />);
    });

    const linkElement = await screen.findByText(/weather/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders weather component with empty data', async () => {
    const mockWeatherData: any[] = [];

    (weatherService.fetchWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);

    await act(async () => {
        render(<WeatherComponent weatherData={mockWeatherData} />);
    });

    const weatherDataElement = screen.queryByText(/2023-10-01T00:00:00Z/i);
    expect(weatherDataElement).toBeNull();
});

test('renders weather component with multiple data entries', async () => {
    const mockWeatherData = [
        {
            time: '2023-10-01T00:00:00Z',
            temperature: 20,
            windSpeed: 10,
            windDirection: 0,
            weatherCode: 'clear'
        },
        {
            time: '2023-10-01T01:00:00Z',
            temperature: 18,
            windSpeed: 12,
            windDirection: 45,
            weatherCode: 'cloudy'
        }
    ];

    (weatherService.fetchWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);

    await act(async () => {
        render(<WeatherComponent weatherData={mockWeatherData} />);
    });

    const firstEntry = await screen.findByText(/2023-10-01T00:00:00Z/i);
    const secondEntry = await screen.findByText(/2023-10-01T01:00:00Z/i);
    expect(firstEntry).toBeInTheDocument();
    expect(secondEntry).toBeInTheDocument();
});

test('handles error state', async () => {
    (weatherService.fetchWeatherData as jest.Mock).mockRejectedValue(new Error('Failed to fetch weather data'));

    await act(async () => {
        render(<WeatherComponent weatherData={[]} />);
    });

    const errorElement = await screen.findByText(/Wind Direction/i);
    expect(errorElement).toBeInTheDocument();
});