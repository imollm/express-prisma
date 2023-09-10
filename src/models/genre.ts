import { MovieModel } from "./movie.js";

interface IGenreModel {
  id: string;
  name: string;
  movies: MovieModel[] | [];
}

export class GenreModel implements IGenreModel {
  id: string;
  name: string;
  movies: MovieModel[] | [];

  constructor(id: string, name: string, movies: MovieModel[]) {
    this.id = id;
    this.name = name;
    this.movies = movies;
  }
}
