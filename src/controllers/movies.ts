import { Validator } from "../helpers/validators.js";
import { MovieModel } from "../models/movie.js";
import { MySQLRepository as Repository } from "../models/repositories/mysql.js";

export class MoviesController {
  static async getAll(_: any, res: any): Promise<MovieModel[] | []> {
    try {
      const movies = await Repository.getInstance().getAllMovies();
      return res.json(movies);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  static async getById(req: any, res: any): Promise<MovieModel | undefined> {
    try {
      const { id } = req.params;
      const movie = await Repository.getInstance().getMovieById(id);

      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      return res.json(movie);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  static async searchMovies(
    req: any,
    res: any
  ): Promise<MovieModel | undefined> {
    try {
      const body = req.body;

      if (Validator.areMovieSearchParamsValids(body)) {
        return res.status(400).json({
          error: "Error building searchParams",
          searchParams: { ...body },
        });
      }

      const movies = await Repository.getInstance().searchMovies(body);

      if (movies.length === 0) {
        return res
          .status(404)
          .json({ error: "No movies found", searchParams: { ...body } });
      }

      return res.json(movies);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}
