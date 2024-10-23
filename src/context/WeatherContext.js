import React, { Children, createContext, useCallback, useState } from 'react';


export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeatherApi = useCallback(async(cityName) => {
        setLoading(true);
        setError(null);
        try {
            const API_KEY = "6e446e02685eeb776f356a415b196fc9"
            const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);

            if (!response.ok) {
                throw new Error('City not found. Please enter a valid city.');
            }
            
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false)
        }
    },[])

    return (
        <WeatherContext.Provider value={{ city, setCity, weatherData, loading, error, fetchWeatherApi, setWeatherData, setError}}>
            {children}
        </WeatherContext.Provider>
    );
};