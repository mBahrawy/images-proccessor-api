import express, { Request, Response, Router } from "express";
import {
    createImage,
    generateImageInfo,
    isImageExsists,
    generateImageDirectory
} from "../../utilities/images";

const createPlaceholder: Router = express.Router();

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
