package com.bookswap.bookswap.dto;

import com.bookswap.bookswap.enums.SwapRequestStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class SwapRequestResponseDTO {
    private Long id;
    private BookResponseDTO book;
    private Long requesterId;
    private String requesterName;
    private Long ownerId;
    private String ownerName;
    private SwapRequestStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}