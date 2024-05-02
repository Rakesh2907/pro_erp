import { createReducer } from "@reduxjs/toolkit";
import { updatePostAdded } from "../actions/postblog";

const initialState = {
    postAdded: true,
};

export const blogReducer = createReducer(initialState, (builder) => {
    builder
        // Use the action type directly in addCase
        .addCase(updatePostAdded.type, (state, action) => {  //alert('Reducer  '+action.payload)
            state.postAdded = action.payload;
        });
});
