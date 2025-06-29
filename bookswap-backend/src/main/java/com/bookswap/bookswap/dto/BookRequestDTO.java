package com.bookswap.bookswap.dto;

import com.bookswap.bookswap.enums.BookCondition;
import com.bookswap.bookswap.enums.BookStatus;
import lombok.Data;

@Data
public class BookRequestDTO {
    private String title;
    private String author;
    private String genre;
    private String language;
    private BookCondition bookCondition;
    private String description;
    private String exchangePreference;
    private Double latitude;
    private Double longitude;
    private BookStatus status;
    private String photoFilename;
}