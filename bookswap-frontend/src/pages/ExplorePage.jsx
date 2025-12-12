import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookService from "../services/book.service";
import SwapRequestService from "../services/swap-request.service";
import {
  MapPin,
  ExternalLink,
  User,
  Search,
  Filter,
  BookOpen,
  Check,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";

// --- Reusable Book Card Component for the Explore Page ---
const BookCard = ({ book, onRequestSwap, isRequested, isRequesting, index }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${book.latitude},${book.longitude}`;

  const formatDistance = (distance) => {
    if (distance < 1) {
      return "< 1 km";
    }
    return `${distance.toFixed(1)} km`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-[#e09f3e] rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500" />

      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200">
        {/* Book Image */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover"
            src={book.photoUrl}
            alt={book.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Distance Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#335c67] flex items-center gap-1 shadow-lg">
            <MapPin className="w-3 h-3 text-[#e09f3e]" />
            {formatDistance(book.distanceKm)}
          </div>

          {/* Genre Badge */}
          <div className="absolute top-4 left-4 bg-[#335c67]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
            {book.genre}
          </div>

          {/* Request Count Badge */}
          {book.requestCount != null && book.requestCount > 0 && (
            <div className="absolute bottom-4 left-4 bg-[#9e2a2b]/95 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {book.requestCount} {book.requestCount === 1 ? 'request' : 'requests'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">by {book.author}</p>

          {/* Description */}
          {book.description && (
            <p className="text-sm text-gray-700 line-clamp-2 mb-4">
              {book.description}
            </p>
          )}

          {/* Owner Info */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
            <div className="w-8 h-8 rounded-full bg-[#fff3b0] flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-[#335c67]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500">Owner</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {book.ownerName}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 mb-4">
            <div className="flex items-center gap-2 text-gray-700 min-w-0">
              <MapPin className="w-4 h-4 text-[#e09f3e] flex-shrink-0" />
              <span className="text-xs font-medium truncate">
                {book.locationName}
              </span>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#335c67] hover:text-[#e09f3e] flex items-center gap-1 flex-shrink-0 ml-2"
              onClick={(e) => e.stopPropagation()}
            >
              Map
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Request Button */}
          <motion.button
            whileHover={!isRequested && !isRequesting ? { scale: 1.02 } : {}}
            whileTap={!isRequested && !isRequesting ? { scale: 0.98 } : {}}
            onClick={() => onRequestSwap(book.id)}
            disabled={isRequested || isRequesting}
            className={`w-full font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
              isRequested
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : isRequesting
                ? "bg-[#e09f3e]/70 text-white cursor-wait"
                : "bg-[#e09f3e] hover:bg-[#9e2a2b] text-white shadow-md hover:shadow-lg"
            }`}
          >
            {isRequested ? (
              <>
                <Check className="w-4 h-4" />
                Requested
              </>
            ) : isRequesting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Requesting...
              </>
            ) : (
              "Request Swap"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Explore Page Component ---
const ExplorePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestedBookIds, setRequestedBookIds] = useState(new Set());
  const [requestingBookId, setRequestingBookId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    setLoading(true);
    // Fetch both books and user's outgoing requests
    Promise.all([
      BookService.getExploreBooks(),
      SwapRequestService.getOutgoingRequests()
    ])
      .then(([booksResponse, requestsResponse]) => {
        setBooks(booksResponse.data);

        // Initialize requestedBookIds with books already requested
        const requestedIds = new Set(
          requestsResponse.data
            .filter(req => req.status === 'PENDING')
            .map(req => req.book.id)
        );
        setRequestedBookIds(requestedIds);

        setLoading(false);
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.message ||
          "Could not fetch books. Please try again later.";
        setError(errorMsg);
        setLoading(false);
      });
  }, []);

  const handleRequestSwap = (bookId) => {
    setRequestingBookId(bookId);
    SwapRequestService.createRequest(bookId)
      .then(() => {
        setRequestedBookIds((prev) => new Set(prev).add(bookId));
        setRequestingBookId(null);
      })
      .catch((err) => {
        setRequestingBookId(null);
      });
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-[#e09f3e] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading books...</p>
        </div>
      );
    }
    if (error) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-red-600" />
          </div>
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </motion.div>
      );
    }
    if (filteredBooks.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 bg-[#fff3b0] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-[#335c67]" />
          </div>
          <p className="text-gray-600 text-lg mb-2">No books found</p>
          <p className="text-gray-500 text-sm">
            {searchQuery || selectedGenre
              ? "Try adjusting your search filters"
              : "Check back later for new books!"}
          </p>
        </motion.div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
            onRequestSwap={handleRequestSwap}
            isRequested={requestedBookIds.has(book.id)}
            isRequesting={requestingBookId === book.id}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fff3b0]/20">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            Explore <span className="text-[#335c67]">Books</span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover books from readers in your network
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-1 bg-[#e09f3e] rounded-3xl blur-lg opacity-20"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#335c67]/50 focus:border-[#335c67] outline-none transition-all"
                />
              </div>

              {/* Genre Filter */}
              <div className="relative lg:w-64">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#335c67]/50 focus:border-[#335c67] outline-none appearance-none cursor-pointer transition-all"
                >
                  <option value="">All Genres</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Biography">Biography</option>
                  <option value="History">History</option>
                  <option value="Self-Help">Self-Help</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              {(searchQuery || selectedGenre) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("");
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                >
                  Clear
                </motion.button>
              )}
            </div>

            {/* Results Count */}
            {!loading && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-gray-600"
              >
                Showing {filteredBooks.length} of {books.length} books
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filteredBooks.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExplorePage;
