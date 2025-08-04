import { useEffect, useState, useCallback, useMemo } from 'react';
import '../styles/weatherwidget.css';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('calgary');
  const [localTime, setLocalTime] = useState('');
  const [localDate, setLocalDate] = useState('');

  const locations = useMemo(() => ({
    calgary: { name: 'Calgary, Canada', lat: 51.05, lon: -114.07, timezone: 'America/Edmonton' },
    toronto: { name: 'Toronto, Canada', lat: 43.7, lon: -79.42, timezone: 'America/Toronto' },
    manila: { name: 'Manila, Philippines', lat: 14.6, lon: 120.98, timezone: 'Asia/Manila' },
    davao: { name: 'Davao, Philippines', lat: 7.19, lon: 125.45, timezone: 'Asia/Manila' }
  }), []);

  const fetchWeather = useCallback(async () => {
    const { lat, lon } = locations[location];
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,weathercode&timezone=auto`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }, [location, locations]);

    const updateTime = useCallback(() => {
      const tz = locations[location].timezone;
      const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: tz });
      setLocalTime(timeString);
    }, [location, locations]);

  const updateDate = useCallback(() => {
    const tz = locations[location].timezone;
    const dateString = new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: tz,
    });
    setLocalDate(dateString);
  }, [location, locations]);

  useEffect(() => {
    fetchWeather();
    updateTime();
    updateDate();

    const interval = setInterval(() => {
      updateTime();
      updateDate();
    }, 1000 * 60); 

    return () => clearInterval(interval);
  }, [fetchWeather, updateTime, updateDate]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  if (!weather) return <div className="weather-widget">Loading weather...</div>;

  return (
    <div className="weather-widget">
      {/* WIDGET TITLE*/}
      <div className="weather-header">
        <h3>🌤 Weather</h3>
      </div>

      {/* LOCATION OPTIONS */}
      <div className="weather-location">
        <select value={location} onChange={handleLocationChange}>
          {Object.entries(locations).map(([key, loc]) => (
            <option key={key} value={key}>{loc.name}</option>
          ))}
        </select>
        <div className="weather-time">🕒 {localTime}</div>
        <div className="weather-date">📅 {localDate}</div>
      </div>

      <div className="weather-body">
        <div className="weather-temp">
          {weather.current.temperature_2m}°C
        </div>
        <div className="weather-detail">
          <span>Feels like: {weather.current.apparent_temperature}°C</span>
          <span>Wind: {weather.current.wind_speed_10m} km/h</span>
        </div>
      </div>
    </div>
  );
}
