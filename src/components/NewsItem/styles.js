import {grey} from "@mui/material/colors";

export const newsItemStyles = {
    cardContainer: {
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: grey[900],
    },
    newsItemBottomStyles: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1,
    },
    newsItemBtnStyles: {
        whiteSpace: "nowrap",
        fontSize: "10px",
        backgroundColor: grey[800],
        color: grey[400],
        py: "10px",
        px: "20px",
        borderRadius: "16px",
        flexShrink: 0,
        alignSelf: "flex-end",
        marginLeft: "auto",
    },
    title: {
        color: grey[300],
        cursor: "pointer",
    },
    bottomBox: {
        display: "flex",
        p: 2,
    },
    bottomBoxLeft: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
};
