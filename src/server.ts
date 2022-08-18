import express, { Application } from "express";
import morgan from "morgan";
import routes from "./routes/index";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.APP_BACKEND_PORT || 3000;

// create an instance server
const app: Application = express();

// HTTP request logger middleware
app.use(morgan("dev"));

app.use("/", routes);

// start express server
app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`);
});

export default app;
