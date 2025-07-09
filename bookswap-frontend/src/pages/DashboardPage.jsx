import React, { useState, useEffect, useCallback, useMemo } from "react";
import BookService from "../services/book.service";
import SwapRequestService from "../services/swap-request.service";
import LocationPicker from "../components/LocationPicker";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";

const defaultLocation = { lat: 6.8411, lng: 79.923 };

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
    latitude: defaultLocation.lat,
    longitude: defaultLocation.lng,
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
        latitude: initialData.latitude || defaultLocation.lat,
        longitude: initialData.longitude || defaultLocation.lng,
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
        latitude: defaultLocation.lat,
        longitude: defaultLocation.lng,
        status: "AVAILABLE",
      });
      setPreview(null);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (newLocation) => {
    setFormData((prev) => ({
      ...prev,
      latitude: newLocation.lat,
      longitude: newLocation.lng,
    }));
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Book Location
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Search for a place or drag the pin to set the pickup location.
            </p>
            <LocationPicker
              onLocationChange={handleLocationChange}
              initialPosition={{
                lat: formData.latitude,
                lng: formData.longitude,
              }}
            />
          </div>
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
  //const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [loading, setLoading] = useState({ books: true, requests: true });
  const [error, setError] = useState("");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingBookId, setDeletingBookId] = useState(null);

  const fetchDashboardData = useCallback(() => {
    setLoading({ books: true, requests: true });
    Promise.all([
      BookService.getMyBooks(),
      SwapRequestService.getOutgoingRequests(),
      SwapRequestService.getIncomingRequests(),
    ])
      .then(([myBooksRes, outgoingRes, incomingRes]) => {
        setMyBooks(myBooksRes.data);
        setOutgoingRequests(outgoingRes.data);
        setIncomingRequests(incomingRes.data);
        setLoading({ books: false, requests: false });
      })
      .catch((err) => {
        setError("Failed to fetch dashboard data.",err);
        setLoading({ books: false, requests: false });
      });
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleUpdateRequest = (requestId, status) => {
    SwapRequestService.updateRequestStatus(requestId, status)
      .then(() => {
        fetchDashboardData(); // Refresh all data after an update
        alert(`Request has been ${status.toLowerCase()}.`);
      })
      .catch(() => alert("Failed to update request."));
  };

  const incomingRequestsMap = useMemo(() => {
    const map = new Map();
    incomingRequests.forEach((req) => {
      if (req.book && req.status === "PENDING") {
        if (!map.has(req.book.id)) {
          map.set(req.book.id, []);
        }
        map.get(req.book.id).push(req);
      }
    });
    return map;
  }, [incomingRequests]);

  /* const fetchMyBooks = useCallback(() => {
    setLoading(true);
    BookService.getMyBooks().then(
      (response) => {
        setBooks(response.data);
        setLoading(false);
      },
      (error) => {
        setError("Failed to fetch your books.", error);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    fetchMyBooks();
  }, [fetchMyBooks]); */

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

  const handleFormSubmit = async (formData, photo) => {
    try {
      let bookData = { ...formData };

      if (photo instanceof File) {
        const uploadResponse = await BookService.uploadBookPhoto(photo);
        bookData.photoFilename = uploadResponse.data.filename;
      }

      await BookService.addBook(bookData);

      //fetchMyBooks();
      handleCloseModals();
    } catch (err) {
      console.error("Failed to save book:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Could not save the book. Please try again.";
      alert("Error: " + errorMsg);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingBookId) {
      BookService.deleteBook(deletingBookId)
        .then(() => {
          //fetchMyBooks(); // Refresh the list
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
    <Navbar/>
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

          {/* --- 1. MY BOOKS LISTING (OWNER'S VIEW) --- */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              My Book Listings
            </h2>
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {loading.books && (
                  <li>
                    <p className="p-4 text-center">Loading...</p>
                  </li>
                )}
                {!loading.books && myBooks.length === 0 && (
                  <li>
                    <p className="p-8 text-center">
                      You haven't added any books yet.
                    </p>
                  </li>
                )}
                {myBooks.map((book) => {
                  const requestsForThisBook =
                    incomingRequestsMap.get(book.id) || [];
                  return (
                    <li key={book.id} className="p-4">
                      <div className="flex items-center space-x-4">
                        {/* Book Info */}
                        <img
                          className="object-cover w-16 h-20 rounded"
                          src={book.photoUrl}
                          alt={book.title}
                        />
                        <div className="flex-grow">
                          <p className="font-semibold">{book.title}</p>
                          <p className="text-sm text-gray-500">{book.author}</p>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              book.status === "AVAILABLE"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {book.status}
                          </span>
                        </div>
                        {/* Action Buttons */}
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
                      {/* Incoming Requests for this book */}
                      {requestsForThisBook.length > 0 && (
                        <div className="mt-4 pl-20">
                          <h4 className="text-sm font-semibold text-gray-600">
                            Pending Requests:
                          </h4>
                          <ul className="mt-2 space-y-2">
                            {requestsForThisBook.map((req) => (
                              <li
                                key={req.id}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                              >
                                <p className="text-sm">
                                  Request from{" "}
                                  <span className="font-medium">
                                    {req.requesterName}
                                  </span>
                                </p>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() =>
                                      handleUpdateRequest(req.id, "ACCEPTED")
                                    }
                                    className="p-1.5 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                                  >
                                    <CheckIcon className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleUpdateRequest(req.id, "DECLINED")
                                    }
                                    className="p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                  >
                                    <XMarkIcon className="w-4 h-4" />
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* --- 2. REQUESTED BOOKS (REQUESTER'S VIEW) --- */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              My Swap Requests
            </h2>
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {loading.requests && (
                  <li>
                    <p className="p-4 text-center">Loading...</p>
                  </li>
                )}
                {!loading.requests && outgoingRequests.length === 0 && (
                  <li>
                    <p className="p-8 text-center">
                      You haven't requested any books.
                    </p>
                  </li>
                )}
                {outgoingRequests.map((req) => (
                  <li key={req.id} className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        className="object-cover w-16 h-20 rounded"
                        src={req.book.photoUrl}
                        alt={req.book.title}
                      />
                      <div className="flex-grow">
                        <p className="font-semibold">{req.book.title}</p>
                        <p className="text-sm text-gray-500">
                          by {req.book.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          Owner: {req.ownerName}
                        </p>
                      </div>
                      {/* Status Badge */}
                      <div className="flex items-center text-sm font-medium">
                        {req.status === "PENDING" && (
                          <>
                            <ClockIcon className="w-5 h-5 mr-1.5 text-yellow-500" />
                            <span className="text-yellow-600">Pending</span>
                          </>
                        )}
                        {req.status === "ACCEPTED" && (
                          <>
                            <CheckCircleIcon className="w-5 h-5 mr-1.5 text-green-500" />
                            <span className="text-green-600">Accepted</span>
                          </>
                        )}
                        {req.status === "DECLINED" && (
                          <>
                            <XCircleIcon className="w-5 h-5 mr-1.5 text-red-500" />
                            <span className="text-red-600">Declined</span>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
