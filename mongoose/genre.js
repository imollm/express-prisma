"use strict";

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  movies: {
    type: Array,
    required: false,
  },
});

export const GenreModel = model("Genre", GenreSchema);
