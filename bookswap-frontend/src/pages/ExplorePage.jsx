import React, { useState, useEffect } from "react";
import BookService from "../services/book.service";
import SwapRequestService from "../services/swap-request.service";
import {
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

// --- Reusable Book Card Component for the Explore Page ---
const BookCard = ({ book, onRequestSwap, isRequested }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${book.latitude},${book.longitude}`;

  const formatDistance = (distance) => {
    if (distance < 1) {
      return "Less than 1 km";
    }
    // Round to one decimal place
    return `${distance.toFixed(1)} km away`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xl w-full">
      <div className="flex flex-row p-4">
        <img
          className="object-cover w-auto h-44 rounded-md flex-shrink-0"
          src={book.photoUrl}
          alt={book.title}
        />

        <div className="ml-4 flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
            <span className="inline-block px-2 py-1 text-[10px] font-semibold text-indigo-800 bg-indigo-100 rounded-full mb-1">
              {book.genre}
            </span>
          </div>
          <div className="text-sm text-gray-700 mt-2">
            Owner: <span className="font-medium">{book.ownerName}</span>
          </div>
        </div>
      </div>
      <div className="px-4">
        <p>{book.description}</p>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center text-gray-700 text-sm">
          <MapPinIcon className="w-4 h-4 mr-1 text-red-500" />
          <span>{book.locationName}</span>
        </div>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800"
        >
          View on Map
          <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
        </a>
      </div>
      <div className="flex items-center mt-1 text-gray-500 text-sm px-4">
        <p className="font-bold">
          Distance:{" "}
          <span className="font-normal">{formatDistance(book.distanceKm)}</span>
        </p>
      </div>

      <div className="px-4 py-4">
        <button
          onClick={() => onRequestSwap(book.id)}
          disabled={isRequested}
          className={`w-full cursor-pointer px-4 py-2 mt-4 font-bold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            isRequested
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
          }`}
        >
          {isRequested ? "Requested" : "Request Swap"}{" "}
          {/* <-- 4. Change text */}
        </button>
      </div>
    </div>
  );
};

// --- Main Explore Page Component ---
const ExplorePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestedBookIds, setRequestedBookIds] = useState(new Set());

  useEffect(() => {
    setLoading(true);
    BookService.getExploreBooks()
      .then((response) => {
        setBooks(response.data);
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
    SwapRequestService.createRequest(bookId)
      .then(() => {
        // Add the book ID to our set of requested IDs to update the UI
        setRequestedBookIds((prev) => new Set(prev).add(bookId));
        alert("Swap request sent successfully!");
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.message || "Could not send swap request.";
        alert(`Error: ${errorMsg}`);
      });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <p className="py-10 text-center text-gray-500">Loading books...</p>
      );
    }
    if (error) {
      return <p className="py-10 text-center text-red-500">{error}</p>;
    }
    if (books.length === 0) {
      return (
        <p className="py-10 text-center text-gray-500">
          No books are available for swapping right now. Check back later!
        </p>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onRequestSwap={handleRequestSwap}
            isRequested={requestedBookIds.has(book.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-6 py-8 mx-auto md:px-12">
        {/* Header and Filters */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Explore Books</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover books from other readers in the network.
          </p>
        </div>

        {/* Placeholder for Search and Filter bar */}
        <div className="p-4 mb-8 bg-white rounded-lg shadow">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="flex-grow p-2 border rounded-md"
            />
            <select className="p-2 border rounded-md">
              <option>Filter by Genre</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Science Fiction</option>
            </select>
            <button className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Search
            </button>
          </div>
        </div>

        {/* Content Grid */}
        {renderContent()}
      </div>
    </div>
  );
};

export default ExplorePage;
