import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api'; // Base API URL

// Helper function to get the auth header with the JWT
const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

// --- STEP 1: UPLOAD THE PHOTO ---
// This function uploads a file and returns the server-generated filename.
const uploadBookPhoto = (photo) => {
    const formData = new FormData();
    formData.append("photo", photo);
    // This calls the dedicated file upload endpoint
    return axios.post(`${API_URL}/files/upload/book-photo`, formData, { headers: authHeader() });
};


// --- STEP 2: CREATE THE BOOK ---
// This function sends a simple JSON payload. It no longer handles files.
const addBook = (bookRequest) => {
    return axios.post(`${API_URL}/books`, bookRequest, { headers: authHeader() });
};


// --- OTHER SERVICE FUNCTIONS ---
const getMyBooks = () => {
    return axios.get(`${API_URL}/books/my-books`, { headers: authHeader() });
};

const getExploreBooks = () => {
    return axios.get(`${API_URL}/books/explore`, { headers: authHeader() });
};

// This updateBook function would also need to be converted to a two-step process for editing
const updateBook = (bookId, bookRequest, photo) => {
    // For now, this remains the old way, but should be updated if you implement editing
    const formData = new FormData();
    const bookRequestBlob = new Blob([JSON.stringify(bookRequest)], { type: "application/json" });
    formData.append("bookRequest", bookRequestBlob);
    if (photo) {
        formData.append("photo", photo);
    }
    return axios.put(`${API_URL}/books/${bookId}`, formData, { headers: authHeader() });
};

const deleteBook = (bookId) => {
    return axios.delete(`${API_URL}/books/${bookId}`, { headers: authHeader() });
};


const BookService = {
    getMyBooks,
    getExploreBooks,
    uploadBookPhoto, // Export the new function
    addBook,
    updateBook,
    deleteBook,
};

export default BookService;