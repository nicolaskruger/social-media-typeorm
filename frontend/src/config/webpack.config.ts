const env = process.env.NODE_ENV;

const { REACT_APP_URL_DEV, REACT_APP_URL_PROD } = process.env;

const serverUrl =
    env === "development" ? REACT_APP_URL_DEV : REACT_APP_URL_PROD;

export const config = {
    serverUrl,
};
