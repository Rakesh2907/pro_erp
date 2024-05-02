import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { blogReducer } from "./reducers/postblog";

const Store = configureStore({
    reducer: {
        user: userReducer,
        postblog: blogReducer
    }
});

export default Store;