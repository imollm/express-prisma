import { IRepository } from "./repository.interface.js";
import { MovieModel } from "../movie.js";
import { GenreModel } from "../genre.js";
import { PrismaClient } from "@prisma/client";

export class MySQLMovieRepository implements IRepository<MovieModel> {
  private static prismaClient: PrismaClient;
  private static instance: MySQLMovieRepository | undefined;

  private constructor() {}

  static getInstance(): MySQLMovieRepository {
    if (!MySQLMovieRepository.instance) {
      MySQLMovieRepository.instance = new MySQLMovieRepository();
      MySQLMovieRepository.prismaClient = new PrismaClient();
    }

    return MySQLMovieRepository.instance;
  }

  private buildModel(movie: any): MovieModel {
    return new MovieModel(
      movie.id.toString(),
      movie.title,
      movie.year,
      movie.director,
      movie.duration,
      movie.poster,
      movie.rate.toNumber(),
      movie.genres.map(
        (genre: any) =>
          new GenreModel(genre.id as string, genre.name as string, [])
      )
    );
  }

  async getAll(): Promise<MovieModel[] | []> {
    try {
      const allMovies = await MySQLMovieRepository.prismaClient.movie.findMany({
        include: { genres: true },
      });
      return allMovies.map((movie) => this.buildModel(movie));
    } catch (error: any) {
      console.error(`MySQLMovieRepository::getAll error: ${error.message}`);
      return [];
    }
  }

  async getById(movieId: string): Promise<MovieModel | undefined> {
    try {
      const movie = await MySQLMovieRepository.prismaClient.movie.findFirst({
        where: { id: Number(movieId) },
        include: { genres: true },
      });

      if (movie) {
        return this.buildModel(movie);
      }
    } catch (error: any) {
      console.error(`MySQLMovieRepository::getById error: ${error.message}`);
    }
  }

  async search(params: {}): Promise<MovieModel[] | []> {
    let moviesResult: MovieModel[] = [];

    try {
      const movies = await MySQLMovieRepository.prismaClient.movie.findMany({
        where: params,
        include: { genres: true },
      });
      if (movies && movies.length > 0) {
        moviesResult = movies.map((movie) => this.buildModel(movie));
      }
    } catch (error: any) {
      console.error(`MySQLMovieRepository::search error: ${error.message}`);
    } finally {
      return moviesResult;
    }
  }
}

export class MySQLGenreRepository implements IRepository<GenreModel> {
  private static prismaClient: PrismaClient;
  private static instance: MySQLGenreRepository | undefined;

  private constructor() {}

  static getInstance(): MySQLGenreRepository {
    if (!MySQLGenreRepository.instance) {
      MySQLGenreRepository.instance = new MySQLGenreRepository();
      MySQLGenreRepository.prismaClient = new PrismaClient();
    }

    return MySQLGenreRepository.instance;
  }

  private buildModel(genre: any): GenreModel {
    return new GenreModel(
      genre.id as string,
      genre.name,
      genre.movies?.map(
        (movie: any) =>
          new MovieModel(
            movie.id as string,
            movie.title,
            movie.year,
            movie.director,
            movie.duration,
            movie.poster,
            movie.rate as number,
            []
          )
      )
    );
  }

  async getAll(): Promise<GenreModel[] | []> {
    try {
      const allGenres = await MySQLGenreRepository.prismaClient.genre.findMany({
        include: { movies: true },
      });
      return allGenres.map((movie) => this.buildModel(movie));
    } catch (error: any) {
      console.error(`MySQLGenreRepository::getAll error: ${error.message}`);
      return [];
    }
  }

  async getById(movieId: string): Promise<GenreModel | undefined> {
    try {
      const movie = await MySQLGenreRepository.prismaClient.genre.findFirst({
        where: { id: Number(movieId) },
        include: { movies: true },
      });

      if (movie) {
        return this.buildModel(movie);
      }
    } catch (error: any) {
      console.error(`MySQLGenreRepository::getById error: ${error.message}`);
    }
  }

  async search(params: {}): Promise<GenreModel[] | []> {
    let genresResult: GenreModel[] = [];

    try {
      const genres = await MySQLGenreRepository.prismaClient.genre.findMany({
        where: params,
        include: { movies: true },
      });
      if (genres && genres.length > 0) {
        genresResult = genres.map((movie) => this.buildModel(movie));
      }
    } catch (error: any) {
      console.error(`MySQLGenreRepository::search error: ${error.message}`);
    } finally {
      return genresResult;
    }
  }
}
