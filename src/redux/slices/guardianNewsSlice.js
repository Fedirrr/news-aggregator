import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { guardianApiKey, path } from "../../components/constants";

const getArticles = async ({currentPage = 1, inputValue = "", selectedCategories = "", from = "", to = ""}) => {
    const categoriesString = selectedCategories === "All" ? "" : selectedCategories;
    const response = await axios.get(`${path.guardian.main}${path.guardian.search}`, {
        params: {
            "api-key": guardianApiKey,
            page: currentPage,
            q: inputValue || categoriesString,
            "from-date": from,
            "to-date": to,
        },
    });

    return response.data.response.results;
}

export const fetchGuardianArticles = createAsyncThunk("guardianNews/fetchGuardianArticles", getArticles)
export const fetchGuardianArticlesPages = createAsyncThunk("guardianNews/fetchGuardianArticlesPages", getArticles)

const guardianNewsSlice = createSlice({
    name: "guardianNews",
    initialState: {
        articles: [],
        statusArticles: "idle",
        errorArticles: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGuardianArticles.pending, (state) => {
                state.statusArticles = "loading"
            })
            .addCase(fetchGuardianArticles.fulfilled, (state, action) => {
                state.statusArticles = "succeeded";
                state.articles = action.payload;
            })
            .addCase(fetchGuardianArticles.rejected, (state, action) => {
                state.statusArticles = "failed";
                state.errorArticles = action.error.message;
            })
            .addCase(fetchGuardianArticlesPages.pending, (state) => {
                state.statusArticles = "loading"
            })
            .addCase(fetchGuardianArticlesPages.fulfilled, (state, action) => {
                state.statusArticles = "succeeded";
                state.articles.push(...action.payload);
            })
            .addCase(fetchGuardianArticlesPages.rejected, (state, action) => {
                state.statusArticles = "failed";
                state.errorArticles = action.error.message;
            })
    },
});

export const newsGuardReducer = guardianNewsSlice.reducer;
