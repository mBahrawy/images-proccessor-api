import express, { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import { Image } from "../../interfaces/Image";
import { editedImage, generateIditImageInfo, isImageExsists } from "../../utilities/images";
import { Extension } from "../../interfaces/Image";
import { genUniqueId } from "../../utilities/id-generator";
import { getPublicAssetUrl } from "../../utilities/path-utilities";

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
    const extensionsArray: Extension[] = ["png", "jpg", "gif", "webp"];

    !req.file && errorsArray.push("Please provide an image.");

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
});

editImage.post("/", (req: Request, res: Response) => {
    if (!req.file) return;
    const editOptions: Image = generateIditImageInfo(req);
    const imgaeId = genUniqueId();

    editedImage(req.file.buffer, imgaeId, editOptions).then((img: string | null): void => {
        console.log(!img , !isImageExsists(img));
        
        if (!img || !isImageExsists(img)) {
            res.status(404).json({
                status: 404,
                error: {
                    message: ["Image not found"]
                }
            });
            return;
        }

        res.status(200).json({
            status: 200,
            data: {
                original_name: "api",
                image_url: getPublicAssetUrl(req, `public/images/edited-images/${imgaeId}.${req.body.extension}`),
                format: req.body.extension,
                width: req.body.width,
                height: req.body.height
            }
        });
    });
});

export default editImage;
