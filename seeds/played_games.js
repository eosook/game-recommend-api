/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('played_games').del()
  await knex('played_games').insert([
    {id: 1, users_id: 1, igdb_id: "121", title: "Minecraft", cover_url: "https://images.igdb.com/igdb/image/upload/t_1080p/co49x5.jpg"},
    {id: 2, users_id: 1, igdb_id: "3349", title: "Paper Mario: The Thousand-Year Door", cover_url: "https://images.igdb.com/igdb/image/upload/t_1080p/co25us.jpg"},
    {id: 3, users_id: 1, igdb_id: "1512", title: "Pokémon Yellow Version: Special Pikachu Edition", cover_url: "http://images.igdb.com/igdb/image/upload/t_1080p/co5pih.jpg"},
  ]);
};
