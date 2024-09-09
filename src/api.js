import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:3000/dev';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Axios Interceptor to add Authorization Header for requests
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle Refresh Token Expiration & Refresh Logic
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const { token } = await refreshAccessToken(refreshToken);
                    localStorage.setItem('accessToken', token);
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest); // Retry original request
                } catch (refreshError) {
                    console.error('Token refresh failed', refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

// Function to register a new user
export const signupUser = async (username, password) => {
    try {
        const response = await api.post('/register', { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to log in a user
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data; // Assume this returns token and refreshToken
    } catch (error) {
        throw error;
    }
};

// Function to refresh the access token
export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await api.post('/refresh-token', { refreshToken });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to fetch user profile
export const fetchUserProfile = async () => {
    try {
        const response = await api.get('/employees');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update user profile
export const updateUserProfile = async (employeeData) => {
    try {
        const response = await api.put('/employees', employeeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to patch specific fields of the user profile
export const patchUserProfile = async (employeeData) => {
    try {
        const response = await api.patch('/employees', employeeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to fetch all employees
export const fetchAllEmployees = async () => {
    try {
        const response = await api.get('/all_employees');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update an employee
export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await api.put(`/update_employee/${id}`, employeeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete an employee
export const deleteEmployee = async (employeeId) => {
    try {
        const response = await api.delete('/employees', {
            data: { id: employeeId },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to log out the user
export const logoutUser = async () => {
    try {
        const response = await api.post('/logout');
        if (response.data.clearTokens) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update an employee by ID with admin prefix
export const updateEmployeeById = async (id, employeeData) => {
    try {
        console.log("Sending data to update employee:", id, employeeData);
        const response = await api.put(`/admin/${id}`, employeeData);
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error('Update failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};



// Function to delete an employee by ID with admin prefix
export const deleteEmployeeById = async (id) => {
    try {
        const response = await api.delete(`/admin/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
