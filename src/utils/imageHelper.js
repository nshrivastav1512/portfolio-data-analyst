export const resolveImagePath = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    // Get the base URL from Vite environment
    const baseUrl = import.meta.env.BASE_URL;
    
    // If path starts with /, remove it to avoid double slashes if baseUrl ends with /
    // But standard Vite BASE_URL includes trailing slash.
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    return `${baseUrl}${cleanPath}`;
};
