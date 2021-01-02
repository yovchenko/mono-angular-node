
process.env.NODE_ENV = "test";
import * as request from "supertest";
import app from "../main";

const server = request(app);

describe("Testing routes and controller", () => {  

    test("It should response the GET method", 
    async done => {
    server
        .get("/api/heroes")
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });

    test("It should respond with an array of heroes", 
    async () => {
        const response = await server
            .post("/api/hero")
            .send({
                hero_id: 2,
                name: "Hulk"
            });
            console.log(response);
            expect(response.statusCode).toBe(201);
            expect(response.body[0]).toHaveProperty("id");
            expect(response.body[0]).toHaveProperty("name");
    });

}); 