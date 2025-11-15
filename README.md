Weather App

Application météo simple utilisant React pour le front et FastAPI pour le backend.
L’application récupère la position de l’utilisateur et affiche la météo du jour ou de la semaine.

Fonctionnalités

Récupération automatique de la position (HTML5 Geolocation)

Météo actuelle

Météo sur 7 jours

Backend en FastAPI utilisant l’API gratuite Open-Meteo

Interface moderne avec React + TailwindCSS

Technologies

Frontend : React, Vite, TailwindCSS

Backend : FastAPI, Uvicorn

API externe : https://open-meteo.com

Installation
Backend (FastAPI)

cd backend
python -m venv venv
venv\Scripts\activate   # sous Windows
pip install -r requirements.txt

Lancer le serveur :

python -m uvicorn main:app --reload

Frontend (React)
cd frontend
npm install
npm run dev ou npm start

