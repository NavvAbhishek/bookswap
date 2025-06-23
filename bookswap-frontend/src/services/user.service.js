import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/users/';

// Helper function to get the auth header
const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getProfile = () => {
    return axios.get(API_URL + 'profile', { headers: authHeader() });
};

const UserService = {
    getProfile,
};

export default UserService;