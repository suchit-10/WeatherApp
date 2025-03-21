import React, { useEffect, useState } from "react";
import "./WeatherApp.css";

const cities = ["Nagpur", "Mumbai", "Delhi"]; // List of cities

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]); // Default city

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/weather/${selectedCity}`);
        if (!response.ok) throw new Error("Weather data not found");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWeather();
  }, [selectedCity]); // Fetch data whenever the selected city changes

  if (!weatherData) return <div className="loading">Loading...</div>;

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, temp_min, temp_max, humidity, pressure },
    weather,
    wind: { speed, deg },
    visibility,
  } = weatherData;

  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="container">
      <div className="weather-card">
        <h1>{name}, {country}</h1>

        {/* Dropdown to select a city */}
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>

        <div className="weather-info">
          <img src={weatherIcon} alt={weather[0].description} />
          <p>{weather[0].description}</p>
        </div>
        <p className="temp">{temp}°C</p>
        <p>Min: {temp_min}°C | Max: {temp_max}°C</p>
        <div className="details">
          <p>Humidity: {humidity}%</p>
          <p>Pressure: {pressure} hPa</p>
          <p>Wind: {speed} m/s ({deg}°)</p>
          <p>Visibility: {visibility / 1000} km</p>
          <p>Sunrise: {new Date(sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
