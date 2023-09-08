import { Router } from "express";

import { MoviesController } from "../controllers/movies.js";

export const moviesRouter = Router();

moviesRouter.get("/", MoviesController.getAll);
moviesRouter.get("/:id", MoviesController.getById);
moviesRouter.post("/search", MoviesController.searchMovies);
