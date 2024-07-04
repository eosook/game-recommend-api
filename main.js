import express from "express";
import games from "./routes/games.js";
import profile from "./routes/profile.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use("/games", games);
app.use("/profile", profile);

// start Express on port 8080
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT} `);
  console.log("Press CTRL + C to stop server");
});
