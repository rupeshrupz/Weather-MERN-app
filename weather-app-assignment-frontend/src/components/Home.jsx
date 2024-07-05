import { useEffect, useState } from "react";
import {
  HISTORICAL_API_KEY,
  HISTORICAL_API_URL,
  WEATHER_API_KEY,
  WEATHER_API_URL,
  historicalWeatherApiOptions,
} from "../../api";
import Search from "./Search/Search";
import CurrentWeather from "./Current-Weather/CurrentWeather";
import Forecast from "./Forecast/Forecast";
import "../App.css";

import Historical from "./Historical-Weather/Historical";
import Wrapper from "../HOC/Wrapper";
import { Box } from "@mui/material";
import NavBar from "./NavBar";
function Home() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [historical, setHistorical] = useState(null);

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      localStorage.setItem("heading", "Dashboard");
      console.log(JSON.parse(localStorage.getItem("user")));
      const defaultLocation = "Bengaluru,IN";
      const url = `${WEATHER_API_URL}/weather?q=${defaultLocation}&appid=${WEATHER_API_KEY}`;
      const res = await fetch(url);
      const defaultData = await res.json();

      console.log(defaultData);
      let { lat, lon } = defaultData?.coord;
      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const historicalFetch = fetch(
        `${HISTORICAL_API_URL}/history.json?q=Bengaluru&lang=en&dt=2024-06-27&end_dt=2024-07-04&key=${HISTORICAL_API_KEY}`,
        historicalWeatherApiOptions
      );

      Promise.all([currentWeatherFetch, forecastFetch, historicalFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forcastResponse = await response[1].json();
          const historicalResponse = await response[2].json();
          setCurrentWeather({ city: defaultLocation, ...weatherResponse });
          setForecast({ city: defaultLocation, ...forcastResponse });
          setHistorical({
            city: historicalResponse?.location.name,
            ...historicalResponse,
          });
        })
        .catch(console.log);
    };
    fetchDefaultWeather();
  }, []);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");
    const historicalLabel = searchData.label.split(",")[0];
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const historicalFetch = fetch(
      `${HISTORICAL_API_URL}/history.json?q=${historicalLabel}&lang=en&dt=2024-06-27&end_dt=2024-07-04&key=${HISTORICAL_API_KEY}`,
      historicalWeatherApiOptions
    );

    Promise.all([currentWeatherFetch, forecastFetch, historicalFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        const historicalResponse = await response[2].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
        setHistorical({
          city: historicalResponse?.location.name,
          ...historicalResponse,
        });
      })
      .catch(console.log);
  };

  return (
    <Box>
      <NavBar />
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "28px" }}>
        {forecast && <Forecast data={forecast} />}
        {historical && <Historical data={historical} />}
      </Box>
    </Box>
  );
}

export default Wrapper(Home);
