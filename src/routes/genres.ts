import { Router } from "express";

import { GenreController } from "../controllers/genre.js";

export const genresRouter = Router();

genresRouter.get("/", GenreController.getAll);
genresRouter.get("/:id", GenreController.getById);
genresRouter.post("/search", GenreController.searchMovies);
