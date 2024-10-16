const request = require("supertest");
const app = require("./src/app.js");
const Restaurant = require("./models");
const syncSeed = require("./seed.js");

let restaurantAmount

beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll({});
    restaurantAmount = restaurants.length;
})

test("should return 200 on get", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toEqual(200)
})

test("should return an array of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("cuisine");
})

test("should return the correct restuarant data", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body).toContainEqual(
        expect.objectContaining({
            id: 1,
            name: "AppleBees",
            location: "Texas",
            cuisine: "FastFood",
        })
    )
})

test("should return the correct restuarant", async () => {
    const response = await request(app).get("/restaurants/1");
    expect(response.body).toEqual(
        expect.objectContaining({
            id: 1,
            name: "AppleBees",
            location: "Texas",
            cuisine: "FastFood",
        })
    )
})

test("should return larger resturant array", async () => {
    const response = await request(app)
    .post("/restaurants")
    .send({ name: "orangeTree", location: "Denton", cuisine: "tapas"});
    expect(response.body.length).toEqual(restaurantAmount + 1)
})

test("should update first item in database", async () => {
    await request(app)
    .put("/restaurants/1")
    .send({ name: "orangeTree", location: "Denton", cuisine: "tapas"})
})

test("should delete db entry by id", async () => {
    await request(app).delete("/restaurants/1");
    const restaurants = await Restaurant.findAll({});
    expect(restaurants.length).toEqual(restaurantAmount);
    expect(restaurants[0].id).not.toEqual(1)
})

test("should return an error when name is empty", async () => {
    const response = await request(app)
    .post("/restaurants")
    .send({ name: "", location: "Denton", cuisine: "tapas"});
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
        error: [
            {
                value: "",
                msg: "Name is required.",
                path: "name",
                location: "body",
                type: "field"
            }
        ]
    })
})

test("should return an error when location is empty", async () => {
    const response = await request(app)
    .post("/restaurants")
    .send({ name: "orangetree", location: "", cuisine: "tapas"});
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
        error: [
            {
                value: "",
                msg: "Location is required.",
                path: "location",
                location: "body",
                type: "field"
            }
        ]
    })
})

test("should return an error when cuisine is empty", async () => {
    const response = await request(app)
    .post("/restaurants")
    .send({ name: "orangeTree", location: "Denton", cuisine: ""});
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
        error: [
            {
                value: "",
                msg: "Cuisine is required.",
                path: "cuisine",
                location: "body",
                type: "field"
            }
        ]
    })
})