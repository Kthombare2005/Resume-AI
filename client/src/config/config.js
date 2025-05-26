const config = {
  apiUrl: import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_PRODUCTION_API_URL 
    : import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
};

export default config; 