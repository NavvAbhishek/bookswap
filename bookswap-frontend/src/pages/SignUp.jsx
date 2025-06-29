import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { UserCircleIcon } from '@heroicons/react/24/solid'; 
import LocationPicker from '../components/LocationPicker'

const defaultLocation = {
  lat: 6.8411, // Maharagama, Sri Lanka
  lng: 79.923,
};

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const [latitude, setLatitude] = useState(defaultLocation.lat);
    const [longitude, setLongitude] = useState(defaultLocation.lng);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Create a preview of the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLocationChange = (newLocation) => {
        setLatitude(newLocation.lat);
        setLongitude(newLocation.lng);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const signUpRequest = { name, email, password, latitude, longitude };

        AuthService.signup(signUpRequest, selectedFile).then(
            () => {
                setMessage("Sign up successful! You will be redirected to login.");
                setSuccessful(true);
                setLoading(false);
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Redirect after 2 seconds
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
                setLoading(false);
            }
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join the BookSwap!</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Location Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Location</label>
                        <p className="text-xs text-gray-500 mb-2">Search for your city or drag the pin to set your primary location.</p>
                        <LocationPicker
                            onLocationChange={handleLocationChange}
                            initialPosition={{ lat: latitude, lng: longitude }}
                        />
                    </div>

                    {/* Profile Picture Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700"> Profile Photo </label>
                        <div className="flex items-center mt-1 space-x-4">
                            <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                                ) : (
                                    <UserCircleIcon className="w-full h-full text-gray-300" />
                                )}
                            </span>
                            <label htmlFor="file-upload" className="px-3 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md shadow-sm cursor-pointer hover:bg-indigo-50">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>


                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                            disabled={loading}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>

                    {/* Message Display */}
                    {message && (
                        <div className={`p-4 text-sm rounded-md ${ successful ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' }`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SignUp;