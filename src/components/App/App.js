import React from "react";
import { Box, Container } from "@mui/material";
import { Header } from "../Header";
import { FiltersBar } from "../FiltersBar";
import { NewsList } from "../NewsList";
import { appStyles } from './'
import "normalize.css";
import "./app.css";

export const App = () => {
    return (
        <Box sx={appStyles.container}>
            <Header/>
            <Container maxWidth="lg" flex="1">
                <FiltersBar/>
                <NewsList/>
            </Container>
        </Box>
    );
};
