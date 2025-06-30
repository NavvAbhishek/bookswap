package com.bookswap.bookswap.service;

import com.bookswap.bookswap.dto.BookResponseDTO;
import com.bookswap.bookswap.dto.SwapRequestResponseDTO;
import com.bookswap.bookswap.enums.BookStatus;
import com.bookswap.bookswap.enums.SwapRequestStatus;
import com.bookswap.bookswap.model.Book;
import com.bookswap.bookswap.model.SwapRequest;
import com.bookswap.bookswap.model.User;
import com.bookswap.bookswap.repository.BookRepository;
import com.bookswap.bookswap.repository.SwapRequestRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SwapRequestService {

    private final SwapRequestRepository swapRequestRepository;
    private final BookRepository bookRepository;
    private final BookService bookService;

    public SwapRequestResponseDTO createSwapRequest(Long bookId, User requester) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));

        // --- Validation Rules ---
        if (book.getOwner().getId().equals(requester.getId())) {
            throw new IllegalArgumentException("You cannot request your own book.");
        }
        if (book.getStatus() != BookStatus.AVAILABLE) {
            throw new IllegalStateException("This book is not available for swapping.");
        }
        swapRequestRepository.findByBookAndRequesterAndStatus(book, requester, SwapRequestStatus.PENDING)
                .ifPresent(req -> { throw new IllegalStateException("You already have a pending request for this book."); });

        SwapRequest swapRequest = SwapRequest.builder()
                .book(book)
                .requester(requester)
                .owner(book.getOwner())
                .status(SwapRequestStatus.PENDING)
                .build();

        return mapToSwapRequestResponseDTO(swapRequestRepository.save(swapRequest));
    }

    public SwapRequestResponseDTO updateSwapRequestStatus(Long requestId, SwapRequestStatus newStatus, User currentUser) {
        SwapRequest request = swapRequestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException("Swap Request not found with id: " + requestId));

        // Security Check: Only the book owner can accept or decline
        if (!request.getOwner().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You are not authorized to update this request.");
        }

        // Business Logic: If accepted, mark the book as unavailable
        if (newStatus == SwapRequestStatus.ACCEPTED) {
            Book book = request.getBook();
            book.setStatus(BookStatus.LENT_OUT);
            bookRepository.save(book);
        }

        request.setStatus(newStatus);
        return mapToSwapRequestResponseDTO(swapRequestRepository.save(request));
    }

    @Transactional(readOnly = true)
    public List<SwapRequestResponseDTO> getOutgoingRequests(User requester) {
        return swapRequestRepository.findByRequester(requester).stream()
                .map(this::mapToSwapRequestResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SwapRequestResponseDTO> getIncomingRequests(User owner) {
        return swapRequestRepository.findByOwner(owner).stream()
                .map(this::mapToSwapRequestResponseDTO)
                .collect(Collectors.toList());
    }

    private SwapRequestResponseDTO mapToSwapRequestResponseDTO(SwapRequest request) {

        BookResponseDTO bookDTO = bookService.mapToBookResponseDTO(request.getBook(), request.getRequester());

        return SwapRequestResponseDTO.builder()
                .id(request.getId())
                .book(bookDTO)
                .requesterId(request.getRequester().getId())
                .requesterName(request.getRequester().getName())
                .ownerId(request.getOwner().getId())
                .ownerName(request.getOwner().getName())
                .status(request.getStatus())
                .createdAt(request.getCreatedAt())
                .updatedAt(request.getUpdatedAt())
                .build();
    }
}
