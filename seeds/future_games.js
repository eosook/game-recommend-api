/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {id: 1, users_id: 1, igdb_id: "119133", title: "Elden Ring", cover_url: "https://images.igdb.com/igdb/image/upload/t_1080p/co4jni.jpg"},
    {id: 2, users_id: 1, igdb_id: "121", title: "Minecraft", cover_url: "https://images.igdb.com/igdb/image/upload/t_1080p/co49x5.jpg"},
    {id: 3, users_id: 1, igdb_id: "3349", title: "Paper Mario: The Thousand-Year Door", cover_url: "https://images.igdb.com/igdb/image/upload/t_1080p/co25us.jpg"},
    {id: 4, users_id: 1, igdb_id: 2, title: "", cover_url: ""},
  ]);
};
