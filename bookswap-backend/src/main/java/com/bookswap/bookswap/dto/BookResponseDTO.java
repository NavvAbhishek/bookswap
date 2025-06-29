package com.bookswap.bookswap.dto;

import com.bookswap.bookswap.enums.BookCondition;
import com.bookswap.bookswap.enums.BookStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BookResponseDTO {
    private Long id;
    private String title;
    private String author;
    private String genre;
    private String language;
    private BookCondition bookCondition;
    private String description;
    private String photoUrl;
    private String exchangePreference;
    private Double latitude;
    private Double longitude;
    private BookStatus status;
    private Long ownerId;
    private String ownerName;
    private LocalDateTime createdAt;
    private String locationName;
    private Double distanceKm;
}
