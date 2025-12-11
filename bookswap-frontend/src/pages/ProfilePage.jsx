import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {
  User,
  Edit,
  LogOut,
  MapPin,
  BookOpen,
  Mail,
  ExternalLink,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getProfile().then(
      (response) => {
        setProfile(response.data);
        setLoading(false);
      },
      (error) => {
        setError("Failed to fetch profile data. You may need to log in again.");
        setLoading(false);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          AuthService.logout();
          navigate("/login");
        }
      }
    );
  }, [navigate]);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff3b0]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e09f3e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fff3b0]/20 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${profile.latitude},${profile.longitude}`;

  return (
    <div className="min-h-screen bg-[#fff3b0]/20">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Profile Header Card */}
          <div className="relative mb-8">
            <div className="absolute -inset-1 bg-[#e09f3e] rounded-3xl blur-lg opacity-20"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Cover Background */}
              <div className="h-32 bg-[#335c67]"></div>

              <div className="px-6 sm:px-8 pb-8">
                <div className="sm:flex sm:items-end sm:space-x-6 -mt-16">
                  {/* Profile Picture */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex-shrink-0 mb-4 sm:mb-0"
                  >
                    {profile.profilePictureUrl ? (
                      <img
                        className="object-cover w-32 h-32 rounded-2xl border-4 border-white shadow-xl"
                        src={profile.profilePictureUrl}
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-[#fff3b0] flex items-center justify-center">
                        <User className="w-16 h-16 text-[#335c67]" />
                      </div>
                    )}
                  </motion.div>

                  {/* Profile Info */}
                  <div className="flex-grow sm:mt-16">
                    <h1 className="text-3xl font-bold text-gray-900 capitalize mb-1">
                      {profile.name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Mail className="w-4 h-4" />
                      <p className="text-sm">{profile.email}</p>
                    </div>

                    {profile.locationName && (
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2 max-w-md">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-[#e09f3e]" />
                          <span className="text-sm font-medium">
                            {profile.locationName}
                          </span>
                        </div>
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-[#335c67] hover:text-[#e09f3e] flex items-center gap-1"
                        >
                          View Map
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 sm:mt-16 flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="md"
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                    <Button
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-[#9e2a2b] hover:bg-[#540b0e]"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Books Listed", value: "0", icon: BookOpen, color: "bg-[#e09f3e]" },
              { label: "Swaps Made", value: "0", icon: BookOpen, color: "bg-[#335c67]" },
              { label: "Active Requests", value: "0", icon: BookOpen, color: "bg-[#9e2a2b]" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute -inset-1 ${stat.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-300`}></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* My Books Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-[#e09f3e] rounded-3xl blur-lg opacity-10"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Books</h2>

              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#fff3b0]/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-[#335c67]" />
                </div>
                <p className="text-gray-600 mb-6">
                  You haven't added any books yet.
                </p>
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="lg"
                >
                  Add Your First Book
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
