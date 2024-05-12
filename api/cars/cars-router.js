// DO YOUR MAGIC
const express = require("express");
const Car = require("./cars-model.js");
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require("./cars-middleware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    const cars = await Car.getAll();
    try {
        res.status(200).send(cars);
    } catch(err) {
        next(err);
    }
});

router.get("/:id", checkCarId, async (req, res, next) => {
    const car = await Car.getById(req.params.id);
    try {
        res.status(200).send(car);
    } catch(err) {
        next(err);
    }
});

router.post("/",  
checkCarPayload,
checkVinNumberValid,
checkVinNumberUnique,
async (req, res, next) => {
    const newCar = await Car.create(req.body);
    try {
        res.status(200).send(newCar);
    } catch(err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    //console.log("Error")
    if (!err.status) {
        err.status = 500;
        err.message = "There was an issue with the server";
    }
    res.status(err.status).send({message: err.message});
});

module.exports = router;