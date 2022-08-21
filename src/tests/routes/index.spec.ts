import request from "supertest";
import app from "../../server";

describe("Check app home page", () => {
    it("should start server and load home page", (done) => {
        request(app).get("/").set("Accept", "application/json").expect("Content-Type", "text/html; charset=utf-8");
        done();
    });
});
