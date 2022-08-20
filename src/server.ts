import express, { Application } from "express";
import morgan from "morgan";
import routes from "./routes/index";
import path from "path";
import * as ejs from "ejs";
import * as dotenv from "dotenv";

// Defining app base folder
global.__basedir = __dirname;

dotenv.config();

const PORT = process.env.APP_BACKEND_PORT || 3000;

// create an instance server
const app: Application = express();

// HTTP request logger middleware
app.use(morgan("dev"));

// TODO Create needed iamges folders if doesnt exixsts
// Require static assets from public folder
app.use(express.static(path.join(__dirname, "public")));

// Set 'views' directory for any views
app.set("views", path.join(__dirname, "views"));

// Set view engine as EJS
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use("/", routes);

// start express server
app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`);
});

export default app;
