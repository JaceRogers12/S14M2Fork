const Car = require("./cars-model.js");
const vinValidator = require("vin-validator");
const db = require("../../data/db-config.js");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  //console.log("Checking car id");
  const car = await Car.getById(req.params.id);
  if (car) {
    next();
  } else {
    next({status:404, message: `car with id ${req.params.id} is not found`})
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  //console.log("Checking payload");
  const payload = req.body;
  const fields = ["vin", "make", "model", "mileage"];
  let payloadIsGood = true;
  fields.forEach(field => {
    if (!payload[field]) {
      payloadIsGood = false;
      next({status: 400, message: `${field} is missing`})
    }
  })
  if (payloadIsGood) {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  //console.log("Checking vin number validity");
  const vin = req.body.vin;
  let validity = vinValidator.validate(vin);
  //console.log("Validity: ", validity);
  if (!validity) {
    next({status: 400, message: `vin ${vin} is invalid`})
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  //console.log("Checking if vin is unique");
  const vin = req.body.vin;
  let taken = await db("cars").where({vin: vin}).first();
  //console.log(taken);
  if (taken) {
    next({status: 400, message: `vin ${vin} already exists`})
  } else {
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}