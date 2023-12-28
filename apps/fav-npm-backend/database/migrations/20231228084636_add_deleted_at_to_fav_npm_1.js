exports.up = async function (knex) {
    return knex.schema.alterTable("fav_npm_1", function (table) {
      table.datetime("deleted_at");
    });
  }
  
  exports.down = async function (knex) {
    return knex.schema.alterTable("fav_npm_1", function (table) {
      table.dropColumn("deleted_at");
    });
  }
  