import React, { useCallback, useEffect, useMemo, useState } from "react";
import { defaultDate, defaultSourceNames, defaultSelectedCategories } from "../constants";
import { mapDates, mapSources, handleLocalStorage } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { categories, dateRanges } from "../mock";
import { filtersBarContainer } from "./";
import { debounce } from "lodash";
import {
    TextField,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Checkbox,
    ListItemText,
} from "@mui/material";
import {
    fetchArticles,
    fetchArticlesPages,
    fetchGuardianArticles, fetchGuardianArticlesPages,
    fetchNytArticles, fetchNytArticlesPages,
    fetchSources
} from "../../redux/slices";

export const FiltersBar = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [date, setDate] = useState(defaultDate);
    const [sourceNames, setSourceName] = useState(defaultSourceNames);
    const [selectedCategories, setSelectedCategories] = useState(defaultSelectedCategories);

    const sources = useSelector((state) => state.news.sources);
    const sourceIds = useMemo(() => mapSources(sources, sourceNames), [sourceNames, sources]);
    const dispatch = useDispatch();

    const handleSourceChange = (event) => {
        const value = event.target.value;
        setSourceName(typeof value === "string" ? value.split(",") : value);
    };

    const fetchApi = useCallback((fetch, page) => {
        const {
            from,
            to,
            begin_date,
            end_date,
        } = mapDates[date];
        const allParams = {
            selectedCategories,
            currentPage: page,
            inputValue,
            sourceIds,
            begin_date,
            end_date,
            from,
            to,
            isSourcesSelected: !!sourceNames.length,
        };

        dispatch(fetch(allParams))
    }, [date, dispatch, inputValue, selectedCategories, sourceIds, sourceNames.length]);

    useEffect(() => {
        dispatch(fetchSources());
    }, [dispatch]);

    useEffect(() => {
        if (sourceIds && currentPage === 1) {
            fetchApi(fetchArticles, currentPage);
            fetchApi(fetchNytArticles, currentPage)
            fetchApi(fetchGuardianArticles, currentPage)
        } else {
            fetchApi(fetchArticlesPages, currentPage);
            fetchApi(fetchNytArticlesPages, currentPage);
            fetchApi(fetchGuardianArticlesPages, currentPage);
        }
    }, [currentPage, fetchApi, sourceIds]);

    useEffect(() => {
        handleLocalStorage.set("date", date)
        handleLocalStorage.set("sourceNames", sourceNames)
        handleLocalStorage.set("selectedCategories", selectedCategories)
    }, [sourceNames, date, selectedCategories]);

    useEffect(() => {
        const scrollHandler = debounce((e) => {
            const { scrollHeight, scrollTop } = e.target.documentElement;
            if (scrollHeight - (scrollTop + window.innerHeight) < 100) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        }, 500);

        document.addEventListener("scroll", scrollHandler);
        return () => document.removeEventListener("scroll", scrollHandler);
    }, []);

    return (
        <Box my={2} sx={filtersBarContainer.searchBarContainerStyles}>
            <FormControl sx={filtersBarContainer.formControlStyles}>
                <InputLabel>Source</InputLabel>
                <Select
                    multiple
                    value={sourceNames}
                    onChange={handleSourceChange}
                    input={<OutlinedInput label="Source"/>}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={filtersBarContainer.menuPropsStyles}
                >
                    {sources.map(({id, name}) =>
                        <MenuItem
                            key={id}
                            value={name}
                            sx={filtersBarContainer.sourcesMenuItems}
                        >
                            <Checkbox checked={sourceNames.indexOf(name) > -1}/>
                            <ListItemText primary={name}/>
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl sx={filtersBarContainer.formControlStyles}>
                <InputLabel>Date</InputLabel>
                <Select
                    value={date}
                    label="Date"
                    MenuProps={filtersBarContainer.menuPropsStyles}
                    onChange={(e) => setDate(e.target.value)}
                >
                    {dateRanges.map((date) =>
                        <MenuItem key={date} value={date}>
                            {date}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl sx={filtersBarContainer.formControlStyles}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={selectedCategories}
                    MenuProps={filtersBarContainer.menuPropsStyles}
                    onChange={(e) => setSelectedCategories(e.target.value)}
                    input={<OutlinedInput label="Category"/>}
                >
                    {categories.map((category) =>
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <TextField
                label="Search"
                variant="outlined"
                placeholder="Search for news..."
                value={inputValue}
                sx={filtersBarContainer.textFieldStyles}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </Box>

    );
};



