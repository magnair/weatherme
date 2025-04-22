// src/components/WeatherComponent.tsx
import React from 'react';
import WindArrow from './windDirectionIcon';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Weather from '../weather';

interface WeatherData {
    time: string;
    temperature: number;
    windSpeed: number;
    windDirection: number;
    weatherCode: string;
}

interface WeatherComponentProps {
    weatherData: WeatherData[];
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ weatherData }) => {
    return (

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Wind Direction (°)</TableCell>
                        <TableCell>Weather</TableCell>
                        <TableCell>Wind Speed (m/s)</TableCell>
                        <TableCell>Temperature (°C)</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {weatherData.map((data, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{new Date(data.time).toLocaleString()}</TableCell>

                                <TableCell>
                                    {WindArrow({ direction: data.windDirection })}
                                </TableCell>
                                <TableCell>
                                    <img src={`/icons/Weather/png/${data.weatherCode}.png`} width="35" alt="Weather Icon" />
                                </TableCell>
                                  
                                <TableCell style={{ color: data.windSpeed > 5 ? 'green' : 'inherit' }}>
                                    {data.windSpeed}
                                </TableCell>
                                <TableCell>{data.temperature}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
       </TableContainer>
    );
};

export default WeatherComponent;