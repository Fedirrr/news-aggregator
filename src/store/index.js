import { configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "../redux/slices";
import { newsGuardReducer } from "../redux/slices";
import { nytNewsReducer } from "../redux/slices";

export const index = configureStore({
    reducer: {
        news: newsReducer,
        nytNews: nytNewsReducer,
        guardianNews: newsGuardReducer,
    },
});
