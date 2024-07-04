/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('future_games').del()
  await knex('future_games').insert([
    {id: 1, users_id: 1, igdb_id: "119133", title: "Elden Ring", cover_url: "https://images.igdb.com/igdb/image/upload/t_1080p/co4jni.jpg"},
  ]);
};
