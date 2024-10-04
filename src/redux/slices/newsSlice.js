import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newsApiKey, path } from "../../components/constants";

const getArticles = async ({
                               selectedCategories = "",
                               currentPage = 1,
                               inputValue = "",
                               sourceIds = "",
                               from = "",
                               to = "",
                               isSourcesSelected = false
                           }) => {
    const categoriesString = selectedCategories === "All" ? "" : selectedCategories;
    const searchQuery = inputValue || categoriesString || null;

    if (!searchQuery && !sourceIds) {
        throw new Error("Required parameters are missing, the scope of your search is too broad.");
    }

    const response = await axios.get(`${path.newsApi.main}${path.newsApi.everything}`, {
        params: {
            apiKey: newsApiKey,
            q: searchQuery,
            sources: sourceIds,
            page: currentPage,
            pageSize: 10,
            language: "en",
            from,
            to,
        },
    });

    return { data: response.data.articles, isSourcesSelected };
}
const getSources = async () => {
    const response = await axios.get(`${path.newsApi.main}${path.newsApi.sources}`, {
        params: {
            apiKey: newsApiKey,
            country: "us",
        },
    });

    return response.data.sources;
}

export const fetchSources = createAsyncThunk("news/fetchSources", getSources);
export const fetchArticles = createAsyncThunk("news/fetchArticles", getArticles);
export const fetchArticlesPages = createAsyncThunk("news/fetchArticlesPages", getArticles);

const newsSlice = createSlice({
    name: "news",
    initialState: {
        articles: [],
        statusArticles: "idle",
        errorArticles: null,
        sources: [],
        statusSources: "idle",
        errorSources: null,
        isSourcesSelected: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.statusArticles = "loading"
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.statusArticles = "succeeded";
                state.articles = action.payload.data;
                state.isSourcesSelected = action.payload.isSourcesSelected;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.statusArticles = "failed";
                state.errorArticles = action.error.message;
            })
            .addCase(fetchArticlesPages.pending, (state) => {
                state.statusArticles = "loading"
            })
            .addCase(fetchArticlesPages.fulfilled, (state, action) => {
                state.statusArticles = "succeeded";
                state.articles.push(...action.payload.data);
                state.isSourcesSelected = action.payload.isSourcesSelected;
            })
            .addCase(fetchArticlesPages.rejected, (state, action) => {
                state.statusArticles = "failed";
                state.errorArticles = action.error.message;
            })
            .addCase(fetchSources.pending, (state) => {
                state.statusSources = "loading";
            })
            .addCase(fetchSources.fulfilled, (state, action) => {
                state.statusSources = "succeeded";
                state.sources = action.payload;
            })
            .addCase(fetchSources.rejected, (state, action) => {
                state.statusSources = "failed";
                state.errorSources = action.error.message;
            })
    },
});

export const newsReducer = newsSlice.reducer;
