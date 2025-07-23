import config from "../config";

// Joshua - I am used to using AXIOS. Havent set that up will leave that to you guys as you may want to use something else

// API handler, create a HTTP client
// This is just a place holder
// Use `config.apiBaseUrl` when refering to .env
const api = {
    baseURL: config.apiBaseUrl
};

// Example/Place holder
export const getBackendAPI = async (formdata) => {
    try {
        console.log(`Current API: ${api.baseURL}`); // Refering straight to config works as well but when using a HTTP client you create a handler for it and refer to that
        //INSERT BACKEDN RESPONCE LOGIC HERE
    } catch (error) {
        console.error('Error getting calculation results:', error);
        throw error;
    }
};

// THIS IS FOR GENERAL API CALL AND HTTP client setup
// Create sperate files for other backend API calls you can refere to HTTP client here (clients like AXIOS allow for this)