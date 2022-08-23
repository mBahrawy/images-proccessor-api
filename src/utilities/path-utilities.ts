import path from "path";
import { PlaceholderImage } from "../interfaces/PlaceholderImage";
import { Request } from "express";

export const createPlaceholderImagePath = (image: PlaceholderImage): string => {
    return path.join(
        __basedir,
        "public",
        "images",
        "placeholders",
        `img_${image.width}X${image.height}_${image.background}_${image.text}_${image.color}.png`
    );
};

export const createEditedImagePath = (image: string, id: string, extension: string): string => {
    return path.join(__basedir, "public", "images", "edited-images", `${id}.${extension}`);
};

export const getPublicAssetUrl = (req: Request, file: string): string => {
    return `${req.protocol}://${req.get("host")}/${file}`;
};
