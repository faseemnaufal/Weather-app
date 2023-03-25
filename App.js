import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      if (query.length === 0) return;
      const apiKey = 'YOUR_API_KEY'; // Replace with your own OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    };
    fetchWeather();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.city.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter city name" />
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div className="weather-container">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>{Math.round(weatherData.main.temp)}°C</p>
        </div>
      )}
    </div>
  );
}

export default App;

