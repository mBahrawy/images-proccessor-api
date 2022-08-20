import sharp from "sharp";
import { PlaceholderImage } from "./../interfaces/PlaceholderImage";
import { Request } from "express";
import * as fs from "fs";

export const generateImageInfo = ({ query }: Request): PlaceholderImage => {
    return {
        ...(query?.width ? { width: +query.width } : { width: 300 }),
        ...(query?.height ? { height: +query.height } : { height: 300 }),
        ...(query?.text ? { text: `${query.text}` } : { text: "Placeholder" }),
        ...(query?.textcolor ? { textcolor: `#${query.textcolor}` } : { textcolor: "#000000" }),
        ...(query?.background ? { background: `#${query.background}` } : { background: `#ffffff` })
    };
};

export const generateImageDirectory = (image: PlaceholderImage): string => {
    // eslint-disable-next-line
    return `${__basedir}\\images\\placeholders\\img_${image.width}X${image.height}_${image.background}_${image.text}_${image.textcolor}.png`;
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

export const createImage = async (image: PlaceholderImage) => {
    const svgBuffer = Buffer.from(createTextSVG(image.width, image.height, image.text, image.textcolor));
    const imageFile = generateImageDirectory(image);
    try {
        await sharp({
            create: {
                width: image.width,
                height: image.height,
                background: image.background,
                channels: 3
            }
        })
            .png()
            .composite([{ input: svgBuffer, left: 0, top: 0 }])
            .toFile(imageFile);
        return imageFile;
    } catch (e) {
        // eslint-disable-next-line
        console.log(e);
    }
};

export const isImageExsists = (image: PlaceholderImage): Boolean => {
    const imageFile = generateImageDirectory(image);
    try {
        if (fs.existsSync(imageFile)) {
            return true;
        }
    } catch (err) {
        // eslint-disable-next-line
        console.error(err);
        return false;
    }

    return false;
};
