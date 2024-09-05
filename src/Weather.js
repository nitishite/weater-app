import React, { useState } from 'react';

export default function WeatherComponent() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d910bd39b720d77c799fc24991fae7cf`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
      console.error("Error in fetching the data from API", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div className="weather-app">
      <div className="weather-card">
        <h1>Weather Forecast</h1>
        <form onSubmit={handleSubmit}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={handleCityChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="temperature">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <span>{Math.round(weather.main.temp)}°C</span>
            </div>
            <p className="description">{weather.weather[0].description}</p>
            <div className="details">
              <div className="detail-item">
                <span className="label">Feels like:</span>
                <span>{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <span className="label">Wind:</span>
                <span>{weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="label">Humidity:</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="label">Max Temp:</span>
                <span>{Math.round(weather.main.temp_max)}°C</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}