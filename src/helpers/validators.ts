import Joi, { ValidationError } from "joi";

export class Validator {
  static areMovieSearchParamsValids(searchParams: {}):
    | ValidationError
    | undefined {
    try {
      const schema = Joi.object({
        title: Joi.string(),
        year: Joi.number(),
        director: Joi.string(),
        duration: Joi.number(),
        rate: Joi.number(),
      });
      return schema.validate(searchParams).error;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
