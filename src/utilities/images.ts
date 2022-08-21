import sharp from "sharp";
import * as fs from "fs";
import { PlaceholderImage } from "./../interfaces/PlaceholderImage";
import { genUniqueId } from "./id-generator";
import { Request } from "express";
import { createPlaceholderImagePath, createEditedImagePath } from "./path-utilities";
import { Image } from "../interfaces/Image";

export const generateImageInfo = ({ query }: Request): PlaceholderImage => {
    return {
        ...(query?.width ? { width: +query.width } : { width: 300 }),
        ...(query?.height ? { height: +query.height } : { height: 300 }),
        ...(query?.text ? { text: `${query.text}` } : { text: "Placeholder" }),
        ...(query?.textcolor ? { textcolor: `#${query.textcolor}` } : { textcolor: "#000000" }),
        ...(query?.background ? { background: `#${query.background}` } : { background: `#ffffff` })
    };
};

export const generateIditImageInfo = ({ body }: Request): Image => {
    return {
        ...(body?.width && { width: +body.width }),
        ...(body?.height && { height: +body.height }),
        ...(body?.extension && { extension: body.extension })
    };
};

export const createTextSVG = (width: number, height: number, text: string, textcolor: string) => {
    let modText = "";
    text.length <= 15 ? (modText = text) : (modText = text.slice(0, 15));
    return `
            <svg width="${width}" height="${height}">
                <style>
                    .title { fill: ${textcolor}; font: bold 36px sans-serif;}
                </style>
                <text x="50%" y="50%" text-anchor="middle" class="title">${modText}</text>
            </svg>
            `;
};

export const createImage = async (image: PlaceholderImage): Promise<string | null> => {
    const svgBuffer = Buffer.from(createTextSVG(image.width, image.height, image.text, image.textcolor));
    const imagePath = createPlaceholderImagePath(image);

    return sharp({
        create: {
            width: image.width,
            height: image.height,
            background: image.background,
            channels: 3
        }
    })
        .png()
        .composite([{ input: svgBuffer, left: 0, top: 0 }])
        .toBuffer()
        .then((imgBuffer) => {
            fs.writeFileSync(createPlaceholderImagePath(image), imgBuffer);
            return imagePath;
        })
        .catch((e) => {
            console.log(e);
            return null;
        });
};

export const isImageExsists = (image: string): Boolean => {
    try {
        if (fs.existsSync(image)) {
            return true;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
    return false;
};

export const editedImage = async (imageBuffer: Buffer, imgaeId: string, imageOptions: Image): Promise<string | null> => {
    const imageFile = createEditedImagePath("image", imgaeId, imageOptions.extension);

    return sharp(imageBuffer)
        .resize(imageOptions.width, imageOptions.height, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFormat("png")

        .toBuffer()

        .then((imgBuffer) => {
            fs.writeFileSync(imageFile, imgBuffer);
            return imageFile;
        })
        .catch((e) => {
            console.log(e);
            return null;
        });
};
