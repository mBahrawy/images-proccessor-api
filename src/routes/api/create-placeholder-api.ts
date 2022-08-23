import express, { Request, Response, Router } from "express";
import createImageController from "../../controllers/create-image-controller";
import createImageMiddleware from "../../middlewares/create-image-middleware";

const createPlaceholder: Router = express.Router();

createPlaceholder.use(createImageMiddleware);

createPlaceholder.get("/", (req: Request, res: Response) => createImageController(req, res));

export default createPlaceholder;
