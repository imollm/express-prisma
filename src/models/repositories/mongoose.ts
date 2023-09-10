import { connect } from "mongoose";
import { IRepository } from "./repository.interface.js";
import { MovieModel } from "../movie.js";
import { GenreModel } from "../genre.js";
import {
  MovieMongooseModel,
  GenreMongooseModel,
  MoviesGenresMongooseModel,
  IMovieMongooseModel,
  IGenreMongooseModel,
} from "../mongoose/index.js";

export class MongooseMovieRepository implements IRepository<MovieModel> {
  private static instance: MongooseMovieRepository | undefined;

  static getInstance(): MongooseMovieRepository {
    if (!MongooseMovieRepository.instance) {
      MongooseMovieRepository.instance = new MongooseMovieRepository();
      (async () =>
        await connect(process.env.MONGODB_URI as string, {
          dbName: "moviesdb",
        }))();
    }

    return MongooseMovieRepository.instance;
  }

  private buildModel(
    movie: IMovieMongooseModel,
    genres: IGenreMongooseModel[] = []
  ): MovieModel {
    return new MovieModel(
      movie.id as string,
      movie.title,
      movie.year as number,
      movie.director as string,
      movie.duration as number,
      movie.poster as string,
      movie.rate as number,
      genres.map(
        (genre: IGenreMongooseModel) =>
          new GenreModel(genre.id as string, genre.name as string, [])
      )
    );
  }

  private async getGenresByMovieId(
    movieId: string
  ): Promise<IGenreMongooseModel[]> {
    const moviesGenres = await MoviesGenresMongooseModel.find({ movieId });
    const genresIds = moviesGenres.map((mg) => mg.genreId);
    return await GenreMongooseModel.find({ _id: genresIds });
  }

  async getAll(): Promise<MovieModel[] | []> {
    try {
      const movies: MovieModel[] | never = [];
      const allMovies = await MovieMongooseModel.find({});

      for (let i = 0; i < allMovies.length; i++) {
        const movie = allMovies[i];
        const genresOfMovie = await this.getGenresByMovieId(movie.id);
        const movieWithGenres = this.buildModel(movie, genresOfMovie);
        movies.push(movieWithGenres);
      }

      return movies;
    } catch (error: any) {
      console.error(`MongooseMovieRepository::getAll error: ${error.message}`);
      return [];
    }
  }

  async getById(id: string): Promise<MovieModel | undefined> {
    try {
      const movie = await MovieMongooseModel.findById(id);

      if (movie) {
        const genresOfMovie = await this.getGenresByMovieId(movie.id);
        return this.buildModel(movie, genresOfMovie);
      }
    } catch (error: any) {
      console.error(`MongooseMovieRepository::getById error: ${error.message}`);
    }
  }

  async search(params: {}): Promise<MovieModel[] | []> {
    let moviesResult: IMovieMongooseModel[] = [];

    try {
      moviesResult = await MovieMongooseModel.find(params);
      return moviesResult.map((movie) => this.buildModel(movie));
    } catch (error: any) {
      console.error(`MongooseMovieRepository::search error: ${error.message}`);
      return [];
    }
  }

  async getByGenreName(genreName: string): Promise<MovieModel[] | []> {
    try {
      const movies = await MovieMongooseModel.find({ genres: genreName });
      return movies.map((movie) => this.buildModel(movie));
    } catch (error: any) {
      console.error(
        `MongooseMovieRepository::getByGenreName error: ${error.message}`
      );
      return [];
    }
  }
}

export class MongooseGenreRepository implements IRepository<GenreModel> {
  private static instance: MongooseGenreRepository | undefined;

  static getInstance(): MongooseGenreRepository {
    if (!MongooseGenreRepository.instance) {
      MongooseGenreRepository.instance = new MongooseGenreRepository();
      (async () =>
        await connect(process.env.MONGODB_URI as string, {
          dbName: "moviesdb",
        }))();
    }

    return MongooseGenreRepository.instance;
  }

  private buildModel(
    genre: IGenreMongooseModel,
    movies: IMovieMongooseModel[] = []
  ): GenreModel {
    return new GenreModel(
      genre.id as string,
      genre.name as string,
      movies.map(
        (m) =>
          new MovieModel(
            m.id as string,
            m.title,
            m.year as number,
            m.director as string,
            m.duration as number,
            m.poster as string,
            m.rate as number,
            []
          )
      )
    );
  }

  private async getMoviesByGenreId(
    genreId: string
  ): Promise<IMovieMongooseModel[]> {
    const moviesGenres = await MoviesGenresMongooseModel.find({ genreId });
    const moviesIds = moviesGenres.map((mg) => mg.movieId);
    return await MovieMongooseModel.find({ _id: moviesIds });
  }

  async getAll(): Promise<GenreModel[] | []> {
    try {
      const genres: GenreModel[] | never = [];
      const allGenres = await GenreMongooseModel.find({});

      for (let i = 0; i < allGenres.length; i++) {
        const genre = allGenres[i];
        const moviesOfGenre = await this.getMoviesByGenreId(genre.id);
        const genreWithMovies = this.buildModel(genre, moviesOfGenre);
        genres.push(genreWithMovies);
      }

      return genres;
    } catch (error: any) {
      console.error(`MongooseGenreRepository::getAll error: ${error.message}`);
      return [];
    }
  }

  async getById(id: string): Promise<GenreModel | undefined> {
    try {
      const genre = await GenreMongooseModel.findById(id);

      if (genre) {
        const moviesOfGenre = await this.getMoviesByGenreId(genre.id);
        return this.buildModel(genre, moviesOfGenre);
      }
    } catch (error: any) {
      console.error(`MongooseGenreRepository::getById error: ${error.message}`);
    }
  }

  async search(params: {}): Promise<GenreModel[] | []> {
    let genresResult: IGenreMongooseModel[] = [];

    try {
      genresResult = await GenreMongooseModel.find(params);
      return genresResult.map((genre) => this.buildModel(genre));
    } catch (error: any) {
      console.error(`MongooseMovieRepository::search error: ${error.message}`);
      return [];
    }
  }
}
