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

const Login = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      console.log(response.data);
      setMessage(response.data.message);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/home");
      }
    } catch (error) {
      setMessage(error.response.data.errors.email || "An error occurred");
    }
  };

  return (
    <Box
      sx={{
        width: "99vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#646cff75",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "97vh",
          position: "relative",
          zIndex: 111,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: "523px",
            height: "400px",
            borderRadius: "30px",
          }}
        >
          <CardContent>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h2"
              component="div"
            >
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
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
              <Button type="submit" variant="contained">
                Login
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
              onClick={() => navigate("/register")}
            >
              {" "}
              Not Yet Registered?{" "}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
