import { format, subDays, subMonths, subWeeks } from "date-fns";

const now = new Date();
const formatStr = "yyyy-MM-dd";
const nytFormatStr = "yyyyMMdd";
const to = format(now, formatStr);
const nytTo = format(now, nytFormatStr);

export const mapSources = (sources, sourceNames) => {
    if (sources.length) {
        const namesToIds = sourceNames.map(sourceName => sources.find(({ name }) => name === sourceName)?.id);
        const allSourcesIds = sources.map(({ id }) => id);
        return (!namesToIds.length ? allSourcesIds : namesToIds).join(",");
    } else {
        return "";
    }
};

export const mapDates = {
    "Anytime": {
        from: null,
        to: null,
        begin_date: null,
        end_date: null,
    },
    "Past 24 hours": {
        from: format(subDays(now, 1), formatStr),
        to,
        begin_date: format(subDays(now, 1), nytFormatStr),
        end_date: nytTo,
    },
    "Past week": {
        from: format(subWeeks(now, 1), formatStr),
        to,
        begin_date: format(subWeeks(now, 1), nytFormatStr),
        end_date: nytTo,
    },
    "Past month": {
        from: format(subMonths(now, 1), formatStr),
        to,
        begin_date: format(subMonths(now, 1), nytFormatStr),
        end_date: nytTo,
    },
};
