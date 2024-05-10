// STRETCH
exports.seed = async function(knex) {
    await knex("cars").truncate();
    await knex("cars").insert([
        {vin: 2730, make: "Toyota", model: "RAV4", mileage: 1, title: "Something", transmission: "SomethingElse"},
        {vin: 2983, make: "Takenoko", model: "Panda", mileage: 10, title: "Bamboo", transmission: "Lotus"},
        {vin: 2329, make: "Growlithe", model: "Jerome", mileage: 100, title: "The Loyal Pokemon", transmission: "Fire"},
    ])
}