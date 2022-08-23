import express, { Request, Response, Router } from "express";
import createImageMiddleware from "../../middlewares/create-image-middleware";
import { createImage, generateImageInfo, isImageExsists } from "../../utilities/images-utilities";
import { createPlaceholderImagePath } from "../../utilities/path-utilities";

const createPlaceholder: Router = express.Router();

createPlaceholder.use(createImageMiddleware);

createPlaceholder.get("/", (req: Request, res: Response) => {
    const imageInfo = generateImageInfo(req);
    const imagePath = createPlaceholderImagePath(imageInfo);

    // Check if image is aready genrated for improving preformance
    if (isImageExsists(imagePath)) {
        res.sendFile(imagePath);
        return;
    }
    createImage(imageInfo).then((resultedImagePath): void => {
        if (!resultedImagePath || !isImageExsists(resultedImagePath)) {
            res.status(500).json({
                status: 500,
                error: {
                    message: ["Internal server error"]
                }
            });
            return;
        }
        res.sendFile(resultedImagePath);
    });
});

export default createPlaceholder;
