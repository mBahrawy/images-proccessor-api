import request from "supertest";
import app from "../../../server";

const endpoint = "/create/api";

describe("Create a placeholder image,", () => {
    it("should responde with the created image", (done) => {
        request(app).get(endpoint).set("Accept", "application/json").expect("Content-Type", "text/html; charset=utf-8").expect(200);

        request(app)
            .get(endpoint)
            .then((res) => console.log(res));
        done();
    });
});
