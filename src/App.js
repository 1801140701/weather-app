import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import Weather from './components/WeatherFile';
import styles from './App.module.css'

function App() {
  return (
    <WeatherProvider>
      <div className={styles.appContainer}>
        <Weather />
      </div>
    </WeatherProvider>
  );
}

export default App;
