"use strict";

import { connect, disconnect } from "mongoose";
import {
  MovieMongooseModel,
  GenreMongooseModel,
  MoviesGenresMongooseModel,
} from "../../models/mongoose/index.js";

try {
  await connect(process.env.MONGODB_URI as string, { dbName: "moviesdb" });
  await GenreMongooseModel.deleteMany({});
  await MovieMongooseModel.deleteMany({});
  await MoviesGenresMongooseModel.deleteMany({});
} catch (error: any) {
  console.error(`Error while seeding MongoDB database ${error.message}`);
} finally {
  try {
    await disconnect();
  } catch (error: any) {
    console.error(`Error while disconnecting MongoDB ${error.message}`);
  }
}
