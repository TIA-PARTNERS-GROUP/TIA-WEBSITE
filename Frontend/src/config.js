// Joshua - Config intpreter. Reads the .env and allows you to configure global settings across the workspace. Put anything that is configurable here
const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
};

export default config;