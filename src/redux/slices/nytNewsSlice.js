import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NYTApiKey, path } from "../../components/constants";

const getArticles = async ({
    currentPage = 1,
    inputValue = "",
    selectedCategories = "",
    begin_date = null,
    end_date = null,
}) => {
    const categoriesString = selectedCategories === "All" ? "" : selectedCategories;
    const response = await axios.get(`${path.NYT.main}${path.NYT.articleSearch}`, {
        params: {
            "api-key": NYTApiKey,
            page: currentPage,
            q: inputValue || categoriesString,
            begin_date,
            end_date,
        },
    });

    return response.data.response.docs;
}

export const fetchNytArticles = createAsyncThunk("nytNews/fetchNytArticles", getArticles)
export const fetchNytArticlesPages = createAsyncThunk("nytNews/fetchNytArticlesPages", getArticles)

const nytNewsSlice = createSlice({
    name: "nytNews",
    initialState: {
        articles: [],
        statusArticles: "idle",
        errorArticles: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNytArticles.pending, (state) => {
                state.statusArticles = "loading";
            })
            .addCase(fetchNytArticles.fulfilled, (state, action) => {
                state.statusArticles = "succeeded";
                state.articles = action.payload;
            })
            .addCase(fetchNytArticles.rejected, (state, action) => {
                state.statusArticles = "failed";
                state.errorArticles = action.error.message;
            })
            .addCase(fetchNytArticlesPages.pending, (state) => {
                state.statusArticles = "loading"
            })
            .addCase(fetchNytArticlesPages.fulfilled, (state, action) => {
                state.statusArticles = "succeeded";
                state.articles.push(...action.payload);
            })
            .addCase(fetchNytArticlesPages.rejected, (state, action) => {
                state.statusArticles = "failed";
                state.errorArticles = action.error.message;
            });
    },
});

export const nytNewsReducer = nytNewsSlice.reducer;
