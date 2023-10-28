import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../assets";
axios.defaults.withCredentials = true;

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    rppwd: "",
  });

  const [isValid, setIsValid] = useState("false");

  const [errorMessage, setErrorMessage] = useState("");

  const [regexValidation, setregexValidation] = useState("false");

  const handle_regex = () => {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phone_regex = /^(?:(?:\+|00)39|0)\d{6,14}$/;

    if (user.username.length < 4) {
      setregexValidation(false);
      setErrorMessage("Lo username deve contare almeno 4 caratteri");
      return;
    }
    if (!email_regex.test(user.email)) {
      setregexValidation(false);
      setErrorMessage("Inserisca un email valida");
      return;
    }
    if (!phone_regex.test(user.phone)) {
      setregexValidation(false);
      setErrorMessage("Inserisca un numero di telefono valido");
      return;
    }
    setregexValidation(true);
    return;
  };

  const handleValidation = (e) => {
    e.preventDefault();
    handle_regex();
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (regexValidation === true) {
      console.log(regexValidation);
      try {
        console.log("sono qui");

        const result = await axios.post("http://localhost:3001/auth/register", {
          username: user.username,
          password: user.password,
          email: user.email,
          phone: user.phone,
        });

        window.localStorage.setItem("isAuthenticated", true);
        //dispatch(setUserID(result.data.userID));
        setUser((prevUser) => ({
          ...prevUser,
          username: "",
          password: "",
          email: "",
          phone: "",
          rppwd: "",
        }));

        try {
          // Seconda chiamata al server solo se la prima ha avuto successo
          await axios.post(
            "http://localhost:3001/account/createaccount",

            {
              withCredentials: true,
            }
          );
          navigate("/Home");
        } catch (secondErr) {
          console.error("Errore nella seconda chiamata:", secondErr);
          setErrorMessage("Errore nella seconda chiamata");
        }

        navigate("/Home");
      } catch (err) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (
      user.username &&
      user.password &&
      user.email &&
      user.rppwd &&
      user.phone
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (user.password && user.rppwd) {
      if (user.password !== user.rppwd) {
        setErrorMessage("Le due password non coincidono");
      } else {
        setErrorMessage("");
      }
    } else setErrorMessage("");
  }, [user.password, user.rppwd]);

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center border-2  w-screen h-screen bg-green-200">
      <div className="flex flex-row w-[850px] h-[600px]">
        <div className="flex w-[65%]  ">
          <img
            src={IMAGES[0].image}
            alt="design"
            className="w-full h-auto overflow-hidden rounded-l-lg"
          />
        </div>
        <form className=" flex flex-col  bg-slate-50 p-2 justify-between rounded-r-lg w-[35%]">
          <h1 className="font-montserrat text-green-900 font-bold px-2 text-center text-[20px] mb-8">
            Register Page
          </h1>
          <div className="flex flex-col gap-2 p-2">
            <label htmlFor="username" className="text-green-700">
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              placeholder=""
              className="outline-none  p-1 border-[1px] border-[#001E2B] rounded-lg "
              required
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <label htmlFor="password" className="text-green-700">
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              className="outline-none  p-1 border-[1px] border-[#001E2B] rounded-lg "
              value={user.password}
              required
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <label htmlFor="rppwd" className="text-green-700">
              ripeti password
            </label>
            <input
              type="password"
              name="rppwd"
              id="rppwd"
              placeholder=""
              className="outline-none  p-1 border-[1px] border-[#001E2B] rounded-lg "
              value={user.rppwd}
              required
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <label htmlFor="email" className="text-green-700">
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder=""
              className="outline-none  p-1 border-[1px] border-[#001E2B] rounded-lg "
              required
              value={user.email}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <label htmlFor="phone" className="text-green-700">
              cellulare
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder=""
              className="outline-none  p-1 border-[1px] border-[#001E2B] rounded-lg "
              required
              value={user.phone}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={`border-[1px] bg-[#00ED64]  border-[#001E2B] text-[#001E2B] p-2 rounded-md w-[50%] m-auto ${
              isValid ? "" : "opacity-30"
            }`}
            onClick={(e) => handleValidation(e)}
          >
            Register
          </button>
          <h3 className="text-sm">{errorMessage}</h3>
        </form>
      </div>
    </div>
  );
};

export default Register;
