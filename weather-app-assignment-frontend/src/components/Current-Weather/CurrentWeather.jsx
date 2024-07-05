import React, { useEffect } from "react";
import "./CurrentWeather.css";
import FavoriteButton from "../FavouritButton";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const CurrentWeather = ({ data }) => {
  return (
    <>
      <Card
        sx={{
          display: "flex",
          width: "710px",
          gap: "20px",
          background: "#B4C5DF",
          marginLeft: "40px",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "#B4C5DF",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" color="white" variant="h5">
              {data.city}
            </Typography>
            <Typography variant="subtitle1" color="white" component="div">
              {data.weather[0].description}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <FavoriteButton fav_weather={`${data.name}`} />
          </Box>
        </Box>

        <Box
          sx={{
            background: "#B4C5DF",
            width: "500px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CardContent sx={{ flex: "row" }}>
            <Typography component="div" color="white" variant="h2">
              {Math.round(data.main.temp)}°C
            </Typography>
          </CardContent>
          <Stack spacing={0}>
            <Stack direction={"row"}>
              <Typography component="span" color="white" variant="p">
                Feels like :
              </Typography>
              <Typography component="span" color="white" variant="p">
                {Math.round(data.main.feels_like)}°C
              </Typography>
            </Stack>

            <Stack direction={"row"}>
              <Typography component="span" color="white" variant="p">
                Wind :
              </Typography>
              <Typography component="span" color="white" variant="p">
                {data.wind.speed} m/s
              </Typography>
            </Stack>

            <Stack direction={"row"}>
              <Typography component="span" color="white" variant="p">
                Humidity :
              </Typography>
              <Typography component="span" color="white" variant="p">
                {data.main.humidity}%
              </Typography>
            </Stack>

            <Stack direction={"row"}>
              <Typography component="span" color="white" variant="p">
                Pressure :
              </Typography>
              <Typography component="span" color="white" variant="p">
                {data.main.pressure} hPa
              </Typography>
            </Stack>
          </Stack>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`icons/${data.weather[0].icon}.png`}
            alt="Live from space album cover"
          />
        </Box>
      </Card>
    </>
  );
};

export default CurrentWeather;
