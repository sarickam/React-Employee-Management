// Format date to 'YYYY-MM-DD' for display
export const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
};

// Parse date from 'YYYY-MM-DD' to 'YYYY-MM-DDT00:00:00.000Z'
export const parseFormDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString();
};

// Format date to 'YYYY-MM-DD' for display, same as formatDateForDisplay
export const formatDateString = (dateString) => {
    return formatDateForDisplay(dateString);
};


