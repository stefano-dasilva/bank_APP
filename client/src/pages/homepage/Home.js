import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import AccountCard from "./components/AccountCard";
import { loadState } from "../../features/transitionSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { Oval } from "react-loader-spinner";

axios.defaults.withCredentials = true;

const Home = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [load, setLoad] = useState(false);

  const account_list = useSelector(
    (state) => state.account_details_list.account_details
  );

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/auth/logout/`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      window.localStorage.setItem("isAuthenticated", false);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/account/getaccounts/`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.results);
      setUsername(response.data.username);
      dispatch(loadState(response.data.results));
      setLoad(true);
    } catch (err) {
      navigate("/");
    }
  };

  useEffect(() => {
    handleRequest();
  }, []);

  return load === true ? (
    <div className="bg-[#ccffe0] min-h-[1000px] relative">
      <FiLogOut
        className="absolute top-2 right-2 cursor-pointer w-[50px] h-[50px] text-green"
        onClick={handleLogout}
      />
      <div className="flex flex-col w-[70%]  m-auto">
        <div className="bg-darkgreen rounded-xl flex flex-row justify-start items-center h-[150px] mb-20 text-white border-[1.5px]">
          <h1 className="text-white ml-8 font-poppins font-bold  text-3xl">
            {" "}
            Welcome back {username}
          </h1>
        </div>
        {account_list?.map((account, index) => {
          return (
            <AccountCard
              key={index}
              balance={account?.balance}
              number={account?.number}
              transitions={account?.transitions}
              contacts={account?.contacts}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className="flex w-screen h-screen justify-center items-center">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Home;
