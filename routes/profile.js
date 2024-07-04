import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
const router = express.Router();
const knex = initKnex(configuration);

router
  .route("/played_games/:userId")
  .get(async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    try {
      const playedGames = await knex("played_games").where(
        "users_id",
        `${userId}`
      );
      res.json(playedGames);
    } catch {
      return res.status(500).send("Error getting played games");
    }
  })
  .post(async (req, res) => {
    try {
      const { users_id, igdb_id, title, cover_url } = req.body;
      const newGame = {
        users_id,
        igdb_id,
        title,
        cover_url,
      };

      await knex("played_games").insert(newGame);
      res
        .status(201)
        .json({ message: "Game added successfully ", game: newGame });
    } catch (error) {
      res.status(500).json({ message: "Error adding Game" });
    }
  });

router
  //get all games
  .route("/future_games/:userId")
  .get(async (req, res) => {
    const userId = req.params.userId;
    try {
      const futureGames = await knex("future_games").where(
        "users_id",
        `${userId}`
      );
      res.json(futureGames);
    } catch {
      return res.status(500).send("Error getting future games");
    }
  })
  //add new game to future games list
  .post(async (req, res) => {
    try {
        const { users_id, igdb_id, title, cover_url } = req.body;
        const newGame = {
          users_id,
          igdb_id,
          title,
          cover_url,
        };
      await knex("future_games").insert(newGame);
      res
        .status(201)
        .json({ message: "Game added successfully ", game: newGame });
    } catch (error) {
      res.status(500).json({ message: "Error adding Game" });
    }
  });
export default router;
