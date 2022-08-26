import path from "path";
import { Request, Response } from "express";
import { Image } from "../interfaces/Image";
import { editedImage, generateEditLocalImageInfo, isImageExsists } from "../utilities/images-utilities";
import { genUniqueId } from "../utilities/string-utlities";
import * as fs from "fs";

const editLocalImageController = (req: Request, res: Response) => {
    const localImagePath = path.join(__basedir, "../", "local-image.png");
    const editOptions: Image = generateEditLocalImageInfo(req, localImagePath);
    const imgaeId = genUniqueId();
    let localImageBuffer: Buffer;

    try {
        localImageBuffer = fs.readFileSync(localImagePath);
    } catch (e) {
        res.status(500).json({
            status: 500,
            error: {
                message: ["Local image not found"]
            }
        });
        return;
    }

    editedImage(localImageBuffer, imgaeId, editOptions).then((resultedImagePath): void => {
        if (!resultedImagePath || !isImageExsists(resultedImagePath as string)) {
            res.status(500).json({
                status: 500,
                error: {
                    message: ["Internal server error"]
                }
            });
            return;
        }

        res.status(200).sendFile(resultedImagePath);
    });
};

export default editLocalImageController;
