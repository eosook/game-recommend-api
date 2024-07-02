import express from "express";
import axios from "axios";

const router = express.Router();

let config = {
  headers: {
    "Client-ID": `cqjhxa9azl5us0peawivmcyt9u9mqu`,
    Authorization: `Bearer f952a45fy25ewb560x7e9mlq6gziyd`,
  },
};

router.route('/').post(async (req, res) => {
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

router.route('/genre').post(async (req, res) => {
  try {
    const genre = req.body.genre;
    let data = `fields name, genres; limit 5; WHERE genres in ${genre}`;
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

router.route('/popular').post(async (req, res) => {
  const genres = req.body.genres;
  let data = `fields *; sort value desc; limit 500; where popularity_type = 3;`;
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/popularity_primitives",
      data,
      config
    );
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
})

router.route('/:id').post(async (req, res) => {
  const id = req.params.id;
  let data = `fields *; where id =  ${id};`;
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

router.route('/genre/:id').post(async (req, res) => {
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

router.route('/screenshot/:id').post(async (req, res) => {
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
