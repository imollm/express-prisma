"use strict";

import { connect, disconnect } from "mongoose";
import { MovieModel } from "../movie.js";
import { GenreModel } from "../genre.js";
import { movies, genres } from "../../mockData.js";

try {
  await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "moviesdb",
  });
  await GenreModel.create(genres);
  await MovieModel.create(movies);
} catch (error) {
  console.error(`Error while seeding MongoDB database ${error.message}`);
} finally {
  try {
    await disconnect();
  } catch (error) {
    console.error(`Error while disconnecting MongoDB ${error.message}`);
  }
}
