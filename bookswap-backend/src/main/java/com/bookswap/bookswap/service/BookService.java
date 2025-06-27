package com.bookswap.bookswap.service;

import com.bookswap.bookswap.dto.BookRequestDTO;
import com.bookswap.bookswap.dto.BookResponseDTO;
import com.bookswap.bookswap.enums.BookStatus;
import com.bookswap.bookswap.model.Book;
import com.bookswap.bookswap.model.User;
import com.bookswap.bookswap.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BookService {

    private final BookRepository bookRepository;
    private final FileStorageService fileStorageService;

    @Value("${book.photo.upload-dir}")
    private String bookPhotoUploadDir;

    public BookResponseDTO addBook(BookRequestDTO request, MultipartFile photo, User owner) {
        String photoFileName = fileStorageService.storeFile(photo, bookPhotoUploadDir);

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .genre(request.getGenre())
                .language(request.getLanguage())
                .bookCondition(request.getBookCondition())
                .description(request.getDescription())
                .exchangePreference(request.getExchangePreference())
                .location(request.getLocation())
                .photoUrl(photoFileName)
                .status(request.getStatus() != null ? request.getStatus() : BookStatus.AVAILABLE)
                .owner(owner)
                .build();

        Book savedBook = bookRepository.save(book);
        return mapToBookResponseDTO(savedBook);
    }

    @Transactional(readOnly = true)
    public List<BookResponseDTO> getBooksForUser(User owner) {
        return bookRepository.findByOwnerOrderByIdDesc(owner).stream()
                .map(this::mapToBookResponseDTO)
                .collect(Collectors.toList());
    }

    public BookResponseDTO updateBook(Long bookId, BookRequestDTO request, MultipartFile photo, User currentUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));

        // CRITICAL: Ensure the user trying to update the book is the owner
        if (!book.getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You are not authorized to edit this book.");
        }

        // Update fields from the request
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setGenre(request.getGenre());
        book.setLanguage(request.getLanguage());
        book.setBookCondition(request.getBookCondition());
        book.setDescription(request.getDescription());
        book.setExchangePreference(request.getExchangePreference());
        book.setLocation(request.getLocation());
        book.setStatus(request.getStatus());

        if (photo != null && !photo.isEmpty()) {
            String newPhotoFileName = fileStorageService.storeFile(photo, bookPhotoUploadDir);
            book.setPhotoUrl(newPhotoFileName);
        }

        Book updatedBook = bookRepository.save(book);
        return mapToBookResponseDTO(updatedBook);
    }

    public void deleteBook(Long bookId, User currentUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));

        // CRITICAL: Ensure the user trying to delete the book is the owner
        if (!book.getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You are not authorized to delete this book.");
        }

        // Optional: delete photo file from storage
        bookRepository.delete(book);
    }


    private BookResponseDTO mapToBookResponseDTO(Book book) {
        String photoUrl = book.getPhotoUrl() != null
                ? "http://localhost:8080/uploads/book-pics/" + book.getPhotoUrl()
                : null;

        return BookResponseDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .genre(book.getGenre())
                .language(book.getLanguage())
                .bookCondition(book.getBookCondition())
                .description(book.getDescription())
                .photoUrl(photoUrl)
                .exchangePreference(book.getExchangePreference())
                .location(book.getLocation())
                .status(book.getStatus())
                .ownerId(book.getOwner().getId())
                .ownerName(book.getOwner().getName())
                .createdAt(book.getCreatedAt())
                .build();
    }
}