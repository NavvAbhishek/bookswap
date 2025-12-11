import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import AuthService from "../services/auth.service";

const Navbar = () => {
  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? "bg-white/70 backdrop-blur-xl border-b border-white/20"
          : "bg-white/90 backdrop-blur-xl shadow-lg"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-[#335c67] rounded-xl flex items-center justify-center shadow-lg"
            >
              <BookOpen className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#335c67]">
                BookSwap
              </span>
              <span className="text-xs text-gray-500 -mt-1">Exchange & Explore</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                {location.pathname !== "/explore" && (
                  <Link
                    to="/explore"
                    className="text-gray-700 hover:text-[#335c67] font-medium px-4 py-2 rounded-xl hover:bg-[#fff3b0]/30 transition-all duration-300"
                  >
                    Explore
                  </Link>
                )}
                {location.pathname !== "/dashboard" && (
                  <Link to="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 bg-[#e09f3e] hover:bg-[#9e2a2b] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      My Books
                    </motion.button>
                  </Link>
                )}
                {location.pathname === "/" && (
                  <div className="flex items-center gap-2 ml-2">
                    <Sparkles className="w-4 h-4 text-[#e09f3e]" />
                    <span className="text-gray-700 font-medium">
                      Welcome,{" "}
                      <Link
                        to="/profile"
                        className="text-[#335c67] font-bold hover:underline"
                      >
                        {currentUser.name.split(" ")[0]}
                      </Link>
                      !
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                {location.pathname !== "/login" && (
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                    >
                      Login
                    </motion.button>
                  </Link>
                )}
                {location.pathname !== "/signup" && location.pathname !== "/" && (
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 bg-[#e09f3e] hover:bg-[#9e2a2b] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex flex-col gap-2">
                {currentUser ? (
                  <>
                    {location.pathname !== "/explore" && (
                      <Link
                        to="/explore"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-700 hover:text-[#335c67] font-medium px-4 py-3 rounded-xl hover:bg-[#fff3b0]/30 transition-all"
                      >
                        Explore
                      </Link>
                    )}
                    {location.pathname !== "/dashboard" && (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-3 bg-[#e09f3e] hover:bg-[#9e2a2b] text-white font-semibold rounded-xl text-center transition-colors"
                      >
                        My Books
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-[#335c67] font-medium px-4 py-3 rounded-xl hover:bg-[#fff3b0]/30 transition-all"
                    >
                      Profile ({currentUser.name.split(" ")[0]})
                    </Link>
                  </>
                ) : (
                  <>
                    {location.pathname !== "/login" && (
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-700 hover:text-[#335c67] font-medium px-4 py-3 rounded-xl hover:bg-[#fff3b0]/30 transition-all"
                      >
                        Login
                      </Link>
                    )}
                    {location.pathname !== "/signup" && (
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-3 bg-[#e09f3e] hover:bg-[#9e2a2b] text-white font-semibold rounded-xl text-center transition-colors"
                      >
                        Sign Up
                      </Link>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
