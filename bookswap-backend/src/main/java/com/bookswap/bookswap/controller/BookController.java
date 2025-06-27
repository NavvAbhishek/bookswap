package com.bookswap.bookswap.controller;


import com.bookswap.bookswap.dto.BookRequestDTO;
import com.bookswap.bookswap.dto.BookResponseDTO;
import com.bookswap.bookswap.model.User;
import com.bookswap.bookswap.service.BookService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping
    public ResponseEntity<BookResponseDTO> addBook(
            @RequestPart("bookRequest") BookRequestDTO bookRequest,
            @RequestPart("photo") MultipartFile photo,
            @AuthenticationPrincipal User currentUser) {

        BookResponseDTO newBook = bookService.addBook(bookRequest, photo, currentUser);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    @GetMapping("/my-books")
    public ResponseEntity<List<BookResponseDTO>> getMyBooks(@AuthenticationPrincipal User currentUser) {
        List<BookResponseDTO> books = bookService.getBooksForUser(currentUser);
        return ResponseEntity.ok(books);
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<BookResponseDTO> updateBook(
            @PathVariable Long bookId,
            @RequestPart("bookRequest") BookRequestDTO bookRequest,
            @RequestPart(value = "photo", required = false) MultipartFile photo,
            @AuthenticationPrincipal User currentUser) {

        BookResponseDTO updatedBook = bookService.updateBook(bookId, bookRequest, photo, currentUser);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(
            @PathVariable Long bookId,
            @AuthenticationPrincipal User currentUser) {

        bookService.deleteBook(bookId, currentUser);
        return ResponseEntity.noContent().build(); // Standard response for successful delete
    }

    @GetMapping("/explore")
    public ResponseEntity<List<BookResponseDTO>> getExploreBooks(@AuthenticationPrincipal User currentUser) {
        List<BookResponseDTO> books = bookService.getExploreBooks(currentUser);
        return ResponseEntity.ok(books);
    }
}
