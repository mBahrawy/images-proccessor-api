import express, { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import { Image } from "../../interfaces/Image";
import { editedImage } from "../../utilities/images";

const editImage: Router = express.Router();

// for parsing application/json
editImage.use(express.json());

// for parsing application/x-www-form-urlencoded
editImage.use(express.urlencoded({ extended: true }));

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024
    }
});

editImage.use(upload.single("image"));

editImage.post("/", (req: Request, res: Response) => {

    console.log(req.body);

    if (!req.file) {
        res.status(400).json({ error: "Please provide an image" });
        return;
    }
    // const imagePath = path.join(__dirname, "/public/edited-images");
    // console.log(req.file);

    const editOptions: Image = {
        width: +req.body.width,
        height: +req.body.height
    };

    editedImage(req.file.buffer, editOptions).then((img: string | undefined): void => res.sendFile(img || ""));
});

export default editImage;
