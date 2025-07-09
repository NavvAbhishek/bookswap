import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const Navbar = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 flex items-center"
        >
          📚 BookSwap
        </Link>
        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link
                to="/explore"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Explore
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                My Books
              </Link>
              <span className="text-gray-700 font-medium">
                Welcome,{" "}
                <Link
                  to="/profile"
                  className="text-indigo-600 font-semibold"
                >
                  {currentUser.name.split(" ")[0]}
                </Link>
                !
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
