
process.env.NODE_ENV = "test";
import { IHero } from './hero.schema';
import * as request from "supertest";
import app from "../main";

const server = request(app);

describe("Testing routes and controller", () => {  
    let id = null;
    test("It should response the GET method", 
    async done => {
    server
        .get("/api/heroes")
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });

    test("It should response the POST method", 
    async done => {
    server
        .post("/api/hero")
        .send({
            name: "Hulk"
        })
        .expect((response: { status: number; body: IHero; }) => {
            expect(response.status).toBe(201)
            expect(response.body).toMatchObject(
                expect.objectContaining({ name: "Hulk"})
            );
            id = response.body.hero_id;
        })
        .end(done);
    });


    test("It should response the PUT method", 
    async done => {
    server
        .put("/api/hero/" + id)
        .send({
            name: "Ironman"
        })
        .expect((response: { status: number; body: IHero; }) => {
            expect(response.status).toBe(200)
            expect(response.body).toMatchObject(
                expect.objectContaining({ hero_id: id, name: "Ironman"})
            );
        })
        .end(done);
    });

    test("It should response the DELETE method", 
    async done => {
    server
        .delete("/api/hero/" + id)
        .expect((response: { status: number; body: IHero; }) => {
            expect(response.status).toBe(200)
            expect(response.body).toMatchObject(
                expect.objectContaining({ hero_id: id, name: "Ironman"})
            );
        })
        .end(done);
    });
}); 