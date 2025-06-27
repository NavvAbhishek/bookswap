import React, { useState, useEffect, useCallback } from "react";
//import { useNavigate } from "react-router-dom";
import BookService from "../services/book.service";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// --- Reusable Book Form Modal Component ---
const BookFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    language: "",
    bookCondition: "GOOD",
    description: "",
    exchangePreference: "",
    location: "",
    status: "AVAILABLE",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        genre: initialData.genre || "",
        language: initialData.language || "",
        bookCondition: initialData.bookCondition || "GOOD",
        description: initialData.description || "",
        exchangePreference: initialData.exchangePreference || "",
        location: initialData.location || "",
        status: initialData.status || "AVAILABLE",
      });
      setPreview(initialData.photoUrl);
    } else {
      // Reset form for adding a new book
      setFormData({
        title: "",
        author: "",
        genre: "",
        language: "",
        bookCondition: "GOOD",
        description: "",
        exchangePreference: "",
        location: "",
        status: "AVAILABLE",
      });
      setPreview(null);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, photo);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-2xl font-semibold">
            {initialData ? "Edit Book" : "Add a New Book"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Form fields will go here */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre"
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="Language"
              required
              className="w-full p-2 border rounded"
            />
            <select
              name="bookCondition"
              value={formData.bookCondition}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="NEW">New</option>
              <option value="LIKE_NEW">Like New</option>
              <option value="GOOD">Good</option>
              <option value="FAIR">Fair</option>
              <option value="POOR">Poor</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="AVAILABLE">Available</option>
              <option value="LENT_OUT">Lent Out</option>
            </select>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
          <input
            name="exchangePreference"
            value={formData.exchangePreference}
            onChange={handleChange}
            placeholder="Exchange Preference (e.g., Swap only)"
            className="w-full p-2 border rounded"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Book Location (e.g., Colombo)"
            required
            className="w-full p-2 border rounded"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Book Photo
            </label>
            <div className="flex items-center mt-1 space-x-4">
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-20 h-20 rounded"
                />
              )}
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end pt-4 space-x-2 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              {initialData ? "Save Changes" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Reusable Delete Confirmation Modal ---
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold">Are you sure?</h3>
        <p className="mt-2 text-sm text-gray-600">
          This action cannot be undone. You will permanently delete this book
          listing.
        </p>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Page Component ---
const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingBookId, setDeletingBookId] = useState(null);

  // const navigate = useNavigate();

  const fetchMyBooks = useCallback(() => {
    setLoading(true);
    BookService.getMyBooks().then(
      (response) => {
        setBooks(response.data);
        setLoading(false);
      },
      (error) => {
        setError("Failed to fetch your books.",error);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    fetchMyBooks();
  }, [fetchMyBooks]);

  const handleOpenAddModal = () => {
    setEditingBook(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (book) => {
    setEditingBook(book);
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (bookId) => {
    setDeletingBookId(bookId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingBook(null);
    setDeletingBookId(null);
  };

  const handleFormSubmit = (formData, photo) => {
    const promise = editingBook
      ? BookService.updateBook(editingBook.id, formData, photo)
      : BookService.addBook(formData, photo);

    promise
      .then(() => {
        fetchMyBooks(); // Refresh the book list
        handleCloseModals();
      })
      .catch((err) => {
        // You can add more specific error handling here
        console.error("Failed to save book:", err);
        alert("Error: Could not save the book.");
      });
  };

  const handleDeleteConfirm = () => {
    if (deletingBookId) {
      BookService.deleteBook(deletingBookId)
        .then(() => {
          fetchMyBooks(); // Refresh the list
          handleCloseModals();
        })
        .catch((err) => {
          console.error("Failed to delete book:", err);
          alert("Error: Could not delete the book.");
        });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Books Dashboard
            </h1>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add New Book
            </button>
          </div>

          {/* Book List */}
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {loading && (
                <li>
                  <p className="p-4 text-center text-gray-500">
                    Loading your books...
                  </p>
                </li>
              )}
              {error && (
                <li>
                  <p className="p-4 text-center text-red-500">{error}</p>
                </li>
              )}
              {!loading && books.length === 0 && (
                <li>
                  <p className="p-8 text-center text-gray-500">
                    You haven't added any books yet. Click "Add New Book" to get
                    started!
                  </p>
                </li>
              )}
              {books.map((book) => (
                <li key={book.id}>
                  <div className="flex items-center p-4 space-x-4">
                    <img
                      className="object-cover w-16 h-20 rounded"
                      src={book.photoUrl}
                      alt={book.title}
                    />
                    <div className="flex-grow">
                      <p className="text-lg font-semibold text-gray-900">
                        {book.title}
                      </p>
                      <p className="text-sm text-gray-500">{book.author}</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          book.status === "AVAILABLE"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {book.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(book)}
                        className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(book.id)}
                        className="p-2 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleFormSubmit}
        initialData={editingBook}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default DashboardPage;