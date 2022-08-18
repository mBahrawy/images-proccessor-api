import express, { Request, Response, Router } from "express";
import editImage from "./api/edit-image";
import createPlaceholder from "./api/create-placeholder";
import logger from "../utilities/logger";

const routes: Router = express.Router();

routes.get("/", logger, (req: Request, res: Response) => {
    res.send(`
        <h3>Hello to images proccessor API, Please choose an action to do:</h3>
        <ul>
            <li>go to <b>/create</b> to create an image placeholder</li>
            <li>go to <b>/edit</b> to edit an image</li>
        </ul>
    `);
});

routes.use("/create", createPlaceholder);
routes.use("/edit", editImage);

export default routes;
