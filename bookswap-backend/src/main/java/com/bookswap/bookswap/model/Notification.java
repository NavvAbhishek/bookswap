package com.bookswap.bookswap.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String type; // NEW_REQUEST, REQUEST_ACCEPTED, REQUEST_DECLINED

    @Column(nullable = false, length = 500)
    private String message;

    @Column(name = "related_swap_request_id")
    private Long relatedSwapRequestId;

    @Column(name = "related_book_id")
    private Long relatedBookId;

    @Column(nullable = false)
    private Boolean isRead = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime readAt;
}
