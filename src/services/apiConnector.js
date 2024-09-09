import axios from "axios";

export const axiosInstance = axios.create();

export const apiConnector = (method, url, data = null, config = {}) => {
    const finalConfig = {
        method,
        url,
        data,
        ...config,
    };

    console.log("API Connector Config:", finalConfig);

    return axiosInstance(finalConfig);
};
