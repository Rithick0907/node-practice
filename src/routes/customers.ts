import { Router } from "express";
import Customer from "../model/customer";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).send(customers);
  } catch (ex) {
    res.status(400).json({
      message: ex,
    });
  }
});

export default router;
