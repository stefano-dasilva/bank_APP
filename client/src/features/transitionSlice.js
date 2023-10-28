import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account_details: [],
};

const transitionSlice = createSlice({
  name: "account_details_list",
  initialState,
  reducers: {
    loadState: (state, action) => {
      state.account_details = action.payload;
    },
    addTransitions: (state, action) => {
      const { number_source_account, number_destination_account, amount } =
        action.payload;

      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

       const date = new Date();
       /*
      const data_date = new Date();

      const formatDate = data_date.toLocaleString("it-IT", options);

      const dataSenzaBarre = formatDate.replace(/\//g, ",");
*/
      const new_transition = {
        date: date,
        source_account: number_source_account,
        destination_account: number_destination_account,
        amount: amount,
      };

      state.account_details.forEach((account) => {
        if (
          account.number === number_source_account ||
          account.number === number_destination_account
        ) {
          account.transitions.push(new_transition);
          if (account.number === number_source_account) {
            account.balance = parseFloat(account.balance) - parseFloat(amount);
          }
          if (account.number === number_destination_account) {
            account.balance = parseFloat(account.balance) + parseFloat(amount);
          }
        }
      });
    },
  },
});

export const { loadState, addTransitions } = transitionSlice.actions;
export default transitionSlice.reducer;
