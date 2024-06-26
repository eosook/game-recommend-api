import express from "express";
// import gamelist from "./routes/gamelist.js";
// import profile from "./routes/profile.js";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
// app.use("/gamelist", warehouse);
// app.use("/profile", inventories);
let config =  {
    headers: {
      "Client-ID": `cqjhxa9azl5us0peawivmcyt9u9mqu`,
      Authorization: `Bearer f952a45fy25ewb560x7e9mlq6gziyd`,
    },
  }

app.post("/games", async (req, res) => {
   const title = req.body.name;
   console.log(title);
   let data = `fields name; search "${title}"; limit 5;`
   console.log (data);
  try {
    const response = await axios.post("https://api.igdb.com/v4/games", data ,config);
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
});

// start Express on port 8080
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT} `);
  console.log("Press CTRL + C to stop server");
});
