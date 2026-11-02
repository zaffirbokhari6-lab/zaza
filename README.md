# Hawa — Lahore Air Quality

A no-build, installable web app and Capacitor iOS starter. Open `index.html` in a modern browser, or serve the site over HTTPS (needed for browser location permission). It starts with DHA Phase 6; search for an area/street, use **Use my location**, refresh readings, and save frequently checked places on this device.

## Data and accuracy

- Search results use Photon/OpenStreetMap, with Open-Meteo geocoding as a fallback.
- Current AQI and PM2.5/PM10 come from Open-Meteo's Air Quality API. The US AQI value is supplied by that service; the app does not invent a sensor reading.
- The app shows the largest available pollutant AQI contributor and an hourly 24-hour AQI forecast.
- Saved areas stay in local browser/app storage on the device; they are not synced to an account.
- The air-quality model is about 11 km resolution. A precise GPS point or street search selects a nearby model grid cell; it does **not** provide trustworthy street-by-street measurements. For that, integrate validated local ground sensors and display sensor location, age, calibration, and quality flags.
- General category precautions follow AirNow/EPA guidance. Individual health needs and local Pakistan advisories take priority.

No API key or web build step is required for non-commercial use. Attribution links are shown in the app. The public [privacy policy](https://zaffirbokhari6-lab.github.io/zaza/privacy.html) describes location and search requests.

For iPhone installation and the App Store preparation path, see [MOBILE_APP.md](MOBILE_APP.md). App Store submission requires a full Xcode installation, a unique bundle ID, a tested native build, and an Apple Developer account.
