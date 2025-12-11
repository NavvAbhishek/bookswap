import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthService from "../services/auth.service";
import { User, Mail, Lock, MapPin, Upload, CheckCircle, AlertCircle } from "lucide-react";
import LocationPicker from "../components/LocationPicker";
import Navbar from "../components/Navbar";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const defaultLocation = {
  lat: 6.8411, // Maharagama, Sri Lanka
  lng: 79.923,
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState(defaultLocation.lat);
  const [longitude, setLongitude] = useState(defaultLocation.lng);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
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
    setMessage("");
    setLoading(true);

    const signUpRequest = { name, email, password, latitude, longitude };

    AuthService.signup(signUpRequest, selectedFile).then(
      () => {
        setMessage("Sign up successful! You will be redirected to login.");
        setSuccessful(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
    <div className="min-h-screen bg-[#fff3b0]/20 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#e09f3e]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#335c67]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#9e2a2b]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <Navbar />

      <div className="relative flex items-center justify-center min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 text-[#335c67]"
            >
              Join BookSwap
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg"
            >
              Create your account and start swapping books
            </motion.p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-[#e09f3e] rounded-3xl blur-lg opacity-10" />

            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
              <form onSubmit={handleSignUp} className="space-y-6">
                {/* Name Input */}
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={User}
                />

                {/* Email Input */}
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                />

                {/* Password Input */}
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={Lock}
                />

                {/* Location Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <MapPin className="w-4 h-4 text-[#335c67]" />
                    Your Location
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Search for your city or drag the pin to set your primary location.
                  </p>
                  <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
                    <LocationPicker
                      onLocationChange={handleLocationChange}
                      initialPosition={{ lat: latitude, lng: longitude }}
                    />
                  </div>
                </div>

                {/* Profile Picture Upload */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Upload className="w-4 h-4 text-[#335c67]" />
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#fff3b0]/30 flex items-center justify-center border-2 border-gray-200">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <User className="w-10 h-10 text-gray-400" />
                        )}
                      </div>
                      {preview && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer"
                    >
                      <div className="px-6 py-3 bg-[#335c67] hover:bg-[#540b0e] text-white border-2 border-[#335c67] hover:border-[#540b0e] rounded-xl transition-all duration-300">
                        <span className="text-sm font-semibold">
                          {preview ? "Change Photo" : "Upload Photo"}
                        </span>
                      </div>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>

                {/* Message Display */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-2xl flex items-start gap-3 ${
                      successful
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    {successful ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <p
                      className={`text-sm ${
                        successful ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {message}
                    </p>
                  </motion.div>
                )}

                {/* Sign In Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-[#335c67] hover:text-[#e09f3e]"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
