import type { Request, Response } from "express";
import { Router } from "express";

export const apiRoutes = Router();

import { moviesRouter } from "./movies.js";
import { genresRouter } from "./genres.js";

apiRoutes.get(
  "/healthcheck",
  (_: Request, res: Response): Response => res.send("OK")
);
apiRoutes.use("/movies", moviesRouter);
apiRoutes.use("/genres", genresRouter);
