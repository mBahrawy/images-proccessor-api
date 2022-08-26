import express, { Request, Response, Router } from "express";
import createPlaceholder from "./api/create-placeholder-api";
import editedImage from "./api/edit-image-api";
import editLocalImage from "./api/edit-local-image-api";
import logger from "../utilities/logging-untilities";

const routes: Router = express.Router();

routes.get("/", logger, (req: Request, res: Response) => {
    res.status(200).send(`
    <h2>Welcome to image proccessor API</h2>
        <ul>
            <li>Use <b>/Create</b> to create an image placeholder</li>
            <li>Use <b>/edit</b> to edit an image</li>
            <li>Use <b>/edit-local</b> to edit a local image</li>
        </ul>
    `);
});

// Backedend routes
routes.use("/create", createPlaceholder);
routes.use("/edit", editedImage);
routes.use("/edit-local", editLocalImage);
routes.get("*", logger, (req: Request, res: Response) => {
    res.status(404).send(`<h2>Sorry, no data found in this route, go to home route for more options on '/'</h2>`);
});

export default routes;
