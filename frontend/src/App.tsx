import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);
  const [days, setDays] = useState(1);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => console.error(err)
    );
  }, []);

  useEffect(() => {
    if (position) fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, days]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/weather`, {
        params: { lat: position?.lat, lon: position?.lon, days },
      });
      setWeather(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <h1 className="text-4xl font-bold mb-4">🌤️ Ma Météo Locale</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setDays(1)}
          className={`px-4 py-2 rounded-lg ${days === 1 ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          Aujourd’hui
        </button>
        <button
          onClick={() => setDays(7)}
          className={`px-4 py-2 rounded-lg ${days === 7 ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          7 Jours
        </button>
      </div>

      {loading && <p>Chargement des données météo...</p>}

      {weather && (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
          {weather.current_weather && (
            <div className="text-center mb-4">
              <p className="text-xl font-semibold">Température actuelle</p>
              <p className="text-3xl">{weather.current_weather.temperature}°C</p>
            </div>
          )}

          {weather.daily && (
            <div>
              <p className="text-lg font-semibold mb-2">Prévision sur {days} jour(s):</p>
              <div className="grid grid-cols-2 gap-4">
                {weather.daily.time.map((date: string, index: number) => (
                  <div key={date} className="border rounded-xl p-3 text-center bg-blue-50">
                    <p className="font-semibold">{date}</p>
                    <p>🌡️ Max : {weather.daily.temperature_2m_max[index]}°C</p>
                    <p>❄️ Min : {weather.daily.temperature_2m_min[index]}°C</p>
                    <p>🌧️ Précip : {weather.daily.precipitation_sum[index]} mm</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
