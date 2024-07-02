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
    let data = `fields name; search "${title}"; limit 5;`;
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
