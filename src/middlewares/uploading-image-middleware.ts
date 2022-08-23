import { NextFunction, Request, Response } from "express";
import multer from "multer";

const upload = multer({
    limits: {
        fieldNameSize: 2040,
        fileSize: 4 * 1024 * 1024,
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/webp" ||
            file.mimetype == "image/gif" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .webp, .gif, .jpg and .jpeg format allowed!"));
        }
    }
}).single("image");

const uploadingImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err) => {
        if (!err) {
            next();
            return;
        }
        console.log(err);


        if (err?.code === "LIMIT_UNEXPECTED_FILE") {
            res.status(400);
            res.json({
                status: 400,
                error: {
                    message: ["Unexpected input filed name: 'imagssse'."]
                }
            });
            return;
        }

        if (err instanceof multer.MulterError) {
            res.status(400);
            res.json({
                status: 400,
                error: {
                    message: ["Error happened while uploading"]
                }
            });
            return;
        } else if (err) {
            res.json({
                status: 400,
                error: {
                    message: ["Only .png, .webp, .gif, .jpg and .jpeg format allowed!"]
                }
            });
            return;
        }

        next();
    });
};

export default uploadingImageMiddleware;
