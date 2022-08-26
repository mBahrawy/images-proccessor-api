import editImageMiddleware from "../../middlewares/edit-image-middleware";
import express, { Request, Response, Router } from "express";
import uploadingImageMiddleware from "../../middlewares/uploading-image-middleware";
import editImageController from "../../controllers/edit-image-controller";

const editImage: Router = express.Router();

// For image upload
editImage.use(uploadingImageMiddleware);

// Validation middleware
editImage.use(editImageMiddleware);

editImage.post("/", (req: Request, res: Response) => editImageController(req, res));

export default editImage;
