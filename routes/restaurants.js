const express = require("express");
const app = express();
const restaurantRouter = express.Router();
const Restaurant = require("../models/Restaurant");
const {check, validationResult } = require("express-validator")

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

restaurantRouter.post("/", 
    [check("name").not().isEmpty().trim().withMessage("Name is required."),
    check("location").not().isEmpty().trim().withMessage("Location is required."),
    check("cuisine").not().isEmpty().trim().withMessage("Cuisine is required.")]
    , async (request, response) => {
        const errors = validationResult(request)
        if(!errors.isEmpty()){
            response.json({error: errors.array()})
        }else{
        const newRestaurant = await Restaurant.create(request.body);
        const restaurantAdded = await Restaurant.findAll({})
        response.json(restaurantAdded)
        }
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