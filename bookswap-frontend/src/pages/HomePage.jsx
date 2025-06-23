import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

// Icons from lucide-react
import { BookOpen, Users, MapPin, HeartHandshake, Leaf, Milestone, Star, Twitter, Facebook, Instagram } from 'lucide-react';


const featuredBooks = [
    { id: 1, title: 'The Midnight Library', author: 'Matt Haig', distance: '5 km', imageUrl: 'https://placehold.co/300x450/6366f1/white?text=The+Midnight\nLibrary' },
    { id: 2, title: 'Project Hail Mary', author: 'Andy Weir', distance: '2 km', imageUrl: 'https://placehold.co/300x450/10b981/white?text=Project\nHail+Mary' },
    { id: 3, title: 'Klara and the Sun', author: 'Kazuo Ishiguro', distance: '8 km', imageUrl: 'https://placehold.co/300x450/f59e0b/white?text=Klara+and\nthe+Sun' },
    { id: 4, title: 'Dune', author: 'Frank Herbert', distance: '12 km', imageUrl: 'https://placehold.co/300x450/ef4444/white?text=Dune' },
    { id: 5, title: 'Atomic Habits', author: 'James Clear', distance: '3 km', imageUrl: 'https://placehold.co/300x450/3b82f6/white?text=Atomic\nHabits' },
    { id: 6, title: 'The Silent Patient', author: 'Alex Michaelides', distance: '6 km', imageUrl: 'https://placehold.co/300x450/8b5cf6/white?text=The+Silent\nPatient' },
];

const testimonials = [
    { id: 1, name: 'Sarah J.', quote: 'BookSwap is amazing! I’ve discovered so many great books and met fellow readers in my neighborhood. It’s a game-changer for my wallet and the planet!', location: 'New York', imageUrl: 'https://placehold.co/100x100/ec4899/white?text=Sarah' },
    { id: 2, name: 'David L.', quote: 'The platform is so easy to use. I listed my old books and got a swap request within a day. Highly recommended for any book lover.', location: 'San Francisco', imageUrl: 'https://placehold.co/100x100/22c55e/white?text=David' },
    { id: 3, name: 'Emily C.', quote: 'As a student, buying books can be expensive. BookSwap has helped me save so much money while keeping my reading habit alive. Love the community aspect!', location: 'Chicago', imageUrl: 'https://placehold.co/100x100/f97316/white?text=Emily' },
];


