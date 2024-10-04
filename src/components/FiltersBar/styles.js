import {blueGrey, grey} from "@mui/material/colors";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const filtersBarContainer = {
    sourcesMenuItems: {
        "&.Mui-selected:hover": { backgroundColor: blueGrey[700] },
        "& .MuiCheckbox-root": {
            color: grey[300],
            "&.Mui-checked": {color: grey[500]},
        },
    },
    menuPropsStyles: {
        PaperProps: {
            sx: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                backgroundColor: grey[800],
                color: "white",
            },
        },
    },
    formControlStyles: {
        flex: 1,
        "& .MuiOutlinedInput-root": {
            backgroundColor: grey[800],
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: grey[800],
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: grey[800],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: grey[800],
            },
        },
        "& .MuiSvgIcon-root": { color: grey[300] },
        "& .MuiInputLabel-root": {
            color: grey[400],
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: grey[400],
        },
        "& .MuiOutlinedInput-root input::placeholder": {
            color: "gray",
            opacity: 1,
        },
    },
    selectedMenuProps: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        backgroundColor: grey[800],
        color: "white",
    },
    searchBarContainerStyles: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "8px",
    },
    resetButtonStyles: {
        marginRight: 2,
        borderRadius: "6px",
        borderColor: grey[400],
        color: grey[400],
        "&:hover": {
            borderColor: grey[400],
        },
        "&.Mui-focused": {
            borderColor: grey[400],
        },
        "& .MuiButton-label": {
            color: grey[400],
        },
    },
    textFieldStyles: {
        flex: 2,
        "& .MuiOutlinedInput-root": {
            backgroundColor: grey[800],
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: grey[800],
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: grey[800],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: grey[800],
            },
        },
        "& .MuiSvgIcon-root": {color: grey[300]},
        "& .MuiInputLabel-root": {
            color: grey[400],
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: grey[400],
        },
        "& .MuiOutlinedInput-root input::placeholder": {
            color: "gray",
            opacity: 1,
        },
    },
};
