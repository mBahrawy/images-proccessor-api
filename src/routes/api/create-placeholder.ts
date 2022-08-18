import express, { Request, Response, Router } from "express";

const createPlaceholder: Router = express.Router();

createPlaceholder.get("/", (req: Request, res: Response) => {
    res.json({
        state: "createPlaceholder"
    });
});

export default createPlaceholder;
