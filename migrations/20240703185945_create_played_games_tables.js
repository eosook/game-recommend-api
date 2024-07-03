/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("played_games", (table) => {
        table.increments("id").primary();
        table
          .integer("users_id")
          .unsigned()
          .references("users.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("igdb_id").notNullable();
        table.string("title").notNullable();
        table.string("cover_url").notNullable();
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("played_games");
};
