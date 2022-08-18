import express, { Request, Response, Router } from "express";
import user from "./api/user";
import products from "./api/products";
import logger from "./utilities/logger";

const routes: Router = express.Router();

routes.get("/", logger, (req: Request, res: Response) => {
    res.json({
        message: `Hello World 🌍`
    });
});

routes.use("/user", user);
routes.use("/products", products);

export default routes;
