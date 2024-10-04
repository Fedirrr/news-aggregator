import React from "react";
import { Card, CardContent, Typography, Button, CardMedia, Box } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { newsItemStyles } from "./";
import { formatDate, getNytImageUrl } from "../../utils";
import {grey} from "@mui/material/colors";

export const NewsItem = ({ article, articleSource }) => {
    const { publishedAt, webPublicationDate, pub_date, multimedia, url, webUrl, web_url } = article
    const formattedDate = formatDate(publishedAt || webPublicationDate || pub_date);
    const imageUrl = getNytImageUrl(multimedia, articleSource);

    const handleRedirect = () => {
        const redirectUrl = url || webUrl || web_url;
        if (redirectUrl) {
            window.open(redirectUrl, "_blank");
        }
    };

    return (
        <Card
            sx={newsItemStyles.cardContainer}>
            <CardMedia
                component="img"
                height="360"
                image={imageUrl}
                alt={article.title}
            />
            <Box flexGrow={1}>
                <CardContent>
                    <Typography
                        onClick={handleRedirect}
                        sx={newsItemStyles.title}
                        variant="h6"
                        gutterBottom
                    >
                        {article.title || article.webTitle || article.snippet}
                    </Typography>
                    <Typography color={grey[400]} variant="body2">
                        {article.description}
                    </Typography>
                </CardContent>
            </Box>

            <Box sx={newsItemStyles.bottomBox}>
                <Box sx={newsItemStyles.bottomBoxLeft}>
                    {article.author && (
                        <Box sx={newsItemStyles.newsItemBottomStyles}>
                            <Typography color={grey[400]} variant="body2">
                                <b>Author:</b> {article.author}
                            </Typography>
                        </Box>
                    )}
                    <Box sx={newsItemStyles.newsItemBottomStyles}>
                        <Typography color={grey[400]} variant="body2">
                            <b>Date:</b> {formattedDate}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    endIcon={<ArrowOutwardIcon fontSize="16px" color={grey[300]} />}
                    sx={newsItemStyles.newsItemBtnStyles}
                    size="text"
                    onClick={handleRedirect}
                >
                    Official Source
                </Button>
            </Box>
        </Card>
    );
};
