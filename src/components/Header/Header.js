import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { headerStyles } from "./";

export const Header = () => {
    return (
        <AppBar sx={headerStyles.appBar} position="static">
            <Toolbar sx={headerStyles.toolbar}>
                <Typography variant="h6" sx={headerStyles.title}>
                    News Aggregator
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
