
// export const server = import.meta.env.VITE_SERVER;

export const server = import.meta.env.VITE_SERVER || 'http://localhost:3000';

// export const server = 'http://localhost:3000';


console.log("API Server URL:", server);