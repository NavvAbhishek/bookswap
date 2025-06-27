import React, { useState, useEffect } from 'react';
import BookService from '../services/book.service';
import { MapPinIcon } from '@heroicons/react/24/solid';

// --- Reusable Book Card Component for the Explore Page ---
const BookCard = ({ book }) => (
    <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
        <img className="object-cover w-full h-56" src={book.photoUrl} alt={book.title} />
        <div className="flex flex-col flex-grow p-4">
            <h3 className="text-lg font-bold text-gray-900">{book.title}</h3>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <div className="flex-grow mt-2">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                    {book.genre}
                </span>
            </div>
            <div className="mt-4 text-sm text-gray-700">
                <p>Owner: <span className="font-medium">{book.ownerName}</span></p>
                <div className="flex items-center mt-1">
                    <MapPinIcon className="w-4 h-4 mr-1 text-gray-400" />
                    <span>{book.location}</span>
                </div>
            </div>
            <button className="w-full px-4 py-2 mt-4 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                Request Swap
            </button>
        </div>
    </div>
);

// --- Main Explore Page Component ---
const ExplorePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        BookService.getExploreBooks()
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || "Could not fetch books. Please try again later.";
                setError(errorMsg);
                setLoading(false);
            });
    }, []);

    const renderContent = () => {
        if (loading) {
            return <p className="py-10 text-center text-gray-500">Loading books...</p>;
        }
        if (error) {
            return <p className="py-10 text-center text-red-500">{error}</p>;
        }
        if (books.length === 0) {
            return <p className="py-10 text-center text-gray-500">No books are available for swapping right now. Check back later!</p>;
        }
        return (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map(book => (
                    <BookCard key={book.id} book={book} />
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
                    <p className="mt-2 text-lg text-gray-600">Discover books from other readers in the network.</p>
                </div>
                
                {/* Placeholder for Search and Filter bar */}
                <div className="p-4 mb-8 bg-white rounded-lg shadow">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                        <input type="text" placeholder="Search by title or author..." className="flex-grow p-2 border rounded-md" />
                        <select className="p-2 border rounded-md">
                            <option>Filter by Genre</option>
                            <option>Fiction</option>
                            <option>Non-Fiction</option>
                            <option>Science Fiction</option>
                        </select>
                        <button className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Search</button>
                    </div>
                </div>

                {/* Content Grid */}
                {renderContent()}
            </div>
        </div>
    );
};

export default ExplorePage;