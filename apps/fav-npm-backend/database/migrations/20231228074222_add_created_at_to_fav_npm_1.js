exports.up = async function (knex) {
  return knex.schema.alterTable("fav_npm_1", function (table) {
    table.datetime("created_at");
    table.datetime("updated_at");
    table.datetime("deleted_at");
  });
}

exports.down = async function (knex) {
  return knex.schema.alterTable("fav_npm_1", function (table) {
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
    table.dropColumn("deleted_at");
  });
}
