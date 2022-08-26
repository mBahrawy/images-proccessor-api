import supertest from "supertest";
import app from "../../../server";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe("Edit uploaded image", () => {
    it("should edit local image (default args)", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/edit-local");
        expect(response.type).toBe("image/png");
        expect(response.status).toBe(200);
    });
    it("should not have any server errors", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/edit-local");
        expect(response.status).not.toBe(500);
    });

    it("should responde with the created image (args: width, height, extension)", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/edit-local?width=1000&height=1000&extension=webp");
        expect(response.type).toBe("image/webp");
        expect(response.status).toBe(200);
    });
    it("should not responde with the created image (invalid any of: width, height, extension)", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/create?width=abc&height=xyz&extension=mp4");
        // console.log(response.body.error);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(400);
    });
    it("should not responde with the created image (very large width or height)", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/edit-local?width=5000000&height=5000000");
        // console.log(response.body.error);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(400);
    });
});
