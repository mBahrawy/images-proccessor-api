import path from "path";
import { PlaceholderImage } from "../interfaces/PlaceholderImage";

export const createPlaceholderImagePath = (image: PlaceholderImage): string => {
    return path.join(
        __basedir,
        "public",
        "images",
        "placeholders",
        `img_${image.width}X${image.height}_${image.background}_${image.text}_${image.textcolor}.png`
    );
};

export const createEditedImagePath = (image: string, id: string): string => {
    return path.join(__basedir, "public", "images", "edited-images", `${id}.png`);
};
