import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/books';

// Helper function to get the auth header with the JWT
const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

// GET all books for the currently logged-in user
const getMyBooks = () => {
    return axios.get(`${API_URL}/my-books`, { headers: authHeader() });
};

// POST a new book
const addBook = (bookRequest, photo) => {
    const formData = new FormData();
    const bookRequestBlob = new Blob([JSON.stringify(bookRequest)], { type: "application/json" });
    
    formData.append("bookRequest", bookRequestBlob);
    formData.append("photo", photo);

    return axios.post(API_URL, formData, { headers: authHeader() });
};

// PUT (update) an existing book
const updateBook = (bookId, bookRequest, photo) => {
    const formData = new FormData();
    const bookRequestBlob = new Blob([JSON.stringify(bookRequest)], { type: "application/json" });

    formData.append("bookRequest", bookRequestBlob);
    if (photo) {
        formData.append("photo", photo);
    }
    
    return axios.put(API_URL + bookId, formData, { headers: authHeader() });
};

// DELETE a book
const deleteBook = (bookId) => {
    return axios.delete(API_URL + bookId, { headers: authHeader() });
};

const BookService = {
    getMyBooks,
    addBook,
    updateBook,
    deleteBook,
};

export default BookService;