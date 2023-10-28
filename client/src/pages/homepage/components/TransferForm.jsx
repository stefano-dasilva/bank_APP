import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addTransitions } from "../../../features/transitionSlice";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsArrowUpRight, BsArrowLeftRight } from "react-icons/bs";
import { AiOutlineEuro } from "react-icons/ai";

const TransferForm = ({ source_account, balance, contacts }) => {
  const [inputValues, setInputValues] = useState({
    number_source_account: source_account,
    number_destination_account: "",
    amount: 0,
    save: false,
  });

  const [errDst, seterrDst] = useState("");
  const [errAmount, seterrAmount] = useState("");
  const [toggle, setToggle] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const dispatch = useDispatch();

  const ChangeNumberDestination = (value) => {
    setInputValues((prev) => ({
      ...prev,
      number_destination_account: value,
    }));
    setSelectedSuggestion(value);
    setShowSuggestion(false);
  };
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    handleInputValues("save", isChecked);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleInputValues = (field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelection = (field, value) => {
    setSelectedSuggestion(value);
    handleInputValues(field, value);
  };

  useEffect(() => {
    console.log(inputValues.number_destination_account);
  }, [inputValues.number_destination_account]);

  useEffect(() => {
    console.log(showSuggestion);
  }, [showSuggestion]);

  useEffect(() => {
    if (inputValues.number_destination_account === "") {
      setSuggestions([]);
    } else {
      const matchedstrings = contacts.filter((contact) =>
        contact
          .toLowerCase()
          .startsWith(inputValues.number_destination_account.toLowerCase())
      );
      setSuggestions(matchedstrings);
      if (matchedstrings?.length > 0) {
        setShowSuggestion(true);
      } else {
        setShowSuggestion(false);
      }
    }
  }, [inputValues.number_destination_account]);

  const validateForm = () => {
    const number_regex = /^\d{12}$/;
    const test_regex = number_regex.test(
      inputValues.number_destination_account
    );
    const correct_amount = balance - inputValues.amount > 0;
    const test_amount = inputValues.amount > 0;
    if (test_regex && test_amount && correct_amount) {
      return true;
    } else {
      if (!test_regex) {
        seterrDst("Inserisci un numero valido");
        return false;
      }
      if (!test_amount) {
        seterrAmount("Il numero dev'essere positivo");
        return false;
      }
      if (!test_amount) {
        seterrAmount("Non hai abbastanza soldi");
        return false;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setToggle(false);

    try {
      await axios.post("http://localhost:3001/transition", {
        number_source_account: inputValues.number_source_account,
        number_destination_account: inputValues.number_destination_account,
        amount: inputValues.amount,
        save: inputValues.save,
      });

      dispatch(addTransitions(inputValues));

      setInputValues((prevUser) => ({
        ...prevUser,
        number_source_account: source_account,
        number_destination_account: "",
        amount: "",
      }));
      // dispatch(setAuthenticated());
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const showConfirm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setToggle(true);
      seterrAmount("");
      seterrDst("");
    }
  };

  return (
    <>
      <form
        className="bg-white p-2  flex flex-col justify-around h-[300px] lg:h-[200px]"
        onSubmit={(e) => showConfirm(e)}
      >
        <div className="flex flex-row justify-around items-center  lg:flex-row">
          <label
            htmlFor="number_destination_account "
            className="flex flex-col relative   "
          >
            <div className="flex flex-row items-center gap-4">
              <span className="py-2 font-karla">destinazione </span>
              <BsArrowUpRight />
            </div>
            <input
              type="text"
              id="number_destination_account"
              name="number_destination_account"
              autoComplete="off"
              value={selectedSuggestion}
              onChange={(e) => handleSelection(e.target.name, e.target.value)}
              className={`outline-none  p-1 border-[1.5px] ${
                errDst === "" ? "border-[#D1D5DB]" : "border-[#FCA5A5]"
              }     ${
                showSuggestion ? "rounded-b-none rounded-t-lg" : "rounded-lg"
              }`}
            />
            <div className="absolute top-[100%] left-0  flex-col w-full">
              {showSuggestion &&
                suggestions?.map((suggestion, index) => {
                  return (
                    <h1
                      key={suggestion}
                      onClick={() => ChangeNumberDestination(suggestion)}
                      className="border-[1.5px]  border-[#D1D5DB] rounded-b-md"
                    >
                      {suggestion}
                    </h1>
                  );
                })}
            </div>
            <span className="text-[#DC2626]">{errDst}</span>
          </label>
          <label htmlFor="amount" className="flex flex-col">
            <div className="flex flex-row gap-4 items-center font-karla">
              <span className="py-2">quantità </span>
              <AiOutlineEuro />
            </div>
            <div
              className={`flex flex-row shrink justify-between border-[1.5px] ${
                errAmount === "" ? "border-[#D1D5DB]" : "border-[#FCA5A5]"
              } rounded-lg p-1 `}
            >
              <span className="text-[#6B7280]">€</span>
              <input
                type="number"
                id="amount"
                name="amount"
                autoComplete="off"
                value={inputValues.amount}
                onChange={(e) =>
                  handleInputValues(e.target.name, e.target.value)
                }
                className="outline-none ml-[2%]  "
              />
              <span className="text-[#6B7280] mr-4">EUR</span>
            </div>
            <span className={` ${errAmount === "" ? "hidden" : "flex"} `}>
              {errAmount}
            </span>
          </label>
          <label className="inline-flex justify-end  lg:items-end py-2 ">
            <input
              type="checkbox"
              id="save"
              name="save"
              checked={inputValues.save}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5  text-black"
            />
            <span className="ml-2 text-gray-700 font-montserrat">
              salva contatto
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="cursor-pointer border-2 w-[15%] flex m-auto justify-center font-bold rounded-lg  font-karla p-2 tracking-normal bg-darkgreen text-white "
        >
          SUBMIT
        </button>
      </form>
      {toggle ? (
        <div className="fixed  flex justify-center  items-center inset-0  bg-[rgba(255,255,255,0.5)] z-10">
          <div className="flex flex-col  w-[80%] h-[50%] rounded-md border-2 border-darkgreen bg-white z-20 lg:w-[30%] lg:h-[50%]  ">
            <h1 className="text-white font-karla h-[11%] bg-darkgreen p-2">
              Riepilogo della transizione
            </h1>
            <div className="flex flex-col h-[80%]  items-center">
              <div className="flex flex-col mt-2">
                <div className="flex flex-row gap-2 items-center">
                  <h1 className="text-black font-karla ">destinazione</h1>
                  <BsArrowUpRight />
                </div>
                {inputValues.number_destination_account}
              </div>
              <div className="flex flex-row  items-center gap-4 mt-10">
                <div className="flex flex-col items-center">
                  <h1 className="text-black "> Saldo precedente</h1>
                  <h1> {balance}€ </h1>
                </div>
                <BsArrowLeftRight/>
                <div className="flex flex-col items-center">
                  <h1 className="text-black"> Saldo successivo</h1>
                  <h1> {balance - inputValues.amount}€ </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-row mb-8 justify-around">
              <button
                type="submit"
                className="cursor-pointer  flex flex-row justify-around p-2 items-center rounded-md gap-3 tracking-wide  bg-darkgreen"
                onClick={(e) => handleSubmit(e)}
              >
                <span className="text-white font-karla">CONFERMA</span>
                <AiOutlineCheckCircle className="text-white" />
              </button>
              <button
                type="submit"
                className="cursor-pointer gap-3 flex flex-row  p-2 items-center justify-around rounded-md  tracking-wide bg-darkgreen"
                onClick={handleToggle}
              >
                <span className="text-white">ANNULLA</span>
                <MdOutlineCancel className="text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TransferForm;
