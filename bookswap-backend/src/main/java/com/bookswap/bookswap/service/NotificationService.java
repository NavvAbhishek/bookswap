package com.bookswap.bookswap.service;

import com.bookswap.bookswap.dto.NotificationResponseDTO;
import com.bookswap.bookswap.model.Notification;
import com.bookswap.bookswap.model.User;
import com.bookswap.bookswap.repository.NotificationRepository;
import com.bookswap.bookswap.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    // Create a new notification
    public void createNotification(Long userId, String type, String message, Long swapRequestId, Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .message(message)
                .relatedSwapRequestId(swapRequestId)
                .relatedBookId(bookId)
                .isRead(false)
                .build();

        notificationRepository.save(notification);
    }

    // Get all notifications for current user
    @Transactional(readOnly = true)
    public List<NotificationResponseDTO> getNotificationsForUser(User currentUser) {
        List<Notification> notifications = notificationRepository.findByUserOrderByCreatedAtDesc(currentUser);
        return notifications.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Get unread count for current user
    @Transactional(readOnly = true)
    public Long getUnreadCount(User currentUser) {
        return notificationRepository.countByUserAndIsReadFalse(currentUser);
    }

    // Mark a single notification as read
    public NotificationResponseDTO markAsRead(Long notificationId, User currentUser) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found with id: " + notificationId));

        // Security check: ensure the notification belongs to the current user
        if (!notification.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You are not authorized to update this notification.");
        }

        notification.setIsRead(true);
        notification.setReadAt(LocalDateTime.now());
        notificationRepository.save(notification);

        return mapToDTO(notification);
    }

    // Mark all notifications as read for current user
    public void markAllAsRead(User currentUser) {
        List<Notification> unreadNotifications = notificationRepository.findByUserAndIsReadFalse(currentUser);
        LocalDateTime now = LocalDateTime.now();

        unreadNotifications.forEach(notification -> {
            notification.setIsRead(true);
            notification.setReadAt(now);
        });

        notificationRepository.saveAll(unreadNotifications);
    }

    // Map entity to DTO
    private NotificationResponseDTO mapToDTO(Notification notification) {
        return NotificationResponseDTO.builder()
                .id(notification.getId())
                .type(notification.getType())
                .message(notification.getMessage())
                .relatedSwapRequestId(notification.getRelatedSwapRequestId())
                .relatedBookId(notification.getRelatedBookId())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .readAt(notification.getReadAt())
                .build();
    }
}
