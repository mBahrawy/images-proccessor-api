import { NextFunction, Request, Response } from "express";
import { Extension } from "../interfaces/Image";

const editLocalImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errorsArray: string[] = [];
    const extensionsArray: Extension[] = ["png", "jpg", "gif", "webp", "jpeg"];

    if (req.query.width) {
        isNaN(Number(req.query.width)) && errorsArray.push("Please provide a valid width.");
        Number(req.query.width) > 20000 && errorsArray.push("Image width is too large, max is 20000px.");
    }

    if (req.query.height) {
        isNaN(Number(req.query.height)) && errorsArray.push("Please provide a valid height.");
        Number(req.query.height) > 20000 && errorsArray.push("Image height is too large, max is 20000px.");
    }

    if (req.query.extension) {
        !extensionsArray.includes(req.query.extension as Extension) && errorsArray.push("Please provide a valid extension.");
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

export default editLocalImageMiddleware;
