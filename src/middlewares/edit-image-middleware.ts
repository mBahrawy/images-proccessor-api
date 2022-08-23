import { NextFunction, Request, Response } from "express";
import { Extension } from "../interfaces/Image";

const editImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errorsArray: string[] = [];
    const extensionsArray: Extension[] = ["png", "jpg", "gif", "webp", "jpeg"];

    (!req.file || req.file.fieldname !== "image") && errorsArray.push("Please provide an image.");

    if (req.body.width) {
        isNaN(Number(req.body.width)) && errorsArray.push("Please provide a valid width.");
        Number(req.body.width) > 20000 && errorsArray.push("Image width is too large, max is 20000px.");
    }
    if (req.body.height) {
        isNaN(Number(req.body.height)) && errorsArray.push("Please provide a valid height.");
        Number(req.body.height) > 20000 && errorsArray.push("Image height is too large, max is 20000px.");
    }
    if (req.body.extension) {
        !extensionsArray.includes(req.body.extension) && errorsArray.push("Please provide a valid extension.");
    }

    if (errorsArray.length !== 0) {
        res.status(400);
        res.json({
            status: 400,
            error: {
                message: errorsArray
            }
        });
        return;
    }

    next();
};

export default editImageMiddleware;
