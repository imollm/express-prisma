"use strict";

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const MovieSchema = new Schema({
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
  genres: {
    type: Array,
    required: false,
  },
});

export const MovieModel = model("Movie", MovieSchema);
