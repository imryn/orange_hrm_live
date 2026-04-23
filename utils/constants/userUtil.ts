export const getDynamicUsername = () => {
    const now = new Date();
    // Returns something like "test202604191324"
    const timestamp = now.toISOString().replace(/[-:T.Z]/g, "").slice(0, 12);
    return `test${timestamp}`;
};