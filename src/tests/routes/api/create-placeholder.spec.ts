import supertest from "supertest";
import app from "../../../server";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe("Create a placeholder image", () => {
    it("should responde with the created image (default args)", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/create");
        expect(response.type).toBe("image/png");
        expect(response.status).toBe(200);
    });
    it("should not have any server errors", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/create");
        expect(response.status).not.toBe(500);
    });
    it("should responde with the created image (args: width, height, text, color, background)", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/create?width=600&height=400&text=Testing&color=fc0303&background=fcdf03");
        expect(response.type).toBe("image/png");
        expect(response.status).toBe(200);
    });
    it("should not responde with the created image (invalid any of: width, height, text, color, background)", async (): Promise<void> => {
        const response: supertest.Response = await request.get(
            "/create?width=abc&height=xyz&text=Testinggggggggggggggggggggggggggggggggggg&color=12x4&background=rgb(100,100,100)"
        );
        // console.log(response.body.error);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(400);
    });
    it("should not responde with the created image (very large width or height)", async (): Promise<void> => {
        const response: supertest.Response = await request.get("/create?width=5000000&height=5000000");
        // console.log(response.body.error);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(400);
    });
});
