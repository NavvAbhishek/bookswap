package com.bookswap.bookswap.service;

import com.bookswap.bookswap.dto.BookRequestDTO;
import com.bookswap.bookswap.dto.BookResponseDTO;
import com.bookswap.bookswap.enums.BookStatus;
import com.bookswap.bookswap.model.Book;
import com.bookswap.bookswap.model.User;
import com.bookswap.bookswap.repository.BookRepository;
import com.bookswap.bookswap.util.HaversineUtil;
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
    private final GeocodingService geocodingService;

    @Value("${book.photo.upload-dir}")
    private String bookPhotoUploadDir;

    public BookResponseDTO addBook(BookRequestDTO request, User owner) {
        String photoFileName = request.getPhotoFilename();

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .genre(request.getGenre())
                .language(request.getLanguage())
                .bookCondition(request.getBookCondition())
                .description(request.getDescription())
                .exchangePreference(request.getExchangePreference())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .photoUrl(photoFileName)
                .status(request.getStatus() != null ? request.getStatus() : BookStatus.AVAILABLE)
                .owner(owner)
                .build();

        Book savedBook = bookRepository.save(book);
        return mapToBookResponseDTO(savedBook, owner);
    }

    @Transactional(readOnly = true)
    public List<BookResponseDTO> getBooksForUser(User owner) {
        return bookRepository.findByOwnerOrderByIdDesc(owner).stream()
                .map(book -> mapToBookResponseDTO(book, owner))
                .collect(Collectors.toList());
    }

    // Gets all available books, excluding those owned by the current user.
    @Transactional(readOnly = true)
    public List<BookResponseDTO> getExploreBooks(User currentUser) {
        // We call our new repository method, passing the current user and the desired status
        List<Book> exploreBooks = bookRepository.findAllByOwnerNotAndStatusOrderByCreatedAtDesc(
                currentUser,
                BookStatus.AVAILABLE
        );

        // We map the results to DTOs, just like we do for the other methods
        return exploreBooks.stream()
                .map(book -> mapToBookResponseDTO(book, currentUser))
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
        book.setLatitude(request.getLatitude());
        book.setLongitude(request.getLongitude());
        book.setStatus(request.getStatus());

        if (photo != null && !photo.isEmpty()) {
            String newPhotoFileName = fileStorageService.storeFile(photo, bookPhotoUploadDir);
            book.setPhotoUrl(newPhotoFileName);
        }

        Book updatedBook = bookRepository.save(book);
        return mapToBookResponseDTO(updatedBook, currentUser);
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


    private BookResponseDTO mapToBookResponseDTO(Book book, User currentUser) {
        String photoUrl = book.getPhotoUrl() != null
                ? "http://localhost:8080/uploads/book-pics/" + book.getPhotoUrl()
                : null;

        String locationName = geocodingService.getCityFromCoordinates(book.getLatitude(), book.getLongitude());

        double distance = 0.0;
        if (currentUser.getLatitude() != null && currentUser.getLongitude() != null) {
            distance = HaversineUtil.calculateDistance(
                    currentUser.getLatitude(), currentUser.getLongitude(),
                    book.getLatitude(), book.getLongitude()
            );
        }

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
                .latitude(book.getLatitude())
                .longitude(book.getLongitude())
                .status(book.getStatus())
                .ownerId(book.getOwner().getId())
                .ownerName(book.getOwner().getName())
                .createdAt(book.getCreatedAt())
                .locationName(locationName)
                .distanceKm(distance)
                .build();
    }
}