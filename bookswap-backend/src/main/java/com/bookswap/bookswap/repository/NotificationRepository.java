package com.bookswap.bookswap.repository;

import com.bookswap.bookswap.model.Notification;
import com.bookswap.bookswap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Find all notifications for a user, ordered by newest first
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    // Find unread notifications for a user
    List<Notification> findByUserAndIsReadFalse(User user);

    // Count unread notifications for a user
    Long countByUserAndIsReadFalse(User user);
}
