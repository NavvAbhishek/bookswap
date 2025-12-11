import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookService from "../services/book.service";
import SwapRequestService from "../services/swap-request.service";
import LocationPicker from "../components/LocationPicker";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Clock,
  XCircle,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#335c67]">
              {initialData ? "Edit Book" : "Add a New Book"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <Input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                required
              />
              <Input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Genre"
                required
              />
              <Input
                name="language"
                value={formData.language}
                onChange={handleChange}
                placeholder="Language"
                required
              />
              <select
                name="bookCondition"
                value={formData.bookCondition}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#335c67]/50 focus:border-[#335c67]"
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
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#335c67]/50 focus:border-[#335c67]"
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
              className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#335c67]/50 focus:border-[#335c67]"
              rows="3"
            ></textarea>

            <Input
              name="exchangePreference"
              value={formData.exchangePreference}
              onChange={handleChange}
              placeholder="Exchange Preference (e.g., Swap only)"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Location
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Search for a place or drag the pin to set the pickup location.
              </p>
              <div className="rounded-2xl overflow-hidden border-2 border-gray-200">
                <LocationPicker
                  onLocationChange={handleLocationChange}
                  initialPosition={{
                    lat: formData.latitude,
                    lng: formData.longitude,
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Photo
              </label>
              <div className="flex items-center gap-4">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-20 h-20 rounded-xl"
                  />
                )}
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#335c67] file:text-white hover:file:bg-[#540b0e] file:cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 gap-3 border-t border-gray-200">
              <Button
                type="button"
                onClick={onClose}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? "Save Changes" : "Add Book"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Reusable Delete Confirmation Modal ---
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">Are you sure?</h3>
          <p className="text-sm text-gray-600 mb-6">
            This action cannot be undone. You will permanently delete this book listing.
          </p>
          <div className="flex justify-end gap-3">
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-[#9e2a2b] hover:bg-[#540b0e]"
            >
              Delete
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main Dashboard Page Component ---
const DashboardPage = () => {
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
        setError("Failed to fetch dashboard data.", err);
        setLoading({ books: false, requests: false });
      });
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleUpdateRequest = (requestId, status) => {
    SwapRequestService.updateRequestStatus(requestId, status)
      .then(() => {
        fetchDashboardData();
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
      fetchDashboardData();
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
          fetchDashboardData();
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
      <Navbar />
      <div className="min-h-screen bg-[#fff3b0]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-[#335c67]">
                My Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your books and swap requests
              </p>
            </div>
            <Button
              onClick={handleOpenAddModal}
              size="lg"
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Book
            </Button>
          </motion.div>

          {/* My Books Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              My Book Listings
            </h2>
            <div className="relative">
              <div className="absolute -inset-1 bg-[#e09f3e] rounded-3xl blur-lg opacity-10"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                {loading.books && (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 border-4 border-[#e09f3e] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </div>
                )}

                {!loading.books && myBooks.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="text-gray-600">You haven't added any books yet.</p>
                  </div>
                )}

                {myBooks.map((book, index) => {
                  const requestsForThisBook = incomingRequestsMap.get(book.id) || [];
                  return (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          className="object-cover w-20 h-28 rounded-xl shadow-md"
                          src={book.photoUrl}
                          alt={book.title}
                        />
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg text-gray-900">{book.title}</h3>
                          <p className="text-sm text-gray-600">{book.author}</p>
                          <span
                            className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${
                              book.status === "AVAILABLE"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {book.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(book)}
                            className="p-2 text-[#335c67] rounded-xl hover:bg-[#fff3b0]/30 transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(book.id)}
                            className="p-2 text-[#9e2a2b] rounded-xl hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {requestsForThisBook.length > 0 && (
                        <div className="mt-4 pl-24">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">
                            Pending Requests:
                          </h4>
                          <div className="space-y-2">
                            {requestsForThisBook.map((req) => (
                              <div
                                key={req.id}
                                className="flex items-center justify-between p-3 bg-[#fff3b0]/20 rounded-xl"
                              >
                                <p className="text-sm text-gray-700">
                                  Request from{" "}
                                  <span className="font-semibold text-[#335c67]">
                                    {req.requesterName}
                                  </span>
                                </p>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleUpdateRequest(req.id, "ACCEPTED")}
                                    className="p-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleUpdateRequest(req.id, "DECLINED")}
                                    className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* My Swap Requests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              My Swap Requests
            </h2>
            <div className="relative">
              <div className="absolute -inset-1 bg-[#335c67] rounded-3xl blur-lg opacity-10"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                {loading.requests && (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 border-4 border-[#335c67] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </div>
                )}

                {!loading.requests && outgoingRequests.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="text-gray-600">You haven't requested any books.</p>
                  </div>
                )}

                {outgoingRequests.map((req, index) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        className="object-cover w-20 h-28 rounded-xl shadow-md"
                        src={req.book.photoUrl}
                        alt={req.book.title}
                      />
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg text-gray-900">{req.book.title}</h3>
                        <p className="text-sm text-gray-600">by {req.book.author}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Owner: <span className="font-medium">{req.ownerName}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-semibold">
                        {req.status === "PENDING" && (
                          <>
                            <Clock className="w-5 h-5 text-yellow-500" />
                            <span className="text-yellow-600">Pending</span>
                          </>
                        )}
                        {req.status === "ACCEPTED" && (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-green-600">Accepted</span>
                          </>
                        )}
                        {req.status === "DECLINED" && (
                          <>
                            <XCircle className="w-5 h-5 text-red-500" />
                            <span className="text-red-600">Declined</span>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
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
