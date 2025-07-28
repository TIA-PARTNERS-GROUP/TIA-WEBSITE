// Joshua - Config intpreter. Reads the .env and allows you to configure global settings across the workspace. Put anything that is configurable here
const config = {
    frontEndPort: import.meta.env.VITE_FRONTEND_BASE_PORT,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL
};

export default config;