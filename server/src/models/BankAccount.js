import mongoose, { Mongoose } from "mongoose";




const BankAccountSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId per il riferimento
    ref: "user", // Nome del
  },
  contacts: [
    {
      type: String,
      ref: "bankaccount", // Riferimento al modello "Contatto"
    },
  ],
});

export const BankAccountModel = mongoose.model("bankaccount",BankAccountSchema)