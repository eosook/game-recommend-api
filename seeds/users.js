/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, user_name: 'eosoo', password:'123'},
    {id: 2, user_name: 'john', password:'123'},
    {id: 3, user_name: 'santiago', password:'123'}
  ]);
};
