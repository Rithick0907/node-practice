import express from "express";
import { connectDB } from "./database/initialize.js";
import genres from "./routes/genres";
import customers from "./routes/customers";

connectDB();

const app = express();

app.use(express.json());

const PORT = 5000;

app.use("/api/v1/genres", genres);

app.use("/api/v1/customers", customers);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
