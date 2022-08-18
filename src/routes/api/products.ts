import express, { Request, Response, Router } from "express";

const products: Router = express.Router();

products.get("/", (req: Request, res: Response) => {
    res.json({
        data: [
            {
                id: 123,
                price: 5000,
                name: "t-shirt"
            },
            {
                id: 124,
                price: 5000,
                name: "t-shirt 2"
            }
        ]
    });
});

export default products;
