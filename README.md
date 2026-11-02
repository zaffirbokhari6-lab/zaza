# Hawa — Lahore Air Quality

A no-build, single-page air-quality app. Open `index.html` in a modern browser, or serve this folder over HTTPS (needed for browser location permission). It starts with DHA Phase 6; use the search field for an area/street or select **Use my location**. The refresh button updates the selected coordinates.

## Data and accuracy

- Search results use Photon/OpenStreetMap, with Open-Meteo geocoding as a fallback.
- Current AQI and PM2.5/PM10 come from Open-Meteo's Air Quality API. The US AQI value is supplied by that service; the app does not invent a sensor reading.
- The app shows the largest available pollutant AQI contributor and an hourly 24-hour AQI forecast.
- The air-quality model is about 11 km resolution. A precise GPS point or street search selects a nearby model grid cell; it does **not** provide trustworthy street-by-street measurements. For that, integrate validated local ground sensors and display sensor location, age, calibration, and quality flags.
- General category precautions follow AirNow/EPA guidance. Individual health needs and local Pakistan advisories take priority.

No API key or build step is required for non-commercial use. Attribution links are shown in the app.
