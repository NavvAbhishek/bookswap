import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/swap-requests';

// Helper function to get the auth header with the JWT
const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

/**
 * Creates a new swap request for a book.
 * @param {number} bookId The ID of the book to request.
 */
const createRequest = (bookId) => {
    return axios.post(`${API_URL}/book/${bookId}`, null, { headers: authHeader() });
};

/**
 * Updates the status of a swap request 
 * @param {number} requestId The ID of the swap request.
 * @param {string} status The new status 
 */
const updateRequestStatus = (requestId, status) => {
    return axios.put(`${API_URL}/${requestId}`, { status }, { headers: authHeader() });
};


const getOutgoingRequests = () => {
    return axios.get(`${API_URL}/outgoing`, { headers: authHeader() });
};


const getIncomingRequests = () => {
    return axios.get(`${API_URL}/incoming`, { headers: authHeader() });
};

const SwapRequestService = {
    createRequest,
    updateRequestStatus,
    getOutgoingRequests,
    getIncomingRequests,
};

export default SwapRequestService;