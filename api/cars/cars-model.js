const db = require("../../data/db-config.js");

const getAll = () => {
  // DO YOUR MAGIC
  //console.log("GetAll works");
  return db("cars");
}

const getById = (id) => {
  // DO YOUR MAGIC
  //console.log("GetById works");
  return db("cars").where({id: id}).first();
}

const create = async (payload) => {
  // DO YOUR MAGIC
  //console.log("create works");
  let [id] = await db("cars").insert(payload);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create
}