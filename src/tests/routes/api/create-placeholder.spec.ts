import supertest from "supertest";
import app from "../../../server";
import { promises as fs } from "fs";
import path from "path";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe("Create a placeholder image,", () => {
    it("should responde with the created image (default args)", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/create/api");

        console.log(response);
        
        expect(response.status).toBe(200);
    });








// const endpoint = "/create/api";
// import request from "supertest";

    // it("should responde with the created image", (done) => {
    //     request(app)
    //         .get(endpoint)
    //         .set("Accept", "application/json")
    //         .expect("Content-Type", "text/html")
    //         .expect((res) => {
    //             console.log(res);
    //         })
    //         .expect(400)
    //         .end(function(err, res) {
    //             if (err) {
    //                 console.log(err);

    //                 return done();
    //             };
    //             return done();
    //           });
    // });
});
