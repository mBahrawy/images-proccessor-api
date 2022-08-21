export interface Image {
    width?: number;
    height?: number;
    extension: Extension;
}

export type Extension = "png" | "jpg" | "gif" | "webp";
