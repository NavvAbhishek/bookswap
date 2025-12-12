package com.bookswap.bookswap.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResponseDTO {
    private Long id;
    private String type;
    private String message;
    private Long relatedSwapRequestId;
    private Long relatedBookId;
    private Boolean isRead;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
}
