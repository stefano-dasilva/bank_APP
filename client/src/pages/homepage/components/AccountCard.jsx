import React from "react";
import { useState } from "react";
import TransitionCard from "./TransitionCard";
import TransferForm from "./TransferForm";
import {FaBalanceScaleLeft} from "react-icons/fa"
import { BsCalendar2Date } from "react-icons/bs";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import {AiOutlineEuro} from "react-icons/ai"
 
const AccountCard = ({ balance, number, transitions, contacts }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);


  const sortedTransitions = transitions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));



   
   const details_content = sortedTransitions?.map((transition, index) => (
     <TransitionCard
       key={index}
       amount={transition.amount}
       source_account={transition.source_account}
       destination_account={transition.destination_account}
       date={transition.date}
       number={number}
     />
   ));

  const handleShowDetails = () => {
    setShowDetail((prev) => !prev);
    if (showForm === true) {
      setShowForm(false);
    }
  };

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
    if (showDetail === true) {
      setShowDetail(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-[100px] ">
        <div className="flex flex-row items-center border-2 h-[30%] bg-darkgreen rounded-t-md ">
          <h1 className="font-karla font-semibold px-4  text-[#FFFFFF]">
            N° {number}
          </h1>
        </div>
        <div className="flex flex-row justify-between px-6 h-[70%] text-[#282929] bg-white  border-b-2">
          <div className=" flex flex-row font-karla gap-4 items-center">
            <FaBalanceScaleLeft className="text-[20px]"/>
            <span> saldo  </span>
            <span> { balance} €</span>
          </div>
          <div className="flex gap-5">
            <button
              className="cursor-pointer flex items-center h-[50%] p-2 my-auto rounded-md  tracking-wide bg-darkgreen text-white font-karla font-bold text-sm"
              onClick={handleShowDetails}
            >
              DETTAGLI
            </button>
            <button
              className="cursor-pointer flex h-[50%] my-auto items-center p-2  rounded-md  tracking-wide bg-darkgreen text-white  font-karla font-bold text-sm"
              onClick={handleShowForm}
            >
              TRASFERIMENTO
            </button>
          </div>
        </div>
      </div>
      {showDetail ? (
        <>
          <div className="flex flex-row  justify-around gap-12 py-4 text-[20px] bg-[#FFFFFF] text-black font-montserrat ">
            <BsCalendar2Date/>
            <BsArrowDownLeft/>
            <BsArrowUpRight/>
            <AiOutlineEuro/>         
          </div>
          <div className="flex flex-col gap-4 bg-white">

          {details_content}
          </div>
        </>
      ) : null}
      {showForm ? (
        <TransferForm
          source_account={number}
          balance={balance}
          contacts={contacts}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AccountCard;
