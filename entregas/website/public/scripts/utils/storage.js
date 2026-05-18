export const storage = {
    set: (key, value) => {
        const stringifiedValue = JSON.stringify(value);
        sessionStorage.setItem(key, stringifiedValue);
    },
    get: (key) => {
        const value = sessionStorage.getItem(key);
        if(value === null || value === undefined) return null;

        return JSON.parse(value);
    },
    remove: (key) => {
        sessionStorage.removeItem(key);
    },
    clear: () => {
        sessionStorage.clear();
    },
};
