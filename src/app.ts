import type { Express, Request, Response } from "express";
import express from "express";

import { webRoutes } from "./routes/web.js";
import { apiRoutes } from "./routes/api.js";

const app: Express = express();
const PORT = process.env.API_PORT || 3000;

app.use(express.json());

app.use("/", webRoutes);
app.use("/api/v1", apiRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
