import reducer from "./modules/index"
import  { configureStore } from "@reduxjs/toolkit";
const store=configureStore({
    reducer:{
        bill: reducer
    }
})
export default store