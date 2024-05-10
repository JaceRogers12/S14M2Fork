

exports.up = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.createTable("cars", table => {
    table.increments("carsId");
    table.string("vin", 12).notNullable().unique();
    table.string("make", 20).notNullable()
    table.string("model", 20).notNullable()
    table.float("mileage").notNullable()
    table.string("title", 100)
    table.string("transmission", 100)
  })
};

exports.down = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.dropTableIfExists("cars");
};
