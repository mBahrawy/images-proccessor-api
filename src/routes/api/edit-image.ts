import express, { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import { Image } from "../../interfaces/Image";
import { editedImage, generateIditImageInfo } from "../../utilities/images";

const editImage: Router = express.Router();

// for parsing application/json
editImage.use(express.json());

// for parsing application/x-www-form-urlencoded
editImage.use(express.urlencoded({ extended: true }));

// For image upload
const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024
    }
});

editImage.use(upload.single("image"));

// Validation middleware
editImage.use((req: Request, res: Response, next: NextFunction) => {
    const errorsArray: string[] = [];

    !req.file && errorsArray.push("Please provide an image.");
    !req.body.width && errorsArray.push("Please provide an image.");

    if (req.body.width) {
        isNaN(Number(req.body.width)) && errorsArray.push("Please provide a valid width.");
        Number(req.query.width) > 20000 && errorsArray.push("Image width is too large, max is 20000px.");
    }
    if (req.body.height) {
        isNaN(Number(req.body.height)) && errorsArray.push("Please provide a valid height.");
        Number(req.query.height) > 20000 && errorsArray.push("Image height is too large, max is 20000px.");
    }

    if (errorsArray.length !== 0) {
        res.status(400);
        res.json({
            error: {
                code: 400,
                message: errorsArray
            }
        });
        return;
    }

    next();
});

editImage.post("/", (req: Request, res: Response) => {
    if (!req.file) return;
    const editOptions: Image = generateIditImageInfo(req);
    editedImage(req.file.buffer, editOptions).then((img: string | null): void => res.sendFile(img || ""));
});

export default editImage;
