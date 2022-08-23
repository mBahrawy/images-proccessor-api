import express, { NextFunction, Request, Response, Router } from "express";
import path from "path";
import { createImage, generateImageInfo, isImageExsists } from "../../utilities/images";
import { createPlaceholderImagePath } from "../../utilities/path-utilities";

const createPlaceholder: Router = express.Router();

createPlaceholder.use((req: Request, res: Response, next: NextFunction) => {
    const colorRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    const errorsArray: string[] = [];

    if (req.query.width) {
        isNaN(Number(req.query.width)) && errorsArray.push("Please provide a valid width.");
        Number(req.query.width) > 20000 && errorsArray.push("Image width is too large, max is 20000px.");
    }

    if (req.query.height) {
        isNaN(Number(req.query.height)) && errorsArray.push("Please provide a valid height.");
        Number(req.query.height) > 20000 && errorsArray.push("Image height is too large, max is 20000px.");
    }

    if (req.query.text) {
        `${req.query.text}`.length > 20 && errorsArray.push("Too long text length, max is 20 charachters.");
    }

    if (req.query.background) {
        !colorRegex.test(`#${req.query.background}`) && errorsArray.push("Please provide a valid background color format (Eg. aa11cc)");
    }

    if (req.query.color) {
        !colorRegex.test(`#${req.query.color}`) && errorsArray.push("Please provide a valid text color format (Eg. aa11cc)");
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

createPlaceholder.get("/", (req: Request, res: Response) => {

    const imageInfo = generateImageInfo(req);
    const imagePath = createPlaceholderImagePath(imageInfo);

    // Check if image is aready genrated for improving preformance
    if (isImageExsists(imagePath)) {
        // res.setHeader("Content-Type", "Image/png");
        res.sendFile(imagePath);
        return;
    }
    createImage(imageInfo).then((resultedImagePath): void => {
        if (!resultedImagePath) {
            res.status(500).json({
                status: 500,
                error: {
                    message: ["internal server error, no resulted image"]
                }
            });
            return;
        }

        if (!isImageExsists(resultedImagePath)) {
            res.status(500).json({
                status: 500,
                error: {
                    message: ["internal server error, no image found in folder"]
                }
            });
            return;
        }

        // res.setHeader("Content-Type", "Image/png");
        res.sendFile(resultedImagePath);
    });
});

export default createPlaceholder;
