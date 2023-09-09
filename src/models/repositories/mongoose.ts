import { connect } from "mongoose";
import { IRepository } from "./repository.js";
import { MovieModel } from "../movie.js";
import { GenreModel } from "../genre.js";
import { MovieMongooseModel, GenreMongooseModel } from "../mongoose/index.js";

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

  private buildModel(movie: any): MovieModel {
    return new MovieModel(
      movie._id,
      movie.title,
      movie.year,
      movie.director,
      movie.duration,
      movie.poster,
      movie.rate,
      movie.genres.map((genre: string) => new GenreModel(undefined, genre))
    );
  }

  async getAll(): Promise<MovieModel[] | []> {
    try {
      const allMovies = await MovieMongooseModel.find({});
      return allMovies.map((movie) => this.buildModel(movie));
    } catch (error: any) {
      console.error(`MongooseMovieRepository::getAll error: ${error.message}`);
      return [];
    }
  }

  async getById(id: string): Promise<MovieModel | undefined> {
    try {
      const movie = await MovieMongooseModel.findById(id);

      if (movie) {
        return this.buildModel(movie);
      }
    } catch (error: any) {
      console.error(`MongooseMovieRepository::getById error: ${error.message}`);
    }
  }

  async search(params: {}): Promise<MovieModel[] | []> {
    let moviesResult: MovieModel[] = [];

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

  private buildModel(genre: any): GenreModel {
    return new GenreModel(genre._id, genre.name, genre.movies);
  }

  async getAll(): Promise<GenreModel[] | []> {
    try {
      const allMovies = await GenreMongooseModel.find({});
      console.log({ allMovies });
      return allMovies.map((movie) => this.buildModel(movie));
    } catch (error: any) {
      console.error(`MongooseGenreRepository::getAll error: ${error.message}`);
      return [];
    }
  }

  async getById(id: string): Promise<GenreModel | undefined> {
    try {
      const movie = await GenreMongooseModel.findById(id);

      if (movie) {
        return this.buildModel(movie);
      }
    } catch (error: any) {
      console.error(`MongooseGenreRepository::getById error: ${error.message}`);
    }
  }

  async search(params: {}): Promise<GenreModel[] | []> {
    let moviesResult: GenreModel[] = [];

    try {
      moviesResult = await GenreMongooseModel.find(params);
      return moviesResult.map((movie) => this.buildModel(movie));
    } catch (error: any) {
      console.error(`MongooseMovieRepository::search error: ${error.message}`);
      return [];
    }
  }
}
