// src/components/FavoriteButton.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "../HOC/Wrapper";
import NavBar from "./NavBar";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../../api";
const FavoritePage = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [data, setData] = useState([]);
  const [newDisplay, setNewDisplay] = useState();
  const { id } = JSON.parse(localStorage.getItem("user"));

  const promises = [];
  useEffect(() => {
    const response = axios
      .get(`http://localhost:8000/favorites?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your custom headers here
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setData(data.fav.favourite);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        promises.push(
          axios.get(
            `${WEATHER_API_URL}/weather?q=${data[i]}&appid=${WEATHER_API_KEY}`
          )
        );
      }
      Promise.all(promises)
        .then((responses) => setNewDisplay(responses))
        .then(() => setIsUpdated(true));
    } else {
      setIsUpdated(false);
    }
  }, [data]);

  const handleDelete = async (favourite) => {
    console.log(favourite);
    let payload = {
      deleted_data: favourite,
    };
    try {
      console.log(id);
      let res = await axios.delete(
        `http://localhost:8000/favorites?id=${id}&deleted_data=${favourite}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your custom headers here
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      setData(data.filter((item) => item !== favourite));
    } catch (error) {
      console.error("Error deleting favourite:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <NavBar />

      <Card
        variant="outlined"
        sx={{
          width: "523px",
          height: "400px",
          borderRadius: "30px",
          marginLeft: "40px",
          marginTop: "60px",
        }}
      >
        <List
          className="listScrollBar"
          sx={{
            width: "100%",
            position: "relative",
            overflow: "auto",
            maxHeight: 400,
          }}
        >
          <Accordion allowZeroExpanded>
            {isUpdated ? (
              newDisplay.map((item, idx) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <AccordionItem style={{ flexBasis: "100%" }}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <div className="daily-item">
                            <img
                              src={`icons/${item.data.weather[0].icon}.png`}
                              className="icon-small"
                              alt="weather"
                            />
                            <label className="name">{item.data.name}</label>
                            <label className="description">
                              {item.data.weather[0].description}
                            </label>
                            <label className="min-max">
                              {Math.round(item.data.main.temp_max)}°C /
                              {Math.round(item.data.main.temp_min)}°C
                            </label>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div className="daily-details-grid">
                          <div className="daily-details-grid-item">
                            <label>Pressure:</label>
                            <label>{item.data.main.pressure}</label>
                          </div>
                          <div className="daily-details-grid-item">
                            <label>Humidity:</label>
                            <label>{item.data.main.humidity}</label>
                          </div>
                          <div className="daily-details-grid-item">
                            <label>Clouds:</label>
                            <label>{item.data.clouds.all}%</label>
                          </div>
                          <div className="daily-details-grid-item">
                            <label>Wind speed:</label>
                            <label>{item.data.wind.speed} m/s</label>
                          </div>
                          <div className="daily-details-grid-item">
                            <label>Sea level:</label>
                            <label>{item.data.main.sea_level}m</label>
                          </div>
                          <div className="daily-details-grid-item">
                            <label>Feels like:</label>
                            <label>{item.data.main.feels_like}°C</label>
                          </div>
                        </div>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <ListItem
                      key={idx}
                      sx={{ flexBasis: "10%" }}
                      disableGutters
                      secondaryAction={
                        <IconButton
                          aria-label="delete"
                          sx={{ "&:hover": { color: "red", border: "none" } }}
                        >
                          <DeleteIcon
                            onClick={() => handleDelete(item.data.name)}
                          />
                        </IconButton>
                      }
                    ></ListItem>
                  </div>
                );
              })
            ) : (
              <h2 style={{ textAlign: "center" }}>No favourite added</h2>
            )}
          </Accordion>
        </List>
      </Card>
    </Box>
  );
};

export default Wrapper(FavoritePage);
