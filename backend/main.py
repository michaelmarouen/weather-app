from fastapi import FastAPI, Query
import requests, os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Weather API")

# Autoriser le frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("WEATHER_API_KEY")
BASE_URL = "https://api.open-meteo.com/v1/forecast"  # Gratuit et sans clé

@app.get("/weather")
def get_weather(lat: float = Query(...), lon: float = Query(...), days: int = 1):
    """Retourne la météo actuelle ou la prévision sur plusieurs jours"""
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_sum"],
        "current_weather": True,
        "forecast_days": days,
        "timezone": "auto"
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()
    return data