import type { Express, Request, Response } from "express";
import express from "express";
import fs from "node:fs";

const app: Express = express();
const PORT = process.env.API_PORT || 3000;

app.get('/', (_: Request, res: Response) => {
    const indexHtml = fs.readFileSync('./src/web/index.html', { encoding: 'utf8' });
    res.send(indexHtml);
});

app.get('/api/healthcheck', (_: Request, res: Response): Response => {
    return res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));