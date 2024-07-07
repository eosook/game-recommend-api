import express from "express";
import axios from "axios";

const router = express.Router();

let config = {
  headers: {
    "Client-ID": `cqjhxa9azl5us0peawivmcyt9u9mqu`,
    Authorization: `Bearer f952a45fy25ewb560x7e9mlq6gziyd`,
  },
};

router.route("/").post(async (req, res) => {
  try {
    const title = req.body.name;
    let data = `fields name, genres; search "${title}"; limit 5;`;
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      data,
      config
    );
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
});

router.route("/genre").post(async (req, res) => {
  try {
    const genre = req.body.genre;
    let data = `fields *; limit 5; where genres = ${genre};`;
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      data,
      config
    );
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
});

router.route("/popular").post(async (req, res) => {
  const { genres, ids } = req.body;
  let data = `fields id, name, genres.name, summary, total_rating, total_rating_count, cover.url, first_release_date; sort total_rating_count desc; limit 10; where (genres = [${genres.join(
    ","
  )}] & first_release_date > 1641013200 & total_rating > 80 & id != (${ids.join(",")}));`;
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      data,
      config
    );
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
});

router.route("/:id").post(async (req, res) => {
  const id = req.params.id;
  let data = `fields name, cover.url, genres, summary, first_release_date, total_rating, screenshots, videos.video_id; where id = ${id};`;
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      data,
      config
    );
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
});

router.route("/genre/:id").post(async (req, res) => {
  const id = req.params.id;
  let data = `fields *; where id = ${id};`;
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/genres",
      data,
      config
    );
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
});

router.route("/screenshot/:id").post(async (req, res) => {
  const id = req.params.id;
  let data = `fields url; where id = ${id};`;
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/screenshots",
      data,
      config
    );
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
});

export default router;
