import express, { Request, Response, Router } from "express";
import createPlaceholder from "./api/create-placeholder";
import editedImage from "./api/edit-image";
import logger from "../utilities/logger";
import path from "path";

const routes: Router = express.Router();

routes.get("/", logger, (req: Request, res: Response) => {
    res.render(path.join("pages", "index.ejs"));
});

// Backedend routes
routes.use("/create/api", createPlaceholder);
routes.use("/edit/api", editedImage);

// Frontend routes
routes.use("/edit", (req, res) => res.render(path.join("pages", "edit.ejs")));

export default routes;
