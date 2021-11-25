import axios from "axios";

const defaultConfig = (config) => {
    const token = document.cookie.split('=')[1];
    return Object.assign({}, ...config, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const success = (data) => ({
    data: {...data},
    error: false
});

const failure = (error) => (
    console.log('%c Error occured :', 'color:#f00;font-size:18px;', error),
    ({
    message: error.message,
    error: true,
    errorStatus: error.status 
}));

// get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
const get = async (url, config) => {
    try {
        const response = await axios.get(url,defaultConfig(config));
        return success(response);
    } catch(error) {
        return failure(error);
    }
}

// post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
const post = async (url, data, config) => {
    try {
        const response = await axios.post(url,{...data},defaultConfig(config));
        return success(response);
    } catch(error) {
        return failure(error);
    }
}

//  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
const put = async (url, data, config) => {
    try {
        const response = await axios.put(url,{...data},defaultConfig(config));
        return success(response);
    } catch(error) {
        return failure(error);
    }
}
// delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
const deleteData = async (url, config) => {
    try {
        const response = await axios.delete(url,defaultConfig(config));
        return success(response);
    } catch(error) {
        return failure(error);
    }
}

