import { model, Schema } from "mongoose";

const customerSchema = new Schema({
  isGold: Boolean,
  name: String,
  phone: String,
});

const Customer = model("Customer", customerSchema);

export default Customer;
