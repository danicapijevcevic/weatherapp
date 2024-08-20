import { API_URL, CURRENT_URL_PARAMS } from "./constants";
export const fetchDaily = (coordinates, fn) =>
  fetch(
    `${API_URL}latitude=${coordinates.lat}&longitude=${coordinates.lon}&current=${CURRENT_URL_PARAMS}`
  )
    .then((res) => res.json())
    .then((res) => {
      fn(res);
    });

export const fetchWeekValues = (coordinates, fn) =>
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,rain,weather_code`
  )
    .then((res) => res.json())
    .then((res) => {
      fn(res);
    });

export const fetchSunriesSunset = (coordinates, fn) =>
  fetch(
    `https://api.sunrisesunset.io/json?lat=${coordinates.lat}&lng=${coordinates.lon}`
  )
    .then((res) => res.json())
    .then((res) => {
      fn(res);
    });
