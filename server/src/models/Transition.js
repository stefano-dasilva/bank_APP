import mongoose, { Mongoose } from "mongoose";

const TransitionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  source_account: {
    type: String, // Tipo String per il numero del conto bancario
    required: true,
    ref: "bankaccount",
  },
  destination_account: {
    type: String, // Tipo String per il numero del conto bancario
    required: true,
    ref: "bankaccount",
  },
});

export const TransitionModel = mongoose.model(
  "transition",
  TransitionSchema
);
