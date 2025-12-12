import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/notifications";

// Helper function to get the auth header with the JWT
const authHeader = () => {
  const user = AuthService.getCurrentUser();
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
};

class NotificationService {
  // Get all notifications for current user
  getNotifications() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  // Get unread count
  getUnreadCount() {
    return axios.get(API_URL + "/unread-count", { headers: authHeader() });
  }

  // Mark a single notification as read
  markAsRead(notificationId) {
    return axios.put(API_URL + `/${notificationId}/read`, {}, { headers: authHeader() });
  }

  // Mark all notifications as read
  markAllAsRead() {
    return axios.put(API_URL + "/mark-all-read", {}, { headers: authHeader() });
  }
}

export default new NotificationService();
