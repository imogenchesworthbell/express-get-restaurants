const express = require("express");
const app = express();
const restaurantRouter = express.Router();
const Restaurant = require("../models/Restaurant");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

restaurantRouter.get("/", async (request, response) => {
    const restaurants = await Restaurant.findAll({});
    response.json(restaurants);
})

restaurantRouter.get("/:id", async (request, response) => {
    const number = request.params.id;
    const restaurant = await Restaurant.findByPk(number);
    response.json(restaurant)
})

restaurantRouter.post("/", async (request, response) => {
    const restaurant = await Restaurant.create(request.body);
    const newRestaurant = await Restaurant.findAll({})
    response.json(newRestaurant)
})

restaurantRouter.put("/:id", async (request, response) => {
    const updatedRestaurants = await Restaurant.update(request.body, {where: {id: request.params.id}});
    let restaurants = await Restaurant.findAll()
    response.json(restaurants);
})

restaurantRouter.delete("/:id", async (request, response) => {
    const deletedRestaurant = await Restaurant.destroy({where: {id: request.params.id}});
    let restaurants = await Restaurant.findAll()
    response.json(restaurants)
})


module.exports = restaurantRouter