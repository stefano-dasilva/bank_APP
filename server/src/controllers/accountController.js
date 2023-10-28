import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { BankAccountModel } from "../models/BankAccount.js";
import { TransitionModel } from "../models/Transition.js";

const getAccounts = async (req, res) => {
  try {
    const user = await UserModel.findById(req.id);
    if (!user) {
      return res.status(404).json({ message: `l'utente  non esiste ` });
    }
    const bankAccounts = await BankAccountModel.find({
      owner: req.id,
    });

    const results = [];

    for (const account of bankAccounts) {
      const transactions = await TransitionModel.find({
        $or: [
          { source_account: account.number },
          { destination_account: account.number },
        ],
      });

      results.push({
        number: account.number,
        balance: account.balance,
        contacts : account.contacts,
        transitions: transactions?.map((transaction) => ({
          date: transaction?.date,
          amount: transaction?.value,
          source_account: transaction?.source_account,
          destination_account: transaction?.destination_account,
        })),
      });
    }

    return res.status(201).json({ username : user.username, results });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `errore nella creazione di ${req.id} ` });
  }
};
const createAccount = async (req, res) => {
  try {
    const  userID  = req.id;
    const min = 100000000000; // Il valore minimo di 12 cifre
    const max = 999999999999; // Il valore massimo di 12 cifre
    const randomAccountNumber =
      Math.floor(Math.random() * (max - min + 1)) + min;
    randomAccountNumber.toString();
    const balance = 0;

    const user = await UserModel.findOne({ _id: userID });
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    const newAccount = new BankAccountModel({
      number: randomAccountNumber,
      balance: balance,
      owner: userID,
    });

    await newAccount.save();
    return res.status(201).json({ message: "conto creato" });
  } catch (error) {
    return res.status(500).json({ message: "conto non creato" });
  }
};



export { getAccounts, createAccount };
