import editLocalmageMiddleware from "../../middlewares/edit-local-image-middleware";
import express, { Request, Response, Router } from "express";
import editLocalImageController from "../../controllers/edit-local-image-controller";

const editLocalImage: Router = express.Router();

// Validation middleware
editLocalImage.use(editLocalmageMiddleware);

editLocalImage.get("/", (req: Request, res: Response) => editLocalImageController(req, res));

export default editLocalImage;
