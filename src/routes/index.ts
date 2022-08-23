import express, { Request, Response, Router } from "express";
import createPlaceholder from "./api/create-placeholder";
import editedImage from "./api/edit-image";
import logger from "../utilities/logger";

const routes: Router = express.Router();

routes.get("/", logger, (req: Request, res: Response) => {
    res.status(200).send(`
    <h2>Welcome to image proccessor API</h2>
        <ul>
            <li>Use <b>/Create</b> to create an image placeholder</li>
            <li>Use <b>/edit</b> to edit an image</li>
        </ul>
    `);
});

// Backedend routes
routes.use("/create", createPlaceholder);
routes.use("/edit", editedImage);

export default routes;
