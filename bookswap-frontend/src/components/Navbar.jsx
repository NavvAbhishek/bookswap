import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, Sparkles, User, Bell, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import AuthService from "../services/auth.service";
import NotificationService from "../services/notification.service";

const Navbar = () => {
  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);

  const isHomePage = location.pathname === "/";

  // Fetch unread count
  const fetchUnreadCount = () => {
    if (currentUser) {
      NotificationService.getUnreadCount()
        .then((response) => {
          setUnreadCount(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching unread count:", error);
        });
    }
  };

  // Fetch all notifications
  const fetchNotifications = () => {
    if (currentUser) {
      NotificationService.getNotifications()
        .then((response) => {
          setNotifications(response.data);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  };

  // Polling: Fetch unread count every 10 seconds
  useEffect(() => {
    if (currentUser) {
      fetchUnreadCount(); // Initial fetch
      const interval = setInterval(fetchUnreadCount, 10000); // Poll every 10 seconds
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (showNotifications) {
      fetchNotifications();
    }
  }, [showNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark notification as read
  const handleMarkAsRead = (notificationId) => {
    NotificationService.markAsRead(notificationId)
      .then(() => {
        fetchNotifications();
        fetchUnreadCount();
      })
      .catch((error) => {
        console.error("Error marking notification as read:", error);
      });
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    NotificationService.markAllAsRead()
      .then(() => {
        fetchNotifications();
        fetchUnreadCount();
      })
      .catch((error) => {
        console.error("Error marking all as read:", error);
      });
  };

  // Get time ago text
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
  };

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
                    className="text-gray-700 hover:text-white font-medium px-4 py-2 rounded-xl hover:bg-[#e09f3e] transition-all duration-300"
                  >
                    Explore
                  </Link>
                )}
                {location.pathname !== "/dashboard" && (
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-white font-medium px-4 py-2 rounded-xl hover:bg-[#e09f3e] transition-all duration-300"
                  >
                    My Books
                  </Link>
                )}

                {/* Notification Bell */}
                <div className="relative" ref={notificationRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Bell className="w-6 h-6 text-gray-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#9e2a2b] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </motion.button>

                  {/* Notification Dropdown */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                      >
                        {/* Header */}
                        <div className="px-4 py-3 bg-[#335c67] text-white flex items-center justify-between">
                          <h3 className="font-bold text-lg">Notifications</h3>
                          {notifications.length > 0 && (
                            <button
                              onClick={handleMarkAllAsRead}
                              className="text-xs font-medium hover:underline"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>

                        {/* Notification List */}
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                              <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                              <p className="text-sm">No notifications yet</p>
                            </div>
                          ) : (
                            notifications.slice(0, 10).map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                                  !notification.isRead ? 'bg-[#fff3b0]/20' : ''
                                }`}
                                onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-800 mb-1">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {getTimeAgo(notification.createdAt)}
                                    </p>
                                  </div>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-[#e09f3e] rounded-full mt-1"></div>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {notifications.length > 10 && (
                          <div className="px-4 py-3 bg-gray-50 text-center">
                            <p className="text-xs text-gray-600">
                              Showing 10 of {notifications.length} notifications
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {location.pathname !== "/" && location.pathname !== "/profile" && (
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-white font-medium px-4 py-2 rounded-xl hover:bg-[#e09f3e] transition-all duration-300 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
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
                        className="text-gray-700 hover:text-white font-medium px-4 py-3 rounded-xl hover:bg-[#e09f3e] transition-all"
                      >
                        Explore
                      </Link>
                    )}
                    {location.pathname !== "/dashboard" && (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-700 hover:text-white font-medium px-4 py-3 rounded-xl hover:bg-[#e09f3e] transition-all"
                      >
                        My Books
                      </Link>
                    )}
                    {location.pathname !== "/profile" && (
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-700 hover:text-white font-medium px-4 py-3 rounded-xl hover:bg-[#e09f3e] transition-all flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Profile ({currentUser.name.split(" ")[0]})
                      </Link>
                    )}
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
