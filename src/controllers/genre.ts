import { Validator } from "../helpers/validators.js";
import { GenreModel } from "../models/genre.js";
import { MySQLGenreRepository as GenreRepository } from "../models/repositories/mysql.js";

export class GenreController {
  static async getAll(_: any, res: any): Promise<GenreModel[] | []> {
    try {
      const genres = await GenreRepository.getInstance().getAll();
      return res.json(genres);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  static async getById(req: any, res: any): Promise<GenreModel | undefined> {
    try {
      const { id } = req.params;
      const genre = await GenreRepository.getInstance().getById(id);

      if (!genre) {
        return res.status(404).json({ error: "Genre not found" });
      }

      return res.json(genre);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  static async searchMovies(
    req: any,
    res: any
  ): Promise<GenreModel | undefined> {
    try {
      const body = req.body;

      if (Validator.areGenreSearchParamsValids(body)) {
        return res.status(400).json({
          error: "Error building searchParams",
          searchParams: { ...body },
        });
      }

      const genres = await GenreRepository.getInstance().search(body);

      if (genres.length === 0) {
        return res
          .status(404)
          .json({ error: "No genres found", searchParams: { ...body } });
      }

      return res.json(genres);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}
