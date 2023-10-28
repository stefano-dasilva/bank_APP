import React from "react";

const TransitionCard = ({
  amount,
  source_account,
  destination_account,
  date,
  number,
}) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const data_date = new Date(date);

  const formatDate = data_date.toLocaleString("it-IT", options);

  const dataSenzaBarre = formatDate.replace(/\//g, ",");

  return (
    <div className="flex flex-row  justify-around gap-8 bg-[#FFFFFF] font-montserrat ">
      <span className="text-black text-sm  px-2 text-center w-[25%] "> {dataSenzaBarre}</span>
      <span className="text-black text-sm  px-2 text-center w-[25%] ">
        {" "}
        {destination_account}
      </span>
      <span className="text-black text-sm  px-2 text-center w-[25%] ">{source_account}</span>

      <span className="text-black text-sm  px-2 text-center w-[25%] ">
         {number === source_account ? "-" : "+"} {amount} €
      </span>
    </div>
  );
};

export default TransitionCard;
