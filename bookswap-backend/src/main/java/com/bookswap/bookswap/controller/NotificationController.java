package com.bookswap.bookswap.controller;

import com.bookswap.bookswap.dto.NotificationResponseDTO;
import com.bookswap.bookswap.model.User;
import com.bookswap.bookswap.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // Get all notifications for current user
    @GetMapping
    public ResponseEntity<List<NotificationResponseDTO>> getNotifications(@AuthenticationPrincipal User currentUser) {
        List<NotificationResponseDTO> notifications = notificationService.getNotificationsForUser(currentUser);
        return ResponseEntity.ok(notifications);
    }

    // Get unread count
    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(@AuthenticationPrincipal User currentUser) {
        Long count = notificationService.getUnreadCount(currentUser);
        return ResponseEntity.ok(Map.of("count", count));
    }

    // Mark a single notification as read
    @PutMapping("/{id}/read")
    public ResponseEntity<NotificationResponseDTO> markAsRead(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        NotificationResponseDTO notification = notificationService.markAsRead(id, currentUser);
        return ResponseEntity.ok(notification);
    }

    // Mark all notifications as read
    @PutMapping("/mark-all-read")
    public ResponseEntity<Map<String, String>> markAllAsRead(@AuthenticationPrincipal User currentUser) {
        notificationService.markAllAsRead(currentUser);
        return ResponseEntity.ok(Map.of("message", "All notifications marked as read"));
    }
}
