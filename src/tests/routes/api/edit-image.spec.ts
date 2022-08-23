import supertest from "supertest";
import app from "../../../server";
import path from "path";

const request: supertest.SuperTest<supertest.Test> = supertest(app);
const testImagepath = path.resolve(__basedir, "../testing-image.png");

describe("Edit uploaded image", () => {
    it("should edit image", async (): Promise<void> => {
        const response: supertest.Response = await request.post("/edit").attach("image", testImagepath);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
    });
    it("should recive valid image properties", async (): Promise<void> => {
        const response: supertest.Response = await request
            .post("/edit")
            .attach("image", testImagepath)
            .field("width", "abx123")
            .field("height", "xyz00.")
            .field("extension", "xyz");
        // console.log(response.body.error);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(400);
    });
    it("should not edit very large image (very large width or height)", async (): Promise<void> => {
        const response: supertest.Response = await request
            .post("/edit")
            .attach("image", testImagepath)
            .field("width", 500000)
            .field("height", 500000);
        // console.log(response.body.error);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(400);
    });
    it("should not have any server errors", async (): Promise<void> => {
        const response: supertest.Response = await request.post("/edit");
        // console.log(response.body.error);
        expect(response.type).toBe("application/json");
        expect(response.status).not.toBe(500);
    });
    it("should provide an image", async (): Promise<void> => {
        const response: supertest.Response = await request.post("/edit");
        // console.log(response.body.error);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(400);
    });
    it("should provide an implemented image extention", async (): Promise<void> => {
        const response: supertest.Response = await request.post("/edit").attach("image", testImagepath).field("extension", "mp4");
        // console.log(response.body.error);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(400);
    });
});
