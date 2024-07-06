import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import "../App.css";
const Register = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        formData
      );
      setMessage(response.data.message);
      if(response.status == 200){
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.errors.email || error.response.data.errors.password || error.response.data.errors.name ||"An error occurred");
    }
  };

  return (
    <Box
      sx={{
        width: "99vw",
        height: "97vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          position: "relative",
          zIndex: 111,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#646cff75",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: "523px",
            height: "550px",
            borderRadius: "30px",
          }}
        >
          <CardContent>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h2"
              component="div"
            >
              Register
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" variant="contained">
                Register
              </Button>
              {message && <p>{message}</p>}
            </form>
          </CardContent>
          <CardActions>
            <Button
              sx={{
                "&:hover": {
                  color: "black",
                  border: "none",
                  outline: "none",
                },
                border: "none",
                outline: "none",
              }}
              size="medium"
              onClick={() => navigate("/login")}
            >
              Already Registerer? Login
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default Register;
