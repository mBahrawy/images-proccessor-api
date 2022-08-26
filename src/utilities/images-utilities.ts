import { Extension } from './../interfaces/Image';
import sharp from "sharp";
import * as fs from "fs";
import { PlaceholderImage } from "../interfaces/PlaceholderImage";
import { Request } from "express";
import { createPlaceholderImagePath, createEditedImagePath } from "./path-utilities";
import { Image } from "../interfaces/Image";
import path from "path";

export const isImageExsists = (image: string): Boolean => {
    if (!image) return false;
    if (fs.existsSync(image)) return true;
    return false;
};

export const generateImageInfo = ({ query }: Request): PlaceholderImage => {
    return {
        ...(query?.width ? { width: +query.width } : { width: 300 }),
        ...(query?.height ? { height: +query.height } : { height: 300 }),
        ...(query?.text ? { text: `${query.text}` } : { text: "Placeholder" }),
        ...(query?.color ? { color: `#${query.color}` } : { color: "#000000" }),
        ...(query?.background ? { background: `#${query.background}` } : { background: `#ffffff` })
    };
};

export const generateEditImageInfo = ({ body, file }: Request): Image => {
    const originalFilename = file?.originalname as string;
    const originalExtention = path.extname(originalFilename).replace(".", "") || "png";
    return {
        ...(body?.width && { width: +body.width }),
        ...(body?.height && { height: +body.height }),
        ...(body?.extension ? { extension: body.extension } : { extension: originalExtention })
    };
};
export const generateEditLocalImageInfo = ({ query }: Request, filePath: string): Image => {
    const originalExtention = (path.extname(filePath).replace(".", "") || "png") as Extension;
    return {
        ...(query?.width && { width: +query.width }),
        ...(query?.height && { height: +query.height }),
        ...(query?.extension ? { extension: query.extension as Extension } : { extension: originalExtention })
    };
};

export const createTextSVG = (width: number, height: number, text: string, color: string) => {
    let modText = "";
    text.length <= 15 ? (modText = text) : (modText = text.slice(0, 15));
    return `
            <svg width="${width}" height="${height}">
                <style>
                    .title { fill: ${color}; font: bold 36px sans-serif;}
                </style>
                <text x="50%" y="50%" text-anchor="middle" class="title">${modText}</text>
            </svg>
            `;
};

export const createImage = async (imageInfo: PlaceholderImage): Promise<string | void> => {
    const svgBuffer = Buffer.from(createTextSVG(imageInfo.width, imageInfo.height, imageInfo.text, imageInfo.color));
    return await sharp({
        create: {
            width: imageInfo.width,
            height: imageInfo.height,
            background: imageInfo.background,
            channels: 3
        }
    })
        .png()
        .composite([{ input: svgBuffer, left: 0, top: 0 }])
        .toBuffer()
        .then((imageBuffer: Buffer) => {
            const imagePath = createPlaceholderImagePath(imageInfo);
            return new Promise<string | void>((resolve, reject) => {
                fs.writeFile(imagePath, imageBuffer, function (err) {
                    if (err) {
                        // eslint-disable-next-line no-console
                        console.log("error happned while creating image from buffer");
                        reject();
                    }
                    resolve(imagePath);
                });
            });
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
};

export const editedImage = async (imageBuffer: Buffer, imgaeId: string, imageOptions: Image): Promise<string | void> => {
    return await sharp(imageBuffer)
        .resize(imageOptions.width, imageOptions.height, {
            fit: sharp.fit.cover
        })
        .toFormat(imageOptions.extension as Extension)
        .toBuffer()
        .then((imageBuffer: Buffer) => {
            const imagePath = createEditedImagePath("image", imgaeId, imageOptions.extension as Extension);
            return new Promise<string | void>((resolve, reject) => {
                fs.writeFile(imagePath, imageBuffer, function (err) {
                    if (err) {
                        // eslint-disable-next-line no-console
                        console.log("error happned while creating image from buffer");
                        reject();
                    }
                    resolve(imagePath);
                });
            });
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
};
