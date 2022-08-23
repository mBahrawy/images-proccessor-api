import path from "path";
import editImageMiddleware from "../../middlewares/edit-image-middleware";
import express, { Request, Response, Router } from "express";
import { Image } from "../../interfaces/Image";
import { editedImage, generateIditImageInfo, isImageExsists } from "../../utilities/images-utilities";
import { genUniqueId } from "../../utilities/string-utlities";
import { getPublicAssetUrl } from "../../utilities/path-utilities";
import uploadingImageMiddleware from "../../middlewares/uploading-image-middleware";

const editImage: Router = express.Router();

// for parsing application/json
editImage.use(express.json());

// for parsing application/x-www-form-urlencoded
editImage.use(express.urlencoded({ extended: true }));

// For image upload
editImage.use(uploadingImageMiddleware);

// Validation middleware
editImage.use(editImageMiddleware);

editImage.post("/", (req: Request, res: Response) => {
    if (!req.file) return;
    const editOptions: Image = generateIditImageInfo(req);
    const originalname = req.file.originalname as string;
    const imageExtension = (req.body.extension as string) || path.extname(originalname).replaceAll(".", "") || "png";
    const imgaeId = genUniqueId();

    editedImage(req.file.buffer, imgaeId, editOptions).then((resultedImagePath): void => {
        if (!resultedImagePath || !isImageExsists(resultedImagePath as string)) {
            res.status(500).json({
                status: 500,
                error: {
                    message: ["Internal server error"]
                }
            });
            return;
        }

        res.status(200).json({
            status: 200,
            data: {
                original_name: path.parse(originalname).name,
                image_url: getPublicAssetUrl(req, `public/images/edited-images/${imgaeId}.${imageExtension}`),
                format: req.body.extension,
                width: req.body.width,
                height: req.body.height
            }
        });
    });
});

export default editImage;
