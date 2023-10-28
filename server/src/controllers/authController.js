import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const register = async (req, res) => {
  const { username, password, email, phone } = req.body;

  try {
    if (!username || !password || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserModel.findOne({ username: username }).exec();

    if (user) {
      return res
        .status(400)
        .json({ message: `user ${username}  already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
      email: email,
      phone: phone,
    });

    await newUser.save();

    const user_id = newUser._id;
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie(String(user_id), token, {
      path: '/',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "lax",
    });
   
   
    return res.status(201).json({ token, userID: user_id });
  } catch (error) {
    return res.status(500).json({ message: "errore nella creazione" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const user = await UserModel.findOne({ username: username }).exec();

    if (!user) {
      return res
        .status(400)
        .json({ message: `user ${username} does not exists` });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "incorrect password" });
    }
    const user_id = user._id;
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie(String(user_id), token, {
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(201).json({ token, userID: user_id });
  } catch (error) {
    return res.status(500).json({ messaggio: "errore nella creazione" });
  }
};

const logout = (req, res) => {
  try {
    const userId = req.id; // Recupera l'ID dell'utente dal token JWT

    // Cancella il cookie corrispondente all'ID dell'utente
    res.clearCookie(String(userId));
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Error during logout" });
  }
};

export { register, login, logout };
