const config = {
  apiUrl: import.meta.env.MODE === 'production' 
    ? 'https://resume-ai-server-beta.vercel.app'
    : 'http://localhost:5000',
};

export default config; 