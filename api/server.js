const express = require("express")
const carsRoutes = require("./cars/cars-router.js");

const server = express()
server.use(express.json());

// DO YOUR MAGIC
server.use("/api/cars", carsRoutes);

server.get("/", (req, res) => {
    res.status(200).send("Working good so far")
});

module.exports = server
