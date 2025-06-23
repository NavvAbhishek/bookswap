import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const signup = (signUpRequest, profilePicture) => {
    // FormData is required for sending files
    const formData = new FormData();

    // 1. Append the JSON data as a Blob
    // This is the standard way to send a JSON part in a multipart request
    const signUpRequestBlob = new Blob([JSON.stringify(signUpRequest)], {
        type: "application/json"
    });
    formData.append("signUpRequest", signUpRequestBlob);

    // 2. Append the file if it exists
    if (profilePicture) {
        formData.append("profilePicture", profilePicture);
    }

    // Axios will automatically set the correct 'Content-Type: multipart/form-data'
    return axios.post(API_URL + "signup", formData);
};

const AuthService = {
    signup,
};

export default AuthService;