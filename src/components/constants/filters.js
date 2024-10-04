import { handleLocalStorage } from "../../utils";

export const defaultDate = handleLocalStorage.get("date") || "Anytime";
export const defaultSourceNames = handleLocalStorage.get("sourceNames") || [];
export const defaultSelectedCategories = handleLocalStorage.get("selectedCategories") || "All";
