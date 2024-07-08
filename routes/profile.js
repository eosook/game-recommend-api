import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
const router = express.Router();
const knex = initKnex(configuration);

const validateFields = async (req, res, next) => {
  const { user_name, password, name } = req.body;
  if (!user_name) {
    return res.status(400).json({ message: "Please enter a username." });
  } else if (!password) {
    return res.status(400).json({ message: "Please enter a password." });
  } else if (!name) {
    return res.status(400).json({ message: "Please enter a name." });
  } else if (!user_name || !password || !name) {
    return res.status(400).json({ message: "Please fill out all the boxes." });
  }
  try {
    const userNameExists = await knex("users").where({ user_name: user_name });
    if (userNameExists.length > 0) {
      return res.status(400).json({ message: "Username is already taken." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Validation Error" });
  }
};

router
  .route("/")
  .get(async (_req, res) => {
    try {
      const userProfile = await knex("users");
      res.json(userProfile);
    } catch {
      return res.status(500).send("Error getting user");
    }
  })
  .post(validateFields, async (req, res) => {
    try {
      const { user_name, password, name } = req.body;
      const newUser = {
        user_name,
        password,
        name,
      };
      await knex("users").insert(newUser);
      res
        .status(201)
        .json({ message: "User added successfully ", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error adding User" });
    }
  });

router.route("/:userId").get(async (req, res) => {
  const userId = req.params.userId;
  try {
    const userProfile = await knex("users").where("id", `${userId}`);
    res.json(userProfile);
  } catch {
    return res.status(500).send("Error getting user");
  }
});

router
  .route("/played_games/:userId")
  .get(async (req, res) => {
    const userId = req.params.userId;
    try {
      const playedGames = await knex("played_games")
        .where("users_id", `${userId}`)
        .orderBy("title", "asc");
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
      const futureGames = await knex("future_games")
        .where("users_id", `${userId}`)
        .orderBy("title", "asc");
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
