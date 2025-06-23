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

const login = (email, password) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response) => {
            // If the response contains a token, store it
            if (response.data.token) {
                // Storing the user object (which includes the token and name)
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
   signup,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;