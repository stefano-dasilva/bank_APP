import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadState } from "../../features/transitionSlice";
import IMAGES from "../../assets";

const Login = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errMSG, setErrMSG] = useState("");

  const [validForm, setvalidForm] = useState(false);

  useEffect(() => {
    if (user.username && user.password) {
      setvalidForm(true);
    } else {
      setvalidForm(false);
    }
  }, [user]);

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loadState([]));

    try {
        await axios.post("http://localhost:3001/auth/login", {
        username: user.username,
        password: user.password,
      });

      window.localStorage.setItem("isAuthenticated", true);
      setUser((prevUser) => ({
        ...prevUser,
        username: "",
        password: "",
      }));
      // dispatch(setAuthenticated());
      navigate("/Home");
    } catch (err) {
      setErrMSG(err.response.data.message);
    }
  };

  useEffect(()=>{
window.localStorage.setItem("isAuthenticated", false);
  },[])

  return (
    <div className="lg:flex justify-center items-center  w-screen h-screen bg-green-200">
      <div className="w-screen h-screen flex lg:flex lg:flex-row lg:w-[850px] lg:h-[600px]  ">
        <div className="hidden md:flex md:w-[65%] lg:flex lg:w-[65%]  ">
          <img
            src={IMAGES[0].image}
            alt="design"
            className="w-full h-auto overflow-hidden rounded-l-lg"
          />
        </div>
        <form
          className="w-full flex flex-col  bg-slate-50 p-2 justify-around rounded-r-lg lg:w-[35%] md:w-[35%]"
          onSubmit={handleSubmit}
        >
          <h1 className="font-montserrat text-green-900 font-bold px-2 text-center text-[20px]">
            Welcome to Transfers
          </h1>

          <div className="flex flex-col gap-2 p-2">
            <label htmlFor="username" className="text-green-700">
              username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              name="username"
              className="outline-none  p-1 border-[1px] border-[#001E2B] rounded-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <label htmlFor="password" className="text-green-700">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="outline-none p-1 border-[1px] border-[#001E2B] rounded-lg"
              value={user.password}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              disabled={!validForm}
              className={` border-[1px] bg-[#00ED64]  border-[#001E2B] text-[#001E2B] p-2 rounded-md w-[50%] m-auto ${
                validForm ? "" : "opacity-30"
              }`}
            >
              Login
            </button>
            <h1 className="mt-4 text-xs font-montserrat">
              Non hai ancora un account?
              <Link to="/register">
                <span className="text-green-700 cursor-pointer">
                  {" "}
                  Iscriviti
                </span>
              </Link>
            </h1>
            <h1>{errMSG}</h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
