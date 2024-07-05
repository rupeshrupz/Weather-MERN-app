import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Historical.css";
import { Box, Card, List } from "@mui/material";

const Historical = ({ data }) => {
  function getDayName(date) {
    let newDate = new Date(date);
    let day = newDate.toLocaleString("en-us", { weekday: "long" });
    return day;
  }
  return (
    <Box
      sx={{
        width: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <label className="title">Historical</label>
      <Card
        variant="outlined"
        sx={{
          width: "470px",
          height: "250px",
          borderRadius: "30px",
          marginLeft: "90px",
          marginTop: "5px",
        }}
      >
        <List
          className="listScrollBar"
          sx={{
            width: "100%",
            position: "relative",
            overflow: "auto",
            maxHeight: 250,
          }}
        >
          <Accordion allowZeroExpanded>
            {data?.forecast?.forecastday?.slice(1, 8).map((item, idx) => (
              <AccordionItem key={idx}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="daily-item">
                      <img
                        src={`${item.day.condition.icon}`}
                        className="icon-small"
                        alt="weather"
                      />
                      <label className="day">{`${getDayName(item.date)}  ${
                        item.date
                      }`}</label>
                      <label className="description">
                        {item.day.condition.text}
                      </label>
                      <label className="min-max">
                        {Math.round(item.day.maxtemp_c)}°C /
                        {Math.round(item.day.mintemp_c)}°C
                      </label>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="daily-details-grid">
                    <div className="daily-details-grid-item">
                      <label>Humidity:</label>
                      <label>{item.day.avghumidity}</label>
                    </div>

                    <div className="daily-details-grid-item">
                      <label>Wind speed:</label>
                      <label>{item.day.maxwind_kph} m/s</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Chances of rain:</label>
                      <label>{item.day.daily_chance_of_rain}m</label>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </List>
      </Card>
    </Box>
  );
};

export default Historical;
