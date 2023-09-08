import type { Express, Request, Response } from "express";
import express from "express";
import { webRoutes } from "./routes/web.js";

const app: Express = express();
const PORT = process.env.API_PORT || 3000;

app.get('/', (_: Request, res: Response) => {
    const indexHtml = fs.readFileSync('./src/web/index.html', { encoding: 'utf8' });
    res.send(indexHtml);
});

app.use("/", webRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));