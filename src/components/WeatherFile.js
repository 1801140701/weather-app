import React, { useContext, useRef } from "react";
import { WeatherContext } from "../context/WeatherContext";
import styles from '../styles/Weather.module.css';

const WeatherFile = () => {
    const { weatherData, loading, error, fetchWeatherApi, setWeatherData, setError } = useContext(WeatherContext);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const city = inputRef.current.value;
        if (city) {
            fetchWeatherApi(city)
        }
    }

    const handleClear = () => {
        inputRef.current.value = '';
        error && setError(null)
        setWeatherData(null)
    }

    return (
        <div className={styles.weatherContainer}>
            <h1 className={styles.title}>Weather Information</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter city name"
                    className={styles.input}
                />
                <div className={styles.buttonDiv}>
                <button type="submit" className={styles.button}>Get Weather Information</button>
                <button className={styles.button} type="button" onClick={handleClear}>Clear</button>
                </div>
            </form>

            {loading ? <p className={styles.loading}>Loading...</p> : error ? <p className={styles.error}>{error}</p> :
                ( weatherData &&
                    <div>
                        <h2>{weatherData?.name}</h2>
                        <p>Temperature: {weatherData?.main?.temp}°C</p>
                        <p>Humidity: {weatherData?.main?.humidity}%</p>
                        <p>Condition: {weatherData?.weather?.length > 0 ? `${weatherData.weather[0]?.main} (${weatherData?.weather[0]?.description})` : "No description available"}</p>
                    </div>
                )
            }
        </div>
    )
};

export default React.memo(WeatherFile);