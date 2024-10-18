const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");
const restaurantRouter = require("../routes/restaurants")

//TODO: Create your GET Request Route Below:
app.use(express.json());
app.use(express.urlencoded());
app.use("/restaurants", restaurantRouter);

// app.get("/restaurants", async (request, response) => {
//   const allRestaurants = await Restaurant.findAll({});
//   response.json(allRestaurants);
// });

// app.get("/restaurants/:id", async (request, response) => {
//   const number = request.params.id;
//   const selectedRestaurant = await Restaurant.findByPk(number);
//   response.json(selectedRestaurant);
// });

// app.post("/restaurants", async (request, response) => {
//   const newRestaurant = await Restaurant.create(request.body);
//   response.json(newRestaurant);
// });

// app.put("/restaurants/:id", async (request, response) => {
//   const updatedRestaurant = await Restaurant.update(request.body, {
//     where: { id: request.params.id },
//   });
//   response.json(updatedRestaurant);
// });

// app.delete("/restaurants/:id", async (request, response) => {
//   const deletedRestaurant = await Restaurant.destroy({
//     where: { id: request.params.id },
//   });
//   response.json(deletedRestaurant);
// });

module.exports = app;
