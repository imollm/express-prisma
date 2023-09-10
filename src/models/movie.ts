import { GenreModel } from "./genre.js";

interface IMovieModel {
  id: string;
  title: string;
  year: number;
  director: string;
  duration: number;
  poster: string;
  rate: number;
  genres: GenreModel[] | [];
}

export class MovieModel implements IMovieModel {
  id: string;
  title: string;
  year: number;
  director: string;
  duration: number;
  poster: string;
  rate: number;
  genres: GenreModel[] | [];

  constructor(
    id: string,
    title: string,
    year: number,
    director: string,
    duration: number,
    poster: string,
    rate: number,
    genres: GenreModel[]
  ) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.director = director;
    this.duration = duration;
    this.poster = poster;
    this.rate = rate;
    this.genres = genres;
  }
}
