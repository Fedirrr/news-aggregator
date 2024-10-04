export const handleLocalStorage = {
    get: (key) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : "";
        } catch (error) {
            console.error(error);
            return "";
        }

    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
};
