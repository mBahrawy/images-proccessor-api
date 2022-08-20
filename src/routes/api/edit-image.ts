import express, { Request, Response, Router } from "express";
import multer from "multer";
// import { editedImage } from "../../utilities/images";

const editImage: Router = express.Router();

editImage.use(express.json()); // for parsing application/json
editImage.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024
    }
});

editImage.use(upload.single("image"));

editImage.post("/", (req: Request, res: Response) => {
    // res.json({
    //     state: "edit"
    // });

    console.log(req.file);
    console.log(req.body);
        res.send("");
    

    // editedImage(image).then((img: string | undefined): void => res.sendFile(img || ""));


});

export default editImage;
