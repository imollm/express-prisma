"use strict";

import { Schema, model } from "mongoose";

export interface IMovieMongooseModel extends Document {
  id: String;
  title: string;
  year: Number;
  director: String;
  duration: Number;
  poster: String;
  rate: Number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGenreMongooseModel extends Document {
  id: String;
  name: String;
  createdAt: Date;
  updatedAt: Date;
}

interface IMoviesGenresMongooseModel {
  movieId: String;
  genreId: String;
}

const MovieSchema = new Schema<IMovieMongooseModel>({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
    required: false,
  },
  rate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const GenreSchema = new Schema<IGenreMongooseModel>({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const MoviesGenresSchema = new Schema<IMoviesGenresMongooseModel>({
  movieId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  genreId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const MovieMongooseModel = model<IMovieMongooseModel>(
  "Movie",
  MovieSchema
);
export const GenreMongooseModel = model<IGenreMongooseModel>(
  "Genre",
  GenreSchema
);
export const MoviesGenresMongooseModel = model<IMoviesGenresMongooseModel>(
  "MoviesGenres",
  MoviesGenresSchema
);
