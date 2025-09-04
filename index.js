import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import {connect} from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
// connect();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Server is Working Fine");
});
// Routes
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
