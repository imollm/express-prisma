"use strict";

import { connect, disconnect } from "mongoose";
import {
  MovieMongooseModel,
  GenreMongooseModel,
  MoviesGenresMongooseModel,
} from "../../models/mongoose/index.js";
import { movies, genres, moviesGenres } from "../../mockData.js";

try {
  await connect(process.env.MONGODB_URI as string, { dbName: "moviesdb" });
  await GenreMongooseModel.create(genres);
  await MovieMongooseModel.create(movies);

  // Populate the intermediate table
  for (let i = 0; i < movies.length; i++) {
    const moviesResult = await MovieMongooseModel.find({
      title: movies[i].title,
    });
    const movieId = moviesResult[0]._id.toString();
    const genreNames = moviesGenres
      .filter((relation) => relation.movieTitle === movies[i].title)
      .map((movieGenres) => movieGenres.genreName);

    const genresResult = await GenreMongooseModel.find({ name: genreNames });

    for (let j = 0; j < genresResult.length; j++) {
      await MoviesGenresMongooseModel.create({
        movieId: movieId,
        genreId: genresResult[j]._id.toString(),
      });
    }
  }

  console.log("Database was seeded successfully");
} catch (error: any) {
  console.error(`Error while seeding MongoDB database ${error.message}`);
} finally {
  await disconnect();
}
