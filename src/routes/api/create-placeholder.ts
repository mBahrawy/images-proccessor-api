import express, { NextFunction, Request, Response, Router } from "express";
import { createImage, generateImageInfo, isImageExsists, generateImageDirectory } from "../../utilities/images";

const createPlaceholder: Router = express.Router();

createPlaceholder.use((req: Request, res: Response, next: NextFunction) => {
    const colorRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    const errorsArray = [];

    if (req.query.width) {
        isNaN(Number(req.query.width)) && errorsArray.push("Please provide a valid width.");
        Number(req.query.width) > 10000 && errorsArray.push("Image width is too large, max is 10000px.");
    }

    if (req.query.height) {
        isNaN(Number(req.query.height)) && errorsArray.push("Please provide a valid height.");
        Number(req.query.height) > 10000 && errorsArray.push("Image height is too large, max is 10000px.");
    }

    if (req.query.text) {
        `${req.query.text}`.length > 20 && errorsArray.push("Too long text length, max is 20 charachters.");
    }

    if (req.query.background) {
        !colorRegex.test(`#${req.query.background}`) && errorsArray.push("Please provide a valid background color format (Eg. aa11cc)");
    }

    if (req.query.textcolor) {
        !colorRegex.test(`#${req.query.textcolor}`) && errorsArray.push("Please provide a valid text color format (Eg. aa11cc)");
    }

    if (errorsArray.length !== 0) {
        res.status(400);
        res.json({ errorsArray });
        return;
    }

    next();
});

createPlaceholder.get("/", (req: Request, res: Response) => {
    const image = generateImageInfo(req);
    // Check if image is aready genrated for improving preformance
    if (isImageExsists(image)) {
        res.sendFile(generateImageDirectory(image));
        return;
    }
    createImage(image).then((img: string | undefined): void => res.sendFile(img || ""));
});

export default createPlaceholder;
