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
    private com.bookswap.bookswap.enums.BookCondition bookCondition;
    private String description;
    private String exchangePreference;
    private String location;
    private com.bookswap.bookswap.enums.BookStatus status; // For editing
}