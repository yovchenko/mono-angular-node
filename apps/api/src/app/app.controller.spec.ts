
process.env.NODE_ENV = "test";
import { IHero } from './hero.schema';
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

    test("It should response the POST method", 
    async done => {
    server
        .post("/api/hero")
        .send({
            hero_id: 2,
            name: "Hulk"
        })
        .expect((response: { status: number; body: IHero; }) => {
            expect(response.status).toBe(201)
            expect(response.body).toMatchObject(
                expect.objectContaining({ hero_id: 2})
            );
        })
        .end(done);
    });

    test("It should response the PUT method", 
    async done => {
    server
        .put("/api/hero/2")
        .send({
            name: "Ironman"
        })
        .expect((response: { status: number; body: IHero; }) => {
            expect(response.status).toBe(200)
            expect(response.body).toMatchObject(
                expect.objectContaining({ hero_id: 2, name: "Ironman"})
            );
        })
        .end(done);
    });

    test("It should response the DELETE method", 
    async done => {
    server
        .delete("/api/hero/2")
        .expect((response: { status: number; body: IHero; }) => {
            expect(response.status).toBe(200)
            expect(response.body).toMatchObject(
                expect.objectContaining({ hero_id: 2, name: "Ironman"})
            );
        })
        .end(done);
    });
}); 