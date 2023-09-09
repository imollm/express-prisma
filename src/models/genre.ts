import { MovieModel } from "./movie.js";

export class GenreModel {
  id: string | undefined;
  name: string | undefined;
  movies: MovieModel[] | undefined;

  constructor(id?: string, name?: string, movies?: MovieModel[]) {
    this.id = id;
    this.name = name;
    this.movies = movies;
  }
}