const Navbar = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <header className="absolute top-0 left-0 right-0 z-20">
            <nav className="container px-6 py-4 mx-auto md:px-12">
                <div className="items-center justify-between md:flex">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-2xl font-bold text-white">
                            📚 BookSwap
                        </Link>
                    </div>
                    <div className="items-center hidden md:flex">
                        {currentUser ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-white">Welcome, {currentUser.name}!</span>
                                <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-200">My Books</Link>
                                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-center text-white hover:text-gray-200">Login</Link>
                                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-200">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

const BookCard = ({ book }) => (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <img className="object-cover w-full h-64" src={book.imageUrl} alt={book.title} />
        <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900">{book.title}</h3>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <p className="mt-2 text-sm font-medium text-indigo-600">📍 {book.distance} away</p>
            <button className="w-full px-4 py-2 mt-4 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                Request Swap
            </button>
        </div>
    </div>
);


// --- Main HomePage Component ---

const HomePage = () => {
    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <div className="relative pt-16 pb-32 text-white bg-gray-800">
                <div className="absolute inset-0">
                    <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" alt="Library Background" />
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                <Navbar />
                <div className="relative container px-6 mx-auto mt-16 text-center md:px-12">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                        Give Your Books a New Chapter
                    </h1>
                    <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-300 md:text-xl">
                        Join a vibrant community of readers. Exchange books you've finished for ones you're dying to read.
                    </p>
                    <div className="mt-8">
                        <Link to="/signup" className="px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700">
                            Start Swapping for Free
                        </Link>
                    </div>
                    {/* Quick Stats */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <div className="flex flex-wrap justify-center -mx-4">
                            <div className="w-full px-4 mb-4 md:w-1/3">
                                <p className="text-3xl font-bold">100+</p>
                                <p className="text-gray-400">Active Members</p>
                            </div>
                            <div className="w-full px-4 mb-4 md:w-1/3">
                                <p className="text-3xl font-bold">500+</p>
                                <p className="text-gray-400">Books Exchanged</p>
                            </div>
                            <div className="w-full px-4 mb-4 md:w-1/3">
                                <p className="text-3xl font-bold">10+</p>
                                <p className="text-gray-400">Cities Connected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Value Proposition Section */}
            <section className="py-20 bg-gray-50">
                <div className="container px-6 mx-auto md:px-12">
                    <div className="grid gap-12 md:grid-cols-3">
                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-indigo-600 bg-indigo-100 rounded-full">
                                <HeartHandshake size={32} />
                            </div>
                            <h3 className="text-xl font-bold">Save Money</h3>
                            <p className="mt-2 text-gray-600">Exchange books instead of buying new ones. Keep your wallet happy and your bookshelf fresh.</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-green-600 bg-green-100 rounded-full">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold">Meet Local Readers</h3>
                            <p className="mt-2 text-gray-600">Connect with book lovers near you and build a community around your shared passion for reading.</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-yellow-600 bg-yellow-100 rounded-full">
                                <Leaf size={32} />
                            </div>
                            <h3 className="text-xl font-bold">Eco-Friendly</h3>
                            <p className="mt-2 text-gray-600">Give your books a second life. Swapping is a sustainable choice that reduces waste and promotes reuse.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. How It Works Section */}
            <section className="py-20 bg-white">
                 <div className="container px-6 mx-auto text-center md:px-12">
                    <h2 className="text-3xl font-bold">Start Swapping in 4 Easy Steps</h2>
                    <div className="grid gap-8 mt-12 md:grid-cols-4">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-24 h-24 font-bold text-white bg-indigo-600 rounded-full text-3xl">1</div>
                            <h3 className="mt-4 text-lg font-semibold">List Your Books</h3>
                            <p className="mt-1 text-sm text-gray-500">Take a photo and add details about the books you want to exchange.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-24 h-24 font-bold text-white bg-indigo-600 rounded-full text-3xl">2</div>
                            <h3 className="mt-4 text-lg font-semibold">Match with Readers</h3>
                            <p className="mt-1 text-sm text-gray-500">Browse available books near you or get notified about wishlist matches.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-24 h-24 font-bold text-white bg-indigo-600 rounded-full text-3xl">3</div>
                            <h3 className="mt-4 text-lg font-semibold">Arrange a Meetup</h3>
                            <p className="mt-1 text-sm text-gray-500">Use our secure chat to agree on a time and public place to swap.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-24 h-24 font-bold text-white bg-indigo-600 rounded-full text-3xl">4</div>
                            <h3 className="mt-4 text-lg font-semibold">Swap and Enjoy!</h3>
                            <p className="mt-1 text-sm text-gray-500">Meet your swap partner, exchange books, and dive into your next adventure.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Featured Books Section */}
            <section className="py-20 bg-gray-50">
                <div className="container px-6 mx-auto md:px-12">
                    <h2 className="mb-12 text-3xl font-bold text-center">Recently Added Books</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link to="/books" className="px-6 py-3 font-semibold text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white">
                            Browse All Books
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Social Proof Section */}
            <section className="py-20 bg-indigo-700 text-white">
                <div className="container px-6 mx-auto md:px-12">
                    <h2 className="mb-12 text-3xl font-bold text-center">Loved by Readers Like You</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="p-6 bg-indigo-600 rounded-lg">
                                <div className="flex items-center mb-4">
                                    <img src={testimonial.imageUrl} alt={testimonial.name} className="w-16 h-16 mr-4 border-2 border-white rounded-full"/>
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-sm text-indigo-200">{testimonial.location}</p>
                                    </div>
                                </div>
                                <p className="text-indigo-100">"{testimonial.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* 6. Download App Section */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="items-center md:flex">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-800">Take BookSwap Anywhere</h2>
                            <p className="mt-4 text-gray-600">Our mobile app makes it even easier to discover, list, and swap books on the go. Get notified instantly about new matches and messages.</p>
                            <div className="flex mt-8 space-x-4">
                                <a href="#" className="flex items-center justify-center w-48 px-4 py-3 bg-gray-800 rounded-lg text-white">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png" className="w-6 h-6 mr-3 invert" alt="Apple logo"/>
                                    <div>
                                        <p className="text-xs">Download on the</p>
                                        <p className="text-xl font-semibold">App Store</p>
                                    </div>
                                </a>
                                <a href="#" className="flex items-center justify-center w-48 px-4 py-3 bg-gray-800 rounded-lg text-white">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Google_Play_logo.svg" className="w-6 h-6 mr-3" alt="Google Play logo" />
                                     <div>
                                        <p className="text-xs">GET IT ON</p>
                                        <p className="text-xl font-semibold">Google Play</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="mt-8 md:mt-0 md:w-1/2">
                             <img src="https://placehold.co/500x500/ffffff/ffffff?text=." alt="Mobile App Mockup" className="mx-auto rounded-lg" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1589434193433-5c8291a8e1a7?w=500' }}/>
                        </div>
                    </div>
                </div>
            </section>


            {/* 7. Footer */}
            <footer className="bg-gray-800 text-gray-300">
                <div className="container px-6 py-12 mx-auto md:px-12">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div>
                            <h3 className="text-lg font-bold text-white">BookSwap</h3>
                            <p className="mt-2 text-sm">Giving books a new chapter.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Quick Links</h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                             <h3 className="font-semibold text-white">Legal</h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Stay Updated</h3>
                            <p className="mt-4 text-sm">Join our newsletter for the latest updates and featured books.</p>
                            <form className="flex mt-4">
                                <input type="email" placeholder="Your email" className="w-full px-3 py-2 text-gray-900 rounded-l-lg focus:outline-none"/>
                                <button className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-700">
                        <p className="text-sm">&copy; {new Date().getFullYear()} BookSwap. All rights reserved.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white"><Twitter size={20}/></a>
                            <a href="#" className="hover:text-white"><Facebook size={20}/></a>
                            <a href="#" className="hover:text-white"><Instagram size={20}/></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;