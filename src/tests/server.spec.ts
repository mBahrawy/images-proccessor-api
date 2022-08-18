import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("Test endpoint respones", function () {
    it("should receive success response", async function () {
        const response = await request.get("/").set("Accept", "application/json");
        expect(response.status).toEqual(200);
    });
});
