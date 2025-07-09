import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {
  UserCircleIcon,
  PencilSquareIcon,
  ArrowRightStartOnRectangleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";

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
        // Optional: Log out user if token is invalid
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
    return <div className="text-center p-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${profile.latitude},${profile.longitude}`;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="sm:flex sm:items-center sm:space-x-6">
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  {profile.profilePictureUrl ? (
                    <img
                      className="object-cover w-24 h-24 rounded-full border-4 border-indigo-200"
                      src={profile.profilePictureUrl}
                      alt="Profile"
                    />
                  ) : (
                    <UserCircleIcon className="w-24 h-24 text-gray-300" />
                  )}
                </div>
                <div className="flex-grow">
                  <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    {profile.name}
                  </h1>
                  <p className="text-sm text-gray-500">{profile.email}</p>

                  {profile.locationName && (
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />

                        <span>{profile.locationName}</span>
                      </div>
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        View on Map
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-4 sm:mt-0 flex flex-col space-y-2">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                    <PencilSquareIcon className="w-5 h-5 mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
                  >
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional sections like 'My Books', 'My Swaps' can be added here */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800">My Books</h2>
            <div className="p-8 mt-4 text-center bg-white rounded-lg shadow-lg">
              <p className="text-gray-500">You haven't added any books yet.</p>
              <button className="px-4 py-2 mt-4 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Add Your First Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
