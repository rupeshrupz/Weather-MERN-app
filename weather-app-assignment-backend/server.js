import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 8000;
import apiRoutes from "./routes/api.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/", apiRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
