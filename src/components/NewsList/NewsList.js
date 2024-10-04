import React, { useMemo } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { NewsItem } from "../NewsItem";
import { useSelector } from "react-redux";
import { mapArticleSource } from "../../utils";

export const NewsList = () => {
    const newsApiArticles = useSelector((state) => state.news.articles);
    const statusNewsApi = useSelector((state) => state.news.statusArticles);
    const isSourcesSelected = useSelector((state) => state.news.isSourcesSelected);
    const statusGuardian = useSelector((state) => state.guardianNews.statusArticles);
    const guardianArticles = useSelector((state) => state.guardianNews.articles);
    const nytArticles = useSelector((state) => state.nytNews.articles);
    const statusNytArticles = useSelector((state) => state.nytNews.statusArticles);

    const isLoading = [statusNewsApi, statusGuardian, statusNytArticles].every(s => s === "loading")

    const allArticles = useMemo(() => {
        if (isSourcesSelected) {
            return newsApiArticles;
        } else {
            const combinedArticles = [...newsApiArticles, ...guardianArticles, ...nytArticles];
            return combinedArticles.sort(() => Math.random() - 0.5);
        }
    }, [isSourcesSelected, newsApiArticles, guardianArticles, nytArticles]);

    return (
        <Grid container spacing={3} height="100%">
            {allArticles.map((article, i) =>
                <Grid item xs={12} md={12} lg={6} key={article.id || article._id || article.url + i}>
                    <NewsItem article={article} articleSource={mapArticleSource(article)} />
                </Grid>
            )}
            {isLoading && (
                <Box sx={{display: "flex", justifyContent: "center", width: "100%", padding: "30px"}}>
                    <CircularProgress color="inherit"/>
                </Box>

            )}
        </Grid>
    );
};
