import axios from 'axios';

const requestApi = (endpoint: string, method: string, body = {}) => {
    const auth_url = import.meta.env.VITE_APP_AUTH_URL;
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    const API = axios.create({ headers });

    API.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    API.interceptors.response.use(
        (response) => response,

        async (error) => {
            const originalRequest = error.config;

            if (error.response && error.response.status === 419) {
                try {
                    const { data } = await axios.post(`${auth_url}/refresh-token`, {
                        refreshToken: localStorage.getItem('refreshToken'),
                    });

                    const { accessToken, refreshToken } = data;
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                    return API(originalRequest);
                } catch (error: any) {
                    if (error.response && error.response.status === 400) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refreshToken');
                        localStorage.removeItem('avatar');
                    }

                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return API.request({
        method: method,
        url: endpoint,
        data: body,
    });
};

export default requestApi
