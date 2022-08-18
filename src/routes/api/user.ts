import express, { Request, Response, Router } from "express";

const user: Router = express.Router();

user.get("/", (req: Request, res: Response) => {
    res.json({
        id: 525,
        name: "Mohamed",
        email: "bahrawy.dev@gmail.com"
    });
});

export default user;
