import express, { Application } from "express";
import morgan from "morgan";
import routes from "./routes/index";
import path from "path";
import cors from "cors";
import * as dotenv from "dotenv";
import * as fs from "fs";

// Defining app base folder
global.__basedir = __dirname;

// eslint-disable-next-line no-console
console.log(`App started in ${process.env.NODE_ENV} mode`);

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.APP_BACKEND_PORT || 3000;

// create an instance server
const app: Application = express();

// HTTP request logger middleware
app.use(morgan("dev"));

// Creating needed folders
const placeholderFolder = `${process.env.NODE_ENV === "development" ? "src" : "build"}/public/images/placeholders`;
const editedImagesFolder = `${process.env.NODE_ENV === "development" ? "src" : "build"}/public/images/edited-images`;
!fs.existsSync(placeholderFolder) && fs.mkdirSync(placeholderFolder, { recursive: true });
!fs.existsSync(editedImagesFolder) && fs.mkdirSync(editedImagesFolder, { recursive: true });

// Require static assets from public folder
app.use("/public", express.static(path.join(__dirname, "./public")));

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
    cors({
        origin: ["http://localhost:3001", "http://localhost:3000"]
    })
);
app.use("/", routes);

// start express server
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is starting at prot:${PORT}`);
});

export default app;
