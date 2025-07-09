import { Link, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

const Navbar = () => {
  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();

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
              {location.pathname !== "/explore" && (
                <Link
                  to="/explore"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Explore
                </Link>
              )}
              {location.pathname !== "/dashboard" && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                  My Books
                </Link>
              )}
              {location.pathname === "/" && (
                <span className="text-gray-700 font-medium">
                  Welcome,{" "}
                  <Link to="/profile" className="text-indigo-600 font-semibold">
                    {currentUser.name.split(" ")[0]}
                  </Link>
                  !
                </span>
              )}
            </>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <Link
                  to="/login"
                   className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
              )}
              {location.pathname !== "/signup" && location.pathname !== "/" && (
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
