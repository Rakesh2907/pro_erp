import { createAction } from "@reduxjs/toolkit";

// Create the action using createAction
export const updatePostAdded = createAction("UpdatePostAdded", (postAdded) => ({ 
    payload: postAdded,  
}));