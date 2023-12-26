exports.up = async function (knex) {
    await knex.raw(`create extension if not exists "uuid-ossp"`);
    return knex.schema.createTable("fav_npm_1", function (table) {
      table
        .uuid("uuid")
        .notNullable()
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name", 255);
      table.string("description", 255);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("fav_npm_1");
  };