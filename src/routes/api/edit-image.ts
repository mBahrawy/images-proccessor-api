import express, { Request, Response, Router } from "express";

const editImage: Router = express.Router();

editImage.get("/", (req: Request, res: Response) => {
    res.json({
        state: "edit"
    });
});

export default editImage;
