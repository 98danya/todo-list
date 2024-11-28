export const storageManager = (() => {
    const STORAGE_KEY = 'todoAppData'; 

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function loadData() {
        const data = localStorage.getItem(STORAGE_KEY);
        try {
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error parsing localStorage data:', e);
            return null;
        }
    }
    return {
        saveData,
        loadData,
    };
})();