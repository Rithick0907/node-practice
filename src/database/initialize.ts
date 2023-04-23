import { connect } from "mongoose";

export const connectDB = () => {
  connect("mongodb://localhost:27017/vidly").then(() => {
    console.log("DB Connected");
  });
};
