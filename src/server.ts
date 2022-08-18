import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import routes from "./routes/index";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// create an instance server
const app: Application = express();

// HTTP request logger middleware
app.use(morgan("dev"));

app.use('/api', routes);

// add routing for / path
// app.get("/", (req: Request, res: Response) => {
//     console.log('query->', req.query);
    
//     console.log(req);

//     res.json({
//         message: `Hello World 🌍`
//     });
// });

// start express server
app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`);
});

export default app;
