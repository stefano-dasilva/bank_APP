import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import transitionSlice from "../features/transitionSlice";

 const store = configureStore({
    reducer: {
        authenticated : authSlice,
        account_details_list : transitionSlice
    }
})

export default store