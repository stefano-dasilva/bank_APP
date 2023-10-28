import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TransitionModel } from "../models/Transition.js";
import { BankAccountModel } from "../models/BankAccount.js";
import { UserModel } from "../models/Users.js";

const makeTransition = async (req, res) => {
  const { number_source_account, number_destination_account, amount, save } =
    req.body;

  const userid = req.id;
  console.log(save);

  try {
    const user = await UserModel.findById(userid);
    if (!user) {
      return res.status(400).json({ messaggio: "non esiste tale user" });
    }

    const account_sorgente = await BankAccountModel.findOne({
      number: number_source_account,
    });
    const account_destinazione = await BankAccountModel.findOne({
      number: number_destination_account,
    });

    if (!account_sorgente) {
      return res
        .status(401)
        .json({ message: "non esiste tale conto sorgente" });
    }
    if (!account_destinazione) {
      return res
        .status(401)
        .json({ message: "non esiste tale conto di destinazione" });
    }

    if (number_source_account === number_destination_account) {
      return res
        .status(400)
        .json({ message: "non puoi inviare soldi a te stesso" });
    }

    if (account_sorgente.balance - amount <= 0) {
      return res.status(400).json({
        message: " non hai abbastanza soldi per effettuare questo deposito",
      });
    }

    const date = new Date();

    const new_transition = new TransitionModel({
      date: date,
      value: amount,
      source_account: number_source_account,
      destination_account: number_destination_account,
    });

    await new_transition.save();
    account_sorgente.balance = account_sorgente.balance - amount;
    account_destinazione.balance =
      parseFloat(account_destinazione.balance) + parseFloat(amount);
    if (save === true) {
      if (!account_sorgente.contacts.includes(number_destination_account)) {
        account_sorgente.contacts.push(number_destination_account);
      }
    }
    account_sorgente.save();
    account_destinazione.save();

    return res.status(201).json({ message: "è stata salvata la transizione" });
  } catch (err) {
    res.status(401).json({ message: "sbagliato" });
  }
};

export { makeTransition };
