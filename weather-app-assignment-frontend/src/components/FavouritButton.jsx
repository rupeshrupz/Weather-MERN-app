import React, { useEffect, useState } from "react";
import axios from "axios";

const FavoriteButton = ({ fav_weather }) => {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const [fav, setFav] = useState(false);
  const isFavorite = (data) => {
    if (data.includes(fav_weather) == true) {
      setFav(true);
    } else {
      setFav(false);
    }
  };
  useEffect(() => {
    const response = axios
      .get(`http://localhost:8000/favorites?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your custom headers here
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        isFavorite(data.fav.favourite);
      });
  }, [fav_weather]);

  console.log(fav_weather);
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/favorites?id=${id}`,
        { fav_weather: fav_weather },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your custom headers here
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setFav(true);
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <button onClick={handleClick} disabled={fav}>
      {fav ? "Added to Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
