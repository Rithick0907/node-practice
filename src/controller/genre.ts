import type { RequestHandler } from "express";
import { Genre, IGenre, validateGenre } from "../model/genre";
import { IError } from "../types/error.type";

interface RouteParams {
  id: string;
}

interface QueryParams {
  sortBy: "asc" | "desc";
}

export const getGenres: RequestHandler<
  {},
  {},
  { genre: IGenre[] },
  QueryParams
> = async (_, res) => {
  try {
    const genres = await Genre.find();

    res.status(200).json(genres);
  } catch (ex) {
    res.status(500).json("Internal Server Error");
  }
};

export const getGenre: RequestHandler<
  RouteParams,
  Partial<IGenre> | IError,
  IGenre,
  QueryParams
> = async ({ params: { id } }, res) => {
  try {
    const genre = await Genre.findById(id);

    if (!genre) throw new Error("Genre not found");

    res.status(200).json(genre);
  } catch (ex) {
    res.status(400).json({
      message: "Bad Request",
      description: ex as string,
    });
  }
};

export const createGenre: RequestHandler<
  {},
  Partial<IGenre> | IError,
  { genre: IGenre },
  QueryParams
> = async ({ body: { genre } }, res) => {
  try {
    await validateGenre(genre);
    const newGenre = new Genre({ ...genre });
    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (ex) {
    res.status(400).json({
      message: ex as string,
    });
  }
};

export const updateGenre: RequestHandler<
  RouteParams,
  Partial<IGenre> | IError,
  { genre: IGenre },
  QueryParams
> = async ({ params: { id }, body: { genre: updatedGenre } }, res) => {
  try {
    if (!updatedGenre) throw new Error("genre property must be present");

    await validateGenre(updatedGenre);
    const genre = await Genre.findByIdAndUpdate(id, updatedGenre, {
      new: true,
    });

    if (!genre) throw new Error("Genre not found");

    res.status(201).json(genre);
  } catch (ex) {
    res.status(400).json({
      message: ex as string,
    });
  }
};

export const deleteGenre: RequestHandler<
  RouteParams,
  Partial<IGenre> | IError,
  IGenre,
  QueryParams
> = async ({ params: { id } }, res) => {
  try {
    const deleteGenre = await Genre.findByIdAndDelete(id, {
      new: this,
    });
    if (!deleteGenre) throw new Error("Genre with given Id not exist");

    res.status(204).send();
  } catch (ex) {
    res.status(400).json({
      message: ex as string,
    });
  }
};
