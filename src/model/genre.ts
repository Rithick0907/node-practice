import { Schema, Types, model } from "mongoose";
import yup from "../utils/validator";

export interface IGenre {
  id: Types.ObjectId;
  name: string;
}

const genreSchema = new Schema<IGenre>({
  id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
});

export const Genre = model("Genre", genreSchema);

export const validateGenre = async (genre: IGenre) => {
  try {
    const schema = yup.object().shape({
      id: yup.string(),
      name: yup.string().required(),
    });

    await schema.validate(genre);
  } catch (ex) {
    return ex;
  }
};
